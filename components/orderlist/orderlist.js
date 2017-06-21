import { NgModule, Component, ElementRef, Input, Output, ContentChildren, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button';
import { SharedModule, PrimeTemplate } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
var OrderList = (function () {
    function OrderList(el, domHandler, objectUtils) {
        this.el = el;
        this.domHandler = domHandler;
        this.objectUtils = objectUtils;
        this.metaKeySelection = true;
        this.onReorder = new EventEmitter();
        this.onSelectionChange = new EventEmitter();
        this.onFilterEvent = new EventEmitter();
    }
    OrderList.prototype.ngAfterViewInit = function () {
        this.listContainer = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-orderlist-list');
    };
    OrderList.prototype.ngAfterContentInit = function () {
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
    OrderList.prototype.ngAfterViewChecked = function () {
        if (this.movedUp || this.movedDown) {
            var listItems = this.domHandler.find(this.listContainer, 'li.ui-state-highlight');
            var listItem = void 0;
            if (this.movedUp)
                listItem = listItems[0];
            else
                listItem = listItems[listItems.length - 1];
            this.domHandler.scrollInView(this.listContainer, listItem);
            this.movedUp = false;
            this.movedDown = false;
        }
    };
    Object.defineProperty(OrderList.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val ? val.slice() : null;
            if (this.filterValue) {
                this.filter();
            }
        },
        enumerable: true,
        configurable: true
    });
    OrderList.prototype.onItemClick = function (event, item) {
        var index = this.findIndexInList(item, this.selectedItems);
        var selected = (index != -1);
        var metaSelection = this.itemTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected && metaKey) {
                this.selectedItems.splice(index, 1);
            }
            else {
                this.selectedItems = (metaKey) ? this.selectedItems || [] : [];
                this.selectedItems.push(item);
            }
        }
        else {
            if (selected) {
                this.selectedItems.splice(index, 1);
            }
            else {
                this.selectedItems = this.selectedItems || [];
                this.selectedItems.push(item);
            }
        }
        this.onSelectionChange.emit({ originalEvent: event, value: this.selectedItems });
        this.itemTouched = false;
    };
    OrderList.prototype.onFilterKeyup = function (event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.filter();
        this.onFilterEvent.emit({
            originalEvent: event,
            value: this.visibleOptions
        });
    };
    OrderList.prototype.filter = function () {
        var searchFields = this.filterBy.split(',');
        this.visibleOptions = this.objectUtils.filter(this.value, searchFields, this.filterValue);
    };
    OrderList.prototype.isItemVisible = function (item) {
        if (this.filterValue && this.filterValue.trim().length) {
            for (var i = 0; i < this.visibleOptions.length; i++) {
                if (item == this.visibleOptions[i]) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };
    OrderList.prototype.onItemTouchEnd = function (event) {
        this.itemTouched = true;
    };
    OrderList.prototype.isSelected = function (item) {
        return this.findIndexInList(item, this.selectedItems) != -1;
    };
    OrderList.prototype.findIndexInList = function (item, list) {
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
    OrderList.prototype.moveUp = function (event, listElement) {
        if (this.selectedItems) {
            for (var i = 0; i < this.selectedItems.length; i++) {
                var selectedItem = this.selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != 0) {
                    var movedItem = this.value[selectedItemIndex];
                    var temp = this.value[selectedItemIndex - 1];
                    this.value[selectedItemIndex - 1] = movedItem;
                    this.value[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedUp = true;
            this.onReorder.emit(event);
        }
    };
    OrderList.prototype.moveTop = function (event, listElement) {
        if (this.selectedItems) {
            for (var i = 0; i < this.selectedItems.length; i++) {
                var selectedItem = this.selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != 0) {
                    var movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.unshift(movedItem);
                    listElement.scrollTop = 0;
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
            listElement.scrollTop = 0;
        }
    };
    OrderList.prototype.moveDown = function (event, listElement) {
        if (this.selectedItems) {
            for (var i = this.selectedItems.length - 1; i >= 0; i--) {
                var selectedItem = this.selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != (this.value.length - 1)) {
                    var movedItem = this.value[selectedItemIndex];
                    var temp = this.value[selectedItemIndex + 1];
                    this.value[selectedItemIndex + 1] = movedItem;
                    this.value[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedDown = true;
            this.onReorder.emit(event);
        }
    };
    OrderList.prototype.moveBottom = function (event, listElement) {
        if (this.selectedItems) {
            for (var i = this.selectedItems.length - 1; i >= 0; i--) {
                var selectedItem = this.selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != (this.value.length - 1)) {
                    var movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.push(movedItem);
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
            listElement.scrollTop = listElement.scrollHeight;
        }
    };
    OrderList.prototype.onDragStart = function (event, index) {
        this.dragging = true;
        this.draggedItemIndex = index;
        if (this.dragdropScope) {
            event.dataTransfer.setData("text", this.dragdropScope);
        }
    };
    OrderList.prototype.onDragOver = function (event, index) {
        if (this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
            this.dragOverItemIndex = index;
            event.preventDefault();
        }
    };
    OrderList.prototype.onDragLeave = function (event, index) {
        this.dragOverItemIndex = null;
    };
    OrderList.prototype.onDrop = function (event, index) {
        var dropIndex = (this.draggedItemIndex > index) ? index : (index === 0) ? 0 : index - 1;
        this.objectUtils.reorderArray(this.value, this.draggedItemIndex, dropIndex);
        this.dragOverItemIndex = null;
    };
    OrderList.prototype.onDragEnd = function (event) {
        this.dragging = false;
    };
    OrderList.prototype.onListMouseMove = function (event) {
        if (this.dragging) {
            var offsetY = this.listViewChild.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
            var bottomDiff = (offsetY + this.listViewChild.nativeElement.clientHeight) - event.pageY;
            var topDiff = (event.pageY - offsetY);
            if (bottomDiff < 25 && bottomDiff > 0)
                this.listViewChild.nativeElement.scrollTop += 15;
            else if (topDiff < 25 && topDiff > 0)
                this.listViewChild.nativeElement.scrollTop -= 15;
        }
    };
    return OrderList;
}());
export { OrderList };
OrderList.decorators = [
    { type: Component, args: [{
                selector: 'p-orderList',
                template: "\n        <div [ngClass]=\"{'ui-orderlist ui-widget':true,'ui-orderlist-responsive':responsive}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-orderlist-controls\">\n                <button type=\"button\" pButton icon=\"fa-angle-up\" (click)=\"moveUp($event,listelement)\"></button>\n                <button type=\"button\" pButton icon=\"fa-angle-double-up\" (click)=\"moveTop($event,listelement)\"></button>\n                <button type=\"button\" pButton icon=\"fa-angle-down\" (click)=\"moveDown($event,listelement)\"></button>\n                <button type=\"button\" pButton icon=\"fa-angle-double-down\" (click)=\"moveBottom($event,listelement)\"></button>\n            </div>\n            <div class=\"ui-orderlist-list-container\">\n                <div class=\"ui-orderlist-caption ui-widget-header ui-corner-top\" *ngIf=\"header\">{{header}}</div>\n                <div class=\"ui-orderlist-filter-container ui-widget-content\" *ngIf=\"filterBy\">\n                    <input type=\"text\" role=\"textbox\" (keyup)=\"onFilterKeyup($event)\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [disabled]=\"disabled\" [attr.placeholder]=\"filterPlaceholder\">\n                    <span class=\"fa fa-search\"></span>\n                </div>\n                <ul #listelement class=\"ui-widget-content ui-orderlist-list ui-corner-bottom\" [ngStyle]=\"listStyle\" (dragover)=\"onListMouseMove($event)\">\n                    <ng-template ngFor let-item [ngForOf]=\"value\" let-i=\"index\" let-l=\"last\">\n                        <li class=\"ui-orderlist-droppoint\" *ngIf=\"dragdrop && isItemVisible(item)\" (dragover)=\"onDragOver($event, i)\" (drop)=\"onDrop($event, i)\" (dragleave)=\"onDragLeave($event)\" \n                            [ngClass]=\"{'ui-state-highlight': (i === dragOverItemIndex)}\"></li>\n                        <li class=\"ui-orderlist-item\"\n                            [ngClass]=\"{'ui-state-highlight':isSelected(item)}\" \n                            (click)=\"onItemClick($event,item)\" (touchend)=\"onItemTouchEnd($event)\"\n                            [style.display]=\"isItemVisible(item) ? 'block' : 'none'\"\n                            [draggable]=\"dragdrop\" (dragstart)=\"onDragStart($event, i)\" (dragend)=\"onDragEnd($event)\">\n                            <ng-template [pTemplateWrapper]=\"itemTemplate\" [item]=\"item\"></ng-template>\n                        </li>\n                        <li class=\"ui-orderlist-droppoint\" *ngIf=\"dragdrop && l\" (dragover)=\"onDragOver($event, i + 1)\" (drop)=\"onDrop($event, i + 1)\" (dragleave)=\"onDragLeave($event)\" \n                            [ngClass]=\"{'ui-state-highlight': (i + 1 === dragOverItemIndex)}\"></li>\n                    </ng-template>\n                </ul>\n            </div>\n        </div>\n    ",
                providers: [DomHandler, ObjectUtils]
            },] },
];
/** @nocollapse */
OrderList.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
    { type: ObjectUtils, },
]; };
OrderList.propDecorators = {
    'header': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'listStyle': [{ type: Input },],
    'responsive': [{ type: Input },],
    'filterBy': [{ type: Input },],
    'filterPlaceholder': [{ type: Input },],
    'metaKeySelection': [{ type: Input },],
    'dragdrop': [{ type: Input },],
    'dragdropScope': [{ type: Input },],
    'onReorder': [{ type: Output },],
    'onSelectionChange': [{ type: Output },],
    'onFilterEvent': [{ type: Output },],
    'listViewChild': [{ type: ViewChild, args: ['listelement',] },],
    'templates': [{ type: ContentChildren, args: [PrimeTemplate,] },],
    'value': [{ type: Input },],
};
var OrderListModule = (function () {
    function OrderListModule() {
    }
    return OrderListModule;
}());
export { OrderListModule };
OrderListModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ButtonModule, SharedModule],
                exports: [OrderList, SharedModule],
                declarations: [OrderList]
            },] },
];
/** @nocollapse */
OrderListModule.ctorParameters = function () { return []; };
//# sourceMappingURL=orderlist.js.map