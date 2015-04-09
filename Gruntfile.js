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
        src: 'app/*.js',
        dest: 'app/dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      beforeconcat: ['app/*.js']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'jshint']);

};