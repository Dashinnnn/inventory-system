import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, 
    standardHeaders: true, 
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Too many requests, please try again later."
    }
});

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, 
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Too many login attempts. Please try again after 15 minutes."
    }
});