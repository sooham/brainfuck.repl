"use strict";
/* This module parses preprocessed brainfuck code
 * and returns a logic object representing
 * the sequence of functions to execute.
 */

/* Gets the loop body of first loop in source */
var get_loop_body = function(source) {
    var open_brace_index = source.indexOf('[');
    for (var i = open_brace_index; i < source.length; i++) {
        if (source[i] == ']') {
            var body = source.slice(open_brace_index + 1, i);
            if (is_syntax_valid(body))
                return body;
        }
    }
}

var translate = function(source) {
    var actions = [];
    var instruction_pointer = 0;
    while (instruction_pointer < source.length) {
        var action = {};
        action.type = "statement";
        var opchar = source[instruction_pointer];
        switch (opchar) {
            case '+':
            case '-':
                action.func = update_memory;
                action.args = (opchar == '+') ? [1]: [-1];
                break;
            case '>':
            case '<':
                action.func = update_pointer;
                action.args = (opchar == '>') ? [1]: [-1];
                break;
            case '.':
                action.func = print_memory;
                action.args = [];
                break;
            case ',':
                action.func = input_memory;
                action.args = [];
                break;
            case '[':
                action.type = "loop";
                // in a loop, get the body of the loop and
                // recursively run translate on the body
                var loop_body = get_loop_body(
                    source.slice(instruction_pointer, source.length)
                );
                action.actions = translate(loop_body);
                // set instruction pointer to the corresponding
                // ]
                instruction_pointer += loop_body.length + 1;
                break;
            case ']':
                throw new Error("Detected: " + opchar);
                break;
            default:
                throw new Error("Detected: " + opchar);
        }
        actions.push(action);
        instruction_pointer++;
    }
    return actions;
}

