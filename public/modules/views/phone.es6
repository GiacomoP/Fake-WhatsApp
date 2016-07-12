import $ from 'jquery';
import Phone from '../entities/phone.es6';
import r from '../radio.es6';

class PhoneView {
    /**
     * @param {Object} selector - A jQuery selector of the phone container.
     */
    constructor(selector) {
        this.$el = $(selector);
        this.phone = new Phone();
        this._setHandlers();
    }

    /**
     * @private
     */
    _setTime(value) {
        if (value.length < 5 || value.length > 8) {
            return;
        }
        this.phone.time = value;
        $('#phone-time').text(value);
    }

    /**
     * @private
     */
    _setBattery(value) {
        if (value < 1) {
            value = 1;
        } else if (value > 100) {
            value = 100;
        }
        this.phone.battery = value;
        $('#phone-battery-text').text(`${value}%`);
    }

    /**
     * @private
     */
    _setHandlers() {
        r.addListener('phone::setTime', this._setTime, this);
        r.addListener('phone::setBattery', this._setBattery, this);
    }
}

export default PhoneView;