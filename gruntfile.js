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
		      'scripts/.temp/bootstrap/modal.min.js', 
		      'scripts/.temp/bootstrap/tab.min.js',
		      'scripts/.temp/bootstrap/transition.min.js',
		      'scripts/.temp/utilities.min.js',
		      'scripts/.temp/positioning.min.js',
		      'scripts/.temp/translations.min.js',
		      'scripts/.temp/angular/base/angular-app.min.js',
		      'scripts/.temp/angular/angular-controller-addPlayer.min.js',
		      'scripts/.temp/angular/angular-controller-start.min.js',
		      'scripts/.temp/angular/angular-controller-settingsGame.min.js',
		      'scripts/.temp/angular/angular-controller-gameBoard.min.js',
		      'scripts/.temp/angular/angular-controller-scoreboard.min.js',
		      'scripts/.temp/angular/angular-controller-newPlayers.min.js',
		      'scripts/.temp/angular/angular-controller-options.min.js',
		      'scripts/.temp/angular/angular-controller-confirm.min.js',
		      'scripts/.temp/angular/angular-controller-restoreGame.min.js',
		      'scripts/.temp/angular/angular-controller-bosklappers.min.js'
		      ],
		      dest: 'scripts/dist/script.min.js',
		    }
		},
		uglify: {
		  dist: {
		    files: {
		     /*'scripts/dist/script.min.js': 'scripts/dist/script.js',*/
		     'scripts/.temp/bootstrap/modal.min.js': 'scripts/bootstrap/modal.js',
		     'scripts/.temp/bootstrap/tab.min.js': 'scripts/bootstrap/tab.js',
		     'scripts/.temp/bootstrap/transition.min.js': 'scripts/bootstrap/transition.js',
		     'scripts/.temp/utilities.min.js': 'scripts/utilities.js',
		     'scripts/.temp/positioning.min.js': 'scripts/positioning.js',
		     'scripts/.temp/translations.min.js': 'scripts/translations.js',
		     'scripts/.temp/angular/base/angular-app.min.js': 'scripts/angular/base/angular-app.js',
		     'scripts/.temp/angular/angular-controller-start.min.js': 'scripts/angular/angular-controller-start.js',
		     'scripts/.temp/angular/angular-controller-addPlayer.min.js': 'scripts/angular/angular-controller-addPlayer.js',
		     'scripts/.temp/angular/angular-controller-settingsGame.min.js': 'scripts/angular/angular-controller-settingsGame.js',
		     'scripts/.temp/angular/angular-controller-bosklappers.min.js': 'scripts/angular/angular-controller-bosklappers.js',
		     'scripts/.temp/angular/angular-controller-confirm.min.js': 'scripts/angular/angular-controller-confirm.js',
		     'scripts/.temp/angular/angular-controller-gameBoard.min.js': 'scripts/angular/angular-controller-gameBoard.js',
		     'scripts/.temp/angular/angular-controller-newPlayers.min.js': 'scripts/angular/angular-controller-newPlayers.js',
		     'scripts/.temp/angular/angular-controller-options.min.js': 'scripts/angular/angular-controller-options.js',
		     'scripts/.temp/angular/angular-controller-restoreGame.min.js': 'scripts/angular/angular-controller-restoreGame.js',
		     'scripts/.temp/angular/angular-controller-scoreboard.min.js': 'scripts/angular/angular-controller-scoreboard.js'
		    }
		  }
		}
	});
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default',['cssmin'/*,'jshint'*/,'uglify','concat']);
	// scss compile through compass watch
}