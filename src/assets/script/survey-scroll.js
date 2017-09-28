function _j_scrollTo(idex) {
    $('html, body').animate({
        scrollTop: $("#survey" + idex).offset().top
    }, 500);
}