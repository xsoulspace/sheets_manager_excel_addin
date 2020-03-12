import { ExcelContextBuilder } from './ExcelContextBuilder'
import { Log } from '../Debug/Log'

export class ExcelWorksheets {
	context!: Excel.RequestContext
	public async init(context?: Excel.RequestContext) {
		const contextBuilder = new ExcelContextBuilder(context)
		await contextBuilder.build()
		this.context = contextBuilder.context()
	}
	public async getWorksheets(): Promise<Excel.Worksheet[]> {
		try {
			const worksheets = this._contextWorksheets()
			worksheets.load('items')
			await this.sync()
			return worksheets.items
		} catch (error) {
			throw Log.error('ExcelWorksheets.getWorksheets', error)
		}
	}
	public async getActiveWorksheet(): Promise<Excel.Worksheet> {
		try {
			const worksheet = this._contextWorksheets().getActiveWorksheet()
			await this.sync()
			return worksheet
		} catch (error) {
			throw Log.error('ExcelWorksheets.getActiveWorksheet', error)
		}
	}
	public async renameWorksheet(
		id: Excel.Worksheet['id'],
		name: Excel.Worksheet['name'],
		sync: boolean = true
	): Promise<boolean> {
		try {
			const worksheet = this._getWorksheet(id)
			worksheet.name = name
			if (sync) await this.sync()
			return true
		} catch (error) {
			throw Log.error('ExcelWorksheets.renameWorksheet', error)
		}
	}
	public async setWorksheetTabColor(
		id: Excel.Worksheet['id'],
		color: Excel.Worksheet['tabColor']
	): Promise<boolean> {
		try {
			const worksheet = this._getWorksheet(id)
			worksheet.tabColor = color
			await this.sync()
			return true
		} catch (error) {
			throw Log.error('ExcelWorksheets.setWorksheetTabColor', error)
		}
	}
	public async reorderWorksheet(
		id: Excel.Worksheet['id'],
		position: Excel.Worksheet['position'],
		sync: boolean = true
	): Promise<boolean> {
		try {
			const worksheet = this._getWorksheet(id)
			worksheet.position = position
			if (sync) await this.sync()
			return true
		} catch (error) {
			throw Log.error('ExcelWorksheets.reorderWorksheet', error)
		}
	}
	private _getWorksheet(id: Excel.Worksheet['id']) {
		return this._contextWorksheets().getItem(id)
	}
	private _contextWorksheets(): Excel.WorksheetCollection {
		return this.context.workbook.worksheets
	}
	private async sync() {
		await this.context.sync()
	}
}
