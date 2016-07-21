import $ from 'jquery';

let defaults = {
    time: '11:42',
    content: '',
    owner: ''
};

class Message {
    /**
     * Creates a new instance of this entity.
     * @param {Object=} opts - [optional] Options object.
     */
    constructor(opts) {
        $.extend(this, defaults, opts);
    }
}

export default Message;