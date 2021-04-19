<?php
init_ITEC();

$selected_slide = $_POST['slide'];

$info = $_ITEC -> get( 'slideshow__slides', 'content', ['slideshow__slides_id' => $selected_slide ] );
echo $info;
