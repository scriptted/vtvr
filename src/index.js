import anime from 'animejs/lib/anime.es.js';

(function() {
  jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ){
        this.addEventListener("touchstart", handle, { passive: true });
    }
  };

  if (Modernizr.touch) {

  }
  else 
  {
    ScrollReveal().reveal('.stair-card', { 
      beforeReveal: function() {
        anime({
          targets: '.card-1',
          easing: 'easeOutSine',
          translateY : function(el, i, l) {
            return -100;
          },
          duration: 500,
          delay: 500,
          complete: function(anim) {
          }
        });
  
        anime({
          targets: '.card-2',
          easing: 'easeOutSine',
          translateX : function(el, i, l) {
            return -100;
          },
          duration: 500,
          delay: 500,
          complete: function(anim) {
          }
        });
  
        anime({
          targets: '.card-3',
          easing: 'easeOutSine',
          translateY : function(el, i, l) {
            return 100;
          },
          translateX : function(el, i, l) {
            return -200;
          },
          duration: 500,
          delay: 500,
          complete: function(anim) {
          }
        });
      }
    });
  
    anime({
      targets: '.frame',
      easing: 'easeOutSine',
      opacity: [0, 1],
      scale: function(el, i, l) {
        return [anime.random(1.1, 2),0.6];
      },
      translateY : function(el, i, l) {
        return [anime.random(-1000, 1000),120];
      },
      translateX : function(el, i, l) {
        return [anime.random(-1000, 1000),120];
      },
      duration: 500,
      complete: function(anim) {
      }
    });
  
    anime({
      targets: '.illustration',
      easing: 'easeOutSine',
      opacity: [0, 1],
      duration: 500,
      delay: 500,
      complete: function(anim) {
      }
    });
  
    function getScrollPercent() {
      var h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
      return 100 - ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100);
    }
  
    let percentage = getScrollPercent();
    let prevPercentage = 0;
  
    const tl = anime.timeline({ autoplay: true });
       
    tl.add({
      targets: '.frame',
      easing: 'easeOutSine',
      opacity: [0.1, 1],
      scale: function(el, i, l) {
        return [anime.random(1.1, 2),0.6];
      },
      translateY : function(el, i, l) {
        var index = parseInt(el.className.split('-')[2]);
        return [index * 160 , 120];
      },
      translateX : function(el, i, l) {
        var index = parseInt(el.className.split('-')[2]);
        return [-index * 160 , 120];
      },
      duration: 500},
    0);
  
    const tl2 = anime.timeline({ autoplay: true });
       
    tl2.add({
      targets: '.illustration',
      easing: 'easeOutSine',
      scale: 0.65,
      opacity: [0, 1],
      duration: 500},
    0);

    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;  
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
      scrollStop = true;
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, {passive: false});
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove  = preventDefault; // mobile
      document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        scrollStop = false;
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, {passive: false});
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;  
        currentSectionIndex = Math.round($(window).scrollTop() / $(window).height());
    }

    let scrollStop = false;
    var currentSectionIndex = Math.round($(window).scrollTop() / $(window).height());
  
    document.addEventListener('wheel', function(event){
        event.preventDefault();

        var nextStop = currentSectionIndex;
        if (event.deltaY > 0)
        {
          nextStop = (currentSectionIndex + 1) * $(window).height();
        } else {
          nextStop = (currentSectionIndex - 1) * $(window).height();
        }

        console.log(nextStop);
        $('html').stop().animate(
        {
          scrollTop: nextStop
        },
        {
          duration: 500,
          start:function(){
            disableScroll();
          },
          complete:function(){
            enableScroll()
          },
          fail:function(){
            enableScroll()
          }
        });
    },
    {passive: false});

    
    $('.minimal-btn').on('mouseover', function() {
      $(this).text('En savoir plus');
    }).on('mouseout', function() {
      $(this).text('+');
    });
  
  
    $('.goto').on('click', function(e){
      e.preventDefault();
      scrollStop = true;
      var goto = $(this).data('goto');
      $('html').stop().animate(
      {
        scrollTop: $('#'+goto).offset().top
      },
      {
        duration: 500,
        start:function(){
          disableScroll();
        },
        complete:function(){
            enableScroll()
        },
        fail:function(){
          enableScroll()
        }
      });
    });

    $('#go-up').on('click', function(e){
      console.log('okj')
      $('body, html').stop().animate(
      {
        scrollTop: 0
      },
      {
        duration: 500,
        start:function(){
          disableScroll();
        },
        complete:function(){
            enableScroll()
        },
        fail:function(){
          enableScroll()
        }
      });
    });
  }
})();