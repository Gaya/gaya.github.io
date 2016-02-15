<?php
	
	//determine the starting time and the max timeout
	$start_time = time();
	$max_timeout = ini_get('max_execution_time');

	//set default data
	$data = array();
	
	//go into the loop
	while((time() - $start_time) < $max_timeout) {
		
		$update_available = false;
		
		$updates = file_get_contents("updates.txt");
		if (strlen($updates) > 0) {
			//set update available
			$update_available = true;
			
			//set updates
			$data['updates'] = $updates;
			
			//empty file
			file_put_contents("updates.txt", "");
		}
		
		if ($update_available) {
			echo json_encode($data);
			exit();
		}
		
		sleep(1);
   		flush();
	}
	
	
	echo json_encode($data);

?>