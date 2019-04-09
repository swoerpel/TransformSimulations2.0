var general_parameters = {
    // 'batch' will save large groups of images without displaying them in the HTML
    // 'display' will display single tour groups with save option onscreen
    display_mode : 'display', 
    graphic_width : 1000,
    graphic_height : 1000,
    seed_type : 'random', //loaded
    tour_count : 4, // how many tours on the graphic
    tour_placement : 'horizontal', //'vertical', 'random'
    tour_placement_edge_buffer : 0, //distance from border that a tour can be
    scale : 1, //max abs value of parameters,
    precision : 8, //decimals saved when generating random seeds
    transform_function_count : 2, //number of functions used per tour
}

var batch_parameters = {
    batch_size: 10
}

var parameters = {
    GP : general_parameters,
    BP : batch_parameters
}