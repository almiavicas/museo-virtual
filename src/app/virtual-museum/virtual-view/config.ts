export let config = {
    "scenes":[
        {
            "id":"pasillo-1",
            "title":"Pasillo 1",
            "panorama":"/assets/titles/hacienda/pasillo-1/pasillo-1-4x-qudratic.jpg",
            "hotSpots":[
                {
                    "type":"scene",
                    "pitch": 1,
                    "yaw": 200,
                    "text": "Pasillo 2",
                    "sceneId": "pasillo-2",
                    "id": "hotspot-escena-pasillo-1-pasillo-2"
                },
                {
                    "pitch": 0,
                    "yaw": 155,
                    "text":"Mapa",
                    "id": "hotspot-mapa",
                    "createTooltipArgs": {
                        "id": "hotspot-mapa",
                        "title": "Mapa",
                        "customIcon": {
                            "alt":"Galeria",
                            "src":"/assets/images/mapa-pasillo-1.jpg",
                            "width": 120,
                            "height": 160
                        },
                        "modal": {
                            "title":"Mapa Cuchi",
                            "description":"Mapa completo de la Hacienda.",
                            "imagen": {
                                "alt": "Galeria",
                                "src":"/assets/images/mapa-pasillo-1.jpg",
                                "width": 600,
                                "height": 600
                            }
                        }
                    },
                    "show_modal":"local",
                    "cssClass":"custom-hotspot-icon custom-img"
                }
            ]
        },
        {
            "id":"pasillo-2",
            "title":"Pasillo 2",
            "panorama":"/assets/titles/hacienda/pasillo-2.jpg",
            "hotSpots":[
                {
                    "type":"scene",
                    "pitch": 1,
                    "yaw": 205,
                    "text": "Pasillo 3",
                    "sceneId": "pasillo-3",
                    "id": "hotspot-escena-pasillo-2-pasillo-3"
                },
                {
                    "type":"scene",
                    "pitch": 1,
                    "yaw": 40,
                    "text": "Pasillo 1",
                    "sceneId": "pasillo-1",
                    "id": "hotspot-escena-pasillo-2-pasillo-1" 
                }
            ]
        },
        {
            "id":"pasillo-3",
            "title":"Pasillo 3",
            "panorama":"/assets/titles/hacienda/pasillo-3.jpg",
            "hotSpots":[
                {
                    "type":"scene",
                    "pitch": 1,
                    "yaw": 90,
                    "text": "Pasillo 4",
                    "sceneId": "pasillo-4",
                    "id": "hotspot-escena-pasillo-3-pasillo-4"
                },
                {
                    "type":"scene",
                    "pitch": 1,
                    "yaw": -90,
                    "text": "Pasillo 2",
                    "sceneId": "pasillo-2",
                    "id": "hotspot-escena-pasillo-3-pasillo-2" 
                },
                {
                    "type":"scene",
                    "pitch": 0,
                    "yaw": 0,
                    "text": "Sala de Secado 2",
                    "sceneId": "sala-2",
                    "id": "hotspot-escena-pasillo-3-sala-2",
                    "createTooltipArgs": {
                        "id": "hotspot-escena-pasillo-3-sala-2",
                        "title": "Sala de Secado 2",
                        "customIcon": {
                            "alt":"Galeria - Sala de Secado 2",
                            "src":"/assets/images/galeria-arte.svg",
                            "width" : 50,
                            "height": 50
                        }
                    }
                }
            ]
        },
        {
            "id":"sala-2",
            "title":"Sala de Secado 2",
            "panorama":"/assets/titles/hacienda/sala-2/sala-2_digital_art_x4.jpg",
            "hotSpots":[
                {
                    "type":"scene",
                    "pitch": -8,
                    "yaw": 200,
                    "text": "Pasillo 3",
                    "sceneId": "pasillo-3",
                    "id": "hotspot-escena-sala-2-pasillo-3"
                },
                {
                    "pitch": -4,
                    "yaw": 360,
                    "text":"Caraotas - Jorge Pedro Nuñez",
                    "id": "hotspot-obra-1-sala-2-img",
                    "createTooltipArgs": {
                        "id": "hotspot-obra-1-sala-2-img",
                        "title": "Caraotas - Jorge Pedro Nuñez",
                        "customIcon": {
                            "src":"/assets/titles/hacienda/sala-2/obras/obra-1.jpg",
                            "width": 400,
                            "height": 200,
                            "alt":"Caraotas - Jorge Pedro Nuñez"
                        },
                        "modal": {
                            "title":"Caraotas- Jorge Pedro Nuñez",
                            "description":"Mapa completo de la Hacienda.",
                            "imagen": {
                                "description":"La prática artística de Jorge Pedro Nuñez está ligada a su experiencia como historiador del arte, debido a lo que sus obras aluden a múltiples referencias, tanto artísticas como contextuales",
                                "src":"/assets/titles/hacienda/sala-2/obras/obra-1.jpg",
                                "width": 600,
                                "height": 400
                            }
                        }
                    },
                    "show_modal":"local",
                    "cssClass":"custom-hotspot-icon custom-img"
                },
                {
                    "pitch": -4,
                    "yaw": 110,
                    "text":"NOMBRE OBRA 2",
                    "id": "hotspot-obra-2-sala-2-img",
                    "createTooltipArgs": {
                        "id": "hotspot-obra-2-sala-2-img",
                        "title": "NOMBRE OBRA 2",
                        "customIcon": {
                            "src":"/assets/titles/hacienda/sala-2/obras/obra-2.jpg",
                            "width": 400,
                            "height": 200,
                            "alt":"NOMBRE OBRA 2"
                        }
                    },
                    "cssClass":"custom-hotspot-icon custom-img"
                },
                {
                    "pitch": -4,
                    "yaw": 230,
                    "text":"NOMBRE OBRA 3",
                    "id": "hotspot-obra-3-sala-2-img",
                    "createTooltipArgs": {
                        "id": "hotspot-obra-3-sala-2-img",
                        "title": "NOMBRE OBRA 3",
                        "customIcon": {
                            "src":"/assets/titles/hacienda/sala-2/obras/obra-3.jpg",
                            "width": 100,
                            "height": 100,
                            "alt":"NOMBRE OBRA 3"
                        }
                    },
                    "cssClass":"custom-hotspot-icon custom-img"
                }
            ]
        },
        {
            "id": "pasillo-4",
            "title": "Pasillo 4",
            "panorama": "/assets/titles/hacienda/pasillo-4.jpg",
            "hotSpots":[
                {
                    "type":"scene",
                    "pitch": 1,
                    "yaw": 90,
                    "text": "Pasillo 5",
                    "sceneId": "pasillo-5",
                    "id": "hotspot-escena-pasillo-4-pasillo-5"
                },
                {
                    "type":"scene",
                    "pitch": 1,
                    "yaw": -90,
                    "text": "Pasillo 3",
                    "sceneId": "pasillo-3",
                    "id": "hotspot-escena-pasillo-4-pasillo-3"
                },
                {
                    "type":"scene",
                    "pitch": 0,
                    "yaw": 0,
                    "text": "Sala de Secado 3",
                    "sceneId": "sala-3",
                    "id": "hotspot-escena-pasillo-4-sala-3" 
                }
            ]
        },
        {
            "id":"pasillo-5",
            "title":"Pasillo 5",
            "panorama":"/assets/titles/hacienda/pasillo-5.jpg",
            "hotSpots":[
                {
                    "type":"scene",
                    "pitch": 1,
                    "yaw": 90,
                    "text": "Pasillo 6",
                    "sceneId": "pasillo-6",
                    "id": "hotspot-escena-pasillo-5-pasillo-6"
                },
                {
                    "type":"scene",
                    "pitch": 1,
                    "yaw": -90,
                    "text": "Pasillo 4",
                    "sceneId": "pasillo-4",
                    "id": "hotspot-escena-pasillo-5-pasillo-4" 
                },
                {
                    "type":"scene",
                    "pitch": 0,
                    "yaw": 0,
                    "text": "Tienda de Chocolate",
                    "sceneId": "tienda-chocolate",
                    "id": "hotspot-escena-pasillo-5-tienda-chocolate" 
                }
            ]
        },
        {
            "id": "tienda-chocolate",
            "title": "Tienda de Chocolate",
            "panorama": "assets/titles/hacienda/cacao/cacao_photos_v2_faces_x4_toned.jpg",
            "hotSpots":[
                {
                    "id": "hotspot-escena-tienda-chocolate-pasillo-5",
                    "type":"scene",
                    "pitch": -3,
                    "yaw": -15,
                    "text": "Pasillo 5",
                    "sceneId": "pasillo-5",
                    "createTooltipArgs": {
                        "id": "hotspot-escena-tienda-chocolate-pasillo-5",
                        "title": "Pasillo 5",
                        "customIcon": {
                            "src":"/assets/images/chocolate.svg",
                            "alt":"Tienda de Chocolate",
                            "width" : 50,
                            "height": 50
                        }
                    }
                }
            ]
        },
        {
            "id":"pasillo-6",
            "title":"Pasillo 6",
            "panorama": "/assets/titles/hacienda/pasillo-6.jpg",
            "hotSpots":[
                {
                    "type":"scene",
                    "pitch": 1,
                    "yaw": 90,
                    "text": "Pasillo 7",
                    "sceneId": "pasillo-7",
                    "id": "hotspot-escena-pasillo-6-pasillo-7"
                },
                {
                    "type":"scene",
                    "pitch": 1,
                    "yaw": -90,
                    "text": "Pasillo 5",
                    "sceneId": "pasillo-5",
                    "id": "hotspot-escena-pasillo-6-pasillo-5"
                },
                {
                    "type":"scene",
                    "pitch": 0,
                    "yaw": 110,
                    "text": "Sala de Curso de Fotografia",
                    "sceneId": "sala-fotografia",
                    "id": "hotspot-escena-pasillo-6-sala-fotografia"
                }
            ]
        },
        {
            "id": "sala-fotografia",
            "title": "Sala de Curso Fotografia",
            "panorama": "/assets/titles/hacienda/fotoclase.jpg",
            "hotSpots":[
                {
                    "type":"scene",
                    "pitch": -3,
                    "yaw": 290,
                    "text": "Pasillo 6",
                    "sceneId": "pasillo-6",
                    "id": "hotspot-escena-sala-fotografia-pasillo-6"
                }
            ]
        },
        {
            "id": "pasillo-7",
            "title": "Pasillo 7",
            "panorama": "/assets/titles/hacienda/pasillo-final.jpg",
            "hotSpots":[
                {
                    "type":"scene",
                    "pitch": 1,
                    "yaw": -90,
                    "text": "Pasillo 6",
                    "sceneId": "pasillo-6",
                    "id": "hotspot-escena-pasillo-7-pasillo-6"
                },
                {
                    "type":"scene",
                    "pitch": 0,
                    "yaw": 210,
                    "text": "Sala de Curso de Fotografia",
                    "sceneId": "sala-fotografia",
                    "id": "hotspot-escena-pasillo-7-pasillo-6"
                }
            ]
        }
    ]
};