import { NgModule, Component, ElementRef, Input, Renderer2, EventEmitter, ViewChild, Inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { RouterModule } from '@angular/router';
var MenuItemContent = (function () {
    function MenuItemContent(menu) {
        this.menu = menu;
    }
    return MenuItemContent;
}());
export { MenuItemContent };
MenuItemContent.decorators = [
    { type: Component, args: [{
                selector: '[pMenuItemContent]',
                template: "\n        <a *ngIf=\"!item.routerLink\" [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\"\n            [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"menu.itemClick($event, item)\">\n            <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n        </a>\n        <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\"\n            [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"menu.itemClick($event, item)\">\n            <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n        </a>\n    "
            },] },
];
/** @nocollapse */
MenuItemContent.ctorParameters = function () { return [
    { type: Menu, decorators: [{ type: Inject, args: [forwardRef(function () { return Menu; }),] },] },
]; };
MenuItemContent.propDecorators = {
    'item': [{ type: Input, args: ["pMenuItemContent",] },],
};
var Menu = (function () {
    function Menu(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
    }
    Menu.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.container = this.containerViewChild.nativeElement;
        if (this.popup) {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    this.domHandler.appendChild(this.container, this.appendTo);
            }
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.preventDocumentDefault) {
                    _this.hide();
                }
                _this.preventDocumentDefault = false;
            });
        }
    };
    Menu.prototype.toggle = function (event) {
        if (this.container.offsetParent)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
    };
    Menu.prototype.onResize = function (event) {
        if (this.onResizeTarget && this.container.offsetParent) {
            this.domHandler.absolutePosition(this.container, this.onResizeTarget);
        }
    };
    Menu.prototype.show = function (event) {
        var target = event.currentTarget;
        this.onResizeTarget = event.currentTarget;
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, target);
        this.domHandler.fadeIn(this.container, 250);
        this.preventDocumentDefault = true;
    };
    Menu.prototype.hide = function () {
        this.container.style.display = 'none';
    };
    Menu.prototype.itemClick = function (event, item) {
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
        if (this.popup) {
            this.hide();
        }
    };
    Menu.prototype.ngOnDestroy = function () {
        if (this.popup) {
            if (this.documentClickListener) {
                this.documentClickListener();
            }
            if (this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        }
        if (this.model) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var item = _a[_i];
                this.unsubscribe(item);
            }
        }
    };
    Menu.prototype.hasSubMenu = function () {
        if (this.model) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.items) {
                    return true;
                }
            }
        }
        return false;
    };
    Menu.prototype.unsubscribe = function (item) {
        if (item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }
        if (item.items) {
            for (var _i = 0, _a = item.items; _i < _a.length; _i++) {
                var childItem = _a[_i];
                this.unsubscribe(childItem);
            }
        }
    };
    return Menu;
}());
export { Menu };
Menu.decorators = [
    { type: Component, args: [{
                selector: 'p-menu',
                template: "\n        <div #container [ngClass]=\"{'ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-menu-dynamic ui-shadow':popup}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"preventDocumentDefault=true\">\n            <ul class=\"ui-menu-list ui-helper-reset\">\n                <ng-template ngFor let-submenu [ngForOf]=\"model\" *ngIf=\"hasSubMenu()\">\n                    <li class=\"ui-menu-separator ui-widget-content\" *ngIf=\"submenu.separator\">\n                    <li class=\"ui-widget-header ui-corner-all\" *ngIf=\"!submenu.separator\"><h3>{{submenu.label}}</h3></li>\n                    <ng-template ngFor let-item [ngForOf]=\"submenu.items\">\n                        <li class=\"ui-menu-separator ui-widget-content\" *ngIf=\"item.separator\">\n                        <li class=\"ui-menuitem ui-widget ui-corner-all\" *ngIf=\"!item.separator\" [pMenuItemContent]=\"item\"></li>\n                    </ng-template>\n                </ng-template>\n                <ng-template ngFor let-item [ngForOf]=\"model\" *ngIf=\"!hasSubMenu()\">\n                    <li class=\"ui-menu-separator ui-widget-content\" *ngIf=\"item.separator\">\n                    <li class=\"ui-menuitem ui-widget ui-corner-all\" *ngIf=\"!item.separator\" [pMenuItemContent]=\"item\"></li>\n                </ng-template>\n            </ul>\n        </div>\n    ",
                providers: [DomHandler],
                host: { '(window:resize)': 'onResize($event)' }
            },] },
];
/** @nocollapse */
Menu.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
    { type: Renderer2, },
]; };
Menu.propDecorators = {
    'model': [{ type: Input },],
    'popup': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'appendTo': [{ type: Input },],
    'containerViewChild': [{ type: ViewChild, args: ['container',] },],
};
var MenuModule = (function () {
    function MenuModule() {
    }
    return MenuModule;
}());
export { MenuModule };
MenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, RouterModule],
                exports: [Menu, RouterModule],
                declarations: [Menu, MenuItemContent]
            },] },
];
/** @nocollapse */
MenuModule.ctorParameters = function () { return []; };
//# sourceMappingURL=menu.js.map