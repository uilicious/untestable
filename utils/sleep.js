/**
 * Sleep function
 * @param {*} time 
 * @returns 
 */
async function sleep(time){
    return new Promise(function(resolve){
        setTimeout(function(){
            return resolve();
        }, time)
    })
}

module.exports = {
    sleep
}