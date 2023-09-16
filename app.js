// const { calcDate, getAgeFromDate } = require("./utils/utils");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/home/index.html");
});

app.get("/datecalc", (req, res) => {
  res.sendFile(__dirname + "/public/datecalc/index.html");
  initDateCalc();
});

app.post("/api/datecalc", (req, res) => {
  isDateAcceptable = calcDate(
    getAgeFromDate(req.body.yourBirthDate),
    getAgeFromDate(req.body.dateBirthDate)
  );
  res.send({ data: isDateAcceptable });
});

function calcDate(yourAge, dateAge) {
  lowestRecommendedAge = yourAge / 2 + 7;
  lowestDatingAge = 15;
  if (dateAge < lowestDatingAge && yourAge < lowestDatingAge) {
    return "You're both too young to be dating!";
  } else if (dateAge < lowestDatingAge) {
    return "Your date is too young to be dating, you disgusting pig!";
  } else if (yourAge < lowestDatingAge) {
    return "You are too young to be dating.";
  } else if (yourAge < dateAge) {
    return "Your date is older than you.";
  } else if (yourAge == dateAge) {
    return "Your date is same age as you.";
  } else if (lowestRecommendedAge > dateAge) {
    return "Your date is outside the acceptable age range, you disgusting pig!";
  } else {
    return "Your date is within the acceptable age range.";
  }
}

function getAgeFromDate(date) {
  const currentDate = new Date();
  const inputDate = new Date(date);

  if (
    inputDate.getDate() < currentDate.getDate() &&
    inputDate.getMonth() < currentDate.getMonth()
  ) {
    return currentDate.getFullYear() - inputDate.getFullYear() - 1;
  } else {
    return currentDate.getFullYear() - inputDate.getFullYear();
  }
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
  if (error) {
    console.log("Error starting the server: " + error);
    return;
  }
  console.log("Server is running on port: " + PORT);
});
