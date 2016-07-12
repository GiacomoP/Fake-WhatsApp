import $ from 'jquery';
import Menu from './menu.es6';
import PhoneView from './views/phone.es6';
import OptionsView from './views/options.es6';

new Menu('#main-navigation');
new PhoneView('#phone');
new OptionsView('#chat-options');

$('img').on('dragstart', function(e) {
    e.preventDefault();
});