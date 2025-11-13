import React from 'react';
import { Box, Typography, Alert, Card, CardContent, Grow } from '@mui/material'; 
import { HolidayData, RecipeDatum } from '../types/Holiday';
import RecipeList from './RecipeList';
import EmptyStateInspiration from './EmptyStateInspiration';

interface FeaturedSectionProps {
    holiday: HolidayData | null;
    recipes: RecipeDatum[] | null;
    error: string | null;
    isLoading: boolean;
    onFetchFutureHoliday: (searchMeal: string) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ holiday, recipes, error, isLoading, onFetchFutureHoliday }) => {
    
    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }
    
    if (!isLoading && !holiday) {
        return <EmptyStateInspiration onFetchFutureHoliday={onFetchFutureHoliday} />;
    }
    
    const recipeArray = recipes || []; 
    const showHolidayContent = holiday && recipeArray.length >= 0;

    if (showHolidayContent) {
        return (
            <Grow in={true} timeout={1000}>
                <Box>
                    <Typography variant="h4" gutterBottom color="primary">
                        Hooray! Today is {holiday!.title}.
                    </Typography>
                    
                    {recipeArray.length === 0 && (
                        <>
                            <Alert severity="warning">
                                But darn, there aren’t any meals or recipes to display. Maybe next time.
                            </Alert>
                            
                            <Card variant="outlined" sx={{ mt: 3 }}>
                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Holiday Summary:
                                    </Typography>
                                    <Typography variant="body1">
                                        {holiday!.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {recipeArray.length > 0 && (
                        <>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Here are some meals to consider.
                            </Typography>

                            <Card variant="outlined" sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Holiday Summary:
                                    </Typography>
                                    <Typography variant="body1">
                                        {holiday!.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                            
                            <RecipeList recipes={recipeArray} holidayTitle={holiday!.title} />
                        </>
                    )}
                </Box>
            </Grow>
        );
    }
    
    return null; 
};

export default FeaturedSection;
