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

fetchBgImg();
fetchCryptoData();

setInterval(fetchCryptoData, 60000);
