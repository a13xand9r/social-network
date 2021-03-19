export type ValidatorsType = (value: string) => string | undefined

export const fieldIsRequired: ValidatorsType = (value) => {
    if (value) return undefined
    return 'This field is required'
}
export const fieldIsFullCreator = (maxSymbols: number): ValidatorsType => (value) => {
    if (value.length > maxSymbols) return `${maxSymbols} is maximum symbols`
    return undefined
}
export const emailFieldIncludeDog: ValidatorsType = (value) => {
    if (!value.includes('@')) return 'email is invalid'
    return undefined
}