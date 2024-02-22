function convertTime(time)
{
    var msec = time;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    mm = mm / 60;

    //return hh + "h " + mm + "m";
    //return hh + "." + mm;
    //return hh;
    return hh + mm;
}

//function numbersBetweenNumbers(firstNumber, lastNumber) {
//    let array = [];
//    for (let ) {

//    }
//};

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

function getDayName2(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'short' });
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

function godziny_mouseOver(t) 
{
    $(t).addClass('cySGpFzCuwaKsRB');

    $(t).parent().parent().children().eq(0).children().eq(0).addClass('cySGpFzCuwaKsRB_');
};

function godziny_mouseOut(t) 
{
    $(t).removeClass('cySGpFzCuwaKsRB');

    $(t).parent().parent().children().eq(0).children().eq(0).removeClass('cySGpFzCuwaKsRB_');
};

function nadgodziny_mouseOver(t) 
{
    $(t).addClass('cySGpFzCuwaKsRB_');

    $(t).parent().parent().children().eq(1).children().eq(0).addClass('cySGpFzCuwaKsRB');
};

function nadgodziny_mouseOut(t) 
{
    $(t).removeClass('cySGpFzCuwaKsRB_');

    $(t).parent().parent().children().eq(1).children().eq(0).removeClass('cySGpFzCuwaKsRB');
};

//mouseover
function BNITIHZVtwqfmzK(t) {
    let hoverItems = $(t).parent().parent().children('.jMxTKSnHwAAorfW').children('#BFRZfHjWhBzGEmI');

    for (let i = 0; i < hoverItems.length; i++) 
    {
        $(hoverItems[i]).addClass('cySGpFzCuwaKsRB');
    }
};

//mouseout
function PLhsOBgSRcqunQC(t) {
    let hoverItems = $(t).parent().parent().children('.jMxTKSnHwAAorfW').children('#BFRZfHjWhBzGEmI');

    for (let i = 0; i < hoverItems.length; i++)
    {
        $(hoverItems[i]).removeClass('cySGpFzCuwaKsRB');
    }
};

function isInViewport(element)
{
    //var el = document.getElementById(element);
    var bounding = element.getBoundingClientRect();

    if (bounding.right > (window.innerWidth || document.documentElement.clientWidth))
    {
        // Right side is out of viewport
        return false;
    }
    return true;
}

$(document).ready(function ()
{
    sessionStorage.removeItem('AyLyCuPgYYYxaJX');
});

function xgNCiYYvDQOyAsg(e, t) 
{
    let child = $(t).children('.barContainer');
    child.toggleClass('change');
    let parent = $(t);
    parent.toggleClass('MfcUcFWBWPWVCrS');

    $('#ItKaYYquFHeJjGF').slideToggle(200);
};

function godziny_click(e, t) 
{
    let lifDKbCfNCuDQMs_inner = '';


    //
    let okresRozliczeniowy;
    let czasPracyMax;
    let maksymalnaLiczbaNadgodzin;
    let maksymalnaLiczbaNadgodzinTydzien;
    let nieprzerwanyOdpoczynek;

    for (let i = 0; i < model_ts.length; i++)
    {
        if (model_ts[i].WorkerId != null && model_ts[i].WorkerId == workerID)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
            //break;
        }
        if (model_ts[i].WorkerId == null)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
            //break;
        }
    }
    //


    //
    let workerID = document.getElementById('AOZzvXnLtNqUPwN').value;
    let id_date = new Date($(t).parent().parent().attr('id')).toLocaleDateString();
    for (let i = 0; i < model_t.length; i++) 
    {
        let enter = new Date(model_t[i].Enter).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let enterDate = new Date(model_t[i].Enter).toLocaleDateString();
        let exit = new Date(model_t[i].Exit).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (model_t[i].WorkerID == workerID && new Date(model_t[i].Enter).toLocaleDateString() == id_date && new Date(model_t[i].Exit).toLocaleDateString() == id_date) 
        {
            lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL WnsxQjKwiwuSdTR"><span>` + enterDate + `</span></div>`;
            lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm"><span>Wejście</span><span>` + enter + `</span></div>`;
            lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm"><span>Wyjście</span><span>` + exit + `</span></div>`;


            let date1 = new Date(model_t[i].Enter);
            let date2 = new Date(model_t[i].Exit);
            if (date2 > date1)
            {
                //dzien

                let diff = date2 - date1;
                let godzinyPracy = Math.abs(parseFloat(convertTime(diff)));
                godzinyPracy = godzinyPracy.toFixed(2);

                lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm"><span>Godziny</span><span>` + godzinyPracy + `</span></div>`;

                //nadgodziny
                if (godzinyPracy > czasPracyMax) 
                {
                    let roz = godzinyPracy - czasPracyMax;
                    lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm ATCrevbfpQDiJPh"><span>Nadgodziny</span><span>` + roz.toFixed(2) + `</span></div>`;
                }
                //normalny czas pracy
                if (godzinyPracy == czasPracyMax) 
                {
                    lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm ATCrevbfpQDiJPh"><span>Nadgodziny</span><span>0.00</span></div>`;

                }
                //niedogodziny
                if (godzinyPracy < czasPracyMax) 
                {
                    let roz = godzinyPracy - czasPracyMax;
                    lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm ATCrevbfpQDiJPh"><span>Nadgodziny</span><span>` + roz.toFixed(2) + `</span></div>`;

                }
            }
            else 
            {
                //nocka


            }
        }
        if (model_t[i].WorkerID == workerID && new Date(model_t[i].LeaveDate).toLocaleDateString() == id_date) 
        {
            let enterDate = new Date(model_t[i].LeaveDate).toLocaleDateString();

            lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL WnsxQjKwiwuSdTR"><span>` + enterDate + `</span></div>`;

            for (let j = 0; j < model_l.length; j++) 
            {
                if (model_t[i].LeaveID == model_l[j].Id) 
                {
                    lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm ATCrevbfpQDiJPh"><span>` + model_l[j].Name + `</span></div>`;
                }
            }
        }
    }
    //




    let kmrOEZkQcUWqaEc_all = $(t).parent().parent().parent().children('.kmrOEZkQcUWqaEc');
    for (let i = 0; i < kmrOEZkQcUWqaEc_all.length; i++) 
    {
        if ($(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().length > 0)
        {
            if ($(t).parent().parent().attr('id') != kmrOEZkQcUWqaEc_all[i].id)
            {
                $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().css({ 'opacity': '0.5', 'border': '' });
                $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().css({ 'opacity': '0.5', 'border': '' });


                $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().removeClass('AOwYMEVGxKdwzSH');
                $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().removeClass('AOwYMEVGxKdwzSH');


                $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().attr('onclick', 'godziny_click(event, this)');
                $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().attr('onclick', 'godziny_click(event, this)');
            }
            else 
            {
                $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().css({ 'opacity': '' });
                $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().css({ 'opacity': '' });


                $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().attr('onclick', 'godziny_already_selected(event, this)');
                $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().attr('onclick', 'godziny_already_selected(event, this)');


                if ($(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().hasClass('AOwYMEVGxKdwzSH') || $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().hasClass('AOwYMEVGxKdwzSH'))
                {
                    if ($(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().length > 0)
                    {
                        $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().css({ 'border': '', 'border-bottom': '' });
                        $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().css({ 'border': '', 'border-bottom': '', 'border-top': '' });
                    }
                    else 
                    {
                        $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().css({ 'border': '', 'border-bottom': '' });
                    }
                }
                else
                {
                    if ($(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().length > 0)
                    {
                        $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().css({ 'border': '1px solid rgba(255, 255, 255, 1)', 'border-bottom': 'none' });
                        $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().css({ 'border': '1px solid rgba(255, 255, 255, 1)', 'border-bottom': 'none', 'border-top': 'none' });
                    }
                    else 
                    {
                        $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().css({ 'border': '1px solid rgba(255, 255, 255, 1)', 'border-bottom': 'none' });
                    }
                }

                $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().addClass('AOwYMEVGxKdwzSH');
                $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().addClass('AOwYMEVGxKdwzSH');
            }
        }
    }



    //disable 3 icons
    let GobmBwqqBbAsPaX_divs = $('#qgPGzbIhlJSHVqt').children();
    for (let i = 0; i < GobmBwqqBbAsPaX_divs.length; i++) {
        $(GobmBwqqBbAsPaX_divs[i]).addClass('bxBvYhrbLSeGbvD');
    }

    //hide all elements from left
    let JiqrmfnbjXICdKP_children = $('#JiqrmfnbjXICdKP').children();
    for (let i = 1; i < JiqrmfnbjXICdKP_children.length; i++) {
        $(JiqrmfnbjXICdKP_children[i]).hide();
    }

    //show details of the day
    let html_inner = `<div class="BnDZmDEehCCybzG LPbaczkZTGFbIBk eoqqePJDEGcpBVc" onclick="ofzefwgkFWVagFY()" title="Zamknij">` +
        `<svg viewBox="0 0 470 470" width="15" height="15">` +
        `<path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path>` +
        `</svg>` +
        `</div>` +
        `<div class="WVnJiTrzzpihqVh">` + lifDKbCfNCuDQMs_inner + `</div>` +
        `<div class="pyyxmssXgPCWuUc xVZlAxNFqwZlPbw xoVNvtfbkkicGGv" style="display: none;" onclick="xgNCiYYvDQOyAsg(event, this)"><span>Edytuj</span>     <div class="barContainer"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div></div>      </div>` +
            `<div class="uuJdinqoZMWGSOQ" id="ItKaYYquFHeJjGF" style="display: none;">` +
            `<div class="pyyxmssXgPCWuUc xVZlAxNFqwZlPbw xoVNvtfbkkicGGv UFRwAQEzzfXjfNw" onclick=""><span>Zmień godziny pracy</span></div>` +
            `<div class="pyyxmssXgPCWuUc xVZlAxNFqwZlPbw xoVNvtfbkkicGGv UFRwAQEzzfXjfNw" onclick=""><span>Zapisz jako godziny nadliczbowe</span></div>` +
            `</div>`;


    let html_inner_urlop = `<div class="BnDZmDEehCCybzG LPbaczkZTGFbIBk eoqqePJDEGcpBVc" onclick="ofzefwgkFWVagFY()" title="Zamknij">` +
        `<svg viewBox="0 0 470 470" width="15" height="15">` +
        `<path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path>` +
        `</svg>` +
        `</div>` +
        `<div class="WVnJiTrzzpihqVh">` + lifDKbCfNCuDQMs_inner + `</div>`;
    
    for (let i = 0; i < model_t.length; i++) 
    {
        if (model_t[i].WorkerID == workerID && new Date(model_t[i].Enter).toLocaleDateString() == id_date && new Date(model_t[i].Exit).toLocaleDateString() == id_date) 
        {
            $('#lifDKbCfNCuDQMs').html(html_inner);
        }
        if (model_t[i].WorkerID == workerID && new Date(model_t[i].LeaveDate).toLocaleDateString() == id_date) 
        {
            $('#lifDKbCfNCuDQMs').html(html_inner_urlop);
        }
    }



    if (sessionStorage.getItem('AyLyCuPgYYYxaJX') != null)
    {
        $('#lifDKbCfNCuDQMs').show();
    }
    else {
        sessionStorage.setItem('AyLyCuPgYYYxaJX', 'true');
        $('#lifDKbCfNCuDQMs').fadeIn(100);
    }



    e.stopPropagation();
};

function ofzefwgkFWVagFY() 
{
    sessionStorage.removeItem('AyLyCuPgYYYxaJX');
    $('#lifDKbCfNCuDQMs').hide();

    let kmrOEZkQcUWqaEc_all = document.querySelectorAll('.kmrOEZkQcUWqaEc');
    for (let i = 0; i < kmrOEZkQcUWqaEc_all.length; i++) 
    {
        if ($(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().length > 0) 
        {
            $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().css({ 'opacity': '', 'border': '' });
            $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().css({ 'opacity': '', 'border': '' });


            $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().removeClass('AOwYMEVGxKdwzSH');
            $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().removeClass('AOwYMEVGxKdwzSH');


            $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().attr('onclick', 'godziny_click(event, this)');
            $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().attr('onclick', 'godziny_click(event, this)');


        }
    }

    //enable 3 icons
    let GobmBwqqBbAsPaX_divs = $('#qgPGzbIhlJSHVqt').children();
    for (let i = 0; i < GobmBwqqBbAsPaX_divs.length; i++)
    {
        $(GobmBwqqBbAsPaX_divs[i]).removeClass('bxBvYhrbLSeGbvD');
    }

    //show all elements from left
    let JiqrmfnbjXICdKP_children = $('#JiqrmfnbjXICdKP').children();
    for (let i = 1; i < JiqrmfnbjXICdKP_children.length; i++)
    {
        $(JiqrmfnbjXICdKP_children[i]).fadeIn(100);
    }

    //hide details of the day
    $('#lifDKbCfNCuDQMs').hide();
    if (sessionStorage.getItem('AyLyCuPgYYYxaJX') != null)
    {
        sessionStorage.removeItem('AyLyCuPgYYYxaJX');
    }


};

function godziny_already_selected(e, t) 
{
    let kmrOEZkQcUWqaEc_all = $(t).parent().parent().parent().children('.kmrOEZkQcUWqaEc');
    for (let i = 0; i < kmrOEZkQcUWqaEc_all.length; i++) 
    {
        if ($(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().length > 0) 
        {
            if ($(t).parent().parent().attr('id') != kmrOEZkQcUWqaEc_all[i].id) 
            {
                $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().css({ 'opacity': '' });
                $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().css({ 'opacity': '' });
            }
            else 
            {
                $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().css({ 'opacity': '', 'border': '' });
                $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().css({ 'opacity': '', 'border': '' });


                $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().removeClass('AOwYMEVGxKdwzSH');
                $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().removeClass('AOwYMEVGxKdwzSH');


                $(kmrOEZkQcUWqaEc_all[i]).children('.nadgodziny').children().attr('onclick', 'godziny_click(event, this)');
                $(kmrOEZkQcUWqaEc_all[i]).children('.godziny').children().attr('onclick', 'godziny_click(event, this)');
            }


        }
    }

    //enable 3 icons
    let GobmBwqqBbAsPaX_divs = $('#qgPGzbIhlJSHVqt').children();
    for (let i = 0; i < GobmBwqqBbAsPaX_divs.length; i++)
    {
        $(GobmBwqqBbAsPaX_divs[i]).removeClass('bxBvYhrbLSeGbvD');
    }

    //show all elements from left
    let JiqrmfnbjXICdKP_children = $('#JiqrmfnbjXICdKP').children();
    for (let i = 1; i < JiqrmfnbjXICdKP_children.length; i++)
    {
        $(JiqrmfnbjXICdKP_children[i]).fadeIn(100);
    }

    //hide details of the day
    $('#lifDKbCfNCuDQMs').hide();
    if (sessionStorage.getItem('AyLyCuPgYYYxaJX') != null)
    {
        sessionStorage.removeItem('AyLyCuPgYYYxaJX');
    }


    e.stopPropagation();
};

function generateStatistics()
{
    let workerID = document.getElementById('AOZzvXnLtNqUPwN').value;
    let year = document.getElementById('OvLPfkiiNwdRYgn').value;
    let month = document.getElementById('VQnvdBYLMNSKvmR').value;
    let currentMonth = parseInt(month) + 1;

    var daysLength = daysInMonth(currentMonth, year);

    let divs = '';
    let slupki = '';

    document.getElementById('KjseMRiNyEJWtCR_').innerHTML = '';

    slupki += '<div class="PClmWtOMrNAvPvx WKjuhXBDPRbWrrF CNnQQTvDmNXvaft" id="PClmWtOMrNAvPvx_"></div>';
    divs += '<div class="PClmWtOMrNAvPvx"></div>';

    //dni miesiąca
    for (let k = 1; k <= daysLength; k++)
    {
        let newMonth = parseInt(month) + 1;
        newMonth = padWithLeadingZeros(newMonth, 2);

        let newDay = k;
        newDay = padWithLeadingZeros(newDay, 2);

        let wholeDate = year + `-` + newMonth + `-` + newDay;
        let dayName = getDayName2(wholeDate, getLang() + '-' + getLang().toUpperCase());

        divs += `<div class="QlVtsqDYVktZFfQ" id="` + wholeDate + `"><span>${k}</span><span>${dayName}</span></div>`;
        slupki += `<div class="kmrOEZkQcUWqaEc" id=` + wholeDate + `><div class="nadgodziny"></div><div class="godziny"></div></div>`;
    }

    $('#KjseMRiNyEJWtCR_').html(divs);
    $('#yTKpwuaIyVAZjYk_').html(slupki);



    let QlVtsqDYVktZFfQ = document.querySelectorAll('.QlVtsqDYVktZFfQ');
    for (let i = 0; i < model_h.length; i++) 
    {
        for (let j = 0; j < QlVtsqDYVktZFfQ.length; j++) 
        {
            if (new Date(model_h[i].Date).toLocaleDateString() == new Date(QlVtsqDYVktZFfQ[j].id).toLocaleDateString())
            {
                $(QlVtsqDYVktZFfQ[j]).addClass('wNirVIsdmzAKynQ');
                $(QlVtsqDYVktZFfQ[j]).attr('title', model_h[i].Name);
            }
        }
    }


    let okresRozliczeniowy;
    let czasPracyMax;
    let maksymalnaLiczbaNadgodzin;
    let maksymalnaLiczbaNadgodzinTydzien;
    let nieprzerwanyOdpoczynek;

    for (let i = 0; i < model_ts.length; i++) {
        if (model_ts[i].WorkerId != null && model_ts[i].WorkerId == workerID)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
            //break;
        }
        if (model_ts[i].WorkerId == null) {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
            //break;
        }
    }




    let nadgodziny = [];
    let normalneGodziny = [];
    let niedogodziny = [];
    let urlopy = [];

    let slupkiDivs = document.querySelectorAll('.kmrOEZkQcUWqaEc');
    for (let i = 0; i < slupkiDivs.length; i++) 
    {
        if (i == 0) 
        {
            $(slupkiDivs[i]).css({ 'margin-left': '35px' });
        }

        for (let j = 0; j < model_t.length; j++) {
            //czas pracy
            if (model_t[j].Enter != null && model_t[j].WorkerID == workerID) 
            {
                if (new Date(slupkiDivs[i].id).toLocaleDateString() == new Date(model_t[j].Enter).toLocaleDateString())
                {
                    let date1 = new Date(model_t[j].Enter);
                    let date2 = new Date(model_t[j].Exit);


                    if (date2 > date1)
                    {
                        //dzien
                        let diff = date2 - date1;
                        let godzinyPracy = Math.abs(parseFloat(convertTime(diff)));
                        godzinyPracy = godzinyPracy.toFixed(2);

                        //nadgodziny
                        if (godzinyPracy > czasPracyMax) 
                        {
                            let roz = godzinyPracy - czasPracyMax;
                            nadgodziny.push({ wejscie: date1, wyjscie: date2, ile: godzinyPracy, roznica: roz.toFixed(2) });
                        }
                        //normalny czas pracy
                        if (godzinyPracy == czasPracyMax) 
                        {
                            normalneGodziny.push({ wejscie: date1, wyjscie: date2, ile: godzinyPracy });
                        }
                        //niedogodziny
                        if (godzinyPracy < czasPracyMax) 
                        {
                            let roz = godzinyPracy - czasPracyMax;
                            niedogodziny.push({ wejscie: date1, wyjscie: date2, ile: godzinyPracy, roznica: Math.abs(roz.toFixed(2)) });
                        }
                    }
                    else 
                    {
                        //nocka

                    }
                }
            }
            //urlopy
            if (model_t[j].Enter == null && model_t[j].WorkerID == workerID) 
            {
                if (new Date(slupkiDivs[i].id).toLocaleDateString() == new Date(model_t[j].LeaveDate).toLocaleDateString()) 
                {
                    urlopy.push({ leaveDate: model_t[j].LeaveDate });
                }
            }
        }
    }

    let nawyzszaWartosc = Math.max(...nadgodziny.map(x => x.ile));
    
    let percentHeight_8;
    let percentHeight_nadgodziny;

    if (nadgodziny.length > 0)
    {
        //znajdz najwyzsza wartosc i przypisz percentHeight_8 i percentHeight_nadgodziny
        for (let i = 0; i < nadgodziny.length; i++) 
        {
            for (let j = 0; j < slupkiDivs.length; j++) 
            {
                if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(nadgodziny[i].wejscie).toLocaleDateString()) 
                {
                    if (nawyzszaWartosc == nadgodziny[i].ile) 
                    {
                        let godzin_8 = nadgodziny[i].ile - nadgodziny[i].roznica; //powinno zawsze być tyle ile w bazie
                        percentHeight_8 = (100 * godzin_8) / nadgodziny[i].ile;
                        percentHeight_nadgodziny = 100 - percentHeight_8;

                        break;
                    }
                }
            }
        }
        //


        //
        for (let j = 0; j < slupkiDivs.length; j++) {
            $(slupkiDivs[j]).children('.nadgodziny').css({ 'height': percentHeight_nadgodziny + '%', });
            $(slupkiDivs[j]).children('.godziny').css({ 'height': percentHeight_8 + '%', });
        }
        //


        for (let i = 0; i < nadgodziny.length; i++)
        {
            for (let j = 0; j < slupkiDivs.length; j++) 
            {
                if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(nadgodziny[i].wejscie).toLocaleDateString())
                {
                    if (nawyzszaWartosc == nadgodziny[i].ile) 
                    {
                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm" id="AuvrcQcAMQCKZhb" style="height: 100%;" onmouseover="godziny_mouseOver(this)" onmouseout="godziny_mouseOut(this)" onclick="godziny_click(event, this)"></div>`);
                        $(slupkiDivs[j]).children('.nadgodziny').html(`<div class="XxmPCNwZkVSMeOm_" id="AuvrcQcAMQCKZhb" style="height: 100%;" onmouseover="nadgodziny_mouseOver(this)" onmouseout="nadgodziny_mouseOut(this)" onclick="godziny_click(event, this)"></div>`);
                    }
                    else
                    {
                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm" id="AuvrcQcAMQCKZhb" style="height: 100%;" onmouseover="godziny_mouseOver(this)" onmouseout="godziny_mouseOut(this)" onclick="godziny_click(event, this)"></div>`);

                        let roznica = nawyzszaWartosc - (nadgodziny[i].ile - nadgodziny[i].roznica);
                        let percentHeight = (100 * nadgodziny[i].roznica) / roznica;

                        $(slupkiDivs[j]).children('.nadgodziny').html(`<div class="XxmPCNwZkVSMeOm_" id="AuvrcQcAMQCKZhb" style="height: ${percentHeight}%; min-height: 1px;" onmouseover="nadgodziny_mouseOver(this)" onmouseout="nadgodziny_mouseOut(this)" onclick="godziny_click(event, this)"></div>`);
                    }
                }
            }
        }

        if (normalneGodziny.length > 0) 
        {
            for (let i = 0; i < normalneGodziny.length; i++) 
            {
                for (let j = 0; j < slupkiDivs.length; j++) 
                {
                    if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(normalneGodziny[i].wejscie).toLocaleDateString()) 
                    {
                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm" id="AuvrcQcAMQCKZhb" style="height: 100%;" onmouseover="godziny_mouseOver(this)" onmouseout="godziny_mouseOut(this)" onclick="godziny_click(event, this)"></div>`);
                    }
                }
            }
        }

        if (niedogodziny.length > 0) 
        {
            for (let i = 0; i < niedogodziny.length; i++) 
            {
                for (let j = 0; j < slupkiDivs.length; j++) 
                {
                    if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(niedogodziny[i].wejscie).toLocaleDateString()) 
                    {
                        let percentHeight = (niedogodziny[i].ile * 100) / (parseFloat(niedogodziny[i].ile) + parseFloat(niedogodziny[i].roznica));
                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm__" id="AuvrcQcAMQCKZhb" style="height: ${percentHeight}%;" onmouseover="godziny_mouseOver(this)" onmouseout="godziny_mouseOut(this)" onclick="godziny_click(event, this)"></div>`);
                    }
                }
            }
        }
    }
    else 
    {
        //
        for (let j = 0; j < slupkiDivs.length; j++)
        {
            $(slupkiDivs[j]).children('.godziny').css({ 'height': '100%', });
        }
        //

        if (normalneGodziny.length > 0) 
        {
            for (let i = 0; i < normalneGodziny.length; i++) 
            {
                for (let j = 0; j < slupkiDivs.length; j++) 
                {
                    if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(normalneGodziny[i].wejscie).toLocaleDateString()) 
                    {
                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm" id="AuvrcQcAMQCKZhb" style="height: 100%;" onmouseover="godziny_mouseOver(this)" onmouseout="godziny_mouseOut(this)" onclick="godziny_click(event, this)"></div>`);
                    }
                }
            }
        }

        if (niedogodziny.length > 0) 
        {
            for (let i = 0; i < niedogodziny.length; i++) 
            {
                for (let j = 0; j < slupkiDivs.length; j++) 
                {
                    if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(niedogodziny[i].wejscie).toLocaleDateString()) 
                    {
                        let percentHeight = (niedogodziny[i].ile * 100) / (parseFloat(niedogodziny[i].ile) + parseFloat(niedogodziny[i].roznica));
                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm__" id="AuvrcQcAMQCKZhb" style="height: ${percentHeight}%;" onmouseover="godziny_mouseOver(this)" onmouseout="godziny_mouseOut(this)" onclick="godziny_click(event, this)"></div>`);
                    }
                }
            }
        }
    }
    

    
    //znaczniki
    if (percentHeight_8 != undefined)
    {
        let divide_8 = 100 / czasPracyMax;

        let ymCjBkLWIjwBVgR_innerDivs = '';
        for (let i = czasPracyMax; i >= 0; i--)
        {
            ymCjBkLWIjwBVgR_innerDivs += `<div class="ymCjBkLWIjwBVgR_" style="height:${divide_8}%;"><span>${i.toFixed(2)}</span></div>`;
        }

        let dividers = `<div class="lhduMWDCUEGkJNw" style="height:${percentHeight_nadgodziny}%;">` + `<span>${nawyzszaWartosc}</span>` + `</div>` +
            `<div class="ymCjBkLWIjwBVgR" style="height:${percentHeight_8}%;">${ymCjBkLWIjwBVgR_innerDivs}</div>`;

        $('#PClmWtOMrNAvPvx_').html(dividers);

        for (let i = 0; i < $('.godziny').length; i++)
        {
            $('.godziny').css({ 'border-top': '1px dashed rgb(90, 90, 90)' });
            $('.nadgodziny').css({ 'border-top': '1px dashed rgb(90, 90, 90)' });
        }
    }
    else {
        let divide_8 = 100 / czasPracyMax;

        let ymCjBkLWIjwBVgR_innerDivs = '';
        for (let i = czasPracyMax; i >= 0; i--) 
        {
            ymCjBkLWIjwBVgR_innerDivs += `<div class="ymCjBkLWIjwBVgR_" style="height: ${divide_8}%;"><span>${i.toFixed(2)}</span></div>`;
        }

        let dividers = `<div class="ymCjBkLWIjwBVgR" style="height: 100%;">${ymCjBkLWIjwBVgR_innerDivs}</div>`;

        $('#PClmWtOMrNAvPvx_').html(dividers);

        for (let i = 0; i < $('.godziny').length; i++) 
        {
            $('.godziny').css({ 'border-top': '1px dashed rgb(90, 90, 90)' });
        }
    }
    //


    //urlopy
    if (urlopy.length > 0) 
    {
        //XxmPCNwZkVSMeOm_urlopy

        for (let i = 0; i < urlopy.length; i++) 
        {
            for (let j = 0; j < slupkiDivs.length; j++) 
            {
                if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(urlopy[i].leaveDate).toLocaleDateString()) 
                {
                    $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm_urlopy" id="AuvrcQcAMQCKZhb" style="height: 100%;" onmouseover="godziny_mouseOver(this)" onmouseout="godziny_mouseOut(this)" onclick="godziny_click(event, this)"></div>`);
                }
            }
        }
    }
    //




    $('#vWbUhILVpdyutyE').children().eq(0).show();
    $('#vWbUhILVpdyutyE').children().eq(2).show();
    $('#vWbUhILVpdyutyE').children().eq(3).hide();

    $('#imAZBCksRVUuDsR_').show();
    $('#kCJfJXsYxCydUDw_').hide();
    $('#GYgSdzJuBJAuFcM_').hide();


    //$('#AuvrcQcAMQCKZhb').trigger('click');
    //let AuvrcQcAMQCKZhb = document.querySelectorAll('#AuvrcQcAMQCKZhb');
    //for (let i = 0; i < AuvrcQcAMQCKZhb.length; i++) {
    //    console.log(AuvrcQcAMQCKZhb);
    //}




    ////widok poziomy
    //if ($('#relrPYFTLYqMaqt').prop('checked')) 
    //{
        
    //}

    ////widok pionowy
    //if ($('#qDXIOKGzpBOMvoB').prop('checked')) 
    //{
        
    //}

    //$('#JhmmaXkQXmKMKml_').prop('checked', false);
    //$('#JhmmaXkQXmKMKml_').parent('label').removeClass('HOZnyZWeKKoQdIf');
};
//generateStatistics();

function YfChmciZscDmcSq(e, t) 
{


    e.stopPropagation();
};

function generateStatistics2() 
{
    let workerID = document.getElementById('AOZzvXnLtNqUPwN').value;
    let year = document.getElementById('OvLPfkiiNwdRYgn').value;
    let month = document.getElementById('VQnvdBYLMNSKvmR').value;
    let currentMonth = parseInt(month) + 1;

    var daysLength = daysInMonth(currentMonth, year);

    let divs = '';
    let slupki = '';

    //dni miesiąca
    for (let k = 1; k <= daysLength; k++)
    {
        let newMonth = parseInt(month) + 1;
        newMonth = padWithLeadingZeros(newMonth, 2);

        let newDay = k;
        newDay = padWithLeadingZeros(newDay, 2);

        let wholeDate = year + `-` + newMonth + `-` + newDay;

        divs += `<div class="QlVtsqDYVktZFfQ" id="` + wholeDate + `"><span>${k}</span></div>`;
        slupki += `<div class="kmrOEZkQcUWqaEc" id=` + wholeDate + `><div class="godziny"></div><div class="nadgodziny"></div></div>`;
    }

    //divs += '<div class="PClmWtOMrNAvPvx wBaeYoRrlfYPQrQ"></div>';
    //slupki += '<div class="kmrOEZkQcUWqaEc uPuVQkLXgKdgzst" id="PClmWtOMrNAvPvx___"><div class="godziny"></div><div class="nadgodziny"></div></div>';
    slupki += `<div style="height: 7px; min-height: 7px;"></div>`;
    $('#ZswYHvYTUqugSGk_').html(divs);
    $('#GSOAbETpVUcbpao_').html(slupki);



    let QlVtsqDYVktZFfQ = document.querySelectorAll('.QlVtsqDYVktZFfQ');
    for (let i = 0; i < model_h.length; i++) 
    {
        for (let j = 0; j < QlVtsqDYVktZFfQ.length; j++) 
        {
            if (new Date(model_h[i].Date).toLocaleDateString() == new Date(QlVtsqDYVktZFfQ[j].id).toLocaleDateString())
            {
                $(QlVtsqDYVktZFfQ[j]).addClass('wNirVIsdmzAKynQ');
                $(QlVtsqDYVktZFfQ[j]).attr('title', model_h[i].Name);
            }
        }
    }


    let okresRozliczeniowy;
    let czasPracyMax;
    let maksymalnaLiczbaNadgodzin;
    let maksymalnaLiczbaNadgodzinTydzien;
    let nieprzerwanyOdpoczynek;

    for (let i = 0; i < model_ts.length; i++)
    {
        if (model_ts[i].WorkerId != null && model_ts[i].WorkerId == workerID)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
        }
        if (model_ts[i].WorkerId == null)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
        }
    }




    let nadgodziny = [];
    let normalneGodziny = [];
    let niedogodziny = [];
    let urlopy = [];

    let slupkiDivs = document.querySelectorAll('.kmrOEZkQcUWqaEc');
    for (let i = 0; i < slupkiDivs.length; i++) 
    {
        for (let j = 0; j < model_t.length; j++) 
        {
            //czas pracy
            if (model_t[j].Enter != null && model_t[j].WorkerID == workerID) 
            {
                if (new Date(slupkiDivs[i].id).toLocaleDateString() == new Date(model_t[j].Enter).toLocaleDateString())
                {
                    let date1 = new Date(model_t[j].Enter);
                    let date2 = new Date(model_t[j].Exit);


                    if (date2 > date1)
                    {
                        //dzien
                        let diff = date2 - date1;
                        let godzinyPracy = Math.abs(parseFloat(convertTime(diff)));
                        godzinyPracy = godzinyPracy.toFixed(2);

                        //nadgodziny
                        if (godzinyPracy > czasPracyMax) 
                        {
                            let roz = godzinyPracy - czasPracyMax;
                            nadgodziny.push({ wejscie: date1, wyjscie: date2, ile: godzinyPracy, roznica: roz.toFixed(2) });
                        }
                        //normalny czas pracy
                        if (godzinyPracy == czasPracyMax) 
                        {
                            normalneGodziny.push({ wejscie: date1, wyjscie: date2, ile: godzinyPracy });
                        }
                        //niedogodziny
                        if (godzinyPracy < czasPracyMax) 
                        {
                            let roz = godzinyPracy - czasPracyMax;
                            niedogodziny.push({ wejscie: date1, wyjscie: date2, ile: godzinyPracy, roznica: Math.abs(roz.toFixed(2)) });
                        }
                    }
                    else 
                    {
                        //nocka

                    }
                }
            }
            //urlopy
            if (model_t[j].Enter == null && model_t[j].WorkerID == workerID) 
            {
                if (new Date(slupkiDivs[i].id).toLocaleDateString() == new Date(model_t[j].LeaveDate).toLocaleDateString()) 
                {
                    for (let k = 0; k < model_l.length; k++) 
                    {
                        if (model_t[j].LeaveID == model_l[k].Id) 
                        {
                            urlopy.push({ leaveDate: model_t[j].LeaveDate, Name: model_l[k].Name });
                        }
                    }
                    //urlopy.push({ leaveDate: model_t[j].LeaveDate });
                }
            }
        }
    }

    let nawyzszaWartosc = Math.max(...nadgodziny.map(x => x.ile));

    let percentHeight_8;
    let percentHeight_nadgodziny;

    if (nadgodziny.length > 0) 
    {
        //znajdz najwyzsza wartosc i przypisz percentHeight_8 i percentHeight_nadgodziny
        for (let i = 0; i < nadgodziny.length; i++) 
        {
            for (let j = 0; j < slupkiDivs.length; j++) 
            {
                if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(nadgodziny[i].wejscie).toLocaleDateString()) 
                {
                    if (nawyzszaWartosc == nadgodziny[i].ile) 
                    {
                        let godzin_8 = nadgodziny[i].ile - nadgodziny[i].roznica; //powinno zawsze być tyle ile w bazie
                        percentHeight_8 = (100 * godzin_8) / nadgodziny[i].ile;
                        percentHeight_nadgodziny = 100 - percentHeight_8;

                        break;
                    }
                }
            }
        }
        //


        //
        for (let j = 0; j < slupkiDivs.length; j++)
        {
            $(slupkiDivs[j]).children('.godziny').css({ 'width': percentHeight_8 + '%', });
            $(slupkiDivs[j]).children('.nadgodziny').css({ 'width': percentHeight_nadgodziny + '%', });
        }
        //


        for (let i = 0; i < nadgodziny.length; i++) 
        {
            for (let j = 0; j < slupkiDivs.length; j++) 
            {
                if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(nadgodziny[i].wejscie).toLocaleDateString()) 
                {
                    let czas_ = new Date(nadgodziny[i].wejscie).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ` - ` + new Date(nadgodziny[i].wyjscie).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    let godziny_ = nadgodziny[i].ile;
                    let roznica_ = nadgodziny[i].roznica;

                    if (nawyzszaWartosc == nadgodziny[i].ile) 
                    {
                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm KoHHmbXxPkfkekb" id="hJlQWYRcMNblPBg" style="width: 100%;"><span>` + czas_ + `</span><span>Nadgodziny: ` + roznica_ + `</span><span>Godziny pracy: ` + godziny_ + `</span></div>`);
                        $(slupkiDivs[j]).children('.nadgodziny').html(`<div class="XxmPCNwZkVSMeOm_ KoHHmbXxPkfkekb" id="hJlQWYRcMNblPBg" style="width: 100%;"></div>`);
                    }
                    else 
                    {
                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm KoHHmbXxPkfkekb" id="hJlQWYRcMNblPBg" style="width: 100%;"><span>` + czas_ + `</span><span>Nadgodziny: ` + roznica_ + `</span><span>Godziny pracy: ` + godziny_ + `</span></div>`);

                        let roznica = nawyzszaWartosc - (nadgodziny[i].ile - nadgodziny[i].roznica);
                        let percentHeight = (100 * nadgodziny[i].roznica) / roznica;

                        $(slupkiDivs[j]).children('.nadgodziny').html(`<div class="XxmPCNwZkVSMeOm_ KoHHmbXxPkfkekb" id="hJlQWYRcMNblPBg" style="width: ${percentHeight}%; min-width: 1px;"></div>`);
                    }
                }
            }
        }

        if (normalneGodziny.length > 0) 
        {
            for (let i = 0; i < normalneGodziny.length; i++) 
            {
                for (let j = 0; j < slupkiDivs.length; j++) 
                {
                    if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(normalneGodziny[i].wejscie).toLocaleDateString()) 
                    {
                        let czas_ = new Date(normalneGodziny[i].wejscie).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ` - ` + new Date(normalneGodziny[i].wyjscie).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        let godziny_ = normalneGodziny[i].ile;

                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm KoHHmbXxPkfkekb" id="hJlQWYRcMNblPBg" style="width: 100%;"><span>` + czas_ + `</span><span>Godziny pracy: ` + godziny_ + `</span></div>`);
                    }
                }
            }
        }

        if (niedogodziny.length > 0) 
        {
            for (let i = 0; i < niedogodziny.length; i++) 
            {
                for (let j = 0; j < slupkiDivs.length; j++) 
                {
                    if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(niedogodziny[i].wejscie).toLocaleDateString()) 
                    {
                        let czas_ = new Date(niedogodziny[i].wejscie).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ` - ` + new Date(niedogodziny[i].wyjscie).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        let godziny_ = niedogodziny[i].ile;

                        let percentHeight = (niedogodziny[i].ile * 100) / (parseFloat(niedogodziny[i].ile) + parseFloat(niedogodziny[i].roznica));
                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm__ KoHHmbXxPkfkekb" id="hJlQWYRcMNblPBg" style="width: ${percentHeight}%;"><span>` + czas_ + `</span><span>Godziny pracy: ` + godziny_ + `</span></div>`);
                    }
                }
            }
        }
    }
    else 
    {
        //
        for (let j = 0; j < slupkiDivs.length; j++)
        {
            $(slupkiDivs[j]).children('.godziny').css({ 'width': '100%', });
        }
        //

        if (normalneGodziny.length > 0) 
        {
            for (let i = 0; i < normalneGodziny.length; i++) 
            {
                for (let j = 0; j < slupkiDivs.length; j++) 
                {
                    if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(normalneGodziny[i].wejscie).toLocaleDateString()) 
                    {
                        let czas_ = new Date(normalneGodziny[i].wejscie).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ` - ` + new Date(normalneGodziny[i].wyjscie).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        let godziny_ = normalneGodziny[i].ile;

                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm KoHHmbXxPkfkekb" id="hJlQWYRcMNblPBg" style="width: 100%;"><span>` + czas_ + `</span><span>Godziny pracy: ` + godziny_ + `</span></div>`);
                    }
                }
            }
        }

        if (niedogodziny.length > 0) 
        {
            for (let i = 0; i < niedogodziny.length; i++) 
            {
                for (let j = 0; j < slupkiDivs.length; j++) 
                {
                    if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(niedogodziny[i].wejscie).toLocaleDateString()) 
                    {
                        let czas_ = new Date(niedogodziny[i].wejscie).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ` - ` + new Date(niedogodziny[i].wyjscie).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        let godziny_ = niedogodziny[i].ile;

                        let percentHeight = (niedogodziny[i].ile * 100) / (parseFloat(niedogodziny[i].ile) + parseFloat(niedogodziny[i].roznica));
                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm__ KoHHmbXxPkfkekb" id="hJlQWYRcMNblPBg" style="width: ${percentHeight}%;"><span>` + czas_ + `</span><span>Godziny pracy: ` + godziny_ + `</span></div>`);
                    }
                }
            }
        }
    }



    //znaczniki
    if (percentHeight_8 != undefined) 
    {
        let divide_8 = 100 / czasPracyMax;

        let ymCjBkLWIjwBVgR_innerDivs = '';
        for (let i = 1; i <= czasPracyMax; i++)
        {
            ymCjBkLWIjwBVgR_innerDivs += `<div class="ymCjBkLWIjwBVgR_" style="width:${divide_8}%;"><span>${i.toFixed(2)}</span></div>`;
        }

        let dividers = `<div class="ymCjBkLWIjwBVgR" style="width:${percentHeight_8}%;">${ymCjBkLWIjwBVgR_innerDivs}</div>` + 
            `<div class="lhduMWDCUEGkJNw" style="width:${percentHeight_nadgodziny}%;">` + `<span>${nawyzszaWartosc}</span>` + `</div>`;

        //$('#PClmWtOMrNAvPvx___').html(dividers);

        for (let i = 0; i < $('.godziny').length; i++)
        {
            $('.godziny').css({ 'border-right': '1px dashed rgb(90, 90, 90)' });
            $('.nadgodziny').css({ 'border-right': '1px dashed rgb(90, 90, 90)' });
        }
    }
    else {
        let divide_8 = 100 / czasPracyMax;

        let ymCjBkLWIjwBVgR_innerDivs = '';
        for (let i = 1; i <= czasPracyMax; i++)
        {
            ymCjBkLWIjwBVgR_innerDivs += `<div class="ymCjBkLWIjwBVgR_" style="width:${divide_8}%;"><span>${i.toFixed(2)}</span></div>`;
        }

        let dividers = `<div class="ymCjBkLWIjwBVgR" style="width: 100%;">${ymCjBkLWIjwBVgR_innerDivs}</div>`;

        //$('#PClmWtOMrNAvPvx___').html(dividers);

        for (let i = 0; i < $('.godziny').length; i++)
        {
            $('.godziny').css({ 'border-right': '1px dashed rgb(90, 90, 90)' });
        }
    }
    //


    //urlopy
    if (urlopy.length > 0) 
    {
        //XxmPCNwZkVSMeOm_urlopy

        for (let i = 0; i < urlopy.length; i++) 
        {
            for (let j = 0; j < slupkiDivs.length; j++) 
            {
                if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(urlopy[i].leaveDate).toLocaleDateString()) 
                {
                    $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm_urlopy KoHHmbXxPkfkekb" id="AuvrcQcAMQCKZhb" style="width: 100%;"><span>` + urlopy[i].Name + `</span></div>`);
                }
            }
        }
    }
    //




    $('#vWbUhILVpdyutyE').children().eq(0).show();
    $('#vWbUhILVpdyutyE').children().eq(2).show();
    $('#vWbUhILVpdyutyE').children().eq(3).hide();

    $('#imAZBCksRVUuDsR_').hide();
    $('#kCJfJXsYxCydUDw_').show();
    $('#GYgSdzJuBJAuFcM_').hide();
};

function generateStatistics3() 
{
    let workerID = document.getElementById('AOZzvXnLtNqUPwN').value;
    let year = document.getElementById('OvLPfkiiNwdRYgn').value;
    let month = document.getElementById('VQnvdBYLMNSKvmR').value;
    let currentMonth = parseInt(month) + 1;

    var daysLength = daysInMonth(currentMonth, year);

    let divs = '';
    let slupki = '';

    document.getElementById('GFYnHZkcKqlZmQu_').innerHTML = '';

    slupki += '<div class="PClmWtOMrNAvPvx JNwAoqBiFHcfLgW" id="PClmWtOMrNAvPvx__"></div>';
    divs += '<div class="PClmWtOMrNAvPvx YBHnGvtIcHAOqaK"></div>';

    let doba = 24 - 1;
    let divide_8 = 100 / 24;



    //dni miesiąca
    for (let k = 1; k <= daysLength; k++)
    {
        let newMonth = parseInt(month) + 1;
        newMonth = padWithLeadingZeros(newMonth, 2);

        let newDay = k;
        newDay = padWithLeadingZeros(newDay, 2);

        let wholeDate = year + `-` + newMonth + `-` + newDay;
        let dayName = getDayName2(wholeDate, getLang() + '-' + getLang().toUpperCase());

        divs += `<div class="QlVtsqDYVktZFfQ" id="` + wholeDate + `"><span>${k}</span><span>${dayName}</span></div>`;
        slupki += `<div class="kmrOEZkQcUWqaEc kmrOEZkQcUWqaEc_" id=` + wholeDate + `></div>`;
    }

    $('#GFYnHZkcKqlZmQu_').html(divs);
    $('#qoawyUybNhotJKO_').html(slupki);



    let QlVtsqDYVktZFfQ = document.querySelectorAll('.QlVtsqDYVktZFfQ');
    for (let i = 0; i < model_h.length; i++)
    {
        for (let j = 0; j < QlVtsqDYVktZFfQ.length; j++)
        {
            if (new Date(model_h[i].Date).toLocaleDateString() == new Date(QlVtsqDYVktZFfQ[j].id).toLocaleDateString())
            {
                $(QlVtsqDYVktZFfQ[j]).addClass('wNirVIsdmzAKynQ');
                $(QlVtsqDYVktZFfQ[j]).attr('title', model_h[i].Name);
            }
        }
    }


    let okresRozliczeniowy;
    let czasPracyMax;
    let maksymalnaLiczbaNadgodzin;
    let maksymalnaLiczbaNadgodzinTydzien;
    let nieprzerwanyOdpoczynek;

    for (let i = 0; i < model_ts.length; i++)
    {
        if (model_ts[i].WorkerId != null && model_ts[i].WorkerId == workerID)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
        }
        if (model_ts[i].WorkerId == null)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
        }
    }





    let nadgodziny = [];
    let normalneGodziny = [];
    let niedogodziny = [];
    let nocki = [];
    let urlopy = [];

    let slupkiDivs = document.querySelectorAll('.kmrOEZkQcUWqaEc_');
    for (let i = 0; i < slupkiDivs.length; i++)
    {
        for (let j = 0; j < model_t.length; j++)
        {
            //czas pracy
            if (model_t[j].Enter != null && model_t[j].WorkerID == workerID) 
            {
                if (new Date(slupkiDivs[i].id).toLocaleDateString() == new Date(model_t[j].Enter).toLocaleDateString())
                {
                    let date1 = new Date(model_t[j].Enter);
                    let date2 = new Date(model_t[j].Exit);

                    if (date2 > date1)
                    {
                        //dzien
                        let diff = date2 - date1;
                        let godzinyPracy = Math.abs(parseFloat(convertTime(diff)));
                        godzinyPracy = godzinyPracy.toFixed(2);

                        //nadgodziny
                        if (godzinyPracy > czasPracyMax) 
                        {
                            let roz = godzinyPracy - czasPracyMax;
                            nadgodziny.push({ wejscie: date1, wyjscie: date2, ile: godzinyPracy, roznica: roz.toFixed(2) });
                        }
                        //normalny czas pracy
                        if (godzinyPracy == czasPracyMax) 
                        {
                            normalneGodziny.push({ wejscie: date1, wyjscie: date2, ile: godzinyPracy });
                        }
                        //niedogodziny
                        if (godzinyPracy < czasPracyMax) 
                        {
                            let roz = godzinyPracy - czasPracyMax;
                            niedogodziny.push({ wejscie: date1, wyjscie: date2, ile: godzinyPracy, roznica: Math.abs(roz.toFixed(2)) });
                        }
                    }
                    else 
                    {
                        //nocka

                    }
                }
            }
            //urlopy
            if (model_t[j].Enter == null && model_t[j].WorkerID == workerID) 
            {
                if (new Date(slupkiDivs[i].id).toLocaleDateString() == new Date(model_t[j].LeaveDate).toLocaleDateString()) 
                {
                    urlopy.push({ leaveDate: model_t[j].LeaveDate });
                }
            }
        }
    }

    //znaczniki
    let ymCjBkLWIjwBVgR_innerDivs = '';
    for (let i = doba; i >= 0; i--) 
    {
        ymCjBkLWIjwBVgR_innerDivs += `<div class="ymCjBkLWIjwBVgR_ ymCjBkLWIjwBVgR__" onmouseover="KHPLvgvQxFmHMtE(event, this)" onmouseout="JseGUINRHEBAnvv(event, this)" style="height:${divide_8}%;"><span>${i}:00</span></div>`;

        $('.kmrOEZkQcUWqaEc_').append(`<div class="jMxTKSnHwAAorfW" id="${i}"><div class="osWizyDOwUfGTME"></div></div>`);
    }

    let dividers = `<div class="ymCjBkLWIjwBVgR urCwRPsnRGpEUXb" >${ymCjBkLWIjwBVgR_innerDivs}</div>`; //style="height: 100%;"
    $('#PClmWtOMrNAvPvx__').html(dividers);
    //

    //znaczniki godzin z grafiku
    for (let j = 0; j < slupkiDivs.length; j++) 
    {
        let jMxTKSnHwAAorfW = $(slupkiDivs[j]).children('.jMxTKSnHwAAorfW');
        for (let l = 0; l < jMxTKSnHwAAorfW.length; l++) 
        {
            for (let y = 0; y < model_task.length; y++) 
            {
                if (model_task[y].WorkerID == workerID && new Date(model_task[y].Date).toLocaleDateString() == new Date(slupkiDivs[j].id).toLocaleDateString())
                {
                    let wejscie_godzina_grafik = parseInt(new Date(model_task[y].JobStart).toLocaleTimeString().split(':')[0]);
                    let wejscie_minuty_grafik = parseInt(new Date(model_task[y].JobStart).toLocaleTimeString().split(':')[1]);

                    let wyjscie_godzina_grafik = parseInt(new Date(model_task[y].JobEnd).toLocaleTimeString().split(':')[0]);
                    let wyjscie_minuty_grafik = parseInt(new Date(model_task[y].JobEnd).toLocaleTimeString().split(':')[1]);

                    let date1 = new Date(model_task[y].JobStart);
                    let date2 = new Date(model_task[y].JobEnd);

                    if (date2 > date1) 
                    {
                        //dzien

                        if (wejscie_godzina_grafik == jMxTKSnHwAAorfW[l].id)
                        {
                            let minuty = wejscie_minuty_grafik;

                            let height_wejscie = (minuty * 100) / 60; //100% - 60min
                            height_wejscie = 100 - height_wejscie;

                            $(jMxTKSnHwAAorfW[l]).append(`<div class="sDNWoHChtnkFbSv" style="height: ${height_wejscie}%;"></div>`);
                        }

                        if (wyjscie_godzina_grafik == jMxTKSnHwAAorfW[l].id)
                        {
                            let minuty = wyjscie_minuty_grafik;

                            let height_wejscie = (minuty * 100) / 60; //100% - 60min
                            height_wejscie = 100 - height_wejscie;

                            $(jMxTKSnHwAAorfW[l]).append(`<div class="UPLggzHUmhGMnUS" style="height: ${height_wejscie}%;"></div>`);
                        }
                    }
                    else 
                    {
                        //nocka


                    }
                }
            }
        }
    }
    //



    if (nadgodziny.length > 0) 
    {
        for (let i = 0; i < nadgodziny.length; i++) 
        {
            for (let j = 0; j < slupkiDivs.length; j++) 
            {
                if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(nadgodziny[i].wejscie).toLocaleDateString()) 
                {
                    let wejscie_godzina = parseInt(new Date(nadgodziny[i].wejscie).toLocaleTimeString().split(':')[0]);
                    let wejscie_minuty = parseInt(new Date(nadgodziny[i].wejscie).toLocaleTimeString().split(':')[1]);

                    let wyjscie_godzina = parseInt(new Date(nadgodziny[i].wyjscie).toLocaleTimeString().split(':')[0]);
                    let wyjscie_minuty = parseInt(new Date(nadgodziny[i].wyjscie).toLocaleTimeString().split(':')[1]);

                    
                    let jMxTKSnHwAAorfW = $(slupkiDivs[j]).children('.jMxTKSnHwAAorfW');
                    for (let l = 0; l < jMxTKSnHwAAorfW.length; l++) 
                    {

                        //godziny z grafiku
                        
                        //



                        for (let k = wejscie_godzina + 1; k < wyjscie_godzina; k++)
                        {
                            if (k == jMxTKSnHwAAorfW[l].id)
                            {
                                $(jMxTKSnHwAAorfW[l]).append(`<div class="XxmPCNwZkVSMeOm pSvvteXuxRtsjRu" id="BFRZfHjWhBzGEmI" style="height: 100%;" onmouseover="BNITIHZVtwqfmzK(this)" onmouseout="PLhsOBgSRcqunQC(this)" onclick="godziny_click3(event, this)"></div>`);
                            }
                        }

                        if (wejscie_godzina == jMxTKSnHwAAorfW[l].id) 
                        {
                            let minuty = wejscie_minuty;

                            let height_wejscie = (minuty * 100) / 60; //100% - 60min
                            height_wejscie = 100 - height_wejscie;

                            $(jMxTKSnHwAAorfW[l]).css({ 'align-items': 'start' });
                            $(jMxTKSnHwAAorfW[l]).append(`<div class="XxmPCNwZkVSMeOm pSvvteXuxRtsjRu" id="BFRZfHjWhBzGEmI" style="height: ${height_wejscie}%;" onmouseover="BNITIHZVtwqfmzK(this)" onmouseout="PLhsOBgSRcqunQC(this)" onclick="godziny_click3(event, this)"></div>`);
                        }

                        if (wyjscie_godzina == jMxTKSnHwAAorfW[l].id) 
                        {
                            let minuty = wyjscie_minuty;

                            let height_wyjscie = (minuty * 100) / 60; //100% - 60min
                            
                            $(jMxTKSnHwAAorfW[l]).css({ 'align-items': 'end' });
                            $(jMxTKSnHwAAorfW[l]).append(`<div class="XxmPCNwZkVSMeOm pSvvteXuxRtsjRu" id="BFRZfHjWhBzGEmI" style="height: ${height_wyjscie}%;" onmouseover="BNITIHZVtwqfmzK(this)" onmouseout="PLhsOBgSRcqunQC(this)" onclick="godziny_click3(event, this)"></div>`);
                        }
                    }
                }
            }
        }
    }

    if (normalneGodziny.length > 0) 
    {
        for (let i = 0; i < normalneGodziny.length; i++) 
        {
            for (let j = 0; j < slupkiDivs.length; j++) 
            {
                if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(normalneGodziny[i].wejscie).toLocaleDateString()) 
                {
                    let wejscie_godzina = parseInt(new Date(normalneGodziny[i].wejscie).toLocaleTimeString().split(':')[0]);
                    let wejscie_minuty = parseInt(new Date(normalneGodziny[i].wejscie).toLocaleTimeString().split(':')[1]);

                    let wyjscie_godzina = parseInt(new Date(normalneGodziny[i].wyjscie).toLocaleTimeString().split(':')[0]);
                    let wyjscie_minuty = parseInt(new Date(normalneGodziny[i].wyjscie).toLocaleTimeString().split(':')[1]);


                    let jMxTKSnHwAAorfW = $(slupkiDivs[j]).children('.jMxTKSnHwAAorfW');
                    for (let l = 0; l < jMxTKSnHwAAorfW.length; l++) 
                    {
                        for (let k = wejscie_godzina + 1; k < wyjscie_godzina; k++)
                        {
                            if (k == jMxTKSnHwAAorfW[l].id)
                            {
                                $(jMxTKSnHwAAorfW[l]).append(`<div class="XxmPCNwZkVSMeOm pSvvteXuxRtsjRu" id="BFRZfHjWhBzGEmI" style="height: 100%;" onmouseover="BNITIHZVtwqfmzK(this)" onmouseout="PLhsOBgSRcqunQC(this)" onclick="godziny_click3(event, this)"></div>`);
                            }
                        }

                        if (wejscie_godzina == jMxTKSnHwAAorfW[l].id) 
                        {
                            let minuty = wejscie_minuty;

                            let height_wejscie = (minuty * 100) / 60; //100% - 60min
                            height_wejscie = 100 - height_wejscie;

                            $(jMxTKSnHwAAorfW[l]).css({ 'align-items': 'start' });
                            $(jMxTKSnHwAAorfW[l]).append(`<div class="XxmPCNwZkVSMeOm pSvvteXuxRtsjRu" id="BFRZfHjWhBzGEmI" style="height: ${height_wejscie}%;" onmouseover="BNITIHZVtwqfmzK(this)" onmouseout="PLhsOBgSRcqunQC(this)" onclick="godziny_click3(event, this)"></div>`);
                        }

                        if (wyjscie_godzina == jMxTKSnHwAAorfW[l].id) 
                        {
                            let minuty = wyjscie_minuty;

                            let height_wyjscie = (minuty * 100) / 60; //100% - 60min

                            $(jMxTKSnHwAAorfW[l]).css({ 'align-items': 'end' });
                            $(jMxTKSnHwAAorfW[l]).append(`<div class="XxmPCNwZkVSMeOm pSvvteXuxRtsjRu" id="BFRZfHjWhBzGEmI" style="height: ${height_wyjscie}%;" onmouseover="BNITIHZVtwqfmzK(this)" onmouseout="PLhsOBgSRcqunQC(this)" onclick="godziny_click3(event, this)"></div>`);
                        }
                    }
                }
            }
        }
    }

    if (niedogodziny.length > 0) 
    {
        for (let i = 0; i < niedogodziny.length; i++) 
        {
            for (let j = 0; j < slupkiDivs.length; j++) 
            {
                if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(niedogodziny[i].wejscie).toLocaleDateString()) 
                {
                    let wejscie_godzina = parseInt(new Date(niedogodziny[i].wejscie).toLocaleTimeString().split(':')[0]);
                    let wejscie_minuty = parseInt(new Date(niedogodziny[i].wejscie).toLocaleTimeString().split(':')[1]);

                    let wyjscie_godzina = parseInt(new Date(niedogodziny[i].wyjscie).toLocaleTimeString().split(':')[0]);
                    let wyjscie_minuty = parseInt(new Date(niedogodziny[i].wyjscie).toLocaleTimeString().split(':')[1]);


                    let jMxTKSnHwAAorfW = $(slupkiDivs[j]).children('.jMxTKSnHwAAorfW');
                    for (let l = 0; l < jMxTKSnHwAAorfW.length; l++) 
                    {
                        for (let k = wejscie_godzina + 1; k < wyjscie_godzina; k++)
                        {
                            if (k == jMxTKSnHwAAorfW[l].id)
                            {
                                $(jMxTKSnHwAAorfW[l]).append(`<div class="XxmPCNwZkVSMeOm pSvvteXuxRtsjRu" id="BFRZfHjWhBzGEmI" style="height: 100%;" onmouseover="BNITIHZVtwqfmzK(this)" onmouseout="PLhsOBgSRcqunQC(this)" onclick="godziny_click3(event, this)"></div>`);
                            }
                        }

                        if (wejscie_godzina == jMxTKSnHwAAorfW[l].id) 
                        {
                            let minuty = wejscie_minuty;

                            let height_wejscie = (minuty * 100) / 60; //100% - 60min
                            height_wejscie = 100 - height_wejscie;

                            $(jMxTKSnHwAAorfW[l]).css({ 'align-items': 'start' });
                            $(jMxTKSnHwAAorfW[l]).append(`<div class="XxmPCNwZkVSMeOm pSvvteXuxRtsjRu" id="BFRZfHjWhBzGEmI" style="height: ${height_wejscie}%;" onmouseover="BNITIHZVtwqfmzK(this)" onmouseout="PLhsOBgSRcqunQC(this)" onclick="godziny_click3(event, this)"></div>`);
                        }

                        if (wyjscie_godzina == jMxTKSnHwAAorfW[l].id) 
                        {
                            let minuty = wyjscie_minuty;

                            let height_wyjscie = (minuty * 100) / 60; //100% - 60min

                            $(jMxTKSnHwAAorfW[l]).css({ 'align-items': 'end' });
                            $(jMxTKSnHwAAorfW[l]).append(`<div class="XxmPCNwZkVSMeOm pSvvteXuxRtsjRu" id="BFRZfHjWhBzGEmI" style="height: ${height_wyjscie}%;" onmouseover="BNITIHZVtwqfmzK(this)" onmouseout="PLhsOBgSRcqunQC(this)" onclick="godziny_click3(event, this)"></div>`);
                        }
                    }
                }
            }
        }
    }

    //urlopy
    if (urlopy.length > 0) {
        for (let i = 0; i < urlopy.length; i++) {
            for (let j = 0; j < slupkiDivs.length; j++) {
                if (new Date(slupkiDivs[j].id).toLocaleDateString() == new Date(urlopy[i].leaveDate).toLocaleDateString()) {
                    let jMxTKSnHwAAorfW = $(slupkiDivs[j]).children('.jMxTKSnHwAAorfW');
                    for (let l = 0; l < jMxTKSnHwAAorfW.length; l++) {
                        $(jMxTKSnHwAAorfW[l]).append(`<div class="XxmPCNwZkVSMeOm_urlopy pSvvteXuxRtsjRu" id="BFRZfHjWhBzGEmI" style="height: 100%;" onmouseover="BNITIHZVtwqfmzK(this)" onmouseout="PLhsOBgSRcqunQC(this)" onclick="godziny_click3(event, this)"></div>`);
                    }
                }
            }
        }
    }
    



    $('#vWbUhILVpdyutyE').children().eq(0).hide();
    $('#vWbUhILVpdyutyE').children().eq(2).hide();
    $('#vWbUhILVpdyutyE').children().eq(3).show();

    $('#imAZBCksRVUuDsR_').hide();
    $('#kCJfJXsYxCydUDw_').hide();
    $('#GYgSdzJuBJAuFcM_').show();
};

function KHPLvgvQxFmHMtE(e, t) 
{
    //let height = $(t).height();

    //$(t).append(`<div class="dMFrkMfYnGnosOU" style="height:` + height + `px; "></div>`);
};

function JseGUINRHEBAnvv(e, t) 
{
    //$(t).children('.dMFrkMfYnGnosOU').remove();
};

function godziny_click3(e, t) 
{
    let lifDKbCfNCuDQMs_inner = '';

    //
    let okresRozliczeniowy;
    let czasPracyMax;
    let maksymalnaLiczbaNadgodzin;
    let maksymalnaLiczbaNadgodzinTydzien;
    let nieprzerwanyOdpoczynek;

    for (let i = 0; i < model_ts.length; i++)
    {
        if (model_ts[i].WorkerId != null && model_ts[i].WorkerId == workerID)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
        }
        if (model_ts[i].WorkerId == null)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
        }
    }
    //

    //
    let workerID = document.getElementById('AOZzvXnLtNqUPwN').value;
    let id_date = new Date($(t).parent().parent().attr('id')).toLocaleDateString();
    for (let i = 0; i < model_t.length; i++) 
    {
        let enter = new Date(model_t[i].Enter).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let enterDate = new Date(model_t[i].Enter).toLocaleDateString();
        let exit = new Date(model_t[i].Exit).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (model_t[i].WorkerID == workerID && new Date(model_t[i].Enter).toLocaleDateString() == id_date && new Date(model_t[i].Exit).toLocaleDateString() == id_date) 
        {
            lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL WnsxQjKwiwuSdTR"><span>` + enterDate + `</span></div>`;
            lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm"><span>Wejście</span><span>` + enter + `</span></div>`;
            lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm"><span>Wyjście</span><span>` + exit + `</span></div>`;


            let date1 = new Date(model_t[i].Enter);
            let date2 = new Date(model_t[i].Exit);
            if (date2 > date1)
            {
                //dzien

                let diff = date2 - date1;
                let godzinyPracy = Math.abs(parseFloat(convertTime(diff)));
                godzinyPracy = godzinyPracy.toFixed(2);

                lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm"><span>Godziny</span><span>` + godzinyPracy + `</span></div>`;

                //nadgodziny
                if (godzinyPracy > czasPracyMax) 
                {
                    let roz = godzinyPracy - czasPracyMax;
                    lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm ATCrevbfpQDiJPh"><span>Nadgodziny</span><span>` + roz.toFixed(2) + `</span></div>`;
                }
                //normalny czas pracy
                if (godzinyPracy == czasPracyMax) 
                {
                    lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm ATCrevbfpQDiJPh"><span>Nadgodziny</span><span>0.00</span></div>`;

                }
                //niedogodziny
                if (godzinyPracy < czasPracyMax) 
                {
                    let roz = godzinyPracy - czasPracyMax;
                    lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm ATCrevbfpQDiJPh"><span>Nadgodziny</span><span>` + roz.toFixed(2) + `</span></div>`;

                }
            }
            else 
            {
                //nocka


            }
        }
        if (model_t[i].WorkerID == workerID && new Date(model_t[i].LeaveDate).toLocaleDateString() == id_date) 
        {
            let enterDate = new Date(model_t[i].LeaveDate).toLocaleDateString();

            lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL WnsxQjKwiwuSdTR"><span>` + enterDate + `</span></div>`;

            for (let j = 0; j < model_l.length; j++) 
            {
                if (model_t[i].LeaveID == model_l[j].Id) 
                {
                    lifDKbCfNCuDQMs_inner += `<div class="tCXsXbRkjrIUFhL ATLUjzIISjBjfVm ATCrevbfpQDiJPh"><span>` + model_l[j].Name + `</span></div>`;
                }
            }
        }
    }
    //


    let kmrOEZkQcUWqaEc_all = $(t).parent().parent().parent().children('.kmrOEZkQcUWqaEc');
    for (let i = 0; i < kmrOEZkQcUWqaEc_all.length; i++)
    {
        if ($(t).parent().parent().attr('id') != kmrOEZkQcUWqaEc_all[i].id)
        {
            $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').css({ 'opacity': '0.5', 'border': '' });

            $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').removeClass('AOwYMEVGxKdwzSH');

            $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').attr('onclick', 'godziny_click3(event, this)');
        }
        else 
        {
            $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').css({ 'opacity': '' });

            $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').attr('onclick', 'godziny_already_selected3(event, this)');

            if ($(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').hasClass('AOwYMEVGxKdwzSH')) 
            {
                $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').css({ 'border-left': '', 'border-right': '' });
                $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').first().css({ 'border-top': '' });
                $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').last().css({ 'border-bottom': '' });
            }
            else 
            {
                $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').css({ 'border-left': '1px solid rgba(255, 255, 255, 1)', 'border-right': '1px solid rgba(255, 255, 255, 1)' });
                $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').first().css({ 'border-top': '1px solid rgba(255, 255, 255, 1)' });
                $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').last().css({ 'border-bottom': '1px solid rgba(255, 255, 255, 1)' });
            }

            $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').addClass('AOwYMEVGxKdwzSH');
        }

        $(kmrOEZkQcUWqaEc_all[i]).children().children('.UPLggzHUmhGMnUS').fadeOut(100);
        $(kmrOEZkQcUWqaEc_all[i]).children().children('.sDNWoHChtnkFbSv').fadeOut(100);
    }

    
    //disable 3 icons
    let GobmBwqqBbAsPaX_divs = $('#qgPGzbIhlJSHVqt').children();
    for (let i = 0; i < GobmBwqqBbAsPaX_divs.length; i++)
    {
        $(GobmBwqqBbAsPaX_divs[i]).addClass('bxBvYhrbLSeGbvD');
    }

    //hide all elements from left
    let JiqrmfnbjXICdKP_children = $('#JiqrmfnbjXICdKP').children();
    for (let i = 1; i < JiqrmfnbjXICdKP_children.length; i++)
    {
        $(JiqrmfnbjXICdKP_children[i]).hide();
    }


    //show details of the day
    let html_inner = `<div class="BnDZmDEehCCybzG LPbaczkZTGFbIBk eoqqePJDEGcpBVc" onclick="FUWElaBdItrkWya()" title="Zamknij">` +
        `<svg viewBox="0 0 470 470" width="15" height="15">` +
        `<path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path>` +
        `</svg>` +
        `</div>` +
        `<div class="WVnJiTrzzpihqVh">` + lifDKbCfNCuDQMs_inner + `</div>` +
        `<div class="pyyxmssXgPCWuUc xVZlAxNFqwZlPbw xoVNvtfbkkicGGv" style="display: none;" onclick="xgNCiYYvDQOyAsg(event, this)"><span>Edytuj</span>     <div class="barContainer"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div></div>      </div>` +
        `<div class="uuJdinqoZMWGSOQ" id="ItKaYYquFHeJjGF" style="display: none;">` +
        `<div class="pyyxmssXgPCWuUc xVZlAxNFqwZlPbw xoVNvtfbkkicGGv UFRwAQEzzfXjfNw" onclick=""><span>Zmień godziny pracy</span></div>` +
        `<div class="pyyxmssXgPCWuUc xVZlAxNFqwZlPbw xoVNvtfbkkicGGv UFRwAQEzzfXjfNw" onclick=""><span>Zapisz jako godziny nadliczbowe</span></div>` +
        `</div>`;


    let html_inner_urlop = `<div class="BnDZmDEehCCybzG LPbaczkZTGFbIBk eoqqePJDEGcpBVc" onclick="FUWElaBdItrkWya()" title="Zamknij">` +
        `<svg viewBox="0 0 470 470" width="15" height="15">` +
        `<path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path>` +
        `</svg>` +
        `</div>` +
        `<div class="WVnJiTrzzpihqVh">` + lifDKbCfNCuDQMs_inner + `</div>`;


    for (let i = 0; i < model_t.length; i++) 
    {
        if (model_t[i].WorkerID == workerID && new Date(model_t[i].Enter).toLocaleDateString() == id_date && new Date(model_t[i].Exit).toLocaleDateString() == id_date) 
        {
            $('#lifDKbCfNCuDQMs').html(html_inner);
        }
        if (model_t[i].WorkerID == workerID && new Date(model_t[i].LeaveDate).toLocaleDateString() == id_date) 
        {
            $('#lifDKbCfNCuDQMs').html(html_inner_urlop);
        }
    }



    if (sessionStorage.getItem('AyLyCuPgYYYxaJX') != null)
    {
        $('#lifDKbCfNCuDQMs').show();
    }
    else
    {
        sessionStorage.setItem('AyLyCuPgYYYxaJX', 'true');
        $('#lifDKbCfNCuDQMs').fadeIn(100);
    }



    e.stopPropagation();
};

function FUWElaBdItrkWya() 
{
    sessionStorage.removeItem('AyLyCuPgYYYxaJX');
    $('#lifDKbCfNCuDQMs').hide();

    let kmrOEZkQcUWqaEc_all = document.querySelectorAll('.kmrOEZkQcUWqaEc');
    for (let i = 0; i < kmrOEZkQcUWqaEc_all.length; i++) 
    {
        $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').css({ 'border-left': '', 'border-right': '', 'opacity': '' });
        $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').first().css({ 'border-top': '' });
        $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').last().css({ 'border-bottom': '' });


        $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').removeClass('AOwYMEVGxKdwzSH');


        $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').attr('onclick', 'godziny_click3(event, this)');


        $(kmrOEZkQcUWqaEc_all[i]).children().children('.UPLggzHUmhGMnUS').fadeIn(100);
        $(kmrOEZkQcUWqaEc_all[i]).children().children('.sDNWoHChtnkFbSv').fadeIn(100);
    }

    //enable 3 icons
    let GobmBwqqBbAsPaX_divs = $('#qgPGzbIhlJSHVqt').children();
    for (let i = 0; i < GobmBwqqBbAsPaX_divs.length; i++)
    {
        $(GobmBwqqBbAsPaX_divs[i]).removeClass('bxBvYhrbLSeGbvD');
    }

    //show all elements from left
    let JiqrmfnbjXICdKP_children = $('#JiqrmfnbjXICdKP').children();
    for (let i = 1; i < JiqrmfnbjXICdKP_children.length; i++)
    {
        $(JiqrmfnbjXICdKP_children[i]).fadeIn(100);
    }

    //hide details of the day
    $('#lifDKbCfNCuDQMs').hide();
    if (sessionStorage.getItem('AyLyCuPgYYYxaJX') != null)
    {
        sessionStorage.removeItem('AyLyCuPgYYYxaJX');
    }
};

function godziny_already_selected3(e, t) 
{
    let kmrOEZkQcUWqaEc_all = $(t).parent().parent().parent().children('.kmrOEZkQcUWqaEc');
    for (let i = 0; i < kmrOEZkQcUWqaEc_all.length; i++) 
    {
        if ($(t).parent().parent().attr('id') != kmrOEZkQcUWqaEc_all[i].id) 
        {
            $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').css({ 'opacity': '' });
        }
        else 
        {
            $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').css({ 'opacity': '', 'border': '' });

            $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').removeClass('AOwYMEVGxKdwzSH');

            $(kmrOEZkQcUWqaEc_all[i]).children().children('#BFRZfHjWhBzGEmI').attr('onclick', 'godziny_click3(event, this)');
        }

        $(kmrOEZkQcUWqaEc_all[i]).children().children('.UPLggzHUmhGMnUS').fadeIn(100);
        $(kmrOEZkQcUWqaEc_all[i]).children().children('.sDNWoHChtnkFbSv').fadeIn(100);
    }


    //enable 3 icons
    let GobmBwqqBbAsPaX_divs = $('#qgPGzbIhlJSHVqt').children();
    for (let i = 0; i < GobmBwqqBbAsPaX_divs.length; i++)
    {
        $(GobmBwqqBbAsPaX_divs[i]).removeClass('bxBvYhrbLSeGbvD');
    }

    //show all elements from left
    let JiqrmfnbjXICdKP_children = $('#JiqrmfnbjXICdKP').children();
    for (let i = 1; i < JiqrmfnbjXICdKP_children.length; i++)
    {
        $(JiqrmfnbjXICdKP_children[i]).fadeIn(100);
    }

    //hide details of the day
    $('#lifDKbCfNCuDQMs').hide();
    if (sessionStorage.getItem('AyLyCuPgYYYxaJX') != null)
    {
        sessionStorage.removeItem('AyLyCuPgYYYxaJX');
    }


    e.stopPropagation();
};

$('#OvLPfkiiNwdRYgn').on('change', function ()
{
    jHMXFoMqHBqRHoJ();
});

$('#VQnvdBYLMNSKvmR').on('change', function ()
{
    jHMXFoMqHBqRHoJ();
});

$('#ZaLlHWcvXQiYgTv').on('change', function ()
{
    document.getElementById('AOZzvXnLtNqUPwN').innerHTML = '';

    let aFoQOFiXPQobjPX = document.getElementById('ZaLlHWcvXQiYgTv');
    let departmentID_ = aFoQOFiXPQobjPX.options[aFoQOFiXPQobjPX.selectedIndex].value;

    for (let i = 0; i < model_w.length; i++)
    {
        if (model_w[i].DepartmentID == departmentID_)
        {
            document.getElementById('AOZzvXnLtNqUPwN').innerHTML += `<option value="` + model_w[i].Id + `" id="` + model_w[i].DepartmentID + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
        }
    }

    jHMXFoMqHBqRHoJ();
});
$('#ZaLlHWcvXQiYgTv').trigger('change');

$('#AOZzvXnLtNqUPwN').on('change', function ()
{
    jHMXFoMqHBqRHoJ();
});

function fZyjOJhrSKbOWIT()
{
    $('#fZyjOJhrSKbOWIT_').addClass('pEvsatYDpkDeDPp');
    $('#piQGwnkhyVDjpuD_').removeClass('pEvsatYDpkDeDPp');
    $('#aUsCMMTyjqhmxBa_').removeClass('pEvsatYDpkDeDPp');

    sessionStorage.removeItem('piQGwnkhyVDjpuD');
    sessionStorage.removeItem('aUsCMMTyjqhmxBa');

    generateStatistics();
};

function piQGwnkhyVDjpuD() 
{
    $('#fZyjOJhrSKbOWIT_').removeClass('pEvsatYDpkDeDPp');
    $('#piQGwnkhyVDjpuD_').addClass('pEvsatYDpkDeDPp');
    $('#aUsCMMTyjqhmxBa_').removeClass('pEvsatYDpkDeDPp');

    sessionStorage.setItem('piQGwnkhyVDjpuD', 'true');
    sessionStorage.removeItem('aUsCMMTyjqhmxBa');

    generateStatistics2();
};

function aUsCMMTyjqhmxBa() 
{
    $('#fZyjOJhrSKbOWIT_').removeClass('pEvsatYDpkDeDPp');
    $('#piQGwnkhyVDjpuD_').removeClass('pEvsatYDpkDeDPp');
    $('#aUsCMMTyjqhmxBa_').addClass('pEvsatYDpkDeDPp');

    sessionStorage.removeItem('piQGwnkhyVDjpuD');
    sessionStorage.setItem('aUsCMMTyjqhmxBa', 'true');

    generateStatistics3();
};

function jHMXFoMqHBqRHoJ() 
{
    if (sessionStorage.getItem('piQGwnkhyVDjpuD') != null && sessionStorage.getItem('aUsCMMTyjqhmxBa') == null)
    {
        piQGwnkhyVDjpuD();
    }
    else if (sessionStorage.getItem('piQGwnkhyVDjpuD') == null && sessionStorage.getItem('aUsCMMTyjqhmxBa') != null)
    {
        aUsCMMTyjqhmxBa();
    }
    else 
    {
        fZyjOJhrSKbOWIT();
    }

};
jHMXFoMqHBqRHoJ();


