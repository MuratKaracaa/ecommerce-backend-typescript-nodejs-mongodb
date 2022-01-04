import rateLimit from 'express-rate-limit'

export default rateLimit({
    windowMs: 1000 * 60 * 1,
    max: 45,
    legacyHeaders: false,
    standardHeaders: false,
    statusCode: 429,
    message: 'Too many request from this IP!!',
})
