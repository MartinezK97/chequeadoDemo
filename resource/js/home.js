
$(document).ready(function () {
    $(".scroller").scroll(function () {
        var scrollVal = $(this).scrollTop();
        console.log("Scroll dentro de .scroller:", scrollVal);
    });
});
