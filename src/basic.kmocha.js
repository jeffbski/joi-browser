import "core-js"; // polyfill
import expect from 'expect';
import Joi from '../'; // joi-browser

describe('Joi', () => {

  describe('basic schema', () => {
    let schema;

    beforeEach(() => {
      schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        access_token: [Joi.string(), Joi.number()],
        birthyear: Joi.number().integer().min(1900).max(2013),
        email: Joi.string().email()
      }).with('username', 'birthyear').without('password', 'access_token');
    });

    it('should validate a valid object', () => {
      const obj = {
        username: 'abc',
        birthyear: 1994
      };
      const result = Joi.validate(obj, schema)
      expect(result.error).toNotExist();
      expect(result.value.username).toBe('abc');
      expect(result.value.birthyear).toBe(1994);
    });

    it('should error with missing username', () => {
      const obj = {
        // missing username
        birthyear: 1994
      };
      const result = Joi.validate(obj, schema)
      // check that error message
      expect(result.error.toString()).toMatch('username');
    });

  });

});
