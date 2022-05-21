const { urlencoded } = require('express');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoute = require('./routes/apiRoutes/notes.js');
const htmlRoute = require('./routes/htmlRoutes/index.js');

app.use(express.static('./public'));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoute);
app.use('/', htmlRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;