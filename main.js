var Main = (function () {
    function Main() {
        this.j = 0;
        this.i = 0;
    }
    Main.prototype.createSctructures = function () {
        this.arrayOfRows[0] = this.row1;
        this.arrayOfRows[1] = this.row2;
        this.arrayOfRows[2] = this.row3;
        for (this.j = 0; this.j < 3; this.j++) {
            for (this.i = 0; this.i < 3; this.i++) {
                this.arrayOfRows[this.j][this.i] = new Square();
            }
        }
    };
    return Main;
})();
