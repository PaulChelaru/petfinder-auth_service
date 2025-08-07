import { ExternalApiError } from "../errors/index.js";

/**
 * Creates a new user by making a POST request to the user service.
 *
 * @async
 * @param {Object} fastify - The request object
 * @param {Object} data - The user data to create
 * @returns {Promise<Object>} The created user data from the user service
 * @throws {ExternalApiError} When the user service request fails
 */
async function createUser(fastify, data) {
    try {
        const response = await fastify.server.user_service.post("/users", data);
        return response.data;
    } catch (error) {
        throw new ExternalApiError("Error on creating user in user service", error);
    }
}

/**
 * Retrieves a user by their ID from the user service.
 *
 * @async
 * @param {Object} fastify - The request object
 * @param {string|number} id - The ID of the user to retrieve
 * @returns {Promise<Object>} The user data from the user service
 * @throws {ExternalApiError} When the user service request fails
 */
async function getUser(fastify, id) {
    try {
        const response = await fastify.server.user_service.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new ExternalApiError("Error on getting user from user service", error.response.data);
    }
}

/**
 * Retrieves a user by their email address from the user service.
 *
 * @async
 * @param {Object} fastify - The request object
 * @param {string} email - The email address of the user to retrieve
 * @returns {Promise<Object>} The user data from the user service
 * @throws {ExternalApiError} When the user service request fails
 */
async function getUserByEmail(fastify, email) {
    try {
        const response = await fastify.server.user_service.get(`/users?email=${encodeURIComponent(email)}`);
        return response.data;
    } catch (error) {
        throw new ExternalApiError(error);
    }
}

/**
 * Updates a user's information by making a PUT request to the user service
 *
 * @async
 * @param {Object} fastify - The request object
 * @param {string|number} id - The ID of the user to update
 * @param {Object} data - The user data to update
 * @returns {Promise<Object>} The updated user data from the response
 * @throws {ExternalApiError} If the user service request fails
 */
async function updateUser(fastify, id, data) {
    try {
        const response = await fastify.server.user_service.put(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        throw new ExternalApiError(error);
    }
}

export {
    createUser,
    getUser,
    getUserByEmail,
    updateUser,
};