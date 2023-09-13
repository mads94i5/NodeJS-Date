const { calcDate, getAgeFromDate } = require("./utils/utils");

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home/index.html");
});

app.get("/datecalc", (req, res) => {
    res.sendFile(__dirname + "/public/datecalc/index.html");
});

app.post("/api/datecalc", (req, res) => {
    isDateAcceptable = calcDate(getAgeFromDate(req.body.yourBirthDate), getAgeFromDate(req.body.dateBirthDate));
    res.send({ data: isDateAcceptable });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log("Error starting the server: " + error);
        return;
    }
    console.log("Server is running on port: " + PORT);
});