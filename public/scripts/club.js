/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */

// eslint-disable-next-line no-undef
var club_app = Vue.createApp({
    data() {
        return {
            clubs: []
        };
    },
    methods: {
        joinClub(clubId) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                // eslint-disable-next-line no-console
                console.log(xhr.responseText);
              }
            };
            xhr.open('POST', '/join_club', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({ club_id: clubId }));
        },
        deleteClub(index) {
            const delete_name = this.clubs[index].name;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/delete_club'); // Replace with your server endpoint for fetching users
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({deleteName: delete_name}));
            this.clubs.splice(index, 1);
            // write ajax to call to db and update role to 1
        }
    }
}).mount('body');

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // Parse the JSON response and append to the clubs array
        club_app.clubs = JSON.parse(xhr.responseText);
    }
};

xhr.open('GET', '/fetch_clubs'); // Replace with your server endpoint for fetching events
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();
