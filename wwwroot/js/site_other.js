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


var widg_list = ["widg1", "widg2", "widg3", "widg4", "widg5"];
//console.log(widg_list);


function grabAndDrab1()
{
	$('#widg1').draggable({
		//revert: true,
		handle: $('#widg1_handle'),
		cursorAt: { top: 38, left: 33 },

		start: function (event, ui)
		{
			$(this).css({ 'z-index': '100', 'background-color': 'rgba(34, 36, 48, 1)' });
			//$('#widg2').css({ 'pointer-events': 'none' });
			//$('#widg3').css({ 'pointer-events': 'none' });
			//$('#widg4').css({ 'pointer-events': 'none' });

			widg_list = widg_list.filter(e => e !== this.id);
			for (let i = 0; i < widg_list.length; i++) 
			{
				$('#' + widg_list[i]).css({ 'pointer-events': 'none' });
			}
		},
		stop: function (event, ui) 
		{
			$(this).css({ 'top': '0', left: '0' });
			$(this).removeAttr('style');
			//$('#widg2').css({ 'pointer-events': 'all' });
			//$('#widg3').css({ 'pointer-events': 'all' });
			//$('#widg4').css({ 'pointer-events': 'all' });

			widg_list = widg_list.filter(e => e !== this.id);
			for (let i = 0; i < widg_list.length; i++)
			{
				$('#' + widg_list[i]).css({ 'pointer-events': 'all' });
			}
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
			//$('#widg1').css({ 'pointer-events': 'none' });
			//$('#widg3').css({ 'pointer-events': 'none' });
			//$('#widg4').css({ 'pointer-events': 'none' });

			widg_list = widg_list.filter(e => e !== this.id);
			for (let i = 0; i < widg_list.length; i++) 
			{
				$('#' + widg_list[i]).css({ 'pointer-events': 'none' });
			}
		},
		stop: function (event, ui) 
		{
			$(this).css({ 'top': '0', left: '0' });
			$(this).removeAttr('style');
			//$('#widg1').css({ 'pointer-events': 'all' });
			//$('#widg3').css({ 'pointer-events': 'all' });
			//$('#widg4').css({ 'pointer-events': 'all' });

			widg_list = widg_list.filter(e => e !== this.id);
			for (let i = 0; i < widg_list.length; i++)
			{
				$('#' + widg_list[i]).css({ 'pointer-events': 'all' });
			}
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
			//$('#widg1').css({ 'pointer-events': 'none' });
			//$('#widg2').css({ 'pointer-events': 'none' });
			//$('#widg4').css({ 'pointer-events': 'none' });

			widg_list = widg_list.filter(e => e !== this.id);
			for (let i = 0; i < widg_list.length; i++) 
			{
				$('#' + widg_list[i]).css({ 'pointer-events': 'none' });
			}
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

			//$('#widg1').css({ 'pointer-events': 'all' });
			//$('#widg2').css({ 'pointer-events': 'all' });
			//$('#widg4').css({ 'pointer-events': 'all' });
			widg_list = widg_list.filter(e => e !== this.id);
			for (let i = 0; i < widg_list.length; i++)
			{
				$('#' + widg_list[i]).css({ 'pointer-events': 'all' });
			}
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
			//$('#widg1').css({ 'pointer-events': 'none' });
			//$('#widg2').css({ 'pointer-events': 'none' });
			//$('#widg3').css({ 'pointer-events': 'none' });

			widg_list = widg_list.filter(e => e !== this.id);
			for (let i = 0; i < widg_list.length; i++) 
			{
				$('#' + widg_list[i]).css({ 'pointer-events': 'none' });
			}
		},
		stop: function (event, ui) 
		{
			$(this).css({ 'top': '0', left: '0' });
			$(this).removeAttr('style');
			//$('#widg1').css({ 'pointer-events': 'all' });
			//$('#widg2').css({ 'pointer-events': 'all' });
			//$('#widg3').css({ 'pointer-events': 'all' });

			widg_list = widg_list.filter(e => e !== this.id);
			for (let i = 0; i < widg_list.length; i++)
			{
				$('#' + widg_list[i]).css({ 'pointer-events': 'all' });
			}
		}
	});
};
grabAndDrab4();

function grabAndDrab5()
{
	$('#widg5').draggable({
		//revert: true,
		handle: $('#widg5_handle'),
		cursorAt: { top: 38, left: 33 },

		start: function (event, ui)
		{
			$(this).css({ 'z-index': '100', 'background-color': 'rgba(34, 36, 48, 1)' });
			//$('#widg1').css({ 'pointer-events': 'none' });
			//$('#widg2').css({ 'pointer-events': 'none' });
			//$('#widg3').css({ 'pointer-events': 'none' });

			widg_list = widg_list.filter(e => e !== this.id);
			for (let i = 0; i < widg_list.length; i++) 
			{
				$('#' + widg_list[i]).css({ 'pointer-events': 'none' });
			}
		},
		stop: function (event, ui) 
		{
			$(this).css({ 'top': '0', left: '0' });
			$(this).removeAttr('style');
			//$('#widg1').css({ 'pointer-events': 'all' });
			//$('#widg2').css({ 'pointer-events': 'all' });
			//$('#widg3').css({ 'pointer-events': 'all' });

			widg_list = widg_list.filter(e => e !== this.id);
			for (let i = 0; i < widg_list.length; i++)
			{
				$('#' + widg_list[i]).css({ 'pointer-events': 'all' });
			}
		}
	});
};
grabAndDrab5();




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


$('#LldXkbnodmhlJIn').on('click', function ()
{
	$('.aLTkEQlLIqOrXvT').fadeIn(200);
});

$('#rCnoNzileMKWYLc').on('click', function ()
{
	$('.aLTkEQlLIqOrXvT').fadeOut(200);
});



function isWeekend(date = new Date())
{
	return date.getDay() === 6 || date.getDay() === 0;
}

function daysInMonth(month, year)
{
	return new Date(year, month, 0).getDate();
};

function padWithLeadingZeros(num, totalLength)
{
	return String(num).padStart(totalLength, '0');
};

function getDayName(dateStr, locale)
{
	var date = new Date(dateStr);
	return date.toLocaleDateString(locale, { weekday: 'long' });
};

function getLastMonday(month, year)
{
	var d = new Date();
	if (year) { d.setFullYear(year); }
	d.setDate(1); // Roll to the first day of ...
	d.setMonth(month || d.getMonth() + 1); // ... the next month.
	do
	{ // Roll the days backwards until Monday.
		d.setDate(d.getDate() - 1);
	} while (d.getDay() !== 1);
	return d;
}

function getDatesInRange(startDate, endDate)
{
	const date = new Date(startDate.getTime());

	const dates = [];

	while (date <= endDate)
	{
		dates.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}

	return dates;
}

function isSunday(date = new Date())
{
	return date.getDay() === 0;
}

function isMonday(date = new Date())
{
	return date.getDay() === 1;
}

//
function getLang()
{
	if (navigator.languages != undefined)
		return navigator.languages[0];
	return navigator.language;
}
//




function generateCalendar_widg() {
	let year = new Date().getFullYear();
	let month = new Date().getMonth();
	//let month = 0;
	let currentMonth = parseInt(month) + 1;

	let daysLength = daysInMonth(currentMonth, year);
	
	let divs = '';

	const prevLastDay = new Date(
		year,
		month,
		0
	).getDate();

	const firstDayIndex = new Date(year, month, 1).getDay(); //pierwszy dzień miesiąca

	const lastDayIndex = new Date(
		year,
		month,
		0
	).getDay();

	//dodaj dni poprzedniego miesiąca
	if (firstDayIndex == 0)
	{
		for (let x = 7; x > 1; x--)
		{
			divs += `<div class="prev-date_widg"><span>${prevLastDay - x + 2}</span></div>`;
		}
	}
	else
	{
		for (let x = firstDayIndex; x > 1; x--)
		{
			divs += `<div class="prev-date_widg"><span>${prevLastDay - x + 2}</span></div>`;
		}
	}

	//dodaj dni miesiąca
	for (let k = 1; k <= daysLength; k++)
	{
		let newMonth = parseInt(month) + 1;
		newMonth = padWithLeadingZeros(newMonth, 2);

		let newDay = k;
		newDay = padWithLeadingZeros(newDay, 2);

		divs += `<div id="` + year + `-` + newMonth + `-` + newDay + `"><span>${k}</span></div>`;
	}

	//dodaj dni następnego miesiąca
	let lastMonday = getLastMonday(currentMonth, year);
	let lastDateInMonth = new Date(year, month, daysLength);

	let daysCount = getDatesInRange(lastMonday, lastDateInMonth).length + 1;
	let nextDays = 7 - daysCount;
	if (nextDays > 0)
	{
		for (let i = 1; i <= nextDays; i++)
		{
			divs += `<div class="next-date_widg"><span>${i}</span></div>`;
		}

		//if (nextDays >= 1 && nextDays <= 6)
		//{
		//	nextDays = nextDays + 7;
		//	for (let i = 1; i <= nextDays; i++)
		//	{
		//		divs += `<div class="next-date_widg"><span>${i}</span></div>`;
		//	}
		//}
		//else {
		//	for (let i = 1; i <= nextDays; i++)
		//	{
		//		divs += `<div class="next-date_widg"><span>${i}</span></div>`;
		//	}
		//}

	}
	else {
		for (let i = 1; i <= 7; i++) 
		{
			divs += `<div class="next-date_widg"><span>${i}</span></div>`;
		}
	}
	

	//dodaj divy
	$('.days_widg').html(divs);



	//divy
	let spans = document.querySelectorAll('.days_widg div');
	for (let i = 0; i < spans.length; i++) 
	{
		//Święta
		for (let j = 0; j < model_h.length; j++) 
		{
			if (model_h[j].Date.split('T')[0] == spans[i].id) 
			{
				spans[i].setAttribute('title', model_h[j].Name);

				let span = spans[i].querySelector('span');
				$(span).css({
					'color': 'rgb(220, 20, 20)',
				});
			}
		}
        //

		//niedziele
		if (isSunday(new Date(spans[i].id))) {
			let span = spans[i].querySelector('span');
			$(span).css({
				'color': 'rgb(220, 20, 20)',
			});
		}
		//

		//dzisiaj
		let today = new Date();
		today = today.getDate();
		let new_today = new Date(year, month, today + 1).toISOString().split('T')[0];
		
		//if (new Date(spans[i].id).toISOString().split('T')[0] == new Date(year, month, today.getDate())) {
		//	console.log(spans);
		//}
		if (spans[i].id == new_today) {
			$(spans[i]).addClass('ahfjwxcLELZHUbp');
		}

		//console.log(today.getDate());
		//console.log(today.toISOString().split('T')[0]);
		//console.log(new Date(year, month, today.getDate()).toISOString().split('T')[0]);
		
		//
	}


};
generateCalendar_widg();


$('#calendar_widg_previous').on('click', function ()
{
	//document.getElementById("calendar_widg_month").stepDown(1);

});

$('#calendar_widg_next').on('click', function ()
{

});

















