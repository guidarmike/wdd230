document.addEventListener('DOMContentLoaded', function () {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const membersList = document.getElementById('members-list');
  
    const membersData = fetch('https://guidarmike.github.io/wdd230/data/members.json')
      .then(response => response.json())
      .then(data => {
        displayMembers(data.members);
      })
      .catch(error => console.error('Error fetching members:', error));
  
    function displayMembers(members) {
      membersList.innerHTML = '';
      members.forEach(member => {
        const memberItem = document.createElement('div');
        memberItem.classList.add('member');
        memberItem.innerHTML = `
          <h2>${member.name}</h2>
          <p>Address: ${member.address}</p>
          <p>Phone: ${member.phone}</p>
          <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
          <p>Membership Level: ${member.membership_level}</p>
          <p>${member.other_info}</p>
          <img src="images/${member.image}" alt="${member.name}">
        `;
        membersList.appendChild(memberItem);
      });
    }
  
    gridViewBtn.addEventListener('click', function () {
      membersList.classList.remove('list-view');
      membersList.classList.add('grid-view');
    });
  
    listViewBtn.addEventListener('click', function () {
      membersList.classList.remove('grid-view');
      membersList.classList.add('list-view');
    });
  });
  