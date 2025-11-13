import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface EmptyStateInspirationProps {
    onFetchFutureHoliday: (mainDish: string) => void;
}

const FUTURE_MEALS = [
    "National Waffle Day", 
    "National Pizza Day", 
    "National Hot Dog Day"
];

const EmptyStateInspiration: React.FC<EmptyStateInspirationProps> = ({ onFetchFutureHoliday }) => {
    return (
        <Card sx={{ mt: 3, border: '3px solid', borderColor: 'secondary.main', backgroundColor: '#FFF0F0' }}>
            <CardContent sx={{ textAlign: 'center' }}>
                <WbSunnyIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                
                <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
                    Aw Shucks! No Holiday Today.
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Today is not a fixed-date food holiday in the States. Come back another day to see if there’s something delish to celebrate.
                </Typography>

                <Typography variant="subtitle1" sx={{ color: 'secondary.main', mb: 1, fontWeight: 'bold' }}>
                    ✨ Future Meal Inspiration:
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
                    {FUTURE_MEALS.map(meal => (
                        <Button 
                            key={meal}
                            variant="contained" 
                            color="secondary" 
                            size="small"
                            onClick={() => onFetchFutureHoliday(meal.split(' ').slice(-1)[0])}
                            sx={{ 
                                borderRadius: 8, 
                                fontSize: '0.8rem',
                                color: 'white' 
                            }}
                        >
                            {meal}
                        </Button>
                    ))}
                </Box>
                
                <Typography variant="caption" color="text.secondary">
                    (Try searching for one of these!)
                </Typography>
            </CardContent>
        </Card>
    );
};

export default EmptyStateInspiration;
