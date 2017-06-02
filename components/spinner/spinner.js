import { NgModule, Component, ElementRef, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from '../inputtext/inputtext';
import { DomHandler } from '../dom/domhandler';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var SPINNER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Spinner; }),
    multi: true
};
var Spinner = (function () {
    function Spinner(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onChange = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.step = 1;
        this.decimalSeparator = '.';
        this.thousandSeparator = ',';
        this.formatInput = true;
        this.valueAsString = '';
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.keyPattern = /[0-9\+\-]/;
    }
    Spinner.prototype.ngOnInit = function () {
        if (Math.floor(this.step) === 0) {
            this.precision = this.step.toString().split(/[,]|[.]/)[1].length;
        }
    };
    Spinner.prototype.repeat = function (interval, dir) {
        var _this = this;
        var i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(function () {
            _this.repeat(40, dir);
        }, i);
        this.spin(dir);
    };
    Spinner.prototype.spin = function (dir) {
        var step = this.step * dir;
        var currentValue = this.value || 0;
        var newValue = null;
        if (this.precision)
            this.value = parseFloat(this.toFixed(currentValue + step, this.precision));
        else
            this.value = currentValue + step;
        if (this.maxlength !== undefined && this.value.toString().length > this.maxlength) {
            this.value = currentValue;
        }
        if (this.min !== undefined && this.value < this.min) {
            this.value = this.min;
        }
        if (this.max !== undefined && this.value > this.max) {
            this.value = this.max;
        }
        this.formatValue();
        this.onModelChange(this.value);
        this.onChange.emit();
    };
    Spinner.prototype.toFixed = function (value, precision) {
        var power = Math.pow(10, precision || 0);
        return String(Math.round(value * power) / power);
    };
    Spinner.prototype.onUpButtonMousedown = function (event, input) {
        if (!this.disabled) {
            input.focus();
            this.repeat(null, 1);
            this.updateFilledState();
        }
    };
    Spinner.prototype.onUpButtonMouseup = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onUpButtonMouseleave = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onDownButtonMousedown = function (event, input) {
        if (!this.disabled) {
            input.focus();
            this.repeat(null, -1);
            this.updateFilledState();
        }
    };
    Spinner.prototype.onDownButtonMouseup = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onDownButtonMouseleave = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onInputKeydown = function (event) {
        if (event.which == 38) {
            this.spin(1);
            event.preventDefault();
        }
        else if (event.which == 40) {
            this.spin(-1);
            event.preventDefault();
        }
    };
    Spinner.prototype.onInputKeyPress = function (event) {
        var inputChar = String.fromCharCode(event.charCode);
        if (!this.keyPattern.test(inputChar) && inputChar != this.decimalSeparator && event.keyCode != 9 && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 46) {
            event.preventDefault();
        }
    };
    Spinner.prototype.onInput = function (event, inputValue) {
        this.value = this.parseValue(inputValue);
        this.formatValue();
        this.onModelChange(this.value);
        this.updateFilledState();
    };
    Spinner.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    Spinner.prototype.onFocus = function () {
        this.focus = true;
    };
    Spinner.prototype.parseValue = function (val) {
        var value;
        if (this.formatInput) {
            val = val.split(this.thousandSeparator).join('');
        }
        if (val.trim() === '') {
            value = this.min !== undefined ? this.min : null;
        }
        else {
            if (this.precision) {
                value = parseFloat(val.replace(',', '.'));
            }
            else {
                value = parseInt(val);
            }
            if (!isNaN(value)) {
                if (this.max !== undefined && value > this.max) {
                    value = this.max;
                }
                if (this.min !== undefined && value < this.min) {
                    value = this.min;
                }
            }
            else {
                value = null;
            }
        }
        return value;
    };
    Spinner.prototype.formatValue = function () {
        if (this.value !== null && this.value !== undefined) {
            var textValue = String(this.value).replace('.', this.decimalSeparator);
            if (this.formatInput) {
                textValue = textValue.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandSeparator);
            }
            this.valueAsString = textValue;
        }
        else {
            this.valueAsString = '';
        }
    };
    Spinner.prototype.handleChange = function (event) {
        this.onChange.emit(event);
    };
    Spinner.prototype.clearTimer = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    };
    Spinner.prototype.writeValue = function (value) {
        this.value = value;
        this.formatValue();
        this.updateFilledState();
    };
    Spinner.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Spinner.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Spinner.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Spinner.prototype.updateFilledState = function () {
        this.filled = (this.value !== undefined && this.value != null);
    };
    return Spinner;
}());
export { Spinner };
Spinner.decorators = [
    { type: Component, args: [{
                selector: 'p-spinner',
                template: "\n        <span class=\"ui-spinner ui-widget ui-corner-all\">\n            <input #in type=\"text\" [attr.id]=\"inputId\" class=\"ui-spinner-input\" [value]=\"valueAsString\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\"\n            [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [attr.placeholder]=\"placeholder\" [disabled]=\"disabled\" [readonly]=\"readonly\"\n            (keydown)=\"onInputKeydown($event)\" (keyup)=\"onInput($event,in.value)\" (keypress)=\"onInputKeyPress($event)\" (blur)=\"onInputBlur($event)\" (change)=\"handleChange($event)\" (focus)=\"onFocus()\">\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled\"\n                (mouseleave)=\"onUpButtonMouseleave($event)\" (mousedown)=\"onUpButtonMousedown($event,in)\" (mouseup)=\"onUpButtonMouseup($event)\">\n                <span class=\"fa fa-caret-up\"></span>\n            </button>\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled\"\n                (mouseleave)=\"onDownButtonMouseleave($event)\" (mousedown)=\"onDownButtonMousedown($event,in)\" (mouseup)=\"onDownButtonMouseup($event)\">\n                <span class=\"fa fa-caret-down\"></span>\n            </button>\n        </span>\n    ",
                host: {
                    '[class.ui-inputwrapper-filled]': 'filled',
                    '[class.ui-inputwrapper-focus]': 'focus'
                },
                providers: [DomHandler, SPINNER_VALUE_ACCESSOR],
            },] },
];
/** @nocollapse */
Spinner.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
]; };
Spinner.propDecorators = {
    'onChange': [{ type: Output },],
    'onBlur': [{ type: Output },],
    'step': [{ type: Input },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'maxlength': [{ type: Input },],
    'size': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'inputId': [{ type: Input },],
    'disabled': [{ type: Input },],
    'readonly': [{ type: Input },],
    'decimalSeparator': [{ type: Input },],
    'thousandSeparator': [{ type: Input },],
    'tabindex': [{ type: Input },],
    'formatInput': [{ type: Input },],
};
var SpinnerModule = (function () {
    function SpinnerModule() {
    }
    return SpinnerModule;
}());
export { SpinnerModule };
SpinnerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, InputTextModule],
                exports: [Spinner],
                declarations: [Spinner]
            },] },
];
/** @nocollapse */
SpinnerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=spinner.js.map