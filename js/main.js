$(function() {
    var SCROLL_SNAP_DELAY = 1000;
    var UPDATE_NAV_DELAY = 100;
    var RESIZE_DELAY = 500;
    var TRIGGER_OFFSET = 7 / 8;
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

    var $window = $(window);
    var $fixedNavAnchor = $("div#fixed-nav>div.inner>ul>li>a");
    var $fixedNavList = $fixedNavAnchor.parent();
    var $eachContent = $("div#contents>section");
    var $footer = $("footer#footer");

    init();

    function init() {
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
        var updateNavColor = _.debounce(_updateNavColor, UPDATE_NAV_DELAY);

        $window.resize(_.debounce(function() {
            centering();
            fitContents();
            scrollSnap();
            console.log("resize");
        }, RESIZE_DELAY));
        $window.resize();

        $window.scroll(function() {
            if ($(this).is(":animated")) return;
            updateNavColor();
            scrollSnap();
        });

        // other setup

        $("nav>ul>li>a").add($fixedNavAnchor).click(function() {
            var hash = this.hash;
            scrollTo(hash);
            $fixedNavAnchor.removeClass("select");
            $("a[href='" + hash + "']", "div#fixed-nav>div.inner>ul>li").addClass("select");
            return false;
        });

        $("a#scroll_down").click(function(e) {
            e.preventDefault();
            scrollTo("#works");
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
    }

    function getContentPosition() {
        return $fixedNavAnchor.map(function() {
            var $hash = $(this.hash);
            var obj = (function(self) {
                var top = $hash.offset().top;
                return {
                    anchor: self.hash,
                    top: top,
                    bottom: top + $hash.outerHeight() - 1
                };
            }(this));
            return obj;
        }).get();
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
        var scrollTop = $window.scrollTop();
        var windowHeight = $window.height();
        var isLongContent = windowHeight < content.bottom - content.top;
        if (isLongContent) {
            if (scrollTop < content.top) {
                scrollTo(content.anchor);
            } else if (scrollTop + windowHeight > content.bottom) {
                var pos = content.bottom - windowHeight;
                scrollTo(pos);
            }
        } else {
            scrollTo(content.anchor);
        }
    }

    function fitContents() {
        var windowHeight = $window.height();
        $eachContent.each(function() {
            var $contents = $("div.right>section", this);
            var max = $(_.max($contents, function(content) {
                return $(content).outerHeight();
            })).height();
            var windowHeight = $window.innerHeight();
            max = max > windowHeight ? max : windowHeight;
            var $bothBlock = $("div.left-wrapper, div.right-wrapper", this);
            $bothBlock.css({
                minHeight: max
            });
            var height = _.max($bothBlock.map(function() {
                return $(this).height();
            }));
            height > max && $bothBlock.css({
                minHeight: height
            });
        });
    }

    function scrollTo(name) {
        $.scrollTo(name, SCROLL_OPTION);
    }

    function getNearestContent() {
        var bottom = $window.scrollTop() + $window.height();
        var middle = $window.scrollTop() + $window.height() / 2;
        var positions = getContentPosition();
        if (bottom > $footer.offset().top + $footer.height() / 2)
            return _.last(positions);

        var nearest = _.min(positions, function(pos) {
            return Math.min(Math.abs(middle - pos.top), Math.abs(middle - pos.bottom));
        });
        return nearest;
    };

    function _updateNavColor() {
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
            scrollTo("#" + $section.attr("id"));
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
                opacity: 0
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

    function centering() {
        $("header#header").css({
            height: $window.height()
        });
    }
});