const express = require('express');
const { requireSignIn, adminMiddleWare } = require('../../common-middleware/index');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();


router.post('/', requireSignIn, adminMiddleWare,initialData);


module.exports = router;