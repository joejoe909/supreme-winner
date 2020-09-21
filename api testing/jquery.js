// Using an object literal for a jQuery feature
var myFeature = {
    init: function (settings) {
        myFeature.config = {
            items: $("#myFeature li"),
            container: $("<div class='container'></div>"),
            urlBase: "/foo.php?item="
        };

        // Allow overriding the default config
        $.extend(myFeature.config, settings);

        myFeature.setup();
    },

    setup: function () {
        myFeature.config.items
            .each(myFeature.createContainer)
            .click(myFeature.showItem);
    },

    createContainer: function () {
        var item = $(this);
        var container = myFeature.config.container
            .clone()
            .appendTo(item);
        item.data("container", container);
    },

    buildUrl: function () {
        return myFeature.config.urlBase + myFeature.currentItem.attr("id");
    },

    showItem: function () {
        myFeature.currentItem = $(this);
        myFeature.getContent(myFeature.showContent);
    },

    getContent: function (callback) {
        var url = myFeature.buildUrl();
        myFeature.currentItem.data("container").load(url, callback);
    },

    showContent: function () {
        myFeature.currentItem.data("container").show();
        myFeature.hideContent();
    },

    hideContent: function () {
        myFeature.currentItem.siblings().each(function () {
            $(this).data("container").hide();
        });
    }
};

$(document).ready(myFeature.init);
The first thing you'll notice is that this approach is obviously far longer than the original — again, if this were the extent of our application, using an object literal would likely be overkill. Assuming it's not the extent of our application, though, we've gained several things:

We've broken our feature up into tiny methods. In the future, if we want to change how content is shown, it's clear where to change it.In the original code, this step is much harder to locate.
    We've eliminated the use of anonymous functions.
We've moved configuration options out of the body of the code and put them in a central location.
We've eliminated the constraints of the chain, making the code easier to refactor, remix, and rearrange.
For non - trivial features, object literals are a clear improvement over a long stretch of code stuffed in a $(document).ready() block, as they get us thinking about the pieces of our functionality.However, they aren't a whole lot more advanced than simply having a bunch of function declarations inside of that $( document ).ready() block.

linkThe Module Pattern
The module pattern overcomes some of the limitations of the object literal, offering privacy for variables and functions while exposing a public API if desired.

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
// The module pattern
var feature = (function () {

    // Private variables and functions
    var privateThing = "secret";
    var publicThing = "not secret";

    var changePrivateThing = function () {
        privateThing = "super secret";
    };

    var sayPrivateThing = function () {
        console.log(privateThing);
        changePrivateThing();
    };

    // Public API
    return {
        publicThing: publicThing,
        sayPrivateThing: sayPrivateThing
    };
})();

feature.publicThing; // "not secret"

// Logs "secret" and changes the value of privateThing
feature.sayPrivateThing();
In the example above, we self - execute an anonymous function that returns an object.Inside of the function, we define some variables.Because the variables are defined inside of the function, we don't have access to them outside of the function unless we put them in the return object. This means that no code outside of the function has access to the privateThing variable or to the changePrivateThing function. However, sayPrivateThing does have access to privateThing and changePrivateThing, because both were defined in the same scope as sayPrivateThing.

This pattern is powerful because, as you can gather from the variable names, it can give you private variables and functions while exposing a limited API consisting of the returned object's properties and methods.

Below is a revised version of the previous example, showing how we could create the same feature using the module pattern while only exposing one public method of the module, showItemByIndex().

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
// Using the module pattern for a jQuery feature
$(document).ready(function () {
    var feature = (function () {
        var items = $("#myFeature li");
        var container = $("<div class='container'></div>");
        var currentItem = null;
        var urlBase = "/foo.php?item=";

        var createContainer = function () {
            var item = $(this);
            var _container = container.clone().appendTo(item);
            item.data("container", _container);
        };

        var buildUrl = function () {
            return urlBase + currentItem.attr("id");
        };

        var showItem = function () {
            currentItem = $(this);
            getContent(showContent);
        };

        var showItemByIndex = function (idx) {
            $.proxy(showItem, items.get(idx));
        };

        var getContent = function (callback) {
            currentItem.data("container").load(buildUrl(), callback);
        };

        var showContent = function () {
            currentItem.data("container").show();
            hideContent();
        };

        var hideContent = function () {
            currentItem.siblings().each(function () {
                $(this).data("container").hide();
            });
        };

        items.each(createContainer).click(showItem);

        return {
            showItemByIndex: showItemByIndex
        };
    })();

    feature.showItemByIndex(0);
});