document.addEventListener("DOMContentLoaded", function () {
    let lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
        document.querySelector(".visit-message").textContent = "Welcome! Let us know if you have any questions.";
    } else {
        lastVisit = parseInt(lastVisit);
        const currentDate = Date.now();
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / millisecondsPerDay);

        if (daysSinceLastVisit === 1) {
            document.querySelector(".visit-message").textContent = "Back so soon! Awesome!";
        } else {
            document.querySelector(".visit-message").textContent = `You last visited ${daysSinceLastVisit} day${daysSinceLastVisit === 1 ? '' : 's'} ago.`;
        }
    }

    localStorage.setItem("lastVisit", Date.now());
});
