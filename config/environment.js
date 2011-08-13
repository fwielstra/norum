module.exports = function(app, express) {
    app.configure(function(){
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(app.router);
      app.use(express.static(__dirname + '/../public'));
    });
    
    app.configure('development', function(){
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
      app.set('mongodb_url', 'mongodb://localhost/norum-dev');
    });
    
    app.configure('production', function(){
      app.set('mongodb_url', 'mongodb://localhost/norum');
    });
    
   app.configure('testing', function(){
      app.set('mongodb_url', 'mongodb://localhost/norum-test');
    });
};