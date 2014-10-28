$(function() {
    $window = $(window);
    $window.resize(function() {
        centering();
        fitDiv();
    });
    $window.resize();
    var $fixedNavAnchor = $("div#fixed-nav>div.inner>ul>li>a");
    var updatePosition = function() {
        var ret = _.object($fixedNavAnchor.map(function(e) {
            return [[this.hash, [$(this.hash).offset().top, $(this.hash).outerHeight() - 1]]];
        }).get());
        return {
            keys: _.keys(ret),
            values: _.values(ret)
        };
    };

    //detect language
    var language = (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
    var paramHash = {};
    var paramArray = location.search.substring(1).split("&");
    for (var i = 0; i < paramArray.length; i++) {
        var kv = paramArray[i].split("=");
        paramHash[kv[0]] = kv[1];
    };
    
    if(language == "en" || paramHash.la == "en"){
        $("body *[data-lang-en]").each(function(){
            $this = $(this);
            var enStr = $this.data("lang-en");
            $this.parent().css({fontFamily:"Roboto", fontWeight:300, fontSize:"110%"});
            $this.html(enStr);
        });
    }
    var positionHash = _.once(updatePosition);
    $("nav>ul>li>a").each(function(i, e) {
        $("div.left-wrapper>div, div.right-wrapper>div", e.hash).css({
            opacity: 0
        });
        $(e.hash).waypoint({
            triggerOnce: true,
            handler: function(direction) {
                if (direction == "down")
                    $("div.left-wrapper>div:visible, div.right-wrapper>div:visible", e.hash).animate({
                        opacity: 1
                    }, {
                        easing: "easeOutCubic",
                        duration: 1000
                    });
            },
            offset: $window.height() * 7 / 8
        });
    });

    function nearContent() {
        var st = $window.scrollTop();
        var wh = $window.innerHeight();
        var sb = st + wh;
        var $f = $("#footer");
        var ft = $f.position().top;
        var fh = $f.outerHeight();
        if (sb >= (ft + fh / 2))
            return "#footer";
        var diffArr = _.map(positionHash().values, function(v, i) {
            return _.min([Math.abs(st - (v[1] - wh) - v[0]), Math.abs(st - v[0])]);
        });
        var min = _.min(diffArr);
        var minIndex = _.indexOf(diffArr, min);
        return positionHash().keys[minIndex];
    };

    var scrollOptions = {
        duration: "normal",
        easing: "easeOutCubic"
    };
    var calcElementPosition = _.debounce(function() {
        var wh = $window.height();
        var st = $window.scrollTop();
        var sb = wh + st;
        var hash = nearContent();
        var ch = $(hash).outerHeight();
        // console.log(hash);
        var top = $(hash).position().top;
        if (st != top) {
            if (ch <= wh) {
                $.scrollTo(hash, scrollOptions);
            } else if (ch > wh) {
                if (top < st && sb < top + ch) {} else if (st > top) {
                    var pos = top + ch - wh;
                    $.scrollTo(pos, scrollOptions);
                } else if (ch < st) {
                    $.scrollTo(hash, scrollOptions);
                }
            }
        }
    }, 1 * 1000);
    var updateFixedNavColor = _.debounce(function() {
        var hash = nearContent();
        var $selectHref = $("a[href='" + hash + "']", "div#fixed-nav>div.inner>ul>li");
        // var prevHash = $("div#fixed-nav>div.inner>ul>li>a.select").hash;
        if (!$selectHref.hasClass("select")) {
            // if (hash !== prevHash) {
            $fixedNavAnchor.removeClass("select");
            $selectHref.addClass("select").addClass("big-anim");
            setTimeout(function() {
                $selectHref.removeClass("big-anim");
            }, 300);
        }
    }, 100);
    $window.scroll(calcElementPosition);
    $window.resize(calcElementPosition);
    $window.resize(_.debounce(function() {
        positionHash = updatePosition();
    }, 500));
    $window.scroll(updateFixedNavColor);
    // $window.scroll(_.throttle(function(){
    //     var st = $window.scrollTop();
    //     if(0 < st && st < $("header#header").height())
    //     $("header#header").css({marginBottom:-st * 0.5, paddingTop:st  * 0.5});
    // }, 100));
    $("div.menu>ul>li>a").click(function() {
        var $id = $(this.hash);

        $(this);
        var $section = $(this).parents("section");
        var hash = "#" + $section.attr("id");
        $.scrollTo(hash, scrollOptions);
        var current = $section.find("div.right-wrapper > div.right > section:visible");
        if ($(current).attr("id") == this.hash.substring(1)) return false;
        var prevIndex = index = -1;
        var $li = $(this).parent("li");
        $li.siblings().addBack().each(function(i, e) {
            prevIndex = $(e).hasClass("select") ? i : -1;
            if (prevIndex >= 0) return false;
        });
        index = $(this).parents("ul").find("li>a").index(this);
        var direction = prevIndex < index ? -1 : 1;
        var distance = 100 * direction;
        $li.siblings().removeClass("select").end().addClass("select");
        var time = 500;
        var easing = "easeOutCubic";
        current.stop(true, false).css({
            position: "absolute",
            zIndex: "0"
        }).animate({
            left: distance,
            opacity: 0
        }, time * 2, easing, function() {
            $(this).css({
                left: 0,
                display: "none",
                position: "static",
                opacity: 1
            });
        });
        $id.stop(true, false).delay(time).css({
            position: "absolute",
            left: -distance,
            display: "block",
            opacity: 0
        }).animate({
            left: 0,
            opacity: 1
        }, time * 2, easing, function() {
            $(this).css({
                position: "static"
            });
        });
        return false;
    });
    $("section.hide").hide();
    $("nav>ul>li>a, div#fixed-nav>div.inner>ul>li>a").click(function() {
        var hash = this.hash;
        $.scrollTo(hash, scrollOptions);
        $fixedNavAnchor.removeClass("select");
        $("a[href='" + hash + "']", "div#fixed-nav>div.inner>ul>li").addClass("select");
        return false;
    });
    $("div#nav-prev>a").click(function() {
        var index = $(".select").index("div#fixed-nav>div.inner>ul>li>a") - 1;
        if (index >= 0)
            $fixedNavAnchor.eq(index).click();
        return false;
    });
    $(window).keydown(function(e) {
        switch (e.keyCode) {
            case 37:
                $("div#nav-prev>a").click();
                break;
            case 39:
                $("div#nav-next>a").click();
                break;
        }
    });
    $("div#nav-next>a").click(function() {
        var index = $(".select").index("div#fixed-nav>div.inner>ul>li>a") + 1;
        if (index <= $fixedNavAnchor.length)
            $fixedNavAnchor.eq(index).click();
        return false;
    });
    $("#copyright a[href='#me']").click(function(e){
        $("div.menu>ul>li>a[href='#me']").click();
        return false;
    });
    // $("<img>").attr("src", "./images/avatar2.png");
    // $("section#me img.avatar").hover(function() {
    //     var s = $(this).attr("src");
    //     $(this).attr("src", "./images/avatar2.png");
    // }, function() {
    //     $(this).attr("src", "./images/avatar.png");
    // });
    $fixedNavAnchor.each(function() {
        $(this).append("<span>" + $(this).data("title") + "</span>");
    });
});

function centering() {
    $("header#header").css({
        height: $window.innerHeight()
    });
}

function fitDiv() {
    $("nav>ul>li>a").each(function() {
        var id = this.hash;
        var heightArray = new Array();
        $("div.right-wrapper>div.right>section", id).each(function() {
            heightArray.push($(this).outerHeight());
        });
        var max = Math.max(heightArray);
        var windowHeight = $window.innerHeight();
        if (max > windowHeight) {
            $(id).css({
                height: max + 100
            });
        } else {
            $(id).css({
                height: windowHeight
            });
        }
    });
}
