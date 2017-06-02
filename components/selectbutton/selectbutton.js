import { NgModule, Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var SELECTBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SelectButton; }),
    multi: true
};
var SelectButton = (function () {
    function SelectButton() {
        this.onChange = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    SelectButton.prototype.writeValue = function (value) {
        this.value = value;
    };
    SelectButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    SelectButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    SelectButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    SelectButton.prototype.onItemClick = function (event, option, checkbox) {
        if (this.disabled) {
            return;
        }
        checkbox.focus();
        if (this.multiple) {
            var itemIndex_1 = this.findItemIndex(option);
            if (itemIndex_1 != -1)
                this.value = this.value.filter(function (val, i) { return i != itemIndex_1; });
            else
                this.value = (this.value || []).concat([option.value]);
        }
        else {
            this.value = option.value;
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    SelectButton.prototype.onFocus = function (event) {
        this.focusedItem = event.target;
    };
    SelectButton.prototype.onBlur = function (event) {
        this.focusedItem = null;
        this.onModelTouched();
    };
    SelectButton.prototype.isSelected = function (option) {
        if (this.multiple)
            return this.findItemIndex(option) != -1;
        else
            return option.value == this.value;
    };
    SelectButton.prototype.findItemIndex = function (option) {
        var index = -1;
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] == option.value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    return SelectButton;
}());
export { SelectButton };
SelectButton.decorators = [
    { type: Component, args: [{
                selector: 'p-selectButton',
                template: "\n        <div [ngClass]=\"'ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-' + options.length\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div *ngFor=\"let option of options;\" class=\"ui-button ui-widget ui-state-default ui-button-text-only\"\n                [ngClass]=\"{'ui-state-active':isSelected(option), 'ui-state-disabled':disabled, 'ui-state-focus': cbox == focusedItem}\" (click)=\"onItemClick($event,option,cbox)\">\n                <span class=\"ui-button-text ui-c\">{{option.label}}</span>\n                <div class=\"ui-helper-hidden-accessible\">\n                    <input #cbox type=\"checkbox\" [checked]=\"isSelected(option)\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" [attr.tabindex]=\"tabindex\" [attr.disabled]=\"disabled\">\n                </div>\n            </div>\n        </div>\n    ",
                providers: [SELECTBUTTON_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
SelectButton.ctorParameters = function () { return []; };
SelectButton.propDecorators = {
    'options': [{ type: Input },],
    'tabindex': [{ type: Input },],
    'multiple': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'disabled': [{ type: Input },],
    'onChange': [{ type: Output },],
};
var SelectButtonModule = (function () {
    function SelectButtonModule() {
    }
    return SelectButtonModule;
}());
export { SelectButtonModule };
SelectButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [SelectButton],
                declarations: [SelectButton]
            },] },
];
/** @nocollapse */
SelectButtonModule.ctorParameters = function () { return []; };
//# sourceMappingURL=selectbutton.js.map