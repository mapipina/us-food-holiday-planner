import { getAllHolidays, getTodayHoliday, getRecipeByHolidayId } from './holidayService';
import axios from 'axios'; 

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockHolidayList = [
    { id: 1, title: 'Pizza Day', description: 'Pizza', main_meal: 'Pizza', date_mm_dd: '02-09' },
    { id: 2, title: 'Coffee Day', description: 'Coffee', main_meal: 'Coffee', date_mm_dd: '09-29' },
];
const mockTodayHoliday = { 
    id: 10, 
    title: 'Mock Today Holiday', 
    description: 'Testing today.', 
    main_meal: 'Testing', 
    date_mm_dd: '01-01' 
};
const mockRecipes = [
    { idMeal: '52771', strMeal: 'Spicy Arrabiata Penne', /* ... */ }
];

describe('Holiday Service Test Suite', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch and return a list of all holidays', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { 
                status: 'success', 
                results: 2, 
                data: { holidays: mockHolidayList }
            }
        });

        const holidays = await getAllHolidays();
        
        expect(holidays.length).toBe(2);
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it('should fetch and return a single holiday for "today"', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { 
                status: 'success', 
                data: { holiday: mockTodayHoliday }
            }
        });

        const holiday = await getTodayHoliday();
        expect(holiday.title).toBe('Mock Today Holiday');
    });

    it('should fetch and return an array of recipes for a given ID', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                status: 'success',
                data: {
                    holiday: { title: 'Taco Day', main_meal: 'Taco' },
                    recipes: mockRecipes
                }
            }
        });

        const recipes = await getRecipeByHolidayId(123);
        expect(recipes).toBeInstanceOf(Array);
        expect(recipes[0].idMeal).toBe('52771');
    });
    
    it('should throw an error if the API returns status "fail"', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                status: 'fail',
                message: 'No recipes found for the dish'
            }
        });

        await expect(getRecipeByHolidayId(123)).rejects.toThrow('No recipes found for the dish');
    });
});
