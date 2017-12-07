// import sq from "Square"
import { Square as sq } from "./square"

class Main {
    row1: sq.ASquare[];
    row2: sq.ASquare[];
    row3: sq.ASquare[];
    arrayOfRows;
    j: number = 0;
    i: number = 0;
    createSctructures() {
        this.arrayOfRows[0] = this.row1;
        this.arrayOfRows[1] = this.row2;
        this.arrayOfRows[2] = this.row3;
        for ( this.j = 0; this.j < 3; this.j++ ) {
            for ( this.i = 0; this.i < 3; this.i++ ) {
                this.arrayOfRows[this.j][this.i] = new sq.ASquare();
            }
        }
    }
}
