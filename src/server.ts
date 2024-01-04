import express from'express';
import router from './router';
import { protect } from './modules/auth';
import cors from 'cors';
import morgan from 'morgan'
import { createUser, signin } from './handlers/user';

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
app.post('/user', createUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({message: 'Unauthorized'})
    } else if (err.type === 'input') {
        res.status(400).json({message: 'Invalid input'})
    } else {
        res.status(500).json({message: 'Server error'})
    }
})
export default app;