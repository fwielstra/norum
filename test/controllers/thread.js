var nodeunit = require('nodeunit');

// A mocked-up app that stores the GET and POST routes and their callbacks,
// so that a router does not need to export its routing callbacks.
var mockApp = function() {
  var get = [];
  var post = [];

  return {
    post: function (route, callback) {
      this.post[route] = callback;
    },
    get: function(route, callback) {
      this.get[route] = callback;
    }
  };
}

// simple alias for require on the thread controller.
function createController(app, Thread, Post) {
  return require('../../controllers/thread.js')(app, Thread, Post);
} 

exports['Thread router'] = nodeunit.testCase({
 'All routes are defined' : function(test) {
    // make sure all expected routes are defined
    var app = new mockApp();
    createController(app);
    test.ok(app.post['/thread']);
    test.ok(app.post['/thread/reply']);
    test.ok(app.get['/thread']);
    test.ok(app.get['/thread/:title.:format?']);
    test.done();
  },
  
  'The POST "/thread" route callback creates and saves a new Thread object.': function(test) {
    test.expect(1);
    
    // mock the request parameters
    var request = {body: {title: 'test', author: 'test'}};
    
    // mock the thread model with a test for whether the right params are passed.
    var Thread = function(params) {
      return {
        save: function(callback) {
          test.deepEqual(params, request.body);
          callback();
        }
      }
    }
    // mock the response with a test if the redirect is correct.    
    var response = {
      end: function(response) {
        test.done();
      }
    }
    // initialize the controller, get the route for the post on /thread.
    var app = new mockApp();
    createController(app, Thread);
    app.post['/thread'](request, response);
  },
  
  'The GET "/thread" route callback returns a list of Threads': function(test) {
    test.expect(1);
    var threads = [{test: true}];
    
    var Thread = {
      find: function(callback) {
        callback(null, threads);
      }
    }
    
    var response = {
      send: function(params) {
        test.equals(params, threads);
      }
    }

    var app = new mockApp();
    createController(app, Thread);
    app.get['/thread'](null, response);
    test.done();
  },


  'The GET "/thread/:title.:format?" route callback returns a specific thread by title and its replies by threadid': function(test) {
    test.expect(4);
    
    // expected results
    var replies = [{post: 'test'}, {post: 'test2'}];
    var thread = {_id: '1234', title: 'my thread'};
    
    // mock Thread model, mocks findOne to test if the passed parameters match and returns the thread.
    var Thread = {
      findOne: function(params, callback) {
        test.deepEqual(params, {title: thread.title});
        callback(null, thread);
      }
    };
    
    // mock Post model, mocks the find() method, tests if the parameter matches
    // our thread's ID. 
    var Post = {
      find: function(params, callback) {
        test.equal(params.thread, thread._id);
        callback(null, replies);
      }
    };
    
    // the request - we request a thread with a specific title here.
    var request = {
      params: {
        title: thread.title
      }
    };
    
    // mock the response object to test whether the response contains our thread
    // and replies.
    var response = {
      send: function(params) {
        test.equal(params[0].thread, thread);
        test.equal(params[0].replies, replies);
      }
    }

    // do it.
    var app = new mockApp();
    createController(app, Thread, Post);
    app.get['/thread/:title.:format?'](request, response);
    test.done();
  },
  
  'The GET "/thread/:title.:format?" callback returns an error when the thread does not exist': function(test) {
    test.expect(1);
    var request = {params: {title: ''}};
    var error = 'thread not found';
    var Thread = {
      findOne: function(params, callback) {
        callback(error, null);
      }
    };
    var response = {
      send: function(content) {
        test.equal(content, error);
      }
    };
    var app = new mockApp();
    createController(app, Thread);
    app.get['/thread/:title.:format?'](request, response);
    test.done();
  },

  'The POST "/thread/reply/:threadid" route callback stores a new post attached to the given thread, making sure the thread exists.': function(test) {
    test.expect(2);
    
    var thread = {_id: '1234'}
    var request = {
      body : {
        threadid: thread._id,
        author: 'pete',
        post: 'Hi my name is pete im nu hear'
      }
    };
    
    var Post = function(params){
      return {
        save: function(callback) {
          test.deepEqual(params, {
            thread: request.body.threadid,
            author: request.body.author,
            post: request.body.post
          });
          callback();
        }
      }
    };
    
    var Thread = {
      findById: function(id, callback) {
        test.equals(id, thread._id);
        callback(null, thread);
      }
    };
    
    var response = {
      end: function() {
        test.done();
      }
    }
    
    var app = new mockApp();
    createController(app, Thread, Post);
    app.post['/thread/reply'](request, response);
  },
  
  'The POST "/thread/reply/:threadid" returns an error when the given thread was not found' : function(test) {
    test.expect(1);
    
    var error = 'an error occurred';
    var Thread = {
      findById: function(id, callback) {
        callback(error, null);
      }
    }
    
    var response = {
      send: function(data) {
        test.equals(data, error);
      }
    }
    
    var app = new mockApp();
    createController(app, Thread);
    app.post['/thread/reply']({body: {threadid: 'asdf'}}, response);
    test.done();
  }
});