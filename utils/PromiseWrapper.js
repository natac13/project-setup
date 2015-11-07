export default (function() {
    if (!Promise.wrap) {
        // will return a promise aware version of a callback function like ajax()
        // ```
        // var request = Promise.wrap(ajax)
        // request('url')
        // ```
        // When using the new Promise aware version I do not pass in the callback
        // function to the argument of the 'callback' (as `request` takes the same
        // arguments as the original `ajax` function minus the callback.)
        //
        // `.concat` can take a array or value and add it to the end of the array.
        Promise.wrap = function(fn) {
            return function() {
                var args = [].slice.call( arguments );

                return new Promise(function(resolve, reject) {
                    // this is where the original callback is called with the
                    // arguments from the newly wrapped Promise aware function
                    // (`request`)
                    fn.apply(null, args.concat(function(err, value) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(value);
                        }
                  }))
                });
            }
        }
    }

})()