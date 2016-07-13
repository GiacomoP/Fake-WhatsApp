import $ from 'jquery';
import WhatsApp from '../entities/whatsapp.es6';
import r from '../radio.es6';

let defaults = {
    battery: 67,
    time: '11:42'
};

class Phone {
    /**
     * Creates a new instance of this entity.
     * @param {Object=} opts - [optional] Options object.
     */
    constructor(opts) {
        $.extend(this, defaults, opts);

        /**
         * @type {WhatsApp}
         */
        this.whatsApp = new WhatsApp();
    }

    /**
     * Sets an attribute for this object, firing a change event.
     *
     * @param {string}  attr
     * @param {*}       value
     */
    set(attr, value) {
        if (this[attr] === value) {
            return;
        }
        this[attr] = value;
        r.sendMessage('phone::changed', attr);
    }

    /**
     * Executes the callback function when an entity's attribute changes.
     *
     * @param {function}    callback    - The function to call.
     * @param {Object}      thisArg     - The 'this' value of the caller.
     */
    onChange(callback, thisArg) {
        r.addListener('phone::changed', callback, thisArg);
    }
}

export default Phone;