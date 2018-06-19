<?php
include 'includes.php';
include 'connect.php';

?>

<!doctype html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<title>FAQ</title>

		<link rel="stylesheet" href="css/styles.css" type="text/css">
	</head>

	<body>
		<div class="container">
			<h1 class="title">Search FAQ</h1>
			<div class="faq-container">
				<input type="search" value placeholder="Type some keywords to begin your search...">
				<ul>
				<?php
				printFaqs();
				?>
					<!-- EXAMPLE STRUCTURE 
						<li id="faq-1">
						<h2>
							<a href="#faq-1">Great Pyramid of Giza</a>
							<hidden class="hidden-keywords" aria-hidden="true">khufu cheops</hidden>
						</h2>
						<div>
							<p>The Great Pyramid of Giza (also known as the Pyramid of Khufu or the Pyramid of Cheops) is the oldest and largest
								of the three pyramids in the Giza Necropolis bordering what is now El Giza, Egypt. It is the oldest of the Seven
								Wonders of the Ancient World, and the only one to remain largely intact.</p>
						</div>
					</li> -->
				</ul>
				<div class="not-found">
					<p>No matches were found... </p>
				</div>
			</div>
		</div>

		<script src="js/jquery-3.3.1.min.js"></script>
		<script src="js/faq_search.js"></script>

	</body>

</html>