// How to run this test:
// npm run <test_file_name> to run the test

const path = require('path');
const { ServiceBuilder } = require('selenium-webdriver/chrome');
const { Builder, By } = require('selenium-webdriver');
const { sleep } = require('../../utils/sleep');
const { TheFinger } = require("./the_finger.v3.solution.js");

describe("6s. The Dodgeball (Workaround Solution)", function(){

    // increase mocha timeout to 3 minutes, as browser tests can be slow
    this.timeout(3 * 60000); 

    let driver;

    beforeEach(async function () {

        // Start webdriver, using chromedriver
        const chromeDriverPath = path.resolve(__dirname,"..", "..","drivers","chromedriver")
        const serviceBuilder = new ServiceBuilder(chromeDriverPath);
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeService(serviceBuilder)
            .build();

        // Resize window to standard laptop size
        await driver.manage().window().setRect({
            width: 1280,
            height: 800
        })

    });

    it("button#nav-login-btn is clicked", async function(){

        try {

             // Open the test page
            await driver.get('http://localhost:8000/the_dodgeball.html');
            await sleep(1500) // slow time to observe

            // Step 1: Click the "Login" button
            let BUTTON_TO_CLICK = By.id("nav-login-btn")
            
            /************************************************/
		
            // TODO: initialise The Finger (it's already imported)
            let finger = new TheFinger(driver)

            // TODO: click using The Finger
            await finger.click(BUTTON_TO_CLICK)

            /************************************************/

            await sleep(1500) // slow time to observe

            // Validate that the button is clicked
            let EXPECTED_LOG = "\"button#nav-login-btn\" clicked."
            let LOG_SEEN = await checkLogMessage(driver, EXPECTED_LOG)
            if(!LOG_SEEN){
                throw new Error("The button did not receive a click.")
            }

        } catch(e) {
            // maybe log the error?
            throw e
        }

    })

    afterEach(async function () {
        if(driver){
            await driver.quit()
        }
    });

})

/**
 * A helper function to check if a specific log message is printed to the logs
 * @param {*} driver 
 * @param {*} expectedLog 
 * @returns 
 */
async function checkLogMessage(driver, expectedLog){
    return await driver.executeScript(function(expectedLog){ 
        expectedLog = expectedLog.toLowerCase().trim()
        let lines = document.getElementsByClassName("log-line")
        for(let i = 0; i < lines.length ; i++){
            let line = lines[i]
            if(line.innerText.toLowerCase().trim().includes(expectedLog)){
                return true;
            }
        }
        return false;
    }, expectedLog)
}




