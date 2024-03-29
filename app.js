
const fs = require('mz/fs');

const ws = require('ws');

const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

// 导入WebSocket模块:
const WebSocketServer = ws.Server;

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());

let server =app.listen(3000);

const wss = new WebSocketServer({
    server: server
});

wss.on('connection', function (ws) {
    // console.log(`[SERVER] connection()`);
    // var data=fs.readFile('./static/Broadway/Player/mozilla_story.mp4');
    // console.log(data)
    // ws.send(data,{binary: true, mask: false}, (err) => {
    //     if (err) {
    //         console.log(`[SERVER] error: ${err}`);
    //     }
    // });
});

console.log('app started at port 3000...');

