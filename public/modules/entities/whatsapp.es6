import $ from 'jquery';

let defaults = {
    user: {
        name: 'Contact Name',
        lastSeen: 'last seen today at 10:36',
        image: 'images/anon-user.png'
    },
    message: {
        string: 'Type a message'
    }
};

class WhatsApp {
    constructor(opts) {
        $.extend(this, defaults, opts);
    }
}

export default WhatsApp;