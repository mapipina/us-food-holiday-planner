import { HolidayData, RecipeDatum } from '../types/Holiday';

export const MOCK_HOLIDAY_LIST: HolidayData[] = [
    { id: 1, title: 'Pizza Day', description: 'Pizza', main_meal: 'Pizza', date_mm_dd: '02-09' },
    { id: 2, title: 'Coffee Day', description: 'Coffee', main_meal: 'Coffee', date_mm_dd: '09-29' },
];

export const MOCK_FOUND_HOLIDAY: HolidayData = { 
    id: 15, 
    title: 'National Mock Holiday', 
    description: 'A day to mock food', 
    main_meal: 'Taco', 
    date_mm_dd: '11-13' 
};

export const MOCK_RECIPES: RecipeDatum[] = [
    { idMeal: '52771', strMeal: 'Spicy Arrabiata Penne', strInstructions: 'Test instructions...', strMealThumb: 'http://example.com/penne.jpg' }
];

export const MOCK_RECIPE_EMPTY_RESPONSE = {
    data: {
        status: 'success',
        data: {
            holiday: { title: 'Taco Day', main_meal: 'Taco' },
            recipes: null
        }
    }
};
