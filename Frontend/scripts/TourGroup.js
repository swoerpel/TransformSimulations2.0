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
        let color_machine = new ColorMachine(this.parameters)
        if (this.parameters.CP.fill_type == 'constant') {
            if (this.parameters.CP.fill_color_choice == 'list') {
                for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
                    let keys = Object.keys(colors);
                    this.tours[i].SetFillColor(colors[keys[i % keys.length]])
                }
            }
            else if (this.parameters.CP.fill_color_choice == 'palette') {
                let color_palette = color_machine.GetRandomPalette()
                console.log('colors used', color_palette)
                this.tours.map((t, index) => t.SetFillColor(color_palette[index]))
                // for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
                //     this.tours[i].SetFillColor(color_palette[i])
                // }
            }
        }
    }

    // sets zoom for each tour based on parameters
    SetupTourZooms() {
        // scaled evenly between upper and lower bound
        if (this.parameters.TGP.zoom_type == 'linear') {
            let zoom_difference = this.parameters.TGP.zoom_upper_bound - this.parameters.TGP.zoom_lower_bound
            let zoom_step = zoom_difference / (this.parameters.TGP.tour_count - 1)
            if (this.parameters.TGP.tour_count == 1) // divide by zero error when tour_count == 1 
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
                this.tours[i].SetSeed(seed_machine.generate_random_simple_static_seed())
            // this.tours.map((index,T)=>console.log(index,T.seed))
        }
        if (this.parameters.TGP.seed_type == 'variation') {
            let current_seed;
            if (this.parameters.TGP.start_seed == 'random') {
                current_seed = seed_machine.generate_random_simple_static_seed()
            }
            else if (this.parameters.TGP.start_seed == 'loaded') {
                current_seed = seed_machine.load_seed(this.parameters.TGP.seed_id)
            }
            let variation_matrix = seed_machine.generate_random_variation_matrix()
            let varied_seeds = []
            let variation_count_alignment_indexes = this.GenerateVariationCountIndexes()
            for (let i = 0; i < this.parameters.TGP.tour_count; i++)
                varied_seeds.push(seed_machine.apply_variation_offset(current_seed, variation_matrix, variation_count_alignment_indexes[i]))

            for (let i = 0; i < this.parameters.TGP.tour_count; i++)
                this.tours[i].SetSeed(varied_seeds[i])
        }
    }


    GenerateVariationCountIndexes() {
        let indexes = []
        if (this.parameters.TGP.variation_epoch == 'left') {
            // return [...Array(this.parameters.TGP.tour_count).keys()] // one line solution
            for (let i = 0; i < this.parameters.TGP.tour_count; i++)
                indexes.push(i)
        }
        else if (this.parameters.TGP.variation_epoch == 'right') {
            for (let i = this.parameters.TGP.tour_count; i > 0; i--)
                indexes.push(i)
        }
        else if (this.parameters.TGP.variation_epoch == 'center') {
            let base_index = Math.floor((this.parameters.TGP.tour_count - 1) / 2)
            for (let i = 0; i < this.parameters.TGP.tour_count; i++)
                indexes.push(i - base_index)
        }
        else if (this.parameters.TGP.variation_epoch == 'random') {
            let index_bucket = []
            let base_index = Math.floor((this.parameters.TGP.tour_count - 1) / 2)
            for (let i = 0; i < this.parameters.TGP.tour_count; i++)
                index_bucket.push(i - base_index)
            for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
                let random_index = Math.floor(Math.random() * this.parameters.TGP.tour_count - i)
                indexes.push(index_bucket.splice(random_index, 1)[0])
            }
        }
        console.log('variation justify : ', this.parameters.TGP.variation_epoch)
        console.log('variation indexes', indexes)
        return indexes
    }


    SetupTourFunctions() {
        if (this.parameters.GP.function_type == 'static') {
            for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
                let current_transform_functions = []
                let current_seed_group = this.tours[i].GetSeedGroup()
                for (let j = 0; j < current_seed_group.length; j++) {
                    current_transform_functions.push((x, y) => {
                        return {
                            x: current_seed_group[j][0] * x + current_seed_group[j][1] * y + current_seed_group[j][4],
                            y: current_seed_group[j][2] * x + current_seed_group[j][3] * y + current_seed_group[j][5]
                        }
                    });
                }
                this.tours[i].SetFunctions(current_transform_functions)
            }
        }
        else if (this.parameters.GP.function_type == 'dynamic') {
            for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
                let current_transform_functions = []
                let current_seed_group = this.tours[i].GetSeedGroup()
                for (let j = 0; j < current_seed_group.length; j++) {
                    current_transform_functions.push((x, y, t) => {
                        return {
                            x: x * (1 - x) * t,
                            y: x * t * y
                        }
                    });
                }
                this.tours[i].SetFunctions(current_transform_functions)
            }
        }
    }

    // translates each tour to its local origin
    // calls draw on that tour a set amount of times
    // translates back to global origin for next tour
    DrawTours() {
        for (let i = 0; i < this.parameters.TGP.tour_count; i++) {
            this.tours[i].TranslateOrigin()
            this.tours[i].IncStep()
            for (let j = 0; j < this.parameters.TGP.points_per_draw; j++)
                this.tours[i].Draw()
            this.tours[i].TranslateOrigin()
        }
    }

    GetGraphic() {
        return this.graphic
    }
}