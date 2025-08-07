import { ServerError } from "../errors/index.js";

/**
 * Signs a JWT token for the given user.
 *
 * @param {Object} fastify - The Fastify instance with JWT plugin
 * @param {Object} user - The user object for which to generate a token
 * @returns {string} The signed JWT token
 * @throws {ServerError} If there's an error during token signing
 */
function signToken(fastify, user) {
    try {
        const payload = {
            uid: user.userId,
            rol: user.role,
            crt: Date.now(),
        };
        const token = fastify.server.jwt.sign(payload);
        return token;
    } catch (error) {
        throw new ServerError(error);
    }
}

export {
    signToken,
};
