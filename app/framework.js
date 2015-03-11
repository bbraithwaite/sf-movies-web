'use strict';

window.Framework = function() {

  var QS = window.QS;
  var controllers = {};
  var routes = {};
  var services = {};

  function initView(id) {
    var el = document.getElementById(id);
    var template = (el) ? el.innerHTML : '';
    return {
      id: id,
      container: el,
      visible: function(value) {
        if (value) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      },
      template: template,
      setTemplate: function(templateHtml) {
        el.innerHTML = templateHtml;
      },
      setModel: function(model) {
        var propertyRegEx = /{{([a-zA-Z]+)\.([a-zA-Z]+)}}/g;
        var match;
        var property;
        var placeholder;
        var newTemplate;
        if (model) {
          match = propertyRegEx.exec(this.template);
          newTemplate = this.template;

          while (match != null) {
            placeholder = match[0];
            property = match[2];
            newTemplate = newTemplate.replace(placeholder, model[property]);
            match = propertyRegEx.exec(this.template);
          }

          while (newTemplate.indexOf('data-src') !== -1) {
            newTemplate = newTemplate.replace('data-src', 'src');
          }
          this.setTemplate(newTemplate);
        }
      }
    };
  }

  function addRoute(route, controller) {
    if (routes[route]) {
      routes[route].push(controller);
    } else {
      routes[route] = [controller];
    }
  }

  return {
    addController: function(controller) {
      var reflect = controller.toString();
      var args = reflect.match(/.*\((.*)\)/);
      var name = reflect.match(/function (.+)Controller/);
      var inject = [];
      args[1].split(',').forEach(function(key) {
        var Svc = services[key.trim()];
        if (typeof(svc) === 'function') {
          inject.push(new Svc());
        } else {
          inject.push(Svc);
        }
      });
      var viewName = name[1].toLowerCase();
      var instance = controller.apply(this, inject);
      instance.view = initView(viewName);
      if (instance.init) {
        instance.init();
      }
      addRoute(instance.route, viewName);
      controllers[name[1].toLowerCase()] = instance;
    },
    load: function(hash) {
      var match = hash.match(/#(\/.*)\?(.*)/);
      this.navigateTo('/');
      
      if (match) {
        this.navigateTo(match[1], QS.parse(match[2]));
      }
    },
    navigateTo: function(url, args) {
      var controller;

      if (routes[url]) {
        location.hash = url + QS.stringify(args);

        routes[url].forEach(function(c) {
          controller = controllers[c];
          if (controller) {
            if (controller.render) {
              controller.render(args);
            }
          }
        });
      } else {
        // handle 404
        console.log('404');
      }
    },
    registerService: function(name, instance) {
      services[name] = instance;
    }
  };
};
