type APIStatusResponse = 'success' | 'fail' | 'error';

export interface HolidayData {
    id: number;
    title: string;
    description: string;
    main_meal: string;
    date_mm_dd: string;
}

export interface RecipeDatum {
    idMeal: string;
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
}

export interface ApiListResponse {
    status: APIStatusResponse;
    results: number;
    data: {
        holidays: HolidayData[];
    };
}

export interface ApiItemResponse {
    status: APIStatusResponse;
    data: {
        holiday: HolidayData;
    };
}

export interface ApiRecipeSuccessResponse {
    status: 'success';
    data: {
        holiday: {
            title: string;
            main_meal: string;
        },
        recipes: RecipeDatum[] | null;
    };
}

export interface ApiRecipeFailResponse {
    status: 'fail' | 'error';
    message: string;
    data?: any; 
}

export type ApiRecipeResponse = ApiRecipeSuccessResponse | ApiRecipeFailResponse;
