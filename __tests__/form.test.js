/**  * @jest-environment jsdom  */
const { fireEvent, screen, waitFor } = require('@testing-library/dom')
const jestdom = require('@testing-library/jest-dom')
const fs = require('fs')

            
const setValidForm = () => {
    screen.getByTestId("firstname-input").value="edmond"
    screen.getByTestId("lastname-input").value="rostand"
    screen.getByTestId("birthdate-input").value="2004-07-22"
    screen.getByTestId("email-input").value="rostand@rostand.com"
    screen.getByTestId("gamesowned-input").value="2"
    screen.getByTestId("radiostudio1-input").checked = true
    screen.getByTestId("tos-checkbox").checked = true
}

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
            
            setValidForm()

            expect(myForm.validate()).toBeTruthy()
        })

        test('if any input is wrongly populated, the form can pass the global validation', () => {

            const myForm = require('../form')

            const inputs = {"firstname-input" : "***", "lastname-input" : "***", "birthdate-input" : "", "email-input" : "***", "gamesowned-input" : ""} // add radiobutton
            
            for(const [key, value] of Object.entries(inputs)){
                setValidForm()
                expect(myForm.validate()).toBeTruthy()
                screen.getByTestId(key).value = value
                expect(myForm.validate()).toBeFalsy()
            }
            setValidForm()
            expect(myForm.validate()).toBeTruthy()
            screen.getByTestId("tos-checkbox").checked = false
            expect(myForm.validate()).toBeFalsy()
            setValidForm()
            expect(myForm.validate()).toBeTruthy()
            screen.getByTestId("radiostudio1-input").checked = false
            expect(myForm.validate()).toBeFalsy()
            
        })

    })

})


/** test variable replacement & function replacement **/

test('function should return 5', ()=> {

    const html = fs.readFileSync('./index.html', 'utf8')
    const startPos = html.indexOf("<body>") + "<body>".length
    const endPos = html.indexOf("</body>") + "</body>".length
    const bodyContent = html.substring(startPos,endPos).trim()
    document.body.innerHTML = bodyContent

    const myForm = require('../form')

    expect(myForm.getFive()).toEqual(5)
})

test('myForm.five should be 5', ()=> {

    const html = fs.readFileSync('./index.html', 'utf8')
    const startPos = html.indexOf("<body>") + "<body>".length
    const endPos = html.indexOf("</body>") + "</body>".length
    const bodyContent = html.substring(startPos,endPos).trim()
    document.body.innerHTML = bodyContent

    const myForm = require('../form')



    expect(myForm.five).toEqual(5)
})

/** 
 * Hijack Value of an object property 
 * **/

test('mocked myForm.five should be 6', ()=> {

    const html = fs.readFileSync('./index.html', 'utf8')
    const startPos = html.indexOf("<body>") + "<body>".length
    const endPos = html.indexOf("</body>") + "</body>".length
    const bodyContent = html.substring(startPos,endPos).trim()
    document.body.innerHTML = bodyContent

    const myForm = require('../form')

    jest.replaceProperty(myForm, 'five', 6)

    expect(myForm.five).toEqual(6)
})

/** 
 * Hijack Method of an object
 * **/

test('mocked myForm.getFive() should be 6', ()=> {

    const html = fs.readFileSync('./index.html', 'utf8')
    const startPos = html.indexOf("<body>") + "<body>".length
    const endPos = html.indexOf("</body>") + "</body>".length
    const bodyContent = html.substring(startPos,endPos).trim()
    document.body.innerHTML = bodyContent

    const myForm = require('../form')

    jest.spyOn(myForm, 'getFive').mockReturnValue(6)

    expect(myForm.getFive()).toEqual(6)
    expect(myForm.test).toEqual(3)
})

test('mocked myForm.getSix() should be 6', ()=> {

    const html = fs.readFileSync('./index.html', 'utf8')
    const startPos = html.indexOf("<body>") + "<body>".length
    const endPos = html.indexOf("</body>") + "</body>".length
    const bodyContent = html.substring(startPos,endPos).trim()
    document.body.innerHTML = bodyContent

    const myForm = require('../form')

    myForm.getFive = jest.fn().mockReturnValue(6)

    expect(myForm.getFive()).toEqual(6)
    expect(myForm.test).not.toEqual(13)
})
