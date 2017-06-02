import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var TOGGLEBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ToggleButton; }),
    multi: true
};
var ToggleButton = (function () {
    function ToggleButton() {
        this.onLabel = 'Yes';
        this.offLabel = 'No';
        this.onChange = new EventEmitter();
        this.checked = false;
        this.focus = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    ToggleButton.prototype.ngAfterViewInit = function () {
        this.checkbox = this.checkboxViewChild.nativeElement;
    };
    ToggleButton.prototype.getIconClass = function () {
        var baseClass = 'ui-button-icon-left fa fa-fw';
        return baseClass + ' ' + (this.checked ? this.onIcon : this.offIcon);
    };
    ToggleButton.prototype.toggle = function (event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            this.checkbox.focus();
        }
    };
    ToggleButton.prototype.onFocus = function () {
        this.focus = true;
    };
    ToggleButton.prototype.onBlur = function () {
        this.focus = false;
        this.onModelTouched();
    };
    ToggleButton.prototype.writeValue = function (value) {
        this.checked = value;
    };
    ToggleButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    ToggleButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    ToggleButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Object.defineProperty(ToggleButton.prototype, "hasOnLabel", {
        get: function () {
            return this.onLabel && this.onLabel.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleButton.prototype, "hasOffLabel", {
        get: function () {
            return this.onLabel && this.onLabel.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    return ToggleButton;
}());
export { ToggleButton };
ToggleButton.decorators = [
    { type: Component, args: [{
                selector: 'p-toggleButton',
                template: "\n        <div [ngClass]=\"{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon&&!offIcon), \n                'ui-button-text-icon-left': (onIcon&&offIcon&&hasOnLabel&&hasOffLabel), 'ui-button-icon-only': (onIcon&&offIcon&&!hasOnLabel&&!hasOffLabel),\n                'ui-state-active': checked,'ui-state-focus':focus,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\" \n                (click)=\"toggle($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #checkbox type=\"checkbox\" [attr.id]=\"inputId\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [attr.tabindex]=\"tabindex\">\n            </div>\n            <span *ngIf=\"onIcon||offIcon\" [class]=\"getIconClass()\"></span>\n            <span class=\"ui-button-text ui-unselectable-text\">{{checked ? hasOnLabel ? onLabel : 'ui-btn' : hasOffLabel ? offLabel : 'ui-btn'}}</span>\n        </div>\n    ",
                providers: [TOGGLEBUTTON_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
ToggleButton.ctorParameters = function () { return []; };
ToggleButton.propDecorators = {
    'onLabel': [{ type: Input },],
    'offLabel': [{ type: Input },],
    'onIcon': [{ type: Input },],
    'offIcon': [{ type: Input },],
    'disabled': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'inputId': [{ type: Input },],
    'tabindex': [{ type: Input },],
    'onChange': [{ type: Output },],
    'checkboxViewChild': [{ type: ViewChild, args: ['checkbox',] },],
};
var ToggleButtonModule = (function () {
    function ToggleButtonModule() {
    }
    return ToggleButtonModule;
}());
export { ToggleButtonModule };
ToggleButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [ToggleButton],
                declarations: [ToggleButton]
            },] },
];
/** @nocollapse */
ToggleButtonModule.ctorParameters = function () { return []; };
//# sourceMappingURL=togglebutton.js.map