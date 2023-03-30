const { retryUntil } = require("../../utils/retryUntil");
const { WebDriver, By, Origin, Button } = require("selenium-webdriver");

class TheFinger {
  
  driver;

  constructor(driver) {
    this._driver = driver;
    console.log("Using TheFinger (Version 2)...")
  }

  async click(locator) {

    let driver = this._driver;

    console.log("Locator is: ", JSON.stringify(locator)); // will be  {using: 'css selector', value: '<css expression>'}

    /************************************************/

    // STEPS:
    // 1. Get the center point of the button
    // 2. Move the mouse to the center point of the button, then press the left mouse button

    // Step 1: Get the center point of the button
    // - Note that we cannot use the driver.findElement method, since the target keeps re-rendering
    // - Note that we also cannot use driver.wait(until.elementLocated(By...))
    // - Hence, we'll use a retry loop that calls the the driver.executeScript method to find the element and get its position

    let res = await retryUntil(
      // function to retry
      async () => {
        // keep trying to get the element
        return await this._driver.executeScript(function(locator){

          let element, rect, pointX, pointY;
          if (locator.using === "css selector") {
            element = document.querySelector(locator.value);
          }

          if (locator.using === "xpath") {
            let result = document.evaluate(locator.value, document, null, 0);
            element = result.iterateNext();
          }

          if (element) {

            // compute the center point of the element
            rect = element.getBoundingClientRect();
            pointX = Math.floor(rect.left + rect.width / 2); // position relative to the viewport (i.e. the scrolled position)
            pointY = Math.floor(rect.top + rect.height / 2); // position relative to the viewport (i.e. the scrolled position)
            
            return {
              by: locator,
              element: element,
              rect: rect,
              x: pointX,
              y: pointY
            };
          }

          return {
            by: locator,
            element: null,
          };

        }, locator)
      },
      // condition to stop retrying
      (res)=>{
        return res && res.element != null
      }
    )

    console.log("The center point of the target element is at (" + res.x + ", " + res.y + ").")
    

    // TODO: Using the actions method, move the mouse to the center point, then click
    // Step 2: Move the mouse to the center point, using the actions method
    
    /************************************************/

  }

}

module.exports = {
  TheFinger,
};
