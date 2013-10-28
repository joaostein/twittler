var Twittler = function () {
  
  var $body = $('body');
  var homeTweetsLength = streams.home.length;

  this.init = function () {
    this.fetchInitialData();
    this.refreshTweets();
  };

  this.fetchInitialData = function () {
    var index = homeTweetsLength - 1;

    while(index >= 0){
      var tweet = streams.home[index];
      this.createTweet(tweet);
      index -= 1;
    }
  };

  this.refreshTweets = function () {
    var index = homeTweetsLength + 1;

    setInterval(function () {
      var tweet = streams.home[index];
      if (typeof(tweet) === "object") {
        Twittler.createTweet(tweet);
        index++;
      }
    }, 500);
  };

  this.createTweet = function (tweet) {
    $("<div></div>", {
      text: "@" + tweet.user + ": " + tweet.message
    }).appendTo($body);
  };

};
