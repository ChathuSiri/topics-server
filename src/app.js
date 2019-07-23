"use strict";
const Topic= require( "./model/topic");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let topicMap = {};

io.on("connection", (socket) => {

    socket.on("newTopic", (topicId) => {
        console.log("new topic ",topicId);
        let topic = new Topic(topicId,0);
        topicMap[topicId]= topic;
        io.emit("topics", JSON.stringify(topicMap));
    });

    socket.on("getTopic", (topicId) => {
        console.log("get topics ");
        socket.emit("topics", JSON.stringify(topicMap));
    });

    socket.on("upvote", (topicId) => {
        console.log("upvote topic ",topicId);
        if(topicMap[topicId]) {
            topicMap[topicId].upVote();
        }

        io.emit("topics", JSON.stringify(topicMap));
    });

    socket.on("downvote", (topicId) => {
        console.log("downvote topic ",topicId)
        if(topicMap[topicId]) {
            topicMap[topicId].downVote();
        }
        io.emit("topics", JSON.stringify(topicMap));
    });

    socket.emit("topics", JSON.stringify(topicMap));
    console.log(`Socket ${socket.id} has connected`);
});
http.listen(process.env.PORT || 4444, () => {
    console.log("Listening on port 4444");
});
