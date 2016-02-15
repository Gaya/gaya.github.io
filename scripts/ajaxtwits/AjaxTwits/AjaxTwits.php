<?php
	/*
	 * AjaxTwits	a PHP class for Twitter Ajax widgets
	 * Author:		Gaya Kessler
	 * Version:		1.0
	 * Date:		25/03/09
	 * 
	 * URL:			http://www.gayadesign.com
	 * 
	 * AjaxTwits is free to use and is an easy way to load Twitter timelines and
	 * replies into an XML.
	 * The output can be formated in XML or JSON for Javascript support.  
	 */

	class AjaxTwits {
		var $rss = array();
		var $items = array();
		var $cachefolder;
		var $foundAvatars = array();
		var $itemCount = 6;
		var $cacheTime = 15;
		var $debug = false;
		
		function addTimeline($username) {
			//add the timeline of a user to the RSS queue
			$this->addRssLink("http://twitter.com/statuses/user_timeline/" . $username . ".rss");
		}
		
		function addReplies($username) {
			//add the @ replies of a user to the RSS queue
			$this->addRssLink("http://search.twitter.com/search.atom?q=%40" . $username);
		}
		
		function addRssLink($rssurl) {
			array_push($this->rss, $rssurl);
		}
		
		function outputFeed($type = "xml") {
			
			$file = $_SERVER['DOCUMENT_ROOT']."/" . $this->cachefolder . "/ajaxtwits.xml";
			
			//if file is on the server, check if it's old enough for refresh
			if (file_exists($file) || $this->debug == true) {
				$filetimemod = mktime(date("G", filemtime($file)), date("i", filemtime($file)) + $this->cacheTime, 0, date("m", filemtime($file)), date("d", filemtime($file)), date("Y", filemtime($file)));
				if ($filetimemod < mktime() || $this->debug == true) {
					//make new feed file
					$this->create_xml($file);
				}
			} else {
				//no file exists, create xml
				$this->create_xml($file);
			}
			
			//load the xml and output the result
			$output = simplexml_load_file($file);
			
			if ($type == "xml") {
				echo $output->asXML();	
			} else if ($type == "json") {
				echo json_encode($output);
			}
			
		}
		
		function create_xml($file) {
			//first combine the feeds
			$this->combine_rss();
			
			//sort the feeds on the date
			usort($this->items, "cmp");
			
			//building the xml string for SimpleXML
			$output = new SimpleXMLElement("<items></items>");
			
			for ($i = 0; $i < sizeof($this->items); $i++) {
				
				$insert = $output->addChild("item");
				
				//create nice time output
				if ((abs(time() - $this->items[$i]['date'])) < 86400) {
					$h_time = sprintf('%s ago', $this->human_time_diff( $this->items[$i]['date'] ));
				} else {
					$h_time = date('Y/m/d', $this->items[$i]['date']);
				}
				
				$insert->addChild("description", $this->items[$i]['description']);
				$insert->addChild("date", $h_time);
				$insert->addChild("url", $this->items[$i]['url']);
				$insert->addChild("user", $this->items[$i]['user']);
				$insert->addChild("avatar", $this->items[$i]['avatar']);
				
			}
			
			//save the xml in the cache
			file_put_contents($file, $output->asXML());
		}
		
		function combine_rss() {
			
			//go through the feeds
			for ($i = 0; $i < sizeof($this->rss); $i++) {
				
				if ($xml = @simplexml_load_file($this->rss[$i])) {
					
					if ($xml->channel->item) {
						//the feed is a normal timeline
						for ($j = 0; $j < $this->itemCount; $j++) {
							$insert = array();
							$insert['description'] = $xml->channel->item[$j]->description;
							$insert['description'] = substr(strstr($insert['description'],': '), 2, strlen($insert['description']));
							$insert['date'] = strtotime($xml->channel->item[$j]->pubDate);
							$insert['url'] = $xml->channel->item[$j]->guid;
							$insert['user'] = substr($xml->channel->item[$j]->description, 0, strpos($xml->channel->item[$j]->description, ":"));
							$insert['avatar'] = $this->twitter_avatar($insert['user']);
							
							array_push($this->items, $insert);
						}
						
					} else if ($xml->entry) {
						//the feed is a replies feed
						for ($j = 0; $j < $this->itemCount; $j++) {
							$insert = array();
							$insert['description'] = $xml->entry[$j]->title;
							$insert['date'] = strtotime($xml->entry[$j]->published);
							$insert['url'] = $xml->entry[$j]->link[0]->attributes()->href;
							$insert['user'] = substr($xml->entry[$j]->author->name, 0, strpos($xml->entry[$j]->author->name, " "));
							$insert['avatar'] = $xml->entry[$j]->link[1]->attributes()->href;
							
							array_push($this->items, $insert);
						}		
					}
						
				}
				
			}
		}
		
		function twitter_avatar($username) {
			
			//check if avatar is found before
			if (isset($this->foundAvatars[$username])) {
				
				//give found answer
				return $this->foundAvatars[$username];
				
			} else {
				
				//create url for avatar info
				$url = "http://twitter.com/users/show/show.xml?screen_name=" . $username;
				
				//check the xml for data
				$file = $_SERVER['DOCUMENT_ROOT']."/" . $this->cachefolder . "/" . $username . ".xml";
				if (file_exists($file)) {
					$xml = simplexml_load_file($file);
					
					//check if this avatar is still alive
					if ($this->url_exists($xml->profile_image_url)) {
						$this->foundAvatars[$username] = $xml->profile_image_url;
						
						return $xml->profile_image_url;
					} else {
						//get new user information
						$avatar = $this->get_twitter_xml($url, $file);
						
						$this->foundAvatars[$username] = $avatar;
						
						return $avatar;
					}
				} else {
					//get user information
					$avatar = $this->get_twitter_xml($url, $file);
					
					$this->foundAvatars[$username] = $avatar;
					
					return $avatar;
				}
			}
		}
		
		function get_twitter_xml($url, $file) {
			//load the user info xml and save it in the cache
			if ($xml = @simplexml_load_file($url)) {
				file_put_contents($file, $xml->asXML());
				return $xml->profile_image_url;	
			} else {
				return "";
			}
		}
		
		function url_exists($url) {
			@ $headers = get_headers($url);
		    return preg_match('/^HTTP\/\d\.\d\s+(200|301|302)/', $headers[0]);
		}
		
		function human_time_diff( $from, $to = '' ) {
			//function stolen from wordpress ;)  
			if ( empty($to) )
	 			$to = time();
			$diff = (int) abs($to - $from);
			if ($diff <= 3600) {
				$mins = round($diff / 60);
				if ($mins <= 1)
					$since = '1 min';
				else
					$since = sprintf('%s mins', $mins);
			} else if (($diff <= 86400) && ($diff > 3600)) {
				$hours = round($diff / 3600);
				if ($hours <= 1)
					$since = '1 hour';
				else 
					$since = sprintf('%s hours', $hours );
			} elseif ($diff >= 86400) {
				$days = round($diff / 86400);
				if ($days <= 1)
					$since = '1 day';
				else
					$since = sprintf('%s days', $days );
			}
				return $since;
		}
	}
	
	function cmp($a, $b)
	{
		//a loose function to make the items sort well
	    return strcmp($b["date"], $a["date"]);
	}
	
?>