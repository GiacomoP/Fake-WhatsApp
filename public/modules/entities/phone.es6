import $ from 'jquery';

let defaults = {
    battery: 67,
    time: '11:42'
};

class Phone {
    constructor(opts) {
        $.extend(this, defaults, opts);
    }
}

export default Phone;