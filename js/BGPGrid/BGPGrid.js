const BGP_GRID_TREE_CELL_CONFIG = {
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
                    id: "bgp_peers", text: "BGP Peers",
                },

                {
                    id: "bgp_peer_groups", text: "BGP Groups",
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
                    id: "bgp_peers_1", text: "BGP Peers"
                },

                {
                    id: "bgp_peer_groups1", text: "BGP Groups"
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

const GRID_BGP_CONTEXT_DATA1 = [
    {
        "vrfid": "VRF-0-0-1-1",
        "FourByteASNSupport": "true",
        "FourByteASNotation": "true",
        "LocalASNumber": "100",
        "AdminStatus": "true",
        "BGPRouterID": "1.1.1.1",
        "Synchronization": "disable",
        "DefaultLocalPreference": "100",
        "AdvertiseNonBGPRoute"
            : "External and Internal",
        "SpeakerOverlapPolicy"
            : "both",
        "DefaultRouteDistribution"
            : "Disable",
        "IPv4UnicastCapability"
            : "true",
        "NHProcessingInterval"
            : "60",
        "IBGPRedis"
            : "false",
        "IBGPMaxPath"
            : "1",
        "EBGPMaxPath"
            : "1",
        "EIBGPMaxPath"
            : "1",
        "BGPLabelAllocationPolicy"
            : "pervrf",
        "MED Compare"
            : "false",
        "VPNv4 address"
            : "false"
    }
];

const GRID_BGP_CONTEXT_DATA2 = [
    {
        "vrfid": "VRF-0-0-1-1",
        "FourByteASNSupport": "true",
        "FourByteASNotation": "true",
        "LocalASNumber": "100",
        "AdminStatus": "true",
        "BGPRouterID": "1.1.1.1",
        "Synchronization": "disable",
        "DefaultLocalPreference": "100",
        "AdvertiseNonBGPRoute"
            : "External and Internal",
        "SpeakerOverlapPolicy"
            : "both",
        "DefaultRouteDistribution"
            : "Disable",
        "IPv4UnicastCapability"
            : "true",
        "NHProcessingInterval"
            : "60",
        "IBGPRedis"
            : "false",
        "IBGPMaxPath"
            : "1",
        "EBGPMaxPath"
            : "1",
        "EIBGPMaxPath"
            : "1",
        "BGPLabelAllocationPolicy"
            : "pervrf",
        "MED Compare"
            : "false",
        "VPNv4 address"
            : "false"
    }
];

class BGPGrid {
    constructor(parentCell) {
        this.layout = parentCell.attachLayout({
            pattern: "3J"
        });
        this.menu = this.layout.attachMenu({
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
        });
        this.layout.cells("a").collapse();
        this.layout.cells("c").collapse();
        this.layout.cells("b").setWidth(window.innerWidth * 0.8);

        this.detailsCell = this.layout.cells("b");
        this.detailsLayout = this.detailsCell.attachLayout({
            pattern: "2U"
        })
        this.detailsLayout.cells("a").attachTreeView(BGP_GRID_TREE_CELL_CONFIG);
        this.detailsLayout.cells("a").setWidth(250);
        this.detailsGrid = this.detailsLayout.cells("b").attachGrid({
            columns: [
                {
                    id: "vrfid",
                    label: "VRF ID",
                    width: 100
                },

                {
                    id: "FourByteASNSupport",
                    label: "Four Byte ASN Support",
                    width: 100
                },

                {
                    id: "FourByteASNotation",
                    label: "Four Byte AS Notation",
                    width: 100
                },

                {
                    id: "LocalASNumber",
                    label: "Local AS Number",
                    width: 100
                },

                {
                    id: "AdminStatus",
                    label: "Admin Status",
                    width: 100
                },

                {
                    id: "BGPRouterID",
                    label: "BGP Router ID",
                    width: 100
                },

                {
                    id: "Synchronization",
                    label: "Synchronization",
                    width: 100
                },

                {
                    id: "DefaultLocalPreference",
                    label: "Default Local Preference",
                    width: 100
                },

                {
                    id: "AdvertiseNonBGPRoute",
                    label: "Advertise Non-BGP route",
                    width: 100
                },

                {
                    id: "SpeakerOverlapPolicy",
                    label: "Speaker Overlap Policy",
                    width: 100
                },

                {
                    id: "DefaultRouteDistribution",
                    label: "Default Route Distribution",
                    width: 100
                },

                {
                    id: "IPv4UnicastCapability",
                    label: "MP IPv4 Unicast Address Family Capability",
                    width: 100
                },

                {
                    id: "NHProcessingInterval",
                    label: "Next Hop Processing Interval",
                    width: 100
                },

                {
                    id: "IBGPRedis",
                    label: "IBGP Redistribution",
                    width: 100
                },

                {
                    id: "IBGPMaxPath",
                    label: "IBGP Max Path",
                    width: 100
                },

                {
                    id: "EBGPMaxPath",
                    label: "EBGP Max Path",
                    width: 100
                },

                {
                    id: "EIBGPMaxPath",
                    label: "EIBGP Max Path",
                    width: 100
                },

                {
                    id: "BGPLabelAllocationPolicy",
                    label: "BGP Label Allocation Policy",
                    width: 100
                },

                {
                    id: "MED Compare",
                    label: "MED Compare",
                    width: 100
                },

                {
                    id: "VPNv4 address",
                    label: "VPNv4 Address",
                    width: 100
                }
            ]
        });
        this.datastore = new dhtmlXDataStore();
        this.detailsGrid.sync(this.datastore);
        this.datastore.parse(GRID_BGP_CONTEXT_DATA1);
        this.datastore.parse(GRID_BGP_CONTEXT_DATA2);

    }
}