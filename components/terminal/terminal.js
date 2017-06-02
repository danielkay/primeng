import { NgModule, Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var Terminal = (function () {
    function Terminal(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.responseChange = new EventEmitter();
        this.handler = new EventEmitter();
        this.commands = [];
    }
    Terminal.prototype.ngAfterViewInit = function () {
        this.container = this.domHandler.find(this.el.nativeElement, '.ui-terminal')[0];
    };
    Terminal.prototype.ngAfterViewChecked = function () {
        if (this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    };
    Object.defineProperty(Terminal.prototype, "response", {
        set: function (value) {
            if (value) {
                this.commands[this.commands.length - 1].response = value;
                this.commandProcessed = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Terminal.prototype.handleCommand = function (event) {
        if (event.keyCode == 13) {
            this.commands.push({ text: this.command });
            this.handler.emit({ originalEvent: event, command: this.command });
            this.command = '';
        }
    };
    Terminal.prototype.focus = function (element) {
        element.focus();
    };
    return Terminal;
}());
export { Terminal };
Terminal.decorators = [
    { type: Component, args: [{
                selector: 'p-terminal',
                template: "\n        <div [ngClass]=\"'ui-terminal ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"focus(in)\">\n            <div *ngIf=\"welcomeMessage\">{{welcomeMessage}}</div>\n            <div class=\"ui-terminal-content\">\n                <div *ngFor=\"let command of commands\">\n                    <span>{{prompt}}</span>\n                    <span class=\"ui-terminal-command\">{{command.text}}</span>\n                    <div>{{command.response}}</div>\n                </div>\n            </div>\n            <div>\n                <span class=\"ui-terminal-content-prompt\">{{prompt}}</span>\n                <input #in type=\"text\" [(ngModel)]=\"command\" class=\"ui-terminal-input\" autocomplete=\"off\" (keydown)=\"handleCommand($event)\" autofocus>\n            </div>\n        </div>\n    ",
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
Terminal.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
]; };
Terminal.propDecorators = {
    'welcomeMessage': [{ type: Input },],
    'prompt': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'responseChange': [{ type: Output },],
    'handler': [{ type: Output },],
    'response': [{ type: Input },],
};
var TerminalModule = (function () {
    function TerminalModule() {
    }
    return TerminalModule;
}());
export { TerminalModule };
TerminalModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                exports: [Terminal],
                declarations: [Terminal]
            },] },
];
/** @nocollapse */
TerminalModule.ctorParameters = function () { return []; };
//# sourceMappingURL=terminal.js.map