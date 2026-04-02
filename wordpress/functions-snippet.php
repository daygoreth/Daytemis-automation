<?php
/**
 * DAYTEMIS - Futuristic Design Loader
 *
 * CÓMO INSTALAR:
 * ===============
 * OPCIÓN A (Recomendada): Code Snippets Plugin
 *   1. Instala el plugin "Code Snippets" desde WordPress
 *   2. Ve a Snippets > Add New
 *   3. Pega este código
 *   4. Activa el snippet
 *
 * OPCIÓN B: functions.php del child theme
 *   1. Ve a Apariencia > Editor de temas
 *   2. Selecciona functions.php del child theme de Woodmart
 *   3. Pega este código al final del archivo
 *
 * NOTA: Los archivos CSS y JS deben subirse a tu servidor.
 *       Súbelos via FTP o Media Library a la ruta indicada.
 */

// Cargar estilos y scripts futuristas
add_action('wp_enqueue_scripts', 'daytemis_futuristic_assets', 99);

function daytemis_futuristic_assets() {
    // CSS Futurista (prioridad alta para override de Woodmart)
    wp_enqueue_style(
        'daytemis-futuristic',
        get_stylesheet_directory_uri() . '/daytemis/css/daytemis-futuristic.css',
        array(),
        '1.0.0'
    );

    // Google Font - Inter (moderna y limpia)
    wp_enqueue_style(
        'daytemis-font-inter',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
        array(),
        null
    );

    // JS Futurista (al final del body)
    wp_enqueue_script(
        'daytemis-futuristic',
        get_stylesheet_directory_uri() . '/daytemis/js/daytemis-futuristic.js',
        array(),
        '1.0.0',
        true
    );
}

// Añadir clase al body
add_filter('body_class', 'daytemis_body_classes');

function daytemis_body_classes($classes) {
    $classes[] = 'daytemis-futuristic';
    return $classes;
}
