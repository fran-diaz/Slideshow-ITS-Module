var selected_class = 'list-group-item-success';

function reload_sets_list( selected_set ){
    var component = $('aside .component-config').data('component');

    $('.slideshow__sets-box').fadeOut(fast_animation,function(){
        $(this).html(spinner_html).fadeIn(fast_animation);
    });

    $.ajax({
        type: 'POST',
        url: '/ajax',
        data: 'DEBUG=0&action=slideshow/list-sets&set='+selected_set+'&component='+component,
        success: function( data ) {
            setTimeout( function () {
                $('.slideshow__sets-box').fadeOut(fast_animation,function(){
                    $(this).html(data).fadeIn(fast_animation);
                });
            }, default_animation);
        }
    });
}

function reload_slides_list( selected_set, selected_slide = null ){

    var slide_param = ( selected_slide !== null ) ? '&slide='+selected_slide : '';

    $('.slideshow__slides-box').fadeOut(fast_animation,function(){
        $(this).html(spinner_html).fadeIn(fast_animation);
    });

    $.ajax({
        type: 'POST',
        url: '/ajax',
        data: 'DEBUG=0&action=slideshow/list-slides&set='+selected_set+slide_param,
        success: function( data ) {
            setTimeout( function () {
                $('.slideshow__slides-box').fadeOut(fast_animation,function(){
                    $(this).html(data).fadeIn(fast_animation);
                });
            }, default_animation);
        }
    });
}

$(document).on('click','.slideshow__set',function(e){
	var set = $(this).data('id');

    $('.slideshow__sets-box').find('.list-group-item-success').removeClass('list-group-item-success');
	$(this).addClass('list-group-item-success');

	reload_slides_list( set );
});

$(document).on('click','.slideshow__new-set',function(e){
	var new_set_name = prompt('¿Cual es el nombre del nuevo conjunto de diapositivas?');
	if( new_set_name.length === 0 ){ return; }

	$.ajax({
        type: 'POST',
        url: '/ajax',
        data: 'DEBUG=0&action=slideshow/new-set&name='+new_set_name,
        success: function( data ) {
            create_toast('slideshow__created-set');

            reload_sets_list( data );
            reload_slides_list( data );
        }
    });
});

$(document).on('click','.slideshow__new-slide',function(e){
    var set = $('.slideshow__sets-box').find('.'+selected_class).data('id');
    if( set === undefined ){
        alert('Debes seleccionar primero un conjunto de diapositivas.');
        return;
    }

    var new_slide_name = prompt('¿Cual es el nombre de la nueva diapositiva?');
    if( new_slide_name.length === 0 ){ return; }

    $.ajax({
        type: 'POST',
        url: '/ajax',
        data: 'DEBUG=0&action=slideshow/new-slide&name='+new_slide_name+'&set='+set,
        success: function( data ) {
            create_toast('slideshow__created-slide');
            reload_sets_list( set );
            reload_slides_list( set );
        }
    });
});

$(document).on('click','.slideshow__slide',function(e){
    $('.slideshow__slides-box').find('.'+selected_class).removeClass(selected_class);
    $(this).addClass(selected_class);

    var slide = $(this).data('id');

    $.ajax({
        type: 'POST',
        url: '/ajax',
        data: 'DEBUG=0&action=slideshow/get-slide&slide='+slide,
        success: function( data ) {
            /*$.loadScript('//cdn.ckeditor.com/4.12.1/standard-all/ckeditor.js', function(){
                if( CKEDITOR.instances.CKEditor === undefined ){
                    CKEDITOR.replace( 'CKEditor' );
                }

                CKEDITOR.instances.CKEditor.setData(data);
                
            });*/
            create_CKEDITOR( 'CKEditor', data );
            $('.slideshow__save-slide').prop('disabled',false);
        }
    });
});

$(document).on('click','.slideshow__save-slide',function(e){
    var editor_data = CKEDITOR.instances.CKEditor.getData();
    var slide = $('.slideshow__slides-box').find('.'+selected_class).data('id');

    $.ajax({
        type: 'POST',
        url: '/ajax',
        data: 'DEBUG=0&action=slideshow/save-slide&slide='+slide+'&data='+editor_data,
        success: function( data ) {
            create_toast('slideshow__slide-saved');
        }
    });
});

$(document).on('click','.slideshow__select-set',function(e){
    var selected_set = $('.slideshow__sets-box').find('.'+selected_class).attr('data-id');
    var set = $('[data-context-id="'+$(this).closest('#context_menu').attr('data-id')+'"]');
    var new_value = set.attr('data-id');
    var trigger = $('aside  [data-modal-id="'+$('.modal').attr('id')+'"]');
    var component = $('aside .component-config').data('component');

    save_value( null, new_value, trigger, function(){
        reload_component( component );
        reload_sets_list( selected_set );
    } ); 
});

$(document).on('click','.slideshow__edit-set',function(e){
    var type = 'varchar';
    var that = $('[data-context-id="'+$(this).closest('#context_menu').attr('data-id')+'"]');
    var d = that.attr('data-d');

    $.ajax({
        type: 'POST',
        url: '/ajax',
        data: 'DEBUG=0&action=create-popup&type='+type+'&d='+d,
        success: function(data){
            close_context();
            
            var title = $(data).find('#title').html();
            var content = $(data).find('#content').html();
            create_popover( that, title, content );

        }
    });
});

$(document).on('click','.slideshow__edit-slide',function(e){
    var type = 'varchar';
    var that = $('[data-context-id="'+$(this).closest('#context_menu').attr('data-id')+'"]');
    var d = that.attr('data-d');

    $.ajax({
        type: 'POST',
        url: '/ajax',
        data: 'DEBUG=0&action=create-popup&type='+type+'&d='+d,
        success: function(data){
            close_context();
            
            var title = $(data).find('#title').html();
            var content = $(data).find('#content').html();
            create_popover( that, title, content );

        }
    });
});