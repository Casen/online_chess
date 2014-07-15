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
    }
  });
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('build', ['browserify', 'copy:dev', 'less:dev']);
};
