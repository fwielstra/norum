This is a simple, me screwing around on a Friday kinda project. The goal is to write a simple piece of forum software, initially, then add some funky features like automatically updating threads and other fancy real-time features.

The application is built using Node.js on the back-end, using MongoDB as a storage engine. The software will initially be built as a simple RESTful webservice, in which the templates are rendered on the clientside (currently using Sammy.js - [read my blogpost about Sammy on Xebia NeXt](http://next.xebia.com/57008972). This should ensure a simple and fast back-end.

Features
========

I've set up a simple listing on Google Moderator, please [go here to suggest and vote for new features to be added](http://www.google.com/moderator/#15/e=92af0&t=92af0.40).

Requirements
============

You'll need to have Node.js, Node Package Manager (NPM) and MongoDB installed. Look 'em up on Google. Also, it's best to do this all on Linux - I'm doing all this in a Virtualbox install of Ubuntu.

Getting started
==============

First, install MongoDB. Best bet is to go to [the MongoDB quickstart](http://www.mongodb.org/display/DOCS/Quickstart+Unix) and install it according to your system. Don't forget to create a data directory - and I'd stick with the default, makes things easier for you. Add Mongo's bin directory to your PATH and run Mongod (MongoDB Daemon) as a daemon service. I run it in a separate terminal window and leave it like that. In a second terminal window, test if it works using the mongo commandline utility.

```
mongo
>db.foo.save({yo: 1337});
>db.foo.find();
>exit
```

Next, have NPM download and setup the third-party dependencies:

```
npm install -d
```

Finally, start the server:

```
node app.js
```
A message should appear that the server runs on localhost:3000 (along with a listing of the settings). Visit [http://localhost:3000](http://localhost:3000) and witness the glory.

To run in production mode (with caching enabled), run:

NODE_ENV=production node app.js