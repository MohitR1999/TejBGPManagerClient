class GraphView {
    /**
     * Returns a graph view on the cell
     * @param {Object} parentCell The parent DHTMLX Cell 
     */
    constructor(parentCell) {
        this.layout = parentCell.attachLayout({
            pattern : "1C"
        });
        this.graph = new Graph("Manage IP MPLS", "graphView", this.layout.cells("a"), `${BASE_SERVER_URL}/graph/data`);
    }
}