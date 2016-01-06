$ = jQuery = require('./jquery-1.11.3.min.js');

var remote = require('remote');
var app = remote.require('app');
var BrowserWindow = remote.require('browser-window');
var dialog = remote.require('dialog');

var showMsg = function(message){
	var options = {
		title: 'Message from callback',
		type: 'info',
		buttons: ['OK', 'Cancel'],
		message: 'Callback passs',
		detail: message
	};
	var win = BrowserWindow.getFocusedWindow();
	dialog.showMessageBox(win, options);
};

////////////
var exec = function(args){

	function shspawn(command) {
		return spawn('sh', ['-c', command]);
	}
		var util  = require('util'),
		spawn = require('child_process').spawn,

		// ls    = spawn(args[0], args.slice(1));
		ls    = shspawn(args);

    ls.stdout.on('data', function (data) {
      // data = String(data).replace(/\n?$/g,"");
      console.log('stdout: ' + data);
			$("#editaria")[0].value += data;
    });
    ls.stderr.on('data', function (data) {
      data = String(data).replace(/\n?$/g,"");
      console.log('stderr: ' + data);
    });
    ls.on('exit', function (code, signal) {
      code = String(code).replace(/\n?$/g,"");
      console.log('child process exited with code ' + code);
      signal = String(signal).replace(/\n?$/g,"");
      console.log('child process terminated due to receipt of signal '+signal);
    });
};
////////////

var App = {
	// showSaveDialog: function(flag){
	// 	var options = {
	// 		title: 'Save Dialog Example',
	// 		defaultPath: app.getPath('userDesktop'),
	// 		filters: [
	// 			{name: 'Images', extensions: ['jpg', 'png', 'gif']},
	// 			{name: 'Documents', extensions: ['txt', 'html']},
	// 		]
	// 	};
	// 	if(flag){
	// 		var win = BrowserWindow.getFocusedWindow();
	// 		dialog.showSaveDialog(win, options, function(filename){
	// 			showMsg(filename);
	// 		});
	// 	} else {
	// 		dialog.showSaveDialog(options, function(filename){
	// 			showMsg(filename);
	// 		});
	// 	}
	// },
	// showOpenDialog: function(flag){
	// 	var options = {
	// 		title: 'Open Dialog Example',
	// 		defaultPath: app.getPath('userDesktop'),
	// 		filters: [
	// 			{name: 'Images', extensions: ['jpg', 'png', 'gif']},
	// 			{name: 'Documents', extensions: ['txt', 'html']},
	// 		],
	// 		properties: ['openFile', 'multiSelections', 'createDirectory']
	// 	};
	// 	if(flag){
	// 		var win = BrowserWindow.getFocusedWindow();
	// 		dialog.showOpenDialog(win, options, function(filenames){
	// 			showMsg(filenames);
	// 		});
	// 	} else {
	// 		dialog.showOpenDialog(options, function(filenames){
	// 			showMsg(filenames);
	// 		});
	// 	}
	// },
	// showMessageBox: function(flag){
	// 	var options = {
	// 		title: 'Message Box Example',
	// 		type: 'info',
	// 		buttons: ['OK', 'Cancel', 'Info'],
	// 		message: 'Message Box Example',
	// 		detail: 'Extra info'
	// 	};
	// 	if(flag){
	// 		var win = BrowserWindow.getFocusedWindow();
	// 		dialog.showMessageBox(win, options, function(response){
	// 			showMsg(response.toString());
	// 		});
	// 	} else {
	// 		dialog.showMessageBox(options, function(response){
	// 			showMsg(response.toString());
	// 		});
	// 	}
	// },
	// showErrorBox: function(){
	// 	dialog.showErrorBox('Error Box Example', 'Error Box');
	// },
	execLS: function(){
		// exec(['ls', '-la']);
		exec('ls -la');
	},
	execPWD: function(){
		// exec(['pwd']);
		exec('pwd');
	},
	execMixed: function(){
		// exec(['ls','-a', '|', 'grep', '^d']);
		exec('ls -la | grep ^d');
	}
};
