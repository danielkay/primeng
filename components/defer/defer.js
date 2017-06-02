import { NgModule, Directive, ElementRef, TemplateRef, ViewContainerRef, Renderer2, EventEmitter, Output, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var DeferredLoader = (function () {
    function DeferredLoader(el, domHandler, renderer, viewContainer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.onLoad = new EventEmitter();
    }
    DeferredLoader.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.shouldLoad()) {
            this.load();
        }
        this.documentScrollListener = this.renderer.listen('window', 'scroll', function () {
            if (_this.shouldLoad()) {
                _this.load();
                _this.documentScrollListener();
                _this.documentScrollListener = null;
            }
        });
    };
    DeferredLoader.prototype.shouldLoad = function () {
        var rect = this.el.nativeElement.getBoundingClientRect();
        var docElement = document.documentElement;
        var scrollTop = (window.pageYOffset || document.documentElement.scrollTop);
        var winHeight = docElement.clientHeight;
        return (winHeight >= rect.top);
    };
    DeferredLoader.prototype.load = function () {
        this.view = this.viewContainer.createEmbeddedView(this.template);
        this.onLoad.emit();
    };
    DeferredLoader.prototype.ngOnDestroy = function () {
        this.view = null;
        if (this.documentScrollListener) {
            this.documentScrollListener();
        }
    };
    return DeferredLoader;
}());
export { DeferredLoader };
DeferredLoader.decorators = [
    { type: Directive, args: [{
                selector: '[pDefer]',
                host: {},
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
DeferredLoader.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
    { type: Renderer2, },
    { type: ViewContainerRef, },
]; };
DeferredLoader.propDecorators = {
    'onLoad': [{ type: Output },],
    'template': [{ type: ContentChild, args: [TemplateRef,] },],
};
var DeferModule = (function () {
    function DeferModule() {
    }
    return DeferModule;
}());
export { DeferModule };
DeferModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [DeferredLoader],
                declarations: [DeferredLoader]
            },] },
];
/** @nocollapse */
DeferModule.ctorParameters = function () { return []; };
//# sourceMappingURL=defer.js.map