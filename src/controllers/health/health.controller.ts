import router from 'koa-joi-router';
import pingRoute from './routes/ping.route';

const healthController = router();
healthController.prefix('/health');
healthController.route(pingRoute);

export default healthController;