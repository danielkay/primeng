import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
var Toolbar = (function () {
    function Toolbar() {
    }
    return Toolbar;
}());
export { Toolbar };
Toolbar.decorators = [
    { type: Component, args: [{
                selector: 'p-toolbar',
                template: "\n        <div [ngClass]=\"'ui-toolbar ui-widget ui-widget-header ui-corner-all ui-helper-clearfix'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ng-content></ng-content>\n        </div>\n    "
            },] },
];
/** @nocollapse */
Toolbar.ctorParameters = function () { return []; };
Toolbar.propDecorators = {
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
};
var ToolbarModule = (function () {
    function ToolbarModule() {
    }
    return ToolbarModule;
}());
export { ToolbarModule };
ToolbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Toolbar],
                declarations: [Toolbar]
            },] },
];
/** @nocollapse */
ToolbarModule.ctorParameters = function () { return []; };
//# sourceMappingURL=toolbar.js.map