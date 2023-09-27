export const getPokeID = (id) => {
    if (id >= 10 && id < 100) return `0${id}`
    if (id >= 100) return `${id}`
    return `00${id}`
}