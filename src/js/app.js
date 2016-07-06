(function (window, document, $) {
    var menu = $('#main-navigation'),
        toggle = menu.find('.menu-toggle'),
        WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange' : 'resize';

    function toggleHorizontal() {
        menu.find('.app-menu-links').toggleClass('pure-menu-horizontal');
    };

    function toggleMenu() {
        if (menu.hasClass('open')) {
            setTimeout(toggleHorizontal, 500);
        } else {
            toggleHorizontal();
        }
        menu.toggleClass('open');
        toggle.toggleClass('x');
    };

    function closeMenu() {
        if (menu.hasClass('open')) {
            toggleMenu();
        }
    }

    toggle.on('click', toggleMenu);
    $(window).on(WINDOW_CHANGE_EVENT, closeMenu);
})(this, this.document, jQuery);
