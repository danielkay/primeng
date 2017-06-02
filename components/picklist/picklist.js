import { NgModule, Component, ElementRef, Input, Output, ContentChildren, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button';
import { SharedModule, PrimeTemplate } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
var PickList = (function () {
    function PickList(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.metaKeySelection = true;
        this.showSourceControls = true;
        this.showTargetControls = true;
        this.onMoveToSource = new EventEmitter();
        this.onMoveAllToSource = new EventEmitter();
        this.onMoveAllToTarget = new EventEmitter();
        this.onMoveToTarget = new EventEmitter();
        this.onSourceReorder = new EventEmitter();
        this.onTargetReorder = new EventEmitter();
        this.selectedItemsSource = [];
        this.selectedItemsTarget = [];
    }
    PickList.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    PickList.prototype.ngAfterViewChecked = function () {
        if (this.movedUp || this.movedDown) {
            var listItems = this.domHandler.find(this.reorderedListElement, 'li.ui-state-highlight');
            var listItem = void 0;
            if (this.movedUp)
                listItem = listItems[0];
            else
                listItem = listItems[listItems.length - 1];
            this.domHandler.scrollInView(this.reorderedListElement, listItem);
            this.movedUp = false;
            this.movedDown = false;
            this.reorderedListElement = null;
        }
    };
    PickList.prototype.onItemClick = function (event, item, selectedItems) {
        var index = this.findIndexInSelection(item, selectedItems);
        var selected = (index != -1);
        var metaSelection = this.itemTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected && metaKey) {
                selectedItems.splice(index, 1);
            }
            else {
                if (!metaKey) {
                    selectedItems.length = 0;
                }
                selectedItems.push(item);
            }
        }
        else {
            if (selected)
                selectedItems.splice(index, 1);
            else
                selectedItems.push(item);
        }
        this.itemTouched = false;
    };
    PickList.prototype.onItemTouchEnd = function (event) {
        this.itemTouched = true;
    };
    PickList.prototype.moveUp = function (listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            for (var i = 0; i < selectedItems.length; i++) {
                var selectedItem = selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    var movedItem = list[selectedItemIndex];
                    var temp = list[selectedItemIndex - 1];
                    list[selectedItemIndex - 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedUp = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    };
    PickList.prototype.moveTop = function (listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            for (var i = 0; i < selectedItems.length; i++) {
                var selectedItem = selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    var movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.unshift(movedItem);
                }
                else {
                    break;
                }
            }
            listElement.scrollTop = 0;
            callback.emit({ items: selectedItems });
        }
    };
    PickList.prototype.moveDown = function (listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            for (var i = selectedItems.length - 1; i >= 0; i--) {
                var selectedItem = selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != (list.length - 1)) {
                    var movedItem = list[selectedItemIndex];
                    var temp = list[selectedItemIndex + 1];
                    list[selectedItemIndex + 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedDown = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    };
    PickList.prototype.moveBottom = function (listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            for (var i = selectedItems.length - 1; i >= 0; i--) {
                var selectedItem = selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != (list.length - 1)) {
                    var movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.push(movedItem);
                }
                else {
                    break;
                }
            }
            listElement.scrollTop = listElement.scrollHeight;
            callback.emit({ items: selectedItems });
        }
    };
    PickList.prototype.moveRight = function (targetListElement) {
        if (this.selectedItemsSource && this.selectedItemsSource.length) {
            for (var i = 0; i < this.selectedItemsSource.length; i++) {
                var selectedItem = this.selectedItemsSource[i];
                if (this.findIndexInList(selectedItem, this.target) == -1) {
                    this.target.push(this.source.splice(this.findIndexInList(selectedItem, this.source), 1)[0]);
                }
            }
            this.onMoveToTarget.emit({
                items: this.selectedItemsSource
            });
            this.selectedItemsSource = [];
        }
    };
    PickList.prototype.moveAllRight = function () {
        if (this.source) {
            for (var i = 0; i < this.source.length; i++) {
                this.target.push(this.source[i]);
            }
            this.onMoveToTarget.emit({
                items: this.source
            });
            this.onMoveAllToTarget.emit({
                items: this.source
            });
            this.source.splice(0, this.source.length);
            this.selectedItemsSource = [];
        }
    };
    PickList.prototype.moveLeft = function (sourceListElement) {
        if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
            for (var i = 0; i < this.selectedItemsTarget.length; i++) {
                var selectedItem = this.selectedItemsTarget[i];
                if (this.findIndexInList(selectedItem, this.source) == -1) {
                    this.source.push(this.target.splice(this.findIndexInList(selectedItem, this.target), 1)[0]);
                }
            }
            this.onMoveToSource.emit({
                items: this.selectedItemsTarget
            });
            this.selectedItemsTarget = [];
        }
    };
    PickList.prototype.moveAllLeft = function () {
        if (this.target) {
            for (var i = 0; i < this.target.length; i++) {
                this.source.push(this.target[i]);
            }
            this.onMoveToSource.emit({
                items: this.target
            });
            this.onMoveAllToSource.emit({
                items: this.target
            });
            this.target.splice(0, this.target.length);
            this.selectedItemsTarget = [];
        }
    };
    PickList.prototype.isSelected = function (item, selectedItems) {
        return this.findIndexInSelection(item, selectedItems) != -1;
    };
    PickList.prototype.findIndexInSelection = function (item, selectedItems) {
        return this.findIndexInList(item, selectedItems);
    };
    PickList.prototype.findIndexInList = function (item, list) {
        var index = -1;
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i] == item) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    PickList.prototype.ngOnDestroy = function () {
    };
    return PickList;
}());
export { PickList };
PickList.decorators = [
    { type: Component, args: [{
                selector: 'p-pickList',
                template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"{'ui-picklist ui-widget ui-helper-clearfix': true,'ui-picklist-responsive': responsive}\">\n            <div class=\"ui-picklist-source-controls ui-picklist-buttons\" *ngIf=\"showSourceControls\">\n                <div class=\"ui-picklist-buttons-cell\">\n                    <button type=\"button\" pButton icon=\"fa-angle-up\" (click)=\"moveUp(sourcelist,source,selectedItemsSource,onSourceReorder)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-up\" (click)=\"moveTop(sourcelist,source,selectedItemsSource,onSourceReorder)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-down\" (click)=\"moveDown(sourcelist,source,selectedItemsSource,onSourceReorder)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-down\" (click)=\"moveBottom(sourcelist,source,selectedItemsSource,onSourceReorder)\"></button>\n                </div>\n            </div>\n            <div class=\"ui-picklist-listwrapper ui-picklist-source-wrapper\" [ngClass]=\"{'ui-picklist-listwrapper-nocontrols':!showSourceControls}\">\n                <div class=\"ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr\" *ngIf=\"sourceHeader\">{{sourceHeader}}</div>\n                <ul #sourcelist class=\"ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom\" [ngStyle]=\"sourceStyle\">\n                    <li *ngFor=\"let item of source\" [ngClass]=\"{'ui-picklist-item':true,'ui-state-highlight':isSelected(item,selectedItemsSource)}\"\n                        (click)=\"onItemClick($event,item,selectedItemsSource)\" (touchend)=\"onItemTouchEnd($event)\">\n                        <ng-template [pTemplateWrapper]=\"itemTemplate\" [item]=\"item\"></ng-template>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"ui-picklist-buttons\">\n                <div class=\"ui-picklist-buttons-cell\">\n                    <button type=\"button\" pButton icon=\"fa-angle-right\" (click)=\"moveRight(targetlist)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-right\" (click)=\"moveAllRight()\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-left\" (click)=\"moveLeft(sourcelist)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-left\" (click)=\"moveAllLeft()\"></button>\n                </div>\n            </div>\n            <div class=\"ui-picklist-listwrapper ui-picklist-target-wrapper\" [ngClass]=\"{'ui-picklist-listwrapper-nocontrols':!showTargetControls}\">\n                <div class=\"ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr\" *ngIf=\"targetHeader\">{{targetHeader}}</div>\n                <ul #targetlist class=\"ui-widget-content ui-picklist-list ui-picklist-target ui-corner-bottom\" [ngStyle]=\"targetStyle\">\n                    <li *ngFor=\"let item of target\" [ngClass]=\"{'ui-picklist-item':true,'ui-state-highlight':isSelected(item,selectedItemsTarget)}\"\n                        (click)=\"onItemClick($event,item,selectedItemsTarget)\" (touchend)=\"onItemTouchEnd($event)\">\n                        <ng-template [pTemplateWrapper]=\"itemTemplate\" [item]=\"item\"></ng-template>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"ui-picklist-target-controls ui-picklist-buttons\" *ngIf=\"showTargetControls\">\n                <div class=\"ui-picklist-buttons-cell\">\n                    <button type=\"button\" pButton icon=\"fa-angle-up\" (click)=\"moveUp(targetlist,target,selectedItemsTarget,onTargetReorder)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-up\" (click)=\"moveTop(targetlist,target,selectedItemsTarget,onTargetReorder)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-down\" (click)=\"moveDown(targetlist,target,selectedItemsTarget,onTargetReorder)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-down\" (click)=\"moveBottom(targetlist,target,selectedItemsTarget,onTargetReorder)\"></button>\n                </div>\n            </div>\n        </div>\n    ",
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
PickList.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
]; };
PickList.propDecorators = {
    'source': [{ type: Input },],
    'target': [{ type: Input },],
    'sourceHeader': [{ type: Input },],
    'targetHeader': [{ type: Input },],
    'responsive': [{ type: Input },],
    'metaKeySelection': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'sourceStyle': [{ type: Input },],
    'targetStyle': [{ type: Input },],
    'showSourceControls': [{ type: Input },],
    'showTargetControls': [{ type: Input },],
    'onMoveToSource': [{ type: Output },],
    'onMoveAllToSource': [{ type: Output },],
    'onMoveAllToTarget': [{ type: Output },],
    'onMoveToTarget': [{ type: Output },],
    'onSourceReorder': [{ type: Output },],
    'onTargetReorder': [{ type: Output },],
    'templates': [{ type: ContentChildren, args: [PrimeTemplate,] },],
};
var PickListModule = (function () {
    function PickListModule() {
    }
    return PickListModule;
}());
export { PickListModule };
PickListModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ButtonModule, SharedModule],
                exports: [PickList, SharedModule],
                declarations: [PickList]
            },] },
];
/** @nocollapse */
PickListModule.ctorParameters = function () { return []; };
//# sourceMappingURL=picklist.js.map