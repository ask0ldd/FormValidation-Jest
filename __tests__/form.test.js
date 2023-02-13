/**  * @jest-environment jsdom  */
const { fireEvent, screen, waitFor } = require('@testing-library/dom')
const jestdom = require('@testing-library/jest-dom')
const fs = require('fs')

test('value method', () => {

    const html = fs.readFileSync('./index.html', 'utf8')
    const startPos = html.indexOf("<body>") + "<body>".length
    const endPos = html.indexOf("</body>") + "</body>".length
    const bodyContent = html.substring(startPos,endPos).trim();
    document.body.innerHTML = bodyContent

    const myForm = require('../form') // instantiate form after virtual dom created
  
    /*myForm.testName("#firstname")
    myForm.liveValidate("firstname")*/
    
    screen.getByTestId("firstname-input").value="***"
    fireEvent.click(screen.getByTestId("firstname-input"))

    expect(screen.getByTestId("firstname-error").classList.contains("errorMessage")).toBeTruthy()
})