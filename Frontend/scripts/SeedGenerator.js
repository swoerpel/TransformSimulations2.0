

class SeedGenerator {
    constructor(parameters) {
        this.parameters = parameters
        this.simple_seed_parameter_count = 6;  // currently hard coded to avoid overcomplexity
        this.generate_simple_seed = this.generate_simple_seed.bind(this)
    }

    generate_random_simple_seed() {
        let tour_seed_group = []
        for (let i = 0; i < this.parameters.transform_function_count; i++)
            tour_seed_group.push(this.generate_simple_seed())
        return tour_seed_group
    }

    generate_simple_seed() {
        let random_seed_parameters = []
        for (let i = 0; i < this.simple_seed_parameter_count; i++)
            random_seed_parameters.push(
                (Math.random() < 0.5 ? -1 : 1) * parseFloat(Math.random(-this.parameters.scale, this.parameters.scale).toFixed(this.parameters.precision)))
        return random_seed_parameters
    }

    generate_complex_seed() {


    }

    generate_variation_seed(seed, variation_matrix, scaler) {
        // let variation_seed = []
        // for (let i = 0; i < this.parameters.transform_function_count; i++) {
        //     let variation_function_seed = []
        //     for (let j = 0; j < this.simple_seed_parameter_count; j++) {
        //         for(let k = 0; k < scaler; k++)
        //             variation_function_seed
        //             variation_function_seed.push(variation_matrix[i][j] + )
        //     }
        //     variation_seed.push(variation_function_seed)
        // }
        // return variation_seed
    }

    generate_random_variation_matrix() {
        let variation_matrix = []
        for (let i = 0; i < this.parameters.transform_function_count; i++) {
            let random_seed_parameters = []
            for (let i = 0; i < this.simple_seed_parameter_count; i++) {
                random_seed_parameters.push((Math.random() < 0.5 ? -1 : 1) * parseFloat(Math.random(-this.parameters.tolerance, this.parameters.tolerance).toFixed(this.parameters.precision-4)))
            }
            variation_matrix.push(random_seed_parameters)
        }
        return variation_matrix
    }


    //currently only works for positive numbers
    // apply_variation_offset(seed,variation_matrix,offset_count)
    // {
    //     //create scaled variation matrix

    //     for (let i = 0; i < offset_count; i++) 
    //     {
    //         for (let j = 0; j < this.parameters.transform_function_count; j++) 
    //         {
    //             for (let k = 0; k < this.simple_seed_parameter_count; k++) 
    //             {
    //                 variation_matrix[j][k] += variation_matrix[j][k]
    //             }
    //         }            
    //     }
    //     console.log('variation matrix', variation_matrix)

    // }

    apply_variation_offset(base_parameters, variation_matrix, variation_count)
    {   
        let matrix_machine = new MatrixMachine(this.parameters.transform_function_count)
        let linear_base_matrix = matrix_machine.linearize(base_parameters)
        let linear_variation_matrix = matrix_machine.linearize(variation_matrix)
        console.log('variation_count',variation_count)
        for (let v = 0; v < Math.abs(variation_count); v++)
        {
            for (let i = 0; i < linear_base_matrix.length; i++)
            {
                let offset_value = parseFloat(parseFloat(linear_variation_matrix[i]).toFixed(this.parameters.precision))
                if (variation_count <= 0)
                    linear_base_matrix[i] -= (offset_value)
                else
                    linear_base_matrix[i] += (offset_value)  
                linear_base_matrix[i] = parseFloat(parseFloat(linear_base_matrix[i]).toFixed(this.parameters.precision))
            }
        }
        let result = matrix_machine.delinearize(linear_base_matrix, this.simple_seed_parameter_count, this.parameters.transform_function_count)
        return result
        
    }


}