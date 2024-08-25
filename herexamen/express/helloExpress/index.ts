import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import {thisIsMe, pokemon} from "./interface";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT ?? 3001);


const pika = "https://pokeapi.co/api/v2/pokemon/pikachu"




let isMe: thisIsMe = 
        {name: "souf", age: 24, profilePic: "assets/pic.jpg"};


app.get("/", (req, res) => {
    res.render("index", {
        title: "Hello World",
        message: "Hello World"
    })
});

app.get("/pikajson", async (req, res)=>{
    const pikachuuu = await fetch(pika)
    const pikachu: pokemon = await pikachuuu.json();
    res.json({
    id: pikachu.id,
    name: pikachu.name,
    weight:  pikachu.weight,
    front: pikachu.sprites.front_shiny,
    back: pikachu.sprites.back_shiny
})
});

app.get("/pikahtml", async (req, res) =>{
    const pikachuuu = await fetch(pika)
    const pikachu: pokemon = await pikachuuu.json();
    res.render("pikahtml", {
        pokemon: {
            id: pikachu.id,
            name: pikachu.name,
            weight: pikachu.weight,
            front: pikachu.sprites.front_shiny,
            back: pikachu.sprites.back_shiny
        }
    });

});

app.get("/whoami", (req, res) => {
    res.render("whoami", {
        title: "Hello World",
        isMe: isMe
    })
});

app.get("/whoamijson", (req, res) => {
    res.json(isMe)
});

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

app.get("/color", (req, res) => {
    const color = getRandomColor();

    res.render("color", {
        color: color
    });
});


app.listen(app.get("port"), () => {
    console.log(`Server started on http://localhost:${app.get("port")}`);
});