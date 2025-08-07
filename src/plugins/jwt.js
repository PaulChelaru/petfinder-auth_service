import FastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

async function initJwt(fastify) {
    await fastify.register(fastifyJwt, {
        secret: fastify.config.JWT_SECRET,
        sign: {
            expiresIn: "24h", // Token expires in 24 hours
        },
    });
}

export default FastifyPlugin(initJwt);
