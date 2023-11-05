$(document).ready(function () {
    // Register an event handler for the input element inside the form in .new - tweet
    $('.new-tweet form input').on('keyup', function () {
        var inputValue = $(this).val();
        var inputValueLength = inputValue.length;
        console.log("Input value: " + inputValue);
        console.log("Input value length: " + inputValueLength);

        var charCount = 140 - inputValue.length;
        $('.counter').text(charCount);

        if (charCount < 0) {
            $('.counter').addClass('invalid');
        } else {
            $('.counter').removeClass('invalid');
        }
    });
});
