import express from 'express';
import fs from 'fs';

const app = express();
const port = 4000;

interface QuestionInterface {
    id: number;
    word: string;
    pos: string;
    answer: string | null;
}

interface QuestionsInterface extends Array<QuestionInterface> { }



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

app.get('/rank', (req, res) => {
    res.send('rank endpoint works!');
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});