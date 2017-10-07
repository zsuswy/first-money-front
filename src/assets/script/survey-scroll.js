function _j_scrollTo(idex) {
    $('html, body').animate({
        scrollTop: $("#question" + idex).offset().top
    }, 500);
}