import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string) {
    super(message);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: 'Not Authorized' }];
  }
}
