class Potion {
    constructor(canvasW, playerH, playerY0, ctx) {
        this.ctx = ctx

        this.w = 20
        this.h = 50

        this.x = canvasW
        this.y = playerY0 - 5 - this.h

        this.desx = 10

        this.img = new Image()
        this.img.src = "./img/potion2.png"

    }

        draw(){
            this.ctx.drawImage(this.img,
                this.x,
                this.y, 
                50,
                this.w * 3);
        }

        
        move(){
            this.x -= this.desx

                 
        }

        

        


    }
