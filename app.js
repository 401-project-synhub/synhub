'use strict';
const express = require('express');
const app = express();
const server = require('http').Server(app);
const router = express.Router();
module.exports = {app, express, server, router};