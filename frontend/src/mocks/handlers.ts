import { http, HttpResponse } from 'msw';
import { HolidayData, RecipeDatum } from '../types/Holiday';

const BASE_URL = 'http://localhost:3000/api/v1';

const mockHolidayList: HolidayData[] = [
    { id: 1, title: 'Pizza Day', description: 'Pizza', main_meal: 'Pizza', date_mm_dd: '02-09' },
    { id: 2, title: 'Coffee Day', description: 'Coffee', main_meal: 'Coffee', date_mm_dd: '09-29' },
];

const mockTodayHoliday: HolidayData = { 
    id: 10, 
    title: 'Mock Today Holiday', 
    description: 'Testing today.', 
    main_meal: 'Testing', 
    date_mm_dd: '01-01' 
};

const mockRecipe: RecipeDatum = {
    idMeal: '52771',
    strMeal: 'Spicy Arrabiata Penne',
    strInstructions: 'Bring a large pot...',
    strMealThumb: 'http://example.com/penne.jpg',
};

export const handlers = [
    http.get(`${BASE_URL}/holidays`, () => {
        return HttpResponse.json({
            status: 'success',
            results: mockHolidayList.length,
            data: { holidays: mockHolidayList },
        }, { status: 200 });
    }),

    http.get(`${BASE_URL}/holidays/today`, () => {
        return HttpResponse.json({
            status: 'success',
            data: { holiday: mockTodayHoliday },
        }, { status: 200 });
    }),

    http.get(`${BASE_URL}/recipes/:id`, () => {
        return HttpResponse.json({
            status: 'success',
            data: {
                holiday: {
                    title: 'Mock Recipe Holiday',
                    main_meal: 'Mock Meal',
                },
                recipes: [mockRecipe], 
            },
        }, { status: 200 });
    }),
];
