

self.onmessage = async (event) => {
  let data = await event.data
  let result = filterElements(data)
  self.postMessage(result)
  self.close()
}

function filterElements({
  elements, filteredWord
}){
  try {
    let filteredElements= []
    elements.forEach((element)=>{ 
      if(element.elements.length>0){
        element.elements.forEach((elementChild)=>{
          checkCharacter(elementChild)
        })
      }
      checkCharacter(element)
    }) 
    function checkCharacter(el){
      const name = el.name
      const checkedName = name.toLowerCase()
      const condition = filteredWord.toLowerCase()
      if (checkedName.indexOf(condition)>=0) {
      filteredElements.push(el) 
      }
    }
    return {filteredElements};
  } catch (error) {
    
  }
}