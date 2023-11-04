/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function (e) {

    function formatDate(timestamp) {
        return moment(timestamp).fromNow();
    }

    const createTweetElement = function (tweetData) {
        const $tweet = $(`
      <article class="tweet">
        <header>
          <img src="${tweetData.user.avatars}" alt="Avatar of ${tweetData.user.name}">
          <h3>${tweetData.user.name}</h3>
          <p>${tweetData.user.handle}</p>
        </header>
        <div class="tweet-content">
          <p>${tweetData.content.text}</p>
        </div>
        <footer>
          <span>${formatDate(tweetData.created_at)}</span>
          <div class="tweet-actions">
          </div>
        </footer>
      </article>
    `);

        return $tweet;
    }

    const tweetDataArray = [
        {
            "user": {
                "name": "Newton",
                "avatars": "https://i.imgur.com/73hZDYK.png",
                "handle": "@SirIsaac"
            },
            "content": {
                "text": "If I have seen further it is by standing on the shoulders of giants"
            },
            "created_at": 1461116232227
        },
        {
            "user": {
                "name": "Descartes",
                "avatars": "https://i.imgur.com/nlhLi3I.png",
                "handle": "@rd"
            },
            "content": {
                "text": "Je pense , donc je suis"
            },
            "created_at": 1461113959088
        }
    ];


    const renderTweets = function (tweetDataArray) {
        var $tweetsContainer = $('.posted-tweets').empty();
        $.each(tweetDataArray, function (index, tweet) {
            $tweetsContainer.append(createTweetElement(tweet));
        });
    }
    renderTweets(tweetDataArray);
});
