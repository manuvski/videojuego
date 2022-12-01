const Game = {
    canvas: undefined,
    ctx: undefined,
    scoreBoard: undefined,
    fps: 60, 
    keys: {
        TOP_KEY: 87,
        SPACE: 32
    },

 randomObstacle: function (min, max){
 return Math.floor (Math.random () * (max - min + 1) + min)
 },

    init: function() {
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')

        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.start()

        this.audio = new Audio ('audio/musica.mp3')
        this.audio.play()
    },

    start: function() {
        this.reset()
        this.scoreBoard.init(this.ctx)

        // Bucle de renderizado
        this.interval = setInterval(() => {
            this.clear()
            this.score += 0.01
            // Mecanismo para generar acciones cada X frames
            this.frameCounter++;

             // Generar enemigo cada 50 frames
            if(this.frameCounter % 200 === 0)
                this.generateEnemy()
         
            if (this.frameCounter % this.randomObstacle (20, 80) === 0)
            this.generatePotion()
            
            if (this.drinkPotion()) {
                this.crowds.forEach(crowd => {
                    crowd.runLess()
                })
              
             }

            if(this.isCollision()) 
                 this.gameOver()

            if(this.isZombie()){
                 this.gameOver()
             }
             
             if(this.isZombie2()){
                this.gameOver()
            }

             if(this.isPelotazo()){
            
            }

            this.drawAll()
            this.moveAll()

            this.clearObstacles()
        }, 1000 / this.fps)
    },

    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx) 
        this.player = new Player(this.canvas.width, this.canvas.height, this.keys, this.ctx)
        this.scoreBoard = ScoreBoard
        this.frameCounter = 0
        
        this.enemies = []
        this.score = 0
        this.obstacles = []
        this.potions = []

        let diff = -100
        
        this.crowds = Array(30).fill().map(() => {
             return  new Crowd(this.canvas.width *.01 + (this.randomObstacle (-100, 200)), this.canvas.height ,this.ctx)
         })
    },

    clear: function () {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    },

    moveAll: function() {
        this.background.move()
        this.player.move()
        
        this.enemies.forEach(enemy => {
            enemy.move()
        })
        this.crowds.forEach(crowd => {
            crowd.move()
        })

        this.potions.forEach(potion => {
            potion.move()
        })

    },

    drawAll: function () {
        this.background.draw()
        this.player.draw(this.frameCounter)

        this.enemies.forEach(enemy => {
            enemy.draw(this.frameCounter)
        })

        this.potions.forEach(potion => {
            potion.draw()
        })

        this.crowds.forEach(crowd => {
            crowd.draw(this.frameCounter)
        })

        this.drawScore(this.score)
    },

    // generateObstacle: function() {
    //     this.obstacles.push(new Obstacle(this.canvas.width, this.player.h ,this.player.y0, this.ctx))
    // },
    
    generateEnemy: function() {
        this.enemies.push(new Enemy(this.canvas.width, this.canvas.height, this.ctx))
    },

    generatePotion: function() {
        this.potions.push(new Potion(this.canvas.width, this.player.h ,this.player.y0, this.ctx))
    },

    clearObstacles: function () {
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x + obstacle.w >= 0)
    },

    clearBullet: function(bullet) {
        this.player.bullets = this.player.bullets.filter((b) => b != bullet)
    },  

    clearPotions: function (potion) {
        this.potions = this.potions.filter((comida) => comida != potion)
    },

    clearEnemies: function (enemy) {
        this.enemies = this.enemies.filter((e) => e != enemy)
    },

    isCollision() {
        return this.obstacles.some((obstacle) => {
            return (
                this.player.x + this.player.w -40 >= obstacle.x &&
                this.player.x <= obstacle.x + obstacle.w &&
                this.player.y + this.player.h - 20 >= obstacle.y &&
                this.player.y <= obstacle.y + obstacle.h
            )
        })
    },

    isPelotazo() {
        return this.enemies.some((enemy) => {
                return this.player.bullets.some((bullet) => {
                    const acierto = (
                       bullet.x >= enemy.x &&
                       bullet.x >= enemy.y
                    )   
                     
                    if (acierto) {
                        this.clearEnemies(enemy)
                    }

                    if (acierto) 
                        this.clearBullet(bullet)         
                    return acierto 
                })
           
        })
    },
    
    isZombie() {
        return this.crowds.some((crowd) => {
            return (
                this.player.x <= crowd.x + crowd.w -50 &&
                this.player.y + this.player.h >= crowd.y
            )
        })
    },

    isZombie2() {
        return this.enemies.some((enemy) => {
            return (
                this.player.x + this.player.w -40 >= enemy.x &&
                this.player.x <= enemy.x + enemy.w &&
                this.player.y + this.player.h - 20 >= enemy.y &&
                this.player.y <= enemy.y + enemy.h
            )
        })
    },

    drinkPotion() {
        return this.potions.some((potion) => {
            const comida = (
                this.player.x + this.player.w - 40 >= potion.x &&
                this.player.x <= potion.x + potion.w &&
                this.player.y + this.player.h >= potion.y &&
                this.player.y <= potion.y + potion.h -40
            )
             
            if (comida) {
                this.clearPotions(potion)
            }
            return comida

        })
    },

    stop() {
        clearInterval(this.interval)
    },

    gameOver() {
        this.stop()

        if(confirm("Ahora eres un zombie amigo, ¿quieres jugar de nuevo?")) {
            document.getElementById('menuInicio').style.display = "block"
            document.getElementById('canvas').style.display = "none"
            this.audio.pause() 
        }
          
    },

    drawScore(score) {
        ScoreBoard.update(score)
    },

}
