( function() {		
	
	//Properties and events you can find here http://api.jqueryui.com/sortable/
	
	var project_limit = 5;
	
	//All project list 
	$( "ul.do-drop#projects-list" ).sortable({
		connectWith: "ul.do-drop",
		//After returning project from list of chosen we zeroize numbering
		receive: function(ui) {
			$(this).find('span.project-number').html('')
		},
	});
	
	//Chosen list
	$('ul.do-drop#chosen-projects-list').sortable({
		connectWith:'ul.do-drop',
		//We block dropping if limit of projects is over
		receive: function(ui) {
			if($(this).children().length >= project_limit) {
				$(this).addClass('dont-drop');
				$('.do-drop').sortable('option', 'connectWith',$('.do-drop:not(.dont-drop)'));
			}
		},
		//Unblock if project is returning
		beforeStop: function(ui) {
			if($(this).children().length < project_limit) {
				$(this).removeClass('dont-drop');
				$('.do-drop').sortable('option', 'connectWith',$('.do-drop:not(.dont-drop)'));
			}
		},
		//Set numbering of items
		update: function(event, ui) {  
			$(this).children().each(function (i) {
                var project_num = i + 1;
                $(this).find('span.project-number').html(project_num + '. ');
            });
		},
	}).text(
		'Drop here '+project_limit+' projects.'
	);
	
	$( "ul.do-drop#projects-list, ul.do-drop#chosen-projects-list" ).disableSelection();
} )();