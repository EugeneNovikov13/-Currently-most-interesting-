//СОЗДАНИЕ МАССИВА С ФОТОГРАФИЯМИ
let imgArr = [];
(function (){
	for(let i = 1; i <= 12; i++ ) {
		imgArr.push("img/" + i + ".jpg");
	}
})();

//СОЗДАНИЕ БЛОКА С ФОТОГРАФИЯМИ
let imgDiv = '<div class="owl-carousel owl-theme">\n'
for (let i =0; i<imgArr.length; i++) {
	imgDiv += '<div><img src='+ imgArr[i] +' alt="'+ (i+1) +'"></div>\n'
}
imgDiv += '</div>';
$('.gallery').html(imgDiv);


//НАСТРОЙКА КАРУСЕЛИ
let owl = $('.owl-carousel');
owl.owlCarousel({
	loop: false,
	center: true,
	items: 1,
	margin: 10,
	nav: true,
	navText: ['<img src="img/prev.png" alt="prev">', '<img src="img/next.png" alt="next">'],
	smartSpeed: 450,
	animateOut: 'fadeOut',
});

//ДОБАВЛЕНИЕ КНОПОК
imgDiv = '<button type="button" role="presentation" class="owl-play"><img src="img/play.png" alt="P"></button>';
$('.owl-prev').after(imgDiv);
imgDiv = '<button type="button" role="presentation" class="owl-first disabled"><img src="img/first.png" alt="F"></button>';
$('.owl-nav').prepend(imgDiv);
imgDiv = '<button type="button" role="presentation" class="owl-last"><img src="img/last.png" alt="L"></button>';
$('.owl-next').after(imgDiv);

//АДАПТАЦИЯ К РАЗМЕРАМ ЭКРАНА
$(window).on('resize load', screenAdaptation);

function screenAdaptation () {
	if ($(window).innerWidth() <= 800) {
		$('.owl-item img').css({width: '450px', height: '300px'});
		$('.gallery').css({width: '450px'});
	}
	if ($(window).innerWidth() > 800) {
		$('.owl-item img').css({width: '750px', height: '500px'});
		$('.gallery').css({width: '750px'})
	}
}

//ПОЛНЫЙ ЭКРАН ЗАПРОС
imgDiv = '<div class="full-screen"><img src="img/fs-in.png" alt="X"></div>';
owl.append(imgDiv);

$('.full-screen').click(function () {
	if (!document.fullscreenElement) {
	    $(window).off('resize', screenAdaptation);
		document.documentElement.requestFullscreen({ navigationUI: "hide" }).then(() => {
		    $('.full-screen img').attr('src', 'img/fs-out.png');
		});
	}
	else {
	    $(window).on('resize', screenAdaptation);
	    document.exitFullscreen().then(() => {
	        $('.full-screen img').attr('src', 'img/fs-in.png');
	    });
	}
})

//ИЗМЕНЕНИЕ РАЗМЕРА ИЗОБРАЖЕНИЙ НА ПОЛНОМ ЭКРАНЕ И ОБРАТНО
document.addEventListener('fullscreenchange', fullScreen)

function fullScreen() {
	if (document.fullscreenElement) {
		if ($(window).innerWidth()/1.5 > (window.outerHeight-90)) {
			$('.owl-item img').css({
				width: ((window.outerHeight - 90) * 1.5),
				height: (window.outerHeight - 90)
			})
			$('.owl-item, .gallery').css({width: (window.outerHeight - 90) * 1.5});
		}
		else {
			$('.owl-item img').css({
				width: ($(window).innerWidth()-20),
				height: (($(window).innerWidth()-20) / 1.5)
			})
			$('.owl-item, .gallery').css({width: ($(window).innerWidth()-20)});
		}
	}
	else screenAdaptation ()
}

//ПРОКРУТКА КАРТИНОК КОЛЕСОМ МЫШИ
owl.on('mousewheel', '.owl-stage', function (e) {
    if (e.originalEvent.deltaY>0) {
        owl.trigger('next.owl');
    } else {
        owl.trigger('prev.owl');
    }
    e.preventDefault();
});

//ДОБАВЛЕНИЕ DISABLED К КНОПКАМ
owl.on('changed.owl.carousel', function(e) {
	if (e.item.index === 0) {
		$('.owl-first').addClass('disabled');
	}
	else {
		$('.owl-first').removeClass('disabled');
	}
	if (e.item.index === imgArr.length-1) {
		$('.owl-last').addClass('disabled');
		$('.owl-stop').trigger('click');
	}
	else {
		$('.owl-last').removeClass('disabled');
	}
})

//ПЕРЕХОД К ПЕРВОЙ И ПОСЛЕДНЕЙ КАРТИНКЕ
$('.owl-first').click(function () {
	owl.trigger('to.owl.carousel', [0, 1000]);
})
$('.owl-last').click(function () {
	owl.trigger('to.owl.carousel', [imgArr.length-1, 1000]);
})

//СЛАЙД-ШОУ
$('.owl-play, .owl-stop').click(slideShow);

function slideShow() {
	if (!$(this).hasClass('owl-stop')) {
		owl.trigger('play.owl.autoplay', [1000, 500]);
		$(this).html('<img src="img/stop.png" alt="S">');
		$(this).addClass('owl-stop');
	}
	else {
		owl.trigger('stop.owl.autoplay');
		$(this).html('<img src="img/play.png" alt="P">');
		$(this).removeClass('owl-stop');
	}
}
