/**  * @jest-environment jsdom  */
const { fireEvent, screen, waitFor } = require('@testing-library/dom')
const jestdom = require('@testing-library/jest-dom')
const fs = require('fs')

describe('given that i am on the index page', () => {
        
    describe('and the form is loaded', () => {
        
        const html = fs.readFileSync('./index.html', 'utf8')
        const startPos = html.indexOf("<body>") + "<body>".length
        const endPos = html.indexOf("</body>") + "</body>".length
        const bodyContent = html.substring(startPos,endPos).trim()
        document.body.innerHTML = bodyContent

        test('if a a field contains a wrong value, an error message should appear after selective validation', () => { // test for each field one by one instead > asap

            const myForm = require('../form') // instantiate the form class after virtual dom created
        
            /*myForm.testName("#firstname")
            myForm.liveValidate("firstname")*/
            
            screen.getByTestId("firstname-input").value="***"
            fireEvent.click(screen.getByTestId("firstname-input"))

            expect(screen.getByTestId("firstname-error").classList.contains("errorMessage")).toBeTruthy()
        })

        test('if all inputs are populated with the right datas, the form can pass the global validation', () => {

            const myForm = require('../form')
            
            screen.getByTestId("firstname-input").value="edmond"
            screen.getByTestId("lastname-input").value="rostand"
            screen.getByTestId("birthdate-input").value="2004-07-22"
            screen.getByTestId("email-input").value="rostand@amazon.com"
            screen.getByTestId("gamesowned-input").value="2"
            screen.getByTestId("radiostudio1-input").checked = true

            expect(myForm.validate()).toBeTruthy()
        })

        test('if any input is wrongly populated, the form can pass the global validation', () => {

            const myForm = require('../form')
            
            const setValidForm = () => {
                screen.getByTestId("firstname-input").value="edmond"
                screen.getByTestId("lastname-input").value="rostand"
                screen.getByTestId("birthdate-input").value="2004-07-22"
                screen.getByTestId("email-input").value="rostand@rostand.com"
                screen.getByTestId("gamesowned-input").value="2"
                screen.getByTestId("radiostudio1-input").checked = true
            }

            const inputs = {"firstname-input" : "***", "lastname-input" : "***", "birthdate-input" : "", "email-input" : "***", "gamesowned-input" : ""} // add radiobutton
            
            for(const [key, value] of Object.entries(inputs)){
                setValidForm()
                expect(myForm.validate()).toBeTruthy()
                screen.getByTestId(key).value = value
                expect(myForm.validate()).toBeFalsy()
            }
        })

    })

})