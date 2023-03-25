const { sleep } = require("./sleep")

/**
 * An asynchronous retry function
 * @param {*} fn function to retry
 * @param {*} until condition to stop retrying
 * @param {*} options options
 * @returns 
 */
async function retryUntil(fn, until, options) {

    options = options || {}
    options.timeout = options.timeout || 15000 // retry up to 15 seconds
    options.sleepBetweenTries = options.sleepBetweenTries || 100 // sleep for 100ms in between tries 

    let result; 
    let err; 

    // keep retrying the function until "until" function returns true, or until maxRetries exceeded
    let startTime = (new Date()).getTime()
    while (!until(result)) {

        try {

            // execute the function
            result = await fn()

            // clear error from previous tries
            err = null 

        } catch (e) {
            
            // save the latest error
            err = e;

            // sleep in between retries
            if(options.sleepBetweenTries){
                await sleep(options.sleepBetweenTries)
            }

            // stop retrying if time out
            let timeElapsed = (new Date()).getTime() - startTime
            if(timeElapsed > options.timeout){
                break;
            }

        } 

    }

    // log errors
    if(err){
        console.error("error executing function: ", err)
    }

    return result;

}

module.exports = {
    retryUntil
}
