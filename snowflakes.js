var particles = {
    width: 3,
    height: 3,
    speedMax: 2,
    speedMin: 1,
    rectColor: '255, 255, 255',
    ctx: undefined,
    bits: [],
    init: function() {
        var canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d'); 
    },
    getBitsAmount: function(){
        return canvas.width / this.width;
    },
    resize: function() {
        if(canvas.width !== window.innerWidth) {
            canvas.width = window.innerWidth;
            this.bits = [];
            this.create();
        } else if (canvas.height !== window.innerHeight) {
            canvas.height = window.innerHeight;
            this.bits = [];
            this.create();
        }
    },
    start: function() {
        this.init();
        this.create();
        this.run();
    },
    create: function() {
        for (let i = 0; i < this.getBitsAmount(); i++) {
            this.bits.push({
                x: i * this.width,
                y: Math.ceil(Math.random() * canvas.height),
                offset: 0,
                width: this.width,
                height: this.height,
                rgb: this.rectColor,
                direction: Math.random() > 0.5,
                wind: Math.random() > 0.5,
                windSpeed: Math.random() * 20 + 10,
                transparency: 0,
                getColor: function() {
                    return 'rgba(' + this.rgb + ', ' + this.transparency + ')';
                },
                speedY: Math.ceil(Math.random() * this.speedMax + this.speedMin),
            });
        }
    },
    update: function() {
        this.resize();

        this.bits.forEach(elem => {
            if(elem.y >= canvas.height) {
                elem.y = -elem.height;
            } else {
                if(elem.wind) {
                    (elem.offset == 20) ? elem.direction = true : (elem.offset == -20) ? elem.direction = false : '';
                    elem.direction ? elem.offset -= 1: elem.offset += 1;
                }
                elem.y += elem.speedY;
                elem.x += elem.offset / elem.windSpeed;
                elem.transparency = 1 - elem.y / canvas.height;
            }
        });
    },
    render: function() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.bits.forEach(elem => {
            this.ctx.fillStyle = elem.getColor();
            this.ctx.beginPath();
            this.ctx.arc(elem.x, elem.y, this.width, this.height + 3, 0, 2*Math.PI);
            this.ctx.fill();
        });
        this.ctx.stroke();
    },
    run: function() {
        this.update();
        this.render();

        window.requestAnimationFrame(function() {
            particles.run();
        });
    }
};