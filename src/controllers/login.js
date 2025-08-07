import {
    validateCredentials,
    findCredentials,
}                    from "../helpers/credentials.js";
import { getUser }   from "../helpers/user_service.js";
import { signToken } from "../helpers/tokens.js";
import {
    NotAuthorizedError,
    codes,
}                    from "../errors/index.js";

const {
    NOT_AUTHORIZED,
} = codes;

export default async function handler(req) {
    const {
        email,
        password,
    } = req.body;

    const credentials = await findCredentials(req, email);
    if (!credentials) {
        throw new NotAuthorizedError(NOT_AUTHORIZED);
    }

    await validateCredentials(req, credentials, password);

    const user = await getUser(req, credentials.userId);
    const token = await signToken(req, user);

    return {token};
}