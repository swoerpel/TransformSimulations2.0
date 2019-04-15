

class TransformController {
    constructor(parameters) {
        this.parameters = parameters
        this.tour_groups = []

    }

    CreateTourGroup() {
        let tour_group = new TourGroup(this.parameters)
        tour_group.CreateTours()
        tour_group.SetupTourOrigins()
        tour_group.SetupTourSeeds()
        tour_group.SetupTourFunctions()
        tour_group.SetupTourColors()
        tour_group.SetupTourZooms()
        this.tour_groups.push(tour_group)

    }



    DrawTourGroup() {
        this.tour_groups[0].DrawTours() // once batch mode exists, we will loop through tour_groups
    }

    GetGraphic() {
        return this.tour_groups[0].GetGraphic()
    }

}

