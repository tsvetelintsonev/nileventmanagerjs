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
