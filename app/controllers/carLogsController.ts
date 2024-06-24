// controllers/CarLogController.ts
import { Request, Response } from 'express';
import CarLogService from '../services/carLogsService';

export const getAllCarLogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const carLogs = await CarLogService.getAllLogs();
      res.json(carLogs);
    } catch (error) {
      console.error('Error fetching cars:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
