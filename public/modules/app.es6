import $ from 'jquery';
import Menu from './menu.es6';
import Phone from './entities/phone.es6';
import PhoneView from './views/phone.es6';
import OptionsView from './views/options.es6';

new Menu('#main-navigation');

let phone = new Phone();

new PhoneView('#phone', phone);
new OptionsView('#chat-options', phone);

$('img').on('dragstart', function(e) {
    e.preventDefault();
});