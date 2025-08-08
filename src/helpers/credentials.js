import bcrypt from "bcrypt";

import Credential      from "../models/Credential.js";
import {
    ServerError,
    NotAuthorizedError,
    codes,
}                       from "../errors/index.js";

const {
    INVALID_CREDENTIALS,
} = codes;

/**
 * Creates user credentials in the database by hashing the password and storing it with the user's email
 *
 * @async
 * @param {Object} fastify - The Fastify instance for logging
 * @param {Object} credentialsData - Object containing userId, email, and password
 * @throws {ServerError} Throws a ServerError if credential creation fails
 * @returns {Promise<void>} A promise that resolves when credentials are successfully created
 */
async function createCredentials(fastify, credentialsData) {
    try {
        const saltRounds = parseInt(fastify.config.BCRYPT_SALT_ROUNDS) || 10;
        const passwordHash = await bcrypt.hash(credentialsData.password, saltRounds);
        const payload = {
            userId: credentialsData.userId,
            email: credentialsData.email,
            password: passwordHash,
        };
        await Credential.create(payload);
    } catch (error) {
        throw new ServerError(error);
    }
}

/** * Finds user credentials by email
 * @async
 * @param {Object} fastify - The Fastify instance for logging
 * @param {string} email - The user's email address
 * @throws {NotAuthorizedError} Throws a NotAuthorizedError if credentials are not found
 * @returns {Promise<Object>} A promise that resolves to the credential object
 */
async function findCredentials (fastify, email) {
    try {
        const credentials = await Credential.findOne({ email });
        return credentials;
    } catch (error) {
        throw new ServerError(error);
    }
}

/**
 * Validates user credentials by comparing the provided password with the stored hashed password
 *
 * @async
 * @param {Object} fastify - The Fastify instance for logging
 * @param {Object} credentials - The credential object containing the user's email and hashed password
 * @param {string} password - The user's password to validate
 * @throws {NotAuthorizedError} Throws a NotAuthorizedError if the password is invalid
 * @returns {Promise<Object>} A promise that resolves to the credential object if validation is successful
*/
async function validateCredentials(fastify, credentials, password) {
    try {
        const isPasswordValid = await bcrypt.compare(password, credentials.password);
        if (!isPasswordValid) {
            throw new NotAuthorizedError(INVALID_CREDENTIALS);
        }
        return credentials;
    } catch (error) {
        throw new ServerError(error);
    }
}

export {
    createCredentials,
    validateCredentials,
    findCredentials,
};
