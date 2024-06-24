import Car from "../models/Cars";


export class CarRepository {
  static async getAll(): Promise<Car[]> {
    return Car.query();
  }

  static async getById(id: number): Promise<Car> {
    const car = await Car.query().findById(id);
    if (!car) {
      throw new Error(`Car with id ${id} not found`);
    }
    return car;
  }
  

  static async deleteById(id: number): Promise<number> {
    return Car.query().deleteById(id);
  }

  static async create(carData: Partial<Car>): Promise<Car> {
    return Car.query().insert(carData);
  }

  static async update(id: number, carData: Partial<Car>): Promise<Car> {
    await Car.query().findById(id).patch(carData);
    const updatedCar = await Car.query().findById(id);
    if (!updatedCar) {
      throw new Error(`Car with id ${id} not found after update`);
    }
    return updatedCar;
  }  
}
