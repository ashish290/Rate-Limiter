"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const uuid_1 = require("uuid");
const RATE_LIMIT = parseInt(process.env.RATE_LIMIT || "5", 10);
const RATE_WINDOW_SEC = parseInt(process.env.RATE_WINDOW_SEC || "60", 10);
const userRequests = new Map();
const rateLimiter = (req, res, next) => {
    try {
        let userId = req.headers["x-user-id"];
        if (!userId) {
            userId = (0, uuid_1.v4)();
            res.setHeader("X-User-Id", userId);
        }
        const currentTime = Date.now();
        const userData = userRequests.get(userId);
        if (!userData || currentTime > userData.resetTime) {
            userRequests.set(userId, {
                count: 1,
                resetTime: currentTime + RATE_WINDOW_SEC * 1000,
            });
            setHeaders(res, RATE_LIMIT, RATE_LIMIT - 1, RATE_WINDOW_SEC);
            return next();
        }
        if (userData.count < RATE_LIMIT) {
            userData.count += 1;
            userRequests.set(userId, userData);
            const remaining = RATE_LIMIT - userData.count;
            const resetIn = Math.ceil((userData.resetTime - currentTime) / 1000);
            setHeaders(res, RATE_LIMIT, remaining, resetIn);
            return next();
        }
        const retryAfter = Math.ceil((userData.resetTime - currentTime) / 1000);
        setHeaders(res, RATE_LIMIT, 0, retryAfter);
        return res.status(429).json({
            error: "rate_limited",
            message: "Too many requests, please try again later.",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};
exports.rateLimiter = rateLimiter;
const setHeaders = (res, limit, remaining, reset) => {
    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);
};
