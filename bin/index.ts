import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import bodyParser from 'body-parser';
import carRoutes from '../config/carRoutes';
import userRoutes from '../config/userRoutes';
import logActivityRoutes from '../config/logActivityRoues';
import knex from 'knex';
import knexConfig from '../knexfile';
import cors from 'cors';
const swaggerDocument = YAML.load('openapi-BCR.yaml');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', carRoutes);
app.use('/api', userRoutes);
app.use('/api', logActivityRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const db = knex(knexConfig.development);

const checkDatabaseConnection = async () => {
  try {
    await db.raw('SELECT 1+1 as result');
    console.log('==========Database Connected Successfully==========');
  } catch (error: unknown) {
    console.error('Error Connecting to Database:', (error as Error).message);
  }
};
checkDatabaseConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
