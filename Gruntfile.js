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
          'app/app.js',
          'app/directives/*.js',
          'app/services/*.js',
          'app/controllers/*.js'
        ],
        dest: 'app/dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      beforeconcat: [
        'app/*.js',
        'app/directives/*.js',
        'app/services/*.js',
        'app/controllers/*.js'
      ]
    },
    watch: {
      scripts: {
        files: [
          'app/*.js',
          'app/directives/*.js',
          'app/services/*.js',
          'app/controllers/*.js'
        ],
        tasks: ['uglify'],
        options: {
          interrupt: true,
        },
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'jshint', 'watch']);

};