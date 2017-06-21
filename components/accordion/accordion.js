import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChildren } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Header } from '../common/shared';
var Accordion = (function () {
    function Accordion(el) {
        this.el = el;
        this.onClose = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.tabs = [];
    }
    Accordion.prototype.addTab = function (tab) {
        this.tabs.push(tab);
    };
    Accordion.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Object.defineProperty(Accordion.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex;
        },
        set: function (val) {
            this._activeIndex = val;
            if (this.tabs && this.tabs.length && this._activeIndex != null) {
                for (var i = 0; i < this.tabs.length; i++) {
                    var selected = this.multiple ? this._activeIndex.includes(i) : (i === this._activeIndex);
                    var changed = selected !== this.tabs[i].selected;
                    if (changed) {
                        this.tabs[i].animating = true;
                    }
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return Accordion;
}());
export { Accordion };
Accordion.decorators = [
    { type: Component, args: [{
                selector: 'p-accordion',
                template: "\n        <div [ngClass]=\"'ui-accordion ui-widget ui-helper-reset'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ng-content></ng-content>\n        </div>\n    ",
            },] },
];
/** @nocollapse */
Accordion.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
Accordion.propDecorators = {
    'multiple': [{ type: Input },],
    'onClose': [{ type: Output },],
    'onOpen': [{ type: Output },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'lazy': [{ type: Input },],
    'activeIndex': [{ type: Input },],
};
var AccordionTab = (function () {
    function AccordionTab(accordion) {
        this.accordion = accordion;
        this.selectedChange = new EventEmitter();
        this.accordion.addTab(this);
    }
    AccordionTab.prototype.toggle = function (event) {
        if (this.disabled || this.animating) {
            return false;
        }
        this.animating = true;
        var index = this.findTabIndex();
        if (this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                    this.accordion.tabs[i].selectedChange.emit(false);
                }
            }
            this.selected = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }
        this.selectedChange.emit(this.selected);
        event.preventDefault();
    };
    AccordionTab.prototype.findTabIndex = function () {
        var index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    };
    Object.defineProperty(AccordionTab.prototype, "lazy", {
        get: function () {
            return this.accordion.lazy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionTab.prototype, "hasHeaderFacet", {
        get: function () {
            return this.headerFacet && this.headerFacet.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    AccordionTab.prototype.onToggleDone = function (event) {
        this.animating = false;
    };
    return AccordionTab;
}());
export { AccordionTab };
AccordionTab.decorators = [
    { type: Component, args: [{
                selector: 'p-accordionTab',
                template: "\n        <div class=\"ui-accordion-header ui-state-default ui-corner-all\" [ngClass]=\"{'ui-state-active': selected,'ui-state-disabled':disabled}\"\n            (click)=\"toggle($event)\">\n            <span class=\"fa fa-fw\" [ngClass]=\"{'fa-caret-down': selected, 'fa-caret-right': !selected}\"></span>\n            <a href=\"#\" *ngIf=\"!hasHeaderFacet\" role=\"tab\" [attr.aria-expanded]=\"selected\" [attr.aria-selected]=\"selected\">{{header}}</a>\n            <a href=\"#\" *ngIf=\"hasHeaderFacet\" role=\"tab\" [attr.aria-expanded]=\"selected\" [attr.aria-selected]=\"selected\">\n                <ng-content select=\"p-header\"></ng-content>\n            </a>\n        </div>\n        <div class=\"ui-accordion-content-wrapper\" [@tabContent]=\"selected ? 'visible' : 'hidden'\" (@tabContent.done)=\"onToggleDone($event)\"\n            [ngClass]=\"{'ui-accordion-content-wrapper-overflown': !selected||animating}\" role=\"tabpanel\" [attr.aria-hidden]=\"!selected\">\n            <div class=\"ui-accordion-content ui-widget-content\" *ngIf=\"lazy ? selected : true\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
                animations: [
                    trigger('tabContent', [
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
AccordionTab.ctorParameters = function () { return [
    { type: Accordion, },
]; };
AccordionTab.propDecorators = {
    'header': [{ type: Input },],
    'selected': [{ type: Input },],
    'disabled': [{ type: Input },],
    'selectedChange': [{ type: Output },],
    'headerFacet': [{ type: ContentChildren, args: [Header,] },],
};
var AccordionModule = (function () {
    function AccordionModule() {
    }
    return AccordionModule;
}());
export { AccordionModule };
AccordionModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Accordion, AccordionTab],
                declarations: [Accordion, AccordionTab]
            },] },
];
/** @nocollapse */
AccordionModule.ctorParameters = function () { return []; };
//# sourceMappingURL=accordion.js.map