import { NgModule, Component, Input, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var BlockUI = (function () {
    function BlockUI(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
    }
    Object.defineProperty(BlockUI.prototype, "blocked", {
        get: function () {
            return this._blocked;
        },
        set: function (val) {
            this._blocked = val;
            if (this.mask.nativeElement) {
                if (this._blocked)
                    this.block();
                else
                    this.unblock();
            }
        },
        enumerable: true,
        configurable: true
    });
    BlockUI.prototype.ngAfterViewInit = function () {
        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    };
    BlockUI.prototype.block = function () {
        if (this.target) {
            this.target.getBlockableElement().appendChild(this.mask.nativeElement);
            var style = this.target.style || {};
            style.position = 'relative';
            this.target.style = style;
        }
        else {
            document.body.appendChild(this.mask.nativeElement);
        }
        this.mask.nativeElement.style.zIndex = String(++DomHandler.zindex);
    };
    BlockUI.prototype.unblock = function () {
        this.el.nativeElement.appendChild(this.mask.nativeElement);
    };
    BlockUI.prototype.ngOnDestroy = function () {
    };
    return BlockUI;
}());
export { BlockUI };
BlockUI.decorators = [
    { type: Component, args: [{
                selector: 'p-blockUI',
                template: "\n        <div #mask class=\"ui-blockui ui-widget-overlay\" [ngClass]=\"{'ui-blockui-document':!target}\" [ngStyle]=\"{display: blocked ? 'block' : 'none'}\">\n            <ng-content></ng-content>\n        </div>\n    ",
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
BlockUI.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
]; };
BlockUI.propDecorators = {
    'target': [{ type: Input },],
    'mask': [{ type: ViewChild, args: ['mask',] },],
    'blocked': [{ type: Input },],
};
var BlockUIModule = (function () {
    function BlockUIModule() {
    }
    return BlockUIModule;
}());
export { BlockUIModule };
BlockUIModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [BlockUI],
                declarations: [BlockUI]
            },] },
];
/** @nocollapse */
BlockUIModule.ctorParameters = function () { return []; };
//# sourceMappingURL=blockui.js.map