

class SeedGenerator {
    constructor(parameters) {
        this.parameters = parameters
        this.simple_seed_parameter_count = 6;  // currently hard coded to avoid overcomplexity
        this.generate_simple_static_seed = this.generate_simple_static_seed.bind(this)
    }

    generate_random_simple_static_seed() {
        let tour_seed_group = []
        for (let i = 0; i < this.parameters.transform_function_count; i++)
            tour_seed_group.push(this.generate_simple_static_seed())
        return tour_seed_group
    }

    generate_simple_static_seed() {
        let random_seed_parameters = []
        for (let i = 0; i < this.simple_seed_parameter_count; i++)
            random_seed_parameters.push(
                // (Math.random() < 0.5 ? -1 : 1) * parseFloat(Math.random(-this.parameters.scale, this.parameters.scale).toFixed(this.parameters.precision)))
                (Math.random() < 0.5 ? -1 : 1) * parseFloat(Math.random() * -this.parameters.scale, Math.random() * this.parameters.scale).toFixed(this.parameters.precision))
        return random_seed_parameters
    }

    generate_complex_seed() {


    }



    load_seed(seed_id) {
        let seeds = {
            'leaf_bois': [[-0.6466558, 0.12387177, -0.53947019, -0.69715325, 0.77943671, -0.79004337],
            [0.59591638, -0.0258686, -0.40476259, -0.62336581, -0.39510686, -0.13025707]],
        }
        return seeds[seed_id]
    }

    generate_random_variation_matrix() {
        let variation_matrix = []
        for (let i = 0; i < this.parameters.transform_function_count; i++) {
            let random_seed_parameters = []
            for (let j = 0; j < this.simple_seed_parameter_count; j++) {
                let rand = parseFloat((Math.random() * this.parameters.tolerance).toFixed(this.parameters.precision))
                let rand_value = (Math.random() < 0.5 ? -1 : 1) * rand
                random_seed_parameters.push(rand_value)
            }
            variation_matrix.push(random_seed_parameters)
        }
        return variation_matrix
    }

    apply_variation_offset(base_parameters, variation_matrix, variation_count) {
        let matrix_machine = new MatrixMachine(this.parameters.transform_function_count)
        let linear_base_matrix = matrix_machine.linearize(base_parameters)
        let linear_variation_matrix = matrix_machine.linearize(variation_matrix)
        for (let v = 0; v < Math.abs(variation_count); v++) {
            for (let i = 0; i < linear_base_matrix.length; i++) {
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