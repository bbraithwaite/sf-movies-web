'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <%= pkg.version %> */\n'
      },
      build: {
        src: [
          'app/bower_components/boc-autocomplete/build/boc.autocomplete.min.js',
          'app/bower_components/jquery/dist/jquery.min.js',
          'app/bower_components/underscore/underscore-min.js',
          'app/bower_components/omdb-client/dist/omdb-client.min.js',
          'app/bower_components/backbone/backbone.js',
          'app/templates/*.js', 
          'app/views/*.js', 
          'app/*.js'
        ],
        dest: 'app/dist/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};