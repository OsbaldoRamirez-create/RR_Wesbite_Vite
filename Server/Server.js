import 'dotenv/config';
import process from 'process';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import redis from 'ioredis';

const app = express ();

const whitelist= ['localhost:5173','https://ramirez-landscaping-a2217ac6fd40.herokuapp.com', 'rrlandscapingsv.com'];

const corsOptions = {
    origin: function (origin, callback) {

        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 hours

};

const PORT = process.env.PORT || 3000;

app.use (cors (corsOptions));
app.use (express.json ());
