import express from "express";



const app = express();

app.get("/karen", (req, res) => {
    res.send("Hello world");
})


app.listen(3001, 'localhost', () =>{
    console.log("Listen on 30001");
});