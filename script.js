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
        '-moz-transform': 'rotate('+deg+')',
    })
}

var iconTimeouts = [];
function displayIconSet(arr)
{
    var interval = 0;
    $(arr).each(function(){
        var obj = this;
        var tmout = setTimeout(function(){
            $(obj).addClass('animated bounceIn').css('display', 'inline-block');
        },interval);
        interval += 100;
        iconTimeouts.push(tmout);
    });
}
function resetIcons()
{
    for (var i=0 ; i<iconTimeouts.length; i++)
    {
        clearTimeout(iconTimeouts[i]);
    }
    iconTimeouts = [];
}

$(document).ready(function(){    
    $('#services .name').each(function(){        
        var deg = $(this).data('selectionbar');
        $(this).on('mouseenter',function(){            
            if($(this).hasClass('selected'))
            {
                return;
            }
            rotateSelectionBar(deg);
            $('#services .name').removeClass('selected');
            $(this).addClass('selected');
            var content = $(this).data('content');
            $('#mainContent .tagline').hide();
            $('#mainContent .tagline.'+content).fadeIn(300).css('display', 'table-cell');
            resetIcons();
            $('#icons .icon_row div').hide().removeClass('animated bounceIn');
            var icons = $(this).data('icons');
            displayIconSet($('#icons .'+icons+' div'));
        });        
    });

    $('.nav-item.selected').prev().show();
    $('.nav-item').on('mouseenter', function(){
        if (!$(this).hasClass('selected')) {
            $(this).prev().fadeIn(100);
            $(this).addClass('hover');
        }
    }); 
    $('.nav-item').on('mouseleave', function(){
        if (!$(this).hasClass('selected')) {
            $(this).prev().fadeOut(100);
            $(this).removeClass('hover');
        }
    });
    $('.nav-item').click(function(){
        $('.nav-item').each(function(){
            $(this).prev().hide();
            $(this).removeClass('selected').removeClass('hover');
        });
        $(this).prev().show();
        $(this).addClass('selected');
    });
    $('#about_show').click(function(){
        $('#services').fadeOut(300,function(){
            $('#about').fadeIn(300);    
        });
        
    });
    $('#services_show').click(function(){
        $('#about').fadeOut(300, function(){
            $('#services').fadeIn(300);
        });
        
    });

    $('.box').hover(
        function(){
            $(this).children('.pattern').animate({'height': '280px'});            
        }, 
        function(){
            $(this).children('.pattern').animate({'height': '50px'});
        });    
    //$('#about_show').trigger('click');
    setTimeout(function(){
        /*$('#contact').addClass('animated fadeInDown').show();*/
    }, 2000);
    setTimeout(function(){
        var icons = $('#services .name.selected').data('icons');
        displayIconSet($('#icons .'+icons+' div'));
    }, 200);
    $('#get_in_touch').click(function(){
        $('#contact').removeClass('animated fadeInDown fadeOutUp');
        $('#contact').addClass('animated fadeInDown').show();
    })
    $('#contact .submit div, #contact .close_btn').click(function(){        
        $('#contact').addClass('animated fadeOutUp');
        setTimeout(function(){$('#contact').hide()},1000);
    });
});