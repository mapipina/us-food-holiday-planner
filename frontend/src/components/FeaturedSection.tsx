import React from 'react';
import { Box, Typography, Alert, Card, CardContent } from '@mui/material';
import { HolidayData, RecipeDatum } from '../types/Holiday';
import { RecipeList } from './RecipeList';

interface FeaturedSectionProps {
    holiday: HolidayData | null;
    recipes: RecipeDatum[] | null;
    error: string | null;
    isLoading: boolean;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ holiday, recipes, error, isLoading }) => {
    
    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }
    
    if (!isLoading && !holiday) {
        return (
            <Alert severity="info" sx={{ mt: 2 }}>
                Aw shucks, today is not a food holiday in the States. Come back another day to see if there’s something delish to celebrate.
            </Alert>
        );
    }
    
    const recipeArray = recipes || []; 

    if (holiday && recipeArray.length === 0) {
        return (
            <Box>
                <Typography variant="h4" gutterBottom color="primary">
                    Hooray! Today is {holiday.title}.
                </Typography>
                <Alert severity="warning">
                    But darn, there aren’t any meals or recipes to display. Maybe next time.
                </Alert>
                
                <Card variant="outlined" sx={{ mt: 3 }}>
                    <CardContent>
                         <Typography variant="body1">
                            {holiday.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }

    if (holiday && recipeArray.length > 0) {
        return (
            <Box>
                <Typography variant="h4" gutterBottom color="primary">
                    Hooray! Today is {holiday.title}.
                </Typography>
                
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Here are some meals to consider.
                </Typography>

                <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                         <Typography variant="body1">
                            {holiday.description}
                        </Typography>
                    </CardContent>
                </Card>
                
                <RecipeList recipes={recipeArray} holidayTitle={holiday.title} />
            </Box>
        );
    }

    return null; 
};

export default FeaturedSection;
