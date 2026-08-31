let imgUrl;

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature",
)
  .then((res) => res.json())
  .then((data) => {
    imgUrl = data.urls.regular;
    document.documentElement.style.setProperty(
      "--bg-image",
      `url("${imgUrl}")`,
    );
    console.log(imgUrl);
  });
