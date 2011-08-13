Keeping it light, lean, and without too much management overhead, this file
contains a list of user stories, their status, and a list of tasks associated
with those. Done tasks and stories are marked with an X. Stories and tasks
will be ordered (and re-ordered) according to their priority and dependence
on each other. Done stories will be ordered in the order they've been completed.
Todo stories will be at the top, done at the bottom.

TODO STORIES
====

 * A user can register an account and log in (thus claim ownership of his username and threads / posts)
  * Back-end:
    * Register method
    * Login method
    * retrieve data method (?)
    * Use logged in user's name when storing threads / replies.
  * Front-end:
    * Register page
    * Login page or popup / form
    * Hide username form field if user is logged in.

 * The user can edit his existing posts and threads (depends on register story)
 * Thread listings are paginated.
 * Thread replies / posts are paginated.


LONG-TERM STORIES
================

 * Relevant site contents (threads & posts) can be indexed by search engines
  * server-side template rendering
  * Research: Shared templated between front- and back-end.

NON-FUNCTIONALS / TASKS
===============

 * Refactor the thread API so it uses IDs instead of titles (titles may be duplicated). Search engine friendliness is not
    important for an API, and ensuring unique titles is a bit tricky.
 * Completely review and organize the templates / structuring
 * Style the whole thing.
 * Automate inserting test data
 * Up unit test coverage.
 * Use a temporary / transitive MongoDB instance with test data to run integration tests.


API METHODS
===========

Figured it'd be a good idea to do some planning first, do the back-end, then 
build a front-end independently. In order to do that, a list of available API
methods would be pleasant. This is the v1, as simple as possible. This assumes
the user is authenticated already (in whatever way).

Reading
Thread

List of threads (title and basic information)
   GET site.com/thread

First page of a thread, based on default posts per page. Each call to
/thread/1234 also supplies basic thread info like thread title etc.
   GET site.com/thread/1234

Xth page of a thread, based on default posts per page
   GET site.com/thread/1234/5

Writing
New thread
    PUT site.com/thread?title=xyz&firstpost=asdfsdfa

New poast. Might want to consider moving this to a /post service.
    PUT site.com/thread/reply?thread=123?post=ssdfdijfjf


DONE STORIES
====

 X The user can create a new thread
  X Back-end controller
  X Front-end logic and display
 X The user can view a list of threads
  X Back-end controller
  X Front-end logic and display
 X The user can view an existing thread
  X Back-end controller
  X Front-end logic and display
 X The user can add a reply to a thread
  X API
  X Front-end
 X The user can read all replies to a thread.
  X API
  X Front-end