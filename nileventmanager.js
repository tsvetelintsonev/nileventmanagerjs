/*
* Copyright (c) 2017 Tsvetelin Tsonev <github.tsonev@yahoo.com>
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
*/
(function() {
    "use strict";

    var NileventManager = function NileventManager() {
        this.listeners = {};
    }

    NileventManager.prototype.on = function on(event, handler) {
        if(typeof handler != "function") throw Error("NileventManager: only callback functions may be registered as event handlers.");

        (this.listeners[event] || (this.listeners[event] = [])).push(handler);
        return this;
    }

    NileventManager.prototype.off = function off(event, handler) {
        var listeners, listenersLength, i;

        listeners = this.listeners[event];
        if(listeners) {
            listenersLength = listeners.length;

            if (arguments.length === 1) {
                delete this.listeners[event];
                return this;
            }

            for (i = 0; i < listenersLength; i++) {
                if (listeners[i] === handler) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
        return this;
    }

    NileventManager.prototype.fire = function fire() {
        var event, args, listeners, listenersLength, i;
        event = arguments[0];

        listeners = this.listeners[event];
        if(listeners) {
            listenersLength = listeners.length;
            args = arguments.length > 1 ? [].slice.call(arguments, 1) : [];

            for(i = 0; i < listenersLength; i++) {
                listeners[i].apply(this, args);
            }
        }
        return this;
    }

    NileventManager.prototype.eventify = function eventify(object) {
        var methods, methodsLength, listeners, i;
        methods = Object.keys(NileventManager.prototype);
        methodsLength = methods.length;
        listeners = {};

        for(i = 0; i < methodsLength; i++) {
            object[methods[i]] = NileventManager.prototype[methods[i]];
        }
        object["listeners"] = listeners;
        return object;
    }

    if (typeof module !== "undefined" && module !== null) {
        module.exports = NileventManager;
    } else {
        window.NileventManager = NileventManager;
    }
}).call(this);
