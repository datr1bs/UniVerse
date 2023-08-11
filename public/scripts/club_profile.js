/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */

// eslint-disable-next-line no-undef
var club_profile_app = Vue.createApp({
    data() {
      return {
        clubProfile: {},
        events: [],
        showMembers: false,
        members: []
      };
    },
    methods: {
        SignUpNoti(club_name) {
            const urlParams = new URLSearchParams(window.location.search);
            const clubid = urlParams.get('id');
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/signup_noti?id=' + clubid);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
              if (xhr.status === 200) {
                alert("You will receive notifications for this club's events");
              }
            };
            xhr.send(JSON.stringify({ club_name: club_name }));
        },
        SignUpNotiUpdate(club_name) {
            const urlParams = new URLSearchParams(window.location.search);
            const clubid = urlParams.get('id');
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/signup_noti_update?id=' + clubid);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
            if (xhr.status === 200) {
                alert("You will receive notifications for this club's updates");
            }
            };
            xhr.send(JSON.stringify({ club_name: club_name }));
        },
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
        joinEvent(eventId) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                // eslint-disable-next-line no-console
                console.log(xhr.responseText);
              }
            };
            xhr.open('POST', '/join_event', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({ event_id: eventId }));
        },
        getMembers() {
          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  club_profile_app.members = JSON.parse(xhr.responseText);
              }
          };
          xhr.open('GET', `/fetch_members?id=${club_profile_app.clubProfile.id}`);
          xhr.send();
          this.showMembers = true;
        }
    }
}).mount('body');


const urlParams = new URLSearchParams(window.location.search);
const clubid = urlParams.get('id');

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText)[0];
        // eslint-disable-next-line no-console
        console.log(response);
        club_profile_app.clubProfile = response;
    }
};

xhr.open('GET', '/fetch_clubsProfile?id=' + clubid);
xhr.send();

let xhr2 = new XMLHttpRequest();

xhr2.onreadystatechange = function() {
    if (xhr2.readyState === 4 && xhr2.status === 200) {
        let response = JSON.parse(xhr2.responseText);
        // eslint-disable-next-line no-console
        console.log(response);
        club_profile_app.events = response;
    }
};

xhr2.open('GET', '/fetch_clubevents?id=' + clubid);
xhr2.send();
