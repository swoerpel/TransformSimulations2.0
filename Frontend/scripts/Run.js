var T;

function preload()
{
    getUserAsync = async (name) =>
    {
        let response = await fetch(`http://localhost:3000/tour`);
        let data = await response.json()
        return data;
    }

}

function setup()
{
    T = new TransformController(parameters)

    // one canvas with N tours
    T.CreateTourGroup()
    let canvas = createCanvas(parameters.GP.graphic_width, parameters.GP.graphic_height);
    canvas.parent('display');
    canvas.background(150);
}

function draw()
{
    for(let i = 0; i < parameters.GP.draw_count; i++)
        T.DrawTourGroup()
    // console.log(T.GetGraphic())
    image(T.GetGraphic(),0, 0)
    // console.log('chet')
}