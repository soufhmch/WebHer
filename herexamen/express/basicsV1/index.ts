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

app.get("/",(req,res)=>{
    let randomGetal : number = Math.random()*100;
    let randomGetal2 : number = randomGetal * 2;
    res.render("index", 
        {    
            title: "basicEjs",
            message: "hello",
            aRandomNumber: randomGetal,
            name: "Sven",
            age: 40,
            someOtherNumber: randomGetal2
        });
})

app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});