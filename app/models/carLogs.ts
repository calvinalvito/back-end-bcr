// models/CarLog.ts
import { Model } from 'objection';
import User from './Users';
import Car from './Cars';

class CarLog extends Model {
  static tableName = 'car_logs';

  id!: number;
  activity_type!: 'create' | 'update' | 'delete';
  user_id!: number;
  car_id!: number;
  activity_time!: Date;

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'car_logs.user_id',
        to: 'users.id'
      }
    },
    car: {
      relation: Model.BelongsToOneRelation,
      modelClass: Car,
      join: {
        from: 'car_logs.car_id',
        to: 'cars.id'
      }
    }
};
}

export default CarLog;
