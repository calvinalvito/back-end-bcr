// services/CarService.ts
import  Car  from '../models/Cars';
import { CarRepository } from '../repositories/carsRepository';

export class CarService {
  static async getAllCars(): Promise<Car[]> {
    return CarRepository.getAll();
  }

  static async getCarById(id: number): Promise<Car | null> {
    return CarRepository.getById(id);
  }

  static async deleteCarById(id: number): Promise<void> {
    await CarRepository.deleteById(id);
  }

  static async createCar(carData: Partial<Car>): Promise<Car> {
    return CarRepository.create(carData);
  }

  static async updateCarById(id: number, carData: Partial<Car>): Promise<Car> {
    return CarRepository.update(id, carData);
  }
}
