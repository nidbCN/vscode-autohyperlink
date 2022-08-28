const vscode = require('vscode');
const request = require('request');
const { middleString } = require('./utils/stringUtils');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('autohyperlink.insert', function () {
		// get current editor language
		const langId = vscode.window.activeTextEditor.document.languageId;
		console.log(langId);

		vscode.window.showInputBox({ title: 'url', value: 'https://' })
			.then(url => {
				request.get(url, (error, response, data) => {
					if (error || response.statusCode != 200) {
						const msg = error
							? `Request error: ${error.message}`
							: `Non-OK http status code: ${response.statusCode}`;
						vscode.window.showErrorMessage(msg);
					} else {
						const title = middleString(data, '<title>', '</title>').replace('\n', '');
						vscode.window.showInformationMessage(title);
						vscode.window.activeTextEditor.edit(builder => {
							const position = vscode.window.activeTextEditor.selection.active;
							builder.insert(position, `[${title}](${url})` + '\n');
						});
					}
				})
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
