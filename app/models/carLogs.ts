
import { Model } from 'objection';

class CarLog extends Model {
  static tableName = 'car_logs';

  id!: number;
  activity_type!: 'create' | 'update' | 'delete';
  user_id!: number;
  car_id!: number;
  activity_time!: Date;
}

export default CarLog;
