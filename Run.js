"use strict";
// The program environment

// an optimized runtime flag
var optimized = false;

// Note: steps property is the number of steps the
// runtime has executed: we will terminate the runtime
// if step exceeds a number, because there is no reliable
// way to detect if a brainfuck program will infinite loop.
// Thanks Mr.Turing
var RuntimeEnvironment = function() {
    this.memory = Array(100).fill(0);
    this.mem_ptr = 0;
    this.steps = 0;
}

// TODO: call these in execute with this given
// update the memory_pointer
var update_memory = function(count) {
    this.memory[this.mem_ptr] += count;
    this.steps += count;
}

var update_pointer = function(count) {
    var new_ptr = this.mem_ptr + count;
    if (new_ptr >= 0 || new_ptr < this.memory.length)
        this.mem_ptr += count;
    this.steps += count;
}

var print_memory = function() {
    console.log(String.fromCharCode(this.memory[this.mem_ptr]));
    this.steps++;
}

var input_memory = function(char) {
    this.memory[this.mem_ptr] = char.charCodeAt(0);
    this.steps++;
}


/* Executes actions in RuntimeEnvironment until
 * program finishes execution, or number of steps are
 * exceeded. (1000) for now.
 */
RuntimeEnvironment.prototype.execute(actions) {
    for (var i = 0; i < actions.length && this.steps < 1000; i++) {
        var action = actions[i];
        if (action.type === "statement") {
            action.func.apply(this, actions.args);
        } else {
            while (this.memory[this.mem_ptr] && this.steps < 1000) {
                this.execute(action.actions);
            }
        }
    }
}
