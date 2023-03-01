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
        this.layout = parentLayoutCell.attachLayout({
            pattern: "2E"
        });
        this.nodeWidth = 50;
        this.nodeHeight = 50;
        this.sliderMin = -19;
        this.sliderMax = 50;
        this.zoomMin = 0.25;
        this.zoomMax = 3;
        // storing the width and height of the inner element
        // for proper height and width adjustment
        this.innerWidth = this.layout.base.clientWidth;
        this.innerHeight = this.layout.base.clientHeight;
        this.TOOLBAR_ITEMS_CONFIG = {
            BTN_REFRESH : {
                id : "refresh",
                text : "",
                img_enabled : "/res/icons/refresh-blue.png",
                img_disabled : ""
            },

            BTN_SAVE_TOPOLOGY : {
                id : "saveTopology",
                text : "",
                img_enabled : "/res/icons/Save-Topology.png",
                img_disabled : ""
            },

            BTN_APPLY_GRID_LAYOUT : {
                id : "applyGridLayout",
                text : "",
                img_enabled : "/res/icons/grid.png",
                img_disabled : ""
            },

            BTN_APPLY_RANDOM_LAYOUT : {
                id : "applyRandomLayout",
                text : "",
                img_enabled : "/res/icons/dots.png",
                img_disabled : ""
            },

            BTN_APPLY_CIRCULAR_LAYOUT : {
                id : "applyCircularLayout",
                text : "",
                img_enabled : "/res/icons/rec.png",
                img_disabled : ""
            },

            TEXTBOX_FIND : {
                id : "find_label",
                text : "Find: "
            },

            INPUT_FIND : {
                id : "find_input",
                value : "",
                width : this.innerWidth * 0.15
            },

            BTN_FIND : {
                id : "find_button",
                text : "",
                img_enabled : "/res/icons/magnifying-glass.png",
                img_disabled : "",
                tooltip : "Search"
            },

            BTN_RESET_ZOOM : {
                id : "reset_zoom",
                text : "Reset",
                img_enabled : "",
                img_disabled : "",
                tooltip : "Reset Zoom"
            },

            BTN_SELECT_FIND : {
                id : "find_select",
                text : "By",
                opts : [
                    [
                        'find_by_ip',
                        'obj',
                        'By IP Address',
                        '/res/icons/ip-address.png'
                    ],

                    [
                        'find_by_label',
                        'obj',
                        'By Node Label',
                        '/res/icons/tag.png'
                    ]
                ],
                img_enabled : '',
                img_disabled : ''
            },

            SLIDER_ZOOM : {
                id : "zoomSlider",
                length : this.innerWidth * 0.15,
                minValue : this.sliderMin,
                maxValue : this.sliderMax,
                nowValue : 0,
                minText : "-",
                maxText : "+",
                tip : null
            }
        }
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
        this.layout.attachEvent("onPanelResizeFinish", this.layoutPanelsResizeHandler.bind(this));
        this.layout.attachEvent("onResizeFinish", this.layoutResizeHandler.bind(this));
        this.init();
    }

    layoutPanelsResizeHandler(names) {
        console.log('Panels Resize finished');
    }
    
    layoutResizeHandler() {
        console.log('Layout resize finished');
        this.innerWidth = this.layout.base.clientWidth;
        this.innerHeight = this.layout.base.clientHeight;
        if (this.bottomToolbarCell && this.topologyBottomToolbar) {
            // Bottom toolbar cell has been created so we can safely proceed with resizing
            if (this.bottomToolbarCell.getHeight() != this.topologyBottomToolbar.cont.clientHeight) {
                this.bottomToolbarCell.setHeight(this.topologyBottomToolbar.cont.clientHeight);
            } else return;
        }
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
        const columns = Math.floor(this.innerWidth / (this.nodeWidth + 100));
        const rows = Math.floor(this.innerHeight / (this.nodeHeight + 100));
        this.graph = cytoscape({
            container: document.getElementById(this.topologyParentDivId),
            hideEdgesOnViewport: true,
            textureOnViewport: true,
            pixelRatio: 1,
            wheelSensitivity: 0.50,
            fit: false,
            minZoom: 0.25,
            maxZoom: 3,
            layout: {
                name: 'grid',
                cols: columns,
                rows : rows
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
        this.graph.on('resize', this.graphResizeEventHandler.bind(this));
        this.graph.on('zoom', this.graphZoomEventHandler.bind(this));
    }

    graphResizeEventHandler(event) {
        const newWidth = this.topologyCell.cell.clientWidth;
        const newHeight = this.topologyCell.cell.clientHeight;
        const columns = Math.floor(newWidth / (this.nodeWidth + 100));
        const rows = Math.floor(newHeight / (this.nodeHeight + 100));
        const layout = {
            name: 'grid',
            cols: columns,
            rows : rows,
            fit : false,
            animate : true
        };
        this.applyLayout(layout);
    }

    graphZoomEventHandler(event) {
        const zoomLevel = this.graph.zoom();
        const sliderValue = this.sliderMin + ((this.sliderMax - this.sliderMin)/(this.zoomMax - this.zoomMin)) * (zoomLevel - this.zoomMin);
        this.topologyBottomToolbar.setValue(this.TOOLBAR_ITEMS_CONFIG.SLIDER_ZOOM.id, sliderValue, false);
    }

    /**
     * Responsible for initializing the toolbar attached to the graph
     */
    initTopologyTopToolbar() {
        this.topologyTopToolbar = this.layout.attachToolbar();
        this.topologyTopToolbar.setIconSize(18);
        this.initTopologyTopToolbarButtons();
        this.topologyTopToolbar.attachEvent("onClick", this.topologyTopToolbarOnClickHandler.bind(this));
    }

    topologyTopToolbarOnClickHandler(id) {
        if (id === this.TOOLBAR_ITEMS_CONFIG.BTN_REFRESH.id) {
            this.populateGraph();
        } else if (id === this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_GRID_LAYOUT.id) {
            // Apply grid layout here
            const columns = Math.floor(this.innerWidth / (this.nodeWidth + 100));
            const rows = Math.floor(this.innerHeight / (this.nodeHeight + 100));
            const layout = {
                name: 'grid',
                cols: columns,
                rows : rows,
                fit: false,
            }
            this.applyLayout(layout);
        } else if (id === this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_RANDOM_LAYOUT.id) {
            const layout = {
                name : 'random',
                fit : false,
            }
            this.applyLayout(layout);
        } else if (id === this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_CIRCULAR_LAYOUT.id) {
            const layout = {
                name : 'circle',
                fit : true,
                avoidOverlap : true,
                nodeDimensionsIncludeLabels : true,
                spacingFactor : 1,
                radius : Math.floor(this.innerWidth / 50)
            }
            this.applyLayout(layout);
        }
    }

    /**
     * Responsible for initializing bottom toolbar
     */
    initTopologyBottomToolbar() {
        this.topologyBottomToolbar = this.bottomToolbarCell.attachToolbar();
        // setting height of bottom cell same as that of toolbar for every screen size
        this.bottomToolbarCell.setHeight(this.topologyBottomToolbar.cont.clientHeight);
        // adding find controls
        this.initTopologyFindControls();
        // adding zoom controls
        this.initTopologyZoomSlider();

        // adding event handler
        this.topologyBottomToolbar.attachEvent("onClick", this.topologyBottomToolbarOnClickHandler.bind(this));
        this.topologyBottomToolbar.attachEvent("onValueChange", this.topologyBottomSliderValueChangeEventHandler.bind(this));
    }

    topologyBottomToolbarOnClickHandler(id) {
        if (id === this.TOOLBAR_ITEMS_CONFIG.BTN_FIND.id) {
            const queryType = this.topologyBottomToolbar.getListOptionSelected(this.TOOLBAR_ITEMS_CONFIG.BTN_SELECT_FIND.id);
            const text = this.topologyBottomToolbar.getInput(this.TOOLBAR_ITEMS_CONFIG.INPUT_FIND.id).value;
            this.graph.nodes('*').unselect();
            if (queryType === "find_by_ip") {
                const query = `#${text}`;
                const node = this.graph.nodes(query);
                this.graph.fit(node);
                node.select();
            } else if (queryType === "find_by_label") {
                const query = `[label = "${text}"]`;
                const node = this.graph.nodes(query);
                this.graph.fit(node);
                node.select();
            }
        } else if (id === this.TOOLBAR_ITEMS_CONFIG.BTN_RESET_ZOOM.id) {
            this.topologyBottomToolbar.setValue(this.TOOLBAR_ITEMS_CONFIG.SLIDER_ZOOM.id, 0, true);
        }
    }    

    topologyBottomSliderValueChangeEventHandler(id, value) {
        if (id === this.TOOLBAR_ITEMS_CONFIG.SLIDER_ZOOM.id) {
            const zoomValue = this.zoomMin + ((this.zoomMax - this.zoomMin) / (this.sliderMax - this.sliderMin)) * (value - this.sliderMin);
            console.log(zoomValue);
            this.graph.zoom(zoomValue);
        }    
    }

    /**
     * Responsible for initializing the zoom slider
     */
    initTopologyZoomSlider() {
        const sliderId = this.TOOLBAR_ITEMS_CONFIG.SLIDER_ZOOM.id;
        const pos = this.bottomItemsIndex++;
        const len = this.TOOLBAR_ITEMS_CONFIG.SLIDER_ZOOM.length;
        const minValue = this.TOOLBAR_ITEMS_CONFIG.SLIDER_ZOOM.minValue;
        const maxValue = this.TOOLBAR_ITEMS_CONFIG.SLIDER_ZOOM.maxValue;
        const nowValue = this.TOOLBAR_ITEMS_CONFIG.SLIDER_ZOOM.nowValue;
        const minText = this.TOOLBAR_ITEMS_CONFIG.SLIDER_ZOOM.minText;
        const maxText = this.TOOLBAR_ITEMS_CONFIG.SLIDER_ZOOM.maxText;
        const tip = this.TOOLBAR_ITEMS_CONFIG.SLIDER_ZOOM.tip;
        this.topologyBottomToolbar.addSlider(sliderId, pos, len, minValue, maxValue, nowValue, minText, maxText, tip);
        
        const resetButtonId = this.TOOLBAR_ITEMS_CONFIG.BTN_RESET_ZOOM.id;
        const resetButtonPosition = this.bottomItemsIndex++;
        const resetButtonText = this.TOOLBAR_ITEMS_CONFIG.BTN_RESET_ZOOM.text;
        const resetButtonImgEnabled = this.TOOLBAR_ITEMS_CONFIG.BTN_RESET_ZOOM.img_enabled;
        const resetButtonImgDisabled = this.TOOLBAR_ITEMS_CONFIG.BTN_RESET_ZOOM.img_disabled;
        this.topologyBottomToolbar.addButton(resetButtonId, resetButtonPosition, resetButtonText, resetButtonImgEnabled, resetButtonImgDisabled);
        
        this.topologyBottomToolbar.addSeparator("afterZoomSeparator", this.bottomItemsIndex++);
    }

    /**
     * Responsible for initializing toolbar buttons
     */
    initTopologyTopToolbarButtons() {
        // Add refresh button
        const refreshButtonId = this.TOOLBAR_ITEMS_CONFIG.BTN_REFRESH.id;
        const refreshButtonPosition = this.topItemsIndex++;
        const refreshButtonText = this.TOOLBAR_ITEMS_CONFIG.BTN_REFRESH.text;
        const refreshButtonImgEnabled = this.TOOLBAR_ITEMS_CONFIG.BTN_REFRESH.img_enabled;
        const refreshButtonImgDisabled = this.TOOLBAR_ITEMS_CONFIG.BTN_REFRESH.img_disabled;
        this.topologyTopToolbar.addButton(refreshButtonId, refreshButtonPosition, refreshButtonText, refreshButtonImgEnabled, refreshButtonImgDisabled);
        this.topologyTopToolbar.setItemToolTip(refreshButtonId, "Refresh");

        // Add save topology button
        const saveTopologyButtonId = this.TOOLBAR_ITEMS_CONFIG.BTN_SAVE_TOPOLOGY.id;
        const saveTopologyButtonPosition = this.topItemsIndex++;
        const saveTopologyButtonText = this.TOOLBAR_ITEMS_CONFIG.BTN_SAVE_TOPOLOGY.text;
        const saveTopologyButtonImgEnabled = this.TOOLBAR_ITEMS_CONFIG.BTN_SAVE_TOPOLOGY.img_enabled;
        const saveTopologyButtonImgDisabled = this.TOOLBAR_ITEMS_CONFIG.BTN_SAVE_TOPOLOGY.img_disabled;
        this.topologyTopToolbar.addButton(saveTopologyButtonId, saveTopologyButtonPosition, saveTopologyButtonText, saveTopologyButtonImgEnabled, saveTopologyButtonImgDisabled);
        this.topologyTopToolbar.setItemToolTip(saveTopologyButtonId, "Save Topology");

        this.topologyTopToolbar.addSeparator("afterGeneralButtonsSeparator", this.topItemsIndex++);

        // Add grid layout button
        const gridLayoutButtonId = this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_GRID_LAYOUT.id;
        const gridLayoutButtonPosition = this.topItemsIndex++;
        const gridLayoutButtonText = this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_GRID_LAYOUT.text;
        const gridLayoutButtonImgEnabled = this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_GRID_LAYOUT.img_enabled;
        const gridLayoutButtonImgDisabled = this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_GRID_LAYOUT.img_disabled;
        this.topologyTopToolbar.addButton(gridLayoutButtonId, gridLayoutButtonPosition, gridLayoutButtonText, gridLayoutButtonImgEnabled, gridLayoutButtonImgDisabled);
        this.topologyTopToolbar.setItemToolTip(gridLayoutButtonId, "Grid Layout");

        // Add circular layout button
        const circularLayoutButtonId = this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_CIRCULAR_LAYOUT.id;
        const circularLayoutButtonPosition = this.topItemsIndex++;
        const circularLayoutButtonText = this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_CIRCULAR_LAYOUT.text;
        const circularLayoutButtonImgEnabled = this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_CIRCULAR_LAYOUT.img_enabled;
        const circularLayoutButtonImgDisabled = this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_CIRCULAR_LAYOUT.img_disabled;
        this.topologyTopToolbar.addButton(circularLayoutButtonId, circularLayoutButtonPosition, circularLayoutButtonText, circularLayoutButtonImgEnabled, circularLayoutButtonImgDisabled);
        this.topologyTopToolbar.setItemToolTip(circularLayoutButtonId, "Circular Layout");
        
        // Add random layout button
        const randomLayoutButtonId = this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_RANDOM_LAYOUT.id;
        const randomLayoutButtonPosition = this.topItemsIndex++;
        const randomLayoutButtonText = this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_RANDOM_LAYOUT.text;
        const randomLayoutButtonImgEnabled = this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_RANDOM_LAYOUT.img_enabled;
        const randomLayoutButtonImgDisabled = this.TOOLBAR_ITEMS_CONFIG.BTN_APPLY_RANDOM_LAYOUT.img_disabled;
        this.topologyTopToolbar.addButton(randomLayoutButtonId, randomLayoutButtonPosition, randomLayoutButtonText, randomLayoutButtonImgEnabled, randomLayoutButtonImgDisabled);
        this.topologyTopToolbar.setItemToolTip(randomLayoutButtonId, "Random Layout");

        this.topologyTopToolbar.addSeparator("afterLayoutButtonsSeparator", this.topItemsIndex++);

    }

    initTopologyFindControls() {
        // Add find label
        const findTextBoxId = this.TOOLBAR_ITEMS_CONFIG.TEXTBOX_FIND.id;
        const findTextBoxPosition = this.bottomItemsIndex++;
        const findTextBoxText = this.TOOLBAR_ITEMS_CONFIG.TEXTBOX_FIND.text;
        this.topologyBottomToolbar.addText(findTextBoxId, findTextBoxPosition, findTextBoxText);

        // Add filter select
        const filterId = this.TOOLBAR_ITEMS_CONFIG.BTN_SELECT_FIND.id;
        const filterPosition = this.bottomItemsIndex++;
        const filterText = this.TOOLBAR_ITEMS_CONFIG.BTN_SELECT_FIND.text;
        const filterOpts = this.TOOLBAR_ITEMS_CONFIG.BTN_SELECT_FIND.opts;
        const filterImgEnabled = this.TOOLBAR_ITEMS_CONFIG.BTN_SELECT_FIND.img_enabled;
        const filterImgDisabled = this.TOOLBAR_ITEMS_CONFIG.BTN_SELECT_FIND.img_disabled;
        this.topologyBottomToolbar.addButtonSelect(filterId, filterPosition, filterText, filterOpts, filterImgEnabled, filterImgDisabled, true, true, null, "select");
        this.topologyBottomToolbar.setListOptionSelected(this.TOOLBAR_ITEMS_CONFIG.BTN_SELECT_FIND.id, this.TOOLBAR_ITEMS_CONFIG.BTN_SELECT_FIND.opts[1][0]);

         // Add input box
         const findInputId = this.TOOLBAR_ITEMS_CONFIG.INPUT_FIND.id;
         const findInputPosition = this.bottomItemsIndex++;
         const findInputValue = this.TOOLBAR_ITEMS_CONFIG.INPUT_FIND.value;
         const findInputWidth = this.TOOLBAR_ITEMS_CONFIG.INPUT_FIND.width;
         this.topologyBottomToolbar.addInput(findInputId, findInputPosition, findInputValue, findInputWidth);

        // Add search button
        const findButtonId = this.TOOLBAR_ITEMS_CONFIG.BTN_FIND.id;
        const findButtonPosition = this.bottomItemsIndex++;
        const findButtonText = this.TOOLBAR_ITEMS_CONFIG.BTN_FIND.text;
        const findButtonImgEnabled = this.TOOLBAR_ITEMS_CONFIG.BTN_FIND.img_enabled;
        const findButtonImgDisabled = this.TOOLBAR_ITEMS_CONFIG.BTN_FIND.img_disabled;
        this.topologyBottomToolbar.addButton(findButtonId, findButtonPosition, findButtonText, findButtonImgEnabled, findButtonImgDisabled);
        this.topologyBottomToolbar.setItemToolTip(findButtonId, this.TOOLBAR_ITEMS_CONFIG.BTN_FIND.tooltip);
        this.topologyBottomToolbar.addSeparator("afterFindBoxSeparator", this.bottomItemsIndex++);
    }

    populateGraph() {
        const columns = Math.floor(this.innerWidth / (this.nodeWidth + 100));
        const rows = Math.floor(this.innerHeight / (this.nodeHeight + 100));
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
                    rows : rows,
                    fit: false
                });
                layout.run();
                this.topologyCell.progressOff();
            }).catch(err => {
                console.log(err);
                this.topologyCell.progressOff();
            })
    }

    /**
     * Applies a layout on the graph
     * @param {Object} layoutConfig The layout config which you want to apply on graph 
     */
    applyLayout(layoutConfig) {
        const layout = this.graph.layout(layoutConfig);
        layout.run();
    }
}