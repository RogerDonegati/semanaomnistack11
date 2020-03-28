const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
// "./" para informar que é um arquivo e não um pacote

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
