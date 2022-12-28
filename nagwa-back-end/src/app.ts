import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 4000;

interface QuestionInterface {
    id: number;
    word: string;
    pos: string;
    answer: string | null;
}

interface QuestionsInterface extends Array<QuestionInterface> { }

const calculateScore = (score, scoresList) => {
    let counter = 0;
    scoresList.map((item: number) => {
        if (item < (score / 10 * 100)) {
            counter++
        }
    })
    return (Math.round(counter / scoresList.length * 100));
}

app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/word', async (req, res) => {

    try {
        const data = await fs.promises.readFile(__dirname + '/testData.json', 'utf8')
        const wordList = JSON.parse(data).wordList;
        const shuffle = (array: QuestionsInterface) => {
            return array.sort(() => 0.5 - Math.random());
        };
        const shuffledList = shuffle(wordList).slice(0, 10)
        res.send(shuffledList)
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
});

app.post('/rank/:score', async (req, res) => {
    const scoreParam = req.params.score;
    const score = parseInt(scoreParam)

    try {
        const data = await fs.promises.readFile(__dirname + '/testData.json', 'utf8')
        const scoresList = JSON.parse(data).scoresList;
        res.send(`${calculateScore(score, scoresList)}`)
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }


});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});