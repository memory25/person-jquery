$(document).ready(function() {
    $(".navBars").click(function(){
        $(".navTopList").slideToggle();
    })

    $(".homeJump a").click(function(e){
        e.preventDefault();
        $("body").animate({"scrollTop":$($(this).attr("href")).offset().top},1000)
    })

    /*導覽列點選後 慢慢滑動至目的*/
    $("#navTop a").each(function(){
        $(this).click(function(e){
            e.preventDefault();
            $("body").animate({"scrollTop":$($(this).attr("href")).offset().top},1000)        
        })
    })
    /*導覽列點選後 慢慢滑動至目的*/

    var windowHeight = $(window).height();
    $(document).resize(function(){
        windowHeight = $(window).height();
    })
    /*卷軸事件*/
    $(document).scroll(function() {
        /*假如卷軸改變  高度偵測*/

        /*下滑後頂部導覽固定*/
        if($(document).scrollTop() >= $("header").height()){
            $("#navTop").addClass("navTopFixed");
        }else if($(document).scrollTop() < $("header").height()){
            $("#navTop").removeClass("navTopFixed");
        }
        /*下滑後頂部導覽固定*/

        /*移動畫面 頂部導覽亮色*/
        if($(document).scrollTop()+1 < $("header").height()){
            $("#linkHome").addClass("linkColor2");
        }else{
            $("#linkHome").removeClass("linkColor2");
        }
        $("section").each(function(){
            /*元素所在高度 + 元素的高度   = 元素所在的底部之高度 +1為小數問題*/
            if($(document).scrollTop()+1 >= $(this).offset().top && $(document).scrollTop()+1 < ($(this).offset().top + $(this).outerHeight())){
                $($(this).data("navtopchoose")).addClass("linkColor2");
                console.log( $(this).offset().top + $(this).outerHeight())
            }else{
                $($(this).data("navtopchoose")).removeClass("linkColor2");
            }
        })
        /*移動畫面 頂部導覽亮色*/

        $(".scrollFadeIn").each(function(){
            /*螢幕下拉到頁面一半後 淡入*/
            if($(document).scrollTop() >= $(this).parent().offset().top - windowHeight/2){
                /*元素高位置(非頁面高)  - 標題大小+標題外距   - 窗口一半高度*/
                $(this).addClass("scrollFadeIn2");
            }
        })

/*        if($(document).scrollTop() >= $(".personalMain").offset().top -140 - windowHeight/2){
            $(".bling").css({"box-shadow":"0px 0px 180px 400px #FFF"});
        }
*/
        /*skills動畫*/
        if($(document).scrollTop() >= $("#skills").offset().top - $("#skills").height() / 2) {
            /*使用者移動畫面超過 skills畫面一半時觸發
            尋找每個scorebar 取出個別score值 並執行動畫*/
            $(".score-bar").each(function() {
                $(this).animate({ width: ($(this).data("score") + "%") }, 3000);
            })
        }
        /*skills動畫*/

    })
    /*卷軸事件*/


    /*滑鼠移入作品集放大*/
    $(".portbox").each(function(){
        $(this).hover(function(){
            $(this).children(".hoverScale").toggleClass("scaleHover");
        },function(){
            $(this).children(".hoverScale").toggleClass("scaleHover");
        })
    })
    /*滑鼠移入作品集放大*/

    $(".test").click(function(){
        $(document).scrollTop(773);
        //$(window).scrollTop(600)
        //$(window.body).animate({scrollTop:"900"},2000)
    })



})