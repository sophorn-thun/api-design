import express from'express';

export const app = express();

app.get('/', (req, res) => {
    console.log('hello')
    res.status(200);
    res.json({message: 'hello'})
})

export default app;