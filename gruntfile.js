'use strict';

module.exports = function(grunt) {
  var srcFiles = [
  './*.js',
  'lib/**/*.js',
  'models/**/*.js',
  'routes/**/*.js',
  'public/**/*.js',
  'test/**/*test.js'
  ];

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    watch: {
      files: ['./*.js',
              'lib/**/*.js',
              'models/**/*.js',
              'routes/**/*.js',
              'public/**/*.js',
              'test/**/*test.js',
              'public/index.html'],
      tasks: ['build']
    },
    sass: {
      dist: {
        options: {
          includePaths: require('node-bourbon').includePaths
        },
        files: {
          'public/css/main.css': 'public/css/main.scss'
        }
      }
    },
    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy:{
      dev: {
        cwd: 'public/',
        src: ['**/*.html', 'css/**/*.css'],
        expand: true,
        dest: 'build/'
      }
    },

    browserify: {
      dev: {
        src: ['public/js/**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['debowerify']
        }
      },

      test: {
        src: ['test/client/**/*test.js'],
        dest:'test/test_bundle.js',
        options:{
          transform: ['debowerify']
        }
      }
    },

    jshint: {
      all: srcFiles,
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: srcFiles,
      options: {
        config: '.jscsrc'
      }
    },

    simplemocha: {
      src: ['test/test.js']
    }
  });

  grunt.registerTask('build:dev', ['clean:dev', 'sass', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('build:test', ['browserify:test']);
  grunt.registerTask('test', ['build:test', 'jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('build', ['build:dev']);
  grunt.registerTask('default', ['test']);
};
