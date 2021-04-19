<?php
/**
 * Componente text
 */

class slideshow extends base_component implements components_interface {

	public function make_slideshow() : string {
		$html = '';

		ob_start();
		?>
	    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
	        <div class="carousel-inner">
	            <?php
	            if( $conjunto = $this->cfg( 'contenido', 'conjunto' ) ){
	            	$slides = $this -> _ITEC -> select( 'slideshow__slides', '*', ['slideshow__sets_id' => $conjunto ] );
	            	if( $slides ){
	            		foreach( $slides as $num => $slide ){ ?>
						<div class="carousel-item <?=(($num === 0)?'active':'')?>">
			            	<?=$slide['content']?>
			            </div>
	            		<?php }
	            	}
	            }
	            ?>
	        </div>
			<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
			    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span class="sr-only">Anterior</span>
			</a>
			<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
			    <span class="carousel-control-next-icon" aria-hidden="true"></span>
			    <span class="sr-only">Posterior</span>
			</a>
	    </div>
		<?php
		return $html;
	}

	public function gen_content( ) : string {		
		return $this -> make_slideshow();
	}
}