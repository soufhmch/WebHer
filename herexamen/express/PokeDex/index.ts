import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
import readline from "readline-sync";

const uri =
  "mongodb+srv://sofianehammich:Sofiane.153@movies-db.moll4.mongodb.net/";
const client = new MongoClient(uri);
dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

interface TeamPokemon {
  _id?: ObjectId;
  pokemon: string;
}

let pokemon: TeamPokemon[] = [
  { pokemon: "Bulbasaur" },
  { pokemon: "Ivysaur" },
  { pokemon: "Venusaur" },
  { pokemon: "Charmander" },
  { pokemon: "Charmeleon" },
  { pokemon: "Charizard" },
  { pokemon: "Squirtle" },
  { pokemon: "Wartortle" },
  { pokemon: "Blastoise" },
  { pokemon: "Caterpie" },
  { pokemon: "Metapod" },
  { pokemon: "Butterfree" },
  { pokemon: "Weedle" },
  { pokemon: "Kakuna" },
  { pokemon: "Beedrill" },
  { pokemon: "Pidgey" },
  { pokemon: "Pidgeotto" },
  { pokemon: "Pidgeot" },
  { pokemon: "Rattata" },
  { pokemon: "Raticate" },
  { pokemon: "Spearow" },
];

let team: string[] = [];
let running = true;

async function main() {
  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db("movies-db");
    const collection = db.collection("pokeTeam");

    // Start the input loop
    do {
      for (let i = 0; i < pokemon.length; i++) {
        console.log(`${i}: ${pokemon[i].pokemon}`);
      }
      let input: string = readline.question(
        "Welke pokemon wil je in je team? [0-20] or type STOP when you want to stop: "
      );

      if (input.toUpperCase() === "STOP") {
        running = false;
      } else {
        let index: number = parseInt(input);
        if (index < 0 || index >= pokemon.length) {
          console.log("Deze pokemon ken ik niet");
        } else if (team.includes(pokemon[index].pokemon)) {
          console.log("Deze pokemon zit al in je team");
        } else {
          // Add the selected Pokémon to the team
          team.push(pokemon[index].pokemon);

          // Insert the selected Pokémon into the MongoDB collection
          await collection.insertOne({ pokemon: pokemon[index].pokemon });

          console.log(
            `${pokemon[index].pokemon} is toegevoegd aan je team en de database.`
          );
        }
      }
    } while (running);

    console.log("Jouw team van pokemon is: ");
    for (let i = 0; i < team.length; i++) {
      console.log(`${i + 1}. ${team[i]}`);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main();

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello World",
    message: "Hello World",
  });
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
