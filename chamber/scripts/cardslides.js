document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const currentEvents = document.querySelector(".current-events");
    const weatherCard = document.querySelector(".weather-card");
    const slides = [currentEvents, weatherCard];
    
    const slideInterval = setInterval(nextSlide, 8000); 

    function nextSlide() {
        slides[currentSlide].style.display = "none";
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.display = "block";
    }
});
