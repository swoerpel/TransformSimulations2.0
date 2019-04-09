

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
    }

    Draw()
    {
        //move origin to determined start location
        this.graphic.translate(this.x_translate, this.y_translate)



        //revert back to default origin so other tours can translate without fault
        this.graphic.translate(-this.x_translate, -this.y_translate)
    }
}