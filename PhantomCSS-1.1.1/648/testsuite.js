/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require( path );
var server = require('webserver').create();

casper.test.begin( 'Pixit visual tests', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/648/screenshots' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/648/failures' ),
		addLabelToFailedImage: false,
		/*
		screenshotRoot: '/screenshots',
		failedComparisonsRoot: '/failures'
		casper: specific_instance_of_casper,
		libraryRoot: '/phantomcss',
		fileNameGetter: function overide_file_naming(){},
		onPass: function passCallback(){},
		onFail: function failCallback(){},
		onTimeout: function timeoutCallback(){},
		onComplete: function completeCallback(){},
		hideElements: '#thing.selector',
		addLabelToFailedImage: true,
		outputSettings: {
			errorColor: {
				red: 255,
				green: 255,
				blue: 0
			},
			errorType: 'movement',
			transparency: 0.3
		}*/
	} );

	casper.on( 'remote.message', function ( msg ) {
		this.echo( msg );
	} );

	casper.on( 'error', function ( err ) {
		this.die( "PhantomJS has errored: " + err );
	} );

	casper.on( 'resource.error', function ( err ) {
		casper.log( 'Resource load error: ' + err, 'warning' );
	} );
	/*
		The test scenario
	*/

	casper.start( 'http://sfsuswe.com/~barsukov/' );
  casper.viewport( 1280, 1024 );
	casper.then( function () {
		phantomcss.screenshot( 'body', 'frontpage');
	} );
	casper.then( function () {
		casper.click( 'a[data-target="#loginModal"]' );
		// wait for modal to fade-in
		casper.waitForSelector( '#loginModal:not([style*="display: none"])',
			function success() {
				phantomcss.screenshot( '#loginModal', 'login popup' );
			},
			function timeout() {
				casper.test.fail( 'Should see login popup' );
			}
		);
	} );
  casper.then(function() {
    this.fill('#login_form', {
      'email': 'artist1@sfsu.edu',
      'password': 'artist1'
    }, true); //this submits form
    casper.waitForSelector( '.upload-pane',
			function success() {
				phantomcss.screenshot( 'body', 'artist home' );
			},
			function timeout() {
				casper.test.fail( 'Should be logged in as artist' );
			}
		);
  });
  casper.then(function() {
    this.fill('.navbar-form', {'query': 'nature'}, true);
    casper.waitForSelectorTextChange('title',
			function success() {
				phantomcss.screenshot( 'body', 'search results (nature)' );
			},
			function timeout() {
				casper.test.fail( 'Should display search results' );
			}
		);
  });
  
  /*
	casper.then( function () {
		casper.click( '#cappuccino-button' );
		phantomcss.screenshot( '#myModal', 'cappuccino success' );
	} );

	casper.then( function () {
		casper.click( '#close' );

		// wait for modal to fade-out
		casper.waitForSelector( '#myModal[style*="display: none"]',
			function success() {
				phantomcss.screenshot( {
					'Coffee machine close success': {
						selector: '#coffee-machine-wrapper',
						ignore: '.selector'
					},
					'Coffee machine button success': '#coffee-machine-button'
				} );
			},
			function timeout() {
				casper.test.fail( 'Should be able to walk away from the coffee machine' );
			}
		);
	} );
  */
	casper.then( function now_check_the_screenshots() {
		// compare screenshots
		phantomcss.compareAll();
	} );

	/*
	Casper runs tests
	*/
	casper.run( function () {
		console.log( '\nTHE END.' );
		// phantomcss.getExitStatus() // pass or fail?
		casper.test.done();
	} );
} );
