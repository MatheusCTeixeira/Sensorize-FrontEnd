

class Color {
    constructor(
        public red  : number,
        public green: number,
        public blue : number,
        public alpha: number) {

    }

    light = () => new Color(this.red, this.green, this.blue, .3);

    dark = () =>  new Color(this.red, this.green, this.blue, 1);

    toString = () => (
        `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`);
};

const Colors: Color[] = [
    new Color(255,   0,   0, .5), // Red
    new Color(  0, 255,   0, .5), // Green
    new Color(  0,   0, 255, .5), // Blue
    new Color(128,   0, 128, .5), // Purple
    new Color(255, 255,   0, .5), // Yellow
    new Color(  0,   0,   0, .5), // Black
];

export {
    Color,
    Colors,
};