import { NgModule, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
var InputTextarea = (function () {
    function InputTextarea(el) {
        this.el = el;
    }
    InputTextarea.prototype.ngOnInit = function () {
        this.rowsDefault = this.rows;
        this.colsDefault = this.cols;
    };
    InputTextarea.prototype.ngDoCheck = function () {
        this.updateFilledState();
    };
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    InputTextarea.prototype.onInput = function (e) {
        this.updateFilledState();
    };
    InputTextarea.prototype.updateFilledState = function () {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    };
    InputTextarea.prototype.onFocus = function (e) {
        if (this.autoResize) {
            this.resize();
        }
    };
    InputTextarea.prototype.onBlur = function (e) {
        if (this.autoResize) {
            this.resize();
        }
    };
    InputTextarea.prototype.onKeyup = function (e) {
        if (this.autoResize) {
            this.resize();
        }
    };
    InputTextarea.prototype.resize = function () {
        var linesCount = 0, lines = this.el.nativeElement.value.split('\n');
        for (var i = lines.length - 1; i >= 0; --i) {
            linesCount += Math.floor((lines[i].length / this.colsDefault) + 1);
        }
        this.rows = (linesCount >= this.rowsDefault) ? (linesCount + 1) : this.rowsDefault;
    };
    return InputTextarea;
}());
export { InputTextarea };
InputTextarea.decorators = [
    { type: Directive, args: [{
                selector: '[pInputTextarea]',
                host: {
                    '[class.ui-inputtext]': 'true',
                    '[class.ui-corner-all]': 'true',
                    '[class.ui-state-default]': 'true',
                    '[class.ui-widget]': 'true',
                    '[class.ui-state-filled]': 'filled',
                    '[attr.rows]': 'rows',
                    '[attr.cols]': 'cols'
                }
            },] },
];
/** @nocollapse */
InputTextarea.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
InputTextarea.propDecorators = {
    'autoResize': [{ type: Input },],
    'rows': [{ type: Input },],
    'cols': [{ type: Input },],
    'onInput': [{ type: HostListener, args: ['input', ['$event'],] },],
    'onFocus': [{ type: HostListener, args: ['focus', ['$event'],] },],
    'onBlur': [{ type: HostListener, args: ['blur', ['$event'],] },],
    'onKeyup': [{ type: HostListener, args: ['keyup', ['$event'],] },],
};
var InputTextareaModule = (function () {
    function InputTextareaModule() {
    }
    return InputTextareaModule;
}());
export { InputTextareaModule };
InputTextareaModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [InputTextarea],
                declarations: [InputTextarea]
            },] },
];
/** @nocollapse */
InputTextareaModule.ctorParameters = function () { return []; };
//# sourceMappingURL=inputtextarea.js.map