<?php
	//include AjaxTwits and create an object
	include('AjaxTwits.php');
	$ajaxTwits = new AjaxTwits;
	
	//set the cache to a writable folder (from the root), to save xml files
	$ajaxTwits->cachefolder = "scripts/ajaxtwits/AjaxTwits/cache";
	//the amount of minutes the feed is cached
	$ajaxTwits->cacheTime = 15;
	
	//the amount of items you'll show
	$ajaxTwits->itemCount = 6;
	
	//add your twitter account feeds
	$ajaxTwits->addTimeline("gayadesign");
	$ajaxTwits->addReplies("gayadesign");
	
	//this will output the information, JSON is for the Javascript application
	$ajaxTwits->outputFeed("json");
?>