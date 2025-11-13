import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, List, ListItem, Divider } from '@mui/material';
import { RecipeDatum } from '../types/Holiday';

interface RecipeListProps {
    recipes: RecipeDatum[];
    holidayTitle: string;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, holidayTitle }) => {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                🍽️ Recipe Ideas for {holidayTitle}:
            </Typography>
            
            <List disablePadding>
                {recipes.map((recipe, index) => (
                    <React.Fragment key={recipe.idMeal}>
                        <ListItem disablePadding sx={{ mb: 2 }}>
                            <RecipeCard recipe={recipe} />
                        </ListItem>
                        {index < recipes.length - 1 && <Divider component="li" variant="fullWidth" sx={{ my: 2 }} />}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

const RecipeCard: React.FC<{ recipe: RecipeDatum }> = ({ recipe }) => (
    <Card sx={{ display: 'flex', width: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 6 } }}>
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
                    <Typography component="div" variant="h6" color="primary">
                        {recipe.strMeal}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        Origin: {recipe.strArea || 'N/A'} | ID: {recipe.idMeal}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, maxHeight: 80, overflow: 'hidden' }}>
                        {recipe.strInstructions.substring(0, 120)}...
                    </Typography>
                </CardContent>
            </Grid>
        </Grid>
    </Card>
);

export default RecipeList;
