<?php
init_ITEC();

$new_slide_name = $_POST['name'];
$set = $_POST['set'];

echo $_ITEC -> insert( 'slideshow__slides', ['slide' => $new_slide_name, 'slideshow__sets_id' => $set ] );
