const baseURL = "https://guidarmike.github.io/wdd230/";
const linksURL = "https://guidarmike.github.io/wdd230/data/links.json";

async function getLinks() {
  const response = await fetch(linksURL);
  const data = await response.json();
  displayLinks(data.lessons);
}

function displayLinks(weeks) {
  const linksContainer = document.getElementById('links-container');

  weeks.forEach((week, index) => {
    const weekNumber = index + 1;
    const weekDiv = document.createElement('div');
    weekDiv.classList.add('week');

    const heading = document.createElement('h2');
    heading.textContent = `Week ${weekNumber}`;

    const linksList = document.createElement('ul');

    week.links.forEach(link => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = baseURL + link.url;
      anchor.textContent = link.title;
      listItem.appendChild(anchor);
      linksList.appendChild(listItem);
    });

    weekDiv.appendChild(heading);
    weekDiv.appendChild(linksList);
    linksContainer.appendChild(weekDiv);
  });
}

getLinks();
