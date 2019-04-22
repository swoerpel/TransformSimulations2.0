

class FunctionGenerator {

    constructor(parameters) {
        this.parameters = parameters
        this.total_function_components = 12// 0 -> 18
    }


    RandomFunction(constants) {
        let c = constants
        console.log(c)
        return (x, y, t) => {
            return (c[0] * x) + (c[1] * y) + (c[2] * t) +
                (c[3] * x * x) + (c[4] * y * y) + (c[5] * t * t) +
                (c[6] * x * y) + (c[7] * x * t) + (c[8] * y * t) +
                (c[9] * x * x * x) + (c[10] * y * y * y) + (c[11] * t * t * t) +
                (c[12] * x * x * y) + (c[13] * x * y * y) + (c[14] * x * x * t) +
                (c[15] * x * t * t) + (c[16] * y * y * t) + (c[17] * y * t * t) + (c[18] * x * y * t) 
        }
    }

    RandomTrigFunction(constants) {
        let c = constants
        console.log(c)
        return (x, y, t) => {
            return (c[0]*Math.cos(y + t)) + (c[1]*Math.cos(x + t)) + (c[2]*Math.sin(x + t)) + (c[3]*Math.sin(y + t)) +
                    (c[4]*Math.cos(y*x + t)) + (c[5]*Math.cos(x*t + t)) + (c[6]*Math.sin(x*y + t)) + (c[7]*Math.sin(y*t + t)) +
                    (c[8]*Math.abs(Math.cos(y*x + t))) + (c[9]*Math.abs(Math.cos(x*t + t))) + (c[10]*Math.abs(Math.sin(x*y + t))) + (c[11]*Math.abs(Math.sin(y*t + t)))

            // return (c[0]*Math.sin(x)) + (c[1]*Math.sin(y)) + (c[2]*Math.sin(t)) + (c[3]*Math.sin(x*y)) + (c[4]*Math.sin(x*t)) + 
            //        (c[5]*Math.cos(x)) + (c[6]*Math.cos(y)) + (c[7]*Math.cos(t)) + (c[8]*Math.cos(x*y)) + (c[9]*Math.cos(x*t)) + 
            //        (c[10]*Math.cos(y + t)) + (c[11]*Math.cos(x + t)) + (c[10]*Math.sin(x + t)) + (c[11]*Math.sin(y + t))
        }
    }

    //creates an array of ones and zeros, to be reused for an entire tour group
    //determines where nonzero terms are located
    GenerateRandomFunctionConfiguration() {
        let config = new Array(this.total_function_components).fill(0);
        let reserved_indexes = []
        let i = 0;
        while (i < this.parameters.TGP.dynamic_function_component_count) {
            let random_index = Math.floor(Math.random() * this.total_function_components)
            if (!reserved_indexes.includes(random_index)) {
                reserved_indexes.push(random_index)
                config[random_index] = 1
                i++
            }
        }
        return config
    }

    GenerateFunctionConstantArray(configuration, constants) {
        let config = configuration.slice()
        let constant_index = 0
        for (let i = 0; i < config.length; i++) {
            if (config[i] != 0) {
                config[i] = constants[constant_index % constants.length];
                constant_index++
            }
        }
        return config
    }



}

