const router = require('express').Router();
const notesRoutes = require('../apiRoutes/notes');

router.use('/notes', notesRoutes);

module.exports = router;