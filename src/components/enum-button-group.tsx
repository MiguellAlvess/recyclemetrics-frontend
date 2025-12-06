import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'

export type EnumOption = {
  value: string
  label: string
  icon: ReactNode
}

type EnumButtonGroupProps = {
  value: string
  onChange: (value: string) => void
  options: EnumOption[]
}

export function EnumButtonGroup({
  value,
  onChange,
  options,
}: EnumButtonGroupProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant={value === option.value ? 'selected' : 'outline'}
          onClick={() => onChange(option.value)}
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
    </div>
  )
}
