document.addEventListener('DOMContentLoaded', function () {
    fetch('https://guidarmike.github.io/wdd230/final/data/rentalpricing.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const rentalOptions = data.MaxRentalPricing.Vehicles;

            const tableBody = document.getElementById('rental-table-body');

            rentalOptions.forEach(option => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${option.RentalType}</td>
                    <td>${option.MaxPersons}</td>
                    <td>${option.Reservation.HalfDay}</td>
                    <td>${option.Reservation.FullDay}</td>
                    <td>${option.WalkIn.HalfDay}</td>
                    <td>${option.WalkIn.FullDay}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
