import { NgModule, Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared';
var Fieldset = (function () {
    function Fieldset(el) {
        this.el = el;
        this.collapsed = false;
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
    }
    Fieldset.prototype.toggle = function (event) {
        var _this = this;
        if (this.toggleable) {
            this.animating = true;
            this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
            this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            //TODO: Use onDone of animate callback instead with RC6
            setTimeout(function () {
                _this.animating = false;
            }, 400);
        }
    };
    Fieldset.prototype.expand = function (event) {
        this.collapsed = false;
    };
    Fieldset.prototype.collapse = function (event) {
        this.collapsed = true;
    };
    Fieldset.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    return Fieldset;
}());
export { Fieldset };
Fieldset.decorators = [
    { type: Component, args: [{
                selector: 'p-fieldset',
                template: "\n        <fieldset [ngClass]=\"{'ui-fieldset ui-widget ui-widget-content ui-corner-all': true, 'ui-fieldset-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <legend class=\"ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text\" (click)=\"toggle($event)\">\n                <span *ngIf=\"toggleable\" class=\"ui-fieldset-toggler fa fa-w\" [ngClass]=\"{'fa-minus': !collapsed,'fa-plus':collapsed}\"></span>\n                {{legend}}\n                <ng-content select=\"p-header\"></ng-content>\n            </legend>\n            <div class=\"ui-fieldset-content-wrapper\" [@fieldsetContent]=\"collapsed ? 'hidden' : 'visible'\" \n                        [ngClass]=\"{'ui-fieldset-content-wrapper-overflown': collapsed||animating}\">\n                <div class=\"ui-fieldset-content\">\n                    <ng-content></ng-content>\n                </div>\n            </div>\n        </fieldset>\n    ",
                animations: [
                    trigger('fieldsetContent', [
                        state('hidden', style({
                            height: '0px'
                        })),
                        state('visible', style({
                            height: '*'
                        })),
                        transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
                        transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
                    ])
                ]
            },] },
];
/** @nocollapse */
Fieldset.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
Fieldset.propDecorators = {
    'legend': [{ type: Input },],
    'toggleable': [{ type: Input },],
    'collapsed': [{ type: Input },],
    'onBeforeToggle': [{ type: Output },],
    'onAfterToggle': [{ type: Output },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
};
var FieldsetModule = (function () {
    function FieldsetModule() {
    }
    return FieldsetModule;
}());
export { FieldsetModule };
FieldsetModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Fieldset, SharedModule],
                declarations: [Fieldset]
            },] },
];
/** @nocollapse */
FieldsetModule.ctorParameters = function () { return []; };
//# sourceMappingURL=fieldset.js.map