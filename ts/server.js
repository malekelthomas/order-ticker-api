var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import cors from 'cors';
import { client } from './square-client.js';
import { ApiError } from 'square';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
const serverOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};
const app = express();
app.use(cors());
app.use(express.json());
let sq = client;
dotenv.config();
let token;
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = sq.oAuthApi.obtainToken({
            clientId: process.env.REACT_APP_SQUARE_APP_ID,
            clientSecret: process.env.REACT_APP_SQUARE_SECRET,
            grantType: 'authorization_code',
            code: req.body.code,
        });
        token = (yield result).body;
        console.log(token);
        return res.json({ result: 'success' });
    }
    catch (err) {
        if (err instanceof ApiError) {
            const errors = err.result;
            return res.json({ error: errors });
        }
    }
}));
app.post('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
}));
const server = https.createServer(serverOptions, app);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen(9000);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
});
start();
