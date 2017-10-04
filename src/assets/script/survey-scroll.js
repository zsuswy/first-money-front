function _j_scrollTo(idex) {
    console.log($("#question" + idex));
    $('html, body').animate({
        scrollTop: $("#question" + idex).offset().top
    }, 500);
}