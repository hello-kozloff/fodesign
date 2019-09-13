$(document).ready(() => {
    $(".navigation__button").on("click", function (event) {
        event.preventDefault();

        const _navigation = $(".navigation");
        _navigation.toggleClass("navigation_hidden");

        $("body").removeClass("fixed");
    });
});