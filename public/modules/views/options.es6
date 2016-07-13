import $ from 'jquery';

class OptionsView {
    /**
     * @param {Object}  selector - A jQuery selector of the options container.
     * @param {Phone}   phone    - An instance of Phone.
     */
    constructor(selector, phone) {
        /**
         * Container element.
         * @type {jQuery}
         */
        this.$el = $(selector);

        /**
         * @type {Phone}
         * @private
         */
        this._phone = phone;

        /**
         * Cached reference to options form.
         * @type {jQuery}
         * @private
         */
        this._form = this.$el.find('form');

        this.init();
    }

    /**
     * Sets form handlers and populates the view with current values.
     */
    init() {
        let me = this;

        this._setHandlers();

        this.$el.find('input[data-bind]').each(function() {
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

            $(this).val(value);
        });
    }

    /**
     * @private
     */
    _setHandlers() {
        let me = this;

        // Not a real form
        this._form.off('submit');
        this._form.on('submit', function(e) {
            e.preventDefault();
        });

        // Bind input changes to entity's attributes
        this.$el.find('[data-bind^="phone::"]').on('keyup change', function() {
            let bind = $(this).attr('data-bind');
            let attr = bind.substring(bind.indexOf('::') + 2);
            me._phone.set(attr, $(this).val(), true);
        });
    }
}

export default OptionsView;