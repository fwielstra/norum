Here's some cURL commands to test things out without a front-end.

Fetch a list of threads:
curl http://localhost:3000/thread/

Fetch a specific thread:
curl http://localhost:3000/thread/test-2

Post a new thread:

curl -H 'Content-Type: application/json' -d '{"title":"test-2", "author":"Hodor"}' http://localhost:3000/thread

Add a reply to an existing thread (you'll have to fill in the thread ID yourself):

curl -H 'Content-Type: application/json' -d '{"threadid":"4df64a2367e8702d62000001", "post":"I maek another post from curl", "author":"Hodorhodorhodor"}' http://localhost:3000/thread/reply
