/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */

// eslint-disable-next-line no-undef
var event_profile_app = Vue.createApp({
    data() {
      return {
        eventProfile: {},
        clubProfile: {},
        showRsvps: false,
        rsvps: []
      };
    },
    methods: {
        getRSVP() {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    event_profile_app.rsvps = JSON.parse(xhr.responseText);
                }
            };
            xhr.open('GET', `/fetch_rsvps?id=${event_profile_app.eventProfile.id}`);
            xhr.send();
            this.showRsvps = true;
        }
    }
}).mount('body');

const urlParams = new URLSearchParams(window.location.search);
const eventid = urlParams.get('id');

let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText)[0];
        event_profile_app.eventProfile = response;
    }
};

xhr.open('GET', '/fetch_eventsProfile?id=' + eventid);
xhr.send();

let xhr2 = new XMLHttpRequest();

xhr2.onreadystatechange = function() {
    if (xhr2.readyState === 4 && xhr2.status === 200) {
        let response = JSON.parse(xhr2.responseText)[0];
        event_profile_app.clubProfile = response;
    }
};

xhr2.open('GET', `/fetch_eventsClub?id=${eventid}`);
xhr2.send();
