const API_KEY = "8d288c369cb01b7615b4099e7706d00c";
const searchForm = document.querySelector(".search-form");
const forcastTable = document.querySelector(".weather-forcast__table");

// Modal

const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
const modalText = document.querySelector(".modal__text");

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Search form

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = Array.from(searchForm[0].value).join("").trim();

  // let xhr = new XMLHttpRequest();
  // xhr.open(
  //   "GET",
  //   `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&cnt=40&units=metric`
  // );
  // xhr.send();
  // xhr.onload = function () {
  //   const data = JSON.parse(xhr.responseText);
  //   if (data.cod !== "200") {
  //     modalText.innerText = data.message;
  //     modal.style.display = "block";
  //     return;
  //   }
  //   weatherTableCreator(data.list);
  // };
  // xhr.onerror = function () {
  //   modalText.innerText = data.message;
  //   modal.style.display = "block";
  // };

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&cnt=40&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== "200") {
        modalText.innerText = data.message;
        modal.style.display = "block";
        return;
      }
      weatherTableCreator(data.list);
    })
    .catch(() => {
      modalText.innerText = data.message;
      modal.style.display = "block";
    });
});

// weather table creator function

function weatherTableCreator(list) {
  if (list) forcastTable.innerHTML = "";

  list?.forEach((elem) => {
    const weatherTimeBlock = document.createElement("div");
    weatherTimeBlock.classList.add("weather-time-block");

    const weatherTimeBlockImg = document.createElement("img");
    weatherTimeBlockImg.setAttribute(
      "src",
      `https://openweathermap.org/img/w/${elem.weather[0].icon}.png`
    );
    weatherTimeBlockImg.setAttribute("alt", elem.weather[0].description);
    weatherTimeBlockImg.classList.add("weather-time-block__img");

    const weatherTimeBlockCelsius = document.createElement("p");
    weatherTimeBlockCelsius.innerText = elem.main.temp.toFixed() + " °C";
    weatherTimeBlockCelsius.classList.add("weather-time-block__celsius");

    const weatherTimeBlockTime = document.createElement("p");
    weatherTimeBlockTime.innerText = elem.dt_txt;
    weatherTimeBlockTime.classList.add("weather-time-block__time");

    const weatherTimeBlockMinCelsius = document.createElement("p");
    weatherTimeBlockMinCelsius.innerText =
      "Minimal: " + elem.main.temp_min + " °C";
    weatherTimeBlockMinCelsius.classList.add("weather-time-block__min-celsius");

    const weatherTimeBlockMaxCelsius = document.createElement("p");
    weatherTimeBlockMaxCelsius.innerText =
      "Maximal: " + elem.main.temp_max + " °C";
    weatherTimeBlockMaxCelsius.classList.add("weather-time-block__max-celsius");
    const weatherTimeBlockWind = document.createElement("p");
    weatherTimeBlockWind.innerText = "Wind: " + elem.wind.speed + " m/s";
    weatherTimeBlockWind.classList.add("weather-time-block__wind");

    const weatherTimeBlockWindArrow = document.createElement("p");
    weatherTimeBlockWindArrow.innerText = "\u2191";
    weatherTimeBlockWindArrow.classList.add("weather-time-block__wind-arrow");
    weatherTimeBlockWindArrow.style.transform = `rotate(${elem.wind.deg}deg)`;

    weatherTimeBlock.append(
      weatherTimeBlockImg,
      weatherTimeBlockCelsius,
      weatherTimeBlockTime,
      weatherTimeBlockMinCelsius,
      weatherTimeBlockMaxCelsius,
      weatherTimeBlockWind,
      weatherTimeBlockWindArrow
    );

    forcastTable.appendChild(weatherTimeBlock);
  });
}
