$(function() {
    var SCROLL_SNAP_DELAY = 700;
    var UPDATE_NAV_DELAY = 300;
    var RESIZE_DELAY = 500;
    var TRIGGER_OFFSET  = 7 / 8;
    var CONTENT_TRANSLATE_DISTANCE = 100;
    var SLIDE = {
        DURATION: 1000,
        DELAY: 500,
        EASING: "easeOutCubic"
    };
    var SCROLL_OPTION = {
        duration: "normal",
        easing: "easeOutCubic",
    };
    var LEFT = -1;
    var RIGHT = 1;
    var SHOW_MESSAGE_DURATION = 1500;

    var $window = $(window);
    var $fixedNavAnchor = $("div#fixed-nav>div.inner>ul>li>a");
    var $fixedNavList = $fixedNavAnchor.parent();
    var $eachContent = $("main#contents>section");
    var $header = $("header#header");
    var $footer = $("footer#footer");
    var mobile = false;
    init();

    function init() {
        mobile = isMobile();

        $("div.left, div.right", $eachContent).addClass("invisible");

        $eachContent.each(function() {
            var $this = $(this);
            $this.waypoint({
                triggerOnce: true,
                handler: function(direction) {
                    if (direction == "down")
                        $("div.left, div.right", $this).animate({
                            opacity: 1
                        }, {
                            easing: "easeOutCubic",
                            duration: 1000
                        });
                },
                offset: $window.height() * TRIGGER_OFFSET
            });
        });

        fitContents();
        setupFixedNav();
        setupEachMenu();

        var scrollSnap = _.debounce(_scrollSnap, SCROLL_SNAP_DELAY);
        var updateNavColor = _.throttle(_updateNavColor, UPDATE_NAV_DELAY);
        var updateParallax = _.throttle(_updateParallax, 100);
        $window.resize(_.debounce(function() {
            mobile = isMobile();
            fitContents();
            scrollSnap();
        }, RESIZE_DELAY));
        $window.resize();

        $window.scroll(function() {
            if(!mobile)
                scrollSnap();
            updateNavColor();
            _updateParallax();
        });

        // other setup

        $("nav>ul>li>a, a#scroll_down").add($fixedNavAnchor).click(function(e) {
            // if(isMobile()) return;
            e.preventDefault();
            var hash = this.hash;
            scrollTo($(hash).offset().top);
            $fixedNavAnchor.removeClass("select");
            $fixedNavAnchor.filter("[href='" + hash + "']").addClass("select");
            return false;
        });

        $("#form form").submit(function(e){
            e.preventDefault();
            var form = this;
            var $submitButton = $("input[type=submit]");
            $submitButton.prop("disabled", true);
            $.ajax({
                url: this.action,
                method: this.method,
                data: $(this).serialize(),
                dataType: "json"
            }).done(function(){
                console.log('success!');
                $(form).addClass("success").delay(SHOW_MESSAGE_DURATION).queue(function(){
                    form.reset();
                    $submitButton.prop("disabled", false);
                    $(this).removeClass("success send").dequeue();
                });
            }).fail(function(){
                console.error('error!');
                $(form).addClass("error").delay(SHOW_MESSAGE_DURATION).queue(function(){
                    $(this).removeClass("error send").dequeue();
                });
            }).always(function(){
                $(form).addClass("send");
            });
            return false;
        });

        $("#copyright a[href='#me']").click(function(e) {
            e.preventDefault();
            $("div.menu>ul>li>a[href='#me']", "section#about").click();
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
        if(location.hash){
            setTimeout(function(){
                $("a[href='" + location.hash + "']").click();
            }, 1500);
        }
    }

    function getContentPosition() {
        return $fixedNavAnchor.map(function() {
            var $hash = $(this.hash);
            var obj = (function(self) {
                var top = Math.round($hash.offset().top);
                return {
                    anchor: self.hash,
                    top: top,
                    bottom: top + $hash.height() - 1
                };
            }(this));
            return obj;
        }).get();
    }

    var $headerWithHeaderBackground = $header.addBack("#header-background", $header);

    function _updateParallax(){
        var top = $window.scrollTop();
        var op = mobile ? 1 : 1 - top / $header.height() * 2.5;
        op = op < 0 ? 0 : op;
        $("#header div.centering").css({
            top:-top * 0.3,
            opacity: op
        });
    }

    function setupFixedNav() {
        _updateNavColor();
        $fixedNavAnchor.each(function() {
            $(this).append("<span>" + $(this).data("title") + "</span>");
        });
        $("div#nav-prev>a").click(function(e) {
            e.preventDefault();
            $fixedNavList.has(".select").prev().find("a").click();
            return false;
        });
        $("div#nav-next>a").click(function(e) {
            e.preventDefault();
            $fixedNavList.has(".select").next().find("a").click();
            return false;
        });
    }

    function _scrollSnap() {
        var content = getNearestContent();
        var scrollTop = Math.round($window.scrollTop());
        if (content.top === scrollTop) return;
        var windowHeight = $window.height();
        var isLongContent = windowHeight < content.bottom - content.top;
        if (isLongContent) {
            if (scrollTop < content.top) {
                scrollTo(content.top);
            } else if (scrollTop + windowHeight > content.bottom) {
                var pos = content.bottom - windowHeight;
                scrollTo(pos);
            }
        } else {
            scrollTo(content.top);
        }
    }

    function fitContents() {
        // if(isMobile()) return;
        var windowHeight = $window.height();
        $eachContent.each(function() {
            var $contents = $("div.right>section", this);
            var max = $(_.max($contents, function(content) {
                return $(content).outerHeight();
            })).height();
            var windowHeight = $window.innerHeight();
            max = max > windowHeight ? max : windowHeight;

            var $fitBlock = $(this).children("div.right-wrapper");
            if(!isMobile()) $fitBlock = $fitBlock.add($(this).children("div.left-wrapper"));
            $fitBlock.css({
                minHeight: max
            });
            var height = _.max($fitBlock.map(function() {
                return $(this).height();
            }));
            if(isMobile()) height += 100;
            if (height > max) {
                $fitBlock.css({
                    minHeight: height
                });
            }
        });
    }

    function scrollTo(name) {
        // if(mobile) return false;
        // if(mobile) return scrollTo(0, name);
        var target = {
            top: Math.round(name),
            left : $window.scrollLeft()
        };
        $("html, body").stop(true, true);
        $.scrollTo(target, SCROLL_OPTION);
    }

    function isMobile(){
        var ua = navigator.userAgent;
        return (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0);
    }

    function getNearestContent() {
        var scrollTop = Math.round($window.scrollTop());
        var bottom = scrollTop + $window.height();
        var middle = scrollTop + $window.height() / 2;
        var positions = getContentPosition();
        if (bottom > $footer.offset().top + $footer.height() / 2)
            return _.last(positions);

        var nearest = _.min(positions, function(pos) {
            return Math.min(Math.abs(middle - pos.top), Math.abs(middle - pos.bottom));
        });
        return nearest;
    }

    function _updateNavColor() {
        if ($("html, body").is(":animated")) return;
        var $selectHref = $fixedNavAnchor.filter("[href='" + getNearestContent().anchor + "']");
        if (!$selectHref.hasClass("select")) {
            $fixedNavAnchor.removeClass("select");

            $selectHref.addClass("select").addClass("big-anim");
            _.delay(function() {
                $selectHref.removeClass("big-anim");
            }, 300);
        }
    }

    function setupEachMenu() {
        $("div.menu>ul>li>a").click(function() {
            var $id = $(this.hash);

            var $section = $(this).parents("section");
            var targetTop = isMobile() ? $id.offset().top : $section.offset().top;
            if(isMobile()){
                var $right = $id.parent();
                targetTop = $right.offset().top;
            }
            scrollTo(targetTop);
            var $currentContent = $("div.right > section:visible", $section);
            if ($currentContent.attr("id") === this.hash.substring(1)) return false;
            var $li = $(this).parent("li");
            var $siblings = $li.siblings();
            var $menuItem = $siblings.addBack();
            var index = $li.index();
            var prevIndex = $menuItem.filter(".select").index();
            var direction = prevIndex < index ? RIGHT : LEFT;
            var vector = CONTENT_TRANSLATE_DISTANCE * direction;
            $menuItem.eq(prevIndex).removeClass("select");
            $li.addClass("select");

            $currentContent.stop(true, false).css({
                position: "absolute",
            }).animate({
                left: -vector,
                opacity: 0
            }, SLIDE.DURATION, SLIDE.EASING, function() {
                $(this).css({
                    left: 0,
                    display: "none",
                    position: "static",
                    opacity: 1
                });
            });
            $id.stop(true, false).delay(SLIDE.DELAY).css({
                position: "absolute",
                left: vector,
                display: "block",
                opacity: 0,
            }).animate({
                left: 0,
                opacity: 1
            }, SLIDE.DURATION, SLIDE.EASING, function() {
                $(this).css({
                    position: "static"
                });
            });
            return false;
        });
    }
});