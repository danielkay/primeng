import { NgModule, Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var Draggable = (function () {
    function Draggable(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onDragStart = new EventEmitter();
        this.onDragEnd = new EventEmitter();
        this.onDrag = new EventEmitter();
    }
    Draggable.prototype.dragStart = function (event) {
        if (this.allowDrag()) {
            if (this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }
            event.dataTransfer.setData('text', this.scope);
            this.onDragStart.emit(event);
        }
        else {
            event.preventDefault();
        }
    };
    Draggable.prototype.drag = function (event) {
        this.onDrag.emit(event);
    };
    Draggable.prototype.dragEnd = function (event) {
        this.onDragEnd.emit(event);
    };
    Draggable.prototype.mouseover = function (event) {
        this.handle = event.target;
    };
    Draggable.prototype.mouseleave = function (event) {
        this.handle = null;
    };
    Draggable.prototype.allowDrag = function () {
        if (this.dragHandle && this.handle)
            return this.domHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    };
    return Draggable;
}());
export { Draggable };
Draggable.decorators = [
    { type: Directive, args: [{
                selector: '[pDraggable]',
                host: {
                    '[draggable]': 'true'
                },
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
Draggable.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
]; };
Draggable.propDecorators = {
    'scope': [{ type: Input, args: ['pDraggable',] },],
    'dragEffect': [{ type: Input },],
    'dragHandle': [{ type: Input },],
    'onDragStart': [{ type: Output },],
    'onDragEnd': [{ type: Output },],
    'onDrag': [{ type: Output },],
    'dragStart': [{ type: HostListener, args: ['dragstart', ['$event'],] },],
    'drag': [{ type: HostListener, args: ['drag', ['$event'],] },],
    'dragEnd': [{ type: HostListener, args: ['dragend', ['$event'],] },],
    'mouseover': [{ type: HostListener, args: ['mouseover', ['$event'],] },],
    'mouseleave': [{ type: HostListener, args: ['mouseleave', ['$event'],] },],
};
var Droppable = (function () {
    function Droppable(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onDragEnter = new EventEmitter();
        this.onDragLeave = new EventEmitter();
        this.onDrop = new EventEmitter();
        this.onDragOver = new EventEmitter();
    }
    Droppable.prototype.drop = function (event) {
        if (this.allowDrop(event)) {
            event.preventDefault();
            this.onDrop.emit(event);
        }
    };
    Droppable.prototype.dragEnter = function (event) {
        event.preventDefault();
        if (this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }
        this.onDragEnter.emit(event);
    };
    Droppable.prototype.dragLeave = function (event) {
        event.preventDefault();
        this.onDragLeave.emit(event);
    };
    Droppable.prototype.dragOver = function (event) {
        event.preventDefault();
        this.onDragOver.emit(event);
    };
    Droppable.prototype.allowDrop = function (event) {
        var dragScope = event.dataTransfer.getData('text');
        if (typeof (this.scope) == "string" && dragScope == this.scope) {
            return true;
        }
        else if (this.scope instanceof Array) {
            for (var j = 0; j < this.scope.length; j++) {
                if (dragScope == this.scope[j]) {
                    return true;
                }
            }
        }
        return false;
    };
    return Droppable;
}());
export { Droppable };
Droppable.decorators = [
    { type: Directive, args: [{
                selector: '[pDroppable]',
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
Droppable.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
]; };
Droppable.propDecorators = {
    'scope': [{ type: Input, args: ['pDroppable',] },],
    'dropEffect': [{ type: Input },],
    'onDragEnter': [{ type: Output },],
    'onDragLeave': [{ type: Output },],
    'onDrop': [{ type: Output },],
    'onDragOver': [{ type: Output },],
    'drop': [{ type: HostListener, args: ['drop', ['$event'],] },],
    'dragEnter': [{ type: HostListener, args: ['dragenter', ['$event'],] },],
    'dragLeave': [{ type: HostListener, args: ['dragleave', ['$event'],] },],
    'dragOver': [{ type: HostListener, args: ['dragover', ['$event'],] },],
};
var DragDropModule = (function () {
    function DragDropModule() {
    }
    return DragDropModule;
}());
export { DragDropModule };
DragDropModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Draggable, Droppable],
                declarations: [Draggable, Droppable]
            },] },
];
/** @nocollapse */
DragDropModule.ctorParameters = function () { return []; };
//# sourceMappingURL=dragdrop.js.map