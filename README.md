# Social Network API

## Description

AS a social media startup I want an API for my social network that uses a NoSQL database so that my website can handle large amounts of unstructured data.

This project uses MongoDB, Mongoose, Express.js, and Node.js to create a backend for a social media network. This project was a great way to learn non-relational databases.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Installing MongoDB is necessary to run this application.

Installing Insomnia is necessary to experience the functionality of the application

Clone the repository

Run 'npm i' in the terminal to install all dependencies.

Run 'npm run seed' in the terminal to seed the data base.

## Usage

Click [here to see video](https://drive.google.com/file/d/1BqBmwRvDoBrnodva8C3tUv9iL16sQrRU/view) demonstration of the application. 

Run 'node index' in the terminal to start the server

![Terminal command screenshot](/assets/run%20app%20screenshot.png)

Open insmonia to see the social media api backend

![Insomnia screenshot](/assets/insomnia%20screen%20shot.png)


The following routes can be used to interact with the database.

USER ROUTES

-GET all Users
GET http://localhost:3001/api/users/

-GET User by ID
GET http://localhost:3001/api/users/:userId

-UPDATE User
PUT http://localhost:3001/api/users/:userId

-CREATE User
POST http://localhost:3001/api/users/

-DELETE User
DELETE http://localhost:3001/api/users/:userId

THOUGHT ROUTES

-GET all Thoughts
GET http://localhost:3001/api/thoughts/

-GET Thought by ID
GET http://localhost:3001/api/thoughts/:thoughtID

-UPDATE Thought
PUT http://localhost:3001/api/thoughts/:thoughtID

-CREATE Thought
POST http://localhost:3001/api/thoughts/

-DELETE Thought
DELETE http://localhost:3001/api/thoughts/:thoughtID

FRIEND ROUTES

-ADD Friend
POST http://localhost:3001/api/users/:userId/friends/:friendId

-REMOVE Friend
DELETE http://localhost:3001/api/users/:userId/friends/:friendId

REACTION ROUTES

-CREATE Reaction
POST http://localhost:3001/api/thoughts/:thoughtId/reactions/

-DELETE Reaction
DELETE http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId


## Credits

MonoDB
Express.js
Node.js

Office hours help from Karina Guerrero Fernandez and Robert Johnson.

## License

MIT LICENSE
---