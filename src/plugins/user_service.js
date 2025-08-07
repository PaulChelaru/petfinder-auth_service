import FastifyPlugin from "fastify-plugin";
import axios         from "axios";


async function initAxiosInstance (fastify) {
    const baseUrl = fastify.config.USER_SERVICE_URL;
    const apiKey = fastify.config.USER_SERVICE_API_KEY;

    const userClient = axios.create({
        baseURL: `${baseUrl}/v1`,
        timeout: 30000, // Increased timeout to 30 seconds to handle Kafka processing
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
        },
    });

    // Add response error interceptor
    userClient.interceptors.response.use(
        response => response,
        error => {
            const new_error = new Error(error.message);
            if (error.response) {
                new_error.code = error.response.status;
            }
            throw new_error;
        },
    );
    return userClient;
}

async function initUserService(fastify) {
    const userClient = await initAxiosInstance(fastify);

    fastify.decorate("user_service", userClient);

    fastify.log.info("User service client initialized successfully");
}

export default FastifyPlugin(initUserService);