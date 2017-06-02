import { NgModule, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button';
var InplaceDisplay = (function () {
    function InplaceDisplay() {
    }
    return InplaceDisplay;
}());
export { InplaceDisplay };
InplaceDisplay.decorators = [
    { type: Component, args: [{
                selector: 'p-inplaceDisplay',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
InplaceDisplay.ctorParameters = function () { return []; };
var InplaceContent = (function () {
    function InplaceContent() {
    }
    return InplaceContent;
}());
export { InplaceContent };
InplaceContent.decorators = [
    { type: Component, args: [{
                selector: 'p-inplaceContent',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
InplaceContent.ctorParameters = function () { return []; };
var Inplace = (function () {
    function Inplace() {
        this.onActivate = new EventEmitter();
        this.onDeactivate = new EventEmitter();
    }
    Inplace.prototype.activate = function (event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
        }
    };
    Inplace.prototype.deactivate = function (event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
        }
    };
    return Inplace;
}());
export { Inplace };
Inplace.decorators = [
    { type: Component, args: [{
                selector: 'p-inplace',
                template: "\n        <div [ngClass]=\"'ui-inplace ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inplace-display\" (click)=\"activate($event)\"\n                [ngClass]=\"{'ui-state-disabled':disabled}\" *ngIf=\"!active\">\n                <ng-content select=\"[pInplaceDisplay]\"></ng-content>\n            </div>\n            <div class=\"ui-inplace-content\" *ngIf=\"active\">\n                <ng-content select=\"[pInplaceContent]\"></ng-content>\n                <button type=\"button\" icon=\"fa-close\" pButton (click)=\"deactivate($event)\" *ngIf=\"closable\"></button>\n            </div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
Inplace.ctorParameters = function () { return []; };
Inplace.propDecorators = {
    'active': [{ type: Input },],
    'closable': [{ type: Input },],
    'disabled': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'onActivate': [{ type: Output },],
    'onDeactivate': [{ type: Output },],
};
var InplaceModule = (function () {
    function InplaceModule() {
    }
    return InplaceModule;
}());
export { InplaceModule };
InplaceModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ButtonModule],
                exports: [Inplace, InplaceDisplay, InplaceContent, ButtonModule],
                declarations: [Inplace, InplaceDisplay, InplaceContent]
            },] },
];
/** @nocollapse */
InplaceModule.ctorParameters = function () { return []; };
//# sourceMappingURL=inplace.js.map