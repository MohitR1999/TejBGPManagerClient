class Graph {
    /**
     * This function creates a graph and returns an instance of it
     * @param {String} context The context of the graph
     * @param {String} parentID The HTML element ID where the graph would be attached
     * @param {Object} parentLayoutCell The DHTMLX Cell where this graph would be attached    
     */
    constructor(context, parentID, parentLayoutCell) {
        // We first attach the DHTMLX components to the graph, then we
        // attach the cytoscape.js graph. We will only assign values here
        // We will populate the cells in init function
        this.context = context;
        this.layout = parentLayoutCell.attachLayout({
            pattern: "2E"
        });
        // storing the width and height of the inner element
        // for proper height and width adjustment
        this.innerWidth = this.layout.base.clientWidth;
        this.innerHeight = this.layout.base.clientHeight;
        this.topologyParentDivId = parentID;
        // cells of the topology view
        this.topologyCell = this.layout.cells("a");
        this.bottomToolbarCell = this.layout.cells("b");
        
        // placeholders for toolbars
        this.topologyTopToolbar = null;
        this.topologyBottomToolbar = null;
        
        // placeholder for graph
        this.graph = null;

        // hide headers of all cells as we don't need them
        this.topologyCell.hideHeader();
        this.bottomToolbarCell.hideHeader();
        // set separator size of the cells to 0 to prevent resizing and 
        // save space
        this.layout.setSeparatorSize(0, 0);
        this.topItemsIndex = 0;
        this.bottomItemsIndex = 0;
        this.init();
    }

    /**
     * Responsible for initializing all the graph components
     */
    init() {
        this.initTopologyTopToolbar();
        this.initTopologyBottomToolbar();
        this.initGraph();
    }

    /**
     * Responsible for initializing the graph
     */
    initGraph() {
        // Attach the div to be used for cytoscape and initialize it
        this.topologyCell.attachObject(this.topologyParentDivId);
    }

    /**
     * Responsible for initializing the toolbar attached to the graph
     */
    initTopologyTopToolbar() {
        this.topologyTopToolbar = this.layout.attachToolbar();
        this.topologyTopToolbar.setIconSize(18);
        this.initTopologyTopToolbarButtons();
    }
    
    initTopologyBottomToolbar() {
        this.topologyBottomToolbar = this.bottomToolbarCell.attachToolbar();
        // setting height of bottom cell same as that of toolbar for every screen size
        this.bottomToolbarCell.setHeight(this.topologyBottomToolbar.cont.clientHeight);
        // adding find controls
        this.initTopologyFindControls();
        // adding zoom controls
        this.initTopologyZoomSlider();
    }

    /**
     * Responsible for initializing the zoom slider
     */
    initTopologyZoomSlider() {
        const sliderId = "zoomSlider";
        const pos = this.bottomItemsIndex++;
        const len = this.innerWidth * 0.15;
        const minValue = 0;
        const maxValue = 100;
        const nowValue = 50;
        const minText = "➖";
        const maxText = "➕";
        const tip = "<b>Zoom level</b>: %v";
        this.topologyBottomToolbar.addSlider(sliderId, pos, len, minValue, maxValue, nowValue, minText, maxText, tip);
        this.topologyBottomToolbar.addSeparator("afterZoomSeparator", this.bottomItemsIndex++);
    }

    /**
     * Responsible for initializing toolbar buttons
     */
    initTopologyTopToolbarButtons() {
        // Add refresh button
        const refreshButtonId = "refresh";
        const refreshButtonPosition = this.topItemsIndex++;
        const refreshButtonText = "";
        const refreshButtonImgEnabled = "/res/icons/refresh-blue.png";
        const refreshButtonImgDisabled = "";
        this.topologyTopToolbar.addButton(refreshButtonId, refreshButtonPosition, refreshButtonText, refreshButtonImgEnabled, refreshButtonImgDisabled);
        this.topologyTopToolbar.setItemToolTip(refreshButtonId, "Refresh");
        
        // Add save topology button
        const saveTopologyButtonId = "refresh";
        const saveTopologyButtonPosition = this.topItemsIndex++;
        const saveTopologyButtonText = "";
        const saveTopologyButtonImgEnabled = "/res/icons/Save-Topology.png";
        const saveTopologyButtonImgDisabled = "";
        this.topologyTopToolbar.addButton(saveTopologyButtonId, saveTopologyButtonPosition, saveTopologyButtonText, saveTopologyButtonImgEnabled, saveTopologyButtonImgDisabled);
        this.topologyTopToolbar.setItemToolTip(saveTopologyButtonId, "Save Topology");

        this.topologyTopToolbar.addSeparator("afterGeneralButtonsSeparator", this.topItemsIndex++);

        // Add grid layout button
        const gridLayoutButtonId = "applyGridLayout";
        const gridLayoutButtonPosition = this.topItemsIndex++;
        const gridLayoutButtonText = "";
        const gridLayoutButtonImgEnabled = "/res/icons/grid.png";
        const gridLayoutButtonImgDisabled = "";
        this.topologyTopToolbar.addButton(gridLayoutButtonId, gridLayoutButtonPosition, gridLayoutButtonText, gridLayoutButtonImgEnabled, gridLayoutButtonImgDisabled);
        this.topologyTopToolbar.setItemToolTip(gridLayoutButtonId, "Grid Layout");
        this.topologyTopToolbar.addSeparator("afterLayoutButtonsSeparator", this.topItemsIndex++);

    }

    initTopologyFindControls() {
        const findTextBoxId = "find_label";
        const findTextBoxPosition = this.bottomItemsIndex++;
        const findTextBoxText = "Find: ";
        this.topologyBottomToolbar.addText(findTextBoxId, findTextBoxPosition, findTextBoxText);

        const findInputId = "find_input";
        const findInputPosition = this.bottomItemsIndex++;
        const findInputValue = "";
        const findInputWidth = this.innerWidth * 0.20;
        this.topologyBottomToolbar.addInput(findInputId, findInputPosition, findInputValue, findInputWidth);

        const findButtonId = "find_button";
        const findButtonPosition = this.bottomItemsIndex++;
        const findButtonText = "";
        const findButtonImgEnabled = "/res/icons/magnifying-glass.png";
        const findButtonImgDisabled = "";
        this.topologyBottomToolbar.addButton(findButtonId, findButtonPosition, findButtonText, findButtonImgEnabled, findButtonImgDisabled);
        this.topologyBottomToolbar.setItemToolTip(findButtonId, "Search");
        this.topologyBottomToolbar.addSeparator("afterFindBoxSeparator", this.bottomItemsIndex++);
    }
}