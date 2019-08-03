// index:
const mime = require('mime');
const fs = require('mz/fs');

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome'
        });
    },
    'GET /avc.wasm': async (ctx, next) => {
        ctx.response.type = mime.getType(ctx.request.path);
        ctx.response.body = await fs.readFile('./static/js/avc.wasm');
    }
};
