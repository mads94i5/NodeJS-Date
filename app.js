// const { calcDate, getAgeFromDate } = require("./utils/utils");

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public"));

const API_URL = "https://node-js-date.vercel.app/api/";
// const API_URL = "http://localhost:8080/api/";

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
  console.log("calcDate");
  lowestRecommendedAge = yourAge / 2 + 7;
  if (dateAge < 15) {
    return "Your date is too young to be dating, you disgusting pig!";
  } else if (yourAge < 15) {
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
  console.log("getAgeFromDate");
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

async function handleHttpErrors(res) {
  if (!res.ok) {
    const errorResponse = await res.json();
    const error = new Error(errorResponse.message);
    // @ts-ignore
    error.fullResponse = errorResponse;
    throw error;
  }
  return res.json();
}

async function fetchPostJsonFormData(URL, form, token = null) {
  let formElement = /** @type {HTMLFormElement} */ (form);
  const formData = new FormData(formElement);
  const dataFromForm = {};
  formData.forEach((value, key) => (dataFromForm[key] = value));

  let options = {
    method: "POST",
    body: JSON.stringify(dataFromForm),
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  const addedData = await fetch(URL, options).then(handleHttpErrors);
  return addedData;
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
  if (error) {
    console.log("Error starting the server: " + error);
    return;
  }
  console.log("Server is running on port: " + PORT);
});
