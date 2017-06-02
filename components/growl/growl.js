import { NgModule, Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var Growl = (function () {
    function Growl(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.sticky = false;
        this.life = 3000;
        this.onClose = new EventEmitter();
        this.valueChange = new EventEmitter();
        this.zIndex = DomHandler.zindex;
    }
    Growl.prototype.ngAfterViewInit = function () {
        this.container = this.containerViewChild.nativeElement;
    };
    Object.defineProperty(Growl.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            if (this.container) {
                this.handleValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Growl.prototype.handleValueChange = function () {
        var _this = this;
        if (this.preventRerender) {
            this.preventRerender = false;
            return;
        }
        this.zIndex = ++DomHandler.zindex;
        this.domHandler.fadeIn(this.container, 250);
        if (!this.sticky) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(function () {
                _this.removeAll();
            }, this.life);
        }
    };
    Growl.prototype.remove = function (index, msgel) {
        var _this = this;
        this.domHandler.fadeOut(msgel, 250);
        setTimeout(function () {
            _this.preventRerender = true;
            _this.onClose.emit({ message: _this.value[index] });
            _this._value = _this.value.filter(function (val, i) { return i != index; });
            _this.valueChange.emit(_this._value);
        }, 250);
    };
    Growl.prototype.removeAll = function () {
        var _this = this;
        if (this.value && this.value.length) {
            this.domHandler.fadeOut(this.container, 250);
            setTimeout(function () {
                _this.value.forEach(function (msg, index) { return _this.onClose.emit({ message: _this.value[index] }); });
                _this.value = [];
                _this.valueChange.emit(_this.value);
            }, 250);
        }
    };
    Growl.prototype.ngOnDestroy = function () {
        if (!this.sticky) {
            clearTimeout(this.timeout);
        }
    };
    return Growl;
}());
export { Growl };
Growl.decorators = [
    { type: Component, args: [{
                selector: 'p-growl',
                template: "\n        <div #container [ngClass]=\"'ui-growl ui-widget'\" [style.zIndex]=\"zIndex\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div #msgel *ngFor=\"let msg of value;let i = index\" class=\"ui-growl-item-container ui-state-highlight ui-corner-all ui-shadow\" aria-live=\"polite\"\n                [ngClass]=\"{'ui-growl-message-info':msg.severity == 'info','ui-growl-message-warn':msg.severity == 'warn',\n                    'ui-growl-message-error':msg.severity == 'error','ui-growl-message-success':msg.severity == 'success'}\">\n                <div class=\"ui-growl-item\">\n                     <div class=\"ui-growl-icon-close fa fa-close\" (click)=\"remove(i,msgel)\"></div>\n                     <span class=\"ui-growl-image fa fa-2x\"\n                        [ngClass]=\"{'fa-info-circle':msg.severity == 'info','fa-exclamation-circle':msg.severity == 'warn',\n                                'fa-close':msg.severity == 'error','fa-check':msg.severity == 'success'}\"></span>\n                     <div class=\"ui-growl-message\">\n                        <span class=\"ui-growl-title\">{{msg.summary}}</span>\n                        <p [innerHTML]=\"msg.detail\"></p>\n                     </div>\n                     <div style=\"clear: both;\"></div>\n                </div>\n            </div>\n        </div>\n    ",
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
Growl.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DomHandler, },
]; };
Growl.propDecorators = {
    'sticky': [{ type: Input },],
    'life': [{ type: Input },],
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'onClose': [{ type: Output },],
    'valueChange': [{ type: Output },],
    'containerViewChild': [{ type: ViewChild, args: ['container',] },],
    'value': [{ type: Input },],
};
var GrowlModule = (function () {
    function GrowlModule() {
    }
    return GrowlModule;
}());
export { GrowlModule };
GrowlModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Growl],
                declarations: [Growl]
            },] },
];
/** @nocollapse */
GrowlModule.ctorParameters = function () { return []; };
//# sourceMappingURL=growl.js.map