

class Tour {
    constructor(tour_index, parameters) {
        this.tour_index = tour_index
        this.parameters = parameters
        this.x = 0
        this.y = 0
        // this.SetSeedGroup = this.SetSeedGroup.bind(this)
        this.SetGraphic = this.SetGraphic.bind(this)
        this.debug_draw_mode = true
    }



    SetSeed(seed_group) {
        console.log('seed ', seed_group)
        this.seed_group = seed_group
        this.transform_functions = []
        for (let i = 0; i < this.seed_group.length; i++) {
            this.transform_functions.push((x, y) => {
                return {
                    x: this.seed_group[i][0] * x + this.seed_group[i][1] * y + this.seed_group[i][4],
                    y: this.seed_group[i][2] * x + this.seed_group[i][3] * y + this.seed_group[i][5]
                }
            });
        }
    }



    SetGraphic(graphic) {
        this.graphic = graphic
    }

    SetOrigin(origin) {
        this.origin = origin
        this.origin_translated = false

    }

    SetFillColor(fill_color) {
        this.fill_color = fill_color

    }

    SetZoom(zoom) {
        this.zoom = zoom
        console.log(this.tour_index, zoom)

    }

    DrawOrigin() {
        this.graphic.strokeWeight(50)
        this.graphic.point(0, 0)
        this.graphic.strokeWeight(this.parameters.TGP.stroke_weight)
    }


    TranslateOrigin() {
        if (this.origin_translated)
            this.graphic.translate(-this.origin.x, -this.origin.y)
        else
            this.graphic.translate(this.origin.x, this.origin.y)
        this.origin_translated = !this.origin_translated
    }

    Draw() {
        if (this.parameters.GP.debug_draw_mode && this.debug_draw_mode) {
            this.graphic.stroke(this.fill_color)
            this.graphic.strokeWeight(20)
            this.graphic.point(0, 0)
            this.graphic.strokeWeight(this.parameters.TGP.stroke_weight)
            this.debug_draw_mode = false
        }
        this.NextPoint()
        this.DrawPoint()
    }

    NextPoint() {
        let function_prob = 1 / this.transform_functions.length
        let nextPoint;
        let prob = random(1)
        let sum = 0
        for (let i = 0; i < this.transform_functions.length; i++) {
            sum += function_prob
            if (sum > prob) {
                nextPoint = this.transform_functions[i](this.x, this.y)
                this.x = nextPoint.x
                this.y = nextPoint.y
                break;
            }
        }

    }

    DrawPoint() {
        this.graphic.stroke(this.fill_color)
        this.graphic.point(
            map(this.x, -this.zoom, this.zoom, -this.parameters.GP.graphic_width / 2, this.parameters.GP.graphic_width / 2),
            map(this.y, -this.zoom, this.zoom, -this.parameters.GP.graphic_height / 2, this.parameters.GP.graphic_height / 2)
        );
    }
}