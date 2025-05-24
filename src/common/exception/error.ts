// src/common/utils/error.util.ts
import { HttpException, HttpStatus } from '@nestjs/common';

interface ThrowErrorOptions {
    message: string | object;
    status?: HttpStatus;
    stack?: string; // optional custom error code
    path?: string;
}

export function throwError(options: ThrowErrorOptions): never {
    const {
        message,
        status = HttpStatus.INTERNAL_SERVER_ERROR,
        stack,
        path,
    } = options;

    // Shape of the response body
    const response = {
        success: false,
        message,
        path,
        ...(stack && { stack }),
    };

    throw new HttpException(response, status);
}
