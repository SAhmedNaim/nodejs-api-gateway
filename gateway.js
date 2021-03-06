const express = require('express');
const helmet = require('helmet')
const app = express();
const routes = require('./routes');

const PORT = 3000;

app.use(express.json());
app.use(helmet())
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Gateway started to the port ${PORT}`);
});
