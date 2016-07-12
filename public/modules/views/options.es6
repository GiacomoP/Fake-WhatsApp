import $ from 'jquery';
import r from '../radio.es6';

class OptionsView {
    /**
     * @param {Object} selector - A jQuery selector of the options container.
     */
    constructor(selector) {
        this.$el = $(selector);
        this._form = this.$el.find('form');
        this._setHandlers();
    }

    /**
     * @private
     */
    _setHandlers() {
        // Not a real form
        this._form.off('submit');
        this._form.on('submit', function(e) {
            e.preventDefault();
        });

        // Bind inputs to elements
        $('#opts-phone-time').on('keyup change', function() {
            r.sendMessage('phone::setTime', $(this).val());
        });
        $('#opts-phone-battery').on('keyup change', function() {
            r.sendMessage('phone::setBattery', parseInt($(this).val(), 10));
        });
    }
}

export default OptionsView;