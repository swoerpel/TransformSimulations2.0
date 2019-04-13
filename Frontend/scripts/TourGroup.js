class TourGroup {
    constructor(parameters) {
        this.parameters = parameters
        this.tours = []
        this.CreateGraphic()

    }

    // creates and sets up graphics object for which all tours are placed
    CreateGraphic() {
        // p5js constructor
        this.graphic = createGraphics(this.parameters.GP.graphic_width, this.parameters.GP.graphic_height)
        this.graphic.background(0)
        this.graphic.strokeWeight(this.parameters.TGP.stroke_weight)
        this.graphic.stroke(255)
    }

    // creates tour objects and applys graphic
    CreateTours() {
        this.tours = []
        for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
            let new_tour = new Tour(i, this.parameters)
            new_tour.SetGraphic(this.graphic)
            this.tours.push(new_tour)
        }
    }

    // sets up origin (0,0) points for each tour
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

    // only used when creating a linear layout for tour origins
    // tours are spaced apart in the top left, then this function translates
    // the whole group to the center
    TranslateTourGroup() {
        this.tour_group_width = (this.parameters.TGP.tour_count - 1) * this.parameters.TGP.tour_width * this.parameters.GP.overlap_ratio
        this.translate_x = (this.parameters.GP.graphic_width - this.tour_group_width) / 2
        console.log('tour group width', this.tour_group_width)
        console.log('translate x', this.translate_x)
        this.graphic.translate(this.translate_x, 0)
        // this.graphic.translate(400/3,0) 
    }

    // loads colors based on color parameters
    SetupTourColors() {
        // currently not working due to chroma-js include issue
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

    // sets zoom for each tour based on parameters
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


    // sets the seed of each tour based on parameters
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
            let current_seed;
            if (this.parameters.TGP.start_seed == 'random') {
                current_seed = seed_machine.generate_random_simple_seed()
            }
            else if (this.parameters.TGP.start_seed == 'loaded') {
                current_seed = seed_machine.load_seed(this.parameters.TGP.seed_id)
            }
            let variation_matrix = seed_machine.generate_random_variation_matrix()
            console.log('variation matrix',variation_matrix)
            let varied_seeds = []
            for(let i = 0; i < this.parameters.TGP.tour_count; i++)
                varied_seeds.push(seed_machine.apply_variation_offset(current_seed,variation_matrix,i))
            for(let i = 0; i < this.parameters.TGP.tour_count; i++)
                this.tours[i].SetSeed(varied_seeds[i])
        }

    }

    // translates each tour to its local origin
    // calls draw on that tour a set amount of times
    // translates back to global origin for next tour
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