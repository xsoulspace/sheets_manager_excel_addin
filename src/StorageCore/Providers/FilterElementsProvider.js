import {FilterElementsWorker} from "../Workers/FilterElements.Worker";

export class FilterElementsProvider{
  static run({
    elements, filteredWord
  }){
    return new Promise((resolve,reject)=>{
      const worker = new FilterElementsWorker();
      worker.postMessage({
        elements, filteredWord
      });
      worker.onmessage = (event) => {
        try{
            resolve(event.data);
        }catch (e) {
            reject(e);
        }
      }
      worker.onerror = event => {
        console.log("run-> worker in breaking",event)
      }
    })
  }
}
