$(document).ready(function () {

    const createTweetElement = function (tweetData) {
        // Use timeago to format the created_at timestamp
        const timeAgo = timeago.format(new Date(tweetData.created_at));

        const userName = $("<div>").text(tweetData.user.name).html();
        const userHandle = $("<div>").text(tweetData.user.handle).html();
        const userContent = $("<div>").text(tweetData.content.text).html();
        const avatarUrl = $("<div>").text(tweetData.user.avatars).html();

        const $tweet = $(`
            <article class="tweet">
                <header>
                    <img src="${avatarUrl}" alt="Avatar of ${userName}">
                    <h3>${userName}</h3>
                    <p>${userHandle}</p>
                </header>
                <div class="tweet-content">
                    <p>${userContent}</p>
                </div>
                <footer>
                    <span>${timeAgo}</span> <!-- using timeAgo here -->
                    <div class="tweet-actions">
                        <!-- tweet actions here -->
                        <i class="fa-solid fa-flag"></i>
                        <i class="fa-solid fa-code-compare"></i>
                        <i class="fa-solid fa-heart"></i>
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
        hideError();
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
                $('#tweet-text').val(''); // this clears the form input
                $('.counter').text('140'); // this resets the counter
                loadTweets();
            },
            error: function (error) {
                console.error('Error submitting form:', error);
            }
        });
    });

    function showError(message) {
        $('#tweet-error').text(message).slideDown('fast');
    }

    function hideError() {
        $('#tweet-error').slideUp('fast');
    }

    // Validation function for the tweet
    function validateTweet(tweet) {
        //this checks if the tweet is empty
        if (tweet.trim() === "") {
            showError("Error: there is no content in this tweet!");
            return false;
        }
        // this checks if the tweet exceeds the maximum length
        else if (tweet.length > 140) {
            showError("Error: tweet is too long!");
            return false;
        }
        hideError();
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
