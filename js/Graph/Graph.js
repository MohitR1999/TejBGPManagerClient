class Graph {
    /**
     * This function creates a graph and returns an instance of it
     * @param {String} context The context of the graph
     * @param {String} parentID The HTML element ID where the graph would be attached
     * @param {Object} parentLayoutCell The DHTMLX Cell where this graph would be attached
     * @param {String} graphDataUrl The URL to fetch data for the graph    
     */
    constructor(context, parentID, parentLayoutCell, graphDataUrl) {
        // We first attach the DHTMLX components to the graph, then we
        // attach the cytoscape.js graph. We will only assign values here
        // We will populate the cells in init function
        this.context = context;
        this.nodeWidth = 50;
        this.nodeHeight = 50;
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

        // URL for graph data
        this.graphDataUrl = graphDataUrl;

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
     * Sets the URL for 
     * @param {String} url The url from which graph will populate its data 
     */
    setGraphDataUrl(url) {
        this.graphDataUrl = url;
    }

    /**
     * Responsible for initializing all the graph components
     * AND starting the populating process
     */
    init() {
        this.initTopologyTopToolbar();
        this.initTopologyBottomToolbar();
        this.initGraph();
        this.populate();
    }

    /**
     * Responsible for populating the data
     */
    populate() {
        this.populateGraph();
    }

    /**
     * Responsible for initializing the graph
     */
    initGraph() {
        // Attach the div to be used for cytoscape and initialize it
        this.topologyCell.attachObject(this.topologyParentDivId);
        // calculate the number of columns based on the node width and add some extra offset for padding
        const columns = Math.floor(this.innerWidth / this.nodeWidth + 100);
        this.graph = cytoscape({
            container: document.getElementById(this.topologyParentDivId),
            hideEdgesOnViewport: true,
            textureOnViewport: true,
            pixelRatio: 1,
            wheelSensitivity: 0.50,
            fit: false,
            minZoom: 0.50,
            maxZoom: 3,
            layout: {
                name: 'grid',
                cols: columns
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-image': '/res/icons/router-blue.png',
                        'width' : `${this.nodeWidth}px`,
                        'height' : `${this.nodeHeight}px`,
                        'background-fit' : 'cover',
                        'background-repeat' : 'no-repeat',
                        'background-clip' : 'none',
                        'background-opacity' : '0',
                        'label': 'data(label)',
                        'min-zoomed-font-size': '12px',
                        'font-size' : '12px',
                        'color' : '#0287d0'
                    }
                },

                {
                    selector : 'core',
                    style : {
                        'active-bg-color' : '#0287d0',
                        'active-bg-opacity' : '0.2'
                    }
                },

                {
                    selector: 'node:selected',
                    style: {
                        'background-image': '/res/icons/router-green.png',
                        'color' : '#02d053'
                    }
                },

                {
                    selector: 'edge',
                    style: {
                        'curve-style': 'haystack'
                    }
                }
            ]
        });
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
        const minValue = -50;
        const maxValue = 50;
        const nowValue = 0;
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

    populateGraph() {
        const columns = Math.floor(this.innerWidth / (this.nodeWidth + 100));
        this.topologyCell.progressOn();
        fetch(this.graphDataUrl)
            .then(res => res.json())
            .then(graphData => {
                this.graph.startBatch();
                this.graph.add(graphData);
                this.graph.endBatch();
                const layout = this.graph.layout({
                    name: 'grid',
                    cols: columns,
                    fit: false
                });
                layout.run();
                this.topologyCell.progressOff();
            }).catch(err => {
                console.log(err);
                this.topologyCell.progressOff();
            })
    }
}