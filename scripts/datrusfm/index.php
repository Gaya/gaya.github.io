<?php

   include('functions.php');

   $lastfm_api_key = "1262697957efa9ea5c840a68e10603a9";
   $lastfm_secret = "5684ea5b2ba3f2ee5a681f29b0ff87e7";
   
   if (isset($_GET['user1']) && isset($_GET['user2'])) {
      $user1 = $_GET['user1'];
      $user2 = $_GET['user2'];
   
      //info uri
      $user1info = getUserInfo($user1, $lastfm_api_key);
      $user2info = getUserInfo($user2, $lastfm_api_key);
      
      //compare tastes
      $tasteometer = compareTastes($user1, $user2, $lastfm_api_key);
      
      //get events list of both users
      $user1events = getEventsListUser($user1, $lastfm_api_key);
      $user2events = getEventsListUser($user2, $lastfm_api_key);
   }
   
   

?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US">
   <head profile="http://gmpg.org/xfn/11">
      <title>DatRus.fm</title>
      <link rel="stylesheet" type="text/css" href="style.css" />
   </head>
   
   <body>
      <h1>DatRus.fm</h1>
      <h2>Can I date this last.fm user?</h2>

      <form action="?" method="get">
         <label>Your last.fm username:</label>
         <input name="user1" type="text" /><br />
         <label>Other last.fm user:</label>
         <input name="user2" type="text" /><br />
         <button>
            Let's see if we match!
         </button>
      </form><br />
      
      <?php
         
      if (isset($_GET['user1']) && isset($_GET['user2'])) {
         //calculate user info
         $username = $user1info->user->name;
         $realname = $user1info->user->realname;
         $avatar = $user1info->user->image[1];
         $url = $user1info->user->url;
         $country = $user1info->user->country;
         $age = $user1info->user->age;
         $gender = $user1info->user->gender;
         
         echo "
         <div class='userInfo'>
            <a href='" . $url . "'><img class='avatar' src='" . $avatar . "' /></a>
            <h2>User 1: <a href='" . $url . "'>" . $username . "</h2></a>
         ";
         
         if (strlen($realname) > 0) {
            echo "Real name: " . $realname . "<br />";
         }
         if (strlen($age) > 0) {
            echo "Age: " . $age . "<br />";
         }
         
         if (strlen($gender) > 0) {
            echo "Gender: " . $gender . "<br />";
         }
         
         if (strlen($country) > 0) {
            echo "Country: " . $country . "<br />";
         }
               
         echo "
         </div>
         ";
         
         $username = $user2info->user->name;
         $realname = $user2info->user->realname;
         $avatar = $user2info->user->image[1];
         $url = $user2info->user->url;
         $country = $user2info->user->country;
         $age = $user2info->user->age;
         $gender = $user2info->user->gender;
         
         echo "
         <div class='userInfo'>
            <a href='" . $url . "'><img class='avatar' src='" . $avatar . "' /></a>
            <h2>User 1: <a href='" . $url . "'>" . $username . "</h2></a>
         ";
         
         if (strlen($realname) > 0) {
            echo "Real name: " . $realname . "<br />";
         }
         if (strlen($age) > 0) {
            echo "Age: " . $age . "<br />";
         }
         
         if (strlen($gender) > 0) {
            echo "Gender: " . $gender . "<br />";
         }
         
         if (strlen($country) > 0) {
            echo "Country: " . $country . "<br />";
         }
               
         echo "
         </div>
         ";
         
         echo "<br style='clear: both' /><br />";
         
         $score = $tasteometer->comparison->result->score;
         $score = round(floatval($score) * 100, 2);
         
         echo "<h2>Your musical compatibility seems to be " . $score . "%!</h2>";
         
         if ($score > 90) {
            echo "<h3>A serious match here!</h3><br />";
         } else if ($score > 75) {
            echo "<h3>You like the same kind of music.</h3><br />";
         } else if ($score > 50) {
            echo "<h3>Well... it's nice.</h3><br />";   
         } else if ($score > 25) {
            echo "<h3>Not much in common here.</h3><br />";   
         } else {
            echo "<h3>Forget a musical match.</h3><br />";
         }
         
         echo "<h3>You both like these artists:</h3>";
         
         foreach ($tasteometer->comparison->result->artists->artist as $artist) {
            $artistname = $artist->name;
            $image = $artist->image[0];
            echo "
            <div class='artist' style='background-image: url(" . $image . ")'>
               " . $artistname . "
            </div>
            ";
         }
         
         echo "<br style='clear: both' />";
         
         $user2eventids = array();
         foreach ($user2events->events->event as $event) {
            array_push($user2eventids, intval($event->id));   
         }
         
         $sameevents = array();
         
         foreach ($user1events->events->event as $event) {
            if (in_array(intval($event->id), $user2eventids)) {
               $insert = array();
               
               $insert['id'] = $event->id;
               $insert['title'] = $event->title;
               
               $insert['artists'] = array();
               foreach ($event->artists->artist as $artist) {
                  array_push($insert['artists'], $artist);
               }
               
               $insert['venue'] = $event->venue->name . ", in " . $event->venue->location->city;
               $insert['date'] = $event->startDate;
               
               array_push($sameevents, $insert);
            }
         }
         
         if (sizeof($sameevents) > 0) {
            echo "<h2>You two might meet at these events!</h2>";
            
            foreach ($sameevents as $event) {
               echo "
               <div class='event'>
                  <h3>" . $event['title'] . "</h3>
                  <small>" . $event['date'] . "</small><br />
                  at " . $event['venue'] . "<br />
                  with:
               ";
               
               $artists = "";
               foreach ($event['artists'] as $artist) {
                  $artists .= $artist . ", ";
               }
               echo substr($artists, 0, -2);
               
               echo "
               </div><br />
               ";     
            }
         } else {
            echo "<h3>Looks like you haven't gotten any event where you might run into eachother :(</h3>";   
         }
      }
      ?>
      
   </body>
</html>