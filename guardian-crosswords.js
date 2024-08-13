// ==UserScript==
// @name         Guardian Crosswords Shortcuts
// @namespace    http://tampermonkey.net/
// @version      2024-08-10
// @description  Adds keyboard shortcuts for the clear/check/reveal buttons on the Guardian crosswords.
// @author       Elgan ROLLAND
// @match        https://www.theguardian.com/crosswords/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=theguardian.com
// @grant        none
// ==/UserScript==

(function() {

    let keyMap = {};

    // Cleans the keys pressed when switching tabs
    // (avoids keeping Ctrl on after opening a tab with Ctrl+t).
    document.addEventListener( "visibilitychange", ( e ) => {
        keyMap = {};
    } );

    // Detects the keys pressed by the user.
    document.addEventListener( "keydown", ( e ) => {
        e ??= window.event;
        keyMap[e.key] = true;

        // 1 checks...
        if ( keyMap['1'] ) {
            if ( keyMap['Control'] ) {
                document.querySelector('[data-link-name="Check all"]').click();
            } else {
                document.querySelector('[data-link-name="Check this"]').click();
            }
        }
        // ... 2 clears....
        if ( keyMap['2'] ) {
            if ( keyMap['Control'] ) {
                document.querySelector('[data-link-name="Clear all"]').click();
            } else {
                document.querySelector('[data-link-name="Clear this"]').click();
            }
        }
        // ... 3 reveals.
        if ( keyMap['3'] ) {
            if ( keyMap['Control'] ) {
                document.querySelector('[data-link-name="Reveal all"]').click();
            } else {
                document.querySelector('[data-link-name="Reveal this"]').click();
            }
        }

        // Ensures that the number typed is not inserted in the grid.
        let isNumeric = ( e.key.trim().length > 0 ) && ( !isNaN( e.key.trim() ) );
        if ( isNumeric ) {
            e.preventDefault();
        }
    });

    // Removes the key from the list once the user stops pressing it.
    //FIXME ? If open new tab with ctrl T, keyup is not detected
    document.addEventListener( "keyup", ( e ) => {
        e ??= window.event;
        keyMap[e.key] = false;
    });

})();