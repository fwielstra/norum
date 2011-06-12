(function($) {
	var app = $.sammy( function() {
		this.use('Template');
		this.element_selector = '#main';

		this.get('#/', function(context) {
			context.app.swap(''); // clears the screen when someone presses back to return to #/.
			this.load('thread')
			.then( function(threads) {
				$.each(threads, function(i, thread) {
					context.render('templates/thread.template', {thread : thread}).appendTo(context.$element());
				});
			})
			.then(function() {
				context.render('templates/newthread.template').appendTo(context.$element());
			});
		});
		
		this.get('#/thread/:title', function(context) {
			this.load('thread/' + this.params['title'])
			.then(function(thread) {
				context.partial('templates/thread.template', {thread: thread});
			});
		});
		
		this.post('#/thread', function(context) {
			this.log('Params: ', this.params);
			$.post('thread', this.params);
			this.redirect('#/thread/' + this.params.title);
		});
	});
	
	$( function() {
		app.run('#/');
	});
})(jQuery);