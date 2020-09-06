import express, { request, response } from 'express';
import multer from 'multer';
const multerConfig = require('../config/multer');

const routes = express();

import ClassesController from '../controllers/ClassesController';
import ConnectionsController from '../controllers/ConnectionsController';
import AuthenticateController from '../controllers/AuthController';
import UserController from '../controllers/UserControllers';
import ForgotPassController from '../controllers/ForgotPassController';
import ForgotPassTesteController from '../controllers/ForgotPassTesteController';
import UpdateAvatar from '../controllers/UploadAvatar';

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const authenticateController = new AuthenticateController();
const usersController = new UserController();
const forgotPassController = new ForgotPassController();
const forgotPassTesteController = new ForgotPassTesteController();
const uploadAvatar = new UpdateAvatar();

routes.post('/classes', classesController.create)
routes.get('/classes', classesController.index)

routes.get('/connection', connectionsController.index);
routes.post('/connection', connectionsController.create);

routes.post('/authenticate', authenticateController.create);

routes.post('/users', usersController.create);
routes.post('/users/mydata', usersController.findDataById);

routes.post('/forgot_password', forgotPassController.create);
routes.post('/reset_password/', forgotPassController.update);

routes.post('/forgot_password_teste', forgotPassTesteController.create);

routes.patch('/uploadImages', multer(multerConfig).single('file'), uploadAvatar.index)

export default routes;
