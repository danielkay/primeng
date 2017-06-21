import { NgModule, Component, ElementRef, Input, Renderer2, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { RouterModule } from '@angular/router';
var TieredMenuSub = (function () {
    function TieredMenuSub(domHandler) {
        this.domHandler = domHandler;
    }
    TieredMenuSub.prototype.onItemMouseEnter = function (event, item, menuitem) {
        if (menuitem.disabled) {
            return;
        }
        this.activeItem = item;
        var nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            var sublist = nextElement.children[0];
            sublist.style.zIndex = String(++DomHandler.zindex);
            sublist.style.top = '0px';
            sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
        }
    };
    TieredMenuSub.prototype.onItemMouseLeave = function (event) {
        this.activeItem = null;
    };
    TieredMenuSub.prototype.itemClick = function (event, item) {
        if (item.disabled) {
            event.preventDefault();
            return true;
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
    };
    TieredMenuSub.prototype.listClick = function (event) {
        this.activeItem = null;
    };
    return TieredMenuSub;
}());
export { TieredMenuSub };
TieredMenuSub.decorators = [
    { type: Component, args: [{
                selector: 'p-tieredMenuSub',
                template: "\n        <ul [ngClass]=\"{'ui-helper-reset':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}\" class=\"ui-menu-list\"\n            (click)=\"listClick($event)\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\">\n                <li *ngIf=\"!child.separator\" #listItem [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':listItem==activeItem}\"\n                    (mouseenter)=\"onItemMouseEnter($event, listItem, child)\" (mouseleave)=\"onItemMouseLeave($event)\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"child.target\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" (click)=\"itemClick($event, child)\">\n                        <span class=\"ui-submenu-icon fa fa-fw fa-caret-right\" *ngIf=\"child.items\"></span>\n                        <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"child.target\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" (click)=\"itemClick($event, child)\">\n                        <span class=\"ui-submenu-icon fa fa-fw fa-caret-right\" *ngIf=\"child.items\"></span>\n                        <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-tieredMenuSub class=\"ui-submenu\" [item]=\"child\" *ngIf=\"child.items\"></p-tieredMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    ",
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
TieredMenuSub.ctorParameters = function () { return [
    { type: DomHandler, },
]; };
TieredMenuSub.propDecorators = {
    'item': [{ type: Input },],
    'root': [{ type: Input },],
};
var TieredMenu = (function () {
    function TieredMenu(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
    }
    TieredMenu.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.container = this.el.nativeElement.children[0];
        if (this.popup) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.preventDocumentDefault) {
                    _this.hide();
                }
                _this.preventDocumentDefault = false;
            });
        }
    };
    TieredMenu.prototype.toggle = function (event) {
        if (this.container.offsetParent)
            this.hide();
        else
            this.show(event);
    };
    TieredMenu.prototype.show = function (event) {
        this.preventDocumentDefault = true;
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, event.target);
        this.domHandler.fadeIn(this.container, 250);
    };
    TieredMenu.prototype.hide = function () {
        this.container.style.display = 'none';
    };
    TieredMenu.prototype.unsubscribe = function (item) {
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
    TieredMenu.prototype.ngOnDestroy = function () {
        if (this.popup && this.documentClickListener) {
            this.documentClickListener();
        }
        if (this.model) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var item = _a[_i];
                this.unsubscribe(item);
            }
        }
    };
    return TieredMenu;
}());
export { TieredMenu };
TieredMenu.decorators = [
    { type: Component, args: [{
                selector: 'p-tieredMenu',
                template: "\n        <div [ngClass]=\"{'ui-tieredmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-menu-dynamic ui-shadow':popup}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-tieredMenuSub [item]=\"model\" root=\"root\"></p-tieredMenuSub>\n        </div>\n    ",
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
TieredMenu.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
    { type: Renderer2, },
]; };
TieredMenu.propDecorators = {
    'model': [{ type: Input },],
    'popup': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
};
var TieredMenuModule = (function () {
    function TieredMenuModule() {
    }
    return TieredMenuModule;
}());
export { TieredMenuModule };
TieredMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, RouterModule],
                exports: [TieredMenu, RouterModule],
                declarations: [TieredMenu, TieredMenuSub]
            },] },
];
/** @nocollapse */
TieredMenuModule.ctorParameters = function () { return []; };
//# sourceMappingURL=tieredmenu.js.map