class MessageCallback {
    /**
     * @param {function}    callback
     * @param {Object}      context
     */
    constructor(callback, context) {
        this.function = callback;
        this.context = context;
    }

    /**
     * @param {MessageCallback} obj
     * @returns {boolean}
     */
    equals(obj) {
        return this.function === obj.function && this.context === obj.context;
    }
}

class Radio {
    constructor() {
        /**
         * @type {Array.<string, MessageCallback>}
         */
        this.listeners = [];
    }

    /**
     * Adds a new listener.
     *
     * @param {string}      name        - The message to listen for.
     * @param {function}    callback    - The function to call when the message is received.
     * @param {Object}      thisArg     - The 'this' value of the caller.
     */
    addListener(name, callback, thisArg) {
        let listener = new MessageCallback(callback, thisArg);

        if (typeof this.listeners[name] === 'undefined') {
            this.listeners[name] = [];
        }

        // Check if callback is already registered
        this.listeners[name].forEach(function(current) {
            if (current.equals(listener)) {
                throw new Error(`Function "${callback.name}" already registered for the message "${name}".`);
            }
        });

        this.listeners[name].push(listener);
    }

    /**
     * Sends a new message, with optional arguments.
     *
     * @param {string}  name - The message.
     * @param {*}       args - [optional] Arguments to send to callbacks.
     */
    sendMessage(name, ...args) {
        /**
         * @type {MessageCallback[]}
         */
        let callbacks = this.listeners[name];
        let counter = 0;

        if (callbacks && callbacks.length) {
            callbacks.forEach(function(current) {
                current.function.call(current.context, ...args);
                counter++;
            });
        }

        if (!counter) {
            window.console.log(`Unhandled message "${name}".`);
        }
    }
}

let r = new Radio();

export default r;