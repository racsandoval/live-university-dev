var numItems;

$(function( $ ) {

    const obj2 = $('.obj2');

    $('.menu ul').hide();
    obj2.hide();
    
    $('.option').click(function(btn){
        btn.stopPropagation();
        if (obj2.is(':visible')){
            hideObj(obj2);
        } else {
            obj2.fadeIn(0);
            obj2.removeClass('hide2');
            obj2.addClass('show2');
        }

    });

    $('.btn-A').click(function(btn){
        btn.stopPropagation();
        makeList('A');
        hideObj(obj2);
    })

    $('.btn-B').click(function(btn){
        btn.stopPropagation();
        makeList('B');
        hideObj(obj2);
    })

    // Dropdown menu funcionalities
	$('.menu > li').click(function( li ){
        li.stopPropagation();
        if ($(this).find('ul').is(':visible')){
            $( this ).find('ul').hide();
        } else {
            $( this ).find('ul').show();
        }
	
    });
    
    // To obj2 don't fade when clicked on itself
	obj2.click(function( obj ){
		obj.stopPropagation();
    });
    
	$('body').click(function(){
        //$('.menu ul').hide();
        hideObj(obj2);
    });
    
    pagination();
    
    // Pagination buttons
    $('.btn-prev').click(function() {
        let pagin = $('#pagination-container')
        if (pagin.pagination('getCurrentPage') >= 1) {
            pagin.pagination('prevPage');
        }
    });

    $('.btn-next').click(function() {
        let pagin = $('#pagination-container')
        // jQuery adding 2 li's for each loop with .append(), so 6 = 3 * 2
        if (pagin.pagination('getCurrentPage') < Math.ceil(numItems/6)) {
            pagin.pagination('nextPage');
        }
        
    });

});

function makeList (letter) {
    $('.obj3 ul li').remove();
    let quantity = $('.obj1 input').val();
    if (quantity === ''){
        $('.obj1 input').addClass('warning');
    } else {
        $('.obj1 input').removeClass('warning')
    }
    for (let i = 0; i < quantity; i++) {
        $('.obj3 ul').append(`<li><span> ${i+1}</span>Item ${letter}${i+1}</li>`)
    }
    pagination();
    $('.menu ul').hide();
}

function pagination () {
    let items = $('.obj3 ul li');
    numItems = items.length;
    let perPage = 3;

    items.slice(perPage).hide();

    $('#pagination-container').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });
}

function hideObj (obj) {
    obj.addClass('hide2');
    obj.removeClass('show2');
    obj.delay(300).fadeOut(0);
}