import $ from 'jquery';
import r from '../radio.es6';

let defaults = {
    user: {
        name: 'Contact Name',
        lastSeen: 'last seen today at 10:36',
        image: 'images/anon-user.png'
    },
    message: {
        string: 'Type a message'
    },
    list: []
};

class WhatsApp {
    /**
     * Creates a new instance of this entity.
     * @param {Object=} opts - [optional] Options object.
     */
    constructor(opts) {
        $.extend(this, defaults, opts);
    }

    /**
     * @param {Message} message
     */
    pushMessage(message) {
        this.list.push(message);
        r.sendMessage('whatsapp::changed', message);
    }
}

export default WhatsApp;