/**
 * This file is licensed under the MIT license
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

(function() {
    'use strict';

    var load_from_directory = require( 'load-from-directory' ),
        callsite = require( 'callsite' ),
        assert = require( 'chai' ).assert,
        _ = require( 'underscore' ),
        path = require( 'path' );

    assert.isDefined( describe, 'Mocha describe not found, are you running this with mocha' );

    /**
     * Gets the directory root of who called this method
     * Original Caller -> getCallerRoot caller -> getCallerRoot
     * Returns Original Caller root directory
     * @returns {*} Returns the directory of the caller
     */
    var getCallerRoot = function() {
        var stack = callsite();
        var last_call = stack[ 2 ]; // 2 because we are being called in here too
        return path.dirname( last_call.getFileName() );
    };

    /**
     * Calls all files in directory with suite name
     * @param suite_name
     * @param directory
     */
    module.exports = function( suite_name, directory ) {
        var root = getCallerRoot();
        describe( suite_name, function() {
            var load_from_directory_options = {
                caller_directory: root
            };

            load_from_directory.load( directory, load_from_directory_options );
        } )
    };

})();