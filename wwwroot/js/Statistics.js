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

function generateStatistics(){
    let workerID = document.getElementById('AOZzvXnLtNqUPwN').value;
    let departmentID_ = document.getElementById('ZaLlHWcvXQiYgTv').value;
    let year = document.getElementById('OvLPfkiiNwdRYgn').value;
    let month = document.getElementById('VQnvdBYLMNSKvmR').value;
    let currentMonth = parseInt(month) + 1;

    var daysLength = daysInMonth(currentMonth, year);

    let divs = '';
    let slupki = '';

    document.getElementById('KjseMRiNyEJWtCR_').innerHTML = '';

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
        //slupki += `<div class="kmrOEZkQcUWqaEc" id=` + wholeDate + `><div class="XxmPCNwZkVSMeOm"></div></div>`;
        slupki += `<div class="kmrOEZkQcUWqaEc" id=` + wholeDate + `></div>`;
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
                            niedogodziny.push({ wejscie: date1, wyjscie: date2, ile: godzinyPracy, roznica: roz.toFixed(2) });
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
    let heightOfDiv;
    for (let i = 0; i < nadgodziny.length; i++) {
        if (nawyzszaWartosc == nadgodziny[i].ile) {
            heightOfDiv = 100;// %
        }
    }








    







    //widok poziomy
    if ($('#relrPYFTLYqMaqt').prop('checked')) 
    {
        
    }

    //widok pionowy
    if ($('#qDXIOKGzpBOMvoB').prop('checked')) 
    {
        
    }
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
        fZyjOJhrSKbOWIT();
    }
    else {
        piQGwnkhyVDjpuD();
    }
};
jHMXFoMqHBqRHoJ();

