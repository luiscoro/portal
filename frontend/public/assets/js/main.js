(function($){
  "user strict";

  $(document).on('ready',function() {
    background();
  });

  $(window).on("load", function() {
    //preloader
    $(".preload").delay(300).animate({
      "opacity" : "0"
      }, 300, function() {
      $(".preload").css("display","none");
    });
    // init Isotope
    var $grid = $('.grid').isotope({
      // options
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        // use element for option
        columnWidth: '.grid-item'
      }
    });
    $grid.imagesLoaded().progress( function() {
      $grid.masonry();
    });
    // filter items on button click
    $('.filter-button-group').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });
    $('.filter-button-group').on( 'click', 'button', function() {
      $(this).addClass('active').siblings().removeClass('active');
    });

  });

  $('select').niceSelect();

  $(".header-serch-btn").on('click', function(){
    //$(".header-top-search-area").toggleClass("open");
    if ($(this).hasClass('toggle-close')) {
        $(this).removeClass('toggle-close').addClass('toggle-open');
        $('.header-top-search-area').addClass('open');
    }
    else {
        $(this).removeClass('toggle-open').addClass('toggle-close');
        $('.header-top-search-area').removeClass('open');
    }
  });

  //close when click off of container
  $(document).on('click touchstart', function (e){
    if (!$(e.target).is('.header-serch-btn, .header-serch-btn *, .header-top-search-area, .header-top-search-area *')) {
      $('.header-top-search-area').removeClass('open');
      $('.header-serch-btn').addClass('toggle-close');
    }
  });

  $(".navbar-collapse>ul>li>a, .navbar-collapse ul.sub-menu>li>a").on("click", function() {
    var element = $(this).parent("li");
    if (element.hasClass("open")) {
      element.removeClass("open");
      element.find("li").removeClass("open");
    }
    else {
      element.addClass("open");
      element.siblings("li").removeClass("open");
      element.siblings("li").find("li").removeClass("open");
    }
  });

    // menu options custom affix
  var fixed_top = $(".header-section");
  $(window).on("scroll", function(){
      if( $(window).scrollTop() > 50){  
          fixed_top.addClass("animated fadeInDown menu-fixed");
      }
      else{
          fixed_top.removeClass("animated fadeInDown menu-fixed");
      }
  });

  //js code for mobile menu 
  $(".menu-toggle").on("click", function() {
      $(this).toggleClass("is-active");
  });

  //banner-slider js
  $('.testimonial-slider').owlCarousel({
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    loop:true,
    margin: 0,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsiveClass:true,
    responsive:{
      0:{
        items: 1
      },
      992:{
        items:2
      }
    }
  });

  // testimonial-slider-two
  $('.testimonial-slider-two').owlCarousel({
    animateOut: 'slideInLeft',
    animateIn: 'fadeOut',
    loop:true,
    margin: 0,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsiveClass:true,
    responsive:{
      0:{
        items: 1
      },
      768:{
        items: 1
      },
      992:{
        items:1
      }
    }
  });

  // single-player-slider 
  $('.single-player-slider').owlCarousel({
     animateOut: 'fadeOut',
     animateIn: 'fadeIn',
    loop:true,
    margin: 0,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsiveClass:true,
    responsive:{
      0:{
        items: 1
      },
      992:{
        items:1
      }
    }
  });

  // single-player-slider animation
  $(".single-player-slider").on("translate.owl.carousel", function() {
    $(".single-player-details-area .thumb img").removeClass("animated pulse").css("opacity", "0"),
    $(".single-player-details-area .details").removeClass("animated slideInUp").css("opacity", "0")
  }), 
  $(".single-player-slider").on("translated.owl.carousel", function() {
      $(".single-player-details-area .thumb img").addClass("animated pulse").css("opacity", "1"),
      $(".single-player-details-area .details").addClass("animated slideInUp").css("opacity", "1")
      
  });

  //featured-slider
   $('.featured-slider').owlCarousel({
    loop:true,
    margin: 0,
    smartSpeed: 1000,
    dots: true,
    responsiveClass:true,
    responsive:{
      0:{
          items: 1
      },
      992:{
        items:2
      }
    }
  });

  // sponsor-slider 
  $('.sponsor-slider').owlCarousel({
   loop:true,
   margin: 0,
   smartSpeed: 1000,
   dots: false,
   nav: true,
   navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
   responsiveClass:true,
   responsive:{
     0:{
       items: 1,
       autoplay: true
     },
     575:{
      items: 2
      },
     992:{
       items:3
     }
   }
 });

  // banner-slider js
  $('.banner-slider').owlCarousel({
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    loop:true,
    margin: 0,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsiveClass:true,
    responsive:{
      0:{
        items: 1
      },
      992:{
        items:1
      }
    }
  });

  // banner-slider content animation
  $(".banner-slider").on("translate.owl.carousel", function() {
    $(".banner-content .banner-title").removeClass("animated slideInLeft").css("opacity", "0"),
    $(".banner-content p").removeClass("animated fadeInDown").css("opacity", "0"),
    $(".banner-content .btn-area").removeClass("animated slideInUp").css("opacity", "0"),
    $(".banner-thumb").removeClass("animated zoomIn").css("opacity", "0")
  }),
  $(".banner-slider").on("translated.owl.carousel", function() {
    $(".banner-content .banner-title").addClass("animated slideInLeft").css("opacity", "1"),
    $(".banner-content p").addClass("animated fadeInDown").css("opacity", "1"),
    $(".banner-content .btn-area").addClass("animated slideInUp").css("opacity", "1"),
    $(".banner-thumb").addClass("animated zoomIn").css("opacity", "1")
  });


  // product-slider js
  $('.product-slider').owlCarousel({
    loop:true,
    margin: 30,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsiveClass:true,
    responsive:{
      0:{
        items: 1
      },
      575:{
        items: 2
      },
      767:{
        items: 2
      },
      992:{
        items:4
      }
    }
  });

  // related-product-slider js
  $('.related-product-slider').owlCarousel({
    loop:true,
    margin: 30,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsiveClass:true,
    responsive:{
      0:{
        items: 1
      },
      992:{
        items:3
      }
    }
  });

 $(".header-cart-menu-btn").on('click', function(){
  //$(".header-top-search-area").toggleClass("open");
  if ($(this).hasClass('toggle-close')) {
      $(this).removeClass('toggle-close').addClass('toggle-open');
      $('.shopping-cart-dropdown').addClass('open-drp');
  }
  else {
      $(this).removeClass('toggle-open').addClass('toggle-close');
      $('.shopping-cart-dropdown').removeClass('open-drp');
  }
});

//close when click off of container
$(document).on('click touchstart', function (e){
  if (!$(e.target).is('.header-cart-menu-btn, .header-cart-menu-btn *, .shopping-cart-dropdown, .shopping-cart-dropdown *')) {
    $('.shopping-cart-dropdown').removeClass('open-drp');
    $('.header-cart-menu-btn').addClass('toggle-close');
  }
});



  // service grid and list view
  $(".view-style-toggle-area .grid-btn").on( "click", function() {
    $(".listing-item-search-area").addClass("grid--view").removeClass("list--view");
    $(".listing-item").removeClass("row--style");
  });
  $(".view-style-toggle-area .list-btn").on( "click", function() {
    $(".listing-item-search-area").addClass("list--view").removeClass("grid--view");
    $(".listing-item").addClass("row--style");
  });
  $(".view-style-toggle-area .view-btn").on( "click", function() {
    $(this).addClass("active").siblings().removeClass("active");
  });

  function background() {
    var img=$('.bg_img');
    img.css('background-image', function () {
    var bg = ('url(' + $(this).data('background') + ')');
    return bg;
    });
  };

  $("[data-paroller-factor]").paroller();

   // Show or hide the sticky footer button
   $(window).on("scroll", function() {
    if ($(this).scrollTop() > 200) {
        $(".scroll-to-top").fadeIn(200);
    } else {
        $(".scroll-to-top").fadeOut(200);
    }
  });

  // Animate the scroll to top
  $(".scroll-to-top").on("click", function(event) {
    event.preventDefault();
    $("html, body").animate({scrollTop: 0}, 300);
  });

  // lightcase plugin init
  $('a[data-rel^=lightcase]').lightcase();


  $(".single-accordion .accordion-header").on("click", function() {
    var element = $(this);
    if (element.hasClass("open")) {
      element.removeClass("open");
      element.find(".accordion-header").removeClass("open");
      element.find(".accordion-content").slideUp(500,"linear");
    }
    else {
      element.addClass("open");
      element.siblings(".accordion-content").slideDown();
      element.parent(".single-accordion").siblings(".single-accordion").children(".accordion-content").slideUp();
      element.siblings(".accordion-content").removeClass("open");
      element.parent(".single-accordion").siblings(".single-accordion").find(".accordion-header").removeClass("open");
      element.parent(".single-accordion").siblings(".single-accordion").find(".accordion-content").slideUp();
    }
  });

  $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 80, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val("Price : " + "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  } );


  jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up"><i class="fa fa-chevron-up"></i></div><div class="quantity-button quantity-down"><i class="fa fa-chevron-down"></i></div></div>').insertAfter('.quantity input');
      jQuery('.quantity').each(function () {
          var spinner = jQuery(this),
              input = spinner.find('input[type="number"]'),
              btnUp = spinner.find('.quantity-up'),
              btnDown = spinner.find('.quantity-down'),
              min = input.attr('min'),
              max = input.attr('max');

          btnUp.on('click', function () {
              var oldValue = parseFloat(input.val());
              if (oldValue >= max) {
                  var newVal = oldValue;
              } else {
                  var newVal = oldValue + 1;
              }
              spinner.find("input").val(newVal);
              spinner.find("input").trigger("change");
          });

          btnDown.on('click', function () {
              var oldValue = parseFloat(input.val());
              if (oldValue <= min) {
                  var newVal = oldValue;
              } else {
                  var newVal = oldValue - 1;
              }
              spinner.find("input").val(newVal);
              spinner.find("input").trigger("change");
          });

      });
  

})(jQuery);