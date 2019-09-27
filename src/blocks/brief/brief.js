const WINDOW_HELLO = 0;
const WINDOW_CATEGORIES = 1;
const WINDOW_ABOUT = 3;
const WINDOW_FINISH = 4;

const $footer = $(".brief__footer");
const $files = $(".brief__files");

let $brief = {
    carousel: null,
    nextButton: $(".brief__footer .button-has-icon"),
    data: {
        form: {
            username: "",
            company: "",
            email: "",
            phone: ""
        },
        categories: []
    }
};

$(document).ready(() => {
    //- Create carousel and push in object
    $brief.carousel = $(".brief__carousel").flickity({
        fade: true,
        draggable: false,
        accessibility: false,
        pageDots: false,
        prevNextButtons: false,
        on: {
            ready: onBriefReady(),
            change: event => onBriefChange(event)
        }
    });

    //- Get flickity data
    $brief.flickity = $brief.carousel.data("flickity");

    //- Create dots in DOM
    createDots($brief.flickity);

    //- On click handler
    onClickDot($brief.carousel, $brief.flickity);

    //- On click category handler
    onClickCategory();

    //- Brief range slider
    $(".brief__range-slider").ionRangeSlider({
        min: 150000,
        max: 2500000,
        from: 1300000,
        step: 10000,
        hide_min_max: true,
        onStart: event => setBriefPrice(event),
        onChange: event => setBriefPrice(event)
    });

    $($brief.nextButton).on("click", function (event) {
        event.preventDefault();

        if (!isBriefValid($brief.flickity.prevSelectedIndex)) {
            return false;
        }

        $brief.carousel.flickity("next");
    });
});

/**
 * This function create dots in DOM
 * @param flickity
 */
function createDots(flickity) {
    let dotsContainer = [];

    //- Create dots
    for (let i = 0; i < flickity.slides.length; i++) {
        if (i === 0) {
            dotsContainer = dotsContainer +
                "<button type='button' class='brief__dot brief__dot_current'>" +
                "<span>0" + (i + 1) + "</span>" +
                "</button>";
        } else {
            dotsContainer = dotsContainer +
                "<button type='button' class='brief__dot'>" +
                "<span>0" + (i + 1) + "</span>" +
                "</button>";
        }
    }

    //- Append dots in DOM
    $(".brief__dots").append(dotsContainer);
}

/**
 * On brief ready handler
 */
function onBriefReady() {
    //- Show footer
    $footer.removeClass("brief__footer_is-hidden");

    //- Hide files
    $files.removeClass("brief__files_is-toggle");
}

function onBriefChange(id) {
    $footer.removeClass("brief__footer_is-hidden");
    $files.removeClass("brief__files_is-toggle");
    setNextButtonTheme(false);

    switch (id) {
        case WINDOW_ABOUT:
            setNextButtonTheme(true);
            $files.addClass("brief__files_is-toggle");
            break;

        case WINDOW_FINISH:
            console.log("--brief-data", $brief.data);
            $footer.addClass("brief__footer_is-hidden");
            break;
    }
}

/**
 * This handler dots
 * @param carousel
 * @param flickity
 */
function onClickDot(carousel, flickity) {
    //- On click dot
    $(".brief__dot").on("click", function () {
        if (!isBriefValid($brief.flickity.prevSelectedIndex)) {
            return false;
        }

        if (!$(this).hasClass("brief__dot_current")) {
            const index = $(this).index();
            carousel.flickity("select", index);
        }
    });

    //- Select current dot on click
    carousel.on("select.flickity", function () {
        const container = $(".brief__dot");

        container
            .filter(".brief__dot_current")
            .removeClass("brief__dot_current");

        container
            .eq(flickity.selectedIndex)
            .addClass("brief__dot_current");
    });
}

/**
 * This handler click on category
 */
function onClickCategory() {
    const $element = $(".brief__category");

    $element.on("click", function () {
        const _this = $(this);
        const $content = $(this).attr("data-content");

        if (_this.hasClass("brief__category_current")) {
            _this.removeClass("brief__category_current");

            //- Remove by data-content
            $brief.data.categories = $brief.data.categories.filter(function (value) {
                return value !== $content
            });
        }

        else {
            _this.addClass("brief__category_current");
            $brief.data.categories.push($content);
        }
    });
}

function isBriefValid(id) {
    let valid = true;

    switch (id) {
        case WINDOW_HELLO: {
            let data = {};

            //- Get input values
            $(".brief .input__field").each(function () {
                data[$(this).attr("name")] = $(this).val()
            });

            $brief.data.form = data;

            if ($brief.data.form.username.length === 0) {
                valid = false;

                $("input[name='username']").parent().addClass("input_error");
            }

            if ($brief.data.form.email.length === 0) {
                valid = false;

                $("input[name='email']").parent().addClass("input_error");
            }
            break;
        }

        case WINDOW_CATEGORIES: {
            $("input[name='username']").parent().removeClass("input_error");
            $("input[name='email']").parent().removeClass("input_error");

            if ($brief.data.categories.length === 0) {
                valid = false;

                alert("Выберите хотя бы одну категорию!");
            }
            break;
        }

        case WINDOW_ABOUT: {
            $brief.data.message = $(".brief textarea.brief__text").val();
        }
    }

    return valid;
}

function setBriefPrice(event) {
    $brief.data.price = event.from
}

function setNextButtonTheme(isSubmit = false) {
    if (isSubmit === true) {
        $brief.nextButton
            .addClass("brief__submit")
            .find("span.button-has-icon__content")
            .text("Отправить");
    } else {
        $brief.nextButton
            .removeClass("brief__submit")
            .find("span.button-has-icon__content")
            .text("Далее");
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}