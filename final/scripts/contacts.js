document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const comment = formData.get('comment');

        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Comment:', comment);

        fetch('your-server-endpoint', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    const googleMapsIframe = document.getElementById('google-maps');
    googleMapsIframe.src = googleMapsIframe.dataset.src;
});
