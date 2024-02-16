
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

//function getDayName(dateStr, locale)
//{
//    var date = new Date(dateStr);
//    return date.toLocaleDateString(locale, { weekday: 'long' });
//};

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
function generateNewTable() 
{
    //year
    let year = document.getElementById('IsBAUOIAAHcAfcz').value;
    //department
    let SLmdcavhxFjdwWi = document.getElementById('SLmdcavhxFjdwWi').value;
    //worker
    let QcLYVFuvuONgCrh = document.getElementById('QcLYVFuvuONgCrh').value;



    document.getElementById('xhXEyORRmmYlQgG').innerHTML = '';

    document.getElementById('xhXEyORRmmYlQgG').innerHTML = `<thead><tr><th></th><th>Styczeń</th><th>Luty</th><th>Marzec</th><th>Kwiecień</th><th>Maj</th><th>Czerwiec</th><th>Lipiec</th><th>Sierpień</th><th>Wrzesień</th><th>Październik</th><th>Listopad</th><th>Grudzień</th></tr></thead>`;

    for (let i = 1; i <= 31; i++) 
    {
        document.getElementById('xhXEyORRmmYlQgG').innerHTML += `<tbody><tr><td>` + i + `</td><td id="` + year + `-1-` + i + `"></td><td id="` + year + `-2-` + i + `"></td><td id="` + year + `-3-` + i + `"></td><td id="` + year + `-4-` + i + `"></td><td id="` + year + `-5-` + i + `"></td><td id="` + year + `-6-` + i + `"></td><td id="` + year + `-7-` + i + `"></td><td id="` + year + `-8-` + i + `"></td><td id="` + year + `-9-` + i + `"></td><td id="` + year + `-10-` + i + `"></td><td id="` + year + `-11-` + i + `"></td><td id="` + year + `-12-` + i + `"></td></tr></tbody>`;
    }

    let TDs = document.querySelectorAll('#xhXEyORRmmYlQgG tbody tr td:not(:first-child)');
    for (let i = 0; i < TDs.length; i++) 
    {
        TDs[i].innerHTML += `<div id="NGWhvCmkPUIWclY">` + //onmouseout="xGCnnFtbrNPSNPm(this)" onmouseover="bxLcBeaOvMopDll(this)"
            `<div title="Zaznacz dzień" onclick="OdAaYwlLkdNUOjt(this)" style="display: none;">` +
                `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm2 "></path></svg>` +
            `</div>` +
            `<div title="Odznacz dzień" onclick="efBsSMDrIHdzcWF(this)" style="display: none;">` +
                `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"></path></svg>` +
            `</div>` +
            `<div title="Wpisz godziny" onclick="HIJPFbwutXHZxGn(this)" style="display: none;">` +
                `<svg viewBox="0 0 512 512" width="20" height="20"><path d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256c141.4,0,256-114.6,256-256S397.4,0,256,0z M256,469.3c-117.8,0-213.3-95.5-213.3-213.3c0-117.8,95.5-213.3,213.3-213.3c117.8,0,213.3,95.5,213.3,213.3C469.3,373.8,373.8,469.3,256,469.3z M234.7,234.7L149.3,320l32,32l96-96V85.3h-42.7V234.7z"></path></svg>` +
            `</div>` +
        `</div>`;

        TDs[i].setAttribute('onmouseover', 'bxLcBeaOvMopDll(event, this)');
        TDs[i].setAttribute('onmouseout', 'xGCnnFtbrNPSNPm(event, this)');
    } 

    //czas
    for (let i = 0; i < TDs.length; i++) {
        let TDdate = new Date(TDs[i].id).toLocaleDateString();
        for (let l = 0; l < model_t.length; l++) {
            if (model_t[l].Enter != null && model_t[l].Exit != null)
            {
                let enterDate = new Date(model_t[l].Enter).toLocaleDateString();
                let exitDate = new Date(model_t[l].Exit).toLocaleDateString();

                let enterTime = new Date(model_t[l].Enter).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                let exitTime = new Date(model_t[l].Exit).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                if (enterDate == TDdate && exitDate == TDdate) {
                    TDs[i].innerHTML = `<div class="IpLJVyLZIbPJsat">` +
                                            `<input type="time" value="` + enterTime + `" />` +
                                            `<span>-</span>` +
                                            `<input type="time" value="` + exitTime + `" />` +
                                        `</div>`;

                    $(TDs[i]).addClass('IdBgKIHybgYpxXJ');
                    TDs[i].setAttribute('onclick', 'BHuhsNtfdNbyAVV(this)');
                    TDs[i].setAttribute('title', 'Edytuj godziny');
                }
            }
            else 
            {
                let leaveDate = new Date(model_t[l].LeaveDate).toLocaleDateString();

                if (leaveDate == TDdate) {
                    //for (let j = 0; j < model_l.length; j++) {
                    //    if (model_t[l].LeaveID == model_l[j].Id) {
                    //        TDs[i].innerHTML = `<div class="IpLJVyLZIbPJsat" title="` + model_l[j].Name + `">` +
                    //                                `<span>` + model_l[j].Name + `</span>` +
                    //                            `</div>`;

                    //        $(TDs[i]).addClass('IdBgKIHybgYpxXJ');
                    //    }
                    //}

                    TDs[i].innerHTML = `<div class="IpLJVyLZIbPJsat FUPZhBNEXqjiqdk">` +
                                            `<span>Urlop</span>` +
                                        `</div>`;
                }
            }
        }
    }
    

};

function bxLcBeaOvMopDll(e, t) 
{
    $(t).children().children(':not("input"):not("span")').eq(0).show();
    $(t).children().children(':not("input"):not("span")').eq(2).show();

    if ($(t).children().children(':not("input"):not("span")').eq(1).css('display') != 'none')
    {
        $(t).children().children(':not("input"):not("span")').eq(0).hide();
        $(t).children().children(':not("input"):not("span")').eq(2).hide();
    }
};

function xGCnnFtbrNPSNPm(e, t) 
{
    $(t).children().children(':not("input"):not("span")').eq(0).hide();
    $(t).children().children(':not("input"):not("span")').eq(2).hide();
};

function OdAaYwlLkdNUOjt(t) 
{
    $(t).parent().children(':not("input"):not("span")').eq(1).show();
    $(t).parent().children(':not("input"):not("span")').eq(0).hide();

    $(t).parent().parent().addClass('VSEIRMVnLrwIkVf');
};

function efBsSMDrIHdzcWF(t) 
{
    $(t).parent().children(':not("input"):not("span")').eq(1).hide();
    $(t).parent().children(':not("input"):not("span")').eq(0).show();

    $(t).parent().parent().removeClass('VSEIRMVnLrwIkVf');
};

function BHuhsNtfdNbyAVV(t) 
{
    let QcLYVFuvuONgCrh = document.getElementById('QcLYVFuvuONgCrh');
    let worker = QcLYVFuvuONgCrh.options[QcLYVFuvuONgCrh.selectedIndex].text;

    let date = $(t).attr('id');
    let day = date.split('-')[2];
    let month = new Date(date).toLocaleDateString('pl-PL', { month: 'long' });
    let month_capitalize = month.charAt(0).toUpperCase() + month.slice(1);
    let year = document.getElementById('IsBAUOIAAHcAfcz').value;
    let newDate = day + ' ' + month_capitalize + ' ' + year;

    sessionStorage.setItem('jnCsicsQykceNRr', date);


    let godzinaOD = $(t).children().children('input').eq(0).val();
    let godzinaDO = $(t).children().children('input').eq(1).val();


    let form = `<div id="yflqRyBYjmsZJlN" class="pGKcZvErUB" style="display: none;">` +
            `<form class="form_3">` +
                `<div class="IvBtEDulLESDYxK">` +
                    `<span>` + worker + `</span>` +
                `</div>` +
                `<div class="IvBtEDulLESDYxK" id="` + date + `">` +
                    `<span>` + newDate + `</span>` +
                `</div>` +
                `<div class="form-group3 form-group-margin">` +
                    `<div class="form-group">` +
                        `<label>od godziny:</label>` +
                        `<input type="time" class="form-control sCnCesXdXjqdcnF" id="vYPsbsKQRUpHzhU" value="` + godzinaOD + `" />` +
                    `</div>` +
                    `<div class="form-group">` +
                        `<label>do godziny:</label>` +
                        `<input type="time" class="form-control sCnCesXdXjqdcnF" id="iNfGuPIzEcZmVWl" value="` + godzinaDO + `" />` +
                    `</div>` +
                `</div>` +
                `<div class="form-group">` +
                    `<input type="button" value="Edytuj" class="btn-custom" onclick="cUikqcCdqYXiOhb(this)" />` +
                `</div>` +
                `<div class="form-group btn-danger-div">` +
                    `<input type="button" value="Usuń" class="" onclick="erAjvPaJaDFYeWu(this)" />` +
                `</div>` +
                `<div class="BnDZmDEehCCybzG LPbaczkZTGFbIBk" onclick="xZlZPWWTfaNMpXj_(this)">` +
                    `<svg viewBox="0 0 470 470" height="15" width="15"><path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path></svg>` +
                `</div>` +
            `</form>` +
        `</div>`;

    $('body').append(form);

    $('#yflqRyBYjmsZJlN').fadeIn(200);
};

function HIJPFbwutXHZxGn(t) 
{
    let QcLYVFuvuONgCrh = document.getElementById('QcLYVFuvuONgCrh');
    let worker = QcLYVFuvuONgCrh.options[QcLYVFuvuONgCrh.selectedIndex].text;

    let date = $(t).parent().parent().attr('id');
    let day = date.split('-')[2];
    let month = new Date(date).toLocaleDateString('pl-PL', { month: 'long' });
    let month_capitalize = month.charAt(0).toUpperCase() + month.slice(1);
    let year = document.getElementById('IsBAUOIAAHcAfcz').value;
    let newDate = day + ' ' + month_capitalize + ' ' + year;

    sessionStorage.setItem('EDoQJqNDPEApXNE', date);

    let form = `<div id="vjaHMXanUmPdVZF" class="pGKcZvErUB" style="display: none;">` +
        `<form class="form_3">` +
            `<div class="IvBtEDulLESDYxK">` +
                `<span>` + worker + `</span>` +
            `</div>` +
            `<div class="IvBtEDulLESDYxK" id="` + date + `">` +
                `<span>` + newDate + `</span>` +
            `</div>` +
            `<div class="form-group3 form-group-margin">` +
                `<div class="form-group">` +
                    `<label>od godziny:</label>` +
                    `<input type="time" class="form-control sCnCesXdXjqdcnF" id="ybBTKgXSwnWglwT" />` +
                `</div>` +
                `<div class="form-group">` +
                    `<label>do godziny:</label>` +
                    `<input type="time" class="form-control sCnCesXdXjqdcnF" id="knZWoMordRYeUfn" />` +
                `</div>` +
            `</div>` +
            `<div class="form-group">` +
                `<input type="button" value="Zapisz" class="btn-custom" onclick="MbcIEXgByuxsGWM_(this)" />` +
            `</div>` +
            `<div class="BnDZmDEehCCybzG LPbaczkZTGFbIBk" onclick="xZlZPWWTfaNMpXj_(this)">` +
                `<svg viewBox="0 0 470 470" height="15" width="15"><path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path></svg>` +
            `</div>` +
        `</form>` +
    `</div>`;


    $('body').append(form);

    $('#vjaHMXanUmPdVZF').fadeIn(200);
};

function xZlZPWWTfaNMpXj_(t) 
{
    $(t).parent().parent().fadeOut(200);

    setTimeout(function ()
    {
        $(t).parent().parent().remove();
    }, 300);
};


function generateCalendar() 
{
    //department
    let aFoQOFiXPQobjPX = document.getElementById('SLmdcavhxFjdwWi');
    let departmentID_ = aFoQOFiXPQobjPX.options[aFoQOFiXPQobjPX.selectedIndex].value;
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

        if (!$(spans[i]).hasClass('prev-date2') && !$(spans[i]).hasClass('next-date2')) 
        {
            spans[i].innerHTML += `<input type="checkbox" />`;
        }
    }
    //



    //godziny do divów
    for (let i = 0; i < spans.length; i++) 
    {
        for (let j = 0; j < model_t.length; j++) 
        {
            //czy urlopy
            if (model_t[j].Enter == null && model_t[j].LeaveDate != null && model_t[j].LeaveDate.split('T')[0] == spans[i].id) 
            {
                let f_ = document.getElementById('QcLYVFuvuONgCrh'); //worker
                let f2 = f_.options[f_.selectedIndex].value;
                if (f2 == model_t[j].WorkerID) 
                {
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
};


$('#QcLYVFuvuONgCrh').on('change', function ()
{
    //generateCalendar();
    generateNewTable();
});

function fYOxqwVQjemgdRd(t) 
{
    //jxiQgKjvVwKXqik
    let svg = $(t).children().eq(1);
    if ($(t).hasClass('fNFlwKQaZMgErcF'))
    {
        $(t).removeClass('fNFlwKQaZMgErcF');
        $(t).children().eq(1).prop("checked", false);
    }
    else 
    {
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

    //generateCalendar();
    generateNewTable();
};
PTPttVhoaMyUOyR();

function ZJRABLNnRtfPJYl()
{
    //generateCalendar();
    generateNewTable();
};

$('#IsBAUOIAAHcAfcz').on('change', function ()
{
    //generateCalendar();
    generateNewTable();
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
    //generateCalendar();
    generateNewTable();
});



