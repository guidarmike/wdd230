const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('ul');

const messageDiv = document.querySelector('#message');
const scriptureList = ["2 Nephi 31", "Helaman 12", "Alma 5", "Moroni 10"];
let lastWeekFavorite = '';

button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        
        li.textContent = input.value;
        deleteButton.textContent = '❌';
        li.append(deleteButton);
        list.append(li);
        
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });
        
        input.value = '';

        input.focus();
        flashCursor(input, 3, 500)

    } else {
        input.focus();
    }
});

function flashCursor(inputElement, flashes, delay) {
    let count = 0;
    const intervalId = setInterval(() => {
        if (count % 2 === 0) {
            inputElement.style.borderRight = '2px solid black';
        } else {
            inputElement.style.borderRight = 'none';
        }
        count++;
        if (count >= flashes * 2) {
            clearInterval(intervalId);
            inputElement.style.borderRight = 'none';
        }
    }, delay);
}
//Added Feature
function getRandomScripture() {
    const randomIndex = Math.floor(Math.random() * scriptureList.length);
    return scriptureList[randomIndex];
}

function displayLastWeekFavorite() {
    lastWeekFavorite = getRandomScripture();
    messageDiv.textContent = `Last week's most favorite chapter was ${lastWeekFavorite}.`;
}

displayLastWeekFavorite();