$(document).ready(function () {

  // Smooth scrolling
  $('.smooth-scroll').click(function(e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000 );
  });


	// initialize paroller.js 
	$('[data-paroller-factor]').paroller();


	// Navbar background on scroll and expand
	$(document).scroll(function () {

			// Add background color to navbar on scroll > 60px
			$('.navbar').toggleClass('navbar-bg-scroll', $(this).scrollTop() > 60);


			// ScrollSpy

			// Get out nav links
			var	bodyOffset = 66,
					links = $('.navbar .nav-link');

			// Loop throught the nav links
			for (var i = 0; i < links.length; i++) {

				// Get the current link href
				var link = links[i];

				// Get the link hash
				var hash = $(link).attr('href');

				// Get the associated element
				var element = $(hash);

				if (element.length > 0) {
					var $windowTop = $(window).scrollTop() + bodyOffset,
							$elementTop = Math.floor($(element).offset().top);
							$elementBottom = Math.floor($elementTop + $(element).outerHeight());
							console.log($windowTop);

					if ($windowTop >= $elementTop && $windowTop < $elementBottom) {
						$(link).parent().siblings().removeClass('active');
						$(link).parent().addClass('active');
					} else if($windowTop > $elementBottom) {
						$(link).parent().removeClass('active');
					}
				}
			}
	});

	$('.navbar-toggler').click(function() {
		$(this).find('.navbar-toggler-icon').toggleClass('opened');
	});

	// Slider initialization
	var clientsSlider = new Swiper ('.swiper-container', {loop: true, autoplay: {delay: 5000}});
});