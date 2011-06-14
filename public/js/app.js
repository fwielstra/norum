(function($) {
	var app = $.sammy( function() {
		this.use('Template');
		this.element_selector = '#main';

		this.get('#/', function(context) {
			context.app.swap(''); // clears the screen when someone presses back to return to #/.
			this.load('thread', {cache:false})
			.then( function(threads) {
				$.each(threads, function(i, thread) {
					context.render('templates/threadlist.template', {thread : thread}).appendTo(context.$element());
				});
			});
		});
		
		this.get('#/thread/poast', function(context) {
		  this.partial('templates/newthread.template');
		});
		
		this.get('#/thread/:title', function(context) {
			this.load('thread/' + this.params['title'], {cache:false})
			.then(function(thread) {
			  console.log(thread);
				context.partial('templates/thread.template', {thread: thread[0]});
			});
		});
		
		this.post('#/thread', function(context) {
			this.log('Params: ', this.params);
			$.post('thread', this.params);
			this.redirect('#/thread/' + this.params.title);
		});
		
		this.post('#/reply', function(context) {
		  this.log('Params:', this.params);
		  $.post('thread/reply', this.params);
		  this.redirect('#/thread/' + this.params.threadtitle);
		});
	});
	
	$( function() {
		app.run('#/');
	});
})(jQuery);