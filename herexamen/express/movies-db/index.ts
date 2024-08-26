import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
import { moviesInt } from "./interfaces";

dotenv.config();

const app: Express = express();
const uri =
  "mongodb+srv://sofianehammich:Sofiane.153@movies-db.moll4.mongodb.net/";
const client = new MongoClient(uri);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

let movies: moviesInt[] = [
  { name: "The Matrix", myScore: 90, timesViewed: 10 },
  { name: "Pulp Fuction", myScore: 100, timesViewed: 100 },
  { name: "Monster Hunter", myScore: 5, timesViewed: 1 },
  { name: "Blade Runner", myScore: 100, timesViewed: 30 },
  { name: "Austin Powers", myScore: 80, timesViewed: 10 },
  { name: "Jurasic Park 2", myScore: 40, timesViewed: 1 },
  { name: "Ichi the Killer", myScore: 80, timesViewed: 1 },
];
/* async function main() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    let result = await client
      .db("movies-db")
      .collection("movies-db")
      .insertMany(movies);
    console.log(
      `${result.insertedCount} new documents(s) created with the following id(s):`
    );
    console.log(result.insertedIds);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
main(); */

async function toonEerste() {
  await client.connect();
  let res = await client
    .db("movies-db")
    .collection("movies-db")
    .findOne<moviesInt>({});
  console.log(res);
}
toonEerste();

async function toonAlles() {
  await client.connect();
  let res = await client
    .db("movies-db")
    .collection("movies-db")
    .find<moviesInt>({});
  let cursor = await res.toArray();
  console.log(cursor);
  return cursor;
}
toonAlles();

app.get("/", async (req, res) => {
  res.render("index", {
    title: "movie catalogue",
    message: "Hello World",
    toon: await toonAlles(),
  });
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
