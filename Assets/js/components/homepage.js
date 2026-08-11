import { getLatestProduct } from "../api/dataApi.js";
import { displayProducts } from "../products/products.js";

const handleSlides = () => {
  const slides = document.querySelector(".slides");
  const arrows = document.querySelectorAll(".arrows i");
  let sliderTime = 7000;
  if (slides) {
    setInterval(() => {
      forward();
    }, sliderTime);
  }

  const sliderData = [
    {
      title: "Occational Clothes",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero culpa sed facilis cupiditate quod eligendi ipsa nisi dolore debitis eveniet.",
      imgUrl: "./Assets/Images/Slides/Occational_Clothes.jpg",
    },
    {
      title: "Latest Trends",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero culpa sed facilis cupiditate quod eligendi ipsa nisi dolore debitis eveniet.",
      imgUrl: "./Assets/Images/Slides/Latest_Trends.avif",
    },
    {
      title: "Bags and Purses",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero culpa sed facilis cupiditate quod eligendi ipsa nisi dolore debitis eveniet.",
      imgUrl: "./Assets/Images/Slides/Bags.avif",
    },
  ];
  let clutter = "";
  if (slides) {
    sliderData.forEach((slide, idx) => {
      clutter += `
            <div class="slide" id=${idx}>
                <img src=${slide.imgUrl} alt="">
                <div class="description">
                    <h2>${slide.title}</h2>
                    <p>${slide.description}</p>
                    <button>Shop Now</button>
                </div>
            </div>`;
      slides.innerHTML = clutter;
    });
  }

  function forward() {
    const newSlides = document.querySelectorAll(".slide");
    slides.appendChild(newSlides[0]);
  }

  function backward() {
    const newSlides = document.querySelectorAll(".slide");
    let lastSlidePos = newSlides.length - 1;
    slides.prepend(newSlides[lastSlidePos]);
  }

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) =>
      e.target.id === "forward" ? forward() : backward(),
    );
  });
};
handleSlides();

const displayLatestProducts = async () => {
  const latestProductsCon = document.querySelector(".products .wrapper");

  if (latestProductsCon) {
    const latestProducts = await getLatestProduct();
    displayProducts(latestProducts, latestProductsCon, "home");
  }
};
displayLatestProducts();
