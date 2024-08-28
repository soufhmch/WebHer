import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { name } from "ejs";
import { exit } from "process";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.get("/:language", (req, res) => {
  let lang: any = req.query.lang;

  console.log(req.params);

  if (req.query.lang) {
    lang = req.query.lang;
    switch (lang) {
      case "en":
        res.render("index", {
          title: "Hello World",
          message: "Hello World",
        });
        break;
      case "es":
        res.render("index", {
          title: "Hello World",
          message: "Hola mundo",
        });
        break;
      case "fr":
        res.render("index", {
          title: "Hello World",
          message: "Bonjour monde",
        });
        break;

      default:
        res.render("index", {
          title: "Hello World",
          message: "Hello World",
        });
        break;
    }
  } else {
    lang = "";
    res.render("index", {
      title: "Hello World",
      message: "Hello World",
    });
  }
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
