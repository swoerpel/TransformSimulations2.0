

class Tour {
    constructor(tour_index, parameters) {
        this.tour_index = tour_index
        this.parameters = parameters
        this.x = 0
        this.y = 0
        this.step = -3
        this.last_function_index = 0
        this.color_index = 0
        // this.SetSeedGroup = this.SetSeedGroup.bind(this)
        this.SetGraphic = this.SetGraphic.bind(this)
        this.debug_draw_mode = true
    }



    SetSeed(seed_group) {
        this.seed_group = seed_group
        console.log('seed ', this.tour_index, seed_group)
        // this.parameters.GP.function_type == 'static' ?
        //     this.SetStaticFunctions() :
        //     this.SetDynamicFunctions()
    }

    GetSeedGroup() {
        return this.seed_group
    }

    SetFunctions(transform_functions) {
        this.transform_functions = transform_functions
        console.log('functions', this.transform_functions)
    }

    SetTimeStep(time_step) {
        this.time_step = time_step
        console.log('time_step: tour ', this.tour_index, this.time_step)
    }

    SetGraphic(graphic) {
        this.graphic = graphic
    }

    SetOrigin(origin) {
        this.origin = origin
        this.origin_translated = false

    }

    SetFillColor(palette, index) {
        if (this.parameters.GP.function_type == 'static') {
            if (this.parameters.CP.fill_type == 'constant') {
                this.fill_colors = palette
                this.color_index = index
            }
            else if (this.parameters.CP.fill_type == 'palette per tour') {
                console.log(this.tour_index, palette[index])
                this.fill_colors = palette
                this.color_index = index
            }
            else if (this.parameters.CP.fill_type == 'palette per function') {
                this.fill_colors = palette
                console.log(this.fill_colors)
            }
        }
        else if (this.parameters.GP.function_type == 'dynamic') {
            console.log('fill type dynamic')
            this.fill_colors = palette
            this.graphic.stroke(palette[index])
            console.log(this.fill_colors[index])
        }

        /*
        if(this.parameters.CP.general_fill_type == 'constant')
        {
            //this.interpolate = chroma.scale([this.parameters.CP.palette_start,this.parameters.CP.palette_end]).mode('hsl');
            this.fill_color = pallete[index]
            this.pallete = pallete
        }
        else if(this.parameters.CP.general_fill_type == 'dynamic')
        {

            if(this.parameters.CP.dynamic_fill_type == 'random'){

            }
            else if(this.parameters.CP.dynamic_fill_type == 'loaded'){

            }


            this.fill_color = '#FFFFFF'
            console.log('colors')
            console.log(this.parameters.CP.palette_start)
            console.log(this.parameters.CP.palette_end)
            // this.interpolate = chroma.scale([this.parameters.CP.palette_start,this.parameters.CP.palette_end]).mode('hsl');
            //this.interpolate = chroma.scale('Spectral');
            // this.interpolate = chroma.scale([chroma.random(),chroma.random()]).mode('lch').colors(6)

            this.interpolate = chroma.scale(chroma.scale([chroma.random(),chroma.random()]).mode('lch').colors())
            
        }
        */

    }

    SetZoom(zoom) {
        this.zoom = zoom
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
            this.graphic.stroke(this.fill_colors[this.color_index])
            this.graphic.strokeWeight(20)
            this.graphic.point(0, 0)
            this.graphic.strokeWeight(this.parameters.TGP.stroke_weight)
            this.debug_draw_mode = false
        }
        this.NextPoint()
        this.DrawPoint()

    }


    // remove later
    IncStep() {
        this.step += this.time_step
        if (this.parameters.TGP.stroke_weight_type == 'scale_up')
            this.graphic.strokeWeight(this.step + 1)
        else if (this.parameters.TGP.stroke_weight_type == 'oscillate')
            this.graphic.strokeWeight(this.parameters.TGP.stroke_weight * Math.abs(Math.sin(this.step)))
    }

    NextPoint() {
        let function_prob = 1 / this.transform_functions.length
        let nextPoint;
        let prob = random(1)
        let sum = 0
        for (let i = 0; i < this.transform_functions.length; i++) {
            sum += function_prob
            if (sum > prob) {
                // this.x = this.step
                // this.y = this.step
                this.parameters.GP.function_type == 'static' ?
                    nextPoint = this.transform_functions[i](this.x, this.y) :
                    nextPoint = this.transform_functions[i](this.x, this.y, this.step)
                this.x = nextPoint.x
                this.y = nextPoint.y
                this.last_function_index = i
                break;
            }
        }

    }

    DrawPoint() {
        //this.graphic.stroke(this.fill_color)
        // console.log(this.fill_colors)
        if (this.parameters.GP.function_type == 'static') {
            if (this.parameters.CP.fill_type == 'palette per function') {
                this.graphic.stroke(this.fill_colors[this.last_function_index])
            }
            else
                this.graphic.stroke(this.fill_colors[this.color_index])
        }
        /*
        if (this.parameters.CP.general_fill_type == 'dynamic') {
            this.graphic.stroke(this.interpolate(Math.sin(this.step * 10)).hex())
        }
        else if (this.parameters.CP.general_fill_type == 'constant') {
            this.graphic.stroke(this.pallete[this.last_function])
            // this.graphic.stroke(this.pallete[this.palletethis.last_function])
        }
        else
            this.graphic.stroke(this.fill_color)
        */
        this.graphic.point(
            map(this.x, -this.zoom, this.zoom, -this.parameters.GP.graphic_width / 2, this.parameters.GP.graphic_width / 2),
            map(this.y, -this.zoom, this.zoom, -this.parameters.GP.graphic_height / 2, this.parameters.GP.graphic_height / 2)
        );
    }
}