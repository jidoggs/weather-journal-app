const generateBtn = document.querySelector("#generate");

const base_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "d326572aaea765ff532dc93ae3ebc934";

const d = new Date();
let newDate = d.toLocaleString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const getReport = async (zipCode) => {
  const response = await fetch(`${base_URL}?zip=${zipCode},us&appid=${API_KEY}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return response;
};

const postData = async (url = "", data = {}) => {
  const postRequest = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  console.log(postRequest);
  return postRequest;
};
const updateUI = async () => {
  await fetch("http://localhost:3000/home")
    .then((req) => req.json())
    .then((res) => {
      document.getElementById("date").innerHTML = res.date;
      document.getElementById("temp").innerHTML = res.temperature;
      document.getElementById("content").innerHTML = res.user_response;
    })
    .catch((err) => console.log("error", err));
};

const submitForm = (e) => {
  e.preventDefault();
  const zip = document.getElementById("zip").value;
  const userFeel = document.getElementById("feelings").value;
  getReport(zip).then((data) => {
    // console.log(data);
    postData("http://localhost:3000/addNewWeatherData", {
      temperature: data.main.temp,
      date: newDate,
      user_response: userFeel,
    }).then(() => updateUI());
  });
};

generateBtn.addEventListener("click", submitForm);
