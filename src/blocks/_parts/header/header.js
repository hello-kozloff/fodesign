$(document).ready(() => {
    $(".header__button_themefy").on("click", function(event) {
        event.preventDefault();

        const _this = $('body');

        if (_this.hasClass('page_theme_light')) {
            _this
                .removeClass('page_theme_light')
                .addClass('page_theme_dark');
        } else {
            _this
                .removeClass('page_theme_dark')
                .addClass('page_theme_light');
        }
    });

    $(".header__button_hamburger").on("click", function(event) {
        event.preventDefault();

        const _navigation = $(".navigation");
        _navigation.toggleClass("navigation_hidden");

        $("body").addClass("fixed");
    });
});