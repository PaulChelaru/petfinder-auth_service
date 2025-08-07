import { createCredentials }              from "../helpers/credentials.js";
import { createUser }                     from "../helpers/user_service.js";
import { signToken }                      from "../helpers/tokens.js";

export default async function handler(req) {
    const user = await createUser(req, req.body);

    // Create credentials using the user's UUID and password from request
    // Don't modify the user object - pass password separately
    const credentialsData = {
        userId: user.userId,
        email: user.email,
        password: req.body.password,
    };
    await createCredentials(req, credentialsData);

    const token = await signToken(req, user);

    return {token};
}