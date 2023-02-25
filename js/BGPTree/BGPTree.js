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
                    id: "view_side_panel", text: "Side Panel"
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
        this.detailsCell.setWidth(600);
        this.menu.attachEvent("onClick", this.menuEventHandler.bind(this));
        this.nodeAdditionForm.attachEvent("onButtonClick", this.formButtonClickHandler.bind(this));
        this.populate();
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
                name : 'grid',
                rows : 5,
                cols : 5,
                fit : false
            });
            layout.run();
            this.graphCell.progressOff();
        })    
    }

    menuEventHandler(id, zoneId, cas) {
        if (id == "file_add_node") {
            this.nodeAdditionWindow.show();
        }
    }

    formButtonClickHandler(name) {
        if (name == "proceed") {
            const ip = this.nodeAdditionForm.getItemValue("ip");
            if (ip) {
                const requestBody = {
                    ip : ip
                };
                // fetch call to submit data to server
                this.nodeAdditionWindow.progressOn();
                fetch(`${BASE_SERVER_URL}/addnode`, {
                    method : 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(requestBody)
                }).then(result => result.json())
                .then(data => {
                    console.log(data);
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