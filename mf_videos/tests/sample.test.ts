  import { sum } from '../src/index'

  describe('add function', () => {
    it('should add two numbers', () => {
      expect(sum(1, 2)).toBe(3);
      console.log('Test 1')
    });
  
    it('should add two negative numbers', () => {
      expect(sum(-1, -2)).toBe(-3);
    });
  
    it('should add a negative and a positive number', () => {
      expect(sum(-1, 2)).toBe(1);
    });
  
    it('should add two zeros', () => {
      expect(sum(0, 0)).toBe(0);
    });
  })