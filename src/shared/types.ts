import type { IconName } from './icons/Icon'

export type Module = {
  name: string
  icon: IconName
  color: string
  progress: number
  done: number
  active: number
  left: number
  updated: string
}

export type NavItem = {
  label: string
  icon: IconName
  path: string
}
