const BGPTREE_MENU_CONFIG = {
    items: [
        {
            id: "file", text: "File", items: [
                {
                    id: "file_add_node", text: "Add New Node"
                },

                {
                    id: "file_add_config", text: "Add BGP Configuration"
                },

                {
                    id: "file_refresh", text: "Refresh"
                }
            ]
        },

        {
            id: "view", text: "View", items: [
                {
                    id: "view_toggle_side_panel", text: "Toggle side panel"
                }
            ]
        }
    ]
}

const BGPTREE_NODE_ADDITION_FORM_CONFIG = [
    {
        type: "settings", position: "label-top", labelWidth: "100", inputWidth: "300"
    },

    {
        type: "block", list: [
            {
                type: "input", name: "ip", label: "IP Address:", tooltip: "Enter IP Address"
            },

            {
                type: "button", name: "proceed", value: "Proceed"
            }
        ]
    }
]

const TREE_CELL_CONFIG = {
    multiselect: false,
    checkboxes: false,
    dnd: false,
    items: [
        {
            id: "bgp_context_0_0_1_1", text: "BGP-CONTEXT-0-0-1-1", items: [
                {
                    id: "bgp_peers", text: "BGP Peers", items: [
                        {
                            id: "peer1", text: "Peer 1"
                        },

                        {
                            id: "peer2", text: "Peer 2"
                        }
                    ]
                }
            ]
        }
    ]
}

class BGPTree {
    constructor(parentCell) {
        this.layout = parentCell.attachLayout({
            pattern: "3J"
        });
        this.menu = this.layout.attachMenu(BGPTREE_MENU_CONFIG);
        this.graphCell = this.layout.cells("a");
        this.graph = null;
        this.findCell = this.layout.cells("c");
        this.detailsCell = this.layout.cells("b");
        this.nodeAdditionWindow = new WizardWindow({
            id: "node_addition",
            text: "Add node",
            top: 100,
            left: 100,
            width: 350,
            height: 150
        }, BGPTREE_NODE_ADDITION_FORM_CONFIG, this.layout);
        this.detailsLayout = null;
        this.nodeAdditionForm = this.nodeAdditionWindow.getForm();
        this.nodeAdditionWindow.hide();
        this.init();
    }

    init() {
        this.layout.setSeparatorSize(0, 0);
        this.layout.setSeparatorSize(1, 0);
        this.graphCell.hideHeader();
        this.graphCell.attachObject("treeGraph");
        this.graph = cytoscape({
            container: document.getElementById("treeGraph"),
            hideEdgesOnViewport: true,
            textureOnViewport: true,
            pixelRatio: 1,
            wheelSensitivity: 0.50,
            fit: false,
            minZoom: 0.50,
            maxZoom: 3,
            layout: {
                name: 'grid',
                cols: 5
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#000',
                        'label': 'data(id)',
                        'min-zoomed-font-size': '12px'
                    }
                },

                {
                    selector: ':selected',
                    style: {
                        'background-color': '#1B9CFC',
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
        this.findCell.hideHeader();
        this.findCell.setHeight(50);
        this.detailsCell.setText("Details");
        this.detailsCell.setWidth(700);
        this.detailsLayout = this.detailsCell.attachLayout({
            pattern: "2U"
        });
        this.treeDetailsCell = this.detailsLayout.cells("b");
        this.detailsLayout.cells("a").hideHeader();
        this.detailsLayout.cells("b").hideHeader();
        this.detailsLayout.cells("a").setWidth(300);
        this.detailsLayout.setSeparatorSize(0, 0);

        this.menu.attachEvent("onClick", this.menuEventHandler.bind(this));
        this.nodeAdditionForm.attachEvent("onButtonClick", this.formButtonClickHandler.bind(this));
        this.graph.on('resize', this.graphEventHandler.bind(this));
        // this.detailsCell.collapse();
        this.initTreeCell();
        this.populate();
    }

    initTreeCell() {
        this.treeCell = this.detailsLayout.cells("a");
        this.treeCellConfigTree = this.treeCell.attachTreeView(TREE_CELL_CONFIG);
        this.treeCellConfigTree.attachEvent("onClick", this.treeViewOnClickHandler.bind(this));
        this.treeCellConfigTree.attachEvent("onBeforeSelect", this.treeViewOnBeforeSelectHandler.bind(this));
    }

    treeViewOnClickHandler(id) {
        console.log(id);
    }

    treeViewOnBeforeSelectHandler(id) {
        console.log(`Before selecting: ${id}`);
        this.treeDetailsCell.showView(id);
        return true;
    }

    populate() {
        this.graphCell.progressOn();
        fetch(`${BASE_SERVER_URL}/graph/data`)
            .then(result => result.json())
            .then(data => {
                this.graph.startBatch();
                this.graph.add(data);
                this.graph.endBatch();
                const layout = this.graph.layout({
                    name: 'grid',
                    rows: 5,
                    cols: 5,
                    fit: false
                });
                layout.run();
                this.graphCell.progressOff();
            })
    }

    menuEventHandler(id, zoneId, cas) {
        if (id == "file_add_node") {
            this.nodeAdditionWindow.show();
        } else if (id == "view_toggle_side_panel") {
            if (this.detailsCell.isCollapsed()) {
                this.detailsCell.expand();
            } else {
                this.detailsCell.collapse();
            }
        }
    }

    graphEventHandler() {
        const layout = this.graph.layout({
            name: 'grid',
            rows: 5,
            cols: 5,
            fit: false
        });
        layout.run();
    }

    formButtonClickHandler(name) {
        if (name == "proceed") {
            const ip = this.nodeAdditionForm.getItemValue("ip");
            if (ip) {
                const requestBody = {
                    ip: ip
                };
                // fetch call to submit data to server
                this.nodeAdditionWindow.progressOn();
                fetch(`${BASE_SERVER_URL}/addnode`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                }).then(result => result.json())
                    .then(json => {
                        this.graph.add({
                            data: {
                                id: json.ip,
                                label: json.ip
                            }
                        });
                        const layout = this.graph.layout({
                            name: 'grid',
                            rows: 5,
                            cols: 5,
                            fit: false
                        });
                        layout.run();
                        this.nodeAdditionWindow.progressOff();
                        this.nodeAdditionForm.setItemValue("ip", "");
                        this.nodeAdditionWindow.hide();
                    })
                    .catch(err => {
                        console.log(err);
                        this.nodeAdditionWindow.progressOff();
                    });
            }
        }
    }
}