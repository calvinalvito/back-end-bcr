import express, { Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import bodyParser from 'body-parser';
import carRoutes from '../config/carRoutes';
import userRoutes from '../config/userRoutes';
import logActivityRoutes from '../config/logActivityRoues';
import cors from 'cors';
const swaggerDocument = YAML.load('openapi-BCR.yaml');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({
    "message": "Restful API BCR SUCCESSFUL"
  })
});

app.use(bodyParser.json());
app.use('/api', carRoutes);
app.use('/api', userRoutes);
app.use('/api', logActivityRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
