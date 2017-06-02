import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
var TabViewNav = (function () {
    function TabViewNav() {
        this.orientation = 'top';
        this.onTabClick = new EventEmitter();
        this.onTabCloseClick = new EventEmitter();
    }
    TabViewNav.prototype.getDefaultHeaderClass = function (tab) {
        var styleClass = 'ui-state-default ui-corner-' + this.orientation;
        if (tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    };
    TabViewNav.prototype.clickTab = function (event, tab) {
        this.onTabClick.emit({
            originalEvent: event,
            tab: tab
        });
    };
    TabViewNav.prototype.clickClose = function (event, tab) {
        this.onTabCloseClick.emit({
            originalEvent: event,
            tab: tab
        });
    };
    return TabViewNav;
}());
export { TabViewNav };
TabViewNav.decorators = [
    { type: Component, args: [{
                selector: '[p-tabViewNav]',
                host: {
                    '[class.ui-tabview-nav]': 'true',
                    '[class.ui-helper-reset]': 'true',
                    '[class.ui-helper-clearfix]': 'true',
                    '[class.ui-widget-header]': 'true',
                    '[class.ui-corner-all]': 'true'
                },
                template: "\n        <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n            <li [class]=\"getDefaultHeaderClass(tab)\" [ngStyle]=\"tab.headerStyle\" role=\"tab\"\n                [ngClass]=\"{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-disabled': tab.disabled}\"\n                (click)=\"clickTab($event,tab)\" *ngIf=\"!tab.closed\"\n                [attr.aria-expanded]=\"tab.selected\" [attr.aria-selected]=\"tab.selected\">\n                <a href=\"#\">\n                    <span class=\"ui-tabview-left-icon fa\" [ngClass]=\"tab.leftIcon\" *ngIf=\"tab.leftIcon\"></span>\n                    <span class=\"ui-tabview-title\">{{tab.header}}</span>\n                    <span class=\"ui-tabview-right-icon fa\" [ngClass]=\"tab.rightIcon\" *ngIf=\"tab.rightIcon\"></span>\n                </a>\n                <span *ngIf=\"tab.closable\" class=\"ui-tabview-close fa fa-close\" (click)=\"clickClose($event,tab)\"></span>\n            </li>\n        </ng-template>\n    ",
            },] },
];
/** @nocollapse */
TabViewNav.ctorParameters = function () { return []; };
TabViewNav.propDecorators = {
    'tabs': [{ type: Input },],
    'orientation': [{ type: Input },],
    'onTabClick': [{ type: Output },],
    'onTabCloseClick': [{ type: Output },],
};
var TabPanel = (function () {
    function TabPanel() {
    }
    return TabPanel;
}());
export { TabPanel };
TabPanel.decorators = [
    { type: Component, args: [{
                selector: 'p-tabPanel',
                template: "\n        <div class=\"ui-tabview-panel ui-widget-content\" [style.display]=\"selected ? 'block' : 'none'\" \n            role=\"tabpanel\" [attr.aria-hidden]=\"!selected\" *ngIf=\"closed ? false :\u00A0(lazy ? selected : true)\">\n            <ng-content></ng-content>\n        </div>\n    "
            },] },
];
/** @nocollapse */
TabPanel.ctorParameters = function () { return []; };
TabPanel.propDecorators = {
    'header': [{ type: Input },],
    'selected': [{ type: Input },],
    'disabled': [{ type: Input },],
    'closable': [{ type: Input },],
    'headerStyle': [{ type: Input },],
    'headerStyleClass': [{ type: Input },],
    'leftIcon': [{ type: Input },],
    'rightIcon': [{ type: Input },],
};
var TabView = (function () {
    function TabView(el) {
        this.el = el;
        this.orientation = 'top';
        this.onChange = new EventEmitter();
        this.onClose = new EventEmitter();
    }
    TabView.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initTabs();
        this.tabPanels.changes.subscribe(function (_) {
            _this.initTabs();
        });
    };
    TabView.prototype.initTabs = function () {
        this.tabs = this.tabPanels.toArray();
        for (var _i = 0, _a = this.tabs; _i < _a.length; _i++) {
            var tab = _a[_i];
            tab.lazy = this.lazy;
        }
        var selectedTab = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;
        }
    };
    TabView.prototype.open = function (event, tab) {
        if (tab.disabled) {
            if (event) {
                event.preventDefault();
            }
            return;
        }
        if (!tab.selected) {
            var selectedTab = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false;
            }
            tab.selected = true;
            this.onChange.emit({ originalEvent: event, index: this.findTabIndex(tab) });
        }
        if (event) {
            event.preventDefault();
        }
    };
    TabView.prototype.close = function (event, tab) {
        var _this = this;
        if (this.controlClose) {
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab),
                close: function () {
                    _this.closeTab(tab);
                }
            });
        }
        else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab)
            });
        }
        event.stopPropagation();
    };
    TabView.prototype.closeTab = function (tab) {
        if (tab.selected) {
            tab.selected = false;
            for (var i = 0; i < this.tabs.length; i++) {
                var tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        tab.closed = true;
    };
    TabView.prototype.findSelectedTab = function () {
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    };
    TabView.prototype.findTabIndex = function (tab) {
        var index = -1;
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    };
    TabView.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Object.defineProperty(TabView.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex;
        },
        set: function (val) {
            this._activeIndex = val;
            if (this.tabs && this.tabs.length && this._activeIndex != null) {
                this.findSelectedTab().selected = false;
                this.tabs[this._activeIndex].selected = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    return TabView;
}());
export { TabView };
TabView.decorators = [
    { type: Component, args: [{
                selector: 'p-tabView',
                template: "\n        <div [ngClass]=\"'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul p-tabViewNav role=\"tablist\" *ngIf=\"orientation!='bottom'\" [tabs]=\"tabs\" [orientation]=\"orientation\" \n                (onTabClick)=\"open($event.originalEvent, $event.tab)\" (onTabCloseClick)=\"close($event.originalEvent, $event.tab)\"></ul>\n            <div class=\"ui-tabview-panels\">\n                <ng-content></ng-content>\n            </div>\n            <ul p-tabViewNav role=\"tablist\" *ngIf=\"orientation=='bottom'\" [tabs]=\"tabs\" [orientation]=\"orientation\"\n                (onTabClick)=\"open($event.originalEvent, $event.tab)\" (onTabCloseClick)=\"close($event.originalEvent, $event.tab)\"></ul>\n        </div>\n    ",
            },] },
];
/** @nocollapse */
TabView.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
TabView.propDecorators = {
    'orientation': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'controlClose': [{ type: Input },],
    'lazy': [{ type: Input },],
    'tabPanels': [{ type: ContentChildren, args: [TabPanel,] },],
    'onChange': [{ type: Output },],
    'onClose': [{ type: Output },],
    'activeIndex': [{ type: Input },],
};
var TabViewModule = (function () {
    function TabViewModule() {
    }
    return TabViewModule;
}());
export { TabViewModule };
TabViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [TabView, TabPanel, TabViewNav],
                declarations: [TabView, TabPanel, TabViewNav]
            },] },
];
/** @nocollapse */
TabViewModule.ctorParameters = function () { return []; };
//# sourceMappingURL=tabview.js.map