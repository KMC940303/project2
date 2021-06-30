$(document).ready(function() {
    const $pcGnb = $('#pcGnb > ul');
    $pcGnb.find('> li > ul').hide();
    $pcGnb.find('> li > a').on('mouseenter focus',function(){
        $pcGnb.find('> li.on').removeClass('on').children('ul').stop().slideUp();
        $(this).next().stop().slideDown().parent().addClass('on');
    });
    $pcGnb.on('mouseleave',function(){
        $pcGnb.find('> li.on').removeClass('on').children('ul').stop().slideUp();
    });
    $pcGnb.find('a:first').on('keydown',function(e){
        console.log(e.keyCode);
        if (e.shiftKey && e.keyCode === 9) {
            $pcGnb.trigger('mouseleave');
        }
    });
    $pcGnb.find('a:last').on('keydown',function(e){
        console.log(e.keyCode);
        if (!e.shiftKey && e.keyCode === 9) {
            $pcGnb.trigger('mouseleave');
        }
    });
});