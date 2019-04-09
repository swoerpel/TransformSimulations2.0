

class Tour
{
    constructor(tour_index,parameters)
    {
        this.tour_index = tour_index
        this.parameters = parameters
        this.SetSeed = this.SetSeed.bind(this)
    }

    SetSeed(seed)
    {
        this.seed = seed

    }

    
}