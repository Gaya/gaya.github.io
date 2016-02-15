function sendAjaxRequest(url, eventhandler) {
	if (window.ActiveXObject) {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	}

	xhr.onreadystatechange = function() {
	if(xhr.readyState == 4)
		if(xhr.status == 200) {
			eventhandler(xhr);
		} else {
			document.body.innerHTML = xhr.responseText;
		}
	}

	xhr.open("POST", url, true );
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xhr.send("");
}

function getAjaxTwits(url) {
	var twitter = document.getElementById('AjaxTwits');
	var twitterload = document.getElementById('AjaxTwitsLoader');
	
	sendAjaxRequest(url, function(ajaxRequest) {
		if (ajaxRequest.responseText) {
					
			var ans = eval('(' + ajaxRequest.responseText + ')');

			if (ans.item) {
				twitter.removeChild(twitterload);
				
				for (var i = 0; i < 6; i++) {
					var li = document.createElement("LI");
					li.className = "twitter-item";
					
						var profilePic = document.createElement("A");
						profilePic.href = "http://www.twitter.com/" + ans.item[i].user;
						
							var img = document.createElement("IMG");
							img.src = ans.item[i].avatar;
						
						profilePic.appendChild(img);
						
					li.appendChild(profilePic);
					
					var message = hyperlinks(ans.item[i].description);
					message = twitter_users(message);
					
					li.innerHTML += message;
					
						var br = document.createElement("BR");
					
					li.appendChild(br);
						
						var a = document.createElement("A");
						a.href = ans.item[i].url;
						a.className = "twitter-link";
						a.innerHTML = "# link to message";
					
					li.appendChild(a);
					
					twitter.appendChild(li);
				}
			}
		}
	});	
}

function hyperlinks(text) {
	text = text.replace(/\s(http:\/\/[a-z][a-zA-Z0-9\/\*\-\?\.\&\%\$]*)/ig," <a href=\"$1\" class=\"twitter-link\">$1</a>");
	text = text.replace(/\s([a-zA-Z]+:\/\/[a-z][a-z0-9\_\.\-]*[a-z]{2,6}[a-zA-Z0-9\/\*\-\?\&\%]*)([\s|\.|\,])/ig," <a href=\"$1\" class=\"twitter-link\">$1</a>$2");
	// match www.something.domain/path/file.extension?some=variable&another=asf%
	text = text.replace(/\s(www\.[a-z][a-z0-9\_\.\-]*[a-z]{2,6}[a-zA-Z0-9\/\*\-\?\&\%]*)([\s|\.|\,])/ig," <a href=\"http://$1\" class=\"twitter-link\">$1</a>$2");      
    
	return text;
}

function twitter_users(text) {
    text = text.replace(/([\.|\,|\:|\¡|\¿|\>|\{|\(]?)@{1}(\w*)([\.|\,|\:|\!|\?|\>|\}|\)]?)\s/ig, "$1<a href=\"http://twitter.com/$2\" class=\"twitter-user\">@$2</a>$3 ");
    return text;
}