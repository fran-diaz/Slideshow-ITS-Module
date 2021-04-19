<?php
init_ITEC();

$new_set_name = $_POST['name'];

echo $_ITEC -> insert( 'slideshow__sets', ['set' => $new_set_name ] );
