/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

    const createTweetElement = function (tweetData) {
        // Use timeago to format the created_at timestamp
        const timeAgo = timeago.format(new Date(tweetData.created_at));

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
                    <span>${timeAgo}</span> <!-- using timeAgo here -->
                    <div class="tweet-actions">
                        <!-- tweet actions here -->
                    </div>
                </footer>
            </article>
        `);

        return $tweet;
    };


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

    // Event listener for form submission
    $('form').on('submit', function (event) {
        event.preventDefault();

        const tweetText = $('#tweet-text').val();
        if (!validateTweet(tweetText)) {
            return;
        }

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '/tweets',
            data: formData,
            success: function (newTweet) {
                console.log('Form submission successful:', newTweet);
                loadTweets();
            },
            error: function (error) {
                console.error('Error submitting form:', error);
            }
        });
    });

    // Validation function for the tweet
    function validateTweet(tweet) {
        // Check if tweet is empty
        if (tweet.trim() === "") {
            alert("Error: there is no content in this tweet!");
            return false;
        }
        // Check if tweet exceeds the maximum length
        else if (tweet.length > 140) {
            alert("Error: tweet is too long!");
            return false;
        }
        // Tweet is valid
        return true;
    }

    const loadTweets = function () {
        $.ajax({
            type: 'GET',
            url: '/tweets',
            dataType: 'json',
            success: function (tweets) {
                renderTweets(tweets);
            },
            error: function (error) {
                console.error('Error fetching tweets:', error);
            }
        });
    };

    loadTweets();
});
