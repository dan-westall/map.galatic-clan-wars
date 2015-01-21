'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // package options
        less: {
            mini: {
                options: {
                    cleancss: true, // minify
                    report: 'min' // minification results
                },
                expand: true, // set to true to enable options following options:
                cwd: "assets/less/", // all sources relative to this path
                src: "*.less", // source folder patterns to match, relative to cwd
                dest: "public/css/", // destination folder path prefix
                ext: ".css", // replace any existing extension with this value in dest folder
                flatten: true  // flatten folder structure to single level
            }
        },
        express: {
            server: {
                options: {
                    port: 3000,
                    hostname: 'localhost',
                    bases: 'public'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'js/*.js'
            ]
        },
        concat: {
            basic: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/lodash/dist/lodash.min.js',
                    'assets/js/app.js'
                ],
                dest: 'tmp/app.js'
            }
        },
        uglify: {
            options: {
                mangle: false,
                sourceMap: false
            },
            build: {
                files: {
                    'public/js/app.min.js' : 'tmp/app.js'
                }
            },

        },
        watch: {
            markup: {
                files: ['*.php', 'templates/*.html', 'index.html', 'app/**'],
                options: {
                    livereload: true,
                }
            },
            options: {
                livereload: true,
            },
            compass: {
                files: ['assets/sass/**/*.{scss,sass}'],
                tasksz: ['compass']
            },
            less: {
                files: ['assets/less/*.less'],  //watched files
                tasks: ['less'],                          //tasks to run
                options: {                    //reloads the browser
                    atBegin: true
                }
            },
            css: {
                files: ['public/css/*'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: [
                    'public/js/*.js'
                ],
                tasks: ['concat', 'uglify:build'],
                options: {
                    livereload: true,
                    atBegin: true
                }
            },
            img: {
                files: [
                    'assets/img/**'
                ],
                options: {
                    livereload: true
                }
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: { livereload: true },
                files: ['public/css/**/*']
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-express');

    // Register default tasks
    grunt.registerTask('default', [
        'express:server',
        'watch'
    ]);


};