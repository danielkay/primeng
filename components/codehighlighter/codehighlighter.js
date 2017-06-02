import { NgModule, Directive, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
var CodeHighlighter = (function () {
    function CodeHighlighter(el) {
        this.el = el;
    }
    CodeHighlighter.prototype.ngOnInit = function () {
        Prism.highlightElement(this.el.nativeElement);
    };
    return CodeHighlighter;
}());
export { CodeHighlighter };
CodeHighlighter.decorators = [
    { type: Directive, args: [{
                selector: '[pCode]'
            },] },
];
/** @nocollapse */
CodeHighlighter.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
var CodeHighlighterModule = (function () {
    function CodeHighlighterModule() {
    }
    return CodeHighlighterModule;
}());
export { CodeHighlighterModule };
CodeHighlighterModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [CodeHighlighter],
                declarations: [CodeHighlighter]
            },] },
];
/** @nocollapse */
CodeHighlighterModule.ctorParameters = function () { return []; };
//# sourceMappingURL=codehighlighter.js.map