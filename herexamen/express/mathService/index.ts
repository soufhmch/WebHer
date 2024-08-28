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

app.set("port", process.env.PORT ?? 3000);

app.get("/", (req, res) => {
    let eersteGetal: any = req.query.eersteGetal ? req.query.eersteGetal: "";
    let tweedeGetal: any = req.query.tweedeGetal ? req.query.tweedeGetal: "";
    
    
    
    
    
    res.render("index", {
        title: "Hello World",
        message: "Hello World"
    })
});

app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});