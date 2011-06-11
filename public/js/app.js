var testdata = {
	"title": "The Door",
	"artist": "Religious Knives",
	"image": "http://ecx.images-amazon.com/images/I/51og8BkN8jL._SS250_.jpg",
	"large_image": "http://ecx.images-amazon.com/images/I/51og8BkN8jL._SS500_.jpg",
	"price": 9.98,
	"url": "http://www.amazon.com/Door-Religious-Knives/dp/B001FGW0UQ/?tag=quirkey-20"
};

(function($) {
	var app = $.sammy( function() {
		this.element_selector = '#main';

		this.get('#/', function(context) {
			this.load('thread/test.json')
			.then( function(items) {
				$.each(items, function(i, item) {
					context.log(item);
				});
			});
		});
	});
	$( function() {
		app.run('#/');
	});
})(jQuery);