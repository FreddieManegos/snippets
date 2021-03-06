process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
    //  Cause Index.js to be executed *again* but slave/child mode
    cluster.fork();
    // cluster.fork();
    // cluster.fork();

}
else {

    // Im a child , I'm going to act like a server and do nothing else
    const express = require('express');
    const crypto = require('crypto');
    const app = express();

    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) { }
    }

    app.get('/', (req, res) => {
        doWork(5000);
        res.send('Hi There');
    });

    app.get('/fast', (req,res) => {
        res.send('This was fast!');
    });

    app.listen(3000);
}