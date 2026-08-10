const handleTestimonials = () => {
  const testimonialCardsCon = document.querySelector(".testimonial-cards");

  if (testimonialCardsCon) {
    setInterval(() => {
      slideCards();
    }, 5000);
  }

  function slideCards() {
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    testimonialCardsCon.appendChild(testimonialCards[0]);
  }
};
handleTestimonials();