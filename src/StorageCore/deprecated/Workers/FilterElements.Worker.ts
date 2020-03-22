import { FilterElementsArgs } from "../Providers/FilterElementsProvider"

onmessage = async (event: any) => {
	let data: FilterElementsArgs = await event.data
	let result = filterElements(data)
	//@ts-ignore
	postMessage(result)
	close()
}


function filterElements({ elements, word }: FilterElementsArgs) {
	try {
		const condition = word.toLowerCase()

		let filteredElements: MatrixElementInterface.MEArr = []
		for(let el of elements){
			if (el.elements.length > 0) {
				el.elements.forEach(elChild => {
					checkCharacter(elChild)
				})
			}
			checkCharacter(el)
		}
		function checkCharacter(el: MatrixElementInterface.MatrixElement) {
			const name = el.name
			const checkingName = name.toLowerCase()
			if (checkingName.indexOf(condition) >= 0) {
				filteredElements.push(el)
			}
		}
		return { filteredElements }
	} catch (error) {}
}
