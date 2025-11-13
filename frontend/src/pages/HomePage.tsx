import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { getTodayHoliday, getRecipeByHolidayId } from '../services/holidayService';
import { HolidayData, RecipeDatum } from '../types/Holiday';
import FeaturedSection from '../components/FeaturedSection';
import EmptyStateInspiration from '../components/EmptyStateInspiration';

const HomePage: React.FC = () => {
    const [holiday, setHoliday] = useState<HolidayData | null>(null);
    const [recipes, setRecipes] = useState<RecipeDatum[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleFetchFutureHoliday = async (searchMeal: string) => {
        setIsLoading(true);
        setError(null);
        setHoliday(null); 

        try {
            const pseudoHoliday: HolidayData = {
                id: 999,
                title: `Search Result: ${searchMeal} Day`,
                description: `Showing recipes for your interest in ${searchMeal}.`,
                main_meal: searchMeal,
                date_mm_dd: 'N/A'
            };
            setHoliday(pseudoHoliday);

            const recipeResults = await getRecipeByHolidayId(15);
            setRecipes(recipeResults);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setHoliday(null);
            setRecipes(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchMenu = async () => {
            setIsLoading(true);
            setError(null);
            setHoliday(null);

            try {
                const todayHoliday = await getTodayHoliday(); 
                setHoliday(todayHoliday);

                if (todayHoliday) {
                    const recipeResults = await getRecipeByHolidayId(todayHoliday.id);
                    setRecipes(recipeResults);
                } else {
                    setRecipes(null);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
                setHoliday(null);
                setRecipes(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMenu();
    }, []);

    if (isLoading) {
        return <Container sx={{ textAlign: 'center', mt: 10 }}><CircularProgress /></Container>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom
                sx={{
                    fontSize: { xs: '3.5rem', md: '4.5rem' },
                    fontWeight: 900,
                    color: 'primary.main',
                    textShadow: '3px 3px 0px #FF1A8B',
                    letterSpacing: { xs: '2px', md: '5px' },
                    mb: 6
                }}
            >
                Food Holiday Menu Generator
            </Typography>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <FeaturedSection
                        holiday={holiday}
                        recipes={recipes}
                        error={error}
                        isLoading={isLoading}
                        onFetchFutureHoliday={handleFetchFutureHoliday}
                    />
                </Grid>
                {/* <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="h6">Upcoming Holidays/Search</Typography>
                </Grid> */}
            </Grid>
        </Container>
    );
};

export default HomePage;
