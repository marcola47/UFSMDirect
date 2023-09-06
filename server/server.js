import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import clear from 'clear';
import { config } from 'dotenv';

import router from './routes.js';

clear();
config();

const app = express();
const port = process.env.PORT || 9000;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
const corsOptions = { origin: corsOrigin, credentials: true, optionsSuccessStatus: 200 };

app.listen(port, () => console.log(`Server is running on port ${port}`));
app.use(express.json());
app.use(cors(corsOptions));
app.use('/', router);

const dbHost = process.env.DB_HOST;
mongoose.connect(dbHost);
mongoose.connection.on("error", console.error.bind(console, "could not establish connection with mongodb"))
mongoose.connection.once("open", () => {console.log("connected to mongodb\n")});

// MODELS:
//
//      Chat: Chat
//    Course: Disciplina
//  Feedback: Feedback de importância/dificuldade
//      Jobs: Áreas de atuação
//   Nucleus: Núcleos formativos
//   Program: Curso
// Testimony: Depoimento
//     Token: JWT de refresh
//      User: Usuário
