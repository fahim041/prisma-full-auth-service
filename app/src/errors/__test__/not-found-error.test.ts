import { NotFoundError } from '../not-found-error';

describe('NotFoundError', () => {
  describe('constructor', () => {
    it('should set the error message', () => {
      const error = new NotFoundError();

      expect(error.message).toBe('Route not found');
    });

    it('should set the default status code to 404', () => {
      const error = new NotFoundError();

      expect(error.statusCode).toBe(404);
    });
  });

  describe('serializeErrors', () => {
    it('should return an array with the "Not Found" message', () => {
      const error = new NotFoundError();

      const serializedErrors = error.serializeErrors();

      expect(serializedErrors).toHaveLength(1);
      expect(serializedErrors[0].message).toBe('Not Found');
      expect(serializedErrors[0].field).toBeUndefined();
    });
  });
});
