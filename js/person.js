var carouselCount = 0,
    carouselTime, personalImgCarousel = ["-100%", "0", "100%", "200%", "300%", "400%"],
    personalImgOpac = ["0", "1", "0", "1", "1", "1"];
$(document).ready(function() {
    $(".navBars").click(function() {
        $(".navTopList").slideToggle();
    })

    $(".homeJump a").click(function(e) {
        e.preventDefault();
        $("body").animate({ "scrollTop": $($(this).attr("href")).offset().top }, 1000)
    })

    /*導覽列點選後 慢慢滑動至目的*/
    $("#navTop a").each(function() {
        $(this).click(function(e) {
            e.preventDefault();
            $("body").animate({ "scrollTop": $($(this).attr("href")).offset().top }, 1000)
        })
    })
    /*導覽列點選後 慢慢滑動至目的*/

    var windowHeight = $(window).height();
    $(document).resize(function() {
        windowHeight = $(window).height();
    })
    /*----------------------卷軸事件------------------------*/
    $(document).scroll(function() {
        /*假如卷軸改變  高度偵測*/

        /*下滑後頂部導覽固定*/
        if ($(document).scrollTop() >= $("header").height()) {
            $("#navTop").addClass("navTopFixed");
        } else if ($(document).scrollTop() < $("header").height()) {
            $("#navTop").removeClass("navTopFixed");
        }
        /*下滑後頂部導覽固定*/

        /*移動畫面 頂部導覽亮色*/
        if ($(document).scrollTop() + 1 < $("header").height()) {
            $("#linkHome").addClass("linkColor2");
        } else {
            $("#linkHome").removeClass("linkColor2");
        }
        $("section").each(function() {
            /*元素所在高度 + 元素的高度   = 元素所在的底部之高度 +1為小數問題*/
            if ($(document).scrollTop() + 1 >= $(this).offset().top && $(document).scrollTop() + 1 < ($(this).offset().top + $(this).outerHeight())) {
                $($(this).data("navtopchoose")).addClass("linkColor2");
                console.log($(this).offset().top + $(this).outerHeight())
            } else {
                $($(this).data("navtopchoose")).removeClass("linkColor2");
            }
        })
        /*移動畫面 頂部導覽亮色*/

        $(".scrollFadeIn").each(function() {
            /*螢幕下拉到頁面一半後 淡入*/
            if ($(document).scrollTop() >= $(this).parent().offset().top - windowHeight / 2) {
                /*元素高位置(非頁面高)   - 窗口一半高度*/
                $(this).addClass("scrollFadeIn2");
            }
        })

        /*輪播照片一開始從左邊淡入*/
        if($(document).scrollTop() >= $("#personal").offset().top - windowHeight / 2){
            $(".personalImg").addClass("scrollFadeLToR");
        }
        /*輪播照片一開始從左邊淡入*/

        /*skills動畫*/
        if ($(document).scrollTop() >= $("#skills").offset().top - $("#skills").height() / 2) {
            /*使用者移動畫面超過 skills畫面一半時觸發
            尋找每個scorebar 取出個別score值 並執行動畫*/
            $(".score-bar").each(function() {
                $(this).animate({ width: ($(this).data("score") + "%") }, 3000);
            })
        }
        /*skills動畫*/

    })
    /*---------------------卷軸事件------------------*/


    /*about 照片輪播*/
    personalCarousel()
    function personalCarousel() {
        console.log(personalImgCarousel + ",,," )
        $(".imgCarousel").each(function() {
            $(this).css({ "transform": "translate(" + personalImgCarousel[carouselCount] + ",0%)", "opacity": personalImgOpac[carouselCount++] })
        })
        carouselCount = 0
        /*                $(".perImg-3").css({"transform":"translate(" + personalImgCarousel[2] + ",0%)","z-index":personalImgZIndex[2]})
                        $(".perImg-4").css({"transform":"translate(" + personalImgCarousel[3] + ",0%)","z-index":personalImgZIndex[3]})
                        $(".perImg-5").css({"transform":"translate(" + personalImgCarousel[4] + ",0%)","z-index":personalImgZIndex[4]})
                        $(".perImg-6").css({"transform":"translate(" + personalImgCarousel[5] + ",0%)","z-index":personalImgZIndex[5]})
        */
        personalImgCarousel.push(personalImgCarousel[0])
        personalImgCarousel.splice(0, 1)
        personalImgOpac.push(personalImgOpac[0])
        personalImgOpac.splice(0, 1)
        //    carouselTime = setTimeout("personalCarousel()", 3000)
        carouselTime = setTimeout(function() {
            personalCarousel()
        }, 3000)
    }

    $(".personalImg").hover(function(){
        clearTimeout(carouselTime)
                
            },function(){
                carouselTime = setTimeout(function() {
            personalCarousel()
        }, 400)
    })
    $(".imgCarousel").hover(function(){
        $(this).css({"transform":"translate(" + personalImgCarousel[$(this).data("num")] + ",0%) rotate(-10deg)"})
    },function(){
        $(this).css({"transform":"translate(" + personalImgCarousel[$(this).data("num")] + ",0%) rotate(0deg)"})
    })
    /*about 照片輪播*/


    /*滑鼠移入作品集放大*/
    $(".portbox").each(function() {
        $(this).hover(function() {
            $(this).children(".hoverScale").toggleClass("scaleHover");
        }, function() {
            $(this).children(".hoverScale").toggleClass("scaleHover");
        })
    })
    /*滑鼠移入作品集放大*/




    $(".test").click(function() {
        //$(document).scrollTop(773);
        //$(window).scrollTop(600)
        //$(window.body).animate({scrollTop:"900"},2000)

    })


    
})