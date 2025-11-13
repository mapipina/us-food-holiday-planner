import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Grid, Link, Divider, List, ListItem, ListItemText, Box, CardMedia } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RecipeDatum } from '../types/Holiday';

interface RecipeModalProps {
    recipe: RecipeDatum;
    open: boolean;
    onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, open, onClose }) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = (recipe as any)[`strIngredient${i}`];
        const measure = (recipe as any)[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push({ ingredient: ingredient.trim(), measure: measure ? measure.trim() : '' });
        }
    }

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            sx={{ backdropFilter: 'blur(3px)' }}
        >
            <DialogTitle sx={{ m: 0, p: 3, backgroundColor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" component="div" sx={{ fontFamily: 'Truculenta, sans-serif' }}>
                    {recipe.strMeal}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ color: 'white' }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            
            <DialogContent dividers sx={{ p: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{xs: 12, md: 4}}>
                        <CardMedia
                            component="img"
                            image={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            sx={{ borderRadius: 2, mb: 3 }}
                        />
                        <Typography variant="h6" gutterBottom>Source Links</Typography>
                        <List dense>
                            {recipe.strSource && (
                                <ListItem disablePadding>
                                    <Link href={recipe.strSource} target="_blank" rel="noopener" color="secondary" sx={{ fontWeight: 'bold' }}>
                                        Full Recipe Source
                                    </Link>
                                </ListItem>
                            )}
                            {recipe.strYoutube && (
                                <ListItem disablePadding>
                                    <Link href={recipe.strYoutube} target="_blank" rel="noopener" color="secondary">
                                        Watch on YouTube
                                    </Link>
                                </ListItem>
                            )}
                        </List>
                        <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                            ID: {recipe.idMeal} | Area: {recipe.strArea}
                        </Typography>
                    </Grid>
                    <Grid  size={{ xs: 12, md: 8 }}>
                        <Typography variant="h4" gutterBottom>Instructions</Typography>
                        <Typography variant="body1">
                            {recipe.strInstructions}
                        </Typography>
                        
                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h4" gutterBottom>Ingredients</Typography>
                        <List dense>
                            {ingredients.map((item, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemText primary={
                                        <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography component="span" sx={{ fontWeight: 'bold' }}>{item.ingredient}</Typography>
                                            <Typography component="span" color="text.secondary">{item.measure}</Typography>
                                        </Box>
                                    } />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default RecipeModal;
