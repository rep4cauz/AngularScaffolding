// Build configurations.
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Clean external folders where files are copied to from guide
        clean: {
            app: ['app/**/*', 'app/.htaccess'],
            temp: 'src/tmp/'
        },
        /*
        cdndeps: {
            options: {
                src: "package.json",
                dest: "tmp/cdns"
            }
        },
        */
        // Copies directories and files from one location to another.
        copy: {
            // DEVELOPMENT
            dev: {
                files: [
                    { 'app/index.html': 'src/html/app.dev.html' },
                    {
                        cwd: 'src/img/',
                        src: '**/*',
                        dest: 'app/Content/desktop/img/',
                        flatten: false,
                        expand: true
                    },
                    {
                        cwd: 'src/fonts/',
                        src: '**/*',
                        dest: 'app/Content/desktop/fonts/',
                        flatten: false,
                        expand: true
                    }
                ]
            },
            prod: {
            //production
                files: [
                    { 'app/index.html': 'src/html/app.prod.html' },
                    { cwd: 'src/img/', src: '*', dest: 'app/Content/desktop/img/', flatten: false, expand: true },
                    { cwd: 'src/fonts/', src: '**/*', dest: 'app/Content/desktop/fonts/', flatten: false, expand: true },
                    { cwd: 'src/tpl/', src: '**/*', dest: 'src/tmp/tpl/', flatten: false, expand: true },
                    { cwd: 'src/css/', src: '**/*', dest: 'src/tmp/css/', flatten: false, expand: true },
                    { cwd: 'src/js/', src: '**/*', dest: 'src/tmp/js/', flatten: false, expand: true }
                ]
            }
        },

        // Replacing text
        "regex-replace": {
            // Will replace path with proper ones for prod to function

            prodcss: {
                src: 'src/tmp/css/**/*.*',
                actions: [
                    {
                        name: '../img/ replacing w/ /Content/desktop/img/',
                        search: '\\.\\.\/img\/',
                        replace: '/Content/desktop/img/',
                        flags: 'g'
                    },
                    {
                        name: '../fonts/ replacing w/ /Content/desktop/fonts/',
                        search: '\\.\\.\/fonts\/',
                        replace: '/Content/desktop/fonts/',
                        flags: 'g'
                    }
                ]
            },
            prodhtmljs: {
                src: ['src/tmp/tpl/**/*.*', 'src/tmp/js/**/*.*'],
                actions: [
                    {
                        name: 'tpl/ replacing w/ /Content/desktop/tpl/',
                        search: 'tpl\/',
                        replace: '/Content/desktop/tpl/',
                        flags: 'g'
                    }
                ]
            }
        },

        // Compile LESS (.less) files to CSS (.css).
        less: {
            options: { 'dumpLineNumbers': grunt.option('lessDumpLineNumbers') || false },
            // DEVELOPMENT
            devBase: { // Base
                files: { 'app/css/base.css': 'src/css/base.less' }
            },
            devComp: { // Components
                files: { 'app/css/components.css': 'src/css/components.less' }
            },
            devApp: { // App Specific
                files: { 'app/css/app.css': 'src/css/app.less' }
            },
            prod: {
                files: { 'src/tmp/css/app.css': ['src/tmp/css/base.less', 'src/tmp/css/components.less'] }
            }
        },

        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['app/css/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['app/css/*.css']
            }
        },

        // CSS minification
        cssmin: {
            prod: {
                options: { keepSpecialComments: 0 },
                expand: true,
                cwd: 'src/tmp/css/',
                src: ['app.css'],
                dest: 'app/Content/desktop/',
                ext: '.min.css'
            }
        },

        // HTML Minification
        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    cwd: 'src/tmp/tpl/', src: '**/*.html', dest: 'app/Content/desktop/tpl/', flatten: false, expand: true, dot: false
                }]
            }
        },

        // create template cache file
        ngtemplates: {
            devApp: {
                options: {
                    module: 'myApp'
                },
                cwd: 'src',
                src: 'tpl/**.html',
                dest: 'app/js/templates.js'
            },
            prod: {
                options: {
                    prefix: '/',
                    module: 'myApp'
                },
                cwd: 'app',
                src: '/Content/desktop/tpl/**/*.html',
                dest: 'app/Scripts/desktop/templates.min.js'
            }
        },

        // Concatinationg JS files
        concat: {
            // RE-USE
            libsList: [
                'src/js/lib/jquery/jquery-2.1.4.js',
                'src/js/lib/lo-dash/lodash.js',
                'src/js/lib/bootstrap/bootstrap.js',
                'src/js/lib/angular/angular.js',
                'src/js/lib/angular/angular-route.js',
                'src/js/lib/angular/angular-touch.js',
                'src/js/lib/angular/angular-animate.js',
                'src/js/lib/angular/angular-sanitize.js',
                'src/js/lib/angular/angular-cookies.js',
                'src/js/lib/ngStorage/ngStorage.js',
                'src/js/lib/bootstrap-ui/ui-bootstrap-tpls-0.13.3.js',
            ],
            prodLibsList: [
                'src/js/lib/jquery/jquery-2.1.4.min.js',
                'src/js/lib/lo-dash/lodash.min.js',
                'src/js/lib/bootstrap/bootstrap.min.js',
                'src/js/lib/angular/angular.min.js',
                'src/js/lib/angular/angular-route.min.js',
                'src/js/lib/angular/angular-touch.min.js',
                'src/js/lib/angular/angular-animate.min.js',
                'src/js/lib/angular/angular-sanitize.min.js',
                'src/js/lib/angular/angular-cookies.min.js',
                'src/js/lib/ngStorage/ngStorage.min.js',
                'src/js/lib/bootstrap-ui/ui-bootstrap-tpls-0.13.3.min.js',

            ],
            ieLibsList: [
                'src/js/lib/ie/*.js',
            ],
            // DEVELOPMENT
            devTilesA: {
                options: { separator: ';' },
                files: { 'app/js/app.js': ['src/js/app/*.js'] }
            },
            devTilesC: {
                options: { separator: ';' },
                files: { 'app/js/controllers.js': ['src/js/controllers/*.js'] }
            },
            devTilesD: {
                options: { separator: ';' },
                files: { 'app/js/directives.js': ['src/js/directives/*.js'] }
            },
            devTilesF: {
                options: { separator: ';' },
                files: { 'app/js/filters.js': ['src/js/filters/*.js'] }
            },
            devTilesS: {
                options: { separator: ';' },
                files: { 'app/js/services.js': ['src/js/services/*.js'] }
            },
            devLibs: {
                options: { separator: ';' },
                files: { 'app/js/libraries.js': '<%= concat.libsList %>' }
            },
            devIeLibs: {
                options: { separator: ';' },
                files: { 'app/js/ielibraries.js': '<%= concat.ieLibsList %>' }
            },
            // prod
            prod: {
                files: [
                    { 'app/Scripts/desktop/libraries.min.js': '<%= concat.prodLibsList %>' },
                    { 'src/tmp/js/temp-app.js': ['src/tmp/js/app/*.js'] },
                    { 'src/tmp/js/controllers.js': ['src/tmp/js/controllers/*.js'] },
                    { 'src/tmp/js/directives.js': ['src/tmp/js/directives/*.js'] },
                    { 'src/tmp/js/filters.js': ['src/tmp/js/filters/*.js'] },
                    { 'src/tmp/js/services.js': ['src/tmp/js/services/*.js'] },
                    { 'src/tmp/js/app.js': ['src/tmp/js/temp-app.js', 'src/tmp/js/controllers.js', 'src/tmp/js/directives.js', 'src/tmp/js/filters.js', 'src/tmp/js/services.js'] }
                ]
            }
        },

        jshint: {
            devTilesA: ['src/js/app/*.js'],
            devTilesC: ['src/js/controllers/*.js'],
            devTilesD: ['src/js/directives/*.js'],
            devTilesF: ['src/js/filters/*.js'],
            devTilesS: ['src/js/services/*.js'],
        },

        closurecompiler: {
            minify: {
                files: {
                    // Destination: Sources...
                    "app/Scripts/desktop/app.min.js": ['src/tmp/js/app.js']
                },
                options: {
                    // Any options supported by Closure Compiler, for example:
                    "compilation_level": "SIMPLE_OPTIMIZATIONS",

                    // Plus a simultaneous processes limit
                    "max_processes": 5
                }
            }
        },

        express: {
            dev: {
                options: {
                    background: true,
                    script: 'server.js'
                }
            },
            prod: {
                options: {
                    background: false,
                    script: 'serverprod.js'
                }
            }

        },

        // Watch files for changes and run tasks 
        watch: {
            // CSS, compile
            cssDevBase: {
                files: ['src/css/base/*.less'],
                tasks: ['less:devBase']
            },
            cssDevComp: {
                files: ['src/css/comp/*.less'],
                tasks: ['less:devComp']
            },
            cssDevApp: {
                files: ['src/css/app.less'],
                tasks: ['less:devApp']
            },
            // JavaScript, compile
            jsDevTilesA: {
                files: ['src/js/app/*.js'],
                tasks: ['concat:devTilesA']
            },
            jsDevTilesC: {
                files: ['src/js/controllers/*.js'],
                tasks: ['concat:devTilesC']
            },
            jsDevTilesD: {
                files: ['src/js/directives/*.js'],
                tasks: ['concat:devTilesD']
            },
            jsDevTilesF: {
                files: ['src/js/filters/*.js'],
                tasks: ['concat:devTilesF']
            },
            jsDevTilesS: {
                files: ['src/js/services/*.js'],
                tasks: ['concat:devTilesS']
            },
            jsDevLibs: {
                files: ['src/js/lib/**/*.js'],
                tasks: ['concat:devLibs']
            },
            // Templates, copy
            templates: {
                files: ['src/tpl/**/*'],
                tasks: ['ngtemplates:devApp']
            },
            // Images, copy
            files: {
                files: ['src/img/**/*', 'src/html/app.dev.html'],
                tasks: ['copy:dev']
            },
            // ExpressJs Server
            express: {
                files: ['server.js', 'server/**/*.js', 'server/**/*.json'],
                tasks: ['express:dev'],
                options: {
                    nospawn: true //Without this option specified express won't be reloaded
                }
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: { livereload: true },
                files: ['app/**/*'],
            }
        }


    });

    // PLUGINS:
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-closurecompiler');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-cachebuster');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-hustler');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-regex-replace');


    // TASKS:
    // 
    // FLAGS: 
    // grunt dev --lessDumpLineNumbers=all sets 

    /* DEV: Compiles the app with non-optimized build settings, places the build artifacts in the dist directory, and watches for file changes.
    run: grunt dev */
    grunt.registerTask('dev', 'Running "DEVELOPMENT", watching files and compiling...', [
        'default',
        'express:dev',
        'watch'
    ]);

    /* PROD: Compile and package up for production deployment
    run: grunt prod */
    grunt.registerTask('prod', 'Running "PROD", will package up for production...', [
        'clean:app',
        'copy:prod',
        'regex-replace:prodcss',
        'regex-replace:prodhtmljs',
        'less:prod',
        'cssmin:prod',
        'htmlmin:prod',
        'ngtemplates:prod',
        'concat:prod',
        'closurecompiler:minify',
        'clean:temp',
        'express:prod'
    ]);


    /* DEFAULT: Compiles the app with non-optimized build settings and places the build artifacts in the dist directory.
    run: grunt */
    grunt.registerTask('default', 'Running "DEFAULT", compiling everything.', [
        // Clean and copy files as needed
        'clean:app',
        'copy:dev',
        // Compile Less files
        'less:devBase',
        'less:devComp',
        'less:devApp',
        //lint js
        // 'jshint:devTilesA',
        // 'jshint:devTilesC',
        // 'jshint:devTilesD',
        // 'jshint:devTilesF',
        // 'jshint:devTilesS',
        // Concatination JS files
        'concat:devTilesA',
        'concat:devTilesC',
        'concat:devTilesD',
        'concat:devTilesF',
        'concat:devTilesS',
        'concat:devLibs',
        // Angular template caching
        'ngtemplates:devApp'
    ]);

    grunt.registerTask('lintcss', 'Running "DEFAULT", compiling everything.', [

        'csslint:lax'
    ]);

    grunt.registerTask('lintjs', 'Running "DEFAULT", compiling everything.', [

        //lint js
        'jshint:devTilesA',
        'jshint:devTilesC',
        'jshint:devTilesD',
        'jshint:devTilesF',
        'jshint:devTilesS'
    ]);

};