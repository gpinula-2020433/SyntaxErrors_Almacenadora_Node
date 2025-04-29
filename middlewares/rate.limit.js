//Middleware de limitación de solicitudes
import rateLimit from "express-rate-limit";

export const limiter = rateLimit(
    {
        windowMs: 15 *60 * 1000, //15 min
        max: 100,
        message: {
            message: 'Your bloqued, wait 15 minutes'
        }
    }
)