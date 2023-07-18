import { NotAuthorizedError } from '../not-authorized-error';

describe('NotAuthorizedError', () => {
  describe('constructor', () => {
    it('should set the error message', () => {
      const errorMessage = 'Not authorized error message';
      const error = new NotAuthorizedError(errorMessage);

      expect(error.message).toBe(errorMessage);
    });

    it('should set the default status code to 401', () => {
      const error = new NotAuthorizedError('Not authorized error message');

      expect(error.statusCode).toBe(401);
    });
  });

  describe('serializeErrors', () => {
    it('should return an array with the error message', () => {
      const errorMessage = 'Not authorized error message';
      const error = new NotAuthorizedError(errorMessage);

      const serializedErrors = error.serializeErrors();

      expect(serializedErrors).toHaveLength(1);
      expect(serializedErrors[0].message).toBe('Not Authorized');
      expect(serializedErrors[0].field).toBeUndefined();
    });
  });
});
