import express from 'express'
const app = express();
import cors from 'cors';
import aiRoutes from './routes/ai.routes.js';

app.use(cors());
app.use(express.json());
app.get('/' , (req , res) => {
    res.send("Hello world")
})

app.use('/ai' , aiRoutes);

export default app;