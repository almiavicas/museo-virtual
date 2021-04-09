export let config = {
    "escenas":[
        {
            "id":"pasillo-1",
            "titulo":"Pasillo 1",
            "img-360":"/assets/titles/hacienda/pasillo-1/pasillo-1-4x-qudratic.jpg",
            "cantidad_hotspots":2,
            "hotspots":[
                {
                    "tipo":"scene",
                    "valor_angulo_y": 1,
                    "valor_angulo_x": 200,
                    "titulo": "Pasillo 2",
                    "id_escena": "pasillo-2",
                    "id_hotspot": "hotspot-escena-pasillo-1-pasillo-2"
                },
                {
                    "tipo":"scene",
                    "valor_angulo_y": 1,
                    "valor_angulo_x": 360,
                    "titulo": "Pasillo 3",
                    "id_escena": "pasillo-3",
                    "id_hotspot": "hotspot-escena-pasillo-1-pasillo-3"
                },
                {
                    "tipo":"scene",
                    "valor_angulo_y": -8,
                    "valor_angulo_x": 304,
                    "titulo":"Sala de Secado 2",
                    "id_escena": "sala-2",
                    "id_hotspot": "hotspot-escena-pasillo-1-sala-2",
                    "icono":"/assets/images/galeria-arte.svg",
                    "attr_alt":"Galeria",
                    "clase_css":"custom-hotspot-icon custom-img"
                },
                {
                    "valor_angulo_y": 0,
                    "valor_angulo_x": 155,
                    "titulo":"Mapa",
                    "id_hotspot": "hotspot-mapa",
                    "icono":"/assets/images/mapa-pasillo-1.jpg",
                    "ancho_icono": 120,
                    "altura_icono": 160,
                    "attr_alt":"Galeria",
                    "clase_css":"custom-hotspot-icon custom-img",
                    "titulo_modal":"Mapa Cuchi",
                    "descripcion_modal":"Mapa completo de la Hacienda.",
                    "imagen_modal":"/assets/images/mapa-pasillo-1.jpg",
                    "ancho_imagen": 600,
                    "altura_imagen": 600
                }
            ]
        }
    ]
};