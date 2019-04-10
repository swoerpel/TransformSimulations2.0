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
        this.graphic.strokeWeight(10)
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

    SetupTours()
    {
        for(let i = 0; i < this.parameters.TGP.tour_count; i++)
        {
            let origin = {}


            if(this.parameters.TGP.tour_placement == 'horizontal')
            {
                let translate_x = i * (this.parameters.GP.graphic_width / this.parameters.TGP.tour_count) * this.parameters.GP.overlap_ratio
                console.log(i, translate_x)
                origin.x = translate_x
                origin.y = this.parameters.GP.graphic_height / 2

            }

            // let origin = {
                // x:
                // y: this.parameters.TGP.tour_height / 2 + this.parameters.TGP.tour_placement_edge_buffer.y
            // }

            this.tours[i].SetOrigin(origin)

        }
        this.TranslateTourGroup()

    }

    TranslateTourGroup()
    {
        this.tour_group_width = (this.parameters.TGP.tour_count - 1) * this.parameters.TGP.tour_width * this.parameters.GP.overlap_ratio
        this.translate_x = (this.parameters.GP.graphic_width / (this.parameters.TGP.tour_count)) / 2
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