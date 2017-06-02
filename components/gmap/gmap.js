import { NgModule, Component, ElementRef, Input, Output, EventEmitter, IterableDiffers, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
var GMap = (function () {
    function GMap(el, differs, cd, zone) {
        this.el = el;
        this.cd = cd;
        this.zone = zone;
        this.onMapClick = new EventEmitter();
        this.onOverlayClick = new EventEmitter();
        this.onOverlayDragStart = new EventEmitter();
        this.onOverlayDrag = new EventEmitter();
        this.onOverlayDragEnd = new EventEmitter();
        this.onMapReady = new EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    GMap.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.map = new google.maps.Map(this.el.nativeElement.children[0], this.options);
        this.onMapReady.emit({
            map: this.map
        });
        if (this.overlays) {
            for (var _i = 0, _a = this.overlays; _i < _a.length; _i++) {
                var overlay = _a[_i];
                overlay.setMap(this.map);
                this.bindOverlayEvents(overlay);
            }
        }
        this.map.addListener('click', function (event) {
            _this.zone.run(function () {
                _this.onMapClick.emit(event);
            });
        });
    };
    GMap.prototype.bindOverlayEvents = function (overlay) {
        var _this = this;
        overlay.addListener('click', function (event) {
            _this.zone.run(function () {
                _this.onOverlayClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: _this.map
                });
            });
        });
        if (overlay.getDraggable()) {
            this.bindDragEvents(overlay);
        }
    };
    GMap.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.overlays);
        if (changes && this.map) {
            changes.forEachRemovedItem(function (record) { record.item.setMap(null); });
            changes.forEachAddedItem(function (record) {
                record.item.setMap(_this.map);
                record.item.addListener('click', function (event) {
                    _this.zone.run(function () {
                        _this.onOverlayClick.emit({
                            originalEvent: event,
                            overlay: record.item,
                            map: _this.map
                        });
                    });
                });
                if (record.item.getDraggable()) {
                    _this.bindDragEvents(record.item);
                }
            });
        }
    };
    GMap.prototype.bindDragEvents = function (overlay) {
        var _this = this;
        overlay.addListener('dragstart', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDragStart.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('drag', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDrag.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('dragend', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDragEnd.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
    };
    GMap.prototype.getMap = function () {
        return this.map;
    };
    return GMap;
}());
export { GMap };
GMap.decorators = [
    { type: Component, args: [{
                selector: 'p-gmap',
                template: "<div [ngStyle]=\"style\" [class]=\"styleClass\"></div>"
            },] },
];
/** @nocollapse */
GMap.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: IterableDiffers, },
    { type: ChangeDetectorRef, },
    { type: NgZone, },
]; };
GMap.propDecorators = {
    'style': [{ type: Input },],
    'styleClass': [{ type: Input },],
    'options': [{ type: Input },],
    'overlays': [{ type: Input },],
    'onMapClick': [{ type: Output },],
    'onOverlayClick': [{ type: Output },],
    'onOverlayDragStart': [{ type: Output },],
    'onOverlayDrag': [{ type: Output },],
    'onOverlayDragEnd': [{ type: Output },],
    'onMapReady': [{ type: Output },],
};
var GMapModule = (function () {
    function GMapModule() {
    }
    return GMapModule;
}());
export { GMapModule };
GMapModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [GMap],
                declarations: [GMap]
            },] },
];
/** @nocollapse */
GMapModule.ctorParameters = function () { return []; };
//# sourceMappingURL=gmap.js.map