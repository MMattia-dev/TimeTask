
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

//
function getLang()
{
    if (navigator.languages != undefined)
        return navigator.languages[0];
    return navigator.language;
}
//

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



function generateCalendar() {
    //department
    let aFoQOFiXPQobjPX = document.getElementById('SLmdcavhxFjdwWi');
    let departmentID_ = aFoQOFiXPQobjPX.options[aFoQOFiXPQobjPX.selectedIndex].value;
    //

    //worker
    //let oUfnFiNPmXnNjzu = document.getElementById('QcLYVFuvuONgCrh');
    //let workerID_ = oUfnFiNPmXnNjzu.options[oUfnFiNPmXnNjzu.selectedIndex].value;
    //



    //hide hours based on chosen department
    let ywHjDljWKvvCdNr = document.querySelectorAll('#ywHjDljWKvvCdNr');
    for (let i = 0; i < ywHjDljWKvvCdNr.length; i++)
    {
        if (departmentID_ == ywHjDljWKvvCdNr[i].getAttribute('husseznikbzvyea') || ywHjDljWKvvCdNr[i].getAttribute('husseznikbzvyea') == '0')
        {
            $(ywHjDljWKvvCdNr[i]).show();
        }
        else
        {
            $(ywHjDljWKvvCdNr[i]).hide();
        }
    }
    //



    let yearSelect = document.getElementById('IsBAUOIAAHcAfcz');
    let year = yearSelect.options[yearSelect.selectedIndex].value;
    let monthSelect = document.getElementById('DvSHNpXssZqqqtk');
    let month = monthSelect.options[monthSelect.selectedIndex].value;
    let currentMonth = parseInt(month) + 1;

    var daysLength = daysInMonth(currentMonth, year);

    //
    let divs = '';
    for (let i = 0; i < daysLength; i++) 
    {
        
    }
    
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
            divs += `<div class="prev-date2"><span>${prevLastDay - x + 2}</span></div>`;
        }
    }
    else
    {
        for (let x = firstDayIndex; x > 1; x--)
        {
            divs += `<div class="prev-date2"><span>${prevLastDay - x + 2}</span></div>`;
        }
    }

    //dodaj dni miesiąca
    for (let k = 1; k <= daysLength; k++)
    {
        let newMonth = parseInt(month) + 1;
        newMonth = padWithLeadingZeros(newMonth, 2);

        let newDay = k;
        newDay = padWithLeadingZeros(newDay, 2);

        divs += `<div onclick="fYOxqwVQjemgdRd(this)" id="` + year + `-` + newMonth + `-` + newDay + `"><span>${k}</span></div>`;
    }

    //dodaj dni następnego miesiąca
    let lastMonday = getLastMonday(currentMonth, year);
    let lastDateInMonth = new Date(year, month, daysLength);
    
    let daysCount = getDatesInRange(lastMonday, lastDateInMonth).length + 1;
    let nextDays = 7 - daysCount;
    for (let i = 1; i <= nextDays; i++)
    {
        divs += `<div class="next-date2"><span>${i}</span></div>`;
    }

    //dodaj divy
    $('.days_').html(divs);
    

    //divy
    let spans = document.querySelectorAll('.days_ div');
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
                    'font-weight': 'bold',
                });
            }
        }
        //


        //let dateSpan = new Date(spans[i].id);
        //if (isSunday(dateSpan)) {
        //    let span = spans[i].querySelector('span');
        //    $(span).css({
        //        'color': 'rgb(220, 20, 20)',
        //        'font-weight': 'bold',
        //    });
        //}

        //<svg viewBox="0 0 24 24" height="22" width="22">
        //    <path fill="none" d="M0 0h24v24H0z"></path>
        //    <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"></path>
        //</svg>
        if (!$(spans[i]).hasClass('prev-date2') && !$(spans[i]).hasClass('next-date2')) 
        {
            //spans[i].innerHTML += `<svg viewBox="0 0 24 24" height="22" width="22">`
            //    + `<path fill="none" d="M0 0h24v24H0z"></path>`
            //    + `<path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm2 "></path>`
            //    + `</svg>`;
            spans[i].innerHTML += `<input type="checkbox" />`;
        }
        


    }

    //



    //godziny do divów
    for (let i = 0; i < spans.length; i++) {
        //for (let j = 0; j < model_t.length; j++) {
        //    if (model_t[j].Enter.split('T')[0] == spans[i].id) {
        //        let f_ = document.getElementById('QcLYVFuvuONgCrh'); //worker
        //        let f2 = f_.options[f_.selectedIndex].value;

        //        if (f2 == model_t[j].WorkerID) {
        //            spans[i].innerHTML += `<section class="jPigrYSgDbYPGjJ">` + `<span>` + model_t[j].Enter.split('T')[1].split(':')[0] + ':' + model_t[j].Enter.split('T')[1].split(':')[1] + `</span>` + `<span>` + model_t[j].Exit.split('T')[1].split(':')[0] + ':' + model_t[j].Exit.split('T')[1].split(':')[1] + `</span>` + `</section>`;
        //        }
        //    }
        //}
        for (let j = 0; j < model_t.length; j++) {
            //czy urlopy
            if (model_t[j].Enter == null && model_t[j].LeaveDate != null && model_t[j].LeaveDate.split('T')[0] == spans[i].id) 
            {
                //$(spans[i]).addClass('zXCmayRQqBuTbaj');
                //spans[i].innerHTML += `<section class="jPigrYSgDbYPGjJ"><span>Urlop</span></section>`;
                let f_ = document.getElementById('QcLYVFuvuONgCrh'); //worker
                let f2 = f_.options[f_.selectedIndex].value;
                if (f2 == model_t[j].WorkerID) {
                    $(spans[i]).addClass('zXCmayRQqBuTbaj');
                    spans[i].innerHTML += `<section class="jPigrYSgDbYPGjJ edXeNSPzuVuBafm"><span>Urlop</span></section>`;
                }
            }
            //czy czas pracy
            if (model_t[j].Enter != null && model_t[j].LeaveDate == null && model_t[j].Enter.split('T')[0] == spans[i].id)
            {
                let f_ = document.getElementById('QcLYVFuvuONgCrh'); //worker
                let f2 = f_.options[f_.selectedIndex].value;
                if (f2 == model_t[j].WorkerID) {
                    spans[i].innerHTML += `<section class="jPigrYSgDbYPGjJ">` + `<span>` + model_t[j].Enter.split('T')[1].split(':')[0] + ':' + model_t[j].Enter.split('T')[1].split(':')[1] + `</span>` + `<span>` + model_t[j].Exit.split('T')[1].split(':')[0] + ':' + model_t[j].Exit.split('T')[1].split(':')[1] + `</span>` + `</section>`;
                }
            }
        }
    }
    //



    

    //let SxyrJvNcldodWTh = document.querySelector('.SxyrJvNcldodWTh');
    //SxyrJvNcldodWTh.innerHTML = '';
    //for (let i = 1; i <= daysLength; i++)
    //{
    //    SxyrJvNcldodWTh.innerHTML += `<div id="` + year + `-` + padWithLeadingZeros(currentMonth, 2) + `-` + padWithLeadingZeros(i, 2) + `" class="dykKoaHBFtTPjlK">`
    //        + `<span class="KJIBNzKsADLdIeL">` + i + `</span>`
    //        + `<span class="TwzxYLTXdLMRpSd"></span>`
    //        + `<span class="hvxzYIeIBOTysxy"></span>`
    //        + `</div>`;
    //}

    //let SxyrJvNcldodWTh_children = $(SxyrJvNcldodWTh).children();

    //for (let j = 0; j < SxyrJvNcldodWTh_children.length; j++)
    //{
    //    for (let i = 0; i < model_h.length; i++)
    //    {
    //        if (model_h[i].Date.split('T')[0] == SxyrJvNcldodWTh_children[j].id)
    //        {
    //            $(SxyrJvNcldodWTh_children[j]).children().eq(0).addClass('pDBzSpSjrpyyUHr');
    //            $(SxyrJvNcldodWTh_children[j]).children().eq(1).html(model_h[i].Name);
    //        }

    //        let dayName = getDayName(SxyrJvNcldodWTh_children[j].id, getLang() + '-' + getLang().toUpperCase());
    //        $(SxyrJvNcldodWTh_children[j]).children().eq(2).html(dayName);
    //    }
    //}


    //let dykKoaHBFtTPjlK = document.querySelectorAll('.dykKoaHBFtTPjlK');
    //for (let i = 0; i < dykKoaHBFtTPjlK.length; i++) 
    //{
    //    let date = dykKoaHBFtTPjlK[i].id;
    //    for (let j = 0; j < model_t.length; j++) 
    //    {
    //        if (model_t[j].Enter != null && model_t[j].Exit != null) 
    //        {
    //            if (model_t[j].Enter.split('T')[0] == date && model_t[j].Exit.split('T')[0] == date) 
    //            {
    //                //for (let k = 0; k < model_l.length; k++)
    //                //{
    //                //    if (model_l[k].Id == model_t[j].LeaveID)
    //                //    {
    //                //        let name = model_l[k].Name;
    //                //        let description = model_l[k].Description;

    //                //        for (let x = 0; x < model_w.length; x++)
    //                //        {
    //                //            if (model_t[j].WorkerID == model_w[x].Id && departmentID_ == model_w[x].DepartmentID)
    //                //            {
    //                //                if (description != null) 
    //                //                {
    //                //                    dykKoaHBFtTPjlK[i].innerHTML += `<div class="PXHhlPBPzXQFpVg" onclick="yKZSDGYyOfLkUoB(this)" id="` + model_t[j].Id + `">`
    //                //                        + `<span>` + model_w[x].Surname + ` ` + model_w[x].Name + `</span>`
    //                //                        + `<span>` + name + `</span>`
    //                //                        + `<span>(` + description + `)</span>`
    //                //                        + `</div>`;
    //                //                }
    //                //                else 
    //                //                {
    //                //                    dykKoaHBFtTPjlK[i].innerHTML += `<div class="PXHhlPBPzXQFpVg" onclick="yKZSDGYyOfLkUoB(this)" id="` + model_t[j].Id + `">`
    //                //                        + `<span>` + model_w[x].Surname + ` ` + model_w[x].Name + `</span>`
    //                //                        + `<span>` + name + `</span>`
    //                //                        + `</div>`;
    //                //                }
    //                //            }
    //                //        }
    //                //    }
    //                //}


    //            }
    //        }
    //    }
    //}
};


$('#QcLYVFuvuONgCrh').on('change', function ()
{
    generateCalendar();
});

//$('.days_').on('click', function ()
//{
//    let div = this.querySelector('div');
//    alert(div.getAttribute('id'));

//});
function fYOxqwVQjemgdRd(t) {
    //if ($(t).hasClass('fNFlwKQaZMgErcF'))
    //{
    //    $(t).removeClass('fNFlwKQaZMgErcF');
    //}
    //else {
    //    $(t).addClass('fNFlwKQaZMgErcF');
    //}



    //jxiQgKjvVwKXqik
    let svg = $(t).children().eq(1);
    if ($(t).hasClass('fNFlwKQaZMgErcF'))
    {
        //$(svg).remove();
        //t.innerHTML += '<svg viewBox="0 0 24 24" height="22" width="22"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm2 "></path></svg>';
        $(t).removeClass('fNFlwKQaZMgErcF');
        $(t).children().eq(1).prop("checked", false);
    }
    else {
        //$(svg).remove();
        //t.innerHTML += '<svg class="jxiQgKjvVwKXqik" viewBox="0 0 24 24" height="22" width="22"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"></path></svg>';
        $(t).addClass('fNFlwKQaZMgErcF');
        $(t).children().eq(1).prop("checked", true);
    }

};


function PTPttVhoaMyUOyR()
{
    document.getElementById('QcLYVFuvuONgCrh').innerHTML = '';

    let aFoQOFiXPQobjPX = document.getElementById('SLmdcavhxFjdwWi');
    let departmentID_ = aFoQOFiXPQobjPX.options[aFoQOFiXPQobjPX.selectedIndex].value;

    for (let i = 0; i < model_w.length; i++)
    {
        if (model_w[i].DepartmentID == departmentID_)
        {
            document.getElementById('QcLYVFuvuONgCrh').innerHTML += `<option value="` + model_w[i].Id + `" id="` + model_w[i].DepartmentID + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
        }
    }
    //document.getElementById('QcLYVFuvuONgCrh').innerHTML += `<option value="everyone">Wszyscy</option>`;

    generateCalendar();  
};
PTPttVhoaMyUOyR();

function ZJRABLNnRtfPJYl()
{
    generateCalendar();
};

$('#IsBAUOIAAHcAfcz').on('change', function ()
{
    generateCalendar();
});

$('#bCYkzWQqVqBfZXu').on('click', function ()
{
    let e = document.getElementById('JiEZMNdUHgcYMIC');
    let e_ = document.getElementById('SLmdcavhxFjdwWi');
    let e2 = e_.options[e_.selectedIndex].value;
    e.value = e2;



    let id = e.options[e.selectedIndex].value;
    document.getElementById('HGrUdGnLanXMPiV').innerHTML = '';

    for (let i = 0; i < model_w.length; i++) 
    {
        if (model_w[i].DepartmentID == id) 
        {
            document.getElementById('HGrUdGnLanXMPiV').innerHTML += `<option value="` + model_w[i].Id + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
        }
    }

    let f = document.getElementById('HGrUdGnLanXMPiV');
    let f_ = document.getElementById('QcLYVFuvuONgCrh');
    let f2 = f_.options[f_.selectedIndex].value;
    f.value = f2;




    $('#GMyOrJWVImvTfZX').fadeIn(200);
});

$('#ZjgbqxHhgxIGJgv').on('click', function ()
{
    $('#GMyOrJWVImvTfZX').fadeOut(200);
});

$('#ojfoDQUNdsorzcr').on('click', function ()
{
    let e = document.getElementById('vEWCfPdwZDQYZtg');
    let e_ = document.getElementById('SLmdcavhxFjdwWi');
    let e2 = e_.options[e_.selectedIndex].value;
    e.value = e2;


    let id = e.options[e.selectedIndex].value;
    document.getElementById('IzAjfDukSqEvnTJ').innerHTML = '';

    for (let i = 0; i < model_w.length; i++) 
    {
        if (model_w[i].DepartmentID == id) 
        {
            document.getElementById('IzAjfDukSqEvnTJ').innerHTML += `<option value="` + model_w[i].Id + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
        }
    }

    let f = document.getElementById('IzAjfDukSqEvnTJ');
    let f_ = document.getElementById('QcLYVFuvuONgCrh');
    let f2 = f_.options[f_.selectedIndex].value;
    f.value = f2;




    $('#UVrUwxmwuexyrPA').fadeIn(200);
});

$('#YtRNzXKyHTWrYyd').on('click', function ()
{
    $('#UVrUwxmwuexyrPA').fadeOut(200);
});



$('#BEUBKWapUSakQZq').on('click', function ()
{
    let e = document.getElementById('iuPSBJtXmKAXNMO');
    let e_ = document.getElementById('SLmdcavhxFjdwWi');
    let e2 = e_.options[e_.selectedIndex].value;
    e.value = e2;

    $('#zlQCJFwonYLdfrb').fadeIn(200);
});

$('#oXdxMTRERExKWkw').on('click', function ()
{
    $('#zlQCJFwonYLdfrb').fadeOut(200);
});

$('#imyjASpHfqOzhrU').on('click', function ()
{
    let deparmentID_ = document.getElementById('iuPSBJtXmKAXNMO');
    let dep = deparmentID_.options[deparmentID_.selectedIndex].value;
    let od_ = document.getElementById('ZjabMAAUQXFJECW').value;
    let do_ = document.getElementById('RYlxVBsGwpGbang').value;

    let godzinaOD = '0001-01-01 ' + od_;
    let godzinaDO = '0001-01-01 ' + do_;

    if (od_ != '' && do_ != '') 
    {
        if (dep != 'everyone')
        {
            $.ajax({
                type: 'POST',
                url: '/Hours/AddHours',
                data: {
                    departmentID: dep,
                    enter: godzinaOD,
                    exit: godzinaDO,
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
        else
        {
            $.ajax({
                type: 'POST',
                url: '/Hours/AddHours',
                data: {
                    departmentID: null,
                    enter: godzinaOD,
                    exit: godzinaDO,
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

function iuzEPRgOsIttMeH(t) {
    let id_ = t.getAttribute('FwQCFbYkSPqbBGw');

    sessionStorage.setItem('ADSiITSrPqWlzKR', id_)

    for (let i = 0; i < model_hours.length; i++) {
        if (model_hours[i].Id == id_) {
            let enter = model_hours[i].Enter.split('T')[1];
            let exit = model_hours[i].Exit.split('T')[1];

            enter = enter.split(':')[0] + ':' + enter.split(':')[1];
            exit = exit.split(':')[0] + ':' + exit.split(':')[1];
            
            document.getElementById('aECtMXTycAccqpJ').value = enter;
            document.getElementById('uZmtnFFAYylfMnt').value = exit;
        }
    }

    $('#YCvtsCrDCOghwqE').fadeIn(200);
};

$('#bolxvOrRIqnSaCK').on('click', function ()
{
    $('#YCvtsCrDCOghwqE').fadeOut(200);
});

$('#QUyuGRfECVFxEJZ').on('click', function ()
{
    let id_ = sessionStorage.getItem('ADSiITSrPqWlzKR');
    let dep = null;

    for (let i = 0; i < model_hours.length; i++) {
        if (model_hours[i].Id == id_) {
            dep = model_hours[i].DepartmentID;
        }
    }

    let godzinaOD = document.getElementById('aECtMXTycAccqpJ').value;
    let godzinaDO = document.getElementById('uZmtnFFAYylfMnt').value;
    godzinaOD = '0001-01-01 ' + godzinaOD;
    godzinaDO = '0001-01-01 ' + godzinaDO;

    $.ajax({
        type: 'POST',
        url: '/Hours/EditHours',
        data: {
            id: id_,
            departmentID: dep,
            enter: godzinaOD,
            exit: godzinaDO,
        },
        success: function (response)
        {
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error updating value:', error);
        }
    });
});

function IjmlWUclbmyLfQN(t) {
    let id_ = t.getAttribute('IPgOeCVXUkMyujw');

    sessionStorage.setItem('kaMmojlEkfZKRTO', id_);

    let span = $(t).parent().parent().children().children().html();
    $('#hKRDBpQKBFycjxr').html(span);

    $('#mcBWFIwkBOgyjaJ').fadeIn(200);
};

$('#txdAzUSvicNRywk').on('click', function ()
{
    let id_ = sessionStorage.getItem('kaMmojlEkfZKRTO');

    $.ajax({
        type: 'POST',
        url: '/Hours/RemoveHours',
        data: {
            id: id_,
        },
        success: function (response)
        {
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error removing value:', error);
        }
    });
});

$('#juWEysZaDAWhIte').on('click', function ()
{
    $('#mcBWFIwkBOgyjaJ').fadeOut(200);
});

$('#XlTBIHFmaFNdQpf').on('click', function ()
{
    let array = [];
    let arrayWeekends = [];
    let arrayHolidays = [];
    for (let i = 0; i < model_h.length; i++) {
        arrayHolidays.push(model_h[i].Date.split('T')[0]);
    }


    let HGrUdGnLanXMPiV = document.getElementById('HGrUdGnLanXMPiV');
    let workerID_ = HGrUdGnLanXMPiV.options[HGrUdGnLanXMPiV.selectedIndex].value;

    //XrBSocHBgWCNkMI od
    //BjCnfIRbIUPPIlg do
    let XrBSocHBgWCNkMI = document.getElementById('XrBSocHBgWCNkMI').value;
    let BjCnfIRbIUPPIlg = document.getElementById('BjCnfIRbIUPPIlg').value;

    //hHxPpWcyrsBIhwv data od
    //avLWWBBFqQUeqZZ data do
    let hHxPpWcyrsBIhwv = document.getElementById('hHxPpWcyrsBIhwv').value;
    let avLWWBBFqQUeqZZ = document.getElementById('avLWWBBFqQUeqZZ').value;


    if (XrBSocHBgWCNkMI != '' && BjCnfIRbIUPPIlg != '' && hHxPpWcyrsBIhwv != '' && avLWWBBFqQUeqZZ != '') 
    {
        let dates = getDatesInRange(new Date(hHxPpWcyrsBIhwv), new Date(avLWWBBFqQUeqZZ));
        if (dates != null) 
        {
            for (let i = 0; i < dates.length; i++) 
            {
                array.push(dates[i].toISOString().split('T')[0]);
                if (isWeekend(dates[i])) {
                    arrayWeekends.push(dates[i].toISOString().split('T')[0]);
                }
            }
        }
    }



    //pierwszy zaznaczony drugi odznaczony
    if (document.getElementById('maTQQtSvXiTTwOk').checked == true && document.getElementById('wwyBXlaFoImkAmV').checked == false) 
    {
        array = array.filter(function (el, index)
        {
            return arrayHolidays.indexOf(el) < 0;
        });
    }

    //pierwszy odznaczony drugi zaznaczony
    if (document.getElementById('maTQQtSvXiTTwOk').checked == false && document.getElementById('wwyBXlaFoImkAmV').checked == true)
    {
        array = array.filter(function (el, index)
        {
            return arrayWeekends.indexOf(el) < 0;
        });
    }

    //pierwszy zaznaczony drugi zaznaczony
    if (document.getElementById('maTQQtSvXiTTwOk').checked == true && document.getElementById('wwyBXlaFoImkAmV').checked == true)
    {
        //
    }

    //pierwszy odznaczony drugi odznaczony
    if (document.getElementById('maTQQtSvXiTTwOk').checked == false && document.getElementById('wwyBXlaFoImkAmV').checked == false)
    {
        array = array.filter(function (el, index)
        {
            return arrayHolidays.indexOf(el) < 0;
        });

        array = array.filter(function (el, index)
        {
            return arrayWeekends.indexOf(el) < 0;
        });
    }

    array = [...new Set(array)]


    // 27.09.2023
    let toRemove = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < model_t.length; j++)
        {
            if (model_t[j].Enter != null && model_t[j].WorkerID == workerID_ && model_t[j].Enter.split('T')[0] == array[i] || model_t[j].LeaveDate != null && model_t[j].WorkerID == workerID_ && model_t[j].LeaveDate.split('T')[0] == array[i])
            {
                toRemove.push(array[i]);
            }
        }
    }
    var toRemove_new = [...new Set(toRemove)];
    toRemove_new.sort();
    array = array.filter((el) => !toRemove_new.includes(el)); //usun wszystkie powtarzajace sie daty
    //


    if (array.length > 0)
    {
        for (let i = 0; i < array.length; i++)
        {
            if (workerID_ != 0 || workerID_ != '0' || workerID_ != null) {
                $.ajax({
                    type: 'POST',
                    url: '/Times/AddTime',
                    data: {
                        workerID: workerID_,
                        enter: array[i] + ' ' + XrBSocHBgWCNkMI,
                        exit: array[i] + ' ' + BjCnfIRbIUPPIlg,
                        leaveID: null,
                        leaveDate: null
                    },
                    success: function (response)
                    {
                        location.reload();
                    },
                    error: function (xhr, status, error)
                    {
                        console.log('Error adding column value:', error);
                    }
                });
            }
        }
    }
    else {
        console.log('empty');
    }
});



$('#JiEZMNdUHgcYMIC').on('change', function ()
{
    let e = document.getElementById('JiEZMNdUHgcYMIC');
    let id = e.options[e.selectedIndex].value;
    document.getElementById('HGrUdGnLanXMPiV').innerHTML = '';

    for (let i = 0; i < model_w.length; i++) 
    {
        if (model_w[i].DepartmentID == id) 
        {
            document.getElementById('HGrUdGnLanXMPiV').innerHTML += `<option value="` + model_w[i].Id + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
        }
    }
});

$('#QvXboIjjKTrEMMB').on('click', function ()
{
    let array = [];

    let IzAjfDukSqEvnTJ = document.getElementById('IzAjfDukSqEvnTJ');
    let workerID_ = IzAjfDukSqEvnTJ.options[IzAjfDukSqEvnTJ.selectedIndex].value;

    //BFdfdwwTBJroPRV data od
    //hxqNvUIYSzvpSnu data do
    let BFdfdwwTBJroPRV = document.getElementById('BFdfdwwTBJroPRV').value;
    let hxqNvUIYSzvpSnu = document.getElementById('hxqNvUIYSzvpSnu').value;

    if (BFdfdwwTBJroPRV != '' && hxqNvUIYSzvpSnu != '') 
    {
        let dates = getDatesInRange(new Date(BFdfdwwTBJroPRV), new Date(hxqNvUIYSzvpSnu));

        for (let i = 0; i < model_t.length; i++) 
        {
            for (let j = 0; j < dates.length; j++) 
            {
                //if (model_t[i].Enter.split('T')[0] == dates[j].toISOString().split('T')[0] && model_t[i].Exit.split('T')[0] == dates[j].toISOString().split('T')[0] && workerID_ == model_t[i].WorkerID)
                //{
                //    array.push(model_t[i].Id);
                //}
                if (model_t[i].Enter != null && model_t[i].Enter.split('T')[0] == dates[j].toISOString().split('T')[0] && model_t[i].Exit.split('T')[0] == dates[j].toISOString().split('T')[0] && workerID_ == model_t[i].WorkerID)
                {
                    array.push(model_t[i].Id);
                }
            }
        }
    }

    for (let i = 0; i < array.length; i++) 
    {
        $.ajax({
            type: 'POST',
            url: '/Times/RemoveTime',
            data: {
                id: array[i]
            },
            success: function (response)
            {
                location.reload();
            },
            error: function (xhr, status, error)
            {
                console.log('Error removing value:', error);
            }
        });
    }
});

$('#gPyHcTBhSRhkIHB').on('click', function ()
{
    let QcLYVFuvuONgCrh = document.getElementById('QcLYVFuvuONgCrh');
    let workerID_ = QcLYVFuvuONgCrh.options[QcLYVFuvuONgCrh.selectedIndex].value;

    let godzinaOD = document.getElementById('YYooSdVQmSBFOBy').value;
    let godzinaDO = document.getElementById('aOWPsQLgDIjpTqI').value;

    if (godzinaOD && godzinaDO) {
        //let days = document.querySelectorAll('.fNFlwKQaZMgErcF');
        //if (days.length > 0) {
        //    for (let i = 0; i < days.length; i++) {
        //        let date = days[i].id;
                
        //        $.ajax({
        //            type: 'POST',
        //            url: '/Times/AddTime',
        //            data: {
        //                workerID: workerID_,
        //                enter: date + ' ' + godzinaOD,
        //                exit: date + ' ' + godzinaDO,
        //                leaveID: null,
        //                leaveDate: null
        //            },
        //            success: function (response)
        //            {
        //                location.reload();
        //            },
        //            error: function (xhr, status, error)
        //            {
        //                console.log('Error adding column value:', error);
        //            }
        //        });
        //    }
        //}

        let days = document.querySelectorAll('.fNFlwKQaZMgErcF');

        let array = [];
        for (let i = 0; i < days.length; i++)
        {
            array.push(days[i].id);
        }

        // 27.09.2023
        let toRemove = [];
        for (let i = 0; i < array.length; i++)
        {
            for (let j = 0; j < model_t.length; j++)
            {
                if (model_t[j].Enter != null && model_t[j].WorkerID == workerID_ && model_t[j].Enter.split('T')[0] == array[i] || model_t[j].LeaveDate != null && model_t[j].WorkerID == workerID_ && model_t[j].LeaveDate.split('T')[0] == array[i])
                {
                    toRemove.push(array[i]);
                }
            }
        }
        var toRemove_new = [...new Set(toRemove)];
        toRemove_new.sort();
        array = array.filter((el) => !toRemove_new.includes(el)); //usun wszystkie powtarzajace sie daty
        //

        if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {

                let date = array[i];

                if (workerID_ != 0 || workerID_ != '0' || workerID_ != null) {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/AddTime',
                        data: {
                            workerID: workerID_,
                            enter: date + ' ' + godzinaOD,
                            exit: date + ' ' + godzinaDO,
                            leaveID: null,
                            leaveDate: null
                        },
                        success: function (response)
                        {
                            location.reload();
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding column value:', error);
                        }
                    });
                }
            }
        }


    }
});

$('#nhklYOXterdPTwH').on('click', function ()
{
    let QcLYVFuvuONgCrh = document.getElementById('QcLYVFuvuONgCrh');
    let workerID_ = QcLYVFuvuONgCrh.options[QcLYVFuvuONgCrh.selectedIndex].value;

    let days = document.querySelectorAll('.fNFlwKQaZMgErcF');
    if (days.length > 0) {

        for (let i = 0; i < model_t.length; i++) {
            for (let j = 0; j < days.length; j++) {
                if (model_t[i].Enter != null && workerID_ == model_t[i].WorkerID && days[j].id == model_t[i].Enter.split('T')[0])
                {
                    let id_ = model_t[i].Id;
                    
                    $.ajax({
                        type: 'POST',
                        url: '/Times/RemoveTime',
                        data: {
                            id: id_
                        },
                        success: function (response)
                        {
                            location.reload();
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error removing value:', error);
                        }
                    });
                }
            }
        }
    }
});

function pQuWaMlNxUyZxiq(t) {
    let QcLYVFuvuONgCrh = document.getElementById('QcLYVFuvuONgCrh');
    let workerID_ = QcLYVFuvuONgCrh.options[QcLYVFuvuONgCrh.selectedIndex].value;

    let godzinaOD = t.innerText.split(' - ')[0];
    let godzinaDO = t.innerText.split(' - ')[1];

    let days = document.querySelectorAll('.fNFlwKQaZMgErcF');
    //if (days.length > 0)
    //{
    //    for (let i = 0; i < days.length; i++)
    //    {
    //        let date = days[i].id;

    //        $.ajax({
    //            type: 'POST',
    //            url: '/Times/AddTime',
    //            data: {
    //                workerID: workerID_,
    //                enter: date + ' ' + godzinaOD,
    //                exit: date + ' ' + godzinaDO,
    //                leaveID: null,
    //                leaveDate: null
    //            },
    //            success: function (response)
    //            {
    //                location.reload();
    //            },
    //            error: function (xhr, status, error)
    //            {
    //                console.log('Error adding column value:', error);
    //            }
    //        });
    //    }
    //}

    let array = [];
    for (let i = 0; i < days.length; i++) {
        array.push(days[i].id);
    }

    // 27.09.2023
    let toRemove = [];
    for (let i = 0; i < array.length; i++)
    {
        for (let j = 0; j < model_t.length; j++)
        {
            if (model_t[j].Enter != null && model_t[j].WorkerID == workerID_ && model_t[j].Enter.split('T')[0] == array[i] || model_t[j].LeaveDate != null && model_t[j].WorkerID == workerID_ && model_t[j].LeaveDate.split('T')[0] == array[i])
            {
                toRemove.push(array[i]);
            }
        }
    }
    var toRemove_new = [...new Set(toRemove)];
    toRemove_new.sort();
    array = array.filter((el) => !toRemove_new.includes(el)); //usun wszystkie powtarzajace sie daty
    //

    if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            //console.log(array[i]);

            let date = array[i];

            if (workerID_ != 0 || workerID_ != '0' || workerID_ != null) {
                $.ajax({
                    type: 'POST',
                    url: '/Times/AddTime',
                    data: {
                        workerID: workerID_,
                        enter: date + ' ' + godzinaOD,
                        exit: date + ' ' + godzinaDO,
                        leaveID: null,
                        leaveDate: null
                    },
                    success: function (response)
                    {
                        location.reload();
                    },
                    error: function (xhr, status, error)
                    {
                        console.log('Error adding column value:', error);
                    }
                });
            }
        }
    }
};







$(document).ready(function ()
{
    generateCalendar();
});