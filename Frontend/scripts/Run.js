var seeds;
var input, file, fr;
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
    // seeds.push(JSON.parse(e.target.result))
    // parameters['seeds'] = seeds
    let T = new TransformController(parameters)
    T.SetupSeedParameters()  
    T.SetupTourSequence()
    T.SetupGraphic()
    T.SetupInitialConditions()
}

function draw()
{

    // console.log('chet')
}