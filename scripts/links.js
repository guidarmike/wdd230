const baseURL = "https://guidarmike.github.io/wdd230/";
const linksURL = "https://guidarmike.github.io/wdd230/data/links.json";

async function getLinks() {
  const response = await fetch(linksURL);
  const data = await response.json();
  displayLinks(data.lessons);
}

function displayLinks(weeks) {
  const linksContainer = document.getElementById('links-container');

  const section = document.createElement('section');
  section.classList.add('card');

  const h3 = document.createElement('h3');
  h3.setAttribute('data-type', 'activities');
  h3.textContent = 'Learning Activities';
  section.appendChild(h3);

  weeks.forEach(week => {
    const weekNumber = week.lesson;
    const p = document.createElement('p');
    const linksText = [];

    linksText.push(`${weekNumber}: `);

    week.links.forEach((link, index) => {
      const linkText = `<a href="${link.url}">${link.title}</a>`;
      if (index > 0) {
        linksText.push(' | ');
      }
      linksText.push(linkText);
    });

    p.innerHTML = linksText.join('');
    section.appendChild(p);
  });

  linksContainer.appendChild(section);
}

getLinks();
