import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { getRecipeByHolidayId, getTodayHoliday } from '../services/holidayService';
import { HolidayData, RecipeDatum } from '../types/Holiday';
import FeaturedSection from '../components/FeaturedSection';

const HomePage: React.FC = () => {
    const [holiday, setHoliday] = useState<HolidayData | null>(null);
    const [recipes, setRecipes] = useState<RecipeDatum[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            setIsLoading(true);
            setError(null);
            setHoliday(null);

            try {
                const todayHoliday = await getTodayHoliday(); 
                console.log(todayHoliday);
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
            <Typography variant="h3" component="h1" gutterBottom>
                Food Holiday Menu Generator
            </Typography>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <FeaturedSection
                        holiday={holiday}
                        recipes={recipes}
                        error={error}
                        isLoading={isLoading}
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
