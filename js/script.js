const API_KEY = "8d288c369cb01b7615b4099e7706d00c";
const searchForm = document.querySelector(".weather__form");
const searchCity = document.querySelector(".weather__form-search");
const weatherTable = document.querySelector(".weather__table");

const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
const modalText = document.querySelector(".modal__text");

function openModal(text) {
  modalText.innerText = text;
  modal.style.display = "block";
}

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchCity.value.trim();

  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&cnt=40&units=metric`
  );

  xhr.send();

  xhr.onload = function () {
    const data = JSON.parse(xhr.responseText);

    if (xhr.status !== 200) {
      return openModal(data.message);
    }
    weatherTableCreator(data.list);
  };

  xhr.onerror = function () {
    return openModal(data.message);
  };
});

function weatherTableCreator(list) {
  if (list) weatherTable.innerHTML = "";

  list?.forEach((elem) => {
    const weatherBlock = document.createElement("div");
    weatherBlock.classList.add("weather-block");

    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `https://openweathermap.org/img/w/${elem.weather[0].icon}.png`
    );
    img.setAttribute("alt", elem.weather[0].description);
    img.classList.add("weather-block__img");

    const celsius = document.createElement("p");
    celsius.innerText = elem.main.temp.toFixed() + " °C";
    celsius.classList.add("weather-block__celsius");

    const time = document.createElement("p");
    time.innerText = elem.dt_txt;
    time.classList.add("weather-block__time");

    const minCelsius = document.createElement("p");
    minCelsius.innerText = "Minimal: " + elem.main.temp_min + " °C";
    minCelsius.classList.add("weather-block__text");

    const maxCelsius = document.createElement("p");
    maxCelsius.innerText = "Maximal: " + elem.main.temp_max + " °C";
    maxCelsius.classList.add("weather-block__text");

    const wind = document.createElement("p");
    wind.innerText = "Wind: " + elem.wind.speed + " m/s";
    wind.classList.add("weather-block__text");

    const windArrow = document.createElement("p");
    windArrow.innerText = "\u2191";
    windArrow.classList.add("weather-block__wind-arrow");
    windArrow.style.transform = `rotate(${elem.wind.deg}deg)`;

    weatherBlock.append(
      img,
      celsius,
      time,
      minCelsius,
      maxCelsius,
      wind,
      windArrow
    );

    weatherTable.appendChild(weatherBlock);
  });
}
