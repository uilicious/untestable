// How to run this test:
// npm run <test_file_name> to run the test

const path = require('path');
const { ServiceBuilder } = require('selenium-webdriver/chrome');
const { Builder, By } = require('selenium-webdriver');
const { sleep } = require('../../utils/sleep');
// const { TheFinger } = require("./the_ultimate_finger");
const { TheFinger } = require("selenium-finger");

describe("UNtestable UI", function(){

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

	describe("The Glass Door", function(){
		it("button#visit-chicago-btn is clicked", async function(){

			try {
	
				 // Open the test page
				await driver.get('http://localhost:8000/the_glass_door.html');
				
				// Step 1: Click the "Visit Chicago" button
				let BUTTON_TO_CLICK = By.id("visit-chicago-btn")
				
				/************************************************/
			
				// TODO: initialise The Finger (it's already imported)
				let finger = new TheFinger(driver)
	
				// TODO: click using The Finger
				await finger.click(BUTTON_TO_CLICK)
	
				/************************************************/
	
				// Validate that the button is clicked
				let EXPECTED_LOG = "\"button#visit-chicago-btn\" clicked."
				let LOG_SEEN = await checkLogMessage(driver, EXPECTED_LOG)
				if(!LOG_SEEN){
					throw new Error("The button did not receive a click.")
				}
	
			} catch(e) {
				// maybe log the error?
				throw e
			}
	
		})
	})

	describe("The Clone", function(){
		it("button#visit-chicago-btn is clicked", async function(){

			try {
	
				 // Open the test page
				await driver.get('http://localhost:8000/the_clone.html');
	
				// Step 1: Click the "Visit Chicago" button
				let BUTTON_TO_CLICK = By.id("visit-chicago-btn")
				
				/************************************************/
			
				// TODO: initialise The Finger (it's already imported)
				let finger = new TheFinger(driver)
	
				// TODO: click using The Finger
				await finger.click(BUTTON_TO_CLICK)
	
				/************************************************/
	
				// Validate that the button is clicked
				let EXPECTED_LOG = "\"button#visit-chicago-btn\" clicked."
				let LOG_SEEN = await checkLogMessage(driver, EXPECTED_LOG)
				if(!LOG_SEEN){
					throw new Error("The button did not receive a click.")
				}
	
			} catch(e) {
				// maybe log the error?
				throw e
			}
	
		})
	})

	describe("The Dodgeball", function(){
		it("button#nav-login-btn is clicked", async function(){

			try {
	
				 // Open the test page
				await driver.get('http://localhost:8000/the_dodgeball.html');
	
				// Step 1: Click the "Login" button
				let BUTTON_TO_CLICK = By.id("nav-login-btn")
				
				/************************************************/
			
				// TODO: initialise The Finger (it's already imported)
				let finger = new TheFinger(driver)
	
				// TODO: click using The Finger
				await finger.click(BUTTON_TO_CLICK)
	
				/************************************************/
	
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
	})

	describe("The Russian Doll", function(){
		it("JQuery Select Menu Option is clicked", async function(){

			try {
	
				 // Open the test page
				await driver.get('http://localhost:8000/the_russian_doll.html');
	
				 /************************************************/
			
				// TODO: initialise The Finger (it's already imported)
				let finger = new TheFinger(driver)
	
				 // TODO: click the toggle buttom
				let SELECT_MENU_TOGGLE_BUTTON = By.id("input-country-of-residence-button")
				await finger.click(SELECT_MENU_TOGGLE_BUTTON)
	
				// TODO: click the option
				let SELECT_MENU_OPTION = By.xpath("//li[@class='ui-menu-item']/div[contains(text(),'Singapore')]")
				await finger.click(SELECT_MENU_OPTION)
	
				/************************************************/
	
				// Validate that the option is clicked
				let EXPECTED_LOG = `"Singapore" option selected`
				let LOG_SEEN = await checkLogMessage(driver, EXPECTED_LOG)
				if(!LOG_SEEN){
					throw new Error("The select option did not receive a click.")
				}
	
			} catch(e) {
				// maybe log the error?
				throw e
			}
	
		})
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




