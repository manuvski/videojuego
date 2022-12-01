class Enemy {
    constructor(x, canvasH, ctx) {
        this.ctx = ctx
    
        this.img = new Image()
        this.img.src = "./img/dead2.png"

        this.img.frames = 7
        this.img.frameIndex = 0
        
        this.w = 100;
        this.h = 200;

        this.x = x;
        this.y = canvasH * .4

        this.vx = 12

    }

    draw(frameCounter) {
        this.ctx.drawImage(
            this.img, 
                // Calcula x del fograma actual
                this.img.frameIndex * Math.floor(this.img.width / this.img.frames), 
                0, 
                // Ancho de un fotograma
                Math.floor(this.img.width / this.img.frames), 
                this.img.height, 
                this.x, 
                this.y, 
                this.w,
                this.h
        );

        this.animateImg(frameCounter)
    }

    // cambia el fotogramas del skin cada 6 frame
    animateImg(frameCounter) {
       
        if(frameCounter % 6 === 0) {
            this.img.frameIndex++
            

        if (this.img.frameIndex > this.img.frames - 1) 
                this.img.frameIndex = 0
        }
    }

    move() {
        this.x -= this.vx
    }

         
}
   
