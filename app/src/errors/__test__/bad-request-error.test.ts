import { BadRequestError } from '../bad-request-error';

describe('BadRequestError', () => {
  describe('constructor', () => {
    it('should set the error message', () => {
      const errorMessage = 'Bad request error message';
      const error = new BadRequestError(errorMessage);

      expect(error.message).toBe(errorMessage);
    });

    it('should set the default status code to 400', () => {
      const error = new BadRequestError('Bad request error message');

      expect(error.statusCode).toBe(400);
    });
  });

  describe('serializeErrors', () => {
    it('should return an array with the error message', () => {
      const errorMessage = 'Bad request error message';
      const error = new BadRequestError(errorMessage);

      const serializedErrors = error.serializeErrors();

      expect(serializedErrors).toHaveLength(1);
      expect(serializedErrors[0].message).toBe(errorMessage);
      expect(serializedErrors[0].field).toBeUndefined();
    });
  });
});
