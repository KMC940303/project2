$(document).ready(function () {
    const $pcGnb = $('#pcGnb > ul');
    $pcGnb.find('> li > ul').hide();
    $pcGnb.find('> li > a').on('mouseenter focus', function () {
        $pcGnb.find('> li.on').removeClass('on').children('ul').stop().slideUp();
        $(this).next().stop().slideDown().parent().addClass('on');
    });
    $pcGnb.on('mouseleave', function () {
        $pcGnb.find('> li.on').removeClass('on').children('ul').stop().slideUp();
    });
    $pcGnb.find('a:first').on('keydown', function (e) {
        console.log(e.keyCode);
        if (e.shiftKey && e.keyCode === 9) {
            $pcGnb.trigger('mouseleave');
        }
    });
    $pcGnb.find('a:last').on('keydown', function (e) {
        console.log(e.keyCode);
        if (!e.shiftKey && e.keyCode === 9) {
            $pcGnb.trigger('mouseleave');
        }
    });
    //3) 검색창 열기
    $('.header .search .search_open_btn').on('click', function () {
        const $header = $(this).closest('.header');
        //닫겨진 경우 => 열기
        if (!$(this).hasClass('on')) {
            //pc - window의 가로크기가 1080픽셀 보다 크다면
            if ($(window).width() > 1080) {
                $(this).addClass('on').next().stop().slideDown('fast', function () {
                    //검색창 닫기 텍스트 교체
                    //   $(this).prev().children().text('검색창 닫기');
                });
                //본문1에서 검색창 열기를 한 경우 .header.on 추가하기
                if (!$header.hasClass('active')) $header.addClass('on');
            } else { //모바일 - 열기만 가능함
                // 열려질 높이를 계산하자??
                const searchWrapHei = $('#mHeader .search .m_on_top').outerHeight() + $('#mSearch').outerHeight();
                console.log(searchWrapHei);
                $(this).next().css('visibility', 'visible').stop().animate({
                    maxHeight: searchWrapHei
                }, 'fast');
            }
        }
        //열려진 경우 => 닫기 : pc에서만 가능
        else {
            if ($(window).width() > 1080) {
                $(this).removeClass('on').next().stop().slideUp('fast', function () {
                    //   $(this).prev().children().text('검색창 열기');
                });
            }
        }
    });
    //3-1) ★ 열기버튼에서 shift+tab을 눌러 이전으로 갈 경우 닫아주기
    $('.header .search .search_open_btn').on('keydown', function (e) {
        if ((e.shiftKey && e.keyCode === 9) && $(this).hasClass('on')) $(this).removeClass('on').next().stop().slideUp('fast');
    });

    //3-2) .search_wrap 닫기버튼 (.btn_close) 클릭 이벤트
    $('.header .search_wrap .search_close_btn').on('click', function () {
        const $header = $(this).closest('.header');
        //pc
        if ($(window).width() > 1080) {
            $(this).parent().stop().slideUp('fast', function () {
                //열기 버튼에.on 제거 후 포커스 강제 이동
                $(this).prev().removeClass('on').focus();

                //본문 1에 위치한 경우만 .header의 클래스명 .on을 제거
                if (!$header.hasClass('active')) $header.removeClass('on');
            });
        }
        //모바일, 태블릿
        else {
            $(this).parent().stop().animate({
                maxHeight: 0
            }, 'fast', function () {
                $(this).css('visibility', 'hidden').prev().focus();
            });
        }
    });
});