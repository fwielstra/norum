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
		this.use('Template');
		this.element_selector = '#main';

		this.get('#/', function(context) {
			this.load('thread')
			.then( function(threads) {
				$.each(threads, function(i, thread) {
					context.render('templates/thread.template', {thread : thread}).appendTo(context.$element());
				});
			});
		});
	});
	$( function() {
		app.run('#/');
	});
})(jQuery);