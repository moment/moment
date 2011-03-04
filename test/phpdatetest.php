<?php 
	//$tests = array('d','j','N','D','l','S','w','z','W','F','M','m','n','t','L','Y','y','a','A','B','g','G','h','H','i','s','I','O','P','Z','U');
	$tests = array('l (D) N w', 'F (M) n m [t]', 'z W', 'd jS', 'Y (y) L I', 'ga hA G (H)', 'i:s', 'B', 'O P Z', 'U');
	$headers = "<th>UTC</th>";
	$contents = "";
	for ($j = 1; $j < count($tests) + 1; $j++) {
		$a = $tests[$j-1];
		$headers .= "<th class='a'>$a</th>";
	}
	for ($i = 0; $i < 300; $i++) {
		//$date = round($i * 5482443);
		$date = round(1162277916 + $i * 1543);
		$oddrow = $i % 2 == 0 ? " class='odd'" : '';
		$contents .= "<tr$oddrow><td>$date</td>";
		for ($j = 0; $j < count($tests); $j++) {
			// set php date in seconds
			$phpoutput = date($tests[$j], round($date));
			// set js date in milliseconds
			$jsdate = $date * 1000;
			$contents .= "<td class='e' data-date='$jsdate' data-key='$tests[$j]' data-output='$phpoutput'>$phpoutput</td>";
		}
		$contents .= "</tr>";
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<title>phpdate</title>
		<style>
			table { width:100%; border-collapse:collapse; }
			tr.odd td { background:#eee; }
			td { padding:5px; margin:0; border-top:1px solid #bbb; }
		</style>
		<script src="vendor/jquery.js"></script>
		<script src="vendor/underscore.js"></script>
		<script src="../lib/underscore.date.js"></script>
		<script>
			var buggy = {};
			$(function(){
				$('td.e').each(function(){
					var t = $(this),
						date = t.data('date'),
						key = t.data('key'),
						fixKey = key.replace(/[^A-Za-z]/g, ""),
						val = t.data('output'),
						target = _.dateFormat(key,date);
					if (val == target){
						t.css('color','green');
					} else {
						t.css('color','red').html(val + ' <br/>' + target + '');
						buggy[fixKey] = buggy[fixKey] ? buggy[fixKey] + 1 : 1;
					}
				});
				$('th.a').each(function(){
					var t = $(this),
						key = t.text().replace(/[^A-Za-z]/g, "");
					if (!buggy[key]){
						t.css('color','green');
					} else {
						t.css('color','red').html(t.text() + '(' + buggy[key] + ')');
					}
				});
			});
		</script>
	</head>
	<body>
		<table style="width:100%;">
			<tr><?php print($headers); ?></tr>
			<?php print($contents); ?>
		</table>
	</body>
</html>