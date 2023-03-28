const express = require('express');
const { upload, requireSignIn, adminMiddleWare } = require('../../common-middleware/index');
const { createPage, getPage } = require('../../controller/admin/page');
const router = express.Router();

router.post(`/create`, requireSignIn, adminMiddleWare, upload.fields([
    { name: 'banners' },
    { name: 'products' }
]), createPage)

router.get(`/:category/:type`, getPage);

module.exports = router;
