

class TransformController
{
    constructor(parameters)
    {
        this.parameters = parameters
        this.SetupParameters = this.SetupParameters.bind(this)
        this.InitializeDisplayTours = this.InitializeDisplayTours.bind(this)
        this.InitializeBatchTours = this.InitializeBatchTours.bind(this)
        this.SetDisplaySeeds = this.SetDisplaySeeds.bind(this)
    }


    // loads all seeds to be used for a given tour
    SetupParameters()
    {
        
        console.log('All Parameters')
        console.log(this.parameters)
        if (this.parameters.GP.seed_type == 'random')
        {
            if(this.parameters.GP.display_mode == 'display')
            {
                this.InitializeDisplayTours()
                this.seeds = []
                for(let i = 0; i < this.parameters.GP.tour_count; i++)
                    this.seeds.push(generate_random_transform_parameters(
                    this.parameters.GP.transform_function_count,
                    this.parameters.GP.scale,
                    this.parameters.GP.precision))

                this.SetDisplaySeeds()

            }
            else if(this.parameters.GP.display_mode == 'batch')
            {
                this.InitializeBatchTours()
            }
        }
        else if(this.parameters.GP.seed_type == 'loaded')
        {


        }
    }

//===============================Display mode function calls====================================
    
    //creates single group of tours for one graphic
    InitializeDisplayTours()
    {
        this.tours = []
        for(let i = 0; i < this.parameters.GP.tour_count; i++)
            this.tours.push(new Tour(i,this.parameters))
    }

    SetDisplaySeeds()
    {
        for(let i = 0; i < this.parameters.GP.tour_count; i++)
            this.tours[i].SetSeed(this.seeds[i])
        
        this.tours.map((value, index) => {console.log('Tour ', index, ' Seed\t:', value.seed)})

    }




//===============================Batch mode function calls====================================

    //creates array of groups of tours for batch saving
    InitializeBatchTours()
    {
        this.tour_groups = []
        for(let i = 0; i < this.parameters.GP.BP.batch_count; i++)
        {
            let temp_tour_group = []
            for(let j = 0; j < this.parameters.GP.tour_count; j++)
                temp_tour_group.push(new Tour(i,this.parameters))
            this.tour_groups.push(temp_tour_group)
        }
    }
}



//===============================Helper functions=============================================
//independent from this.parameters
//all referenced parameters are inputted
function generate_random_transform_parameters(function_count, scale, precision)
{
    let transform_parameters = []
    for (let i = 0; i < function_count; i++)
    {
        let rands = []
        rands.push(parseFloat(Math.random(-scale,scale).toFixed(precision)))
        rands.push(parseFloat(Math.random(-scale,scale).toFixed(precision)))
        rands.push(parseFloat(Math.random(-scale,scale).toFixed(precision)))
        rands.push(parseFloat(Math.random(-scale,scale).toFixed(precision)))
        rands.push(parseFloat(Math.random(-scale,scale).toFixed(precision)))
        rands.push(parseFloat(Math.random(-scale,scale).toFixed(precision)))
        transform_parameters.push(rands)
    }
    return transform_parameters
}