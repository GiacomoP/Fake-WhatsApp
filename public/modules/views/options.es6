import $ from 'jquery';
import Message from '../entities/message.es6';
import MessageOwner from '../entities/message-owner.es6';

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
         * Cached reference to options forms.
         * @type {jQuery}
         * @private
         */
        this._forms = this.$el.find('form');

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

        // Not real forms
        this._forms.off('submit');
        this._forms.on('submit', function(e) {
            e.preventDefault();
        });

        // Bind input changes to entity's attributes
        this.$el.find('[data-bind^="phone::"]').on('keyup change', function() {
            let bind = $(this).attr('data-bind');
            let attr = bind.substring(bind.indexOf('::') + 2);
            me._phone.set(attr, $(this).val(), true);
        });

        this.$el.find('#send-message').on('click touchstart', function() {
            let message = new Message({
                time: '10:00',
                content: $('#message-content').val(),
                owner: MessageOwner.fromHtml(me.$el.find('input[name="sender"]:checked').val())
            });
            me._phone.whatsApp.pushMessage(message);
            me.$el.find('form.chat-options-conversation')[0].reset();
        });
    }
}

export default OptionsView;