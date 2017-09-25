var carouselCount = 0 /*輪播 分配圖片順序對應的位置*/ ,
    carouselTime /*輪播settimeout*/ , personalImgCarousel = ["-100%", "0", "100%", "200%", "300%", "400%"] /*輪播的各圖片位置*/ ,
    personalImgOpac = ["0", "1", "0", "1", "1", "1"] /*輪播各圖片的透明度*/ ;


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
                /*console.log($(this).offset().top + $(this).outerHeight())*/
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
        if ($(document).scrollTop() >= $("#personal").offset().top - windowHeight / 2) {
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
        console.log(personalImgCarousel + ",,,")
        $(".imgCarousel").each(function() {
            /*讓最後一個隱藏時0s隱藏*/
            if (personalImgCarousel[carouselCount] == "-100%") {
                $(this).css({ "transition": "0s" })
            }

            $(this).css({ "transform": "translate(" + personalImgCarousel[carouselCount] + ",0%)", "opacity": personalImgOpac[carouselCount] })

            /*讓最後一個隱藏時0s隱藏後  調回2s*/
            if (personalImgCarousel[carouselCount++] == "0") {
                $(this).css({ "transition": "2s linear transform,2s opacity linear" })
            }
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
        /*把陣列第一個元素拿到最後一個*/

        //    carouselTime = setTimeout("personalCarousel()", 3000)
        carouselTime = setTimeout(function() {
            personalCarousel()
        }, 3000)
    }

    $(".imgCarousel").hover(function() {
        clearTimeout(carouselTime)
        /*動態完全停止動畫*/
        var tempTrans, i, tempCount = new Array();
        $(".imgCarousel").each(function() {
            tempTrans = window.getComputedStyle(this).getPropertyValue("transform");
            i = tempTrans.length - 1;
            for (; tempCount.length < 2; i--) {
                if (tempTrans[i] == ",") {
                    tempCount.push(i)
                }
            }
            $(this).css({ "transform": "translate(" + tempTrans.substring(tempCount[1] + 2, tempCount[0]) + "px," + tempTrans.substring(tempCount[0] + 2, tempTrans.length - 1) + ")", "opacity": window.getComputedStyle(this).getPropertyValue("opacity") })
            tempCount = []
        })
        $(this).css({ "transform": window.getComputedStyle(this).getPropertyValue("transform") + " rotate(10deg)" })
        /*動態完全停止動畫*/
    }, function() {
        carouselTime = setTimeout(function() {
            personalImgCarousel.splice(0, 0, personalImgCarousel[5])
            personalImgCarousel.splice(6, 1)
            personalImgOpac.splice(0, 0, personalImgOpac[5])
            personalImgOpac.splice(6, 1)
            /*防止暫停後 不流暢的直接執行本來預計的下一個， 陣列所有位置往前移一輪*/
            personalCarousel()
        }, 100)

    })

    /*            $(".imgCarousel").hover(function(){
                    $(this).css({"transform":"translate(" + personalImgCarousel[$(this).data("num")] + ",0%) rotate(-10deg)"})
                    console.log(1)
                },function(){
                    $(this).css({"transform":"translate(" + personalImgCarousel[$(this).data("num")] + ",0%) rotate(0deg)"})
                })*/

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