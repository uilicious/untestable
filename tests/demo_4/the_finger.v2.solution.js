const { retryUntil } = require("../../utils/retryUntil");
const { WebDriver, By, Origin, Button } = require("selenium-webdriver");

class TheFinger {
  
  driver;

  constructor(driver) {
    this._driver = driver;
    console.log("Using TheFinger (Version 2)...")
  }

  async click(locator) {

    console.log("Target is: ", JSON.stringify(locator)); // will be  {using: 'css selector', value: '<css expression>'}

    /************************************************/

    // STEPS:
    // 1. Get the center point of the button
    // 2. Move the mouse to the center point of the button, then press the left mouse button

    // Step 1: Get the center point of the button
    // - Note that we cannot use the driver.findElement method, since the target keeps re-rendering
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
    
    // Step 2: Move the mouse to the center point, using the actions method
    let actions = this._driver.actions()
    await actions
      .move({
          origin: "viewport", // x and y are relative to the "viewport", meaning the current scrolled position on the page
          x: res.x,
          y: res.y,
          duration: 200 // move at a "humanely" fast speed
      })
      .press()  // press a mouse button at the current location, by default LEFT
      .release() // release a mouse button
      .perform() // execute the actions
    
    /************************************************/

  }

}

module.exports = {
  TheFinger,
};
