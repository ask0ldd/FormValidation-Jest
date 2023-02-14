/**  * @jest-environment jsdom  */
const { fireEvent, screen, waitFor } = require('@testing-library/dom')
const jestdom = require('@testing-library/jest-dom')
const fs = require('fs')

describe('given that i am on the index page', () => {
        
    describe('and the form is loaded', () => {
        
        const html = fs.readFileSync('./index.html', 'utf8')
        const startPos = html.indexOf("<body>") + "<body>".length
        const endPos = html.indexOf("</body>") + "</body>".length
        const bodyContent = html.substring(startPos,endPos).trim();
        document.body.innerHTML = bodyContent

        test('if a wrong value is entered in a field, an error message should appear after selective validation', () => { // test for each field one by one instead asap

            const myForm = require('../form') // instantiate the form class after virtual dom created
        
            /*myForm.testName("#firstname")
            myForm.liveValidate("firstname")*/
            
            screen.getByTestId("firstname-input").value="***"
            fireEvent.click(screen.getByTestId("firstname-input"))

            expect(screen.getByTestId("firstname-error").classList.contains("errorMessage")).toBeTruthy()
        })

        test('if all inputs are populated, the form can validate itself', () => {

            const myForm = require('../form')
            
            screen.getByTestId("firstname-input").value="edmond"
            screen.getByTestId("lastname-input").value="rostand"
            screen.getByTestId("birthdate-input").value="2004-07-22"
            screen.getByTestId("email-input").value="rostand"
            screen.getByTestId("gamesowned-input").value="2"
            screen.getByTestId("radiostudio1-input").checked = true

            expect(myForm.validate()).toBeTruthy()
        })

        test('if one input is wrongly populated, the form cant validate itself', () => { // test for each field, one after an other

            const myForm = require('../form')
            
            screen.getByTestId("firstname-input").value="***"
            screen.getByTestId("lastname-input").value="rostand"
            screen.getByTestId("birthdate-input").value="2004-07-22"
            screen.getByTestId("email-input").value="rostand"
            screen.getByTestId("gamesowned-input").value="2"
            screen.getByTestId("radiostudio1-input").checked = true
            
            expect(myForm.validate()).toBeFalsy()
        })

    })

})