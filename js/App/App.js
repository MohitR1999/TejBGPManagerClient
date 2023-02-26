const SIDEBAR_CONFIG = {
    parent : document.body,
    template : "tiles",
    header : true,
    autohide : true,
    width : 250,
    items : [
        {
            id : "bgp_config_tree",
            text : "BGP Configuration (Tree Structure)",
            icon : "res/icons/hub_filled.svg",
        },
        
        {
            id : "bgp_config_grid",
            text : "BGP Configuration (Grid Structure)",
            icon : "res/icons/settings_ethernet_fill.svg",
            selected : true
        }
    ]
};

class App {
    constructor() {
        this.sidebar = new dhtmlXSideBar(SIDEBAR_CONFIG);
        this.bgpTreeCell = this.sidebar.cells("bgp_config_tree");
        this.bgpGridCell = this.sidebar.cells("bgp_config_grid");
        this.bgpTree = new BGPTree(this.bgpTreeCell);
        this.bgpGrid = new BGPGrid(this.bgpGridCell);
    }
}