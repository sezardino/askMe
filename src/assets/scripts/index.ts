import Controller from './controller';
import api from './api';

const controller = new Controller('Edward', '.app');

api.getQuestions().then((data) => controller.render(data));
