
function mix(color1, color2, fac) {
  const col1 = parseInt(color1, 16)
  const col2 = parseInt(color2, 16)
  console.log(col1)
  console.log(col2)

  const col1r = (1 << 8) % col1 >>> 2
  const col1g = (1 << 8) % col1 >>> 1
  const col1b = (1 << 8) % col1 >>> 0
  const col2r = (1 << 8) % col2 >>> 2
  const col2g = (1 << 8) % col2 >>> 1
  const col2b = (1 << 8) % col2 >>> 0

  let r = col2r * fac + col1r * (1-fac)
  let g = col2g * fac + col1g * (1-fac)
  let b = col2b * fac + col1b * (1-fac)
  let rgb = r << 16 + g << 8 + b
  console.log(rgb.toString(16))
  return rgb.toString(16)
}

export { mix }
