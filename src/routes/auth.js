import registerController from "../controllers/register.js";
import loginController from "../controllers/login.js";

export default async function auth(fastify) {
    fastify.post("/register", registerController);
    fastify.post("/login",    loginController);
}