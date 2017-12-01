class Main {
    arrayOfRows: [Square[], Square[], Square[]];
    j: 0;
    i: 0;
    createSctructures() {
        for ( this.j = 0; this.j < 3; this.j++ ) {
            for ( this.i = 0; this.i < 3; this.i++ ) {
                this.arrayOfRows[this.j][this.i] = new Square();
            }
        }
    }
}
