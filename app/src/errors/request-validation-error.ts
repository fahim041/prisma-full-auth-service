import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request error');
  }

  serializeErrors(): { message: string; field: string }[] {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.type === 'field' ? error.path : '',
      };
    });
  }
}
