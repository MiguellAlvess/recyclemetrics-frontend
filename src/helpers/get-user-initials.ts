export const getUserInitials = (name?: string | null) => {
  if (!name) return 'US'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join('')
  return initials || 'US'
}
