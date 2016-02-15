var notification = {
	
	request_url: "notification/notification_request.php",
		
	do_request: function() {
		$.post(notification.request_url, {},
		function(data) {
			if (typeof(data.updates) != 'undefined') {
				$("#notify").html(data.updates);
			}
			notification.do_request();
		}, "json");
	}
		
}

notification.do_request();