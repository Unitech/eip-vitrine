
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-template-html');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass : {
      dev: {
	options: {
	  sassDir: 'scss',
	  cssDir: 'app/css'
	}
      }
    },
    template: {
      dev: {
        engine: 'ejs',
        cwd: 'ejs/',
        data: 'locals.json',
        options: {
        },
        files: [{
          expand: true,     // Enable dynamic expansion.
          cwd: 'ejs/',      // Src matches are relative to this path.
          src: '**/*.ejs', // Actual pattern(s) to match.
          dest: 'app/',   // Destination path prefix.
          ext: '.html'  // Dest filepaths will have this extension.
        }]
      }
    },    
    connect: {
      server: {
	options: {
	  port: 9002,
	  base: 'app'
	}
      }
    },
    watch: {
      jade : {
    	files: ['ejs/**/*.ejs', 'locals.json'],
    	tasks: ['template']
      },
      scss : {
	files: ['scss/**/*.scss'],
	tasks: ['compass:dev']
      }
    }
  });

  grunt.registerTask('default', [
    'compass:dev',
    'template',
    'connect',
    'watch'
  ]);

};
