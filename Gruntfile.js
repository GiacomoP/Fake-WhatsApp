module.exports = function(grunt) {
    grunt.initConfig({
        // Compile LESS
        less: {
            dev: {
                options: {
                    paths: ["public/css"]
                },
                files: {
                    "public/css/app.css": "public/less/app.less"
                }
            },
            production: {
                options: {
                    paths: ["public/css"],
                    compress: true,
                    cleancss: true
                },
                files: {
                    "public/css/app.css": "public/less/app.less"
                }
            }
        },

        // Compile ES6
        browserify: {
            options: {
                alias: {
                    "jquery": "jquery/dist/jquery.min.js"
                }
            },
            dev: {
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    transform: [
                        ["babelify", {
                            presets: ["es2015"],
                            compact: false,
                            minified: false,
                            comments: true
                        }]
                    ]
                },
                files : {
                    "public/js/app.js": ["public/modules/app.es6"]
                }
            },
            production: {
                options: {
                    browserifyOptions: {
                        debug: false
                    },
                    transform: [
                        ["babelify", {
                            presets: ["es2015"],
                            compact: true,
                            minified: true,
                            comments: false
                        }]
                    ]
                },
                files : {
                    "public/js/app.js": ["public/modules/app.es6"]
                }
            }
        },

        // Minify Javascript
        uglify: {
            dev: {
                options: {
                    beautify: true,
                    report: 'none'
                },
                files: {
                    "public/js/app.min.js": "public/js/app.js"
                }
            },
            production: {
                options: {
                    compress: {
                        dead_code: true,
                        drop_console: true,
                        conditionals: true
                    },
                    preserveComments: false,
                    report: 'none'
                },
                files: {
                    "public/js/app.min.js": "public/js/app.js"
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Available tasks
    grunt.registerTask('default', ['less', 'browserify']);
    grunt.registerTask('dev', ['less:dev', 'browserify:dev', 'uglify:dev']);
    grunt.registerTask('production', ['less:production', 'browserify:production', 'uglify:production']);
};
