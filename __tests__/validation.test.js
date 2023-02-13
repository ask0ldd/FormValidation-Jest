/**  * @jest-environment jsdom  */
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const validationHelper = require('../validation')
const myForm = require('../form')
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

test('value method', () => {
  document.querySelector("#lastname").value="aaaaa"
  expect(validationHelper.checkName(document.querySelector("#lastname").value)).toBeTruthy()
})