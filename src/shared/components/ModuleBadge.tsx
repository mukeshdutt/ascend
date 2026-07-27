import type { Module } from '../types'
import { Icon } from '../icons/Icon'

type ModuleBadgeProps = {
  module: Module
  small?: boolean
}

export function ModuleBadge({ module, small = false }: ModuleBadgeProps) {
  return (
    <span className={`module-icon ${small ? 'small' : ''}`} style={{ background: module.color }}>
      <Icon name={module.icon} size={small ? 17 : 20} />
    </span>
  )
}
