function checkPassword(input) {
    var password = document.getElementById('password').value;
    var confirm_password = input.value;
    var message = document.getElementById('password_message');
    if (password !== confirm_password) {
        message.textContent = "Passwords do not match";
        document.getElementById('password').value = '';
        input.value = '';
        document.getElementById('password').focus();
    } else {
        message.textContent = '';
    }
}

function updateRating(input) {
    document.getElementById('rating_display').textContent = input.value;
}