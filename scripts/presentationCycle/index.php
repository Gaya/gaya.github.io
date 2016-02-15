<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="nl" lang="nl">
<head>
    <title>Gaya Design - Presentation Cycle</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<meta http-equiv="Pragma" content="no-cache" />
    
    <!-- Stylesheets -->
    <link rel="stylesheet" type="text/css" href="css/style.css" />
    <link rel="stylesheet" type="text/css" href="css/presentationCycle.css" />

    <!-- Scripts -->
    <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js?ver=1.3.2'></script>
    <script type='text/javascript' src='js/jquery.cycle.all.min.js'></script>
    <script type='text/javascript' src='js/presentationCycle.js'></script>
</head>
<body>
    <div class="container">
    
        <h1>Presentation Cycle</h1>
        
        <p>
            This is an example of how the presentation cycle works. To change the looks pic one of these:<br />
            <a href="http://www.gayadesign.com/scripts/presentationCycle/index.php?style=0">Standard look</a> |
            <a href="http://www.gayadesign.com/scripts/presentationCycle/index.php?style=1">Minimal</a> |
            <a href="http://www.gayadesign.com/scripts/presentationCycle/index.php?style=2">Super minimal reversed and other effect</a>  
        </p>
        
        <div id="presentation_container" class="pc_container">
            <div class="pc_item">
                <div class="desc">
                    <h1>Server Park</h1>
                    Consectetur adipiscing elit. Nunc quis tellus eros.
                    Nam blandit diam id turpis bibendum nec rutrum dui pulvinar. Quisque fermentum,
                    dolor ut adipiscing suscipit, leo lorem malesuada mauris, vitae dapibus mi
                    ligula ut nunc.
                </div>
                <img src="images/slide1.jpg" alt="slide1" />
            </div>
            <div class="pc_item">
                <div class="desc">
                    <h1>iPhone Apps</h1>
                    Consectetur adipiscing elit. Nunc quis tellus eros.
                    Nam blandit diam id turpis bibendum nec rutrum dui pulvinar. Quisque fermentum,
                    dolor ut adipiscing suscipit, leo lorem malesuada mauris, vitae dapibus mi
                    ligula ut nunc.
                </div>
                <img src="images/slide2.jpg" alt="slide2" />
            </div>
            <div class="pc_item">
                <div class="desc" style="left: 0px;">
                    <h1>Wordpress Extensions</h1>
                    Consectetur adipiscing elit. Nunc quis tellus eros.
                    Nam blandit diam id turpis bibendum nec rutrum dui pulvinar. Quisque fermentum,
                    dolor ut adipiscing suscipit, leo lorem malesuada mauris, vitae dapibus mi
                    ligula ut nunc.
                </div>
                <img src="images/slide3.jpg" alt="slide3" />
            </div>
            <div class="pc_item">
                <div class="desc" style="left: 165px;">
                    <h1>City Skyline</h1>
                    Consectetur adipiscing elit. Nunc quis tellus eros.
                    Nam blandit diam id turpis bibendum nec rutrum dui pulvinar. Quisque fermentum,
                    dolor ut adipiscing suscipit, leo lorem malesuada mauris, vitae dapibus mi
                    ligula ut nunc.
                </div>
                <img src="images/slide4.jpg" alt="slide4" />
            </div>
            <div class="pc_item">
                <div class="desc">
                    <h1>Mario Finds Peach</h1>
                    Consectetur adipiscing elit. Nunc quis tellus eros.
                    Nam blandit diam id turpis bibendum nec rutrum dui pulvinar. Quisque fermentum,
                    dolor ut adipiscing suscipit, leo lorem malesuada mauris, vitae dapibus mi
                    ligula ut nunc.
                </div>
                <img src="images/slide5.jpg" alt="slide5" />
            </div>
            <div class="pc_item">
                <div class="desc">
                    <h1>Said and Done</h1>
                    Consectetur adipiscing elit. Nunc quis tellus eros.
                    Nam blandit diam id turpis bibendum nec rutrum dui pulvinar. Quisque fermentum,
                    dolor ut adipiscing suscipit, leo lorem malesuada mauris, vitae dapibus mi
                    ligula ut nunc.
                </div>
                <img src="images/slide6.jpg" alt="slide6" />
            </div>
        </div>
        
        <p>
            <a href="presentationCycle.zip">Download this script</a><br />
            <a href="http://www.gayadesign.com/diy/presentation-cycle-cycle-with-a-progressbar">Read the article / manual</a>
        </p>
        
        <script type="text/javascript">
            <?php
            
            $style = 0;
            if (isset($_GET['style'])) {
                $style = $_GET['style'];   
            }
            
            switch ($style) {
                case 1:
                ?>
                
                presentationCycle.barHeight = 12;
                presentationCycle.barDisplacement = 20;
                presentationCycle.barImgLeft = "images/pc_item_left_2.gif";
                presentationCycle.barImgRight = "images/pc_item_right_2.gif";
                presentationCycle.barImgCenter = "images/pc_item_center_2.gif";
                presentationCycle.barImgBarEmpty = "images/pc_bar_empty_2.gif";
                presentationCycle.barImgBarFull = "images/pc_bar_full_2.gif";
                
                $("#presentation_container").css({
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#606060",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    backgroundImage: "none",
                    backgroundColor: "#000000"
                });
                
                <?php
                break;
                
                case 2:
                ?>
                
                presentationCycle.barHeight = 5;
                presentationCycle.barDisplacement = 20;
                presentationCycle.barImgLeft = "images/pc_item_left_3.gif";
                presentationCycle.barImgRight = "images/pc_item_right_3.gif";
                presentationCycle.barImgCenter = "images/pc_item_center_3.gif";
                presentationCycle.barImgBarEmpty = "images/pc_bar_empty_3.gif";
                presentationCycle.barImgBarFull = "images/pc_bar_full_3.gif";
                
                presentationCycle.cycleFx = 'cover';
                
                $("#presentation_container").css({
                    borderWidth: "1px",
                    borderStyle: "none",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    backgroundImage: "none",
                    backgroundColor: "transperant"
                });
                
                <?php
                break;
            }
            
            ?>
            presentationCycle.init();
        </script>
    
    </div>
    
</body>
</html>