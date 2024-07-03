import { app } from '../src/index'
import request from 'supertest'

describe('Sample test', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });
    }
);


describe('GET /videos', () => {
    it('should respond with the correct template', async () => {
      const response = await request(app).get('/videos');
      expect(response.statusCode).toBe(200);
      // Assuming templateBuilder returns a string that includes '?mode=videos'
      // Adjust the expectation based on the actual output of templateBuilder
      expect(response.text).toContain('?mode=videos');
    });
  });