var T;
var draw_count = 0;
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
    pixelDensity(1) //prevents display issues when zooming on browser
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
    image(T.GetGraphic(),0, 0)
    draw_count++
    // if (draw_count > 100)
        // noLoop()
}