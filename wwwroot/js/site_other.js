setInterval(() =>
{
	d = new Date(); //object of date()
	hr = d.getHours();
	min = d.getMinutes();
	sec = d.getSeconds();
	hr_rotation = 30 * hr + min / 2; //converting current time
	min_rotation = 6 * min;
	sec_rotation = 6 * sec;

	const hour = document.getElementById('hour');
	const minute = document.getElementById('minute');
	const second = document.getElementById('second');

	if (hour != null)
	{
		hour.style.transform = `rotate(${hr_rotation}deg)`;
	}
	if (minute != null)
	{
		minute.style.transform = `rotate(${min_rotation}deg)`;
	}
	if (second != null)
	{
		second.style.transform = `rotate(${sec_rotation}deg)`;
	}

	//clockSpanID
	if (document.getElementById("clockSpanID") != null)
	{
		document.getElementById("clockSpanID").innerHTML = ('0' + hr).slice(-2) + ":" + ('0' + min).slice(-2) + ":" + ('0' + sec).slice(-2);
	}
}, 1000);


var widg_list = ["widg1", "widg2", "widg3", "widg4", "widg5", "widg6"];
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
			if ($('.quickNotepad').hasClass('cJeYzlOltXRHMNK'))
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

function grabAndDrab6()
{
	$('#widg6').draggable({
		//revert: true,
		handle: $('#widg6_handle'),
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
grabAndDrab6();





$('#LldXkbnodmhlJIn').on('click', function ()
{
	$('.aLTkEQlLIqOrXvT').fadeIn(200);
});

$('#rCnoNzileMKWYLc').on('click', function ()
{
	$('.aLTkEQlLIqOrXvT').fadeOut(200);
});

$('#xcMbuPyBDAClZLf').on('click', function () {
	$('#aZVwWFKbYTeoWFY').fadeOut(200);

	let nIuUYPMpJnDKAdU = document.querySelectorAll('#nIuUYPMpJnDKAdU');
	let eHtCczehqWNQbOp = document.querySelectorAll('#eHtCczehqWNQbOp');

	setTimeout(function ()
	{
		document.getElementById('tAnrJNlkpUSBwYm').setAttribute('readonly', '');
		document.getElementById('mmoyAbgbxQKYSoj').setAttribute('readonly', '');
		document.getElementById('ZCzfTXZrzTrrevD').setAttribute('readonly', '');
		//$('#oJBIgYGPcPhAnBT').parent().hide();
		document.getElementById('oJBIgYGPcPhAnBT').setAttribute('disabled', '');
		$('#mwWoomQJyONfwSI').removeClass('MAPQjnLFJnlRyhu');
		$('#mwWoomQJyONfwSI').children().eq(0).show();
		$('#mwWoomQJyONfwSI').children().eq(1).hide();

		for (let i = 0; i < nIuUYPMpJnDKAdU.length; i++) 
		{
			$(nIuUYPMpJnDKAdU[i]).show();
		}
		for (let i = 0; i < eHtCczehqWNQbOp.length; i++)
		{
			$(eHtCczehqWNQbOp[i]).hide();
		}

	}, 250);
	
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



function GnOVtpeUPfxjSRq()
{
	let quickNotepad = document.querySelector('#widg3'); //#widg3 .quickNotepad
	if ($(quickNotepad).hasClass('cJeYzlOltXRHMNK'))
	{
		$('#yaSffAvBMRaDXMN').hide(); //.rzVCoiMyvGxrbEa
		$('#tNQKplspKGJSQLU').show(); //.MprLrIoIAXLqljb
	}
	else
	{
		$('#yaSffAvBMRaDXMN').show(); //.rzVCoiMyvGxrbEa
		$('#tNQKplspKGJSQLU').hide(); //.MprLrIoIAXLqljb
	}
};
GnOVtpeUPfxjSRq();

$('#yaSffAvBMRaDXMN').on('click', function ()
{
	$(this).parent().addClass('cJeYzlOltXRHMNK'); //PyfcxvgCKODayJL

	$(this).parent().animate({
		width: "410px",
		height: "410px",
	}, 500);

	GnOVtpeUPfxjSRq();
});

$('#tNQKplspKGJSQLU').on('click', function ()
{
	$(this).parent().removeClass('cJeYzlOltXRHMNK');

	$(this).parent().animate({
		width: "200px",
		height: "200px",
	}, 500);

	GnOVtpeUPfxjSRq();
});



function cgpUUZVxGDJVnXk()
{
	let przypomnienia = document.querySelector('.quickNotepad.ECaaSDRIYJCuREK');
	if ($(przypomnienia).hasClass('sZuNsiVOUnHcqbL'))
	{
		$('.rzVCoiMyvGxrbEa.rzVCoiMyvGxrbEa_').hide();
		$('.MprLrIoIAXLqljb.MprLrIoIAXLqljb_').show();
	}
	else
	{
		$('.rzVCoiMyvGxrbEa.rzVCoiMyvGxrbEa_').show();
		$('.MprLrIoIAXLqljb.MprLrIoIAXLqljb_').hide();
	}
}
cgpUUZVxGDJVnXk();

$('#yrHcVnwJhiNRpeh').on('click', function ()
{
	$(this).parent().addClass('sZuNsiVOUnHcqbL');
	$(this).parent().addClass('sZuNsiVOUnHcqbL_');

	$(this).parent().animate({
		width: "410px",
		height: "410px",
	}, 500);

	cgpUUZVxGDJVnXk();
});

$('#MyASZDrJkXegceG').on('click', function ()
{
	$(this).parent().removeClass('sZuNsiVOUnHcqbL');
	$(this).parent().removeClass('sZuNsiVOUnHcqbL_');

	$(this).parent().animate({
		width: "200px",
		height: "200px",
	}, 500);

	cgpUUZVxGDJVnXk();
});





$(document).ready(function ()
{
	
});




$('#cKyQznqiHBCNqod').on('click', function ()
{
	//wyczysc pola

	$('#SifCPThsCoyHbct').fadeIn(200);
});

$('#ueUfjQYGkUvCTDV').on('click', function ()
{
	$('#SifCPThsCoyHbct').fadeOut(200);
});

$('#CKwCPBbYtspreJT').on('click', function ()
{
	let uID = sessionStorage.getItem('XqeDUTCSnAFTQgb');
	let title_ = document.getElementById('fFWegXyYZmbBpEN').value;
	let string = document.getElementById('ITnLhNHsrVsLMlU').value;
	let date = document.getElementById('SxtTxveciNblgyY').value;

	if (document.getElementById('ssVGkNItXJosOsP').selectedIndex == 0)
	{
		if (uID.length > 0 && title_.length > 0 && date.length > 0)
		{
			$.ajax({
				type: 'POST',
				url: '/Home/AddReminder',
				data: {
					userID: uID,
					title: title_,
					reminderDescription: string,
					remindDate: date,
				},
				success: function (response)
				{
					location.reload();
				},
				error: function (xhr, status, error)
				{
					console.log('Error adding value:', error);
				}
			});
		}
	}
	else if (document.getElementById('ssVGkNItXJosOsP').selectedIndex == 1)
	{
		if (uID.length > 0 && title_.length > 0)
		{
			$.ajax({
				type: 'POST',
				url: '/Home/AddReminder',
				data: {
					userID: uID,
					title: title_,
					reminderDescription: string,
					remindDate: date,
				},
				success: function (response)
				{
					location.reload();
				},
				error: function (xhr, status, error)
				{
					console.log('Error adding value:', error);
				}
			});
		}
	}
});

//przypomnienia
function SFnCnjucFGPsUMa(t) {

	//zbzEzYandOHZEfD - hide
	$('#zbzEzYandOHZEfD').show();

	//mmoyAbgbxQKYSoj - textarea id
	//aMPKLBaWjjzJFbN - item.id

	let title = $(t).children().eq(0).html();
	let desc = $(t).children().eq(1).html();
	let date = $(t).children().eq(2);

	$('#tAnrJNlkpUSBwYm').val(title);
	$('#mmoyAbgbxQKYSoj').html(desc);

	if (date.html().length > 0) {
		let innerDate = $(date).attr('opbzatsfbcoqxrk').split(' ')[0];
		
		let year = innerDate.split('.')[2];
		let month = parseInt(innerDate.split('.')[1]) - 1;
		let day = parseInt(innerDate.split('.')[0]) + 1;
		let wholeDate = new Date(year, month, day);
		$('#ZCzfTXZrzTrrevD').val(wholeDate.toISOString().split('T')[0]);
	}

	$('#aZVwWFKbYTeoWFY').fadeIn(200);
};

//notatki
function QtokgKHdkxlbOgO(t) {
	//zbzEzYandOHZEfD - hide
	$('#zbzEzYandOHZEfD').hide();

	let title = $(t).children().eq(0).html();
	let desc = $(t).children().eq(1).html();

	$('#tAnrJNlkpUSBwYm').val(title);
	$('#mmoyAbgbxQKYSoj').html(desc);
	$('#ZCzfTXZrzTrrevD').val(null);

	$('#aZVwWFKbYTeoWFY').fadeIn(200);
};

//przypomnienia
function przypomnienia() {
	document.getElementById('avFbWLrryTfbsfN_').checked = true;
	$('#avFbWLrryTfbsfN').addClass('XeTGvGxHJzYJimR');
	$('#kEWZMkOkYppAIql').removeClass('XeTGvGxHJzYJimR');

	let przypomnienia_ids = document.querySelectorAll('#przypomnienia_id');
	let notatki_ids = document.querySelectorAll('#notatki_id');

	for (let i = 0; i < przypomnienia_ids.length; i++) 
	{
		$(przypomnienia_ids[i]).show();
	}

	for (let i = 0; i < notatki_ids.length; i++)
	{
		$(notatki_ids[i]).hide();
	}
};

//notatki
function notatki() {
	document.getElementById('kEWZMkOkYppAIql_').checked = true;
	$('#kEWZMkOkYppAIql').addClass('XeTGvGxHJzYJimR');
	$('#avFbWLrryTfbsfN').removeClass('XeTGvGxHJzYJimR');

	let przypomnienia_ids = document.querySelectorAll('#przypomnienia_id');
	let notatki_ids = document.querySelectorAll('#notatki_id');

	for (let i = 0; i < przypomnienia_ids.length; i++) 
	{
		$(przypomnienia_ids[i]).hide();
	}

	for (let i = 0; i < notatki_ids.length; i++)
	{
		$(notatki_ids[i]).show();
	}
};

//przypomnienia
$('#avFbWLrryTfbsfN').on('click', function ()
{
	sessionStorage.removeItem('xwyVpyzcHmPkwMO');
	przypomnienia();
});

//notatki
$('#kEWZMkOkYppAIql').on('click', function ()
{
	sessionStorage.setItem('xwyVpyzcHmPkwMO', 'true');
	notatki();
});

function PrzypomnieniaNotatki() {
	if (sessionStorage.getItem('xwyVpyzcHmPkwMO') == null)
	{
		//document.getElementById('avFbWLrryTfbsfN_').checked = true;
		//$('#avFbWLrryTfbsfN').addClass('XeTGvGxHJzYJimR');
		//$('#kEWZMkOkYppAIql').removeClass('XeTGvGxHJzYJimR');
		przypomnienia();
	}
	else
	{
		//document.getElementById('kEWZMkOkYppAIql_').checked = true;
		//$('#kEWZMkOkYppAIql').addClass('XeTGvGxHJzYJimR');
		//$('#avFbWLrryTfbsfN').removeClass('XeTGvGxHJzYJimR');
		notatki();
	}
};
PrzypomnieniaNotatki();

$('#ssVGkNItXJosOsP').on('change', function ()
{
	//$('#iGxMAezVPdacNFH').hide();
	//console.log($(this).val());
	//console.log(document.getElementById('ssVGkNItXJosOsP').selectedIndex);
	if (document.getElementById('ssVGkNItXJosOsP').selectedIndex == 0)
	{
		$('#iGxMAezVPdacNFH').show();
	}
	else if (document.getElementById('ssVGkNItXJosOsP').selectedIndex == 1) {
		$('#iGxMAezVPdacNFH').hide();
	}
});

$('#mwWoomQJyONfwSI').on('click', function ()
{
	let nIuUYPMpJnDKAdU = document.querySelectorAll('#nIuUYPMpJnDKAdU');
	let eHtCczehqWNQbOp = document.querySelectorAll('#eHtCczehqWNQbOp');

	if ($(this).hasClass('MAPQjnLFJnlRyhu'))
	{
		document.getElementById('tAnrJNlkpUSBwYm').setAttribute('readonly', '');
		document.getElementById('mmoyAbgbxQKYSoj').setAttribute('readonly', '');
		document.getElementById('ZCzfTXZrzTrrevD').setAttribute('readonly', '');
		//$('#oJBIgYGPcPhAnBT').parent().hide();
		document.getElementById('oJBIgYGPcPhAnBT').setAttribute('disabled', '');
		$('#mwWoomQJyONfwSI').removeClass('MAPQjnLFJnlRyhu');
		$('#mwWoomQJyONfwSI').children().eq(0).show();
		$('#mwWoomQJyONfwSI').children().eq(1).hide();

		for (let i = 0; i < nIuUYPMpJnDKAdU.length; i++) 
		{
			$(nIuUYPMpJnDKAdU[i]).show();
		}
		for (let i = 0; i < eHtCczehqWNQbOp.length; i++)
		{
			$(eHtCczehqWNQbOp[i]).hide();
		}
	}
	else {
		document.getElementById('tAnrJNlkpUSBwYm').removeAttribute('readonly');
		document.getElementById('mmoyAbgbxQKYSoj').removeAttribute('readonly');
		document.getElementById('ZCzfTXZrzTrrevD').removeAttribute('readonly');
		//$('#oJBIgYGPcPhAnBT').parent().show();
		document.getElementById('oJBIgYGPcPhAnBT').removeAttribute('disabled');
		$('#mwWoomQJyONfwSI').addClass('MAPQjnLFJnlRyhu');
		$('#mwWoomQJyONfwSI').children().eq(0).hide();
		$('#mwWoomQJyONfwSI').children().eq(1).show();

		for (let i = 0; i < nIuUYPMpJnDKAdU.length; i++) 
		{
			$(nIuUYPMpJnDKAdU[i]).hide();
		}
		for (let i = 0; i < eHtCczehqWNQbOp.length; i++)
		{
			$(eHtCczehqWNQbOp[i]).show();
		}
	}
});








