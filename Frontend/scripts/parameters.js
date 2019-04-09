var general_parameters = {
    // 'batch' will save large groups of images without displaying them in the HTML
    // 'display' will display single tour groups with save option onscreen
    display_mode : 'display', 
    graphic_width : 800,
    graphic_height : 200,
    stroke_weight : 10,
    tour_width : 200,
    tour_height : 200,
    seed_type : 'random', //loaded
    tour_count : 4, // how many tours on the graphic

    // seed parameters
    scale : 1, //max abs value of parameters,
    precision : 8, //decimals saved when generating random seeds
    transform_function_count : 2, //number of functions used per tour



}


// sets initial starting conditions ((x,y) location) of all tours
// zoom, shifting, origin, translate, etc
var initial_condition_parameters = {
    tour_placement : 'horizontal', //'vertical', 'random'
    tour_placement_edge_buffer : 0, //distance from border that a tour can be
    // determines origin on graphic for each tour
    // random: random (x,y) location
    // linear: value between 0 and 1.0 determines overlap spacing
    translate_type : 'random', //linear, etc

    // closest random origins can be near edge of graphic
    translate_random_border_buffer : 10, 

    // 0: directly ontop of eachtother
    // 1.0: width is same as tour width
    translate_linear_overlap_spacing : 1.0,

    zoom_type : 'random', //linear, 
    zoom_upper_bound : 1,
    zoom_lower_bound : 0.5,
    // zoom_linear_steps : na // steps should be tour count
}

var batch_parameters = {
    batch_size: 10
}

var parameters = {
    GP : general_parameters,
    BP : batch_parameters,
    ICP : initial_condition_parameters,
}