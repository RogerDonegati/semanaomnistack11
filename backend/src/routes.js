const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');



// QUERY PARAMS: Dados após ? no Get
// ROUTE PARAMS: Dados especificando seu get como um id, ficam após a /   Ex: www.website.com/cliente/:id
// BODY PARAMS: Dados enviados via post, nesse caso objetos como JSON por exemplo

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.post('/sessions', SessionController.create);
module.exports = routes;