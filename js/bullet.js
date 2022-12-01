class Bullet {
    constructor(x, y, playerY0, playerH, ctx) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.playerY0 = playerY0
        this.playerH = playerH

        this.r = 5

        this.y0 = playerY0
        this.w
        this.h

        this.vy = -2
        this.vx = 7
    }

    draw() {

        this.ctx.beginPath()
        this.ctx.fillStyle = "red"
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()

    }

    move() {
        const gravity = 0.4

        this.x += this.vx
        
        this.vy += gravity
        this.y += this.vy

        if(this.y > this.playerY0 + this.playerH) {
            this.y -= this.r
            this.vy *= -1
        }
    }

}