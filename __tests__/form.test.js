/**  * @jest-environment jsdom  */
const { fireEvent, screen, waitFor } = require('@testing-library/dom')
const fs = require('fs')

test('value method', () => {

    const html = fs.readFileSync('./index.html', 'utf8')
    const startPos = html.indexOf("<body>") + "<body>".length
    const endPos = html.indexOf("</body>") + "</body>".length
    const bodyContent = html.substring(startPos,endPos).trim();
    document.body.innerHTML = bodyContent

    const myForm = require('../form') // instantiate form after virtual dom created
  
    /*screen.getByTestId("firstname-input").value="true"
    expect(screen.getByTestId("firstname-input").value).toBeTruthy()*/
    /*myForm.testName("#firstname")
    myForm.liveValidate("firstname")*/
    screen.getByTestId("firstname-input").value="***"
    console.log(screen.getByTestId("firstname-error").style.display)

    fireEvent.click(screen.getByTestId("firstname-input"))
    console.log(screen.getByTestId("firstname-error").style.display)
    screen.getByTestId("firstname-input").value="***"
    expect(screen.getByTestId("firstname-error").style.display).not.toEqual("none")
})