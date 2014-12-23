module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
		  options: {
		    // the banner is inserted at the top of the output
		    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		  },
		  dist: {
		    files: {
		      'stylesheets/mainStyle.min.css': 'stylesheets/mainStyle.css'
		    }
		  }
		},
		jshint: {
			all: ['gruntfile.js', 'scripts/angular/*.js','scripts/angular/**/*.js','scripts/*.js']
		},
		concat: {
		    /*options: {
		      separator: ';',
		    },*/
		    dist: {
		      src: [
		      'scripts/vendor/jquery.min.js',
		      'scripts/vendor/angular.min.js',
		      'scripts/vendor/bootstrap3-typeahead.min.js',
		      'scripts/bootstrap/modal.js', 
		      'scripts/bootstrap/tab.js',
		      'scripts/bootstrap/transition.js',
		      'scripts/utilities.js',
		      'scripts/positioning.js',
		      'scripts/angular/base/angular-app.js',
		      'scripts/angular/angular-controller-addPlayer.js',
		      'scripts/angular/angular-controller-start.js',
		      'scripts/angular/angular-controller-gameBoard.js',
		      'scripts/angular/angular-controller-scoreboard.js',
		      'scripts/angular/angular-controller-newPlayers.js',
		      'scripts/angular/angular-controller-options.js',
		      'scripts/angular/angular-controller-confirm.js',
		      'scripts/angular/angular-controller-bosklappers.js'
		      ],
		      dest: 'scripts/dist/script.js',
		    }
		},
		uglify: {
		  dist: {
		    files: {
		     'scripts/dist/script.min.js': 'scripts/dist/script.js'
		    }
		  }
		}
	});
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default',['cssmin'/*,'jshint'*/,'concat','uglify']);
}