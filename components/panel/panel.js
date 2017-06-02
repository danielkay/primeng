import { NgModule, Component, Input, Output, EventEmitter, ElementRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Footer } from '../common/shared';
import { trigger, state, style, transition, animate } from '@angular/animations';
var Panel = (function () {
    function Panel(el) {
        this.el = el;
        this.collapsed = false;
        this.expandIcon = 'fa-plus';
        this.collapseIcon = 'fa-minus';
        this.collapsedChange = new EventEmitter();
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
    }
    Panel.prototype.toggle = function (event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.toggleable) {
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        event.preventDefault();
    };
    Panel.prototype.expand = function (event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    };
    Panel.prototype.collapse = function (event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    };
    Panel.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Panel.prototype.onToggleDone = function (event) {
        this.animating = false;
    };
    return Panel;
}());
export { Panel };
Panel.decorators = [
    { type: Component, args: [{
                selector: 'p-panel',
                template: "\n        <div [ngClass]=\"'ui-panel ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all\">\n                <span class=\"ui-panel-title\" *ngIf=\"header\">{{header}}</span>\n                <ng-content select=\"p-header\"></ng-content>\n                <a *ngIf=\"toggleable\" class=\"ui-panel-titlebar-icon ui-panel-titlebar-toggler ui-corner-all ui-state-default\" href=\"#\"\n                    (click)=\"toggle($event)\">\n                    <span [class]=\"collapsed ? 'fa fa-fw ' + expandIcon : 'fa fa-fw ' + collapseIcon\"></span>\n                </a>\n            </div>\n            <div class=\"ui-panel-content-wrapper\" [@panelContent]=\"collapsed ? 'hidden' : 'visible'\" (@panelContent.done)=\"onToggleDone($event)\"\n                [ngClass]=\"{'ui-panel-content-wrapper-overflown': collapsed||animating}\">\n                <div class=\"ui-panel-content ui-widget-content\">\n                    <ng-content></ng-content>\n                </div>\n            </div>\n            <div class=\"ui-panel-footer ui-widget-content\" *ngIf=\"footerFacet\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    ",
                animations: [
                    trigger('panelContent', [
                        state('hidden', style({
                            height: '0'
                        })),
                        state('visible', style({
                            height: '*'
                        })),
                        transition('visible <=> hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
                    ])
                ]
            },] },
];
/** @nocollapse */
Panel.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
Panel.propDecorators = {
    'toggleable': [{ type: Input },],
    'header': [{ type: Input },],
    'collapsed': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'expandIcon': [{ type: Input },],
    'collapseIcon': [{ type: Input },],
    'collapsedChange': [{ type: Output },],
    'onBeforeToggle': [{ type: Output },],
    'onAfterToggle': [{ type: Output },],
    'footerFacet': [{ type: ContentChild, args: [Footer,] },],
};
var PanelModule = (function () {
    function PanelModule() {
    }
    return PanelModule;
}());
export { PanelModule };
PanelModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Panel, SharedModule],
                declarations: [Panel]
            },] },
];
/** @nocollapse */
PanelModule.ctorParameters = function () { return []; };
//# sourceMappingURL=panel.js.map