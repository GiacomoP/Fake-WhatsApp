import $ from 'jquery';

class PhoneView {
    /**
     * @param {Object}      selector    - A jQuery selector of the phone container.
     * @param {Phone}       phone       - An instance of Phone.
     */
    constructor(selector, phone) {
        /**
         * Container element.
         * @type {jQuery}
         */
        this.$el = $(selector);

        /**
         * @type {Phone}
         */
        this._phone = phone;

        this.init();
    }

    /**
     * Populates the view with current values and listens for changes.
     */
    init() {
        let me = this;

        this._phone.onChange(this.update, this);

        // Show data on data binded elements
        this.$el.find('[data-bind]').each(function() {
            let bind = $(this).attr('data-bind'),
                tmp = bind.split('::'),
                value = {};

            if (tmp[0] === 'phone') {
                value = me._phone;
                tmp.shift();
            }

            tmp.forEach(function(attr) {
                value = value[attr];
                if (typeof value === 'undefined') {
                    throw new Error(`Invalid data binding attribute "${bind}".`);
                }
            });

            if (bind === 'phone::battery') {
                value += '%';
            }

            switch ($(this).prop('tagName')) {
                default:
                case 'SPAN':
                    $(this).text(value);
                    break;
                case 'INPUT':
                    $(this).val(value);
                    break;
                case 'IMG':
                    $(this).attr('src', value);
                    break;
            }
        });
    }

    /**
     * Updates the values in the view.
     * @param {string} attr - The changed attribute.
     */
    update(attr) {
        let value = this._phone[attr];
        if (attr === 'battery') {
            value += '%';
        }
        this.$el.find('[data-bind="phone::' + attr + '"]').text(value);
    }
}

export default PhoneView;