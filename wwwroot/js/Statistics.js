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
    $(t).css({
        'opacity': '1',
        'cursor': 'pointer',
    });

    $(t).parent().parent().children().eq(0).children().eq(0).css({
        'opacity': '1',
        'cursor': 'pointer',
    });
};

function nadgodziny_mouseOver(t) 
{
    $(t).css({
        'opacity': '1',
        'cursor': 'pointer',
    });

    $(t).parent().parent().children().eq(1).children().eq(0).css({
        'opacity': '1',
        'cursor': 'pointer',
    });
};

function godziny_mouseOut(t) 
{
    $(t).css({
        'opacity': '',
        'cursor': '',
    });

    $(t).parent().parent().children().eq(0).children().eq(0).css({
        'opacity': '',
        'cursor': '',
    });
};

function nadgodziny_mouseOut(t) 
{
    $(t).css({
        'opacity': '',
        'cursor': '',
    });

    $(t).parent().parent().children().eq(1).children().eq(0).css({
        'opacity': '',
        'cursor': '',
    });
};

function generateStatistics()
{
    let workerID = document.getElementById('AOZzvXnLtNqUPwN').value;
    let departmentID_ = document.getElementById('ZaLlHWcvXQiYgTv').value;
    let year = document.getElementById('OvLPfkiiNwdRYgn').value;
    let month = document.getElementById('VQnvdBYLMNSKvmR').value;
    let currentMonth = parseInt(month) + 1;

    var daysLength = daysInMonth(currentMonth, year);

    let divs = '';
    let slupki = '';

    document.getElementById('KjseMRiNyEJWtCR_').innerHTML = '';

    slupki += '<div class="PClmWtOMrNAvPvx WKjuhXBDPRbWrrF" id="PClmWtOMrNAvPvx_"></div>';
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
        //slupki += `<div class="kmrOEZkQcUWqaEc" id=` + wholeDate + `></div>`;
        slupki += `<div class="kmrOEZkQcUWqaEc" id=` + wholeDate + `><div class="nadgodziny" id="nadgodziny_"></div><div class="godziny" id="godziny_"></div></div>`;
    }

    $('#KjseMRiNyEJWtCR_').html(divs);
    $('#yTKpwuaIyVAZjYk_').html(slupki);



    let QlVtsqDYVktZFfQ = document.querySelectorAll('.QlVtsqDYVktZFfQ');
    for (let i = 0; i < model_h.length; i++) {
        for (let j = 0; j < QlVtsqDYVktZFfQ.length; j++) {
            if (new Date(model_h[i].Date).toLocaleDateString() == new Date(QlVtsqDYVktZFfQ[j].id).toLocaleDateString()) {
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
    for (let i = 0; i < slupkiDivs.length; i++) {
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
                            //console.log(roz);
                        }
                        //normalny czas pracy
                        if (godzinyPracy == czasPracyMax) 
                        {
                            normalneGodziny.push({ wejscie: date1, wyjscie: date2, ile: godzinyPracy });
                            //console.log(godzinyPracy);
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
                        //let godzin_8 = nadgodziny[i].ile - nadgodziny[i].roznica; //powinno zawsze być tyle ile w bazie
                        //percentHeight_8 = (100 * godzin_8) / nadgodziny[i].ile;
                        //percentHeight_nadgodziny = 100 - percentHeight_8;

                        //slupkiDivs[j].innerHTML += `<div class="XxmPCNwZkVSMeOm_" style="height: ${percentHeight_nadgodziny}%;"></div>`; //nadgodzimy
                        //slupkiDivs[j].innerHTML += `<div class="XxmPCNwZkVSMeOm" style="height: ${percentHeight_8}%;"></div>`; //normalne godziny

                        //$(slupkiDivs[j]).children('.nadgodziny').html(`<div class="XxmPCNwZkVSMeOm_" style="height: ${percentHeight_nadgodziny}%;"></div>`);
                        //$(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm" style="height: ${percentHeight_8}%;"></div>`);

                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm" style="height: 100%;" onmouseover="godziny_mouseOver(this)" onmouseout="godziny_mouseOut(this)"></div>`);
                        $(slupkiDivs[j]).children('.nadgodziny').html(`<div class="XxmPCNwZkVSMeOm_" style="height: 100%;" onmouseover="nadgodziny_mouseOver(this)" onmouseout="nadgodziny_mouseOut(this)"></div>`);
                    }
                    else
                    {
                        //let godzin = nadgodziny[i].ile - nadgodziny[i].roznica;
                        //let percentHeight = (percentHeight_8 * godzin) / nadgodziny[i].ile;
                        //let percentHeight_nadgodziny_ = percentHeight_8 - percentHeight;

                        //slupkiDivs[j].innerHTML += `<div class="XxmPCNwZkVSMeOm_" style="height: ${percentHeight_nadgodziny_}%;"></div>`; //nadgodzimy
                        //slupkiDivs[j].innerHTML += `<div class="XxmPCNwZkVSMeOm" style="height: ${percentHeight_8}%;"></div>`; //normalne godziny

                        //$(slupkiDivs[j]).children('.nadgodziny').html(`<div class="XxmPCNwZkVSMeOm_" style="height: ${percentHeight_nadgodziny_}%;"></div>`);
                        //$(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm" style="height: ${percentHeight}%;"></div>`);

                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm" style="height: 100%;" onmouseover="godziny_mouseOver(this)" onmouseout="godziny_mouseOut(this)"></div>`);

                        let roznica = nawyzszaWartosc - (nadgodziny[i].ile - nadgodziny[i].roznica);
                        let percentHeight = (100 * nadgodziny[i].roznica) / roznica;

                        $(slupkiDivs[j]).children('.nadgodziny').html(`<div class="XxmPCNwZkVSMeOm_" style="height: ${percentHeight}%; min-height: 1px;" onmouseover="nadgodziny_mouseOver(this)" onmouseout="nadgodziny_mouseOut(this)"></div>`);
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
                        //slupkiDivs[j].innerHTML += `<div class="XxmPCNwZkVSMeOm" style="height: ${percentHeight_8}%;"></div>`; //normalne godziny
                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm" style="height: 100%;" onmouseover="godziny_mouseOver(this)" onmouseout="godziny_mouseOut(this)"></div>`);
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
                        //let godzin = niedogodziny[i].ile - niedogodziny[i].roznica;
                        //let percentHeight = (percentHeight_8 * godzin) / niedogodziny[i].ile;

                        //slupkiDivs[j].innerHTML += `<div class="XxmPCNwZkVSMeOm__" style="height: ${percentHeight}%;"></div>`; //niedogodziny
                        //$(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm__" style="height: ${percentHeight}%;"></div>`);

                        let percentHeight = (niedogodziny[i].ile * 100) / (parseFloat(niedogodziny[i].ile) + parseFloat(niedogodziny[i].roznica));
                        $(slupkiDivs[j]).children('.godziny').html(`<div class="XxmPCNwZkVSMeOm__" style="height: ${percentHeight}%;" onmouseover="godziny_mouseOver(this)" onmouseout="godziny_mouseOut(this)"></div>`);
                    }
                }
            }
        }
    }
    else 
    {
        
    }
    

    
    //znaczniki
    if (percentHeight_8 != undefined) {
        let divide_8 = 100 / czasPracyMax;

        let ymCjBkLWIjwBVgR_innerDivs = '';
        for (let i = czasPracyMax; i >= 0; i--)
        {
            ymCjBkLWIjwBVgR_innerDivs += `<div class="ymCjBkLWIjwBVgR_" style="height:${divide_8}%;"><span>${i.toFixed(2) }</span></div>`;
        }

        let dividers = `<div class="lhduMWDCUEGkJNw" style="height:${percentHeight_nadgodziny}%;">` + `<span>${nawyzszaWartosc}</span>` + `</div>` +
            `<div class="ymCjBkLWIjwBVgR" style="height:${percentHeight_8}%;">${ymCjBkLWIjwBVgR_innerDivs}</div>`;

        $('#PClmWtOMrNAvPvx_').html(dividers);

        for (let i = 0; i < $('.godziny').length; i++) {
            $('.godziny').css({ 'border-top': '1px dashed rgb(90, 90, 90)' });
        }
    }
    //
    
    $('#fAWuyOhIlyZnPpU').html(`=` + czasPracyMax + `h`);
    $('#fAWuyOhIlyZnPpU_').html(`>` + czasPracyMax + `h`);
    $('#fAWuyOhIlyZnPpU__').html(`<` + czasPracyMax + `h`);
    







    //widok poziomy
    if ($('#relrPYFTLYqMaqt').prop('checked')) 
    {
        
    }

    //widok pionowy
    if ($('#qDXIOKGzpBOMvoB').prop('checked')) 
    {
        
    }

    //$('#JhmmaXkQXmKMKml_').prop('checked', false);
    //$('#JhmmaXkQXmKMKml_').parent('label').removeClass('HOZnyZWeKKoQdIf');
};
//generateStatistics();

$('#OvLPfkiiNwdRYgn').on('change', function ()
{
    generateStatistics();
});

$('#VQnvdBYLMNSKvmR').on('change', function ()
{
    generateStatistics();
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

    generateStatistics();
});
$('#ZaLlHWcvXQiYgTv').trigger('change');

$('#AOZzvXnLtNqUPwN').on('change', function ()
{
    generateStatistics();
});

function piQGwnkhyVDjpuD() {
    sessionStorage.setItem('piQGwnkhyVDjpuD', 'true');
    sessionStorage.removeItem('fZyjOJhrSKbOWIT');
    $('#relrPYFTLYqMaqt').prop('checked', true);

    $('#piQGwnkhyVDjpuD_').addClass('pEvsatYDpkDeDPp');
    $('#fZyjOJhrSKbOWIT_').removeClass('pEvsatYDpkDeDPp');

    generateStatistics();
};

function fZyjOJhrSKbOWIT() {
    sessionStorage.setItem('fZyjOJhrSKbOWIT', 'true');
    sessionStorage.removeItem('piQGwnkhyVDjpuD');
    $('#qDXIOKGzpBOMvoB').prop('checked', true);

    $('#piQGwnkhyVDjpuD_').removeClass('pEvsatYDpkDeDPp');
    $('#fZyjOJhrSKbOWIT_').addClass('pEvsatYDpkDeDPp');

    generateStatistics();
};

function jHMXFoMqHBqRHoJ() {
    if (sessionStorage.getItem('fZyjOJhrSKbOWIT') != null)
    {
        piQGwnkhyVDjpuD();
    }
    else {
        fZyjOJhrSKbOWIT();
    }
};
jHMXFoMqHBqRHoJ();

//function JhmmaXkQXmKMKml(t) {
//    let QlVtsqDYVktZFfQ = document.querySelectorAll('.QlVtsqDYVktZFfQ');
//    let kmrOEZkQcUWqaEc = document.querySelectorAll('.kmrOEZkQcUWqaEc');

//    if (t.checked)
//    {
//        $(t).parent('label').addClass('HOZnyZWeKKoQdIf');

//        for (let i = 0; i < QlVtsqDYVktZFfQ.length; i++) 
//        {
//            let data = new Date(QlVtsqDYVktZFfQ[i].id);
//            if (isWeekend(data)) 
//            {
//                $(QlVtsqDYVktZFfQ[i]).hide();
//            }
//        }

//        for (let i = 0; i < kmrOEZkQcUWqaEc.length; i++)
//        {
//            let data = new Date(kmrOEZkQcUWqaEc[i].id);
//            if (isWeekend(data))
//            {
//                $(kmrOEZkQcUWqaEc[i]).hide();
//            }
//        }
//    }
//    else 
//    {
//        $(t).parent('label').removeClass('HOZnyZWeKKoQdIf');

//        for (let i = 0; i < QlVtsqDYVktZFfQ.length; i++) 
//        {
//            let data = new Date(QlVtsqDYVktZFfQ[i].id);
//            if (isWeekend(data)) 
//            {
//                $(QlVtsqDYVktZFfQ[i]).show();
//            }
//        }

//        for (let i = 0; i < kmrOEZkQcUWqaEc.length; i++)
//        {
//            let data = new Date(kmrOEZkQcUWqaEc[i].id);
//            if (isWeekend(data))
//            {
//                $(kmrOEZkQcUWqaEc[i]).show();
//            }
//        }
//    }
    
//};

