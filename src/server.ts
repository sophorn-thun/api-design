import express from'express';
import router from './router';
import { protect } from './modules/auth';
import cors from 'cors';
import morgan from 'morgan'

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    console.log('hello')
    res.status(200);
    res.json({message: 'hello'})
})

app.use('/api', protect, router)

export default app;