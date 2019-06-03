(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    'use strict';
    var AroundLeftRight = window.AroundLeftRight || {};

    AroundLeftRight = (function() {
        function AroundLeftRight(element, options) {
            options = $.extend({}, options || {});
            var _this = $(element);
            var slider = _this.find(options.wrapper);
            var slideprev = _this.find(options.prev);
            var slidenext = _this.find(options.next);
            var timeInterval = options.speed;
            var scrollTimer;
            var _liWidthFirst = _this.find("li:first").outerWidth(true);
            var _liWidthLast = _this.find("li:last").outerWidth(true);

            if(_this.width() >= _liWidthFirst*_this.find("li").length){
                return false;
            }

            if(options.hover){
                slider.hover(function() {
                    clearInterval(scrollTimer);
                }, function() {
                    if (options.loop) {
                        scrollTimer = setInterval(function() {
                            scrollList();
                        }, timeInterval);
                    }
                });
            }
            slideprev.click(function() {
                clearInterval(scrollTimer);
                slider.stop(true).animate({
                    "left": _liWidthLast
                }, 500, function() {
                    slider.css({
                        "left": '0px'
                    }).find("li:last").prependTo(slider);
                    if (options.loop) {
                        scrollTimer = setInterval(function() {
                            scrollList();
                        }, timeInterval);
                    }
                });
            });
            slidenext.click(function() {
                clearInterval(scrollTimer);
                slider.stop(true).animate({
                    "left": -_liWidthFirst + "px"
                }, 500, function() {
                    slider.css({
                        "left": "0px"
                    }).find("li:first").appendTo(slider);
                    if (options.loop) {
                        scrollTimer = setInterval(function() {
                            scrollList();
                        }, timeInterval);
                    }
                })
            });
            slidenext.hover(function() {
                $(this).addClass('hover')
            }, function() {
                $(this).removeClass('hover')
            });
            slideprev.hover(function() {
                $(this).addClass('hover')
            }, function() {
                $(this).removeClass('hover')
            });

            function scrollList() {
                slider.stop(true).animate({
                    "left": -_liWidthFirst + "px"
                }, 500, function() {
                    slider.css({
                        "left": "0px"
                    }).find("li:first").appendTo(slider);
                })
            }
            if (options.loop) {
                slider.trigger("mouseout");
            }
        };
        return AroundLeftRight;
    }());

    $.fn.aroundLeftRight = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i = 0,
            ret;
        for (i; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].aroundLeftRight = new AroundLeftRight(_[i], opt);
            else
                ret = _[i].aroundLeftRight[opt].apply(_[i].aroundLeftRight, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };
    window['aroundLeftRight'] = $.fn.aroundLeftRight;
}));