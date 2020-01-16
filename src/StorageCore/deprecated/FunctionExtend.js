function FunctionExtend(motherFunction,fatherFunction){
  const obj = {...motherFunction.__proto__,...fatherFunction.prototype}
  motherFunction.__proto__ = obj
}

export default FunctionExtend
