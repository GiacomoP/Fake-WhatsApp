module.exports = function(grunt) {
    grunt.initConfig({
        // Compile LESS
        less: {
            dev: {
                options: {
                    paths: ["src/css"]
                },
                files: {
                    "src/css/app.css": "src/less/app.less"
                }
            },
            production: {
                options: {
                    paths: ["src/css"],
                    compress: true,
                    cleancss: true
                },
                files: {
                    "src/css/app.css": "src/less/app.less"
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-less');

    // Available tasks
    grunt.registerTask('default', ['less']);
    grunt.registerTask('dev', ['less:dev']);
};
