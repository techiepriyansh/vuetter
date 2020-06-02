let loader = new Vue({
  el: '#loader',
  data: {
    seen: false
  }
});

let app1 = new Vue({
  el: '#app-1',
  data: {
    message: 'Hello Vue!',
    name: 'Vue Js',
    seen: true
  },
  methods: {
    goTweet: async function() {
      this.seen = false;
      loader.seen = true;

      let {message, name} = this;
      let timeObject = new Date();
      let timestamp = timeObject.toGMTString();
      let tweet_data = {message, name, timestamp};
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tweet_data)
      };
      const response = await fetch('/api', options);
      const json = await response.json();
      console.log(json);

      app2.updateTweets();

      this.seen = true;
      loader.seen = false;
    },
    doTab: function() {
      const nameField = document.querySelector("#tweeterName");
      nameField.focus();
    }
  }
});

let app2 = new Vue({
  el: "#app-2",
  data: {
    tweets: []
  },
  methods: {
    updateTweets: async function() {
      let response = await fetch('/api');
      let tweetsData  = await response.json();
      this.tweets = tweetsData;
    }
  },
  mounted() {
    this.updateTweets();
  }

});
