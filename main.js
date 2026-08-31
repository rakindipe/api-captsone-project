let imgUrl;
let imgLocation;
let imgAuthor;

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

    if (imgLocation === null) {
      document.getElementById("author-display").innerHTML = `
      By: ${imgAuthor}
    `;
    } else {
      document.getElementById("author-display").innerHTML = `
      ${imgLocation}
      <br>
      By: ${imgAuthor}
    `;
    }
  });
