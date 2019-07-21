"use strict";
const Topic= require( "./model/topic");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);


io.on("connection", (socket) => {
    let topicMap = {};
    let previousId;
    const safeJoin = (currentId) => {
        socket.leave(previousId);
        socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
        previousId = currentId;
    };

    //
    // io.on('disconnect', socket => {
    //     console.log(`Socket ${socket.id} has disconnected`);
    // });

    socket.on("newTopic", (topicId) => {
        console.log("get topic 4444");
        safeJoin(topicId);
        let topic = new Topic(topicId,0);
        topicMap[JSON.stringify(topicMap)]= topic;
        console.log(topic);
        console.log(topicMap);
        socket.emit("topics", JSON.stringify(topicMap));
        let str = JSON.stringify(topicMap);
        console.log(str);
        socket.emit("topics", str );
        io.emit("topics", JSON.stringify(topicMap));
    });

    socket.on("getTopic", (topicId) => {
        console.log("get topic 4444");
        safeJoin(topicId);
        socket.emit("topics", JSON.stringify(topicMap));
    });

    socket.emit("topics", JSON.stringify(topicMap));
    console.log(`Socket ${socket.id} has connected`);
    let topic = new Topic('daa',0);
});
http.listen(4444, () => {
    console.log("Listening on port 4444");
});
