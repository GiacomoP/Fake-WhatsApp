import $ from 'jquery';

var WINDOW_CHANGE_EVENTS = ('onorientationchange' in window) ? 'orientationchange resize' : 'resize';

class Menu {
    /**
     * @param {Object} selector - A jQuery selector of the menu to handle.
     */
    constructor(selector) {
        this.$el = $(selector);
        this._toggleBtn = this.$el.find('.menu-toggle');
        this._navLinks = this.$el.find('.navigation-links');
        // Bind events
        this._init();
    }

    /**
     * Attaches the events to handle the Menu's actions.
     * @private
     */
    _init() {
        this._toggleBtn.on('click', $.proxy(this._toggleMenu, this));
        $(window).on(WINDOW_CHANGE_EVENTS, $.proxy(this._closeMenu, this));
    }

    /**
     * Opens/Closes the menu.
     * @private
     */
    _toggleMenu() {
        if (this.$el.hasClass('open')) {
            setTimeout($.proxy(this._toggleHorizontal, this), 500);
        } else {
            this._toggleHorizontal();
        }
        this.$el.toggleClass('open');
        this._toggleBtn.toggleClass('x');
    }

    /**
     * Changes the type of menu between horizontal and vertical.
     * @private
     */
    _toggleHorizontal() {
        this._navLinks.toggleClass('pure-menu-horizontal');
    }

    /**
     * Closes the menu.
     * @private
     */
    _closeMenu() {
        if (this.$el.hasClass('open')) {
            this._toggleMenu();
        }
    }
}

export default Menu;