import Koa from 'koa';
import healthController from './controllers/health/health.controller';

const app = new Koa();

// Initialize controllers and routes
app.use(healthController.middleware());

app.listen(process.env.SERVER_PORT, () => {
  console.log('Service started...');
});