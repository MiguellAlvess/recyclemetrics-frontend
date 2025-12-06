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
export const EnumButtonGroup = ({
  value,
  onChange,
  options,
}: EnumButtonGroupProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant={value === option.value ? 'selected' : 'outline'}
          onClick={() => onChange(option.value)}
          className="flex w-full items-center justify-center gap-2 px-3 py-2"
        >
          {option.icon && <span className="shrink-0">{option.icon}</span>}
          <span className="truncate text-sm">{option.label}</span>
        </Button>
      ))}
    </div>
  )
}
