/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */

// eslint-disable-next-line no-unused-vars
function createClub() {
    window.location.replace("/club_create_admin");
}

// eslint-disable-next-line no-unused-vars
function logout() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/logout');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
        window.location.replace('/login');
        }
    };
    xhr.send();
}
