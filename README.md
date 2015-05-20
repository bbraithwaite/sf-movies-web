# San Francisco Movies Web App

This is part of a tutorial series to take some less than ideal JavaScript and refactor it to a modern standard.

See the blog post: [Refactoring a JavaScript Single Page App](http://www.bradoncode.com/tutorials/javascript-refactoring-tutorial-part-1/)

This branch is the Custom Framework version of the refactored [original version](https://github.com/bbraithwaite/sf-movies-web/tree/master).

This was put together for fun, over a glass of wine to experiment with creating a custom micro web framework loosely based on MVC, as opposed to using a 3rd party framework e.g. Angular, Backbone etc.

We can bootstrap the application as follows:

``` javascript
function main() {
  var mapContainer = document.getElementById('map-canvas');
  var app = new Framework();
  
  // Services
  app.registerService('map', new GoogleMap(mapContainer));
  app.registerService('http', JsonHttp);
  
  // Controllers
  app.addController(HomeController);
  app.addController(SearchController);
  app.addController(LocationsController);
  app.addController(FilmController);
  
  // init routes
  app.load(window.location.hash);
}
```

The controllers look like this:

``` javascript
window.SearchController = function SearchController(map) {
  var $ = this;

  return {
    viewModel: {
      query: document.getElementById('query')
    },
    route: '/',
    init: function() {
      new window.Autocomplete(this.viewModel.query, { 
        url: '/movies/search', 
        param: 'q',
        label: 'title',
        value: 'releaseYear',
        select: function(item) { 
          $.navigateTo('/film', { 
            title: item.title, 
            director: item.director 
          });
        }
      });
    },
    render: function() {
      map.addView(this.view, 'TOP_LEFT');
    }
  };
};
```

The micro web framework code can be found at: [boc-web-framework](https://github.com/bbraithwaite/boc-web-framework). 

NB This is for fun/learning and not production!


Related branches:

* [Original version](https://github.com/bbraithwaite/sf-movies-web/tree/master) - the original unrefactored version (master branch), including deliberate mistakes for this [refactoring tutorial](http://www.bradoncode.com/tutorials/javascript-refactoring-tutorial-part-1/)
* [AngularJS version](https://github.com/bbraithwaite/sf-movies-web/tree/angular) - a refactored version of the original, using AngularJS
* [Backbone version](https://github.com/bbraithwaite/sf-movies-web/tree/backbone) - a refactored version of the original, using BackboneJS
* [Refactoring version Part 1](https://github.com/bbraithwaite/sf-movies-web/tree/refactoring) - Part 1 of refactoring the original. See [refactoring tutorial](http://www.bradoncode.com/tutorials/javascript-refactoring-tutorial-part-1/)
* [Custom Framework](https://github.com/bbraithwaite/sf-movies-web/tree/noframeworks) - (this branch)  an experimental branch, using a [custom made micro framework](https://github.com/bbraithwaite/boc-web-framework)