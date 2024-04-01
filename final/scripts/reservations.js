document.addEventListener('DOMContentLoaded', function () {
    const reservationForm = document.getElementById('reservation-form');
    reservationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(reservationForm);
        const date = formData.get('date');
        const period = formData.get('period');
        const rentalType = formData.get('rental-type');
        const numberOfRentals = formData.get('number-of-rentals');
        const phoneNumber = formData.get('phone-number');
        const fullName = formData.get('full-name');
        const email = formData.get('email');
        const homeStateOrCountry = formData.get('home-state-country');
        const cruiseLine = formData.get('cruise-line');
        const specialAccommodations = formData.get('special-accommodations');

        console.log('Form submitted with date:', date);
        console.log('Form submitted with period:', period);
        console.log('Form submitted with rental type:', rentalType);
        console.log('Form submitted with number of rentals:', numberOfRentals);
        console.log('Form submitted with phone number:', phoneNumber);
        console.log('Form submitted with full name:', fullName);
        console.log('Form submitted with email:', email);
        console.log('Form submitted with home state or country:', homeStateOrCountry);
        console.log('Form submitted with cruise line:', cruiseLine);
        console.log('Form submitted with special accommodations:', specialAccommodations);
    });
});

