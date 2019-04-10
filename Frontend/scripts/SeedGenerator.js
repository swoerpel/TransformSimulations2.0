

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
        // let variation_matrix = []
        // for (let i = 0; i < this.parameters.transform_function_count; i++) {
        //     let random_seed_parameters = []
        //     for (let i = 0; i < this.simple_seed_parameter_count; i++) {
        //         random_seed_parameters.push((Math.random() < 0.5 ? -1 : 1) * parseFloat(Math.random(-this.parameters.tolerance, this.parameters.tolerance).toFixed(this.parameters.precision)))

        //     }
        //     variation_matrix.push(random_seed_parameters)
        // }
        // return variation_matrix
    }



}