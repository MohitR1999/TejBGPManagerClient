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
                    id: "bgp_global_parameters", text: "BGP Global Parameters"
                },

                {
                    id: "bgp_peers", text: "BGP Peers", items: [
                        {
                            id: "bgp_peer_0_0_1_1", text: "BGPPEER-0-0-1-1"
                        },

                        {
                            id: "bgp_peer_0_0_1_2", text: "BGPPEER-0-0-1-2"
                        },

                        {
                            id: "bgp_peer_0_0_1_3", text: "BGPPEER-0-0-1-3"
                        },
                        {
                            id: "bgp_peer_0_0_1_4", text: "BGPPEER-0-0-1-4"
                        },
                        {
                            id: "bgp_peer_0_0_1_5", text: "BGPPEER-0-0-1-5"
                        },
                        {
                            id: "bgp_peer_0_0_1_6", text: "BGPPEER-0-0-1-6"
                        },
                        {
                            id: "bgp_peer_0_0_1_7", text: "BGPPEER-0-0-1-7"
                        }
                    ]
                },

                {
                    id: "bgp_peer_groups", text: "BGP Groups", items: [
                        {
                            id: "bgp_peer_group_0_0_1_1", text: "BGPPEERGROUP-0-0-1-1"
                        },

                        {
                            id: "bgp_peer_group_0_0_1_2", text: "BGPPEERGROUP-0-0-1-2"
                        },

                        {
                            id: "bgp_peer_group_0_0_1_3", text: "BGPPEERGROUP-0-0-1-3"
                        },
                        {
                            id: "bgp_peer_group_0_0_1_4", text: "BGPPEERGROUP-0-0-1-4"
                        },
                        {
                            id: "bgp_peer_group_0_0_1_5", text: "BGPPEERGROUP-0-0-1-5"
                        },
                        {
                            id: "bgp_peer_group_0_0_1_6", text: "BGPPEERGROUP-0-0-1-6"
                        },
                        {
                            id: "bgp_peer_group_0_0_1_7", text: "BGPPEERGROUP-0-0-1-7"
                        }
                    ]
                },

                {
                    id: "bgp_advanced_config", text: "Advanced Configuration", items: [
                        {
                            id: "graceful_restart", text: "Graceful Restart"
                        },

                        {
                            id: "route_reflector", text: "Route reflector"
                        },

                        {
                            id: "confederation", text: "Confederation"
                        },
                        {
                            id: "rrd", text: "RRD"
                        },
                        {
                            id: "dampening", text: "Dampening"
                        },
                        {
                            id: "community", text: "Community"
                        },
                        {
                            id: "four_bytes_as", text: "Four Bytes AS"
                        }
                    ]
                },

                {
                    id: "bgp_attributes", text: "BGP Attributes", items: [
                        {
                            id: "local_preference", text: "Local Preference"
                        },

                        {
                            id: "med_metric", text: "MED Metric"
                        },

                        {
                            id: "bgp_tcp_mkt_auth_table", text: "BGP TCP MKT Authentication table"
                        }
                    ]
                },

                {
                    id: "bgp_route_processing", text: "BGP Route Processing", items: [
                        {
                            id: "bgp_route", text: "BGP Route"
                        },

                        {
                            id: "bgp_filter", text: "BGP Filter"
                        },

                        {
                            id: "bgp_policy", text: "BGP Policy"
                        }
                    ]
                }
            ]
        },

        {
            id: "bgp_context_0_0_1_2", text: "BGP-CONTEXT-0-0-1-2", items: [
                {
                    id: "bgp_global_parameters_1", text: "BGP Global Parameters"
                },

                {
                    id: "bgp_peers_1", text: "BGP Peers", items: [
                        {
                            id: "bgp_peer_0_0_1_11", text: "BGPPEER-0-0-1-1"
                        },

                        {
                            id: "bgp_peer_0_0_1_21", text: "BGPPEER-0-0-1-2"
                        },

                        {
                            id: "bgp_peer_0_0_1_31", text: "BGPPEER-0-0-1-3"
                        },
                        {
                            id: "bgp_peer_0_0_1_41", text: "BGPPEER-0-0-1-4"
                        },
                        {
                            id: "bgp_peer_0_0_1_51", text: "BGPPEER-0-0-1-5"
                        },
                        {
                            id: "bgp_peer_0_0_1_61", text: "BGPPEER-0-0-1-6"
                        },
                        {
                            id: "bgp_peer_0_0_1_71", text: "BGPPEER-0-0-1-7"
                        }
                    ]
                },

                {
                    id: "bgp_peer_groups1", text: "BGP Groups", items: [
                        {
                            id: "bgp_peer_group_0_0_1_11", text: "BGPPEERGROUP-0-0-1-1"
                        },

                        {
                            id: "bgp_peer_group_0_0_1_21", text: "BGPPEERGROUP-0-0-1-2"
                        },

                        {
                            id: "bgp_peer_group_0_0_1_31", text: "BGPPEERGROUP-0-0-1-3"
                        },
                        {
                            id: "bgp_peer_group_0_0_1_41", text: "BGPPEERGROUP-0-0-1-4"
                        },
                        {
                            id: "bgp_peer_group_0_0_1_51", text: "BGPPEERGROUP-0-0-1-5"
                        },
                        {
                            id: "bgp_peer_group_0_0_1_61", text: "BGPPEERGROUP-0-0-1-6"
                        },
                        {
                            id: "bgp_peer_group_0_0_1_71", text: "BGPPEERGROUP-0-0-1-7"
                        }
                    ]
                },

                {
                    id: "bgp_advanced_config1", text: "Advanced Configuration", items: [
                        {
                            id: "graceful_restart1", text: "Graceful Restart"
                        },

                        {
                            id: "route_reflector1", text: "Route reflector"
                        },

                        {
                            id: "confederation1", text: "Confederation"
                        },
                        {
                            id: "rrd1", text: "RRD"
                        },
                        {
                            id: "dampening1", text: "Dampening"
                        },
                        {
                            id: "community1", text: "Community"
                        },
                        {
                            id: "four_bytes_as1", text: "Four Bytes AS"
                        }
                    ]
                }
            ]
        }
    ]
}

const BGP_CONTEXT_DATA = [
    {
        id: "vrfid",
        parameter: "VRF ID",
        value: "VRF-0-0-1-1",
        text: "VRF-0-0-1-1"
    },

    {
        id: "FourByteASNSupport",
        parameter: "Four Byte ASN Support",
        value: "1",
        text: "true"
    },

    {
        id: "FourByteASNotation",
        parameter: "Four Byte AS Notation",
        value: "1",
        text: "true"
    },

    {
        id: "LocalASNumber",
        parameter: "Local AS Number",
        value: "100",
        text: "100"
    },

    {
        id: "AdminStatus",
        parameter: "Admin Status",
        value: "true",
        text: "true"
    },

    {
        id: "BGPRouterID",
        parameter: "BGP Router ID",
        value: "1.1.1.1",
        text: "1.1.1.1"
    },

    {
        id: "Synchronization",
        parameter: "Synchronization",
        value: "disable",
        text: "disable"
    },

    {
        id: "DefaultLocalPreference",
        parameter: "Default Local Preference",
        value: "100",
        text: "100"
    },

    {
        id: "AdvertiseNonBGPRoute",
        parameter: "Advertise Non-BGP route",
        value: "externalAndInternal",
        text: "External and Internal"
    },

    {
        id: "SpeakerOverlapPolicy",
        parameter: "Speaker Overlap Policy",
        value: "both",
        text: "both"
    },

    {
        id: "DefaultRouteDistribution",
        parameter: "Default Route Distribution",
        value: "disable",
        text: "Disable"
    },

    {
        id: "IPv4UnicastCapability",
        parameter: "MP IPv4 Unicast Address Family Capability",
        value: "true",
        text: "true"
    },

    {
        id: "NHProcessingInterval",
        parameter: "Next Hop Processing Interval",
        value: "60",
        text: "60"
    },

    {
        id: "IBGPRedis",
        parameter: "IBGP Redistribution",
        value: "false",
        text: "false"
    },

    {
        id: "IBGPMaxPath",
        parameter: "IBGP Max Path",
        value: "1",
        text: "1"
    },

    {
        id: "EBGPMaxPath",
        parameter: "EBGP Max Path",
        value: "1",
        text: "1"
    },

    {
        id: "EIBGPMaxPath",
        parameter: "EIBGP Max Path",
        value: "1",
        text: "1"
    },

    {
        id: "BGPLabelAllocationPolicy",
        parameter: "BGP Label Allocation Policy",
        value: "pervrf",
        text: "pervrf"
    },

    {
        id: "MED Compare",
        parameter: "MED Compare",
        value: "false",
        text: "false"
    },

    {
        id: "VPNv4 address",
        parameter: "VPNv4 Address",
        value: "false",
        text: "false"
    }
];

const BGP_PEER_DATA = [
    {
        id: "PeerGroup",
        parameter: "Peer Group",
        value: "None",
        text: "None"
    },

    {
        id: "EBGPMultiHop",
        parameter: "EBGP Multi-Hop",
        value: "Disable",
        text: "Disable"
    },

    {
        id: "EBGPHopLimit",
        parameter: "EBGP Hop Limit",
        value: "2",
        text: "2"
    },

    {
        id: "NextHopSelf",
        parameter: "Next Hop Self",
        value: "Automatic",
        text: "Automatic"
    },

    {
        id: "RouteReflectorClient",
        parameter: "Route Reflector Client",
        value: "Client",
        text: "Client"
    },

    {
        id: "AddressFamily",
        parameter: "Address Family",
        value: "IPv4",
        text: "IPv4"
    },

    {
        id: "UpdateSource",
        parameter: "Update Source",
        value: "0.0.0.0",
        text: "0.0.0.0"
    },

    {
        id: "DefaultLocalPreference",
        parameter: "Default Local Preference",
        value: "100",
        text: "100"
    },

    {
        id: "AdvertiseNonBGPRoute",
        parameter: "Advertise Non-BGP route",
        value: "externalAndInternal",
        text: "External and Internal"
    },

    {
        id: "SpeakerOverlapPolicy",
        parameter: "Speaker Overlap Policy",
        value: "both",
        text: "both"
    },

    {
        id: "DefaultRouteDistribution",
        parameter: "Default Route Distribution",
        value: "disable",
        text: "Disable"
    },

    {
        id: "IPv4UnicastCapability",
        parameter: "MP IPv4 Unicast Address Family Capability",
        value: "true",
        text: "true"
    },

    {
        id: "NHProcessingInterval",
        parameter: "Next Hop Processing Interval",
        value: "60",
        text: "60"
    },

    {
        id: "IBGPRedis",
        parameter: "IBGP Redistribution",
        value: "false",
        text: "false"
    },

    {
        id: "IBGPMaxPath",
        parameter: "IBGP Max Path",
        value: "1",
        text: "1"
    },

    {
        id: "EBGPMaxPath",
        parameter: "EBGP Max Path",
        value: "1",
        text: "1"
    },

    {
        id: "EIBGPMaxPath",
        parameter: "EIBGP Max Path",
        value: "1",
        text: "1"
    },

    {
        id: "BGPLabelAllocationPolicy",
        parameter: "BGP Label Allocation Policy",
        value: "pervrf",
        text: "pervrf"
    },

    {
        id: "MEDCompare",
        parameter: "MED Compare",
        value: "false",
        text: "false"
    },

    {
        id: "VPNv4address",
        parameter: "VPNv4 Address",
        value: "false",
        text: "false"
    },

    {
        id: "VPNv4address1",
        parameter: "VPNv4 Address",
        value: "false",
        text: "false"
    }
];

const BGP_GLOBAL_PARAMETERS_DATA = [
    {
        id: "Route Leaking",
        parameter: "VPNv4 Address",
        value: "false",
        text: "false"
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
                cols: 4
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
        this.detailsCell.setWidth(800);
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
        this.detailsCell.collapse();
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
        // console.log(id);
    }

    treeViewOnBeforeSelectHandler(id) {
        this.attachDetailContent(id, this.treeDetailsCell);
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
                    cols: 4,
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

    attachDetailContent(id, parent) {
        switch (id) {
            case 'bgp_context_0_0_1_1':
                this.treeDetailsCell.showView(id);
                const grid = this.treeDetailsCell.attachGrid({
                    columns: [
                        {
                            label: "Parameter",
                            width: "*",
                            type: "ro",
                            id: "parameter"
                        },

                        {
                            label: "Value",
                            width: "*",
                            type: "ro",
                            id: "text"
                        }
                    ]
                });
                const gridDataStore = new dhtmlXDataStore();
                gridDataStore.parse(BGP_CONTEXT_DATA);
                grid.sync(gridDataStore);
                break;

            case 'bgp_global_parameters':
                this.treeDetailsCell.showView(id);
                const globalParametersGrid = this.treeDetailsCell.attachGrid({
                    columns: [
                        {
                            label: "Parameter",
                            width: "*",
                            type: "ro",
                            id: "parameter"
                        },

                        {
                            label: "Value",
                            width: "*",
                            type: "ro",
                            id: "text"
                        }
                    ]
                });
                const globalParametersGridDataStore = new dhtmlXDataStore();
                globalParametersGridDataStore.parse(BGP_GLOBAL_PARAMETERS_DATA);
                globalParametersGrid.sync(globalParametersGridDataStore);
                break;
            case 'bgp_peer_0_0_1_1':
            case 'bgp_peer_0_0_1_2':
            case 'bgp_peer_0_0_1_3':
            case 'bgp_peer_0_0_1_4':
            case 'bgp_peer_0_0_1_5':
            case 'bgp_peer_0_0_1_6':
            case 'bgp_peer_0_0_1_7':
                this.treeDetailsCell.showView(id);
                const peerGrid = this.treeDetailsCell.attachGrid({
                    columns: [
                        {
                            label: "Parameter",
                            width: "*",
                            type: "ro",
                            id: "parameter"
                        },

                        {
                            label: "Value",
                            width: "*",
                            type: "ro",
                            id: "text"
                        }
                    ]
                })
                const peerGridDataStore = new dhtmlXDataStore();
                peerGrid.sync(peerGridDataStore);
                peerGridDataStore.parse(BGP_PEER_DATA);
                break;

            default:
                this.treeDetailsCell.showView("def");
                this.treeDetailsCell.attachHTMLString(`
                <p> Click on another tree node to view its properties</p> 
                `);
        }
    }

    attachDetailGrid(id, parent) {

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