/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */

// eslint-disable-next-line no-undef
var profile_app = Vue.createApp({
    data() {
        return {
            editMode: false,
            profile: {
              name: 'John Doe',
              // dob: '01/01/1990',
              phone: '123-456-7890',
              address_line_1: '123 Fake Street',
              address_line_2: 'Apt 1',
              city: 'Adelaide',
              state: 'South Australia',
              zipcode: '5000',
              country: 'Australia',
              school: 'University of Adelaide, South Australia',
              degree: 'B.S. Computer Science',
              student_id: 'a12345678',
              hobbies: 'Hiking, Swimming, Reading',
              bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl'
            },
            events: [],
            clubs: []
        };
    },
    methods: {
      saveProfile() {
        this.editMode = false;
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            // eslint-disable-next-line
            console.log(this.responseText);
          }
        };
        xhttp.open("POST", "/profile_info", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(this.profile));
      }
    }
}).mount('#profile_app');

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    let profile_info = JSON.parse(this.responseText);
    profile_app.profile = { ...profile_info[0] };
  }
};
xhttp.open("GET", "/profile_info", true);
xhttp.send();

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    profile_app.events = JSON.parse(this.responseText);
  }
};
xhr.open("GET", "/fetch_profileEvents", true);
xhr.send();

let xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = function() {
  if (xhr2.readyState === 4 && xhr2.status === 200) {
    profile_app.clubs = JSON.parse(this.responseText);
  }
};
xhr2.open("GET", "/fetch_profileClubs", true);
xhr2.send();
