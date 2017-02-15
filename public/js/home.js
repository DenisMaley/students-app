( function() {		
	
	//Properties and events you can find here http://api.jqueryui.com/sortable/
	
	var project_limit = 5;
	var list_placeholder = '<span id="list-placeholder">Drag and drop here '+project_limit+' projects and rank them: 1 - the highest priority, '+project_limit+' - the lowest priority</span>';
	
	var user = {};
	//Get info about 
	$.getJSON("api/user_data", function(data) {
		user = data.user;
	});
	
	//All project list 
	$( "ul.do-drop#projects_list" ).sortable({
		connectWith: "ul.do-drop",
		//After returning project from list of chosen we zeroize numbering
		receive: function(ui) {
			$(this).find('span.project-number').html('')
		},
	});
	
	//Chosen list
	$('ul.do-drop#chosen_projects_list').sortable({
		connectWith:'ul.do-drop',
		//We block dropping if limit of projects is over
		receive: function(ui) {
			if($(this).children().length >= project_limit) {
				$(this).addClass('dont-drop');
				$('.do-drop').sortable('option', 'connectWith',$('.do-drop:not(.dont-drop)'));
			}
			
			if($(this).children('li').length == 1){
				$(this).find('span#list-placeholder').remove();
			}
		},
		//Unblock if project is returning
		beforeStop: function(ui) {
			if($(this).children().length < project_limit) {
				$(this).removeClass('dont-drop');
				$('.do-drop').sortable('option', 'connectWith',$('.do-drop:not(.dont-drop)'));
				
				if($(this).children().length == 0){
					$(this).html(list_placeholder);
				}
				
			}
		},
		//Set numbering of items
		update: function(event, ui) {  
			$(this).children().each(function (i) {
                var project_num = i + 1;
                $(this).find('span.project-number').html(project_num + '. ');
            });
		},
	}).html(list_placeholder);
	
	$('ul.do-drop#projects_list, ul.do-drop#chosen_projects_list').disableSelection();
	
	$('label.btn').on('click', function(){
		var group_selector = $(this).closest('form.form-horizontal').find('div.bootstrap-select button.dropdown-toggle');
		if($(this).has('input#in_a_group').length){
			group_selector.removeClass('invisible');
		}else{
			group_selector.addClass('invisible');
		}
		
	});
	
	$('button#send_request').on('click', function(){
		
		var data = {
			request: {
				student_id: user.student_id
			},	
			group: []
		};
		var project_arr = $('ul#chosen_projects_list li').map(function(i, el){
			return $(this).attr('id').replace('project-', '');
		}).get();
		
		if(project_arr.length < project_limit){
			setErrorMessage('You have to choose '+project_limit+' projects and rank them from 1 to '+project_limit+'.');
			return;
		}
		
		data.request.request_conf = project_arr.join(';')
		var way = $('div.btn-group.option-way input:radio:checked').val();
		if(way == 'group'){
			data.group = $('form.form-horizontal').find('select').val();
			if(!data.group){
				setErrorMessage('You have to choose at least one project participant if you want to work in a group.');
				return;
			}
		}
		
		data.group.unshift(String(user.student_id));

		var jsonData = JSON.stringify(data);
		console.log(jsonData);
		$.ajax({
			type: 'POST',
			data: jsonData,
			contentType: 'application/json',
			url: '/handle-request',						
			success: function (result) {
				console.log(result);
				if(result.status == 200){
					console.log('Hooray');
				}
			}
		});
	});
	
	function setErrorMessage(message){
		$('div.alert-danger').removeClass('invisible').find('span.message').text(message);
	}
	
} )();