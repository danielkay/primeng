import { NgModule, Component, ElementRef, Input, Output, EventEmitter, Renderer2, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { ButtonModule } from '../button/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
var SplitButton = (function () {
    function SplitButton(el, domHandler, renderer, router, cd) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.router = router;
        this.cd = cd;
        this.iconPos = 'left';
        this.onClick = new EventEmitter();
        this.onDropdownClick = new EventEmitter();
        this.menuVisible = false;
    }
    SplitButton.prototype.ngOnInit = function () {
        var _this = this;
        this.documentClickListener = this.renderer.listen('document', 'click', function () {
            if (_this.isDropdownClicked) {
                _this.isDropdownClicked = false;
            }
            else {
                _this.menuVisible = false;
                _this.cd.markForCheck();
            }
        });
    };
    SplitButton.prototype.onDefaultButtonClick = function (event) {
        this.onClick.emit(event);
    };
    SplitButton.prototype.itemClick = function (event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            if (!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            item.eventEmitter.emit({
                originalEvent: event,
                item: item
            });
        }
        this.menuVisible = false;
    };
    SplitButton.prototype.onDropdownButtonClick = function (event, menu, container) {
        this.menuVisible = !this.menuVisible;
        this.domHandler.relativePosition(menu, container);
        this.domHandler.fadeIn(menu, 25);
        menu.style.zIndex = String(++DomHandler.zindex);
        this.onDropdownClick.emit(event);
        this.isDropdownClicked = true;
    };
    SplitButton.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    };
    return SplitButton;
}());
export { SplitButton };
SplitButton.decorators = [
    { type: Component, args: [{
                selector: 'p-splitButton',
                template: "\n        <div #container [ngClass]=\"{'ui-splitbutton ui-buttonset ui-widget':true,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button #defaultbtn type=\"button\" pButton [icon]=\"icon\" [iconPos]=\"iconPos\" [label]=\"label\" cornerStyleClass=\"ui-corner-left\" (click)=\"onDefaultButtonClick($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\">\n            </button><button type=\"button\" pButton class=\"ui-splitbutton-menubutton\" icon=\"fa-caret-down\" cornerStyleClass=\"ui-corner-right\" (click)=\"onDropdownButtonClick($event,menu,container)\" [disabled]=\"disabled\"></button>\n            <div #menu [ngClass]=\"'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'\" [style.display]=\"menuVisible ? 'block' : 'none'\"\n                    [ngStyle]=\"menuStyle\" [class]=\"menuStyleClass\">\n                <ul class=\"ui-menu-list ui-helper-reset\">\n                    <li class=\"ui-menuitem ui-widget ui-corner-all\" role=\"menuitem\" *ngFor=\"let item of model\">\n                        <a *ngIf=\"!item.routerLink\" [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\"\n                            [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"itemClick($event, item)\">\n                            <span [ngClass]=\"'ui-menuitem-icon fa fa-fw'\" [class]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                        <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\"\n                            class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\" [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"itemClick($event, item)\">\n                            <span [ngClass]=\"'ui-menuitem-icon fa fa-fw'\" [class]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
SplitButton.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
    { type: Renderer2, },
    { type: Router, },
    { type: ChangeDetectorRef, },
]; };
SplitButton.propDecorators = {
    'model': [{ type: Input },],
    'icon': [{ type: Input },],
    'iconPos': [{ type: Input },],
    'label': [{ type: Input },],
    'onClick': [{ type: Output },],
    'onDropdownClick': [{ type: Output },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'menuStyle': [{ type: Input },],
    'menuStyleClass': [{ type: Input },],
    'disabled': [{ type: Input },],
    'tabindex': [{ type: Input },],
};
var SplitButtonModule = (function () {
    function SplitButtonModule() {
    }
    return SplitButtonModule;
}());
export { SplitButtonModule };
SplitButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ButtonModule, RouterModule],
                exports: [SplitButton, ButtonModule, RouterModule],
                declarations: [SplitButton]
            },] },
];
/** @nocollapse */
SplitButtonModule.ctorParameters = function () { return []; };
//# sourceMappingURL=splitbutton.js.map