var assert = require('assert');
var config = require('./config');
var env = process.env.NODE_ENV || 'local';
var settings = config.getSettings({env: env});
assert.notEqual(settings.ENV, 'common', 'Could not locate environment "' + env + '"');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      'build/scripts/app.js': ['app/assets/scripts/*.js']
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: 'app/assets/img',
            src: ['**'],
            dest: 'build/img/',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'app/assets/scripts/vendor',
            src: ['**/*.js'],
            dest: 'build/scripts/',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'app/assets/stylesheets/vendor',
            src: ['**/*.css'],
            dest: 'build/stylesheets/',
            filter: 'isFile'
          }
        ]
      }
    },
    less: {
      dev: {
        files: [
          {
            expand: true,
            cwd: 'app/assets/stylesheets',
            src: ['*.less'],
            dest: 'build/stylesheets/',
            filter: 'isFile',
            ext: '.css'
          }
        ]
      }
    },
    sequelize: {
      options: {
        migrationsPath: __dirname + '/migrations',
        //The following is the sequelize config you're used to
        dialect: settings.database.dialect,
        username: settings.database.username,
        password: settings.database.password,
        database: settings.database.name,
        host: settings.database.host,
        port: settings.database.port
      }
    }
  });
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sequelize');
  grunt.registerTask('build', ['browserify', 'copy:dev', 'less:dev']);
};
