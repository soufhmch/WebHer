import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app : Express = express();



app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3002);

interface DadJoke {
    id: string;
    joke: string;
    status: number;
}


async function fetchDadJoke(): Promise<DadJoke> {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
    });
    const data : DadJoke = await response.json();
    return data;
}

app.get('/joke/json', async (req, res) => {
    const dadJoke = await fetchDadJoke();
    res.json(dadJoke);
});

app.get('/', async (req, res) => {
    const dadJoke = await fetchDadJoke();
    res.send(`<h1>${dadJoke.joke}</h1>`);
});

app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});