module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      'public/scripts/app.js': ['app/assets/scripts/*.js']
    }
  });
  grunt.loadNpmTasks('grunt-browserify');
};
