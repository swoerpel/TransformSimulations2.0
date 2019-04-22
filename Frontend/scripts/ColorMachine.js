class ColorMachine
{
    constructor(parameters)
    {
        this.parameters = parameters

    }

    GetRandomPalette(color_count)
    {
        // return chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(6)
        return chroma.scale([this.parameters.CP.palette_start,this.parameters.CP.palette_end]).mode('lch').colors(color_count)
        // return chroma.scale([this.parameters.CP.palette_start,this.parameters.CP.palette_end]).mode('lch').colors(this.parameters.TGP.tour_count)
        // return chroma.scale([this.parameters.CP.palette_start,this.parameters.CP.palette_end]).mode('lch').colors(this.parameters.CP.color_count)
    }


}
