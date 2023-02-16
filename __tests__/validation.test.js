/**  * @jest-environment jsdom  */
/*const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder*/

const validationHelper = require('../validation')
const { fireEvent, screen, waitFor } = require('@testing-library/dom')
const fs = require('fs')

test('test checkName', () => {
    expect(validationHelper.checkName("aaa")).toBeTruthy()
  })

test('test checkDate', () => {
  expect(validationHelper.checkDate("2000-11-11")).toBeTruthy()
})

test('test checkNumber', () => {
  expect(validationHelper.checkNumber("50")).toBeTruthy()
})

const myForm = require('../form')

test('value method', () => {

  const html = fs.readFileSync('./index.html', 'utf8')
  const startPos = html.indexOf("<body>") + "<body>".length
  const endPos = html.indexOf("</body>") + "</body>".length
  const bodyContent = html.substring(startPos,endPos).trim();
  document.body.innerHTML = bodyContent

  screen.getByTestId("firstname-input").value="true"
  expect(screen.getByTestId("firstname-input").value).toBeTruthy()
})