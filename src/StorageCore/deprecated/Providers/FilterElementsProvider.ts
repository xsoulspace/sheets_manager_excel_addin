//@ts-ignore
import FilterElementsWorker from '../Workers/FilterElements.Worker.ts'
export interface FilterElementsArgs {
	elements: MatrixElementInterface.MEArr
	word: string
}
export class FilterElementsProvider {
	static run(
		args: FilterElementsArgs
	): Promise<MatrixElementInterface.MEArr> {
		return new Promise((resolve, reject) => {
			const worker = new FilterElementsWorker()
			worker.postMessage(args)
			worker.onmessage = (event: { data: MatrixElementInterface.MEArr }) => {
				try {
					resolve(event.data)
				} catch (e) {
					reject(e)
				}
			}
			worker.onerror = (event: any) => {
				console.log('run-> worker in breaking', event)
			}
		})
	}
}
