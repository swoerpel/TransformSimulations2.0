
// highest level parameters
var general_parameters = {
    // 'batch' will save large groups of images without displaying them in the HTML
    // 'display' will display single tour groups with save option onscreen
    // display_mode : 'display', 
    graphic_width: document.documentElement.scrollWidth,
    graphic_height: document.documentElement.scrollHeight,
    draw_count: 50,
    overlap_ratio: 0.25,

    function_type: 'static', // dynamic

    debug_draw_mode: true, //draws large origin points
}

var tour_group_parameters = {
    tour_count: 1, // how many tours on the graphic
    tour_width: 1200,
    tour_height: 200,
    tour_placement: 'horizontal', //'vertical', 'random'
    tour_placement_edge_buffer: {
        x: general_parameters.graphic_width * .25,
        y: general_parameters.graphic_width * .25
    }, //distance from border that a tour can be
    seed_type: 'variation', //loaded variation random
    start_seed: 'random', //loaded or random
    seed_id: 'stalags', //only used for loading seeds
    transform_function_count: 3, //number of functions used per tour
    scale: 1, //max abs value of parameters,
    precision: 8, //decimals saved when generating random seeds
    tolerance: 0.1, // how large values in variation matrix can be
    variation_epoch: 'center', //left right random, where the 0 offset seed is located for variations
    points_per_draw: 10,

    zoom_type: 'linear', //scaled evenly between upper and lower bound
    zoom_upper_bound: 1,
    zoom_lower_bound: 1,

    time_step_type: 'linear',  //scaled evenly between upper and lower bound
    time_step_upper_bound: 0.001,
    time_step_lower_bound: 0.001,

    stroke_weight: 3, // max for oscillate also
    stroke_weight_type: 'none', //'oscillate',
    random_dynamic_function: false, //uses FunctionGenerator.js to create a random f(x,y,t)

    // refer to FunctionGenerator -> RandomFunction()
    dynamic_function_component_count: 4, // how many nonzero values are used to create f(x,y,t) 
    // less than 20

}

var color_parameters = {
    //fill_type groups: depends on if static or dynamic functions are being used
    //static:
    // - constant, one color per tour, random or loaded from color list
    // - palette per tour, one color per tour, random or loaded pallete generated
    // - palette per function, one palette per function, two colors per tour



    fill_type: 'palette per function',
    // fill_type: 'palette per function',
    color_choice: 'random', // different meanings depending upon fill_type

    general_fill_type: 'constant', //what color the dots are : constant, dynamic

    constant_fill_type: 'palette', // list, by_function


    dynamic_fill_type: 'dynamic_fill_type',

    // fill_color_choice: 'palette', // palette or list or by_function
    palette_start: '#FFFFFF',
    palette_start: '#fafa6e',
    palette_end: '#2A4858',
    palette_end: '#FF0000',
    time_change_option: 'none',
    color_count: tour_group_parameters.transform_function_count
}

var colors = {
    white: '#FFFFFF',
    red: '#FF0000',
    yellow: '#FFFF00',
    lime: '#00FF00',
    aqua: '#00FFFF',
    fuchsia: '#FF00FF'
}


var parameters = {
    GP: general_parameters,
    TGP: tour_group_parameters,
    CP: color_parameters
}




