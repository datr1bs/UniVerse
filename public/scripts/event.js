/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */

// eslint-disable-next-line no-undef
var event_app = Vue.createApp({
    data() {
        return {
            events: []
        };
    },
    methods: {
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
        }
    },
    mounted() {
        // eslint-disable-next-line no-unused-vars, no-undef
        var swiper = new Swiper(".mySwiper", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
    }
}).mount('#app');

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        event_app.events = JSON.parse(xhr.responseText);
    }
};

xhr.open('GET', '/fetch_events'); // Replace with your server endpoint for fetching events
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();
