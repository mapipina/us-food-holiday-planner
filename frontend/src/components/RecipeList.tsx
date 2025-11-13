import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, List, ListItem, Divider } from '@mui/material';
import { RecipeDatum } from '../types/Holiday';

interface RecipeListProps {
    recipes: RecipeDatum[];
    holidayTitle: string;
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes, holidayTitle }) => {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                🍽️ Recipe Ideas for {holidayTitle}:
            </Typography>
            
            <List>
                {recipes.map((recipe) => (
                    <React.Fragment key={recipe.idMeal}>
                        <ListItem disablePadding sx={{ mb: 3 }}>
                            <RecipeCard recipe={recipe} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

const RecipeCard: React.FC<{ recipe: RecipeDatum }> = ({ recipe }) => (
    <Card sx={{ display: 'flex', width: '100%' }} variant="outlined">
        <Grid container>
            <Grid size={{ xs: 12, sm: 4 }}>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    image={recipe.strMealThumb}
                    alt={recipe.strMeal}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
                <CardContent>
                    <Typography component="div" variant="h6">
                        {recipe.strMeal}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxHeight: 100, overflow: 'hidden' }}>
                        {recipe.strInstructions.substring(0, 150)}... [Full Instructions Available on Click]
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                        ID: {recipe.idMeal} | Origin: {recipe.strArea || 'N/A'}
                    </Typography>
                </CardContent>
            </Grid>
        </Grid>
    </Card>
);
