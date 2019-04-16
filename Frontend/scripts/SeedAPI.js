

class SeedAPI {
    constructor() {


    }

    SaveTourGroup(tours) {
        console.log('t', tours)
        let tour_bodies = []
        for (let i = 0; i < tours.length; i++) {
            tour_bodies.push({
                'name': 'chet_dave',
                'seed': tours[i].seed_group
            })
        }
        this.PostTour(tour_bodies[0])

    }


    PostTour = async (body) => {
        let response = await fetch(`http://localhost:3000/tour`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let data = await response.json()
        console.log(data)
        // return data;
    }

}