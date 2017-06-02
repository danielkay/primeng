import { NgModule, Directive, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
var InputText = (function () {
    function InputText(el) {
        this.el = el;
    }
    InputText.prototype.ngDoCheck = function () {
        this.updateFilledState();
    };
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    InputText.prototype.onInput = function (e) {
        this.updateFilledState();
    };
    InputText.prototype.updateFilledState = function () {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    };
    return InputText;
}());
export { InputText };
InputText.decorators = [
    { type: Directive, args: [{
                selector: '[pInputText]',
                host: {
                    '[class.ui-inputtext]': 'true',
                    '[class.ui-corner-all]': 'true',
                    '[class.ui-state-default]': 'true',
                    '[class.ui-widget]': 'true',
                    '[class.ui-state-filled]': 'filled'
                }
            },] },
];
/** @nocollapse */
InputText.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
InputText.propDecorators = {
    'onInput': [{ type: HostListener, args: ['input', ['$event'],] },],
};
var InputTextModule = (function () {
    function InputTextModule() {
    }
    return InputTextModule;
}());
export { InputTextModule };
InputTextModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [InputText],
                declarations: [InputText]
            },] },
];
/** @nocollapse */
InputTextModule.ctorParameters = function () { return []; };
//# sourceMappingURL=inputtext.js.map