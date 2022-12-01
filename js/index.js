window.onload = function () {
    

    document.getElementById('start').onclick = function (e) {

        document.getElementById('menuInicio').style.display = "none"
        document.getElementById('canvas').style.display = "block"
        Game.init()
    }
}