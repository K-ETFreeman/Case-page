"use strict";

//IE HTMLcollection foreach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

;
var imagepopupcontainer = document.querySelector('.imagepopup');
var imgpopuped = false,
    imgpopupposition = 0;

var popupClick = function popupClick(elem) {
  imagepopupcontainer.innerHTML = "";
  var clone = elem.cloneNode();
  imagepopupcontainer.appendChild(clone);
  imagepopupcontainer.classList.remove('hidden');
  imgpopuped = true;
  imgpopupposition = pageYOffset;
};

var popupCheck = function popupCheck(elem) {
  if (!elem.onclick) {
    elem.onclick = function () {
      return popupClick(elem);
    };
  }
};

document.querySelectorAll('.popuping').forEach(function (item) {
  return item.onclick = function () {
    return popupClick(item);
  };
});

imagepopupcontainer.onclick = function () {
  imgpopuped = false;
  this.classList.add('hidden');
};

document.addEventListener('scroll', function () {
  if (imgpopuped && Math.abs(imgpopupposition - pageYOffset) > 15) {
    imgpopuped = false;
    imagepopupcontainer.classList.add('hidden');
  }
});
;
var subnavSwiper = new Swiper('.subnav__swiper', {
  direction: 'horizontal',
  breakpoints: {
    320: {
      allowTouchMove: true,
      slidesPerView: 1
    },
    535: {
      allowTouchMove: true,
      slidesPerView: 2
    },
    820: {
      allowTouchMove: true,
      slidesPerView: 3,
      spaceBetween: 35
    },
    1200: {
      allowTouchMove: false,
      slidesPerView: 4,
      spaceBetween: 35
    }
  },
  navigation: {
    nextEl: '.subnav__right',
    prevEl: '.subnav__left'
  }
});
var gallerySwiper = new Swiper('.gallery__swiper', {
  direction: 'horizontal',
  slidesPerView: 2,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 15
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    1100: {
      spaceBetween: 20
    },
    1300: {
      spaceBetween: 35
    },
    1500: {
      spaceBetween: 45
    }
  },
  on: {
    init: function init() {
      document.querySelectorAll('.gallery__swiper .popuping').forEach(function (item) {
        popupCheck(item);
      });
    },
    breakpoint: function breakpoint() {
      document.querySelectorAll('.gallery__swiper .popuping').forEach(function (item) {
        return popupCheck(item);
      });
    }
  },
  loop: true,
  navigation: {
    nextEl: '.gallery__next',
    prevEl: '.gallery__prev'
  }
});
var gallerySwiper = new Swiper('.gallery__swiper2', {
  direction: 'horizontal',
  slidesPerView: 3,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    1100: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1300: {
      slidesPerView: 3,
      spaceBetween: 35 * .5
    },
    1500: {
      slidesPerView: 3,
      spaceBetween: 45 * .5
    }
  },
  on: {
    init: function init() {
      document.querySelectorAll('.gallery__swiper2 .popuping').forEach(function (item) {
        popupCheck(item);
      });
    },
    breakpoint: function breakpoint() {
      document.querySelectorAll('.gallery__swiper2 .popuping').forEach(function (item) {
        return popupCheck(item);
      });
    }
  },
  loop: true,
  navigation: {
    nextEl: '.gallery__next',
    prevEl: '.gallery__prev'
  }
});
; //tags logic, IE-compatible

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

var LArrow = document.querySelector('.tags-linewrapper-leftarrow'),
    RArrow = document.querySelector('.tags-linewrapper-rightarrow');
var LineWrapper = document.querySelector('.tags-linewrapper-content'),
    Line = document.querySelector('.tags-linewrapper:first-child .tags-line');
var l,
    r,
    ROffset,
    LOffset = 0,
    currentOffset = 0;

function tagsData() {
  var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var Wrapperdata = LineWrapper.getBoundingClientRect(),
      baseLeft = Wrapperdata.left + parseInt(getComputedStyle(LineWrapper).paddingLeft) - 4,
      baseRight = Wrapperdata.right - parseInt(getComputedStyle(LineWrapper).paddingRight) - 15;
  r = -1, l = -1;

  for (var i = 0; i < Line.children.length; i++) {
    if (Line.children[i].getBoundingClientRect().right > baseRight + shift && r == -1) {
      r = i;
      ROffset = Math.ceil(Line.children[i].getBoundingClientRect().right - baseRight - shift);
    }

    if (Line.children[i].getBoundingClientRect().left < baseLeft + shift && i > l) {
      l = i;
      LOffset = Math.ceil(baseLeft - Line.children[i].getBoundingClientRect().left + shift);
    }
  }

  if (l == -1) {
    LOffset = 0;
    LArrow.classList.add('tags-linewrapper-leftarrow_hidden');
  } else LArrow.classList.remove('tags-linewrapper-leftarrow_hidden');

  if (r == -1) {
    ROffset = 0;
    RArrow.classList.add('tags-linewrapper-rightarrow_hidden');
  } else RArrow.classList.remove('tags-linewrapper-rightarrow_hidden');
}

tagsData();

RArrow.onclick = function () {
  var shift = ROffset;
  tagsData(shift);
  currentOffset -= shift;
  Line.style.setProperty('transform', 'translateX(' + currentOffset + 'px)');
};

LArrow.onclick = function () {
  var shift = LOffset;
  tagsData(-shift);
  currentOffset += shift;
  Line.style.setProperty('transform', 'translateX(' + currentOffset + 'px)');
};

tagsData();
window.addEventListener('resize', function () {
  scratchFooterTags();
});

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }

    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

function scratchFooterTags() {
  var prevHeight;
  document.querySelectorAll('.footerTags-content-item').forEach(function (item) {
    item.classList.remove('footerTags-content-item_notfirst');
    var itemHeight = item.getBoundingClientRect().bottom;

    if (prevHeight == undefined) {
      prevHeight = itemHeight;
    } else {
      if (itemHeight == prevHeight) {
        item.classList.add('footerTags-content-item_notfirst');
      } else {
        prevHeight = itemHeight;
      }
    }
  });
}

window.addEventListener('load', function () {
  scratchFooterTags();
});
;

function getVideoHtml(dataLink) {
  return '<iframe height="100%" width="100%" src="' + dataLink + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay="1"; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}

document.querySelectorAll('.youtubevideo').forEach(function (item) {
  return item.onclick = function () {
    item.innerHTML += getVideoHtml(item.getAttribute('data-link'));
  };
});
;
document.querySelectorAll('.interactive-trigger').forEach(function (item) {
  return item.addEventListener('click', function () {
    var target = item.getAttribute('data-target'),
        selector = item.getAttribute('data-sel'),
        toggleClass = item.getAttribute('data-toggleclass'),
        detailsMode = item.getAttribute('data-detailsMode');
    if (target == "this") target = item;
    if (target == "parent") target = item.parentNode;
    if (target == "grandparent") target = item.parentNode.parentNode;
    if (!target) target = document;
    if (selector) return target.querySelectorAll(selector).forEach(function (item) {
      if (detailsMode && item.classList.contains('details')) {
        if (item.style.maxHeight) item.style.removeProperty('max-height');else item.style.maxHeight = item.scrollHeight + 'px';
      }

      item.classList.toggle(toggleClass);
    });
    return target.classList.toggle(toggleClass);
  });
});
;
{
  var button = document.getElementById('up');
  var prevScroll,
      visible = false;
  var topElem = document.querySelector('section.case');
  button.addEventListener('click', function () {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });
  window.addEventListener('load', function () {
    prevScroll = pageYOffset;
  });
  window.addEventListener('scroll', function () {
    if (!visible && prevScroll) {
      if (pageYOffset < prevScroll && topElem.getBoundingClientRect().bottom < 0) {
        visible = true;
        button.classList.add('visible');
      } else {
        visible = false;
        button.classList.remove('visible');
      }
    } else visible = false;

    prevScroll = pageYOffset;
  });
}
;

var parallaxPosition = function parallaxPosition() {
  return document.querySelectorAll('.stickyparallax').forEach(function (item) {
    var parent = item.parentNode,
        coords = parent.getBoundingClientRect(),
        styles = getComputedStyle(item),
        bottom = parseFloat(styles.marginBottom),
        distance = parent.offsetHeight - bottom - item.offsetHeight;
    if (coords.top > window.innerHeight - item.offsetHeight) return item.style.removeProperty('transform');
    if (coords.top < -distance) return item.style.setProperty('transform', 'translateY(' + distance + "px)");
    var total = distance + window.innerHeight - item.offsetHeight,
        progress = 1 - (coords.top + distance) / total;
    item.style.setProperty('transform', 'translateY(' + distance * progress + "px)");
  });
};

window.addEventListener('load', parallaxPosition);
window.addEventListener('resize', parallaxPosition);
document.addEventListener('scroll', parallaxPosition);
;
{
  var setCoords = function setCoords(item, parCoords) {
    item.style.setProperty('top', parCoords.bottom + 'px');
    item.style.removeProperty('width');
    if (parCoords.left + item.offsetWidth < window.innerWidth) item.style.setProperty('left', parCoords.left + 'px');else item.style.setProperty('right', '0px');

    if (window.innerWidth <= 500) {
      var max = 0;

      for (var i = 0; i < item.children.length; i++) {
        if (item.children[i].offsetWidth > max) max = item.children[i].offsetWidth;
      }

      item.style.setProperty('width', max + 'px');
    }
  };

  document.querySelectorAll('.simplepopup').forEach(function (item) {
    var trigger = item.getAttribute('data-trigger');
    var parent = item.parentNode;
    item.remove();
    document.body.appendChild(item);

    item.onclick = function () {
      return document.querySelectorAll('.simplepopup.active,.subnav__link.active').forEach(function (item) {
        return item.classList.remove('active');
      });
    };

    if (trigger == 'click') {
      parent.onclick = function (e) {
        e.preventDefault();
        var turnOn = true;
        if (item.classList.contains('active')) turnOn = false;
        document.querySelectorAll('.simplepopup.active,.subnav__link.active').forEach(function (item) {
          return item.classList.remove('active');
        });

        if (turnOn) {
          setCoords(item, parent.children[0].getBoundingClientRect(), parent);
          parent.classList.add('active');
          item.classList.add('active');
        }
      };
    }
  });
  window.addEventListener('resize', function () {
    return document.querySelectorAll('.simplepopup,.subnav__link.active').forEach(function (item) {
      item.classList.remove('active');
      item.style.removeProperty('right');
      item.style.removeProperty('left');
      item.style.removeProperty('top');
    });
  });
}
;
var textarea = document.querySelector('.calculation__form textarea');
textarea.addEventListener('input', function () {
  if (textarea.offsetHeight < textarea.scrollHeight) textarea.classList.add('overflow');else textarea.classList.remove('overflow');
});
objectFitImages();