function GnOVtpeUPfxjSRq() {
	let quickNotepad = document.querySelector('.quickNotepad');
	if ($(quickNotepad).hasClass('placeholderClass'))
	{
		$('.rzVCoiMyvGxrbEa').hide();
		$('.MprLrIoIAXLqljb').show();
	}
	else
	{
		$('.rzVCoiMyvGxrbEa').show();
		$('.MprLrIoIAXLqljb').hide();
	}
};
GnOVtpeUPfxjSRq();


function grabAndDrab1()
{
	$('#widg1').draggable({
		//revert: true,
		handle: $('#widg1_handle'),
		cursorAt: { top: 38, left: 33 },

		start: function (event, ui)
		{
			$(this).css({ 'z-index': '100', 'background-color': 'rgba(34, 36, 48, 1)' });
			$('#widg2').css({ 'pointer-events': 'none' });
			$('#widg3').css({ 'pointer-events': 'none' });
			$('#widg4').css({ 'pointer-events': 'none' });
		},
		stop: function (event, ui) 
		{
			$(this).css({ 'top': '0', left: '0' });
			$(this).removeAttr('style');
			$('#widg2').css({ 'pointer-events': 'all' });
			$('#widg3').css({ 'pointer-events': 'all' });
			$('#widg4').css({ 'pointer-events': 'all' });
		}
	});
};
grabAndDrab1();

function grabAndDrab2()
{
	$('#widg2').draggable({
		//revert: true,
		handle: $('#widg2_handle'),
		cursorAt: { top: 38, left: 33 },

		start: function (event, ui)
		{
			$(this).css({ 'z-index': '100', 'background-color': 'rgba(34, 36, 48, 1)' });
			$('#widg1').css({ 'pointer-events': 'none' });
			$('#widg3').css({ 'pointer-events': 'none' });
			$('#widg4').css({ 'pointer-events': 'none' });
		},
		stop: function (event, ui) 
		{
			$(this).css({ 'top': '0', left: '0' });
			$(this).removeAttr('style');
			$('#widg1').css({ 'pointer-events': 'all' });
			$('#widg3').css({ 'pointer-events': 'all' });
			$('#widg4').css({ 'pointer-events': 'all' });
		}
	});
};
grabAndDrab2();

function grabAndDrab3()
{
	$('#widg3').draggable({
		//revert: true,
		handle: $('#widg3_handle'),
		cursorAt: { top: 38, left: 33 },

		start: function (event, ui)
		{
			$(this).css({ 'z-index': '100', 'background-color': 'rgba(34, 36, 48, 1)' });
			$('#widg1').css({ 'pointer-events': 'none' });
			$('#widg2').css({ 'pointer-events': 'none' });
			$('#widg4').css({ 'pointer-events': 'none' });
		},
		stop: function (event, ui) 
		{
			$(this).css({ 'top': '0', left: '0' });
			//$(this).removeAttr('style');
			if ($('.quickNotepad').hasClass('placeholderClass'))
			{
				this.style.removeProperty('z-index');
				this.style.removeProperty('background-color');
				this.style.removeProperty('left');
				this.style.removeProperty('top');
			}
			else {
				$(this).removeAttr('style');
			}

			$('#widg1').css({ 'pointer-events': 'all' });
			$('#widg2').css({ 'pointer-events': 'all' });
			$('#widg4').css({ 'pointer-events': 'all' });
		}
	});
};
grabAndDrab3();

function grabAndDrab4()
{
	$('#widg4').draggable({
		//revert: true,
		handle: $('#widg4_handle'),
		cursorAt: { top: 38, left: 33 },

		start: function (event, ui)
		{
			$(this).css({ 'z-index': '100', 'background-color': 'rgba(34, 36, 48, 1)' });
			$('#widg1').css({ 'pointer-events': 'none' });
			$('#widg2').css({ 'pointer-events': 'none' });
			$('#widg3').css({ 'pointer-events': 'none' });
		},
		stop: function (event, ui) 
		{
			$(this).css({ 'top': '0', left: '0' });
			$(this).removeAttr('style');
			$('#widg1').css({ 'pointer-events': 'all' });
			$('#widg2').css({ 'pointer-events': 'all' });
			$('#widg3').css({ 'pointer-events': 'all' });
		}
	});
};
grabAndDrab4();



$('#yaSffAvBMRaDXMN').on('click', function()
{
	$(this).parent().addClass('placeholderClass'); //PyfcxvgCKODayJL

	$(this).parent().animate({
		width: "100%",
		height: "410px",
	}, 1000);

	GnOVtpeUPfxjSRq();
});
$('#tNQKplspKGJSQLU').on('click', function()
{
	$(this).parent().removeClass('placeholderClass');

	$(this).parent().animate({
		width: "200px",
		height: "200px",
	}, 1000);

	GnOVtpeUPfxjSRq();
});







