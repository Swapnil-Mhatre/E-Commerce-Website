const scrolltoTop = () => {
  const backToTopButton = document.getElementById("backToTop");

  if (backToTopButton) {
    backToTopButton.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  }
};
scrolltoTop();
