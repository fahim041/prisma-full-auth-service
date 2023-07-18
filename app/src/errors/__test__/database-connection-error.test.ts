import { DatabaseConnectionError } from '../database-connection-error';

describe('DatabaseConnectionError', () => {
  describe('constructor', () => {
    it('should set the error message', () => {
      const error = new DatabaseConnectionError();

      expect(error.message).toBe('Database connection error');
    });

    it('should set the default status code to 500', () => {
      const error = new DatabaseConnectionError();

      expect(error.statusCode).toBe(500);
    });
  });

  describe('serializeErrors', () => {
    it('should return an array with the error reason', () => {
      const error = new DatabaseConnectionError();

      const serializedErrors = error.serializeErrors();

      expect(serializedErrors).toHaveLength(1);
      expect(serializedErrors[0].message).toBe('Error connecting to database');
      expect(serializedErrors[0].field).toBeUndefined();
    });
  });
});
