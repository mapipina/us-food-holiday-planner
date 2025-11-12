import { Request, Response } from 'express';
import axios from 'axios';
import { Holiday } from '../models/Holiday';

const THEMEALDB_URL = 'https://www.themealdb.com/api/json/v1/';
const API_KEY = process.env.THEMEALDB_API_KEY || '1';

/**
 * @route GET /api/v1/recipes/:holidayId
 */

export const getRecipeByHoliday = async (req: Request, res: Response) => {
    const { holidayId } = req.params;
    
    try {
        const holiday = await Holiday.findByPk(holidayId, {
            attributes: ['title', 'main_meal'],
        });
        if (!holiday) {
            return res.status(404).json({
                status: 'fail',
                message: `Holiday with ID ${holidayId} not found.`,
            });
        }
        
        const mainMeal = holiday.main_meal;
        const response = await axios.get(`${THEMEALDB_URL}${API_KEY}/search.php?s=${encodeURIComponent(mainMeal)}`);
        const meals = response.data.meals;
        
        if (!meals) {
            return res.status(404).json({
                status: 'fail',
                message: `No recipes found for ${holiday.title}`,
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                holiday: {
                    id: holiday.id,
                    title: holiday.title,
                    main_meal: holiday.main_meal,
                },
                recipes: meals,
            },
        });
    } catch (error: Error | unknown) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve recipe data from themealdb.',
        });
    }
};
