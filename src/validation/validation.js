
export const fieldIsRequired = (value) => {
    if (value) return undefined
    return 'This field is required'
}
export const fieldIsFullCreator = (maxSymbols) => (value) => {
    if (value.length > maxSymbols) return `${maxSymbols} is maximum symbols`
    return undefined
}
export const emailFieldIncludeDog = (value) => {
    if (!value.includes('@')) return 'email is invalid'
    return undefined
}