$(document).ready(() => {
    let $clients = {};
    const $controllerClass = "clients-carousel__control";

    $clients.slider = $(".clients-carousel__slider").flickity({
        pageDots: false,
        draggable: false,
        prevNextButtons: false,
        adaptiveHeight: true
    });

    //- On click prev controller
    $("." + $controllerClass + "_prev").on("click", function (event) {
        event.preventDefault();

        $clients.slider.flickity('previous');
    });

    //- On click next controller
    $("." + $controllerClass + "_next").on("click", function (event) {
        event.preventDefault();

        $clients.slider.flickity('next');
    });
});