type Mods = Record<string, boolean>
type BaseClasses = string[] | Array<string | undefined>

export const cls = (baseClasses: BaseClasses, mods: Mods = {}): string => {
  return [
    ...Object.keys(mods).filter(key => mods[key]),
    ...baseClasses.filter(Boolean)
  ].join(' ')
}
