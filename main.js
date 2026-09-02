let imgUrl;
let imgLocation;
let imgAuthor;
let cryptoName;
let crytpoImg;
let crytpoPrice;
let crytpoHigh;
let cryptoLow;

/* get bg-image */
const fetchBgImg = () => {
  fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature",
  )
    .then((res) => res.json())
    .then((data) => {
      imgUrl = data.urls.full;
      imgLocation = data.location.name;
      imgAuthor = data.user.name;
      document.documentElement.style.setProperty(
        "--bg-image",
        `url("${imgUrl}")`,
      );
      // console.log(imgLocation);
      // console.log(imgAuthor);
      // console.log(data);

      // don't display "null"
      if (imgLocation === null) {
        document.getElementById("author-display").innerHTML = `
        <p>
        ${imgAuthor}
        </p>
      `;
      } else {
        document.getElementById("author-display").innerHTML = `
        <p>
        ${imgLocation}
        </p>
        <p>
        ${imgAuthor}
        </p>
      `;
      }
    })
    .catch((err) => {
      console.error(err);
      console.log("Something went wrong! 😑");

      imgUrl = "images//default-bg-img.jpeg";

      document.documentElement.style.setProperty(
        "--bg-image",
        `url("${imgUrl}")`,
      );
    });
};

/* get crytpo info */
const fetchCryptoData = () => {
  fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);

      cryptoName = data.name;
      crytpoImg = data.image.small;

      crytpoPrice = data.market_data.current_price.usd;
      crytpoHigh = data.market_data.high_24h.usd;
      cryptoLow = data.market_data.low_24h.usd;

      document.getElementById("crypto").innerHTML = `
      <div class="crypto-top">
        <img src="${crytpoImg}"/>
        <span>${cryptoName}</span>
      </div>
      <p>🎯: $${crytpoPrice.toLocaleString()}</p>
      <p>📈: $${crytpoHigh.toLocaleString()}</p>
      <p>📉: $${cryptoLow.toLocaleString()}</p>
      `;
    })
    .catch((err) => console.error(err));
};

/* set time */
const updateTime = () => {
  const now = new Date();
  const timeOptions = { timeStyle: "short" };

  // Format the time string
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    now,
  );

  // Replace the colon in the formatted string with a wrapped span
  const animatedTimeHTML = formattedTime.replace(
    ":",
    '<span class="colon">:</span>',
  );

  // Inject the formatted HTML into your element
  document.querySelector(".time").innerHTML = animatedTimeHTML;
};

/* get user's location for weather api */
const getUserLocation = () => {
  // get user long. & lat.
  const userLocation = navigator.geolocation.getCurrentPosition((position) => {
    const userLocation = [position.coords.latitude, position.coords.longitude];
    // console.log(userLocation);

    fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${userLocation[0]}&lon=${userLocation[1]}&units=imperial}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Weather data not available");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);

        // get weather icon
        const weatherIconData = data.weather[0].icon;

        // api won't return temp in fahrenheit...
        // so have to convert from kelvin to fahrenheit...
        const tempInKelvin = data.main.temp;
        const tempInFahrenheit = Math.round((tempInKelvin - 273.15) * 1.8 + 32);

        // city & country names
        const city = data.name;
        const country = data.sys.country;

        document.querySelector("#weather").innerHTML = `
          <div class="weather-top">
            <img src="https://openweathermap.org/img/wn/${weatherIconData}@2x.png"/>
            <span class="temp">${tempInFahrenheit}°</span>
          </div>
          <p class="location">${city}, ${country}</p>
        `;
      })
      .catch((err) => console.error(err));
  });

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      },
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

fetchBgImg();
fetchCryptoData();
updateTime();
getUserLocation();

setInterval(fetchCryptoData, 60000);
setInterval(updateTime, 1000);
setInterval(getUserLocation, 60000);

//
