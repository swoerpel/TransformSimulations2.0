class TourGroup {
    constructor(parameters) {
        this.parameters = parameters
        this.tours = []
        this.CreateGraphic()

    }

    CreateGraphic() {
        this.graphic = createGraphics(parameters.GP.graphic_width, parameters.GP.graphic_height)
        this.graphic.background(0)
        this.graphic.strokeWeight(this.parameters.TGP.stroke_weight)
        this.graphic.stroke(255)
    }

    CreateTours() {
        this.tours = []
        for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
            let new_tour = new Tour(i, this.parameters)
            new_tour.SetGraphic(this.graphic)
            this.tours.push(new_tour)
        }
    }

    SetupTourOrigins() {
        console.log('graphic width', this.parameters.GP.graphic_width)
        if (this.parameters.TGP.tour_placement == 'horizontal') {
            for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
                let origin = {}
                let step_distance = (this.parameters.TGP.tour_width) * this.parameters.GP.overlap_ratio
                origin.x = i * step_distance
                origin.y = this.parameters.GP.graphic_height / 2
                this.tours[i].SetOrigin(origin)
            }
            this.TranslateTourGroup()

        }
        if (this.parameters.TGP.tour_placement == 'random') {
            this.graphic.translate(this.parameters.GP.graphic_width / 2, this.parameters.GP.graphic_height / 2)
            for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
                let origin = {}
                origin.x = (Math.random() < 0.5 ? -1 : 1) * Math.random() * ((this.parameters.GP.graphic_width - this.parameters.TGP.tour_placement_edge_buffer.x) / 2)
                origin.y = (Math.random() < 0.5 ? -1 : 1) * Math.random() * ((this.parameters.GP.graphic_height - this.parameters.TGP.tour_placement_edge_buffer.y) / 2)
                this.tours[i].SetOrigin(origin)
            }
        }
    }

    SetupTourColors() {
        let chet = new ColorMachine()


        if (this.parameters.CP.fill_type == 'constant') {
            if (this.parameters.CP.color_choice == 'random') {
                for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
                    let keys = Object.keys(colors);
                    this.tours[i].SetFillColor(colors[keys[i % keys.length]])
                }
            }
        }
    }

    SetupTourZooms() {
        // scaled evenly between upper and lower bound
        if (this.parameters.TGP.zoom_type == 'linear') {
            let zoom_difference = this.parameters.TGP.zoom_upper_bound - this.parameters.TGP.zoom_lower_bound
            let zoom_step = zoom_difference / (this.parameters.TGP.tour_count - 1)
            if(this.parameters.TGP.tour_count == 1) // divide by zero error when tour_count == 1 
                zoom_step = 0
            for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
                this.tours[i].SetZoom(this.parameters.TGP.zoom_lower_bound + i * zoom_step)
            }
        }
        else if (this.parameters.TGP.zoom_type == 'random') {

        }

    }


    SetupTourSeeds() {
        let seed_parameters = {
            transform_function_count: this.parameters.TGP.transform_function_count,
            scale: this.parameters.TGP.scale,
            precision: this.parameters.TGP.precision,
            tolerance: this.parameters.TGP.tolerance
        }
        let seed_machine = new SeedGenerator(seed_parameters)
        if (this.parameters.TGP.seed_type == 'random') {

            for (let i = 0; i < this.parameters.TGP.tour_count; i++)
                this.tours[i].SetSeed(seed_machine.generate_random_simple_seed())
            // this.tours.map((index,T)=>console.log(index,T.seed))
        }
        if (this.parameters.TGP.seed_type == 'variation') {
            if (this.parameters.TGP.start_seed == 'random') {
                let random_seed = seed_machine.generate_random_simple_seed()
                let variation_matrix = seed_machine.generate_random_variation_matrix()
                console.log(variation_matrix)
                console.log(random_seed)
                let varied_seeds = []
                for(let i = 0; i < this.parameters.TGP.tour_count; i++)
                    varied_seeds.push(seed_machine.apply_variation_offset(random_seed,variation_matrix,i))
                for(let i = 0; i < this.parameters.TGP.tour_count; i++)
                    this.tours[i].SetSeed(varied_seeds[i])
            }
        }
        if (this.parameters.TGP.seed_type == 'loaded'){
            let loaded_seed = seed_machine.load_seed(this.parameters.TGP.seed_id)

            for(let i = 0; i < this.parameters.TGP.tour_count; i++)
                this.tours[i].SetSeed(loaded_seed)

            //[[-0.6466558, 0.12387177, -0.53947019, -0.69715325, 0.77943671, -0.79004337],
            //[0.59591638, -0.0258686, -0.40476259, -0.62336581, -0.39510686, -0.13025707]],
        }
    }

    TranslateTourGroup() {
        this.tour_group_width = (this.parameters.TGP.tour_count - 1) * this.parameters.TGP.tour_width * this.parameters.GP.overlap_ratio
        this.translate_x = (this.parameters.GP.graphic_width - this.tour_group_width) / 2
        console.log('tour group width', this.tour_group_width)
        console.log('translate x', this.translate_x)
        this.graphic.translate(this.translate_x, 0)
        // this.graphic.translate(400/3,0) 
    }

    DrawTours() {
        for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
            this.tours[i].TranslateOrigin()
            for (let j = 0; j < this.parameters.TGP.points_per_draw; j++)
                this.tours[i].Draw()
            this.tours[i].TranslateOrigin()
        }
    }

    GetGraphic() {
        return this.graphic
    }
}