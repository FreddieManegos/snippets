// node myFile.js
const pendingTimers = []
const pendingOSTasks = []
const pendingOperations = []
myFile.runContents(); 

function shouldContinue() {
    // Check one: Any pending setTimeout, setInternal, setImmediate?
    // Check two: Any pending OS tasks? (like server listening to port)
    // Check three: Any pending long running operations (like fs module?
    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length
}

// Entire body executes in one 'tick'
while(shouldContinue()) {
    // 1. Node looks at pendingTimer and see if any function are ready to be called

    // 2. Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks

    // 3. Pause execution . Continue when...
    // - a new pendingOSTask is done
    // - a new pendingOperation is done
    // - a timer is about to complete 

    // 4. Look at pendingTimers. Call any setImmediate

    // 5. Handle any 'close' events

}

// exit back to terminal