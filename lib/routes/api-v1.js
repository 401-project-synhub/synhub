'use strict';

const express = require('express');
const router = express.Router();
// const {router} = require('../../app.js');

const getModel = require('../middleware/model-finder.js');
const bearerAuth = require('../../src/auth-middleware/bearer.js');
const permissionAuth = require('../../src/auth-middleware/authorize.js');

router.param('model', getModel);

router.get('/:model', bearerAuth, getHandler);
router.get('/:model/:id', getHandler);
router.post('/:model', postHandler);
router.put('/:model/:id', bearerAuth, permissionAuth('update'), updateHandler);
router.delete('/:model/:id', bearerAuth, permissionAuth('delete'), deleteHandler);

function getHandler(req, res, next){
  console.log(req.model);
  req.model.read(req.params.id).then(records => {
    console.log(`hi from the get handler on ${req.model}`);
    let count = records.length;
    res.json({count, records});
  }).catch(err => {
    next(err.message);
  });
}

function postHandler(req, res, next){
  req.model.create(req.body).then(record => {
    res.json({record});
  }).catch(err => {
    next(err.message);
  });
}

function updateHandler(req, res, next){
  req.model.update(req.params.id, req.body).then(record => {
    res.json(record);
  }).catch(err => {
    next(err.message);
  });
}

function deleteHandler(req, res, next){
  req.model.delete(req.params.id).then(record => {
    res.json({record});
  }).catch(err => {
    next(err.message);
  });
}

module.exports = router;