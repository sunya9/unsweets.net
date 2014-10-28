jQuery.fn.aPosition = function() {
    thisLeft = this.offset().left;
    thisTop = this.offset().top;
    thisParent = this.parent();

    parentLeft = thisParent.offset().left;
    parentTop = thisParent.offset().top;

    return {
        left: thisLeft-parentLeft,
        top: thisTop-parentTop
    };
};