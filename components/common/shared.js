import { NgModule, EventEmitter, Directive, ViewContainerRef, Input, Output, ContentChildren, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
var Header = (function () {
    function Header() {
    }
    return Header;
}());
export { Header };
Header.decorators = [
    { type: Component, args: [{
                selector: 'p-header',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
Header.ctorParameters = function () { return []; };
var Footer = (function () {
    function Footer() {
    }
    return Footer;
}());
export { Footer };
Footer.decorators = [
    { type: Component, args: [{
                selector: 'p-footer',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
Footer.ctorParameters = function () { return []; };
var PrimeTemplate = (function () {
    function PrimeTemplate(template) {
        this.template = template;
    }
    PrimeTemplate.prototype.getType = function () {
        return this.name;
    };
    return PrimeTemplate;
}());
export { PrimeTemplate };
PrimeTemplate.decorators = [
    { type: Directive, args: [{
                selector: '[pTemplate]',
                host: {}
            },] },
];
/** @nocollapse */
PrimeTemplate.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
PrimeTemplate.propDecorators = {
    'type': [{ type: Input },],
    'name': [{ type: Input, args: ['pTemplate',] },],
};
var TemplateWrapper = (function () {
    function TemplateWrapper(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateWrapper.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
            '\$implicit': this.item,
            'index': this.index
        });
    };
    TemplateWrapper.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return TemplateWrapper;
}());
export { TemplateWrapper };
TemplateWrapper.decorators = [
    { type: Directive, args: [{
                selector: '[pTemplateWrapper]'
            },] },
];
/** @nocollapse */
TemplateWrapper.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
TemplateWrapper.propDecorators = {
    'item': [{ type: Input },],
    'index': [{ type: Input },],
    'templateRef': [{ type: Input, args: ['pTemplateWrapper',] },],
};
var Column = (function () {
    function Column() {
        this.filterType = 'text';
        this.sortFunction = new EventEmitter();
    }
    Column.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'body':
                    _this.bodyTemplate = item.template;
                    break;
                case 'footer':
                    _this.footerTemplate = item.template;
                    break;
                case 'filter':
                    _this.filterTemplate = item.template;
                    break;
                case 'editor':
                    _this.editorTemplate = item.template;
                    break;
                default:
                    _this.bodyTemplate = item.template;
                    break;
            }
        });
    };
    return Column;
}());
export { Column };
Column.decorators = [
    { type: Component, args: [{
                selector: 'p-column',
                template: ""
            },] },
];
/** @nocollapse */
Column.ctorParameters = function () { return []; };
Column.propDecorators = {
    'field': [{ type: Input },],
    'sortField': [{ type: Input },],
    'header': [{ type: Input },],
    'footer': [{ type: Input },],
    'sortable': [{ type: Input },],
    'editable': [{ type: Input },],
    'filter': [{ type: Input },],
    'filterMatchMode': [{ type: Input },],
    'filterType': [{ type: Input },],
    'rowspan': [{ type: Input },],
    'colspan': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'hidden': [{ type: Input },],
    'expander': [{ type: Input },],
    'selectionMode': [{ type: Input },],
    'filterPlaceholder': [{ type: Input },],
    'filterMaxlength': [{ type: Input },],
    'frozen': [{ type: Input },],
    'sortFunction': [{ type: Output },],
    'templates': [{ type: ContentChildren, args: [PrimeTemplate,] },],
    'template': [{ type: ContentChild, args: [TemplateRef,] },],
};
var Row = (function () {
    function Row() {
    }
    return Row;
}());
export { Row };
Row.decorators = [
    { type: Component, args: [{
                selector: 'p-row',
                template: ""
            },] },
];
/** @nocollapse */
Row.ctorParameters = function () { return []; };
Row.propDecorators = {
    'columns': [{ type: ContentChildren, args: [Column,] },],
};
var HeaderColumnGroup = (function () {
    function HeaderColumnGroup() {
    }
    return HeaderColumnGroup;
}());
export { HeaderColumnGroup };
HeaderColumnGroup.decorators = [
    { type: Component, args: [{
                selector: 'p-headerColumnGroup',
                template: ""
            },] },
];
/** @nocollapse */
HeaderColumnGroup.ctorParameters = function () { return []; };
HeaderColumnGroup.propDecorators = {
    'rows': [{ type: ContentChildren, args: [Row,] },],
};
var FooterColumnGroup = (function () {
    function FooterColumnGroup() {
    }
    return FooterColumnGroup;
}());
export { FooterColumnGroup };
FooterColumnGroup.decorators = [
    { type: Component, args: [{
                selector: 'p-footerColumnGroup',
                template: ""
            },] },
];
/** @nocollapse */
FooterColumnGroup.ctorParameters = function () { return []; };
FooterColumnGroup.propDecorators = {
    'rows': [{ type: ContentChildren, args: [Row,] },],
};
var ColumnBodyTemplateLoader = (function () {
    function ColumnBodyTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnBodyTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.bodyTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    };
    ColumnBodyTemplateLoader.prototype.ngOnChanges = function (changes) {
        if (!this.view) {
            return;
        }
        if ('rowIndex' in changes) {
            this.view.context.rowIndex = changes['rowIndex'].currentValue;
        }
    };
    ColumnBodyTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnBodyTemplateLoader;
}());
export { ColumnBodyTemplateLoader };
ColumnBodyTemplateLoader.decorators = [
    { type: Component, args: [{
                selector: 'p-columnBodyTemplateLoader',
                template: ""
            },] },
];
/** @nocollapse */
ColumnBodyTemplateLoader.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
ColumnBodyTemplateLoader.propDecorators = {
    'column': [{ type: Input },],
    'rowData': [{ type: Input },],
    'rowIndex': [{ type: Input },],
};
var ColumnHeaderTemplateLoader = (function () {
    function ColumnHeaderTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnHeaderTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.headerTemplate, {
            '\$implicit': this.column
        });
    };
    ColumnHeaderTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnHeaderTemplateLoader;
}());
export { ColumnHeaderTemplateLoader };
ColumnHeaderTemplateLoader.decorators = [
    { type: Component, args: [{
                selector: 'p-columnHeaderTemplateLoader',
                template: ""
            },] },
];
/** @nocollapse */
ColumnHeaderTemplateLoader.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
ColumnHeaderTemplateLoader.propDecorators = {
    'column': [{ type: Input },],
};
var ColumnFooterTemplateLoader = (function () {
    function ColumnFooterTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnFooterTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.footerTemplate, {
            '\$implicit': this.column
        });
    };
    ColumnFooterTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnFooterTemplateLoader;
}());
export { ColumnFooterTemplateLoader };
ColumnFooterTemplateLoader.decorators = [
    { type: Component, args: [{
                selector: 'p-columnFooterTemplateLoader',
                template: ""
            },] },
];
/** @nocollapse */
ColumnFooterTemplateLoader.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
ColumnFooterTemplateLoader.propDecorators = {
    'column': [{ type: Input },],
};
var ColumnFilterTemplateLoader = (function () {
    function ColumnFilterTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnFilterTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.filterTemplate, {
            '\$implicit': this.column
        });
    };
    ColumnFilterTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnFilterTemplateLoader;
}());
export { ColumnFilterTemplateLoader };
ColumnFilterTemplateLoader.decorators = [
    { type: Component, args: [{
                selector: 'p-columnFilterTemplateLoader',
                template: ""
            },] },
];
/** @nocollapse */
ColumnFilterTemplateLoader.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
ColumnFilterTemplateLoader.propDecorators = {
    'column': [{ type: Input },],
};
var ColumnEditorTemplateLoader = (function () {
    function ColumnEditorTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnEditorTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.editorTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    };
    ColumnEditorTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnEditorTemplateLoader;
}());
export { ColumnEditorTemplateLoader };
ColumnEditorTemplateLoader.decorators = [
    { type: Component, args: [{
                selector: 'p-columnEditorTemplateLoader',
                template: ""
            },] },
];
/** @nocollapse */
ColumnEditorTemplateLoader.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
ColumnEditorTemplateLoader.propDecorators = {
    'column': [{ type: Input },],
    'rowData': [{ type: Input },],
    'rowIndex': [{ type: Input },],
};
var TemplateLoader = (function () {
    function TemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateLoader.prototype.ngOnInit = function () {
        if (this.template) {
            this.view = this.viewContainer.createEmbeddedView(this.template, {
                '\$implicit': this.data
            });
        }
    };
    TemplateLoader.prototype.ngOnDestroy = function () {
        if (this.view)
            this.view.destroy();
    };
    return TemplateLoader;
}());
export { TemplateLoader };
TemplateLoader.decorators = [
    { type: Component, args: [{
                selector: 'p-templateLoader',
                template: ""
            },] },
];
/** @nocollapse */
TemplateLoader.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
TemplateLoader.propDecorators = {
    'template': [{ type: Input },],
    'data': [{ type: Input },],
};
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
export { SharedModule };
SharedModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Header, Footer, Column, TemplateWrapper, ColumnHeaderTemplateLoader, ColumnBodyTemplateLoader, ColumnFooterTemplateLoader, ColumnFilterTemplateLoader, PrimeTemplate, TemplateLoader, Row, HeaderColumnGroup, FooterColumnGroup, ColumnEditorTemplateLoader],
                declarations: [Header, Footer, Column, TemplateWrapper, ColumnHeaderTemplateLoader, ColumnBodyTemplateLoader, ColumnFooterTemplateLoader, ColumnFilterTemplateLoader, PrimeTemplate, TemplateLoader, Row, HeaderColumnGroup, FooterColumnGroup, ColumnEditorTemplateLoader]
            },] },
];
/** @nocollapse */
SharedModule.ctorParameters = function () { return []; };
//# sourceMappingURL=shared.js.map