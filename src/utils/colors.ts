export const generatePastelColor = () => {
  const h = Math.floor(Math.random() * 360) // Hue: 0 to 360
  const s = Math.floor(Math.random() * 31) + 20 // Saturation: 20 to 50%
  const l = Math.floor(Math.random() * 31) + 70 // Lightness: 70 to 100%

  return `hsl(${h}, ${s}%, ${l}%)`
}
