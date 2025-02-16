import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import routes from './routes';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

const openApiDocument = yaml.load(path.join(__dirname, '..', 'swagger.yaml')); // Or openapi.yaml

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const options = {
  explorer: true
};

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument, options)
);

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});