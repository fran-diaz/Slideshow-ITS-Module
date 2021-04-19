<?php
init_ITEC();

if ( isset( $_REQUEST['set'] ) ) { 
	$selected_set = $_REQUEST['set'];
} else {
	$selected_set = '0';
}

if( !isset( $config ) && isset( $_POST['component'] ) ){
	$config = $_ITE -> components -> get_config( $_POST['component'], 'contenido/conjunto' );
}

$sets = $_ITEC -> select( 'slideshow__sets', '*' );
if($sets){
	echo '<ul class="list-group">';
	foreach( $sets as $set ) {
		$count = $_ITEC -> count( 'slideshow__slides', ['slideshow__sets_id' => $set['slideshow__sets_id']] );
		$recount = ( $count ) ? $count : '0';
		$selected_class = ( $set['slideshow__sets_id'] === $selected_set ) ? ' list-group-item-success' : '';
		$d = encode( [
			'table' => 'slideshow__sets', 
			'id' => $set['slideshow__sets_id'], 
			'field' => 'set', 
			'value' => $set['set'] 
		] );
		?>
		<li class="list-group-item d-flex justify-content-between align-items-center slideshow__set <?=$selected_class?> " data-d="<?=$d?>" data-id="<?=$set['slideshow__sets_id']?>" data-context="slideshow__set">
	        <?=$set['set']?>
	        
	        <?php 
	        if( ( isset( $config['value'] ) && $set['slideshow__sets_id'] === $config['value'] ) ) {
	        ?>
	        <span class="mdi mdi-bookmark-check ml-auto mr-1" data-toggle="tooltip" data-placement="right" title="Tooltip on right"></span><span class="badge badge-primary badge-pill"><?=$recount?></span>
	        <?php
	    	} else {
	        ?>
			<span class="badge badge-primary badge-pill"><?=$recount?></span>
	        <?php
	    	}
	        ?>
	    </li>
		<?php
	}
	echo '</ul>';
} else {
	echo '<p>No hay conjuntos todavía.</p>';
}
?>
