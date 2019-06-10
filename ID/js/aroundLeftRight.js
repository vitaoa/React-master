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
            var _ = this;
            _.slider = _this.find(options.wrapper);
            _.slideprev = _this.find(options.prev);
            _.slidenext = _this.find(options.next);
            _.timeInterval = options.speed;
            _._liWidthFirst = _this.find("li:first").outerWidth(true);
            _._liWidthLast = _this.find("li:last").outerWidth(true);

            if(_this.width() >= _._liWidthFirst*_this.find("li").length){
                return false;
            }

            if(options.hover){
                _.slider.hover(function() {
                    clearInterval(_.scrollTimer);
                }, function() {
                    if (options.loop) {
                        _.scrollTimer = setInterval(function() {
                            _.scrollList();
                        }, timeInterval);
                    }
                });
            }
            _.slideprev.click(function() {
                clearInterval(_.scrollTimer);
                _.slider.stop(true).animate({
                    "left": _._liWidthLast
                }, 500, function() {
                    _.slider.css({
                        "left": '0px'
                    }).find("li:last").prependTo(_.slider);
                    if (options.loop) {
                        _.scrollTimer = setInterval(function() {
                            _.scrollList();
                        }, _.timeInterval);
                    }
                });
            });
            _.slidenext.click(function() {
                clearInterval(_.scrollTimer);
                _.slider.stop(true).animate({
                    "left": -_._liWidthFirst + "px"
                }, 500, function() {
                    _.slider.css({
                        "left": "0px"
                    }).find("li:first").appendTo(_.slider);
                    if (options.loop) {
                        _.scrollTimer = setInterval(function() {
                            _.scrollList();
                        }, _.timeInterval);
                    }
                })
            });
            _.slidenext.hover(function() {
                $(this).addClass('hover')
            }, function() {
                $(this).removeClass('hover')
            });
            _.slideprev.hover(function() {
                $(this).addClass('hover')
            }, function() {
                $(this).removeClass('hover')
            });

            _.init(options.loop);
        }
        return AroundLeftRight;
    }());
    AroundLeftRight.prototype.init=function (creation) {
        if (creation) {
            _.slider.trigger("mouseout");
        }
    };
    AroundLeftRight.prototype.scrollList=function () {
        _.slider.stop(true).animate({
            "left": -_._liWidthFirst + "px"
        }, 500, function() {
            _.slider.css({
                "left": "0px"
            }).find("li:first").appendTo(_.slider);
        })
    };

    $.fn.aroundLeftRight = function() {
        var _ = this,
            opt = arguments[0],
            args = [].slice.call(arguments, 1),
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