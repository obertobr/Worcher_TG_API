// src/common/filters/validation-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import ValidationExcpection from './validation.exception';


@Catch(ValidationExcpection)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationExcpection, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      success: false,
      message: exception.message,
      errors: exception.validationErrors,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
