import { NgModule, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var Tooltip = (function () {
    function Tooltip(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.tooltipPosition = 'right';
        this.tooltipEvent = 'hover';
        this.appendTo = 'body';
        this.escape = true;
    }
    Tooltip.prototype.onMouseEnter = function (e) {
        if (this.tooltipEvent === 'hover') {
            this.show();
        }
    };
    Tooltip.prototype.onMouseLeave = function (e) {
        if (this.tooltipEvent === 'hover') {
            this.hide();
        }
    };
    Tooltip.prototype.onFocus = function (e) {
        if (this.tooltipEvent === 'focus') {
            this.show();
        }
    };
    Tooltip.prototype.onBlur = function (e) {
        if (this.tooltipEvent === 'focus') {
            this.hide();
        }
    };
    Tooltip.prototype.show = function () {
        if (!this.text || this.disabled) {
            return;
        }
        this.create();
        var offset = this.el.nativeElement.getBoundingClientRect();
        var targetTop = offset.top + this.domHandler.getWindowScrollTop();
        var targetLeft = offset.left + this.domHandler.getWindowScrollLeft();
        var left;
        var top;
        this.container.style.display = 'block';
        switch (this.tooltipPosition) {
            case 'right':
                left = targetLeft + this.domHandler.getOuterWidth(this.el.nativeElement);
                top = targetTop + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
                break;
            case 'left':
                left = targetLeft - this.domHandler.getOuterWidth(this.container);
                top = targetTop + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
                break;
            case 'top':
                left = targetLeft + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
                top = targetTop - this.domHandler.getOuterHeight(this.container);
                break;
            case 'bottom':
                left = targetLeft + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
                top = targetTop + this.domHandler.getOuterHeight(this.el.nativeElement);
                break;
        }
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
        this.domHandler.fadeIn(this.container, 250);
        this.container.style.zIndex = ++DomHandler.zindex;
    };
    Tooltip.prototype.hide = function () {
        this.ngOnDestroy();
    };
    Tooltip.prototype.create = function () {
        var styleClass = 'ui-widget ui-tooltip ui-tooltip-' + this.tooltipPosition;
        this.container = document.createElement('div');
        if (this.tooltipStyleClass) {
            styleClass += ' ' + this.tooltipStyleClass;
        }
        this.container.className = styleClass;
        var tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'ui-tooltip-arrow';
        this.container.appendChild(tooltipArrow);
        var tooltipText = document.createElement('div');
        tooltipText.className = 'ui-tooltip-text ui-shadow ui-corner-all';
        if (this.escape)
            tooltipText.appendChild(document.createTextNode(this.text));
        else
            tooltipText.innerHTML = this.text;
        if (this.positionStyle) {
            this.container.style.position = this.positionStyle;
        }
        this.container.appendChild(tooltipText);
        if (this.appendTo === 'body')
            document.body.appendChild(this.container);
        else if (this.appendTo === 'target')
            this.domHandler.appendChild(this.container, this.el.nativeElement);
        else
            this.domHandler.appendChild(this.container, this.appendTo);
    };
    Tooltip.prototype.ngOnDestroy = function () {
        if (this.container && this.container.parentElement) {
            if (this.appendTo === 'body')
                document.body.removeChild(this.container);
            else if (this.appendTo === 'target')
                this.el.nativeElement.removeChild(this.container);
            else
                this.domHandler.removeChild(this.container, this.appendTo);
        }
        this.container = null;
    };
    return Tooltip;
}());
export { Tooltip };
Tooltip.decorators = [
    { type: Directive, args: [{
                selector: '[pTooltip]',
                host: {},
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
Tooltip.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
]; };
Tooltip.propDecorators = {
    'text': [{ type: Input, args: ['pTooltip',] },],
    'tooltipPosition': [{ type: Input },],
    'tooltipEvent': [{ type: Input },],
    'appendTo': [{ type: Input },],
    'positionStyle': [{ type: Input },],
    'tooltipStyleClass': [{ type: Input },],
    'disabled': [{ type: Input, args: ["tooltipDisabled",] },],
    'escape': [{ type: Input },],
    'onMouseEnter': [{ type: HostListener, args: ['mouseenter', ['$event'],] },],
    'onMouseLeave': [{ type: HostListener, args: ['mouseleave', ['$event'],] },],
    'onFocus': [{ type: HostListener, args: ['focus', ['$event'],] },],
    'onBlur': [{ type: HostListener, args: ['blur', ['$event'],] },],
};
var TooltipModule = (function () {
    function TooltipModule() {
    }
    return TooltipModule;
}());
export { TooltipModule };
TooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Tooltip],
                declarations: [Tooltip]
            },] },
];
/** @nocollapse */
TooltipModule.ctorParameters = function () { return []; };
//# sourceMappingURL=tooltip.js.map