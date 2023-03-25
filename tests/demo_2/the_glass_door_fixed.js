// How to run this test:
// node <test_file_name> to run the test

const path = require('path');
const { ServiceBuilder } = require('selenium-webdriver/chrome');
const {Builder, By, Key, until} = require('selenium-webdriver');
const { sleep } = require('../../utils/sleep');
const { TheFinger } = require("./the_finger.v1.js");

(async function example() {

    let driver;
    try {
        
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
    
        // Open the test page
        await driver.get('http://localhost:8000/the_glass_door.html');
		await sleep(1500) // slow time to observe

		// Step 1: Click the "Visit Chicago" button
		let BUTTON_TO_CLICK = By.id("visit-chicago-btn")
		
		/************************************************/
		
        // TODO: initialise The Finger (it's already imported)
        let finger = new TheFinger(driver)

        // TODO: click using The Finger
		await finger.click(BUTTON_TO_CLICK)

		/************************************************/

		await sleep(1500) // slow time to observe

		// Now: Validate that the button is clicked
        let EXPECTED_LOG = "\"button#visit-chicago-btn\" clicked."
		let LOG_SEEN = await checkLogMessage(driver, EXPECTED_LOG)
        if(LOG_SEEN){
            console.log("SUCCESS: " + EXPECTED_LOG)
        } else {
            console.error("FAILED: " + EXPECTED_LOG)
        }

    } catch(e) {
        console.error("error: ", e.message)
    } finally {
        await driver.close();
        await driver.quit();
    }

})();

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




