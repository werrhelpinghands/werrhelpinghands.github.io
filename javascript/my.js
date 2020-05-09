
jQuery(function($) {
	"use strict";
	$(document).ready(function(){

	var dials = $('.dial');
	var tabsContainer = $('.tabs-container');
	var dropdownInput = $('a.dropdown-input');
	var table = $('table');
	var trTable = $('table tr');
	var facts = $('.fact .number');
	var distance = $('input#fader');
	var distanceLabel = $('.distance');
	var ulDropdown = $('ul.dropdown');
	var accordions = $('.accordions');
	var progress = $('.progress-bar');
	var items = $('.item');
	// OWLS
	var owlHeader = $('.owl-header');
	var owlMacbook = $('.owl-macbook');


	for(var i = 0; i < items.length; i++)
	{
		var bg = items.eq(i).data("background");
		items.eq(i).css({"background": "url('" + bg + "') no-repeat center center",
			"background-size":"cover"});
	}

	

	// Progress Bar init
	for(var i = 0; i < progress.length; i++ )
	{
		var cur = jQuery(progress.get(i));
		cur.css("width", cur.data("valuenow") + "%");
	}
	// Knob init
	dials.knob({});

	// Dropdown Input

	distanceLabel.html(distance.val());

	distance.on("change mousemove", function() {
	    distanceLabel.html(distance.val());
	});

	var dropdowned = false;

	$(document).click(function(){
		if(dropdowned)
		{
			ulDropdown.slideUp(200);
			dropdowned = false;
		}
	});

	dropdownInput.click(function(){
		event.preventDefault();
		ulDropdown.slideUp(200);
		if(!($(this).next('ul.dropdown').is(':visible')))
		{
			$(this).next('ul.dropdown').slideDown(200);
			setTimeout(function(){
				dropdowned = true;
			}, 100);
		}
		event.stopPropagation();
	});

	ulDropdown.children('li').children('a').on('click', function(){
		$(this).parent().parent().prev('a.dropdown-input').html($(this).html());
		$(this).parent().parent().slideUp(200);
	});

	

	// Tabs

//	tabsContainer.children('.tab-nav').children('a').on('click', function(){
//		event.preventDefault();
//		$('.tabs-container .tab-nav a').removeClass('active');
//		$(this).addClass('active');
//		var index = $(this).parent().children('a').index($(this));
//		tabsContainer.children('.tab-holder').children('.tab').fadeOut(150);
//		tabsContainer.children('.tab-holder').children('.tab').eq(index).fadeIn(150);
//	});
//
//	tabsContainer.each(function(){
//		var active_tab = $('.tab-nav a.active');
//		var index = $(this).find('.tab-nav').children('a').index(active_tab);
//		tabsContainer.find('.tab').hide();
//		tabsContainer.children('.tab-holder').children('.tab').eq(index).show();
//	});

// $('.tabs-container .tab-nav a').click(function(){
//    $('.tabs-container .tab-nav a').removeClass("active");
//    $(this).addClass("active");
//});
            
            
            // Accordion

	accordions.children('.accordion').children('.content').hide();
	$('.accordions').children('.accordion.active').children('.content').slideDown(200);
	accordions.children('.accordion').children('a.heading').on('click', function(){
		event.preventDefault();
			$(this).parent().siblings('.accordion').children('.content').slideUp();
			$(this).parent().siblings('.accordion').removeClass('active')
			$(this).parent().children('.content').slideDown();
			$(this).parent().addClass('active');
	});

	function isScrolledIntoView(elem)
	{	try{
	    var docViewTop = $(window).scrollTop();
	    var docViewBottom = docViewTop + $(window).height();

	    var elemTop = $(elem).offset().top;
	    var elemBottom = elemTop + $(elem).height();

	    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		}
		catch(e){}
	}

	// Function for making the table responsive

//	function responsiveTable() {
//		var width = $(window).width();
//		var height = $(window).height();
//		if(width < 530) {
//			trTable.children('td').each(function(){
//				if($(this).index() != 0 && $(this).index() != $(this).siblings().length)
//					$(this).hide();
//			});
//		}
//		else {
//			trTable.children('td').show();
//		}
//	}

	var dialed = false;

	owlMacbook.children('.item').height(owlMacbook.siblings('img').height() * 0.78);
	
	$(window).resize(function(){

		owlHeader.children('.owl-wrapper-outer').children('.owl-wrapper').children('.owl-item').height(owlHeader.siblings('form').outerHeight(false));
		owlMacbook.find('.item').height(owlMacbook.siblings('img').height() * 0.78);

		responsiveTable();
	});

	$(window).scroll(function(){
		if(!$('body').hasClass('static'))
		{
		    var $nav = $('nav');
		    if ($('body').scrollTop() > 50) {
		    	$nav.find('.navbar-top').slideUp(100);
		    	$nav.css('padding-bottom', '2px');
		    } else {
		    	$nav.find('.navbar-top').slideDown(100);
		    	$nav.css('padding-bottom', '40px');
		    }
		}

		
                
                
		if(isScrolledIntoView(facts) && facts.html() == "0")
			facts.countTo();
		if(isScrolledIntoView(dials) && !dialed)
		{

			dialed = true;
			dials.each(function () { 

	          var elm = $(this);
	          var color = elm.attr("data-fgColor");  
	          var perc = elm.attr("value");  
	 
	          elm.knob({ 
	               'value': 1, 
	                'min':0,
	                'max':100,
	                "readOnly":true,
	                "lineCap": 'round',
					"thickness": .2,
					"inputColor": "#2f2f2f",
					"font": "Raleway",
					"fontWeight":700,
	                'dynamicDraw': true
	          });

	          $({value: 0}).animate({ value: perc }, {
	              duration: 1000,
	              easing: 'swing',
	              progress: function () {                  elm.val(Math.ceil(this.value)).trigger('change')
	              }
	          });

	          });
		}

	});

$(window).scroll(function(){
		if(!$('body').hasClass('static'))
		{
		    var $nav = $('nav');
		    if ($('body').scrollTop() > 50) {
		    	$nav.find('.navbar-top .social');
		    	$(".navbar-top .social").css('display', 'block');
		    } else {
		    	$nav.find('.navbar-top .social');
		    	$(".navbar-top .social").css('display', 'none');
		    }
		}
                });
    // for social icons hide and show


	// Owl Sliders Initializations

	owlHeader.owlCarousel({
		singleItem : true,
		pagination: false,
		navigation: true,
		navigationText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
		autoPlay: 6000
	});


	owlHeader.children('.owl-wrapper-outer').children('.owl-wrapper').children('.owl-item').height(owlHeader.siblings('form').outerHeight(false));

	$('.owl-clients').each(function(){
		$(this).owlCarousel({
			singleItem : false,
			pagination:false,
			navigation: false,
			items:4,
			autoPlay:3000
		});
	});

	$('.owl-testimonials').each(function(){
		$(this).owlCarousel({
			singleItem : false,
			pagination:false,
			navigation: false,
			items:3,
			autoPlay:3000
		});
	});

	owlMacbook.owlCarousel({
		singleItem: true,
		pagination: false,
		autoPlay:4000
	});

	$('.owl-carousel').each(function(){
		$(this).owlCarousel({
			singleItem : true
		});
	});

	responsiveTable();

});
})
