$(document).ready(function () {

  // Smooth scrolling
	var scrollLink = $('.smooth-scroll');
  
  scrollLink.click(function(e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000 );
  });


	// initialize paroller.js 
	$('[data-paroller-factor]').paroller();


	// Navbar background on scroll and expand
	$(document).scroll(function () {
			$('.navbar').toggleClass('navbar-bg-scroll', $(this).scrollTop() > 60);
	});

	$('.navbar-toggler').click(function() {
		$(this).find('.navbar-toggler-icon').toggleClass('opened');
	});

	// Slider initialization
	var clientsSlider = new Swiper ('.swiper-container', {loop: true, autoplay: {delay: 5000}});
});