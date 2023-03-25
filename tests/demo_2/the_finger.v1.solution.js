const { WebDriver, By, Origin, Button } = require("selenium-webdriver");

class TheFinger {
  
  driver;

  constructor(driver) {
    this._driver = driver;
    console.log("Using TheFinger (Version 1)...")
  }

  async click(target) {

    /************************************************/

    // STEPS:
    // 1. Get the center point of the button
    // 2. Get the top element at that point
    // 3. Click on the top element instead

    // TODO: get the target element
    let element = await this._driver.findElement(target)

    // TODO: write a script to get the position of the button and the top element at the point
    let res = await this._driver.executeScript(function(element){ 
            
      // Step 1: Get the center point of the button
      var rect = element.getBoundingClientRect()
      var pointX = Math.floor(rect.left + rect.width / 2); // note that rect.left is relative to scrolled position 
      var pointY = Math.floor(rect.top + rect.height / 2); // note that rect.top is relative to scrolled position 

      // Step 2: Get the top element at the element
      var topElement = document.elementFromPoint(pointX, pointY)
      return {
          x: pointX, // position of the button to click on
          y: pointY, // position of the button to click on
          topElement: topElement, // the topmost element at that position
          topElementHTML: topElement.outerHTML // the html of the topmost element
      }

    }, element)

    console.log("The center point of the target element is at (" + res.x + ", " + res.y + ").")
    
    let topElementHTML = res.topElementHTML.replace(/(\n\s*)/gi, "") // clean up extra whitespaces
    console.log("The topmost element at that point is :\n" + topElementHTML)

    // Step 3: Click on the top element instead
    await res.topElement.click()
    
    /************************************************/

  }

}

module.exports = {
  TheFinger,
};
