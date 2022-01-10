$(function slider () {
    	$('.product__slider').slick({
				infinite: true,
  			slidesToShow: 3,
  			slidesToScroll: 1,
				responsive: [
    		{
      		breakpoint: 768,
      			settings: {
  						slidesToShow: 2,
  						slidesToScroll: 1,
      			}
    			},
    		{
      		breakpoint: 448,
      			settings: {
        			slidesToShow: 1,
  						slidesToScroll: 1,
      }
    }
  ]
			});
			$('.popup-modal').on('click', function () {
					$('.product__slider').slick("refresh");
			});
});