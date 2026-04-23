const express = require("express");

const app =  express();

const PORT = process.env.Port || 3000;

app.use(express.json());

