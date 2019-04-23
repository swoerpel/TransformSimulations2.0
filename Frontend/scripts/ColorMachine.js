class ColorMachine {
    constructor(parameters) {
        this.parameters = parameters

    }

    GetRandomPalette(color_count) {
        return chroma.scale([chroma.random(), chroma.random()]).mode('lch').colors(color_count)
    }

    GetLoadedPalette(color_count) {
        return chroma.scale([this.parameters.CP.palette_start, this.parameters.CP.palette_end]).mode('lch').colors(color_count)
    }

    GetRandomColors(color_count) {
        let random_colors = []
        for (let i = 0; i < color_count; i++)
            random_colors.push(chroma.random().hex())
        return random_colors
    }



}
