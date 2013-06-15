function resetBackgroundLines()
{
    $('#message .lines').remove();
    for (var i=0;i<164;i++)
    {
        $('#message').append($('<div></div>').addClass('lines').animate({
                'height': '100%'}, Math.floor((Math.random()*1300)+600), 'swing')
        );
    }    
}

var leftOffset = 0
var currentServiceML = 0;
var hoverItems = 0;
var checkServiceTimeout = null;
var hoverServiceTimeout = null;

function resetServiceInterval()
{
    clearTimeout(checkServiceTimeout);
    checkServiceTimeout = setTimeout(function(){
        $('#services .selected_bar').animate({'margin-left': currentServiceML+'px'});        
    }, 300);
}

$(document).ready(function(){
    leftOffset = $($('#services .name')[0]).position().left;
    setTimeout(resetBackgroundLines, 300);

    $('#services .name').click(
    function(){
        currentServiceML = $(this).offset().left - leftOffset;
        $('#services .selected_bar').animate({'margin-left': currentServiceML+'px'});
    });

    $('#services .name').hover(
    function(){
        var left = $(this).offset().left - leftOffset;
        $('#services .selected_bar').animate({'margin-left': left+'px'});
        clearTimeout(checkServiceTimeout);
    }, 
    function(){
        //$('#services .selected_bar').animate({'margin-left': currentServiceML+'px'});
        resetServiceInterval();
    });    
})