$(document).ready(() => {
    let $services = {};

    $services.slider =  $(".services-carousel__categories-slider").flickity({
        fade: true,
        pageDots: false,
        draggable: false,
        prevNextButtons: false
    });

    //- Get categories and single category
    $services.categories = $(".services-carousel__categories");
    $services.category = $(".services-carousel__item");

    console.log($services.category)

    //- On click single category
    $services.category.on("click", function (event) {
        const idx = $(event.currentTarget).index();
        $services.slider.flickity("select", idx);
    });

    const _flickity = $services.slider.data("flickity");
    $services.height = $services.categories.height();
    $services.categoriesHeight = $services.categories.height();

    $services.slider.on("select.flickity", function () {
        //- Remove old current item
        $services.categories
            .find(".services-carousel__item_current")
            .removeClass("services-carousel__item_current");

        const selected = $services.category
            .eq(_flickity.selectedIndex)
            .addClass("services-carousel__item_current");

        const scrollY = selected.position().top +
            $services.categories.scrollTop() - ($services.height + $services.categoriesHeight) / 2;

        $services.categories.animate({
            scrollTop: scrollY
        });
    });
});