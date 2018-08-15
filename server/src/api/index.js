import { Router } from 'express';

import { version } from '../../package.json';
import * as controllers from '../controllers/all';
import { authorized } from '../middleware';

let api = Router();

api.get('/pins/:user/:page?', controllers.getPins);

api.get('/pin/:tinyUrl', controllers.getPin);

api.delete('/pin/:hash', authorized, controllers.deletePin);

api.put('/pin', authorized, controllers.addPin);

export default api;