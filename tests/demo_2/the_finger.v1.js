const { WebDriver, By, Origin, Button } = require("selenium-webdriver");

class TheFinger {
  
  _driver;

  constructor(driver) {
    this._driver = driver;
    console.log("Using TheFinger (Version 1)...")
  }

  async click(target) {

    let driver = this._driver;

    /************************************************/

    // STEPS:
    // 1. Get the center point of the button
    // 2. Get the top element at that point
    // 3. Click on the top element instead

    // TODO: get the target element reference using findElement
    
    // TODO: write a script to get the position of the button and the top element at the point
    // - use driver.executeScript to run js function on the browser-side
    //   - [STEP 1] use getBoundingClientRect() to get the center point of the element
    //   - [STEP 2] use document.elementFromPoint(x,y) to get the top element at point
    //   - return the position, and the top element
 
    // [STEP 3]: Click on the top element instead
    // TODO: click on the top element using webdriver .click() method
  
    /************************************************/

    console.log("The center point of the target element is at (" + res.x + ", " + res.y + ").")
    
    let topElementHTML = res.topElementHTML.replace(/(\n\s*)/gi, "") // clean up extra whitespaces
    console.log("The topmost element at that point is :\n" + topElementHTML)

  }
}

module.exports = {
  TheFinger,
};
