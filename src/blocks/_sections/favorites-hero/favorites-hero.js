$(document).ready(() => {
    let $favorites = {};
    const $controllerClass = "favorites-hero__button";

    $favorites.slider = $(".favorites-hero__carousel").flickity({
        pageDots: false,
        draggable: false,
        prevNextButtons: false,
        adaptiveHeight: true,
        wrapAround: true
    });

    //- Get slide count
    let flkty = $favorites.slider.data('flickity');
    let $dotsContainer = [];

    $favorites.slideCount = flkty.slides.length;


    //- Create dots
    for (let i = 0; i < $favorites.slideCount; i++) {
        if (i === 0) {
            $dotsContainer = $dotsContainer +
                "<button type='button' class='favorites-hero__dot favorites-hero__dot_current'></button>";
        } else {
            $dotsContainer = $dotsContainer +
                "<button type='button' class='favorites-hero__dot'></button>";
        }
    }

    //- Append dots in container
    $(".favorites-hero__dots").append($dotsContainer);

    //- Select slide when click dot
    $(".favorites-hero__dot").on("click", function () {
        const index = $(this).index();
        $favorites.slider.flickity('select', index);
    });

    $favorites.slider.on("select.flickity", function () {
        $(".favorites-hero__dot")
            .filter(".favorites-hero__dot_current")
            .removeClass("favorites-hero__dot_current");

        $(".favorites-hero__dot")
            .eq(flkty.selectedIndex)
            .addClass("favorites-hero__dot_current");
    });

    //- On click prev controller
    $("." + $controllerClass + "_prev").on("click", function (event) {
        event.preventDefault();

        $favorites.slider.flickity('previous');
    });

    //- On click next controller
    $("." + $controllerClass + "_next").on("click", function (event) {
        event.preventDefault();

        $favorites.slider.flickity('next');
    });
});