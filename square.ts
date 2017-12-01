 class Square {
    left: Square;
    right: Square;
    top: Square;
    bottom: Square;
    // constructor(top: Square, bottom: Square, left: Square, right: Square ) {
    //     this.top = top;
    //     this.bottom = bottom;
    //     this.left = left;
    //     this.right = right;
    // },
    constructor() {
    }
}

declare module "Square" {
    export function fn(): string;
}
