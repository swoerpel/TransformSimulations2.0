class TourGroup
{
    constructor(parameters)
    {
        this.parameters = parameters
        this.tours = []
        this.CreateGraphic()
        
    }

    CreateGraphic()
    {
        this.graphic = createGraphics(parameters.GP.graphic_width,parameters.GP.graphic_height)
        this.graphic.background(0)
        this.graphic.strokeWeight(this.parameters.TGP.stroke_weight)
        this.graphic.stroke(255)
    }

    CreateTours()
    {
        this.tours = []
        for(let i = 0; i < this.parameters.TGP.tour_count; i++)
        {
            let new_tour = new Tour(i,this.parameters)
            new_tour.SetGraphic(this.graphic)
            this.tours.push(new_tour)
        }
    }

    SetupTourOrigins()
    {
        console.log('graphic width', this.parameters.GP.graphic_width)
        if(this.parameters.TGP.tour_placement == 'horizontal')
        {
            for(let i = 0; i < this.parameters.TGP.tour_count; i++)
            {
                let origin = {}
                let step_distance = (this.parameters.TGP.tour_width) * this.parameters.GP.overlap_ratio
                origin.x = i * step_distance
                origin.y = this.parameters.GP.graphic_height / 2
                this.tours[i].SetOrigin(origin)
            }
            this.TranslateTourGroup()
            
        }
        if(this.parameters.TGP.tour_placement == 'random')
        {
            
        }
    }

    SetupTourColors()
    {
        if(this.parameters.CP.fill_type == 'constant')
        {
            if(this.parameters.CP.color_choice == 'random')
            {
                for(let i = 0; i < this.parameters.TGP.tour_count; i++)
                {
                    let keys = Object.keys(colors);
                    // let rand_color = colors[keys[Math.floor(keys.length * Math.random())]];
                    // console.log(rand_color)

                    this.tours[i].SetFillColor(colors[keys[i]])
                    
                }
            }

        }

    }


    SetupTourSeeds()
    {
        if (this.parameters.TGP.seed_type == 'random')
        {
            let seed_parameters = {
                transform_function_count : this.parameters.TGP.transform_function_count,
                scale : this.parameters.TGP.scale,
                precision : this.parameters.TGP.precision
            }
            let seed_machine = new SeedGenerator(seed_parameters)
            for(let i = 0; i < this.parameters.TGP.tour_count; i++)
                this.tours[i].SetSeedGroup(seed_machine.generate_random_simple_seed_group())
            // this.tours.map((index,T)=>console.log(index,T.seed))
        }
    }

    TranslateTourGroup()
    {
        this.tour_group_width = (this.parameters.TGP.tour_count - 1) * this.parameters.TGP.tour_width * this.parameters.GP.overlap_ratio
        this.translate_x = (this.parameters.GP.graphic_width - this.tour_group_width) / 2
        console.log('tour group width',this.tour_group_width)
        console.log('translate x',this.translate_x)
        this.graphic.translate(this.translate_x,0) 
        // this.graphic.translate(400/3,0) 
    }

    DrawTours()
    {
        for(let i = 0; i < this.parameters.TGP.tour_count; i++)
        {
            this.tours[i].TranslateOrigin()
            for(let j = 0; j < this.parameters.TGP.points_per_draw; j++)
                this.tours[i].Draw()
            this.tours[i].TranslateOrigin()
        }
    }

    GetGraphic()
    {
        return this.graphic
    }
}