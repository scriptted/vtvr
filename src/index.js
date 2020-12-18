import anime from 'animejs/lib/anime.es.js';

(function() {
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
        return [anime.random(1.1, 2),0.8];
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
        var e = document.createEvent('Event');
        e.initEvent("scroll", true, true);
        window.dispatchEvent(e);
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
  
    const tl = anime.timeline({ autoplay: false });
       
    tl.add({
      targets: '.frame',
      easing: 'easeOutSine',
      opacity: [0.1, 1],
      scale: function(el, i, l) {
        return [anime.random(1.1, 2),0.8];
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
  
    const tl2 = anime.timeline({ autoplay: false });
       
    tl2.add({
      targets: '.illustration',
      easing: 'easeOutSine',
      opacity: [0, 1],
      duration: 500},
    0);
  
    window.addEventListener('scroll', () => {
      percentage = Math.max(0.1, getScrollPercent());
      tl.seek(tl.duration * (percentage / 100));
      tl2.seek((tl2.duration * (percentage / 100)) - (tl2.duration * ((100 - percentage) / 100)));
    });
    
    $('.minimal-btn').on('mouseover', function() {
      $(this).text('En savoir plus');
    }).on('mouseout', function() {
      $(this).text('+');
    });
  
  
    $('.goto').on('click', function(e){
      e.preventDefault();
      var goto = $(this).data('goto');
      $('html').animate({
        scrollTop: $('#'+goto).offset().top
      }, 500)
    })
  }
})();