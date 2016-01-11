var EmailComponect = {
	lastkeycode: null,
	validateEmail: function(email){
		var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        regex.test(email) == true ?  null : this.inValidEmail();
	},
	addEmailTag: function(value){
		_this=this;
		var emailDiv = $('<div>')
							.attr({'class' : 'emaildiv'})
							.insertBefore('.emailbox');

		var span = $('<span>')
						.addClass('spanEmail')
						.append(
								$('<div>').addClass('divemail').html(value),
								$('<div>')
									.addClass('close')
									.html('x')
									.on('click', function(){
										_this.removeEmailTag($(this).closest('div.emaildiv'));
									})
							)
						.appendTo(emailDiv);

	},
	removeEmailTag: function(tag){
		$(tag).remove();
	},
	highlightEmail: function(elem){
		$(elem).addClass('active');
	},
	removehighlightEmail: function(){
		$('.active').removeClass('active');
	},
	events: function()
	{
		_this = this;
		$('.emailbox')
			.on('paste', function(event){
				var data = event.originalEvent.clipboardData.getData('text');
				setTimeout(function(){ 
		            for(var i in data.split(',')){
						var value = $.trim(data.split(',')[i]);
						_this.addEmailTag(value);
						_this.validateEmail(value);
					}
					$('.emailbox').val('');
		        },100);
				
			})
			.on('change keyup', function(event){
				if(_this.lastkeycode == 8 && (event.keyCode == 8 || event.keyCode == 46)) {
					var elem = $('#emailconatiner .emaildiv:last');
					_this.removeEmailTag(elem);
					_this.lastkeycode = null;
					return false;
				}
				else if(event.keyCode == 8){
					var elem = $('#emailconatiner .emaildiv:last');
					_this.highlightEmail(elem);
				}
				else if(event.keyCode == 32 || event.keyCode == 13){
					if($.trim($(this).val())!=''){
						_this.addEmailTag($.trim($(this).val()));
						_this.validateEmail($.trim($(this).val()));
						$(this).val('');
					}
				}else{
					_this.removehighlightEmail();
				}
				_this.lastkeycode = event.keyCode;
			});
			
	},
	init: function(){
		$('.emailbox').val('').focus();
		this.events();
	},
	inValidEmail: function(){
		$('#emailconatiner .emaildiv:last').addClass('invalidemail');
	}
}