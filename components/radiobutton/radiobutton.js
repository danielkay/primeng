import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RadioButton; }),
    multi: true
};
var RadioButton = (function () {
    function RadioButton(cd) {
        this.cd = cd;
        this.onClick = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    RadioButton.prototype.ngAfterViewInit = function () {
        this.input = this.inputViewChild.nativeElement;
    };
    RadioButton.prototype.handleClick = function () {
        if (!this.disabled) {
            this.onClick.emit(null);
            this.select();
        }
    };
    RadioButton.prototype.select = function () {
        if (!this.disabled) {
            this.input.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
        }
    };
    RadioButton.prototype.writeValue = function (value) {
        this.checked = (value == this.value);
        if (this.input) {
            this.input.checked = this.checked;
        }
        this.cd.markForCheck();
    };
    RadioButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    RadioButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    RadioButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    RadioButton.prototype.onFocus = function (event) {
        this.focused = true;
    };
    RadioButton.prototype.onBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
    };
    RadioButton.prototype.onChange = function (event) {
        this.select();
    };
    return RadioButton;
}());
export { RadioButton };
RadioButton.decorators = [
    { type: Component, args: [{
                selector: 'p-radioButton',
                template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"'ui-radiobutton ui-widget'\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #rb type=\"radio\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.value]=\"value\" [attr.tabindex]=\"tabindex\" \n                    [checked]=\"checked\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\">\n            </div>\n            <div (click)=\"handleClick()\"\n                [ngClass]=\"{'ui-radiobutton-box ui-widget ui-state-default':true,\n                'ui-state-active':rb.checked,'ui-state-disabled':disabled,'ui-state-focus':focused}\">\n                <span class=\"ui-radiobutton-icon\" [ngClass]=\"{'fa fa-circle':rb.checked}\"></span>\n            </div>\n        </div>\n        <label class=\"ui-radiobutton-label\" (click)=\"select()\" *ngIf=\"label\">{{label}}</label>\n    ",
                providers: [RADIO_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
RadioButton.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
RadioButton.propDecorators = {
    'value': [{ type: Input },],
    'name': [{ type: Input },],
    'disabled': [{ type: Input },],
    'label': [{ type: Input },],
    'tabindex': [{ type: Input },],
    'inputId': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'onClick': [{ type: Output },],
    'inputViewChild': [{ type: ViewChild, args: ['rb',] },],
};
var RadioButtonModule = (function () {
    function RadioButtonModule() {
    }
    return RadioButtonModule;
}());
export { RadioButtonModule };
RadioButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [RadioButton],
                declarations: [RadioButton]
            },] },
];
/** @nocollapse */
RadioButtonModule.ctorParameters = function () { return []; };
//# sourceMappingURL=radiobutton.js.map