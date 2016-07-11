import $ from 'jquery';
import Menu from './menu.es6';

new Menu('#main-navigation');

$('img').on('dragstart', function(e) {
    e.preventDefault();
});