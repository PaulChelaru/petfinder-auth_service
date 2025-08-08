import FastifyPlugin from "fastify-plugin";
import FastifyEnv    from "@fastify/env";

const schema = {
    type: "object",
    required: [
        "PORT", "MONGO_URI", "JWT_SECRET",
        "USER_SERVICE_URL", "USER_SERVICE_API_KEY", "KAFKA_BROKERS",
        "KAFKA_USERNAME", "KAFKA_PASSWORD", "PASSWORD_HASH_SALT",
    ],
    properties: {
        PORT: { type: "string", default: "3100" },
        MONGO_URI: { type: "string" },
        JWT_SECRET: { type: "string" },
        USER_SERVICE_URL: { type: "string" },
        USER_SERVICE_API_KEY: { type: "string" },
        KAFKA_BROKERS: { type: "string" },
        KAFKA_USERNAME: { type: "string" },
        KAFKA_PASSWORD: { type: "string" },
        PASSWORD_HASH_SALT: { type: "string"},
    },
};

async function initConfig(fastify) {
    const options = {
        schema,
        dotenv: true,
        data: process.env,
    };
    await fastify.register(FastifyEnv, options);

    // Add a config decorator that points to env for backward compatibility
    if (!fastify.hasDecorator("config")) {
        fastify.decorate("config", fastify.env);
    }
}

export default FastifyPlugin(initConfig);