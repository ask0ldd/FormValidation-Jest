/**  * @jest-environment jsdom  */
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const validationHelper = require('../validation')
const {JSDOM} = require('jsdom')
const fs = require('fs')

test('value method', () => {
    expect(validationHelper.checkName("aaa")).toBeTruthy()
  })

test('value method', () => {
  expect(validationHelper.checkDate("2000-11-11")).toBeTruthy()
})

const html = fs.readFileSync('./index.html')
const dom = new JSDOM(html)
const document = dom.window.document

global.document = dom.window.document;
global.window = dom.window;

const myForm = require('../form')

test('value method', () => {
  document.querySelector("#lastname").value="true"
  // console.log(document.querySelector("#lastname").value)
  expect(myForm.testName("#lastname", document)).toBeTruthy()
})