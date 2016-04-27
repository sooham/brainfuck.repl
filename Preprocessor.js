"use strict";
/* This module preprocess input source code */

/* Return a string with non-brainfuck tokens
 * removed.
 */
var get_tokens = function(source) {
    var non_tokens = /[^+-.,<>\[\]]+/g;
    return source.replace(non_tokens, "");
}

/* Check if the program follows valid grammar */
var is_syntax_valid = function(source) {
    var stack = [];
    var pattern = /[\[\]]/g;
    var match;
    while (match = pattern.exec(source))
        (match[0] === '[') ? stack.push('[') : stack.pop();

    return stack.length === 0;
}
