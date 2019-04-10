

class Tour
{
    constructor(tour_index,parameters)
    {
        this.tour_index = tour_index
        this.parameters = parameters
        this.SetSeed = this.SetSeed.bind(this)
        this.SetGraphic = this.SetGraphic.bind(this)
    }



    SetSeed(seed)
    {
        this.seed = seed
    }



    SetGraphic(graphic)
    {
        this.graphic = graphic
        // this.graphic.translate(parameters.GP.)
    }

    SetOrigin(origin)
    {
        this.origin = origin
        this.origin_translated = false

    }

    TranslateOrigin()
    {
        if(this.origin_translated)
            this.graphic.translate(-this.origin.x, -this.origin.y)
        else
            this.graphic.translate(this.origin.x, this.origin.y)
        this.origin_translated = !this.origin_translated
    }

    Draw()
    {
        this.graphic.point(0,0)

    }
}