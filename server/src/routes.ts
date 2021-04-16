//Rota: endereço completo da requisição 
//Recurso: Qual entidade estamos acessando no sistema

//GET: Buscar uma ou mais informações do back-end 
//POST: Criar uma nova informação no back-end
//PUT: Atualizar uma informção existente no back-end
//DELETE: Remover uma informação do back-end

//request Param: Parametros que vem na própria rota que indentificam um recurso, exemplo: 'const id = Number(request.params.id);' o que indentifica é o 'params'.
//Query Param: Parametros que vem na própria rota geralmente opcionais para filtros, paginação, exemplo: 'const search = String(request.query.search);' o que indentifica é o 'query'.
//Request Body: Parametros para criação/atualização de informações.

// import express from 'express'; 

// const app = express();

// const users = [
//     'Diego',
//     'Riquelme',
//     'Matheus',
//     'Pedro'
// ];

// app.get('/', (request, response) => {
    
    // const search = String(request.query.search);

    // const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    //JSON
    // return response.json(filteredUsers)
// });

// app.get('/users/:id', (request, response) => {
//     const id = Number(request.params.id);

//     const user = users[id];

//     return response.json(user);
// })

// app.post('/users', (request, response) => {
//     const data = request.body;

//     console.log(data);

//     const user = {
//         name: data.name,
//         email: data.email
//     };

//     return response.json(user);
// })

import express from 'express';
import { celebrate, Joi } from 'celebrate';
 
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsControllers';
import ItemsController from './controllers/ItemsController'; 

// index, show, create, update, delete

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController(); 

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
    '/points', 
    upload.single('image'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsController.create);
 
export default routes;