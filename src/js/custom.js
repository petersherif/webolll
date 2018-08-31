// Hides the page loader when the page load completely
$(window).on('load', function() {
	$('#page-loading').fadeOut();
	// Body overflow is hidden by default. The next line adds to the body
	// the class .loaded{overflow-x: hidden; overflow-y: auto;}
	$('body').addClass('loaded');
});


$(document).ready(function () {
	
  // Smooth scrolling
  $('.smooth-scroll').click(function(e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000 );
  });

	// Navbar changes on page scroll
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

					if ($windowTop >= $elementTop && $windowTop < $elementBottom) {
						$(link).parent().siblings().removeClass('active');
						$(link).parent().addClass('active');
					} else if($windowTop > $elementBottom) {
						$(link).parent().removeClass('active');
					}
				}
			}
	});

	// Fade in elements on scroll
	function fadeElementsIn() {
		$('.fade-on-scroll').each(function(i) {
			var topOfElement = $(this).offset().top,
					bottomOfWindow = $(window).scrollTop() + $(window).height();

			if(bottomOfWindow > (topOfElement + 100)) {
				$(this).addClass('viewed');
			}
		});
	}

	// A call when the page loads with scroll made before page refresh
	fadeElementsIn();

	$(window).scroll(function() {
		// A call for live page scroll
		fadeElementsIn();
	});


	// Small function to toggle .opened class on navbar-toggler icon
	function toggleMenuIcon(e) {
		$(e).find('.navbar-toggler-icon').toggleClass('opened');
	}

	// Navbar toggler animated and transformed to X icon on click
	$('.navbar-toggler').click(function() {
		toggleMenuIcon(this);
	});

	// Navbar collapses when nav link clicked on small screens
	$('.nav-link').click(function() {
		if($(window).Width() < 992) {
			$('.navbar-toggler').click();
			toggleMenuIcon(this);
		}
	});


	// initialize paroller.js 
	$('[data-paroller-factor]').paroller();


	// Slider initialization
	var clientsSlider = new Swiper ('.swiper-container', {loop: true, autoplay: {delay: 5000}});
});