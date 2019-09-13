$(document).ready(() => {
    $(".navigation").on('click', function(event) {
        if (event.target !== this) return false;

        hideNavigationPanel();
    });

    $(".navigation__button").on("click", function (event) {
        event.preventDefault();
        hideNavigationPanel();
    });
});

function hideNavigationPanel() {
    const _navigation = $(".navigation");
    _navigation.toggleClass("navigation_hidden");

    $("body").removeClass("fixed");
}