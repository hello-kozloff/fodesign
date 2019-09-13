$(document).ready(() => {
    $(".services__service").each(function () {
        const _this = $(this);
        const button = _this.find("button.services__button");

        button.on("click", function (event) {
            event.preventDefault();

            if (_this.hasClass("services__service_hidden")) {
                _this
                    .removeClass("services__service_hidden")
                    .addClass("services__service_show");

                button
                    .find("i")
                    .removeClass("icon-plus")
                    .addClass("icon-minus");
            } else {
                _this
                    .removeClass("services__service_show")
                    .addClass("services__service_hidden");

                button
                    .find("i")
                    .removeClass("icon-minus")
                    .addClass("icon-plus");
            }
        });
    });
});