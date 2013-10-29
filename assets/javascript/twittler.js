var Twittler = function () {
  
  var tweetsWrapper = $('.tweetsWrapper');
  var homeTweetsLength = streams.home.length;

  this.init = function () {
    this.fetchInitialData();
    this.refreshTweets();
    this.bindUserTweets();
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
    var source = "<div class='tweet clearfix'>" +
                    "<div class='tweet-holder'>" +
                      "<a class='tweet-username' href='#' data-username='{{user}}' data-reveal-id=user-tweets'>@{{user}}</a>: " +
                      "<span class='tweet-message'>{{message}}</span>" +
                    "</div>" +
                    "<span class='tweet-created-at'>{{created_at}}</span>" +
                  "</div>";

    var template = Handlebars.compile(source);
    var result = template(tweet);
    $(result).appendTo(tweetsWrapper);
  };

  this.bindUserTweets = function () {
    var tweets = streams.users;
    
    $(document).on('click', '.tweet-username', function (e) {
      var username = $(this).data("username");

      Twittler.updateUserTweets(username);
      $('#user-tweets').reveal();

      e.preventDefault();
    });
  };

  this.updateUserTweets = function (username) {
    var tweets = streams.users;
    var index = tweets[username].length;

    $("#user-tweets div").html('');
    $("#user-tweets h1 span").text("@" + username);

    $.each(tweets[username], function () {
      var source = "<div class='tweet clearfix'>" +
                      "<div class='tweet-holder'>" +
                        "<a class='tweet-username' href='#' data-username='{{user}}' data-reveal-id=user-tweets'>@{{user}}</a>: " +
                        "<span class='tweet-message'>{{message}}</span>" +
                      "</div>" +
                      "<span class='tweet-created-at'>{{created_at}}</span>" +
                    "</div>";

      var template = Handlebars.compile(source);
      var result = template(this);
      $(result).appendTo('#user-tweets > div');
    });
  };


};