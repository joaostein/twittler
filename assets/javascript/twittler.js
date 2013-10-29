var Twittler = function () {
  
  this.init = function () {
    this.fetchData("home");
    this.refreshTweets();
    this.revealUserTweets();
  };

  this.fetchData = function (location, username) {
    var tweets;
    location = location || "home";

    if (location === "users") {
      tweets = streams[location][username];
    } else {
      tweets = streams[location];
    }

    var index = tweets.length - 1;

    while(index >= 0){
      var tweet = tweets[index];
      this.createTweet(tweet, location);
      index -= 1;
    }
  };

  this.refreshTweets = function () {
    var index = streams.home.length + 1;

    setInterval(function () {
      var tweet = streams.home[index];
      if (typeof(tweet) === "object") {
        Twittler.createTweet(tweet, "home");
        index++;
      }
    }, 1000);
  };

  this.createTweet = function (tweet, location) {
    var userName;

    if (location === "home") {
      userName = "<a class='tweet-username' href='#' data-username='{{user}}' data-reveal-id=user-tweets'>@{{user}}</a>: ";
    } else if (location === "users"){
      userName = "<span class='tweet-username' data-username='{{user}}'>@{{user}}</span>: ";
    }

    var source = "<div class='tweet clearfix'>" +
                    "<div class='tweet-holder'>" +
                      userName +
                      "<span class='tweet-message'>{{message}}</span>" +
                    "</div>" +
                    "<span class='tweet-created-at'>{{created_at}}</span>" +
                  "</div>";

    var template = Handlebars.compile(source);
    var result = template(tweet);

    if (location === "home") {
      $(result).prependTo($('.tweetsWrapper'));
    } else if (location === "users") {
      $(result).prependTo($('#user-tweets > div'));
    }
  };

  this.revealUserTweets = function () {
    $(document).on('click', '.tweet-username', function (e) {
      var username = $(this).data("username");
      Twittler.getUserTweets(username);
      Twittler.loadMoreTweets(username);
      $('#user-tweets').reveal();
      e.preventDefault();
    });

  };

  this.getUserTweets = function (username) {
    $("#user-tweets > div").html('');
    $("#user-tweets h1 span").text("@" + username);

    this.fetchData("users", username);
  };

  this.loadMoreTweets = function (username) {
    // var username = $('.tweet-username').data("username");

    $(document).on('click', '.load-more-tweets', function (e) {
      Twittler.getUserTweets(username);
      e.preventDefault();
    });
  };
};