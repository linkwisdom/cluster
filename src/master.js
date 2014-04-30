var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;


if (cluster.isMaster) {

    cluster.setupMaster({
        exec: 'worker.js',
        args: ['--use'],
        silent: true
    });

    // Fork workers
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork({
            port: 8080,
            host: 'localhost'
        });

        // 不同workder 执行不同任务； 通过消息机制传递数据
        worker.on('message', function (data) {
            console.log('worker[%s] said that: [%s]', this.process.pid, data);
        }.bind(worker));
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker[%s] died for [%s]', worker.process.pid, code);
        // 退出后加入新的worker
        // var woker = cluster.fork();
    });
}