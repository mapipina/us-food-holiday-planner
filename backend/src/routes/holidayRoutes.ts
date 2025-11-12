import { Router } from 'express';
import { getAllHolidays, getTodaysHoliday } from '../controllers/holidayController';

const router = Router();

router.get('/', getAllHolidays);
router.get('/today', getTodaysHoliday);

export default router;