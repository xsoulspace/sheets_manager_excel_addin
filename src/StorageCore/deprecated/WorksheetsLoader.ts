// import ExcelBuilder from "./ExcelBuilder";
// import functionExtend from "./FunctionExtend";

// let WorksheetsLoader = function(){
//   this._enum ={
//     title: 'WorksheetsLoader'
//   }
// }
// WorksheetsLoader.prototype.init =async function(excelContext = undefined){
//   functionExtend(this,ExcelBuilder)
//   await this._iniExcel(excelContext)
// }

// WorksheetsLoader.prototype.load= async function(){
//   try {
//     let context = await this._context
//     let sheets = context.workbook.worksheets;
//     sheets.load('items');
//     let activeItem = context.workbook.worksheets.getActiveWorksheet()
//     activeItem.load('id')
//     await context.sync()
//     this.activeItemId = activeItem.id; 
//     this.sheets = sheets.items
//   } catch (error) {
//     console.log(`${this._enum.title}.load`,error)
//   }
// }
// WorksheetsLoader.prototype.getAll = async function(){
//   try {
//     await this.load()
//     return this.all;    
//   } catch (error) {
//     console.log(`${this._enum.title}.getAll`,error)
//   }
// }
// WorksheetsLoader.prototype.getSheetsIds = async function(){
//   try {
//     await this.load()
//     const ids = this.sheets.map(el=>{
//       return el.id
//     })
//     return ids 
//   } catch (error) {
//     console.log(`${this._enum.title}.getSheetsIds`,error)
//   }
// }
// WorksheetsLoader.prototype.getItems = async function(){
//   try {
//     await this.load()
//     return this.sheets;    
//   } catch (error) {
//     console.log(`${this._enum.title}.getItems`,error)
//   }
// }
// WorksheetsLoader.prototype.changePositions = async function(changedValues){
//   try {
//     await this.getItems()
//     let newChangedItems=[];
//     let fisrtChange = false;
//     changedValues.forEach((item, index)=>{
//       const changedItems = this.sheets.filter((oldItem)=>{
//         return (item.id ==oldItem.id && oldItem.position != index)
//       })
//       if (changedItems.length>0 && fisrtChange==false){
//         let changedItem = {
//           id: item.id,
//           position: index
//         }
//         newChangedItems.push(changedItem)
//         // fisrtChange= true
//       }
//     })
//     return newChangedItems;    
//   } catch (error) {
//     console.log(`${this._enum.title}.changePositions`,error)
//   }
// }
// WorksheetsLoader.prototype.changeSheetsPositions = async function(changedValues){
//   try {
//     // console.log('0.WorksheetsLoader.changeSheetsPositions.changedValues',changedValues)
//     /** getting sheets */
//     const sheetsIds =await this.getSheetsIds()
//     // console.log('0.1.WorksheetsLoader.changeSheetsPositions.sheetsIds',sheetsIds)

//     /** getting current positions */
//     const simplifiedItemsIds = []
//     for(let item of changedValues){
//       simplifiedItemsIds.push(item.id)
//       if(item.elements.length>0){
//         for(let childElement of item.elements){
//           simplifiedItemsIds.push(childElement.id)
//         }
//       }
//     }
//     // console.log('1.WorksheetsLoader.changeSheetsPositions',changedValues)
//     // console.log('1.1.WorksheetsLoader.changeSheetsPositions.simplifiedItemsIds',simplifiedItemsIds)
//     /** finding changes */
//     const changedItems = simplifiedItemsIds.filter((item,index)=>{
//       const currentIndexOfItem = sheetsIds.indexOf(item.id)
//       return (index != currentIndexOfItem)
//     })
//     // console.log('2.WorksheetsLoader.changeSheetsPositions',changedValues)
//     // console.log('2.1.WorksheetsLoader.changeSheetsPositions',changedItems)

//     /** making new array to change positions */

//     if (changedItems.length>0){
//       await this.reorderSheets({changedItems})
//     }
//     // console.log('3.WorksheetsLoader.changeSheetsPositions',changedValues)
 
//   } catch (error) {
//     console.log(`${this._enum.title}.changeSheetsPositions`,error)
//   }
// }
// WorksheetsLoader.prototype.reorderSheets=async function({changedItems}){
//   try {
//     let context = await this._context
//     for(let [position,id] of Object.entries(changedItems)){
//       let sheet;
//       switch (typeof id) {
//         case "undefined":
//           sheet = context.workbook.worksheets.getActiveWorksheet();        
//           break;
//         default:
//           sheet = context.workbook.worksheets.getItem(id)
//           break;
//       }
//       // console.log(Number(position))
//       sheet.position = Number(position)
//     }
//   } catch (error) {
//     console.log(`${this._enum.title}.reorderSheets`,error)
//   }
// }


// export {WorksheetsLoader};
