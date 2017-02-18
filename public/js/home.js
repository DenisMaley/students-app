( function() {		
	
	//Properties and events you can find here http://api.jqueryui.com/sortable/
	
	var PROJECT_LIMIT = 5;
	var LIST_PLACEHOLDER = '<span id="list-placeholder">Drag and drop here '+PROJECT_LIMIT+' projects and rank them: 1 - the highest priority, '+PROJECT_LIMIT+' - the lowest priority</span>';
	
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
			if($(this).children().length >= PROJECT_LIMIT) {
				$(this).addClass('dont-drop');
				$('.do-drop').sortable('option', 'connectWith',$('.do-drop:not(.dont-drop)'));
			}
			
			if($(this).children('li').length == 1){
				$(this).find('span#list-placeholder').remove();
			}
		},
		//Unblock if project is returning
		beforeStop: function(ui) {
			if($(this).children().length < PROJECT_LIMIT) {
				$(this).removeClass('dont-drop');
				$('.do-drop').sortable('option', 'connectWith',$('.do-drop:not(.dont-drop)'));
				
				if($(this).children().length == 0){
					$(this).html(LIST_PLACEHOLDER);
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
	}).html(LIST_PLACEHOLDER);
	
	$('ul.do-drop#projects_list, ul.do-drop#chosen_projects_list').disableSelection();
	
	//Choose way of writing
	$('label.btn').on('click', function(){
		var group_selector = $(this).closest('form.form-horizontal').find('div.bootstrap-select button.dropdown-toggle');
		if($(this).has('input#in_a_group').length){
			group_selector.removeClass('invisible');
		}else{
			group_selector.addClass('invisible');
		}
		
	});
	
	//Send a request
	$('button#send_request').on('click', function(){
		
		var data = {
			request: {
				student_id: user.student_id
			},	
			group: []
		};
		var project_arr = $('ul#chosen_projects_list li').map(function(i, el){
			return $(this).data('id');
		}).get();
		
		if(project_arr.length < PROJECT_LIMIT){
			setErrorMessage('You have to choose '+PROJECT_LIMIT+' projects and rank them from 1 to '+PROJECT_LIMIT+'.');
			return;
		}
		
		data.request.request_conf = JSON.stringify(project_arr);//We will store request configuration to a database in JSON
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
		$.ajax({
			type: 'POST',
			data: jsonData,
			contentType: 'application/json',
			url: '/handle-request',						
			success: function (result) {
				if(result.status == 200){
					setSuccessMessage('Yor request has been successfully registered. You will be redirected in a few seconds.');
					$('button#send_request').unbind('click');
					setTimeout(function() { 
						window.location.replace('/');
						return;
					}, 5000);
				}
			}
		});
	});
	
	$('button.inv-adoption').on('click', function(){
		
		var $this = $(this);
		
		var data = {
			invitation_adoption: $this.data('adoption'),
			invitation_id: $this.closest('div.inv-block').data('id')
		};

		var jsonData = JSON.stringify(data);
		$.ajax({
			type: 'POST',
			data: jsonData,
			contentType: 'application/json',
			url: '/handle-invitation',						
			success: function (result) {
				if(result.status == 200){
					$this.closest('div.btn-group').after('Yor request has been successfully registered. You will be redirected in a few seconds.');
					$('button.inv-adoption').unbind('click');
					setTimeout(function() { 
						window.location.replace('/');
						return;
					}, 5000);
				}
			}
		});
	});
	
	function setErrorMessage(message){
		$('div.alert-danger').removeClass('invisible').find('span.message').text(message);
	}
	function setSuccessMessage(message){
		$('div.alert-danger').addClass('invisible')
		$('div.alert-success').removeClass('invisible').find('span.message').text(message);
	}
	
} )();