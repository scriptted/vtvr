import anime from 'animejs/lib/anime.es.js';
(function() {
   
  var pano=document.getElementById('videojs-vr-player');
  if(pano){
    var player = videojs('videojs-vr-player',{
      autoplay: 'muted',
      loop: true,
      controlBar: {
        playToggle: false,
        captionsButton: false,
        chaptersButton: false,            
        subtitlesButton: false,
        remainingTimeDisplay: false,
        progressControl: {
          seekBar: false
        },
        fullscreenToggle: false,
        playbackRateMenuButton: false,
      },
    });

    player.vr({projection: 'EAC'});
    player.ready(function() {
      player.controlBar.progressControl.disable();
    });
  }
  

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
        });
  
        anime({
          targets: '.card-2',
          easing: 'easeOutSine',
          translateX : function(el, i, l) {
            return -100;
          },
          duration: 500,
          delay: 500,
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
        });

      }
    });

    ScrollReveal().reveal('.reveal', { 
    });

    anime({
      targets: '.frame',
      easing: 'easeOutSine',
      opacity: [0, 1],
      rotate : function(el, i, l) {
        return i * 30;
      },
      duration: 500,
      delay: 500,
      complete: function(anim) {
        anime({
          targets: '.illustration',
          opacity: [0, 1],
        });
      }
    });
  

    /*anime({
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
    });*/
  
    /*function getScrollPercent() {
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
    0);*/

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

    var isScrolling;
    var scrollDirection;
    var lastScrollTop = 0;

    var isScrolling = setTimeout(function() {
    
      var nextStop = 0;
      if (scrollDirection == 'down')
      {
        nextStop = (currentSectionIndex + 1) * $(window).height();
      } else {
        nextStop = (currentSectionIndex - 1) * $(window).height();
      }

      //console.log(nextStop);
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
  
    }, 100);


    window.addEventListener('scroll', function ( event ) {
      var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > lastScrollTop){
        scrollDirection = 'down';
      } else {
        scrollDirection = 'up';
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      // Clear our timeout throughout the scroll
      window.clearTimeout( isScrolling );
    
      // Set a timeout to run after scrolling ends
      
    
    }, false);
  
    document.addEventListener('wheel', function(event){
        event.preventDefault();

        var nextStop = currentSectionIndex;
        if (event.deltaY > 0)
        {
          nextStop = (currentSectionIndex + 1) * $(window).height();
        } else {
          nextStop = (currentSectionIndex - 1) * $(window).height();
        }

        window.clearTimeout( isScrolling );

        //console.log(nextStop);
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