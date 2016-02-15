<?php 
	ini_set('display_errors', 1);
	error_reporting(E_ALL);

	include('Caching.php');
	$caching = new Caching($_SERVER['DOCUMENT_ROOT']."/scripts/caching/cache/lastfm.xml",
	"http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=xgayax&api_key=b25b959554ed76058ac220b7b2e0a026");

?>