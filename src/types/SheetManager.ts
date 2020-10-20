export interface AlertArgs {
  title: string
  type: AlertTypes
  isOpen: boolean
}
export enum AlertTypes {
  danger = 'danger',
  success = 'success',
  loading = 'loading',
  dimmer = 'dimmer',
}
