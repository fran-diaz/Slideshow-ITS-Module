<?php
init_ITEC();

$selected_set = $_POST['set'];
$selected_slide = (isset($_POST['slide'])) ? $_POST['slide'] : '0';

$slides = $_ITEC -> select( 'slideshow__slides', '*', ['slideshow__sets_id' => $selected_set] );
if($slides){
	echo '<ul class="list-group">';
	foreach( $slides as $slide ) {
		$selected_class = ( $slide['slideshow__slides_id'] === $selected_slide ) ? ' list-group-item-success' : '';
		$d = encode( [
			'table' => 'slideshow__slides', 
			'id' => $slide['slideshow__slides_id'], 
			'field' => 'slide', 
			'value' => $slide['slide'] 
		] );
		?>
		<li class="list-group-item d-flex justify-content-between align-items-center slideshow__slide  <?=$selected_class?> " data-id="<?=$slide['slideshow__slides_id']?>" data-d="<?=$d?>" data-context="slideshow__slide">
	        <?=$slide['slide']?>
	    </li>
		<?php
	}
	echo '</ul>';
} else {
	echo '<p>No hay diapositivas todavía.</p>';
}
?>
