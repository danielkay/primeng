import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChildren, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/ObjectUtils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var LISTBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Listbox; }),
    multi: true
};
var Listbox = (function () {
    function Listbox(el, domHandler, objectUtils) {
        this.el = el;
        this.domHandler = domHandler;
        this.objectUtils = objectUtils;
        this.checkbox = false;
        this.filter = false;
        this.metaKeySelection = true;
        this.onChange = new EventEmitter();
        this.onDblClick = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Listbox.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Listbox.prototype.writeValue = function (value) {
        this.value = value;
    };
    Listbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Listbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Listbox.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Listbox.prototype.onOptionClick = function (event, option) {
        if (this.disabled) {
            return;
        }
        if (!this.checkboxClick) {
            if (this.multiple)
                this.onOptionClickMultiple(event, option);
            else
                this.onOptionClickSingle(event, option);
        }
        else {
            this.checkboxClick = false;
        }
        this.optionTouched = false;
    };
    Listbox.prototype.onOptionTouchEnd = function (event, option) {
        if (this.disabled) {
            return;
        }
        this.optionTouched = true;
    };
    Listbox.prototype.onOptionClickSingle = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.value = null;
                    valueChanged = true;
                }
            }
            else {
                this.value = option.value;
                valueChanged = true;
            }
        }
        else {
            this.value = selected ? null : option.value;
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.onOptionClickMultiple = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.removeOption(option);
                }
                else {
                    this.value = [option.value];
                }
                valueChanged = true;
            }
            else {
                this.value = (metaKey) ? this.value || [] : [];
                this.value = this.value.concat([option.value]);
                valueChanged = true;
            }
        }
        else {
            if (selected) {
                this.removeOption(option);
            }
            else {
                this.value = (this.value || []).concat([option.value]);
            }
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.removeOption = function (option) {
        var _this = this;
        this.value = this.value.filter(function (val) { return !_this.objectUtils.equals(val, option.value, _this.dataKey); });
    };
    Listbox.prototype.isSelected = function (option) {
        var selected = false;
        if (this.multiple) {
            if (this.value) {
                for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
                    var val = _a[_i];
                    if (this.objectUtils.equals(val, option.value, this.dataKey)) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        else {
            selected = this.objectUtils.equals(this.value, option.value, this.dataKey);
        }
        return selected;
    };
    Object.defineProperty(Listbox.prototype, "allChecked", {
        get: function () {
            if (this.filterValue && this.filterValue.trim().length)
                return this.allFilteredSelected();
            else
                return this.value && this.options && (this.value.length == this.options.length);
        },
        enumerable: true,
        configurable: true
    });
    Listbox.prototype.allFilteredSelected = function () {
        var allSelected;
        if (this.value && this.visibleOptions && this.visibleOptions.length) {
            allSelected = true;
            for (var _i = 0, _a = this.visibleOptions; _i < _a.length; _i++) {
                var opt = _a[_i];
                var selected = void 0;
                for (var _b = 0, _c = this.value; _b < _c.length; _b++) {
                    var val = _c[_b];
                    if (this.objectUtils.equals(val, opt.value, this.dataKey)) {
                        selected = true;
                    }
                }
                if (!selected) {
                    allSelected = false;
                    break;
                }
            }
        }
        return allSelected;
    };
    Listbox.prototype.onFilter = function (event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.visibleOptions = [];
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            if (option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1) {
                this.visibleOptions.push(option);
            }
        }
        this.filtered = true;
    };
    Listbox.prototype.toggleAll = function (event, checkbox) {
        if (this.disabled || (this.filterValue && this.filterValue.trim().length && (!this.visibleOptions || this.visibleOptions.length === 0))) {
            return;
        }
        if (checkbox.checked) {
            this.value = [];
        }
        else {
            var opts = (this.visibleOptions && this.visibleOptions.length) ? this.visibleOptions : this.options;
            if (opts) {
                this.value = [];
                for (var i = 0; i < opts.length; i++) {
                    this.value.push(opts[i].value);
                }
            }
        }
        checkbox.checked = !checkbox.checked;
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
    };
    Listbox.prototype.isItemVisible = function (option) {
        if (this.filterValue && this.filterValue.trim().length) {
            for (var i = 0; i < this.visibleOptions.length; i++) {
                if (this.visibleOptions[i].value == option.value) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };
    Listbox.prototype.onDoubleClick = function (event, option) {
        if (this.disabled) {
            return;
        }
        this.onDblClick.emit({
            originalEvent: event,
            value: this.value
        });
    };
    Listbox.prototype.onCheckboxClick = function (event, option) {
        if (this.disabled) {
            return;
        }
        this.checkboxClick = true;
        var selected = this.isSelected(option);
        if (selected) {
            this.removeOption(option);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value = this.value.concat([option.value]);
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    return Listbox;
}());
export { Listbox };
Listbox.decorators = [
    { type: Component, args: [{
                selector: 'p-listbox',
                template: "\n        <div [ngClass]=\"{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix\" *ngIf=\"(checkbox && multiple) || filter\">\n                <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple\">\n                    <div class=\"ui-helper-hidden-accessible\">\n                        <input #cb type=\"checkbox\" readonly=\"readonly\" [checked]=\"allChecked\">\n                    </div>\n                    <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':allChecked}\" (click)=\"toggleAll($event,cb)\">\n                        <span class=\"ui-chkbox-icon ui-c\" [ngClass]=\"{'fa fa-check':allChecked}\"></span>\n                    </div>\n                </div>\n                <div class=\"ui-listbox-filter-container\" *ngIf=\"filter\">\n                    <input type=\"text\" role=\"textbox\" (input)=\"onFilter($event)\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [disabled]=\"disabled\">\n                    <span class=\"fa fa-search\"></span>\n                </div>\n            </div>\n            <ul class=\"ui-listbox-list\">\n                <li *ngFor=\"let option of options; let i = index;\" [style.display]=\"isItemVisible(option) ? 'block' : 'none'\"\n                    [ngClass]=\"{'ui-listbox-item ui-corner-all':true,'ui-state-highlight':isSelected(option)}\"\n                    (click)=\"onOptionClick($event,option)\" (dblclick)=\"onDoubleClick($event,option)\" (touchend)=\"onOptionTouchEnd($event,option)\">\n                    <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple\" (click)=\"onCheckboxClick($event,option)\">\n                        <div class=\"ui-helper-hidden-accessible\">\n                            <input type=\"checkbox\" [checked]=\"isSelected(option)\" [disabled]=\"disabled\">\n                        </div>\n                        <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isSelected(option)}\">\n                            <span class=\"ui-chkbox-icon ui-c\" [ngClass]=\"{'fa fa-check':isSelected(option)}\"></span>\n                        </div>\n                    </div>\n                    <span *ngIf=\"!itemTemplate\">{{option.label}}</span>\n                    <ng-template *ngIf=\"itemTemplate\" [pTemplateWrapper]=\"itemTemplate\" [item]=\"option\" [index]=\"i\"></ng-template>\n                </li>\n            </ul>\n        </div>\n    ",
                providers: [DomHandler, ObjectUtils, LISTBOX_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
Listbox.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
    { type: ObjectUtils, },
]; };
Listbox.propDecorators = {
    'options': [{ type: Input },],
    'multiple': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'disabled': [{ type: Input },],
    'checkbox': [{ type: Input },],
    'filter': [{ type: Input },],
    'metaKeySelection': [{ type: Input },],
    'dataKey': [{ type: Input },],
    'onChange': [{ type: Output },],
    'onDblClick': [{ type: Output },],
    'templates': [{ type: ContentChildren, args: [PrimeTemplate,] },],
};
var ListboxModule = (function () {
    function ListboxModule() {
    }
    return ListboxModule;
}());
export { ListboxModule };
ListboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, SharedModule],
                exports: [Listbox, SharedModule],
                declarations: [Listbox]
            },] },
];
/** @nocollapse */
ListboxModule.ctorParameters = function () { return []; };
//# sourceMappingURL=listbox.js.map