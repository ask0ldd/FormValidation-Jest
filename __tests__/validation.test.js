const validationHelper = require('../validation')

test('value method', () => {
    expect(validationHelper.checkName("aaa")).toBeTruthy()
  });

  test('value method', () => {
    expect(validationHelper.checkDate("2000-11-11")).toBeTruthy()
  });