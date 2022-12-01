class Crowd {
    constructor(x, canvasH, ctx) {
        this.ctx = ctx
    
        this.img = new Image()
        this.img.src = "./img/crowd.png"

        this.img.frames = 8
        this.img.frameIndex = 0
        
        this.w = 100;
        this.h = 200;

        this.x = x;
        this.y = canvasH * .4

        this.vx = this.getRandomArbitrary (1, 1.5)

        this.state = "normal"
    }

     getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
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
        this.x += this.vx
    }

    runLess() {
        if (this.state === "normal") {
            setTimeout(() => {
                this.vx = 1.1
                this.state = "normal"
            }, 1000);
        }

        this.vx = -.8;
        this.state = "slow"
    }
         
}
   

