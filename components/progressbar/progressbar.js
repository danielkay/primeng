import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
var ProgressBar = (function () {
    function ProgressBar() {
        this.showValue = true;
        this.unit = '%';
    }
    return ProgressBar;
}());
export { ProgressBar };
ProgressBar.decorators = [
    { type: Component, args: [{
                selector: 'p-progressBar',
                template: "\n        <div class=\"ui-progressbar ui-widget ui-widget-content ui-corner-all\" role=\"progressbar\" aria-valuemin=\"0\" [attr.aria-valuenow]=\"value\" aria-valuemax=\"100\">\n            <div class=\"ui-progressbar-value ui-progressbar-value-animate ui-widget-header ui-corner-all\" [style.width]=\"value + '%'\" style=\"display:block\"></div>\n            <div class=\"ui-progressbar-label\" [style.display]=\"value ? 'block' : 'none'\" *ngIf=\"showValue\">{{value}}{{unit}}</div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
ProgressBar.ctorParameters = function () { return []; };
ProgressBar.propDecorators = {
    'value': [{ type: Input },],
    'showValue': [{ type: Input },],
    'unit': [{ type: Input },],
};
var ProgressBarModule = (function () {
    function ProgressBarModule() {
    }
    return ProgressBarModule;
}());
export { ProgressBarModule };
ProgressBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [ProgressBar],
                declarations: [ProgressBar]
            },] },
];
/** @nocollapse */
ProgressBarModule.ctorParameters = function () { return []; };
//# sourceMappingURL=progressbar.js.map