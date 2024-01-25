document.addEventListener('DOMContentLoaded', function () {
    const hamburgerButton = document.getElementById('hamburger');
    const mainMenu = document.querySelector('nav ul');

    hamburgerButton.addEventListener('click', function () {
        mainMenu.classList.toggle('show-menu');
    });
});