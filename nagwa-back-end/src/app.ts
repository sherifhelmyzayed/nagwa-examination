import express from 'express';
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/word', (req, res) => {
    res.send('Word enpoint works!');
});

app.get('/rank', (req, res) => {
    res.send('rank endpoint works!');
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});