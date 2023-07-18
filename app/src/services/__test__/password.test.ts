import { Password } from '../password';

describe('Password', () => {
  describe('toHash', () => {
    it('should hash the password correctly', async () => {
      const password = 'password123';
      const hashedPassword = await Password.toHash(password);

      // Check if the hashed password is in the correct format
      expect(hashedPassword).toMatch(/^[a-f0-9]+\.[a-f0-9]+$/);
    });
  });

  describe('compare', () => {
    it('should return true for a matching password', async () => {
      const password = 'password123';
      const hashedPassword = await Password.toHash(password);

      // Compare the hashed password with the original password
      const isMatch = await Password.compare(hashedPassword, password);

      expect(isMatch).toBe(true);
    });

    it('should return false for a non-matching password', async () => {
      const password = 'password123';
      const wrongPassword = 'wrongpassword';
      const hashedPassword = await Password.toHash(password);

      // Compare the hashed password with a different password
      const isMatch = await Password.compare(hashedPassword, wrongPassword);

      expect(isMatch).toBe(false);
    });
  });
});
