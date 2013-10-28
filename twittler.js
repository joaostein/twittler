var Twittler = function () {
  
  var $body = $('body');
  var homeTweetsLength = streams.home.length;

  this.init = function () {
    this.fetchInitialData();
    this.refreshTweets();
  };

  this.fetchInitialData = function () {
    var index = homeTweetsLength - 1;
    $body.html('');
    
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($body);
      index -= 1;
    }
  };

  this.refreshTweets = function () {
    var index = homeTweetsLength + 1

    setInterval(function () {
      if (typeof(streams.home[index]) === "object") {
        $("<div></div>", {
          text: "@" + streams.home[index].user + ": " + streams.home[index].message
        }).appendTo($body);

        index++;
      }
    }, 500);
  };

};
