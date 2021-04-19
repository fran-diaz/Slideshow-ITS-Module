<?php
init_ITEC();

$selected_slide = $_POST['slide'];
$new_content = $_POST['data'];

echo $_ITEC -> update( 'slideshow__slides', ['content' => $new_content ], ['slideshow__slides_id' => $selected_slide ] );
