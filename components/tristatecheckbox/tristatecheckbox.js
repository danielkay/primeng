import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var TRISTATECHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TriStateCheckbox; }),
    multi: true
};
var TriStateCheckbox = (function () {
    function TriStateCheckbox(cd) {
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    TriStateCheckbox.prototype.onClick = function (event, input) {
        if (!this.disabled) {
            this.toggle(event);
            this.focus = true;
            input.focus();
        }
    };
    TriStateCheckbox.prototype.onKeydown = function (event) {
        if (event.keyCode == 32) {
            event.preventDefault();
        }
    };
    TriStateCheckbox.prototype.onKeyup = function (event) {
        if (event.keyCode == 32) {
            this.toggle(event);
            event.preventDefault();
        }
    };
    TriStateCheckbox.prototype.toggle = function (event) {
        if (this.value == null || this.value == undefined)
            this.value = true;
        else if (this.value == true)
            this.value = false;
        else if (this.value == false)
            this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    TriStateCheckbox.prototype.onFocus = function () {
        this.focus = true;
    };
    TriStateCheckbox.prototype.onBlur = function () {
        this.focus = false;
        this.onModelTouched();
    };
    TriStateCheckbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    TriStateCheckbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    TriStateCheckbox.prototype.writeValue = function (value) {
        this.value = value;
        this.cd.markForCheck();
    };
    TriStateCheckbox.prototype.setDisabledState = function (disabled) {
        this.disabled = disabled;
    };
    return TriStateCheckbox;
}());
export { TriStateCheckbox };
TriStateCheckbox.decorators = [
    { type: Component, args: [{
                selector: 'p-triStateCheckbox',
                template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"'ui-chkbox ui-tristatechkbox ui-widget'\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #input type=\"text\" [attr.id]=\"inputId\" [name]=\"name\" [attr.tabindex]=\"tabindex\" readonly [disabled]=\"disabled\" (keyup)=\"onKeyup($event)\" (keydown)=\"onKeydown($event)\" (focus)=\"onFocus()\" (blur)=\"onBlur()\">\n            </div>\n            <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" (click)=\"onClick($event,input)\"\n                [ngClass]=\"{'ui-state-active':value!=null,'ui-state-disabled':disabled,'ui-state-focus':focus}\">\n                <span class=\"ui-chkbox-icon fa ui-c\" [ngClass]=\"{'fa-check':value==true,'fa-close':value==false}\"></span>\n            </div>\n        </div>\n    ",
                providers: [TRISTATECHECKBOX_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
TriStateCheckbox.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
TriStateCheckbox.propDecorators = {
    'disabled': [{ type: Input },],
    'name': [{ type: Input },],
    'tabindex': [{ type: Input },],
    'inputId': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'onChange': [{ type: Output },],
};
var TriStateCheckboxModule = (function () {
    function TriStateCheckboxModule() {
    }
    return TriStateCheckboxModule;
}());
export { TriStateCheckboxModule };
TriStateCheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [TriStateCheckbox],
                declarations: [TriStateCheckbox]
            },] },
];
/** @nocollapse */
TriStateCheckboxModule.ctorParameters = function () { return []; };
//# sourceMappingURL=tristatecheckbox.js.map