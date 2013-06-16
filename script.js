// function resetBackgroundLines()
// {
//     $('#message .lines').remove();
//     for (var i=0;i<164;i++)
//     {
//         $('#message').append($('<div></div>').addClass('lines').animate({
//                 'height': '100%'}, Math.floor((Math.random()*1300)+600), 'swing')
//         );
//     }    
// }

// var leftOffset = 0
// var currentServiceML = 0;
// var hoverItems = 0;
 var checkServiceTimeout = null;
// var hoverServiceTimeout = null;

function resetServiceInterval()
{
    clearTimeout(checkServiceTimeout);
    checkServiceTimeout = setTimeout(function(){
        var deg = $('#services .name.selected').data('selectionBar');
        rotateSelectionBar(deg);
    }, 0);
}

// $(document).ready(function(){
//     leftOffset = $($('#services .name')[0]).position().left;
//     setTimeout(resetBackgroundLines, 300);

//     $('#services .name').click(
//     function(){
//         currentServiceML = $(this).offset().left - leftOffset;
//         $('#services .selected_bar').animate({'margin-left': currentServiceML+'px'});
//     });

//     $('#services .name').hover(
//     function(){
//         var left = $(this).offset().left - leftOffset;
//         $('#services .selected_bar').animate({'margin-left': left+'px'});
//         clearTimeout(checkServiceTimeout);
//     }, 
//     function(){
//         //$('#services .selected_bar').animate({'margin-left': currentServiceML+'px'});
//         resetServiceInterval();
//     });    
// })

function rotateSelectionBar(deg)
{
    console.log(deg);
    $('#services .selection_bar').css({
        '-webkit-transform': 'rotate('+deg+')',
    })
}

$(document).ready(function(){
    /*calculateDistanceInCenters($('#services .name')[1], $('#mainContent'));*/
    $('#services .name').each(function(){
        console.log('lallu');
        var deg = $(this).data('selectionbar');
        $(this).on('mouseenter',function(){
            if(!$(this).hasClass('selected')){
                $(this).addClass('hover');
                rotateSelectionBar(deg);
            }
        });
        $(this).on('mouseleave',function(){
            if(!$(this).hasClass('selected')){
                $(this).removeClass('hover');
                rotateSelectionBar($('#services .name.selected').data('selectionbar'));
            }
        });
        $(this).on('click', function(){
            if(!$(this).hasClass('selected')){
                var content = $(this).data('content');
                $('#mainContent .tagline.shown').fadeOut(function(){
                    $(this).removeClass('shown');
                    $('#mainContent .tagline.'+content).addClass('shown').css('display', 'table-cell');
                });
                
                $('#services .name').removeClass('selected').removeClass('hover');
                $(this).addClass('selected');
            }
        })
    })
});