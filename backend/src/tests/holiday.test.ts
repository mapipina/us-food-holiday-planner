import request from 'supertest';
import app from '../app';

describe('Holiday Endpoints', () => {
    const MOCK_DATE = '02-09'; 
    const TODAY_HOLIDAY_TITLE = 'National Pizza Day';

    describe('GET /api/v1/holidays', () => {
        it('should return a 200 and a list of all holidays in db', async () => {
            const response = await request(app).get('/api/v1/holidays');
            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data.holidays).toBeInstanceOf(Array);
            expect(response.body.data.holidays.length).toEqual(28);
            expect(response.body.data.holidays[0]).toHaveProperty('title');
            expect(response.body.data.holidays[0]).toHaveProperty('date_mm_dd');
        });
    });

    describe('GET /api/v1/holidays/today', () => {
        let originalLuxon: any;

        beforeAll(() => {
            originalLuxon = jest.requireActual('luxon');
            
            jest.spyOn(originalLuxon.DateTime, 'local').mockReturnValue({
                toFormat: () => MOCK_DATE,
            });
        });

        afterAll(() => {
            jest.restoreAllMocks();
        });

        it('should return 200 and the correct holiday today date', async () => {
            const response = await request(app).get('/api/v1/holidays/today');

            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data.holiday.date_mm_dd).toBe(MOCK_DATE);
            expect(response.body.data.holiday.title).toBe(TODAY_HOLIDAY_TITLE);
        });

        it('should return 200 if no holiday exists for the mocked date', async () => {
            jest.spyOn(originalLuxon.DateTime, 'local').mockReturnValue({
                toFormat: () => '99-99',
            });
            
            const response = await request(app).get('/api/v1/holidays/today');
            
            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data.holiday).toBeNull();

            jest.spyOn(originalLuxon.DateTime, 'local').mockReturnValue({
                toFormat: () => MOCK_DATE,
            });
        });
    });
});
