$(function () {
    $('.ticker').marquee({
        duration: 1500,
        duplicate: true
    });
});

$(".ticker").hover(function () { 
    this.stop();
}, function () {
    this.start();
});