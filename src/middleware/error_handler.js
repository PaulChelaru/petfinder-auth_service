import util from "util";

import {
    codes,
    CustomError,
    ApplicationError,
    InvalidPayloadError,
} from "../errors/index.js";

const {UNEXPECTED_ERROR} = codes;

/**
 * Fastify error handler. Any error occurred during handler execution is handled here.
 * If the error is not a CustomError, it is converted to one. Also, the error is sent to
 * the client at this stage (status code and body). A new property is added to the reply
 * object, `error`, which holds the error sent to the client.
 * @param {Error|CustomError} error
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
async function errorHandler (error, request, reply) {
    let client_error = error;
    if (error.validation) {
        client_error = new InvalidPayloadError(error.validation);
    } else if (!(error instanceof CustomError)) {
        client_error = new ApplicationError("Something unexpected occurred", UNEXPECTED_ERROR, error);
    }

    reply.code(client_error.status_code);

    const json_error = {
        status: "error",
        error_id: request.id,
        code: client_error.error_code,
        message: client_error.message,
    };

    reply.error = json_error;
    reply.send(json_error);

    const logMessage = `Error while handling path ${request.raw.url}`;
    request.log.error(util.inspect(error), logMessage);
}

export default errorHandler;
