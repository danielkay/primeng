import { NgModule, Component, ElementRef, Input, Output, Renderer2, EventEmitter, IterableDiffers, forwardRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/ObjectUtils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiSelect; }),
    multi: true
};
var MultiSelect = (function () {
    function MultiSelect(el, domHandler, renderer, differs, objectUtils) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.objectUtils = objectUtils;
        this.onChange = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.scrollHeight = '200px';
        this.defaultLabel = 'Choose';
        this.filter = true;
        this.displaySelectedLabel = true;
        this.maxSelectedLabels = 3;
        this.selectedItemsLabel = '{0} items selected';
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.valueDiffer = differs.find([]).create(null);
        this.optionsDiffer = differs.find([]).create(null);
    }
    MultiSelect.prototype.ngOnInit = function () {
        var _this = this;
        this.updateLabel();
        this.documentClickListener = this.renderer.listen('document', 'click', function () {
            if (!_this.selfClick && !_this.panelClick && _this.overlayVisible) {
                _this.hide();
            }
            _this.selfClick = false;
            _this.panelClick = false;
        });
    };
    MultiSelect.prototype.ngAfterViewInit = function () {
        this.container = this.containerViewChild.nativeElement;
        this.panel = this.panelViewChild.nativeElement;
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                this.domHandler.appendChild(this.panel, this.appendTo);
        }
        if (this.overlayVisible) {
            this.show();
        }
    };
    MultiSelect.prototype.ngAfterViewChecked = function () {
        if (this.filtered) {
            if (this.appendTo)
                this.domHandler.absolutePosition(this.panel, this.container);
            else
                this.domHandler.relativePosition(this.panel, this.container);
            this.filtered = false;
        }
    };
    MultiSelect.prototype.ngDoCheck = function () {
        var valueChanges = this.valueDiffer.diff(this.value);
        var optionChanges = this.optionsDiffer.diff(this.options);
        if (valueChanges || optionChanges) {
            this.updateLabel();
        }
    };
    MultiSelect.prototype.writeValue = function (value) {
        this.value = value;
        this.updateLabel();
    };
    MultiSelect.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    MultiSelect.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    MultiSelect.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    MultiSelect.prototype.onItemClick = function (event, value) {
        var selectionIndex = this.findSelectionIndex(value);
        if (selectionIndex != -1)
            this.value = this.value.filter(function (val, i) { return i != selectionIndex; });
        else
            this.value = (this.value || []).concat([value]);
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
    };
    MultiSelect.prototype.isSelected = function (value) {
        return this.findSelectionIndex(value) != -1;
    };
    MultiSelect.prototype.findSelectionIndex = function (val) {
        var index = -1;
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.objectUtils.equals(this.value[i], val, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    MultiSelect.prototype.toggleAll = function (event, checkbox) {
        if (checkbox.checked) {
            this.value = [];
        }
        else {
            var opts = this.getVisibleOptions();
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
    MultiSelect.prototype.isAllChecked = function () {
        if (this.filterValue && this.filterValue.trim().length)
            return this.value && this.visibleOptions && this.visibleOptions.length && (this.value.length == this.visibleOptions.length);
        else
            return this.value && this.options && (this.value.length == this.options.length);
    };
    MultiSelect.prototype.show = function () {
        this.overlayVisible = true;
        this.panel.style.zIndex = String(++DomHandler.zindex);
        if (this.appendTo)
            this.domHandler.absolutePosition(this.panel, this.container);
        else
            this.domHandler.relativePosition(this.panel, this.container);
        this.domHandler.fadeIn(this.panel, 250);
    };
    MultiSelect.prototype.hide = function () {
        this.overlayVisible = false;
    };
    MultiSelect.prototype.close = function (event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    };
    MultiSelect.prototype.onMouseclick = function (event, input) {
        if (this.disabled) {
            return;
        }
        if (!this.panelClick) {
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                input.focus();
                this.show();
            }
        }
        this.selfClick = true;
    };
    MultiSelect.prototype.onFocus = function (event) {
        this.focus = true;
    };
    MultiSelect.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onBlur.emit({ originalEvent: event });
        this.onModelTouched();
    };
    MultiSelect.prototype.updateLabel = function () {
        if (this.value && this.options && this.value.length && this.displaySelectedLabel) {
            var label = '';
            for (var i = 0; i < this.value.length; i++) {
                if (i != 0) {
                    label = label + ', ';
                }
                label = label + this.findLabelByValue(this.value[i]);
            }
            if (this.value.length <= this.maxSelectedLabels) {
                this.valuesAsString = label;
            }
            else {
                var pattern = /{(.*?)}/, newSelectedItemsLabel = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                this.valuesAsString = newSelectedItemsLabel;
            }
        }
        else {
            this.valuesAsString = this.defaultLabel;
        }
    };
    MultiSelect.prototype.findLabelByValue = function (val) {
        var label = null;
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            if (option.value == val) {
                label = option.label;
                break;
            }
        }
        return label;
    };
    MultiSelect.prototype.onFilter = function (event) {
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
    MultiSelect.prototype.isItemVisible = function (option) {
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
    MultiSelect.prototype.getVisibleOptions = function () {
        if (this.filterValue && this.filterValue.trim().length) {
            var items = [];
            for (var i = 0; i < this.options.length; i++) {
                var option = this.options[i];
                if (option.label.toLowerCase().includes(this.filterValue.toLowerCase())) {
                    items.push(option);
                }
            }
            return items;
        }
        else {
            return this.options;
        }
    };
    MultiSelect.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
        if (this.appendTo) {
            this.container.appendChild(this.panel);
        }
    };
    return MultiSelect;
}());
export { MultiSelect };
MultiSelect.decorators = [
    { type: Component, args: [{
                selector: 'p-multiSelect',
                template: "\n        <div #container [ngClass]=\"{'ui-multiselect ui-widget ui-state-default ui-corner-all':true,'ui-state-focus':focus,'ui-state-disabled': disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\"\n            (click)=\"onMouseclick($event,in)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in type=\"text\" readonly=\"readonly\" [attr.id]=\"inputId\" (focus)=\"onFocus($event)\" (blur)=\"onInputBlur($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\">\n            </div>\n            <div class=\"ui-multiselect-label-container\" [title]=\"valuesAsString\">\n                <label class=\"ui-multiselect-label ui-corner-all\">{{valuesAsString}}</label>\n            </div>\n            <div [ngClass]=\"{'ui-multiselect-trigger ui-state-default ui-corner-right':true}\">\n                <span class=\"fa fa-fw fa-caret-down ui-c\"></span>\n            </div>\n            <div #panel class=\"ui-multiselect-panel ui-widget ui-widget-content ui-corner-all ui-shadow\" [style.display]=\"overlayVisible ? 'block' : 'none'\" (click)=\"panelClick=true\">\n                <div class=\"ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix\">\n                    <div class=\"ui-chkbox ui-widget\">\n                        <div class=\"ui-helper-hidden-accessible\">\n                            <input #cb type=\"checkbox\" readonly=\"readonly\" [checked]=\"isAllChecked()\">\n                        </div>\n                        <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isAllChecked()}\" (click)=\"toggleAll($event,cb)\">\n                            <span class=\"ui-chkbox-icon ui-c\" [ngClass]=\"{'fa fa-check':isAllChecked()}\"></span>\n                        </div>\n                    </div>\n                    <div class=\"ui-multiselect-filter-container\" *ngIf=\"filter\">\n                        <input type=\"text\" role=\"textbox\" (input)=\"onFilter($event)\"\n                                    class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\">\n                        <span class=\"fa fa-fw fa-search\"></span>\n                    </div>\n                    <a class=\"ui-multiselect-close ui-corner-all\" href=\"#\" (click)=\"close($event)\">\n                        <span class=\"fa fa-close\"></span>\n                    </a>\n                </div>\n                <div class=\"ui-multiselect-items-wrapper\">\n                    <ul class=\"ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\" [style.max-height]=\"scrollHeight||'auto'\">\n                        <li *ngFor=\"let option of options\" class=\"ui-multiselect-item ui-corner-all\" (click)=\"onItemClick($event,option.value)\" \n                            [style.display]=\"isItemVisible(option) ? 'block' : 'none'\" [ngClass]=\"{'ui-state-highlight':isSelected(option.value)}\">\n                            <div class=\"ui-chkbox ui-widget\">\n                                <div class=\"ui-helper-hidden-accessible\">\n                                    <input type=\"checkbox\" readonly=\"readonly\" [checked]=\"isSelected(option.value)\">\n                                </div>\n                                <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isSelected(option.value)}\">\n                                    <span class=\"ui-chkbox-icon ui-c\" [ngClass]=\"{'fa fa-check':isSelected(option.value)}\"></span>\n                                </div>\n                            </div>\n                            <label>{{option.label}}</label>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
                providers: [DomHandler, ObjectUtils, MULTISELECT_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
MultiSelect.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
    { type: Renderer2, },
    { type: IterableDiffers, },
    { type: ObjectUtils, },
]; };
MultiSelect.propDecorators = {
    'options': [{ type: Input },],
    'onChange': [{ type: Output },],
    'onBlur': [{ type: Output },],
    'scrollHeight': [{ type: Input },],
    'defaultLabel': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'inputId': [{ type: Input },],
    'disabled': [{ type: Input },],
    'filter': [{ type: Input },],
    'overlayVisible': [{ type: Input },],
    'tabindex': [{ type: Input },],
    'appendTo': [{ type: Input },],
    'dataKey': [{ type: Input },],
    'displaySelectedLabel': [{ type: Input },],
    'maxSelectedLabels': [{ type: Input },],
    'selectedItemsLabel': [{ type: Input },],
    'containerViewChild': [{ type: ViewChild, args: ['container',] },],
    'panelViewChild': [{ type: ViewChild, args: ['panel',] },],
};
var MultiSelectModule = (function () {
    function MultiSelectModule() {
    }
    return MultiSelectModule;
}());
export { MultiSelectModule };
MultiSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [MultiSelect],
                declarations: [MultiSelect]
            },] },
];
/** @nocollapse */
MultiSelectModule.ctorParameters = function () { return []; };
//# sourceMappingURL=multiselect.js.map