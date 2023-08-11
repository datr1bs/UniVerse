/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
// VUE FOR FEED
// eslint-disable-next-line no-undef
const app = Vue.createApp({
    data() {
      return {
        postContent: '',
        // posts: [],
        all_clubs_posts: [],
        my_clubs_posts: [],
        idCounter: 0,
        allClubs: true
      };
    },
    methods: {
      createPost() {
        if (!this.postContent) {
            alert('Please enter a post content');
            return;
        }
        const text = this.postContent;
        var is_public = 0;
        if(document.querySelector('.post-audience').value === "public") is_public = 1;
        const now = new Date();
        const post = {
          id: this.idCounter++,
          name: 'Computer Science Club',
          avatar: 'https://csclub.org.au/images/logo.png',
          content: text,
          time: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
        };
        this.posts.push(post);
        this.postContent = '';

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/post_feed', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringfy({
          text: text,
          is_public: is_public
        }));
      },
      toggleLike(post) {
        // send to db
        post.is_liked = !post.is_liked;
        if (post.is_liked) post.likes++;
        else post.likes--;
        let xhr2 = new XMLHttpRequest();
        xhr2.open('POST', '/like_post', true);
        xhr2.setRequestHeader('Content-Type', 'application/json');
        xhr2.send(JSON.stringify({ id: post.id }));
      },
      breakLines(content) {
      // Replace line breaks with <br> tags
      return content.replace(/\n/g, '<br>');
      }
    }
  }).mount('#app');
//   Vue For FEED

var xhr_all = new XMLHttpRequest();
xhr_all.onreadystatechange = function() {
  if (xhr_all.readyState === 4 && xhr_all.status === 200) {
    app.all_clubs_posts = JSON.parse(xhr_all.responseText);
  }
};

xhr_all.open('GET', '/fetch_all_clubs_posts', true);
xhr_all.setRequestHeader('Content-Type', '/application/json');
xhr_all.send();

let xhr_my = new XMLHttpRequest();

xhr_my.onreadystatechange = function() {
  if (xhr_my.readyState === 4 && xhr_my.status === 200) {
      app.my_clubs_posts = JSON.parse(xhr_my.responseText);
  }
};

xhr_my.open('GET', '/fetch_my_clubs_posts', true);
xhr_my.setRequestHeader('Content-Type', '/application/json');
xhr_my.send();
