const body = document.body;
const div_1 = document.createElement("div");
div_1.classList.add("container");
body.append(div_1);
const div_2 = document.createElement("div");
div_2.classList.add("row", "country_row");
div_1.append(div_2);

async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  for (countries of data) {
    const div_3 = document.createElement("div");
    div_3.classList.add("card", "h-100", "col-lg-4", "col-sm-12");
    div_2.append(div_3);
    const div_4 = document.createElement("div");
    div_4.classList.add("card-header", "text-center", "name");
    div_4.textContent = `${countries?.name?.common}`;
    div_3.append(div_4);
    const img = document.createElement("img");
    img.classList.add("card-img-top", "flag", "mt-3");
    img.setAttribute(
      "src",
      `${countries?.flags?.png ? countries?.flags?.png : countries?.flags?.svg}`
    );
    div_3.append(img);
    const div_5 = document.createElement("div");
    div_5.classList.add("card-body");
    div_3.append(div_5);
    const div_6 = document.createElement("div");
    div_6.classList.add("capital");
    div_6.innerHTML = `Capital: <span>${countries?.capital[0]}</span>`;
    const div_7 = document.createElement("div");
    div_7.classList.add("Region");
    div_7.innerHTML = `Region: <span>${countries?.region}</span>`;
    const div_8 = document.createElement("div");
    div_8.classList.add("latlng");
    div_8.innerHTML = `LatLng: <span>${countries?.latlng[0]}, ${countries?.latlng[1]} </span>`;
    const div_9 = document.createElement("div");
    div_9.classList.add("country_code");
    div_9.innerHTML = `Country Code: <span>${countries?.altSpellings[0]}</span>`;
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.textContent = "click for weather";
    div_5.append(div_6, div_7, div_8, div_9, button);
    const res2 = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${countries?.latlng[0]}&lon=${countries?.latlng[1]}&appid=fbb352a417c0f980535df5d4a273be35&units=metric`
    );
    const data2 = await res2.json();
    button.addEventListener("click", myFunction);
    function myFunction() {
      let a = div_4.textContent;
      let b = img.getAttribute("src");
      div_2.classList.add("hidden");
      let x = [];
      x.push(div_8.firstElementChild.textContent);
      x = x[0].split(",").map(Number);
      const div_a = document.createElement("div");
      div_a.classList.add("container");
      body.append(div_a);
      const div_b = document.createElement("div");
      div_b.classList.add("row", "country_row");
      div_a.append(div_b);
      const div_c = document.createElement("div");
      div_c.classList.add("card", "col-lg-4", "col-sm-12", "text-center", "weather-data");
      div_b.append(div_c);
      const div_d = document.createElement("div");
      div_d.classList.add("card-header", "text-center", "name");
      div_d.textContent = `${a}`;
      div_c.append(div_d);
      const img2 = document.createElement("img");
      img2.classList.add("card-img-top", "flag", "mt-3");
      img2.setAttribute("src", `${b}`);
      div_c.append(img2);
      const div_body = document.createElement("div");
      div_body.classList.add("card-body");
      div_c.append(div_body);
      const div_e = document.createElement("div");
      div_e.classList.add("Weather");
      div_e.innerHTML = `Weather: <span>${data2?.weather[0].description}</span>`;
      const div_f = document.createElement("div");
      div_f.classList.add("temp");
      div_f.innerHTML = `temp: <span>${data2?.main.temp}°C </span>`;
      const div_g = document.createElement("div");
      div_g.classList.add("wind_speed");
      div_g.innerHTML = `wind speed: <span>${data2?.wind.speed}m/sec </span>`;
      const button2 = document.createElement("button");
      button2.classList.add("btn", "btn-primary");
      button2.textContent = "Click to return";
      div_body.append(div_e, div_f, div_g, button2);
      button2.addEventListener("click", () => {
        location.reload();
      });
    }
  }
}

getCountries();
