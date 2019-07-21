const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
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

    socket.on("getTopic", (docId) => {
        console.log("get topic 4444");
        safeJoin(docId);
        socket.emit("topics", "gsdgdsg");
    });

    socket.emit("topics", "ggggggggggg");
    console.log(`Socket ${socket.id} has connected`);
});
http.listen(4444, () => {
    console.log("Listening on port 4444");
});
