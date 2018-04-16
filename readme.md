# Drupal 7 - JS and AJAX in a custom module

This example shows how to use Template, JavaScript and jQuery AJAX in a custom module.\
**Note:** Do not use this module in production, only for test purpose.

## Installation

1. Inside `/sites/all/modules/custom` clone this repo using command\
`
git clone https://github.com/srdjanarsic/drupal-7-js-and-ajax.git demo_ajax
`

2. Enable module

3. Go to `Structure>Blocks` and add block to region

4. Use buttons to test `get` and `post` methods.


## demo_ajax.js

This file contains logic for sending and fetching data through defined routes by using jQuery ajax feature. Also it replace div (`class="userData"`) holder  content with received data.

## demo_ajax.css

CSS classes used for styling.

## block--demo_ajax.tpl.php

Template for our block.

## demo_ajax.module

In this example demo_ajax.module file contains all module php code.\
Each function is explained below.

`demo_ajax_block_info()` is a `hook_block_info` hook.\
It's used for declaring `demo_ajax_one` block.

```php
function demo_ajax_block_info()
{
    // define block demo_ajax_one
    $blocks['demo_ajax_one'] = array(
        'info' => t('Demo AJAX one'),
        'cache' => DRUPAL_CACHE_PER_ROLE,
    );
}
```

`demo_ajax_block_view()` is a hook_block_view hook.\
It's used for assign content and dependencies (js/css).
```php
function demo_ajax_block_view($delta = '') {
    $block = [];
    switch ($delta) {
        case 'demo_ajax_one':
            $block['subject'] = t('Demo AJAX');
            if (user_access('any')) {
                $block['content'] = array(
                    '#markup' => 'STATIC MESSAGE FROM PHP :-)',
                     // ADDS JAVASCRIPT FILE ON PAGE  CONTAINS THIS BLOCK
                    '#attached' => array(
                      'js' => array(
                        drupal_get_path('module', 'demo_ajax') . '/js/demo_ajax.js',
                      ),
                      'css' => array(
                        drupal_get_path('module', 'demo_ajax') . '/css/demo_ajax.css',
                      )
                    )
                );
            }
        break;
    }
    return $block;
}
```

`demo_ajax_theme(...)` is a `hook_theme` hook.\
It's used to assign template for our block.  

```php
function demo_ajax_theme($existing, $type, $theme, $path) {
    $theme = array();
    //register template
    $theme['block__demo_ajax'] = array(
        'template' => 'block--demo_ajax', // TEMPLATE WITHOUT EXTENSION
        'path' => drupal_get_path('module', 'demo_ajax') . '/templates', // TEMPLATES DIRECTORY
        );
    return $theme;
}
```

`demo_ajax_menu()` is a `hook_menu` hook.\
It's used for defining api routes.

```php
function demo_ajax_menu() {
    //register ajax GET route and callback
    $items['demo_ajax_get'] = array(
        'access callback' => true,
        'page callback' => '_demo_ajax_get',
        'delivery callback' => 'drupal_json_output' 
    );
    // register ajax POST route and callback
    $items['demo_ajax_post'] = array(
        'access callback' => true,
        'page callback' => '_demo_ajax_post',
        'delivery callback' => 'drupal_json_output' 
    );
    return $items;
}
```

Endpoint for `/demo_ajax_get` route (defined in `demo_ajax_menu()`)
```php
function _demo_ajax_get() {
    // request id
    $id = (int) $_GET["id"];
    
    // mock data
    $userData = array(
        "1" => array( "id" => "1", "name" => "Alice"),
        "2" => array( "id" => "2", "name" => "Mike"),
    );

    // output data (object)
    return $userData[$id];
}
```

Endpoint for `/demo_ajax_post` route (defined in `demo_ajax_menu()`)

```php
function _demo_ajax_post() {
    // output received data (ECHO)
    return $_POST;
}
```
