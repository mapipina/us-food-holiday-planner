import { Request, Response } from 'express';
import { Holiday } from '../models/Holiday';
import { DateTime } from 'luxon';

/**
 * @route GET /api/v1/holidays
 */
export const getAllHolidays = async (_req: Request, res: Response) => {
    try {
        const holidays = await Holiday.findAll({
            order: [['date_mm_dd', 'ASC']],
        });

        res.status(200).json({
            status: 'success',
            results: holidays.length,
            data: {
                holidays
            }
        });
    } catch (error: Error | unknown) {
        console.error('Error fetching holidays:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve holiday data.'
        });
    }
};

const getTodayDateString = (): string => {
    const now = DateTime.local(); 
    return now.toFormat('MM-dd'); 
};

/**
 * @route GET /api/v1/holidays/today
 */
export const getTodaysHoliday = async (_req: Request, res: Response) => {
    try {
        const todayDate = getTodayDateString();

        const holiday = await Holiday.findOne({
            where: {
                date_mm_dd: todayDate,
            },
            attributes: ['id', 'title', 'description', 'main_meal', 'date_mm_dd'],
        });

        if (!holiday) {
            return res.status(404).json({
                status: 'fail',
                message: `No major food holiday found for today: ${todayDate}`
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                holiday,
            }
        });
    } catch (error) {
        console.error('Error fetching today\'s holiday:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve today\'s holiday data.'
        });
    }
};
