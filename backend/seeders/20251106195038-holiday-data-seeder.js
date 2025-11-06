'use strict';

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');


const CSV_FILE_PATH = path.resolve(__dirname, '../data/us-food-holidays.csv');

module.exports = {
  up: async (queryInterface) => {
    const results = await new Promise((resolve, reject) => {
      const data = [];
      
      fs.createReadStream(CSV_FILE_PATH)
        .pipe(csv())
        .on('data', (row) => {
          data.push({
            title: row.holiday_title,
            description: row.holiday_desc,
            main_meal: row.main_meal,
            date_mm_dd: row.date_MM_dd,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        })
        .on('end', () => {
          resolve(data);
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    return queryInterface.bulkInsert('holidays', results, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('holidays', null, {});
  }
};
