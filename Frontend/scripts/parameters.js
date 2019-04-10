
// highest level parameters
var general_parameters = {
    // 'batch' will save large groups of images without displaying them in the HTML
    // 'display' will display single tour groups with save option onscreen
    // display_mode : 'display', 
    graphic_width : 800,
    graphic_height : 200,
    draw_count : 50,
    overlap_ratio : 1.0,
}

var tour_group_parameters = {
    tour_count : 4, // how many tours on the graphic
    tour_width : 200,
    tour_height : 200,
    tour_placement : 'horizontal', //'vertical', 'random'
    tour_placement_edge_buffer : {x:100, y:50}, //distance from border that a tour can be
    seed_type : 'random', //loaded
    transform_function_count : 2, //number of functions used per tour
    scale : 1, //max abs value of parameters,
    precision : 8, //decimals saved when generating random seeds
    zoom_type : 'linear', // random    default = 2,2,2,2,2
    zoom_upper_bound : 2,
    zoom_lower_bound : 2,    
    points_per_draw : 10,
}



var parameters = {
    GP : general_parameters,
    TGP : tour_group_parameters,
}



// // sets initial starting conditions ((x,y) location) of all tours
// // zoom, shifting, origin, translate, etc
// var initial_condition_parameters = {

//     // determines origin on graphic for each tour
//     // random: random (x,y) location
//     // linear: value between 0 and 1.0 determines overlap spacing
//     translate_type : 'random', //linear, etc

//     // closest random origins can be near edge of graphic
//     translate_random_border_buffer : 10, 

//     // 0: directly ontop of eachtother
//     // 1.0: width is same as tour width
//     translate_linear_overlap_spacing : 1.0,


//     // zoom_linear_steps : na // steps should be tour count
// }

// var batch_parameters = {
//     batch_size: 10
// }