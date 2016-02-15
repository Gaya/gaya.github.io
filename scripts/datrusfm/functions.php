<?php

   function getUserInfo($user, $key) {
      $uri = "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=".$user."&api_key=" . $key;
      
      return makeLastFmRequest($uri);
   }
   
   function compareTastes($user1, $user2, $key) {
      $uri = "http://ws.audioscrobbler.com/2.0/?method=tasteometer.compare&type1=user&type2=user&value1=".$user1."&value2=".$user2."&api_key=" . $key;
      
      return makeLastFmRequest($uri);   
   }
   
   function getEventsListUser($user, $key) {
      $uri = "http://ws.audioscrobbler.com/2.0/?method=user.getevents&user=" . $user . "&api_key=" . $key;
      
      return makeLastFmRequest($uri);   
   }

   function makeLastFmRequest($uri) {
      $xml = simplexml_load_file($uri);
      
      return $xml;
   }

?>