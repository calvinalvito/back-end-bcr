// services/CarLogService.ts
import CarLog from '../models/carLogs';
import CarLogRepository from '../repositories/carLogsRepository';


class CarLogService {
    static async createLog(logData: Partial<CarLog>): Promise<void> {
        await CarLogRepository.createLog(logData);
    }      
  static async getAllLogs(): Promise<CarLog[]> {
    return CarLogRepository.getAll();
  }
}

export default CarLogService;
