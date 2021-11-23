const express = require('express');
const neo4j = require('neo4j-driver');
const driver = require('./neo4jDriver');
const _ = require('lodash');

const api = express();
const apiPort = process.env.API_PORT || 2137;


api.use(express.json());

api.listen(apiPort, () => {
    console.log(`Server listening on port: ${apiPort}`);
});