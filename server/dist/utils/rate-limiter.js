"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRateLimiter = void 0;
function createRateLimiter(amount, seconds) {
    let requests = {};
    setInterval(() => {
        requests = {};
    }, seconds * 1000);
    return (req, res, next) => {
        const ip = String(req.headers.proxy_ip || req.connection.remoteAddress).replace('::ffff:', '');
        console.log(4, `${req.method}-request from ip "${ip}" to ${req.originalUrl}`);
        if (!requests[ip]) {
            requests[ip] = 0;
        }
        requests[ip] += 1;
        if (requests[ip] >= amount) {
            if (requests[ip] % amount === 0) {
                console.log(`IP ${ip} exceeded rate limit. ${requests[ip]} requests in ${seconds} seconds.`);
            }
            res.status(429).json({ valid: false, message: 'Too many requests.' });
        }
        else {
            next();
        }
    };
}
exports.createRateLimiter = createRateLimiter;
