/*! Backbone.ThisEvents.js 1.0.0 | (c) Michael Welborn | Backbone.ThisEvents is MIT licensed */
(function(root, factory) {
    "use strict";
    if (typeof define === "function" && define.amd)
        define(["underscore", "backbone"], factory);
    else if (typeof exports !== "undefined")
        factory(require("underscore"), require("backbone"));
    else
        factory(root._, root.Backbone);
})(typeof self !== "undefined" ? self : this, function(_, Backbone) {
    "use strict";

    var listenToThisEvents = function(events) {
        events = events || _.result(this, "events");

        _.each(events, function(callback, event) {
            if (!_.isFunction(callback))
                callback = this[callback];
            if (!_.isFunction(callback))
                return;
            this.listenTo(this, event, callback);
        }, this);

        return this;
    };

    var mixinThisEvents = function(class_) {
        return class_.extend({
            constructor: function() {
                class_.apply(this, arguments);
                this.listenToThisEvents();
            },

            listenToThisEvents: listenToThisEvents
        });
    };

    Backbone.ThisEventsModel = mixinThisEvents(Backbone.Model);
    Backbone.ThisEventsCollection = mixinThisEvents(Backbone.Collection);
    Backbone.ThisEventsRouter = mixinThisEvents(Backbone.Router);
});
