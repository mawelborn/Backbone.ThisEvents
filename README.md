# Backbone.ThisEvents

Adds support for a declarative events hash for Models, Collections, and Routers to listen
to events on `this` similar to the way `View.events` binds callbacks to `View.el`. Events
binding is performed in the extended classes' constructors after `Class#initialize` is
called.

Provides `Backbone.ThisEventModel`, `Backbone.ThisEventCollection`, and
`Backbone.ThisEventRouter`. If you want to use it everywhere, add the following
immediately after the plugin.

~~~ JavaScript
Backbone.Model = Backbone.ThisEventModel;
Backbone.Collection = Backbone.ThisEventCollection;
Backbone.Router = Backbone.ThisEventRouter;
~~~

The following examples are equivalent:

~~~ JavaScript
Backbone.Model.extend({
    initialize: function() {
        this.listenTo(this, "change:foo", this.foo_changed);
        this.listenTo(this, "change:bar", function(model, bar) {
            // Update dependency of `bar`
        });
    },

    foo_changed: function(model, foo) {
        // Update dependency of `foo`
    }
});

Backbone.ThisEventsModel.extend({
    events: {
        "change:foo": "foo_changed",
        "change:bar": function(model, bar) {
            // Update dependency of `bar`
        }
    },

    foo_changed: function(model, foo) {
        // Update dependency of `foo`
    }
});
~~~
