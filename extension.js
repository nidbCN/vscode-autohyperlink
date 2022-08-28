// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const request = require('request');
const { middle_string } = require('./utils/string_utils');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('autohyperlink.insert', function () {
		// The code you place here will be executed every time your command is executed

		vscode.window.showInputBox({ title: 'url', value: 'https://' })
			.then(url => {
				request.get(url, (error, response, data) => {
					if (error) {
						vscode.window.showErrorMessage(error);
					} else {
						const title = middle_string(data, '<title>', '</title>');
						vscode.window.showInformationMessage(title);
						vscode.window.activeTextEditor.edit(builder => {
							const position = vscode.window.activeTextEditor.selection.active;
							builder.insert(position, `[${title}](${url})`);
						});
					}
				})
				vscode.window.showInformationMessage(url);
			});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
