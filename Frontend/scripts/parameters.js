
// highest level parameters
var general_parameters = {
    // 'batch' will save large groups of images without displaying them in the HTML
    // 'display' will display single tour groups with save option onscreen
    // display_mode : 'display', 
    graphic_width: 4000,
    graphic_height: 2400,
    draw_count: 50,
    overlap_ratio: 0.5,

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
    seed_type: 'random', //loaded variation random
    start_seed: 'random',
    seed_id : 'chet', //only used for loading seeds
    transform_function_count: 20, //number of functions used per tour
    scale: 1, //max abs value of parameters,
    precision: 8, //decimals saved when generating random seeds
    tolerance: 0.1, // how large values in variation matrix can be
    // zoom_type: 'linear', // random    default = 2,2,2,2,2
    // zoom_upper_bound: 6,
    // zoom_lower_bound: 1,
    points_per_draw: 10,

    stroke_weight: 1,

    zoom_type: 'linear', //scaled evenly between upper and lower bound
    zoom_upper_bound: 3,
    zoom_lower_bound: 3,

}

var color_parameters = {
    fill_type: 'constant', //what color the dots are 
    color_choice: 'random', //random taken from list of colors
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



