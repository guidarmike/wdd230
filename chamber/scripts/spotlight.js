fetch('https://guidarmike.github.io/wdd230/chamber/data/members.json')
    .then(response => response.json())
    .then(data => {
        const members = data.members;
        const silverGoldMembers = members.filter(member => member.membership_level === 'Silver' || member.membership_level === 'Gold');

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        const selectedMembers = shuffleArray(silverGoldMembers).slice(0, Math.floor(Math.random() * 2) + 2);

        const spotlightsContainer = document.getElementById('company-spotlights');

        selectedMembers.forEach(member => {
            const spotlightHTML = `
          <div class="spotlight">
            <h2>${member.name}</h2>
            <p>${member.other_info}</p>
            <a href="#">${member.website}</a> <br>
            <a href="#">${member.phone}</a> <br>
            <a href="#">Our page</a>
          </div>
        `;
            spotlightsContainer.innerHTML += spotlightHTML;
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));