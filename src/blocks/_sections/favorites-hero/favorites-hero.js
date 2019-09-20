$(document).ready(() => {
    let $favorites = {};

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
        $favorites.slider.flickity('select', $(this).index());
    });

    $favorites.slider.on("select.flickity", function () {
        const dotElement = $(".favorites-hero__dot");

        dotElement
            .filter(".favorites-hero__dot_current")
            .removeClass("favorites-hero__dot_current");

        dotElement
            .eq(flkty.selectedIndex)
            .addClass("favorites-hero__dot_current");
    });

    //- On click controller
    $(".favorites-hero__button").on("click", function (event) {
        event.preventDefault();

        if ($(this).hasClass("favorites-hero__button_prev")) {
            $favorites.slider.flickity('previous');
        } else if ($(this).hasClass("favorites-hero__button_next")) {
            $favorites.slider.flickity('next');
        }
    });
});