const div = document.querySelector("main")
const canvas = document.createElement("canvas")
const CTX = canvas.getContext("2d")
const h1 = div.querySelector('h1')

canvas.style.cssText = "position: absolute; z-index: -1;"

const color = "#f0eade"
let point = {
    x: 0,
    y: canvas.height / 2
}


let dx = 0
let dy = 0
let radius = 25
let acc = 0.9

function init() {

    canvas.width = div.clientWidth
    canvas.height = div.clientHeight
    CTX.clearRect(0, 0, canvas.width, canvas.height)
    div.style.background = "unset"
    div.appendChild(canvas)
    
    radius = 25
    dx = 0
    dy = 0
    
    point.x = -radius
    point.y = canvas.height * 0.2
    acc = 0.9
    animate()
}



function update() {
    if (point.x < canvas.width / 2) {
        dx += 0.1
        dy += acc
        
        point.x += dx
        point.y += dy
        
        acc -= 0.001
    
        if(point.y - radius < 0 || point.y + radius > canvas.height * 0.8) dy *= -1
    } else {
        radius += 40
    }
}

function draw() {
    CTX.beginPath()
    CTX.arc(point.x, point.y, radius, 0, 2*Math.PI, false)
    CTX.fillStyle = color
    CTX.fill()
}

function animate() {
    const animation = requestAnimationFrame(animate)
    CTX.clearRect(0, 0, canvas.width, canvas.height)
    draw()
    update()
    if(radius > canvas.width) {
        cancelAnimationFrame(animation)
        div.style.background = color
        div.removeChild(canvas)
        h1.classList.remove("hidden")
    }
}

window.addEventListener("resize", init)
init()
