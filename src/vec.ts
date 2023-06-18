
function radians(degrees: number) {
  return degrees / 180 * Math.PI
}

export default class Vec {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(other: Vec) {
    return new Vec(this.x + other.x, this.y + other.y)
  }

  sub(other: Vec) {
    return new Vec(this.x - other.x, this.y - other.y)
  }

  scale(s: number) {
    return new Vec(s * this.x, s * this.y)
  }

  norm() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  unit() {
    return this.scale(1 / this.norm())
  }

  comma() {
    return `${this.x},${this.y}`
  }

  rotate(theta: number) {
    const rtheta = radians(theta)
    return new Vec(
      Math.cos(rtheta) * this.x - Math.sin(rtheta) * this.y,
      Math.sin(rtheta) * this.x + Math.cos(rtheta) * this.y,
    )
  }
}

window.Vec = Vec
