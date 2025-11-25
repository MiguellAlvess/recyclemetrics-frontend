import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { EyeIcon, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  placeholder: string
}

const PasswordInput = ({ placeholder }: PasswordInputProps) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <Button
        type="button"
        variant="ghost"
        className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 p-0 text-muted-foreground"
        onClick={() => setPasswordIsVisible((prevValue) => !prevValue)}
      >
        {passwordIsVisible ? <EyeOff size={18} /> : <EyeIcon size={18} />}
      </Button>
    </div>
  )
}

export default PasswordInput
