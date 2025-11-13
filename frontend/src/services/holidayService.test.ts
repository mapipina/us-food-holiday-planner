import { MOCK_FOUND_HOLIDAY, MOCK_RECIPE_EMPTY_RESPONSE, MOCK_HOLIDAY_LIST, MOCK_RECIPES } from '../mocks/testMocks';
import { getAllHolidays, getTodayHoliday, getRecipeByHolidayId } from './holidayService';
import axios from 'axios'; 

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Holiday Service Test Suite', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch and return a list of all holidays', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { 
                status: 'success', 
                results: 2, 
                data: { holidays: MOCK_HOLIDAY_LIST }
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
                data: { holiday: MOCK_FOUND_HOLIDAY }
            }
        });

        const holiday = await getTodayHoliday();
        expect(holiday?.title).toBe('National Mock Holiday');
    });

    it('should fetch and return an array of recipes for a given ID', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                status: 'success',
                data: {
                    holiday: { title: 'Taco Day', main_meal: 'Taco' },
                    recipes: MOCK_RECIPES
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

    it('should successfully return holiday and recipes array when data exists', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { 
                status: 'success', 
                data: { holiday: MOCK_FOUND_HOLIDAY }
            }
        });
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                status: 'success',
                data: {
                    holiday: MOCK_FOUND_HOLIDAY,
                    recipes: MOCK_RECIPES // Uses your existing mock array
                }
            }
        });
        
        const holiday = await getTodayHoliday();
        expect(holiday).toEqual(MOCK_FOUND_HOLIDAY);
        const recipes = await getRecipeByHolidayId(15);
        expect(recipes.length).toBeGreaterThan(0);
        expect(recipes[0].strMeal).toBe('Spicy Arrabiata Penne'); 
    });
    it('should throw an error when holiday is found but recipes array is empty/null', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { 
                status: 'success', 
                data: { holiday: MOCK_FOUND_HOLIDAY }
            }
        });
        mockedAxios.get.mockResolvedValueOnce(MOCK_RECIPE_EMPTY_RESPONSE);
        await expect(getTodayHoliday()).resolves.toEqual(MOCK_FOUND_HOLIDAY);
        await expect(getRecipeByHolidayId(15)).rejects.toThrow('No recipe data received for this holiday.');
    });
});
