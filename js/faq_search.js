(function () {
	'use strict';
})();


// Search & highlight

(function ($, window, document) {
	var $container = $('.faq-container');
	if (!$container.length)
		return true;

	var $input = $container.find('input'),
		$notfound = $container.find('.not-found'),
		$items = $container.find('ul li'),
		$item = $(),
		itemsIndexed = [],
		$questions = $container.find('ul li h2'),
		$question = $(),
		questionsIndexed = [],
		$hiddenKeywords = $container.find('ul li h2 hidden');

	//indexes all li items (includes question and answer)
	$items.each(function () {
		itemsIndexed.push($(this).text().replace(/\s{2,}/g, ' ').toLowerCase());
	});

	//indexes only li h2's (meaning only questions)
	//also indexes the hidden keywords from each question
	$questions.each(function () {
		questionsIndexed.push($(this).text().replace(/\s{2,}/g, ' ').toLowerCase());
	});

	console.log(questionsIndexed);

	$input.on('keyup', function (e) {
		if (e.keyCode == 13) {
			$input.trigger('blur');
			return true;
		}

		//version highlights finds in question and answer content
		// $items.each(function () {
		// 	$item = $(this);
		// 	$item.html($item.html().replace(/<span\ class="highlight">([^<]+)<\/span>/gi, '$1'));
		// });

		//version highlights finds in only question
		$questions.each(function () {
			$question = $(this);
			$question.html($question.html().replace(/<span\ class="highlight">([^<]+)<\/span>/gi, '$1'));
		});

		var searchVal = $.trim($input.val()).toLowerCase();

		if (searchVal.length) {
			//version searches through items
			// for (var i in itemsIndexed) {
			// 	$item = $items.eq(i);
			// 	if (itemsIndexed[i].indexOf(searchVal) != -1)
			// 		$item.removeClass('is-hidden').html($item.html().replace(new RegExp(searchVal + '(?!([^<]+)?>)', 'gi'), '<span class="highlight">$&</span>'));
			// 	else
			// 		$item.addClass('is-hidden');
			// }

			//version searches through only questions
			for (var i in questionsIndexed) {
				$question = $questions.eq(i);
				$item = $items.eq(i);
				if (questionsIndexed[i].indexOf(searchVal) != -1) {
					console.log(questionsIndexed[i] + '\n' + searchVal);
					$item.removeClass('is-hidden');
					$question.html($question.html().replace(new RegExp(searchVal + '(?!([^<]+)?>)', 'gi'), '<span class="highlight">$&</span>'));
				} else
					$item.addClass('is-hidden');
			}
		} else {
			$items.removeClass('is-hidden');
		}

		$notfound.toggleClass('is-visable', $items.not('.is-hidden').length == 0);
	});

})(jQuery, window, document);

//toggle item content on title press

(function ($, window, document) {
	$(document).on('click', '.faq-container h2 a', function (e) {
		e.preventDefault();
		$(this).parents('li').children('div').toggleClass('is-active');
		$(this).toggleClass('targeted');
	});
})(jQuery, window, document);

//auto show item content when results filter down to single result

(function ($, window, document) {

	var $container = $('.faq-container');
	if (!$container.length)
		return true;

	var $input = $container.find('input'),
		$items = $container.find('ul li'),
		$item = $(),
		$question = $(),
		$jsActivated = $(),
		$jsTargeted = $();

	$input.on('keyup', function () {
		$item = $items.not('.is-hidden');
		$question = $item.children('h2').children('a');

		if ($item.length == 1) {
			$jsActivated = $item.children('div');

			$jsActivated.addClass('is-active');
			$question.addClass('targeted');
		} else {
			$jsActivated.removeClass('is-active');
			$question.removeClass('targeted');
		}
	});

})(jQuery, window, document);