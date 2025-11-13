import { getAllHolidays, getTodayHoliday, getRecipeByHolidayId } from './holidayService';
import { http, HttpResponse } from 'msw';
import { server } from '../tests/setup';

const BASE_URL = 'http://localhost:3000/api/v1';

describe('Holiday Service', () => {
    
    it('should fetch and return a list of all holidays', async () => {
        const holidays = await getAllHolidays();

        expect(holidays).toBeInstanceOf(Array);
        expect(holidays.length).toBe(2);
        expect(holidays[0].title).toBe('Pizza Day');
    });

    it('should fetch and return a single holiday for "today"', async () => {
        const holiday = await getTodayHoliday();

        expect(holiday.title).toBe('Mock Today Holiday');
        expect(holiday.main_meal).toBe('Testing');
    });

    it('should fetch and return an array of recipes for a given ID', async () => {
        const recipes = await getRecipeByHolidayId(123); 

        expect(recipes).toBeInstanceOf(Array);
        expect(recipes.length).toBeGreaterThan(0);
        expect(recipes[0].idMeal).toBe('52771');
        expect(recipes[0].strMeal).toBe('Spicy Arrabiata Penne');
    });

    it('should throw an error if the recipes API call fails (500)', async () => {
        server.use(
            http.get(`${BASE_URL}/recipes/:id`, () => {
                return HttpResponse.json({ status: 'error', data: { recipes: null } }, { status: 500 });
            })
        );

        await expect(getRecipeByHolidayId(123)).rejects.toThrow(); 

        server.resetHandlers();
    });
});
