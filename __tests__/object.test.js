const Value = require('../object')

test('value method', () => {
    expect(new Value().test()).toBe(2);
  });