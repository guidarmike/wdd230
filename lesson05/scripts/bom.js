const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('ul');

const messageDiv = document.querySelector('#message');
const scriptureList = ["2 Nephi 31", "Helaman 12", "Alma 5", "Moroni 10"];
let lastWeekFavorite = '';

button.addEventListener('click', () => {
    if (input.value !== '') {
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
    } else {
        input.focus();
    }
});

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