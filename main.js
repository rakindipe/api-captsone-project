let imgUrl;
let imgLocation;
let imgAuthor;
let cryptoName;
let crytpoImg;

// get bg-image
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
    console.log(imgLocation);
    console.log(imgAuthor);
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

// get crytpo info
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    cryptoName = data.name;
    crytpoImg = data.image.small;
    // console.log(cryptoName);
    // console.log(crytpoImg);

    document.getElementById("crypto").innerHTML = `
    <img src="${crytpoImg}"/>
    <span>${cryptoName}</span>
    `;
  })
  .catch((err) => console.error(err));

// get coin(s) prices
// fetch(
//   "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,hyperliquid&vs_currencies=usd",
// )
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });
