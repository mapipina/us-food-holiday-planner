'use strict';

import axios from 'axios';
import { 
    HolidayData, 
    RecipeDatum,
    ApiListResponse,
    ApiItemResponse,
    ApiRecipeResponse 
} from '../types/Holiday';

const BASE_URL = 'http://localhost:3000/api/v1';

export async function getAllHolidays(): Promise<HolidayData[]> {
    const res = await axios.get<ApiListResponse>(`${BASE_URL}/holidays`);
    return res.data.data.holidays;
}

export async function getTodayHoliday(): Promise<HolidayData | null> {
    const response = await axios.get<ApiItemResponse>(`${BASE_URL}/holidays/today`);
    
    if (response.data.status !== 'success') {
        throw new Error(response.data.message || 'Operation failed in backend.');
    }

    return response.data.data?.holiday ?? null; 
}

export async function getRecipeByHolidayId(id: number): Promise<RecipeDatum[]> { 
    const res = await axios.get<ApiRecipeResponse>(`${BASE_URL}/recipes/${id}`);
    const resData = res.data;
    
    if (resData.status !== 'success') {
        throw new Error(resData.message || `API returned status: ${resData.status}`);
    }

    const recipeArr = resData.data.recipes ?? []; 
    if (recipeArr.length === 0) {
        throw new Error("No recipe data received for this holiday.");
    }

    return recipeArr.filter((r): r is RecipeDatum => r !== null); 
}
