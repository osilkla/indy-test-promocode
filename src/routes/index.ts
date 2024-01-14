import { Express } from 'express';
import router from '../controllers/index.js';

const routers = (app: Express) => {
    app.use('/api/v1', router);
};

export default routers;

