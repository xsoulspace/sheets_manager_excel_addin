interface enumList {
  [propName: string]: string | enumList;
}

const enumPositioningOptions : enumList = {
  default: "default",
  numeratedGroups: "numeratedGroups"
}
export default enumPositioningOptions
