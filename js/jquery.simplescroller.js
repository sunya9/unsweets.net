(function($) {

    $.fn.simpleScroller = function(options) {
        var a = arguments;
        var webkit = !document.uniqueID && !window.opera && !window.globalStorage && window.localStorage;
        var scrollTarget = webkit ? "body" : "html";
        if (!(this instanceof $)) return $.fn.simpleScroller.apply($(scrollTarget), a);
        var defaults = {
            easing: "swing",
            duration: "normal",
            complete: $.noop,
            step: $.noop,
            queue: true
        };
        var settings = $.extend(defaults, options);
        this.each(function() {
            var $e = $(this);
            $e.stop().animate({
                scrollTop: $.Numeric(a[1]) ? a[1] : $e.offset().top,
                scrollLeft: $.Numeric(a[0]) ? a[0] : $e.offset().left
            }, settings);
        })

        return this;
    };

    function toScroll(hash, duration, easing, callback) {
        if (typeof duration === 'undefined') duration = "normal";
        if (typeof easing === 'undefined') easing = "swing";
        if (typeof callback === 'undefined') callback = function() {};
        var
        default = {};
        var p = 0;
        if (typeof hash === "string")
            p = $(hash).position().top;
        else
            p = hash;
        $("html, body").stop().animate({
            scrollTop: p
        }, duration, easing, callback());
    }

}(jQuery));
