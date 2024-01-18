function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
}

function setLastModified() {
    const lastModifiedDate = document.lastModified;
    document.getElementById('lastModified').textContent = "Last Modified: " + lastModifiedDate;
}

window.onload = function () {
    setCurrentYear();
    setLastModified();
};