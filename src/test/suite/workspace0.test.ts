import { strict as assert } from 'assert'
import { before } from 'mocha'
import { Uri, workspace } from 'vscode'
import { doesDirExist, doesFileExist, runAllTests, waitForExtensionActive } from '../testCommon'


const projName = 'workspace0'

before(async () => {
	await waitForExtensionActive()
})

suite(projName + ' - Extension Test Suite', () => {

	test(projName + '.1 - <workspaceFolder>/ablunit.json file exists', async () => {
		await runAllTests()

		const workspaceFolder = workspace.workspaceFolders![0].uri

		const ablunitJson = Uri.joinPath(workspaceFolder,'ablunit.json')
		const resultsXml = Uri.joinPath(workspaceFolder,'results.xml')
		const resultsJson = Uri.joinPath(workspaceFolder,'results.json')
		const listingsDir = Uri.joinPath(workspaceFolder,'listings')

		console.log("storageUri= " + workspaceFolder.fsPath)
		assert(await doesFileExist(ablunitJson), "missing ablunit.json (" + ablunitJson.fsPath + ")")
		assert(await doesFileExist(resultsXml), "missing results.xml (" + resultsXml.fsPath + ")")
		assert(!await doesFileExist(resultsJson), "results.json exists and should not (" + resultsJson.fsPath + ")")
		assert(!await doesDirExist(listingsDir), "listings dir exists and should not (" + listingsDir.fsPath + ")")
	})

})
