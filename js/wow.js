(function() {
  var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX,
    bind = function(fn, me) { return function() { return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  // 工具类（完整）
  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in defaults) {
        value = defaults[key];
        if (custom[key] == null) {
          custom[key] = value;
        }
      }
      return custom;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    };

    Util.prototype.createEvent = function(event, bubble, cancel, detail) {
      var customEvent;
      if (bubble == null) bubble = false;
      if (cancel == null) cancel = false;
      if (detail == null) detail = null;
      if (document.createEvent != null) {
        customEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent(event, bubble, cancel, detail);
      } else if (document.createEventObject != null) {
        customEvent = document.createEventObject();
        customEvent.eventType = event;
      } else {
        customEvent.eventName = event;
      }
      return customEvent;
    };

    Util.prototype.emitEvent = function(elem, event) {
      if (elem.dispatchEvent != null) {
        return elem.dispatchEvent(event);
      } else if (event in (elem != null)) {
        return elem[event]();
      } else if (("on" + event) in (elem != null)) {
        return elem["on" + event]();
      }
    };

    Util.prototype.addEvent = function(elem, event, fn) {
      if (elem.addEventListener != null) {
        elem.addEventListener(event, fn, false);
      } else if (elem.attachEvent != null) {
        elem.attachEvent("on" + event, fn);
      } else {
        elem[event] = fn;
      }
    };

    Util.prototype.removeEvent = function(elem, event, fn) {
      if (elem.removeEventListener != null) {
        elem.removeEventListener(event, fn, false);
      } else if (elem.detachEvent != null) {
        elem.detachEvent("on" + event, fn);
      } else {
        delete elem[event];
      }
    };

    Util.prototype.innerHeight = function() {
      return ('innerHeight' in window) ? 
        window.innerHeight : 
        document.documentElement.clientHeight;
    };

    return Util;
  })();

  // WeakMap polyfill（完整）
  WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {
    function WeakMap() {
      this.keys = [];
      this.values = [];
    }

    WeakMap.prototype.get = function(key) {
      for (var i = 0; i < this.keys.length; i++) {
        if (this.keys[i] === key) {
          return this.values[i];
        }
      }
    };

    WeakMap.prototype.set = function(key, value) {
      for (var i = 0; i < this.keys.length; i++) {
        if (this.keys[i] === key) {
          this.values[i] = value;
          return;
        }
      }
      this.keys.push(key);
      this.values.push(value);
    };

    return WeakMap;
  })());

  // MutationObserver polyfill（完整）
  MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {
    function MutationObserver() {
      if (typeof console !== "undefined" && console !== null) {
        console.warn('MutationObserver not supported');
      }
    }

    MutationObserver.notSupported = true;

    MutationObserver.prototype.observe = function() {};

    return MutationObserver;
  })());

  // getComputedStyle polyfill（完整）
  getComputedStyle = this.getComputedStyle || function(el) {
    this.getPropertyValue = function(prop) {
      if (prop === 'float') prop = 'styleFloat';
      return el.currentStyle[prop.replace(/-(\w)/g, function(m, c) {
        return c.toUpperCase();
      })] || null;
    };
    return this;
  };

  getComputedStyleRX = /(\-([a-z]){1})/g;

  // WOW 核心类（已修复关键错误）
  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
      callback: null
    };

    function WOW(options) {
      if (options == null) options = {};
      this.scrollCallback = bind(this.scrollCallback, this);
      this.scrollHandler = bind(this.scrollHandler, this);
      this.start = bind(this.start, this);
      this.resetAnimation = bind(this.resetAnimation, this); // 关键修复：绑定上下文
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
      this.animationNameCache = new WeakMap();
      this.wowEvent = this.util().createEvent(this.config.boxClass);
    }

    WOW.prototype.init = function() {
      var ref;
      this.element = document.documentElement;
      if ((ref = document.readyState) === "interactive" || ref === "complete") {
        this.start();
      } else {
        this.util().addEvent(document, 'DOMContentLoaded', this.start);
      }
      return this.finished = [];
    };

    WOW.prototype.start = function() {
      var box, j, len, ref;
      this.stopped = false;
      this.boxes = Array.prototype.slice.call(
        document.querySelectorAll('.' + this.config.boxClass)
      );
      this.all = this.boxes.slice(0);
      if (this.boxes.length) {
        if (this.disabled()) {
          this.resetStyle();
        } else {
          ref = this.boxes;
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            this.applyStyle(box, true);
          }
        }
      }
      if (!this.disabled()) {
        this.util().addEvent(window, 'scroll', this.scrollHandler);
        this.util().addEvent(window, 'resize', this.scrollHandler);
        this.interval = setInterval(this.scrollCallback, 50);
      }
      if (this.config.live) {
        new MutationObserver((function(_this) {
          return function(records) {
            return Array.prototype.forEach.call(records, function(record) {
              return Array.prototype.forEach.call(record.addedNodes, function(node) {
                return _this.doSync(node);
              });
            });
          };
        })(this)).observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    };

    WOW.prototype.stop = function() {
      this.stopped = true;
      this.util().removeEvent(window, 'scroll', this.scrollHandler);
      this.util().removeEvent(window, 'resize', this.scrollHandler);
      if (this.interval != null) clearInterval(this.interval);
    };

    WOW.prototype.sync = function(element) {
      if (MutationObserver.notSupported) this.doSync();
    };

    WOW.prototype.doSync = function(element) {
      if (element == null) element = document;
      var nodes = element.querySelectorAll('.' + this.config.boxClass);
      nodes = Array.prototype.slice.call(nodes);
      nodes.forEach((function(_this) {
        return function(box) {
          if (_this.all.indexOf(box) < 0) {
            _this.boxes.push(box);
            _this.all.push(box);
            if (_this.stopped || _this.disabled()) {
              _this.resetStyle();
            } else {
              _this.applyStyle(box, true);
            }
            _this.scrolled = true;
          }
        };
      })(this));
    };

    // 修复后的关键方法
    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      box.classList.add(this.config.animateClass);
      if (this.config.callback) this.config.callback(box);
      this.util().emitEvent(box, this.wowEvent);

      var events = ['animationend', 'webkitAnimationEnd', 'oanimationend', 'MSAnimationEnd'];
      events.forEach((function(event) {
        this.util().addEvent(box, event, this.resetAnimation);
      }).bind(this));

      return box;
    };

    // 错误修复点：使用 this.config 替代 config
    WOW.prototype.resetAnimation = function(event) {
      if (event.type.toLowerCase().indexOf('animationend') >= 0) {
        var target = event.target || event.srcElement;
        target.className = target.className
          .replace(new RegExp(this.config.animateClass, 'g'), '')
          .trim();
        
        // 清理事件监听器
        ['animationend', 'webkitAnimationEnd', 'oanimationend', 'MSAnimationEnd']
          .forEach((function(eventType) {
            this.util().removeEvent(target, eventType, this.resetAnimation);
          }).bind(this));
      }
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var duration = box.getAttribute('data-wow-duration'),
          delay = box.getAttribute('data-wow-delay'),
          iteration = box.getAttribute('data-wow-iteration');

      return this.animate((function(_this) {
        return function() {
          _this.customStyle(box, hidden, duration, delay, iteration);
        };
      })(this));
    };

    WOW.prototype.animate = ('requestAnimationFrame' in window) ?
      function(cb) { window.requestAnimationFrame(cb); } :
      function(cb) { cb(); };

    WOW.prototype.resetStyle = function() {
      this.boxes.forEach(function(box) {
        box.style.visibility = 'visible';
      });
    };

    WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
      hidden && this.cacheAnimationName(box);
      box.style.visibility = hidden ? 'hidden' : 'visible';
      this.vendorSet(box.style, {
        animationDuration: duration || '',
        animationDelay: delay || '',
        animationIterationCount: iteration || '',
        animationName: hidden ? 'none' : this.cachedAnimationName(box)
      });
      return box;
    };

    WOW.prototype.vendors = ['moz', 'webkit'];
    WOW.prototype.vendorSet = function(elem, properties) {
      for (var prop in properties) {
        var value = properties[prop];
        elem[prop] = value;
        this.vendors.forEach(function(vendor) {
          elem[vendor + prop.charAt(0).toUpperCase() + prop.substr(1)] = value;
        });
      }
    };

    WOW.prototype.animationName = function(box) {
      try {
        return getComputedStyle(box).animationName ||
               getComputedStyle(box).getPropertyValue('animation-name');
      } catch (e) {
        return '';
      }
    };

    WOW.prototype.cacheAnimationName = function(box) {
      this.animationNameCache.set(box, this.animationName(box));
    };

    WOW.prototype.cachedAnimationName = function(box) {
      return this.animationNameCache.get(box);
    };

    WOW.prototype.scrollHandler = function() { this.scrolled = true; };
    WOW.prototype.scrollCallback = function() {
      if (!this.scrolled) return;
      this.scrolled = false;
      this.boxes = this.boxes.filter(function(box) {
        return box ? this.isVisible(box) ? (this.show(box), false) : true : false;
      }, this);
      if (!this.boxes.length && !this.config.live) this.stop();
    };

    WOW.prototype.offsetTop = function(element) {
      var top = element.offsetTop;
      while (element = element.offsetParent) top += element.offsetTop;
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var viewTop = window.pageYOffset,
          viewBottom = viewTop + Math.min(
            document.documentElement.clientHeight,
            this.util().innerHeight()
          ) - (this.config.offset || 0),
          top = this.offsetTop(box),
          bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util || (this._util = new Util());
    };

    WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;
  })();

}).call(this);