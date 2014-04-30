function postMessage () {
    process.send('port' + process.env.port);
}

setTimeout(function () {
    process.nextTick(postMessage.bind(this));
}, Math.random() * 10000);

setTimeout(function () {
    process.exit(0);
}, Math.random() * 60000);