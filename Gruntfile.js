const sass = require('sass');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['build/']
    },

    sass: {
      dev: {
        options: {
          implementation: sass,
          sourceMap: true
        },
        files: {
          'build/css/style.css': 'assets/scss/main.scss'
        }
      },
      prod: {
        options: {
          implementation: sass,
          sourceMap: false
        },
        files: {
          'build/css/style.css': 'assets/scss/main.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 11'],
        map: true
      },
      dist: {
        files: {
          'build/css/style.css': 'build/css/style.css'
        }
      }
    },

    cssmin: {
      prod: {
        files: {
          'build/css/style.css': 'build/css/style.css'
        }
      }
    },

    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'index.html'
        }
      },
      dev: {
        files: {
          'build/index.html': 'index.html'
        }
      }
    },

    copy: {
      images: {
        expand: true,
        cwd: 'assets/img/',
        src: '**',
        dest: 'build/assets/img/'
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'build/css/*.css',
            'build/index.html',
            'build/assets/img/**/*'
          ]
        },
        options: {
          watchTask: true,
          server: './build'
        }
      }
    },

    watch: {
      html: {
        files: ['index.html'],
        tasks: ['htmlmin:dev']
      },
      css: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['sass:dev', 'autoprefixer']
      },
      img: {
        files: ['assets/img/**/*'],
        tasks: ['copy:images']
      }
    }
  });

  grunt.registerTask(
    'dev',
    [
      'clean',
      'htmlmin:dev',
      'sass:dev',
      'autoprefixer',
      'copy:images',
      'browserSync',
      'watch'
    ]
  );

  grunt.registerTask(
    'prod',
    [
      'clean',
      'htmlmin:prod',
      'sass:prod',
      'autoprefixer',
      'cssmin',
      'copy:images'
    ]
  );

  grunt.registerTask('default', ['dev']);
};
