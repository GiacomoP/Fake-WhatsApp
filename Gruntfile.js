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
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-less');

    // Available tasks
    grunt.registerTask('default', ['less']);
    grunt.registerTask('dev', ['less:dev']);
    grunt.registerTask('production', ['less:production']);
};
