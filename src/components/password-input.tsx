import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder, ...props }, ref) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={passwordIsVisible ? 'text' : 'password'}
          placeholder={placeholder}
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 p-0 text-muted-foreground"
          onClick={() => setPasswordIsVisible((prev) => !prev)}
        >
          {passwordIsVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
