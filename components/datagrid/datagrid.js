import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChild, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, Footer, PrimeTemplate, SharedModule } from '../common/shared';
import { PaginatorModule } from '../paginator/paginator';
var DataGrid = (function () {
    function DataGrid(el) {
        this.el = el;
        this.pageLinks = 5;
        this.emptyMessage = 'No records found';
        this.onLazyLoad = new EventEmitter();
        this.paginatorPosition = 'bottom';
        this.alwaysShowPaginator = true;
        this.trackBy = function (index, item) { return item; };
        this.onPage = new EventEmitter();
        this.first = 0;
        this.page = 0;
    }
    DataGrid.prototype.ngAfterViewInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
    };
    DataGrid.prototype.ngAfterContentInit = function () {
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
    Object.defineProperty(DataGrid.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            this.handleDataChange();
        },
        enumerable: true,
        configurable: true
    });
    DataGrid.prototype.handleDataChange = function () {
        if (this.paginator) {
            this.updatePaginator();
        }
        this.updateDataToRender(this.value);
    };
    DataGrid.prototype.updatePaginator = function () {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        //first
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataGrid.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.value);
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    };
    DataGrid.prototype.updateDataToRender = function (datasource) {
        if (this.paginator && datasource) {
            this.dataToRender = [];
            var startIndex = this.lazy ? 0 : this.first;
            for (var i = startIndex; i < (startIndex + this.rows); i++) {
                if (i >= datasource.length) {
                    break;
                }
                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
    };
    DataGrid.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataGrid.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    DataGrid.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    return DataGrid;
}());
export { DataGrid };
DataGrid.decorators = [
    { type: Component, args: [{
                selector: 'p-dataGrid',
                template: "\n        <div [ngClass]=\"'ui-datagrid ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-datagrid-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && paginatorPosition!='bottom' || paginatorPosition =='both'\"></p-paginator>\n            <div class=\"ui-datagrid-content ui-widget-content\">\n                <div class=\"ui-g\">\n                    <ng-template ngFor [ngForOf]=\"dataToRender\" [ngForTemplate]=\"itemTemplate\" [ngForTrackBy]=\"trackBy\"></ng-template>\n                    <div *ngIf=\"isEmpty()\" class=\"ui-widget-content ui-g-12\">{{emptyMessage}}</div>\n                </div>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && paginatorPosition!='top' || paginatorPosition =='both'\"></p-paginator>\n            <div class=\"ui-datagrid-footer ui-widget-header ui-corner-top\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
DataGrid.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
DataGrid.propDecorators = {
    'paginator': [{ type: Input },],
    'rows': [{ type: Input },],
    'totalRecords': [{ type: Input },],
    'pageLinks': [{ type: Input },],
    'rowsPerPageOptions': [{ type: Input },],
    'lazy': [{ type: Input },],
    'emptyMessage': [{ type: Input },],
    'onLazyLoad': [{ type: Output },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'paginatorPosition': [{ type: Input },],
    'alwaysShowPaginator': [{ type: Input },],
    'trackBy': [{ type: Input },],
    'onPage': [{ type: Output },],
    'header': [{ type: ContentChild, args: [Header,] },],
    'footer': [{ type: ContentChild, args: [Footer,] },],
    'templates': [{ type: ContentChildren, args: [PrimeTemplate,] },],
    'value': [{ type: Input },],
};
var DataGridModule = (function () {
    function DataGridModule() {
    }
    return DataGridModule;
}());
export { DataGridModule };
DataGridModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, SharedModule, PaginatorModule],
                exports: [DataGrid, SharedModule],
                declarations: [DataGrid]
            },] },
];
/** @nocollapse */
DataGridModule.ctorParameters = function () { return []; };
//# sourceMappingURL=datagrid.js.map