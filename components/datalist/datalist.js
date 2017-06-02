import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChild, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Header, Footer, PrimeTemplate } from '../common/shared';
import { PaginatorModule } from '../paginator/paginator';
var DataList = (function () {
    function DataList(el) {
        this.el = el;
        this.pageLinks = 5;
        this.onLazyLoad = new EventEmitter();
        this.paginatorPosition = 'bottom';
        this.emptyMessage = 'No records found';
        this.alwaysShowPaginator = true;
        this.trackBy = function (index, item) { return item; };
        this.onPage = new EventEmitter();
        this.first = 0;
        this.page = 0;
    }
    DataList.prototype.ngAfterContentInit = function () {
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
    DataList.prototype.ngAfterViewInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
    };
    Object.defineProperty(DataList.prototype, "value", {
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
    DataList.prototype.handleDataChange = function () {
        if (this.paginator) {
            this.updatePaginator();
        }
        this.updateDataToRender(this.value);
    };
    DataList.prototype.updatePaginator = function () {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        //first
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataList.prototype.paginate = function (event) {
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
    DataList.prototype.updateDataToRender = function (datasource) {
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
    DataList.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataList.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    DataList.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    return DataList;
}());
export { DataList };
DataList.decorators = [
    { type: Component, args: [{
                selector: 'p-dataList',
                template: "\n        <div [ngClass]=\"'ui-datalist ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-datalist-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n            (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator  && paginatorPosition!='bottom' || paginatorPosition =='both'\"></p-paginator>\n            <div class=\"ui-datalist-content ui-widget-content\">\n                <div *ngIf=\"isEmpty()\" class=\"ui-datalist-emptymessage\">{{emptyMessage}}</div>\n                <ul class=\"ui-datalist-data\">\n                    <li *ngFor=\"let item of dataToRender;let i = index;trackBy: trackBy\">\n                        <ng-template [pTemplateWrapper]=\"itemTemplate\" [item]=\"item\" [index]=\"i\"></ng-template>\n                    </li>\n                </ul>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n            (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator  && paginatorPosition!='top' || paginatorPosition =='both'\"></p-paginator>\n            <div class=\"ui-datalist-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
DataList.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
DataList.propDecorators = {
    'paginator': [{ type: Input },],
    'rows': [{ type: Input },],
    'totalRecords': [{ type: Input },],
    'pageLinks': [{ type: Input },],
    'rowsPerPageOptions': [{ type: Input },],
    'lazy': [{ type: Input },],
    'onLazyLoad': [{ type: Output },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'paginatorPosition': [{ type: Input },],
    'emptyMessage': [{ type: Input },],
    'alwaysShowPaginator': [{ type: Input },],
    'trackBy': [{ type: Input },],
    'onPage': [{ type: Output },],
    'header': [{ type: ContentChild, args: [Header,] },],
    'footer': [{ type: ContentChild, args: [Footer,] },],
    'templates': [{ type: ContentChildren, args: [PrimeTemplate,] },],
    'value': [{ type: Input },],
};
var DataListModule = (function () {
    function DataListModule() {
    }
    return DataListModule;
}());
export { DataListModule };
DataListModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, SharedModule, PaginatorModule],
                exports: [DataList, SharedModule],
                declarations: [DataList]
            },] },
];
/** @nocollapse */
DataListModule.ctorParameters = function () { return []; };
//# sourceMappingURL=datalist.js.map