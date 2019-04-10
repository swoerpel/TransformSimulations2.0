

class SeedGenerator
{
    constructor(parameters)
    {
        this.parameters = parameters
        this.simple_seed_parameter_count = 6;  // currently hard coded to avoid overcomplexity
        this.generate_simple_seed = this.generate_simple_seed.bind(this)
    }

    generate_random_simple_seed_group()
    {
        let tour_seed_group = []
        for (let i = 0; i < this.parameters.transform_function_count; i++)
            tour_seed_group.push(this.generate_simple_seed())
        return tour_seed_group 
    }

    generate_simple_seed()
    {
        let random_seed_parameters = []
        for(let i = 0; i < this.simple_seed_parameter_count; i++)
            random_seed_parameters.push(
                (Math.random() < 0.5 ? -1 : 1) * parseFloat(Math.random(-this.parameters.scale,this.parameters.scale).toFixed(this.parameters.precision)))
        return random_seed_parameters
    }

    generate_complex_seed()
    {


    }

 

}