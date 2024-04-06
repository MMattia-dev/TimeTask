
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

function isDateValid(year, month, day) 
{
    var dateObj = new Date(year, month, day);

    if (dateObj.getFullYear() == year && dateObj.getMonth() == month && dateObj.getDate() == day) 
    {
        return true;
    }
    else
    {
        return false;
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

function MEPHaojoIWKCapY() //wyznacz widok
{
    //let year = document.getElementById('iHCBwRzOLpgGYQG').value;
    let year = $('#qQgDgqyovQyICUL_').children('.settings_a_select').children('span').eq(1).html();
    if (sessionStorage.getItem('wSIspPdnliPlpLI') != null) 
    {
        year = sessionStorage.getItem('wSIspPdnliPlpLI');
    }

    //let worker = document.getElementById('oUfnFiNPmXnNjzu').value;
    let worker = $('#nrKYNmWitBwDNUj_').attr('worker');
    if (sessionStorage.getItem('ZDCmGEJAljtfCfz') != null) 
    {
        worker = sessionStorage.getItem('ZDCmGEJAljtfCfz');
    }
    let uLxtDsOksiWVnDI = document.getElementById('uLxtDsOksiWVnDI');

    let okresRozliczeniowy;
    let okresRozliczeniowyTydzien = false;
    let okresRozliczeniowyMiesiac = false;
    let czasPracyMax;
    let maksymalnaLiczbaNadgodzin;
    let maksymalnaLiczbaNadgodzinTydzien;
    let nieprzerwanyOdpoczynek;

    for (let i = 0; i < model_ts.length; i++)
    {
        if (model_ts[i].WorkerId != null && model_ts[i].WorkerId == worker)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            okresRozliczeniowyTydzien = model_ts[i].jezeliTydzien;
            okresRozliczeniowyMiesiac = model_ts[i].jezeliMiesiac;

            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
        }
        if (model_ts[i].WorkerId == null)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            okresRozliczeniowyTydzien = model_ts[i].jezeliTydzien;
            okresRozliczeniowyMiesiac = model_ts[i].jezeliMiesiac;

            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
        }
    }

    let ileMiesiecy = okresRozliczeniowy;
    let ileOkresow = 12 / ileMiesiecy;


    //okres
    if (uLxtDsOksiWVnDI.value == 'okres') 
    {
        let wplXQqsdEZEYbIm = document.getElementById('wplXQqsdEZEYbIm');
        $('#wplXQqsdEZEYbIm').html(``);
        $('#wplXQqsdEZEYbIm').removeClass('hkyYYlXJPLaqBDt');

        //dodaj okresy
        if (okresRozliczeniowyTydzien) 
        {
            let date = new Date();
            //let year_ = date.getFullYear();
            let year_ = $('#qQgDgqyovQyICUL_').children('.settings_a_select').children('span').eq(1).html();
            if (sessionStorage.getItem('wSIspPdnliPlpLI') != null) 
            {
                year_ = sessionStorage.getItem('wSIspPdnliPlpLI');
            }
            let month_ = date.getMonth() + 1;
            let day_ = date.getDate();

            $.ajax({
                type: 'GET',
                url: '/Times/WeeksInYear',
                data: {
                    year: year_,
                    month: month_,
                    day: day_
                },
                success: function (response) {
                    let weeks = response.weeks;
                    let currentWeek = response.currentWeek;

                    for (let i = 1; i <= weeks; i++) 
                    {
                        if (i == currentWeek)
                        {
                            wplXQqsdEZEYbIm.innerHTML += `<option value="` + i + `" selected>` + i + ` tydzień</option>`;
                        }
                        else 
                        {
                            wplXQqsdEZEYbIm.innerHTML += `<option value="` + i + `">` + i + ` tydzień</option>`;
                        }
                        //wplXQqsdEZEYbIm.innerHTML += `<option value="` + i + `">` + i + ` tydzień</option>`;
                    }

                    sessionStorage.setItem('LbypIFdPQyYqJNC', currentWeek);
                },
                error: function (xhr, status, error) {
                    console.log('Error:' + error);
                }
            });
        }

        if (okresRozliczeniowyMiesiac) 
        {
            for (let i = 1; i <= ileOkresow; i++)
            {
                wplXQqsdEZEYbIm.innerHTML += `<option value="` + i + `">` + i + ` okres</option>`;
            }
        }
    }

    if (uLxtDsOksiWVnDI.value == 'month') 
    {
        let currentMonth = new Date().getMonth() + 1;

        let wplXQqsdEZEYbIm = document.getElementById('wplXQqsdEZEYbIm');
        $('#wplXQqsdEZEYbIm').html(``);
        $('#wplXQqsdEZEYbIm').removeClass('hkyYYlXJPLaqBDt');
        //dodaj miesiace
        for (let i = 1; i <= 12; i++)
        {
            let month = new Date(year, i, 0).toLocaleDateString('pl-PL', { month: 'long' });
            let month_capitalize = month.charAt(0).toUpperCase() + month.slice(1);

            //wplXQqsdEZEYbIm.innerHTML += `<option value="` + i + `">` + month_capitalize + `</option>`;

            if (i == currentMonth)
                wplXQqsdEZEYbIm.innerHTML += `<option selected value="` + i + `">` + month_capitalize + `</option>`;
            else
                wplXQqsdEZEYbIm.innerHTML += `<option value="` + i + `">` + month_capitalize + `</option>`;
        }
    }
    


    generateNewTable();
};
MEPHaojoIWKCapY();

function eFALkhlnQQySpCg() 
{
    generateNewTable();
}

async function DatesInChosenWeek(y, w) 
{
    var r = $.ajax({
        type: 'GET',
        url: '/Times/DatesInChosenWeek',
        dataType: 'JSON',
        data: {
            year: y,
            weekOfYear: w
        },
        error: function (xhr, status, error)
        {
            console.log('Error:' + error);
        }
    });

    return r;
};

function generateNewTable() 
{
    //year
    //let year = document.getElementById('iHCBwRzOLpgGYQG').value;
    let year = $('#qQgDgqyovQyICUL_').children('.settings_a_select').children('span').eq(1).html();
    if (sessionStorage.getItem('wSIspPdnliPlpLI') != null) 
    {
        year = sessionStorage.getItem('wSIspPdnliPlpLI');
    }
    //department
    let department = document.getElementById('aFoQOFiXPQobjPX').value;
    //worker
    //let worker = document.getElementById('oUfnFiNPmXnNjzu').value;
    let worker = $('#nrKYNmWitBwDNUj_').attr('worker');
    if (sessionStorage.getItem('ZDCmGEJAljtfCfz') != null) 
    {
        worker = sessionStorage.getItem('ZDCmGEJAljtfCfz');
    }
    //widok
    let widok = document.getElementById('uLxtDsOksiWVnDI').value;
    




    let okresRozliczeniowy;
    let okresRozliczeniowyTydzien = false;
    let okresRozliczeniowyMiesiac = false;
    let czasPracyMax;
    let maksymalnaLiczbaNadgodzin;
    let maksymalnaLiczbaNadgodzinTydzien;
    let nieprzerwanyOdpoczynek;

    for (let i = 0; i < model_ts.length; i++)
    {
        if (model_ts[i].WorkerId != null && model_ts[i].WorkerId == worker)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            okresRozliczeniowyTydzien = model_ts[i].jezeliTydzien;
            okresRozliczeniowyMiesiac = model_ts[i].jezeliMiesiac;

            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
        }
        if (model_ts[i].WorkerId == null)
        {
            okresRozliczeniowy = model_ts[i].OkresRozliczeniowy;
            okresRozliczeniowyTydzien = model_ts[i].jezeliTydzien;
            okresRozliczeniowyMiesiac = model_ts[i].jezeliMiesiac;

            czasPracyMax = model_ts[i].CzasPracy;
            maksymalnaLiczbaNadgodzin = model_ts[i].MaksymalnaLiczbaNadgodzin;
            maksymalnaLiczbaNadgodzinTydzien = model_ts[i].MaksymalnaLiczbaNadgodzinTydzien;
            nieprzerwanyOdpoczynek = model_ts[i].NieprzerwanyOdpoczynek;
        }
    }





    document.getElementById('xhXEyORRmmYlQgG').innerHTML = '';

    //document.getElementById('xhXEyORRmmYlQgG').innerHTML = `<thead><tr><th></th><th>Styczeń</th><th>Luty</th><th>Marzec</th><th>Kwiecień</th><th>Maj</th><th>Czerwiec</th><th>Lipiec</th><th>Sierpień</th><th>Wrzesień</th><th>Październik</th><th>Listopad</th><th>Grudzień</th></tr></thead>`;

    //for (let i = 1; i <= 31; i++) 
    //{
    //    document.getElementById('xhXEyORRmmYlQgG').innerHTML += `<tbody><tr><td>` + i + `</td><td id="` + year + `-1-` + i + `"></td><td id="` + year + `-2-` + i + `"></td><td id="` + year + `-3-` + i + `"></td><td id="` + year + `-4-` + i + `"></td><td id="` + year + `-5-` + i + `"></td><td id="` + year + `-6-` + i + `"></td><td id="` + year + `-7-` + i + `"></td><td id="` + year + `-8-` + i + `"></td><td id="` + year + `-9-` + i + `"></td><td id="` + year + `-10-` + i + `"></td><td id="` + year + `-11-` + i + `"></td><td id="` + year + `-12-` + i + `"></td></tr></tbody>`;
    //}
    if (widok == 'month') 
    {
        $('#xhXEyORRmmYlQgG').addClass('wHJdQTeGtaPLEfX');

        let okres = document.getElementById('wplXQqsdEZEYbIm');

        let month = new Date(year, parseInt(okres.value), 0).toLocaleDateString('pl-PL', { month: 'long' });
        let month_capitalize = month.charAt(0).toUpperCase() + month.slice(1);

        document.getElementById('xhXEyORRmmYlQgG').innerHTML = `<thead><tr><th></th></tr></thead>`;
        document.querySelector('#xhXEyORRmmYlQgG thead tr').innerHTML += `<th>` + month_capitalize + `</th>`;

        for (let i = 1; i <= 31; i++) 
        {
            document.getElementById('xhXEyORRmmYlQgG').innerHTML += `<tbody><tr><td>` + i + `</td><td id="` + year + `-` + parseInt(okres.value) + `-` + i + `"></td></tr></tbody>`;
        }
    }
    if (widok == 'okres') 
    {
        $('#xhXEyORRmmYlQgG').removeClass('wHJdQTeGtaPLEfX');
        $('#xhXEyORRmmYlQgG').addClass('mKzzcPQqeZIcPIP');

        if (okresRozliczeniowyTydzien) 
        {
            $('#xhXEyORRmmYlQgG').addClass('GdZLnnkZEhjNeVS');

            let tydzien = document.getElementById('wplXQqsdEZEYbIm');
            let currentWeek = sessionStorage.getItem('LbypIFdPQyYqJNC');
            let weekFix = null;


            if (tydzien.value == '')
                weekFix = currentWeek;
            else 
                weekFix = tydzien.value;
            


            //document.getElementById('xhXEyORRmmYlQgG').innerHTML = `<thead><tr><th></th><th>` + weekFix + ` tydzień</th></tr></thead>`; 
            var promise = DatesInChosenWeek(year, weekFix).then(function (r) 
            {
                let divideHeight = 90 / r.length;

                r.result.forEach(function (e)
                {
                    let newDate = new Date(e).toISOString().split('T')[0];

                    let y = new Date(e).getFullYear();
                    let m = padWithLeadingZeros(new Date(e).getMonth() + 1, 2);
                    let d = padWithLeadingZeros(new Date(e).getDate(), 2);
                    let wholeDate = y + '-' + m + '-' + d;

                    //document.getElementById('xhXEyORRmmYlQgG').innerHTML += `<tbody><tr style="height: ` + divideHeight + `%;"><td>` + wholeDate + `</td><td id="` + newDate + `"></td></tr></tbody>`;
                    document.getElementById('xhXEyORRmmYlQgG').innerHTML += `<tbody><tr style="height: ` + divideHeight + `%;"><td style="width: 105px;">` + wholeDate + `</td><td style="width: calc(100% - 105px);" id="` + wholeDate + `"></td></tr></tbody>`;
                });

                var TDs = document.querySelectorAll('#xhXEyORRmmYlQgG tbody tr td:not(:first-child)');
                for (let i = 0; i < TDs.length; i++) 
                {
                    TDs[i].setAttribute('onclick', 'HIJPFbwutXHZxGn(this)');
                    TDs[i].setAttribute('title', TDs[i].id);


                    TDs[i].setAttribute('onmouseover', 'bxLcBeaOvMopDll(event, this)');
                    TDs[i].setAttribute('onmouseout', 'xGCnnFtbrNPSNPm(event, this)');
                }

                //czas
                for (let i = 0; i < TDs.length; i++)
                {
                    let TDdate = new Date(TDs[i].id).toLocaleDateString();
                    for (let l = 0; l < model_t.length; l++)
                    {
                        if (worker == model_t[l].WorkerID) 
                        {
                            if (model_t[l].Enter != null && model_t[l].Exit != null)
                            {
                                let enterDate = new Date(model_t[l].Enter).toLocaleDateString();
                                let exitDate = new Date(model_t[l].Exit).toLocaleDateString();

                                if (enterDate == TDdate && exitDate == TDdate)
                                {
                                    $(TDs[i]).addClass('disabled');
                                    $(TDs[i]).html('');
                                    $(TDs[i]).removeAttr('onmouseover');
                                    $(TDs[i]).removeAttr('onmouseout');
                                    $(TDs[i]).removeAttr('onclick');
                                    $(TDs[i]).removeAttr('title');
                                    $(TDs[i]).removeAttr('id');
                                }
                            }
                            else 
                            {
                                let leaveDate = new Date(model_t[l].LeaveDate).toLocaleDateString();

                                if (leaveDate == TDdate)
                                {
                                    for (let j = 0; j < model_l.length; j++)
                                    {
                                        if (model_t[l].LeaveID == model_l[j].Id)
                                        {
                                            TDs[i].innerHTML = `<div class="IpLJVyLZIbPJsat" id="` + model_l[j].Id + `">` + //title="` + model_l[j].Name + `"
                                                `<span>` + model_l[j].Name + `</span>` +
                                                `</div>`;

                                            $(TDs[i]).addClass('IdBgKIHybgYpxXJ');
                                            TDs[i].setAttribute('onclick', 'BHuhsNtfdNbyAVV(this)');
                                            TDs[i].setAttribute('title', 'Edytuj urlop');
                                            TDs[i].setAttribute('id_', model_t[l].Id);
                                        }
                                    }
                                }
                            }
                        }
                    }


                    let dayToCheck = parseInt(TDs[i].id.split('-')[2]);
                    let monthToCheck = parseInt(TDs[i].id.split('-')[1]) - 1;
                    let yearToCheck = parseInt(TDs[i].id.split('-')[0]);
                    if (!isDateValid(yearToCheck, monthToCheck, dayToCheck))
                    {
                        $(TDs[i]).addClass('disabled');
                        $(TDs[i]).html('');
                        $(TDs[i]).removeAttr('onmouseover');
                        $(TDs[i]).removeAttr('onmouseout');
                        $(TDs[i]).removeAttr('onclick');
                        $(TDs[i]).removeAttr('title');
                        $(TDs[i]).removeAttr('id');
                    }
                }
                //

                //"Pokaż dni wolne od pracy"
                //if (sessionStorage.getItem('XLsdAGmRfSDLmVh') != null)
                //{
                //    document.getElementById('MxLHxritEhBvupe').checked = true;
                //    MxLHxritEhBvupe_();
                //}
                //
            });
        }

        if (okresRozliczeniowyMiesiac) 
        {
            let ileMiesiecy = okresRozliczeniowy;
            let ileOkresow = 12 / ileMiesiecy;
            let divide = 100 / ileMiesiecy;
            let minus = 40 / ileMiesiecy;

            let okres = document.getElementById('wplXQqsdEZEYbIm');

            let pierwszyMiesiac = null;
            let ostatniMiesiac = null;
            if (ileOkresow == 3) 
            {
                if (okres.value == 1) { pierwszyMiesiac = 1; ostatniMiesiac = 4; }
                if (okres.value == 2) { pierwszyMiesiac = 5; ostatniMiesiac = 8; }
                if (okres.value == 3) { pierwszyMiesiac = 9; ostatniMiesiac = 12; }
            }
            if (ileOkresow == 4) 
            {
                if (okres.value == 1) { pierwszyMiesiac = 1; ostatniMiesiac = 3; }
                if (okres.value == 2) { pierwszyMiesiac = 4; ostatniMiesiac = 6; }
                if (okres.value == 3) { pierwszyMiesiac = 7; ostatniMiesiac = 9; }
                if (okres.value == 4) { pierwszyMiesiac = 10; ostatniMiesiac = 12; }
            }
            if (ileOkresow == 6) 
            {
                if (okres.value == 1) { pierwszyMiesiac = 1; ostatniMiesiac = 2; }
                if (okres.value == 2) { pierwszyMiesiac = 3; ostatniMiesiac = 4; }
                if (okres.value == 3) { pierwszyMiesiac = 5; ostatniMiesiac = 6; }
                if (okres.value == 4) { pierwszyMiesiac = 7; ostatniMiesiac = 8; }
                if (okres.value == 5) { pierwszyMiesiac = 9; ostatniMiesiac = 10; }
                if (okres.value == 6) { pierwszyMiesiac = 11; ostatniMiesiac = 12; }
            }

            document.getElementById('xhXEyORRmmYlQgG').innerHTML = `<thead><tr><th></th></tr></thead>`;
            if (pierwszyMiesiac != null && ostatniMiesiac != null && pierwszyMiesiac != ostatniMiesiac) 
            {
                for (let i = pierwszyMiesiac; i <= ostatniMiesiac; i++)
                {
                    let month = new Date(year, i, 0).toLocaleDateString('pl-PL', { month: 'long' });
                    let month_capitalize = month.charAt(0).toUpperCase() + month.slice(1);

                    document.querySelector('#xhXEyORRmmYlQgG thead tr').innerHTML += `<th style="width: ` + divide + `%;">` + month_capitalize + `</th>`; //style="width: calc(` + divide + `% - ` + minus + `px);"
                }


                for (let i = 1; i <= 31; i++)
                {
                    document.getElementById('xhXEyORRmmYlQgG').innerHTML += `<tbody><tr><td>` + i + `</td></tr></tbody>`;
                }


                // jakim cudem to działa???
                let tr_ = document.querySelectorAll('#xhXEyORRmmYlQgG tbody tr');
                for (let n = 1; n <= tr_.length; n++) 
                {
                    for (let i = pierwszyMiesiac; i <= ostatniMiesiac; i++) 
                    {
                        $(tr_[n - 2]).append('<td id="' + year + '-' + i + '-' + (n - 1) + '"></td>');
                    }
                }

                for (let n = 1; n <= tr_.length; n++) 
                {
                    if (n == 31) 
                    {
                        for (let i = pierwszyMiesiac; i <= ostatniMiesiac; i++) 
                        {
                            $(tr_[n - 1]).append('<td id="' + year + '-' + i + '-' + n + '"></td>');
                        }
                    }
                }
                //
            }
            else if (pierwszyMiesiac == null && ostatniMiesiac == null && pierwszyMiesiac == ostatniMiesiac) 
            {
                let month = new Date(year, parseInt(okres.value), 0).toLocaleDateString('pl-PL', { month: 'long' });
                let month_capitalize = month.charAt(0).toUpperCase() + month.slice(1);

                document.querySelector('#xhXEyORRmmYlQgG thead tr').innerHTML += `<th>` + month_capitalize + `</th>`;

                for (let i = 1; i <= 31; i++) 
                {
                    document.getElementById('xhXEyORRmmYlQgG').innerHTML += `<tbody><tr><td>` + i + `</td><td id="` + year + `-` + parseInt(okres.value) + `-` + i + `"></td></tr></tbody>`;
                }
            }
        }
    }
    if (widok == 'year') 
    {
        $('#xhXEyORRmmYlQgG').removeClass('wHJdQTeGtaPLEfX');
        $('#xhXEyORRmmYlQgG').removeClass('mKzzcPQqeZIcPIP');

        $('#wplXQqsdEZEYbIm').html(``);
        $('#wplXQqsdEZEYbIm').addClass('hkyYYlXJPLaqBDt');

        //
        document.getElementById('xhXEyORRmmYlQgG').innerHTML = `<thead><tr><th></th><th>Styczeń</th><th>Luty</th><th>Marzec</th><th>Kwiecień</th><th>Maj</th><th>Czerwiec</th><th>Lipiec</th><th>Sierpień</th><th>Wrzesień</th><th>Październik</th><th>Listopad</th><th>Grudzień</th></tr></thead>`;
        $('#xhXEyORRmmYlQgG thead tr th:first-child').html('<ion-icon name="lock-open"></ion-icon><ion-icon name="lock-closed" style="display: none;"></ion-icon>').attr('onclick', 'lock_headers()').attr('id', 'PFeQAmgSYjvlhDP').attr('title', 'Zablokuj nagłówki');
        //

        for (let i = 1; i <= 31; i++) 
        {
            document.getElementById('xhXEyORRmmYlQgG').innerHTML += `<tbody><tr><td>` + i + `</td><td id="` + year + `-1-` + i + `"></td><td id="` + year + `-2-` + i + `"></td><td id="` + year + `-3-` + i + `"></td><td id="` + year + `-4-` + i + `"></td><td id="` + year + `-5-` + i + `"></td><td id="` + year + `-6-` + i + `"></td><td id="` + year + `-7-` + i + `"></td><td id="` + year + `-8-` + i + `"></td><td id="` + year + `-9-` + i + `"></td><td id="` + year + `-10-` + i + `"></td><td id="` + year + `-11-` + i + `"></td><td id="` + year + `-12-` + i + `"></td></tr></tbody>`;
        }
    }




    var TDs = document.querySelectorAll('#xhXEyORRmmYlQgG tbody tr td:not(:first-child)');
    for (let i = 0; i < TDs.length; i++) 
    {
        //TDs[i].innerHTML += `<div id="NGWhvCmkPUIWclY">` +
        //        `<div title="Wpisz urlop" onclick="HIJPFbwutXHZxGn(this)" style="display: none;">` +
        //            `<svg viewBox="0 0 24 24" width="20" height="20" class="HRcyzPKclmUXnPb"><path d="M8.4 12H2.8L1 15H0V5h1l1.8 3h5.6L6 0h2l4.8 8H18a2 2 0 1 1 0 4h-5.2L8 20H6l2.4-8z"></path></svg>` +
        //        `</div>` +
        //    `</div>`;


        TDs[i].setAttribute('onclick', 'HIJPFbwutXHZxGn(this)');
        TDs[i].setAttribute('title', TDs[i].id);


        TDs[i].setAttribute('onmouseover', 'bxLcBeaOvMopDll(event, this)');
        TDs[i].setAttribute('onmouseout', 'xGCnnFtbrNPSNPm(event, this)');
    }

    //czas
    for (let i = 0; i < TDs.length; i++)
    {
        let TDdate = new Date(TDs[i].id).toLocaleDateString();
        for (let l = 0; l < model_t.length; l++)
        {
            if (worker == model_t[l].WorkerID) 
            {
                if (model_t[l].Enter != null && model_t[l].Exit != null)
                {
                    let enterDate = new Date(model_t[l].Enter).toLocaleDateString();
                    let exitDate = new Date(model_t[l].Exit).toLocaleDateString();

                    if (enterDate == TDdate && exitDate == TDdate)
                    {
                        $(TDs[i]).addClass('disabled');
                        $(TDs[i]).html('');
                        $(TDs[i]).removeAttr('onmouseover');
                        $(TDs[i]).removeAttr('onmouseout');
                        $(TDs[i]).removeAttr('onclick');
                        $(TDs[i]).removeAttr('title');
                        $(TDs[i]).removeAttr('id');
                    }
                }
                else 
                {
                    let leaveDate = new Date(model_t[l].LeaveDate).toLocaleDateString();

                    if (leaveDate == TDdate)
                    {
                        for (let j = 0; j < model_l.length; j++)
                        {
                            if (model_t[l].LeaveID == model_l[j].Id)
                            {
                                TDs[i].innerHTML = `<div class="IpLJVyLZIbPJsat" id="` + model_l[j].Id + `">` + //title="` + model_l[j].Name + `"
                                    `<span>` + model_l[j].Name + `</span>` +
                                    `</div>`;

                                $(TDs[i]).addClass('IdBgKIHybgYpxXJ');
                                TDs[i].setAttribute('onclick', 'BHuhsNtfdNbyAVV(this)');
                                TDs[i].setAttribute('title', 'Edytuj urlop');
                                TDs[i].setAttribute('id_', model_t[l].Id);
                            }
                        }
                    }
                }
            }
        }


        let dayToCheck = parseInt(TDs[i].id.split('-')[2]);
        let monthToCheck = parseInt(TDs[i].id.split('-')[1]) - 1;
        let yearToCheck = parseInt(TDs[i].id.split('-')[0]);
        if (!isDateValid(yearToCheck, monthToCheck, dayToCheck))
        {
            $(TDs[i]).addClass('disabled');
            $(TDs[i]).html('');
            $(TDs[i]).removeAttr('onmouseover');
            $(TDs[i]).removeAttr('onmouseout');
            $(TDs[i]).removeAttr('onclick');
            $(TDs[i]).removeAttr('title');
            $(TDs[i]).removeAttr('id');
        }
    }









    //"Pokaż dni wolne od pracy"
    //if (sessionStorage.getItem('XLsdAGmRfSDLmVh') != null)
    //{
    //    document.getElementById('MxLHxritEhBvupe').checked = true;
    //    MxLHxritEhBvupe_();
    //}
    if (sessionStorage.getItem('XtFaCWfKCtlUMUt') != null) //pokaz dni wolne od pracy
    {
        //pokazDniWolneOdPracy_change();
        //$('#LXNBHVBFXwnnkkP').children('.settings_a_select').children('span').eq(0).html('Ukryj');
        //$('#LXNBHVBFXwnnkkP').children('ion-icon').attr('name', 'eye-outline');
        //$('#LXNBHVBFXwnnkkP').addClass('pAPTryUdWHeiZZa_');
        //MxLHxritEhBvupe__show();

        $('#LXNBHVBFXwnnkkP').addClass('pAPTryUdWHeiZZa_');
        $('#LXNBHVBFXwnnkkP').children('.settings_a_select').children('span').eq(0).html('Ukryj');
        $('#LXNBHVBFXwnnkkP').children('ion-icon').attr('name', 'eye-outline');
        MxLHxritEhBvupe__show();
        
    }
    //

    //lock headers
    if (sessionStorage.getItem('IzzsrzGAMyBbWxh') != null) {
        lock_headers();
    }
    //
};

function lock_headers() 
{
    sessionStorage.setItem('IzzsrzGAMyBbWxh', 'true');
    $('#PFeQAmgSYjvlhDP').children('ion-icon').eq(0).hide(); $('#PFeQAmgSYjvlhDP').children('ion-icon').eq(1).show();
    $('#PFeQAmgSYjvlhDP').attr('onclick', 'unlock_headers()');

    $('#xhXEyORRmmYlQgG thead tr th').addClass('LcMbnjwSLxaLuWa');
    $('#xhXEyORRmmYlQgG tbody tr td:first-child').addClass('LcMbnjwSLxaLuWa');
};

function unlock_headers() 
{
    sessionStorage.removeItem('IzzsrzGAMyBbWxh');
    $('#PFeQAmgSYjvlhDP').children('ion-icon').eq(0).show(); $('#PFeQAmgSYjvlhDP').children('ion-icon').eq(1).hide();
    $('#PFeQAmgSYjvlhDP').attr('onclick', 'lock_headers()');

    $('#xhXEyORRmmYlQgG thead tr th').removeClass('LcMbnjwSLxaLuWa');
    $('#xhXEyORRmmYlQgG tbody tr td:first-child').removeClass('LcMbnjwSLxaLuWa');

};

function MbcIEXgByuxsGWM_(t) 
{
    //let workerID_ = document.getElementById('oUfnFiNPmXnNjzu').value;
    let workerID_ = $('#nrKYNmWitBwDNUj_').attr('worker');
    if (sessionStorage.getItem('ZDCmGEJAljtfCfz') != null) 
    {
        workerID_ = sessionStorage.getItem('ZDCmGEJAljtfCfz');
    }
    let leaveID_ = $(t).parent().parent().children('.form-group-margin').children('select').val();
    let leaveDate_ = $(t).parent().parent().children('#hRzavoWPiMExZUI').attr('date');

    if (workerID_ != 0 || workerID_ != '0' || workerID_ != null || leaveID_ != 0 || leaveID_ != '0' || leaveID_ != null)
    {
        $.ajax({
            type: 'POST',
            url: '/Times/AddLeave',
            data: {
                workerID: workerID_,
                enter: null,
                exit: null,
                leaveID: leaveID_,
                leaveDate: leaveDate_
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
};

function MbcIEXgByuxsGWM__(t) 
{
    let id_ = sessionStorage.getItem('lNxfWzXrKcHsdTi');
    let workerID_ = document.getElementById('oUfnFiNPmXnNjzu').value;
    let leaveID_ = $(t).parent().parent().children('.form-group-margin').children('select').val();
    let leaveDate_ = $(t).parent().parent().children('#hRzavoWPiMExZUI_').attr('date');

    if (workerID_ != 0 || workerID_ != '0' || workerID_ != null || leaveID_ != 0 || leaveID_ != '0' || leaveID_ != null)
    {
        $.ajax({
            type: 'POST',
            url: '/Times/EditLeave',
            data: {
                id: id_,
                workerID: workerID_,
                enter: null,
                exit: null,
                leaveID: leaveID_,
                leaveDate: leaveDate_
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
};

function erAjvPaJaDFYeWu_(t) 
{
    let id_ = sessionStorage.getItem('lNxfWzXrKcHsdTi');

    $.ajax({
        type: 'POST',
        url: '/Times/RemoveLeave',
        data: {
            id: id_
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
};

function bxLcBeaOvMopDll(e, t) 
{
    //$(t).children().children(':not("input"):not("span")').eq(0).show();
    //$(t).children().children(':not("input"):not("span")').eq(2).show();

    //if ($(t).children().children(':not("input"):not("span")').eq(1).css('display') != 'none')
    //{
    //    $(t).children().children(':not("input"):not("span")').eq(0).hide();
    //    $(t).children().children(':not("input"):not("span")').eq(2).hide();
    //}

    $(t).children().children(':not("input"):not("span")').eq(0).show();
};

function xGCnnFtbrNPSNPm(e, t) 
{
    //$(t).children().children(':not("input"):not("span")').eq(0).hide();
    //$(t).children().children(':not("input"):not("span")').eq(2).hide();

    $(t).children().children(':not("input"):not("span")').eq(0).hide();
};

//function OdAaYwlLkdNUOjt(t) 
//{
//    $(t).parent().children(':not("input"):not("span")').eq(1).show();
//    $(t).parent().children(':not("input"):not("span")').eq(0).hide();

//    $(t).parent().parent().addClass('VSEIRMVnLrwIkVf');
//};

//function efBsSMDrIHdzcWF(t) 
//{
//    $(t).parent().children(':not("input"):not("span")').eq(1).hide();
//    $(t).parent().children(':not("input"):not("span")').eq(0).show();

//    $(t).parent().parent().removeClass('VSEIRMVnLrwIkVf');
//};

function BHuhsNtfdNbyAVV(t) 
{
    let QcLYVFuvuONgCrh = document.getElementById('oUfnFiNPmXnNjzu');
    //let worker = QcLYVFuvuONgCrh.options[QcLYVFuvuONgCrh.selectedIndex].text;
    let worker = $('#nrKYNmWitBwDNUj_').children('.settings_a_select').children('span').eq(1).html();
    //if (sessionStorage.getItem('ZDCmGEJAljtfCfz') != null) 
    //{
    //    worker = sessionStorage.getItem('ZDCmGEJAljtfCfz');
    //}

    let date = $(t).attr('id');
    let day = date.split('-')[2];
    let month = new Date(date).toLocaleDateString('pl-PL', { month: 'long' });
    let month_capitalize = month.charAt(0).toUpperCase() + month.slice(1);
    //let year = document.getElementById('iHCBwRzOLpgGYQG').value;
    let year = $('#qQgDgqyovQyICUL_').children('.settings_a_select').children('span').eq(1).html();
    if (sessionStorage.getItem('wSIspPdnliPlpLI') != null) 
    {
        year = sessionStorage.getItem('wSIspPdnliPlpLI');
    }
    let newDate = day + ' ' + month_capitalize + ' ' + year;




    document.getElementById('RgqSDmbppdlqlIR_').innerHTML = ``;
    for (let i = 0; i < model_l.length; i++) 
    {
        if (model_l[i].Name == $(t).children().children('span').html()) 
        {
            document.getElementById('uVPVZwEWSbHTwor_').value = $(t).children().children('span').html();
            if (model_l[i].Description != null)
            {
                $('#RgqSDmbppdlqlIR_').removeClass('fdjtgOVkxlRqfDM');
                document.getElementById('RgqSDmbppdlqlIR_').innerHTML += `<option value="` + model_l[i].Id + `">` + model_l[i].Description + `</option>`;
            }
            else 
            {
                $('#RgqSDmbppdlqlIR_').addClass('fdjtgOVkxlRqfDM');
                document.getElementById('RgqSDmbppdlqlIR_').innerHTML += `<option value="` + model_l[i].Id + `">-</option>`;
            }
        }
    }
    //sortSelect(document.getElementById('RgqSDmbppdlqlIR_'));
    document.getElementById('RgqSDmbppdlqlIR_').value = $(t).children('div').attr('id');




    $('#GxNPMofsqpKLHDo_').html(`<span>` + worker + `</span>`);
    $('#hRzavoWPiMExZUI_').html(`<span>` + newDate + `</span>`);
    $('#hRzavoWPiMExZUI_').attr('date', date);

    $('#YVxFsdwTneugCIb').fadeIn(200);

    sessionStorage.setItem('lNxfWzXrKcHsdTi', $(t).attr('id_'));
};

function HIJPFbwutXHZxGn(t) 
{
    let QcLYVFuvuONgCrh = document.getElementById('oUfnFiNPmXnNjzu');
    //let worker = QcLYVFuvuONgCrh.options[QcLYVFuvuONgCrh.selectedIndex].text;
    let worker = $('#nrKYNmWitBwDNUj_').children('.settings_a_select').children('span').eq(1).html();
    //if (sessionStorage.getItem('ZDCmGEJAljtfCfz') != null) 
    //{
    //    worker = sessionStorage.getItem('ZDCmGEJAljtfCfz');
    //}

    //let date = $(t).parent().parent().attr('id');
    let date = t.id;
    let day = date.split('-')[2];
    let month = new Date(date).toLocaleDateString('pl-PL', { month: 'long' });
    let month_capitalize = month.charAt(0).toUpperCase() + month.slice(1);
    //let year = document.getElementById('iHCBwRzOLpgGYQG').value;
    let year = $('#qQgDgqyovQyICUL_').children('.settings_a_select').children('span').eq(1).html();
    if (sessionStorage.getItem('wSIspPdnliPlpLI') != null) 
    {
        year = sessionStorage.getItem('wSIspPdnliPlpLI');
    }
    let newDate = day + ' ' + month_capitalize + ' ' + year;




    $('#GxNPMofsqpKLHDo').html(`<span>` + worker + `</span>`);
    $('#hRzavoWPiMExZUI').html(`<span>` + newDate + `</span>`);
    $('#hRzavoWPiMExZUI').attr('date', date);

    $('#vjaHMXanUmPdVZF').fadeIn(200);

};

function xZlZPWWTfaNMpXj_(t) 
{
    $(t).parent().parent().fadeOut(200);

    //setTimeout(function ()
    //{
    //    $(t).parent().parent().remove();
    //}, 300);
};

function generateCalendar()
{
    
    //$('#aFoQOFiXPQobjPX').trigger('change');



    //department
    let aFoQOFiXPQobjPX = document.getElementById('aFoQOFiXPQobjPX');
    let departmentID_ = aFoQOFiXPQobjPX.options[aFoQOFiXPQobjPX.selectedIndex].value;
    //

    //worker
    let oUfnFiNPmXnNjzu = document.getElementById('oUfnFiNPmXnNjzu');
    //let workerID_ = oUfnFiNPmXnNjzu.options[oUfnFiNPmXnNjzu.selectedIndex].value;
    //

    if (oUfnFiNPmXnNjzu.value == 'everyone')
    {
        $('.pyyxmssXgPCWuUc').addClass('fNPXdDDFqqbVOkt'); //disable
    }
    else 
    {
        $('.pyyxmssXgPCWuUc').removeClass('fNPXdDDFqqbVOkt'); //enable
    }



    //let yearSelect = document.getElementById('iHCBwRzOLpgGYQG');
    //let year = yearSelect.options[yearSelect.selectedIndex].value;
    let year = $('#qQgDgqyovQyICUL_').children('.settings_a_select').children('span').eq(1).html();
    if (sessionStorage.getItem('wSIspPdnliPlpLI') != null) 
    {
        year = sessionStorage.getItem('wSIspPdnliPlpLI');
    }
    let monthSelect = document.getElementById('IZdWjCoFNPZaIaP');
    let month = monthSelect.options[monthSelect.selectedIndex].value;
    let currentMonth = parseInt(month) + 1;

    var daysLength = daysInMonth(currentMonth, year);

    let SxyrJvNcldodWTh = document.querySelector('.SxyrJvNcldodWTh');
    SxyrJvNcldodWTh.innerHTML = '';
    for (let i = 1; i <= daysLength; i++)
    {
        SxyrJvNcldodWTh.innerHTML += `<div id="` + year + `-` + padWithLeadingZeros(currentMonth, 2) + `-` + padWithLeadingZeros(i, 2) + `" class="dykKoaHBFtTPjlK">`
            + `<span class="KJIBNzKsADLdIeL">` + i + `</span>`
            + `<span class="TwzxYLTXdLMRpSd"></span>`
            + `<span class="hvxzYIeIBOTysxy"></span>`
            + `</div>`;
    }

    let SxyrJvNcldodWTh_children = $(SxyrJvNcldodWTh).children();

    for (let j = 0; j < SxyrJvNcldodWTh_children.length; j++)
    {
        for (let i = 0; i < model_h.length; i++)
        {
            if (model_h[i].Date.split('T')[0] == SxyrJvNcldodWTh_children[j].id)
            {
                $(SxyrJvNcldodWTh_children[j]).children().eq(0).addClass('pDBzSpSjrpyyUHr');
                $(SxyrJvNcldodWTh_children[j]).children().eq(1).html(model_h[i].Name);
            }

            let dayName = getDayName(SxyrJvNcldodWTh_children[j].id, getLang() + '-' + getLang().toUpperCase());
            $(SxyrJvNcldodWTh_children[j]).children().eq(2).html(dayName);


            //niedziele na czerwono
            let dayNameDate = new Date(SxyrJvNcldodWTh_children[j].id);
            if (dayNameDate.getDay() == 0) {
                $(SxyrJvNcldodWTh_children[j]).children().eq(2).addClass('HqePNSyFErJjIHx');
            }
            //
        }
    }

    
    let dykKoaHBFtTPjlK = document.querySelectorAll('.dykKoaHBFtTPjlK');
    for (let i = 0; i < dykKoaHBFtTPjlK.length; i++) 
    {
        let date = dykKoaHBFtTPjlK[i].id;
        for (let j = 0; j < model_t.length; j++) 
        {
            if (model_t[j].Enter == null && model_t[j].Exit == null)
            {
                $('.pyyxmssXgPCWuUc').removeClass('fNPXdDDFqqbVOkt');

                if (model_t[j].LeaveDate.split('T')[0] == date)
                {
                    for (let k = 0; k < model_l.length; k++)
                    {
                        if (model_l[k].Id == model_t[j].LeaveID)
                        {
                            let name = model_l[k].Name;
                            let description = model_l[k].Description;

                            for (let x = 0; x < model_w.length; x++)
                            {
                                if (model_t[j].WorkerID == model_w[x].Id && departmentID_ == model_w[x].DepartmentID)
                                {
                                    if (description != null) 
                                    {
                                        dykKoaHBFtTPjlK[i].innerHTML += `<div class="PXHhlPBPzXQFpVg" onclick="yKZSDGYyOfLkUoB(this)" id="` + model_t[j].Id + `">`
                                            + `<span>` + model_w[x].Surname + ` ` + model_w[x].Name + `</span>`
                                            + `<span id=` + model_l[k].Id + `>` + name + `</span>`
                                            + `<span>(` + description + `)</span>`
                                            + `</div>`;
                                    }
                                    else 
                                    {
                                        dykKoaHBFtTPjlK[i].innerHTML += `<div class="PXHhlPBPzXQFpVg" onclick="yKZSDGYyOfLkUoB(this)" id="` + model_t[j].Id + `">`
                                            + `<span>` + model_w[x].Surname + ` ` + model_w[x].Name + `</span>`
                                            + `<span id=` + model_l[k].Id + `>` + name + `</span>`
                                            + `</div>`;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //else {
            //    if (model_t[j].Enter.split('T')[0] == date) {
            //        dykKoaHBFtTPjlK[i].innerHTML += `<div class="PXHhlPBPzXQFpVg LiMGacEyWjMyGtX">`
            //            + `<span>dostępne z widoku "Czas Pracy"</span>`
            //            + `</div>`;
            //    }
            //}
            //else if (workerID_ == 'everyone' && model_t[j].Enter == null && model_t[j].Exit == null) 
            //{
            //    if (model_t[j].LeaveDate.split('T')[0] == date) 
            //    {
            //        for (let k = 0; k < model_l.length; k++)
            //        {
            //            if (model_l[k].Id == model_t[j].LeaveID)
            //            {
            //                let abc = $(oUfnFiNPmXnNjzu).children();
            //                for (let m = 0; m < abc.length; m++)
            //                {
            //                    if (abc[m].style.display != 'none')
            //                    {
            //                        if (model_t[j].WorkerID == abc[m].getAttribute('value')) {
            //                            let name = model_l[k].Name;
            //                            let description = model_l[k].Description;
                                        
            //                            if (description != null) 
            //                            {
            //                                dykKoaHBFtTPjlK[i].innerHTML += `<div class="PXHhlPBPzXQFpVg" onclick="yKZSDGYyOfLkUoB(this)" id="` + model_t[j].Id + `">`
            //                                    + `<span>` + abc[m].innerHTML + `</span>`
            //                                    + `<span>` + name + `</span>`
            //                                    + `<span>(` + description + `)</span>`
            //                                    + `</div>`;
            //                            }
            //                            else 
            //                            {
            //                                dykKoaHBFtTPjlK[i].innerHTML += `<div class="PXHhlPBPzXQFpVg" onclick="yKZSDGYyOfLkUoB(this)" id="` + model_t[j].Id + `">`
            //                                    + `<span>` + abc[m].innerHTML + `</span>`
            //                                    + `<span>` + name + `</span>`
            //                                    + `</div>`;
            //                            }

            //                        }
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}
        }
    }


    for (let i = 0; i < dykKoaHBFtTPjlK.length; i++) {
        let children = $(dykKoaHBFtTPjlK[i]).children();
        if (children.hasClass('PXHhlPBPzXQFpVg') && children.length > 4) {
            
            let PXHhlPBPzXQFpVg = dykKoaHBFtTPjlK[i].querySelectorAll('.PXHhlPBPzXQFpVg');
            //let html = '';
            for (let j = 0; j < PXHhlPBPzXQFpVg.length; j++) {
                $(PXHhlPBPzXQFpVg[j]).hide();
                //html += $(PXHhlPBPzXQFpVg[j]).html();
            }

            //dykKoaHBFtTPjlK[i].innerHTML += html;

            dykKoaHBFtTPjlK[i].innerHTML += `<div class="TYIUWPkeSfoEFoi" onclick="yKZSDGYyOfLkUoB(this)">`
                + `<span>` + PXHhlPBPzXQFpVg.length + `</span>`
                + `<span>pracowników ma zapisany urlop w tym dniu.</span>`
            + `</div>`;
        }
    }





    //let today = new Date().toISOString().split('T')[0];
    //for (let i = 0; i < dykKoaHBFtTPjlK.length; i++) 
    //{
    //    let divMonth = dykKoaHBFtTPjlK[i].id.split('-')[1];

    //    if (dykKoaHBFtTPjlK[i].id == today && divMonth == currentMonth) 
    //    {
    //        dykKoaHBFtTPjlK[i].scrollIntoView();
            
    //    }
    //    else {
    //        /*dykKoaHBFtTPjlK[i].scrollTop = '0';*/
    //        //$(dykKoaHBFtTPjlK[i]).parent().scrollTop = 0;
    //        dykKoaHBFtTPjlK[i].scrollTop = 0;
    //    }
        
    //}


    

};

function yKZSDGYyOfLkUoB(t) {
    let data = $(t).parent().attr('id');
    $('.MPsxqaqUBggmTqH').remove();
    $('.svTlrqbGxnTrkkq').append('<span class="MPsxqaqUBggmTqH">' + data + '</span>');
    
    document.querySelector('.efUljXvyQujgoTu').innerHTML = '';

    let PXHhlPBPzXQFpVg = $(t).parent().children();
    //let PXHhlPBPzXQFpVg = $(t);
    for (let i = 0; i < PXHhlPBPzXQFpVg.length; i++) 
    {
        if ($(PXHhlPBPzXQFpVg[i]).hasClass('PXHhlPBPzXQFpVg')) 
        {
            document.querySelector('.efUljXvyQujgoTu').innerHTML += `<div class="iLPhCPQLeZriLNQ"><div class="ctIBgsayAyonpQK">` + PXHhlPBPzXQFpVg[i].innerHTML + `</div><div class="jLWszVjseUnWpuM">`
                //+ `<div><a title="Szczegóły" id="LlkaLZEbAcWBnYK"><svg viewBox="0 0 1920 1920" height="18" width="18"><path d="M1229.93 594.767c36.644 37.975 50.015 91.328 43.72 142.909-9.128 74.877-30.737 144.983-56.093 215.657-27.129 75.623-54.66 151.09-82.332 226.512-44.263 120.685-88.874 241.237-132.65 362.1-10.877 30.018-18.635 62.072-21.732 93.784-3.376 34.532 21.462 51.526 52.648 36.203 24.977-12.278 49.288-28.992 68.845-48.768 31.952-32.31 63.766-64.776 94.805-97.98 15.515-16.605 30.86-33.397 45.912-50.438 11.993-13.583 24.318-34.02 40.779-42.28 31.17-15.642 55.226 22.846 49.582 49.794-5.39 25.773-23.135 48.383-39.462 68.957l-1.123 1.416a1559.53 1559.53 0 0 0-4.43 5.6c-54.87 69.795-115.043 137.088-183.307 193.977-67.103 55.77-141.607 103.216-223.428 133.98-26.65 10.016-53.957 18.253-81.713 24.563-53.585 12.192-112.798 11.283-167.56 3.333-40.151-5.828-76.246-31.44-93.264-68.707-29.544-64.698-8.98-144.595 6.295-210.45 18.712-80.625 46.8-157.388 75.493-234.619l2.18-5.867 1.092-2.934 2.182-5.87 2.182-5.873c33.254-89.517 67.436-178.676 101.727-267.797 31.294-81.296 62.72-162.537 93.69-243.95 2.364-6.216 5.004-12.389 7.669-18.558l1-2.313c6.835-15.806 13.631-31.617 16.176-48.092 6.109-39.537-22.406-74.738-61.985-51.947-68.42 39.4-119.656 97.992-170.437 156.944l-6.175 7.17c-15.78 18.323-31.582 36.607-47.908 54.286-16.089 17.43-35.243 39.04-62.907 19.07-29.521-21.308-20.765-48.637-3.987-71.785 93.18-128.58 205.056-248.86 350.86-316.783 60.932-28.386 146.113-57.285 225.882-58.233 59.802-.707 116.561 14.29 157.774 56.99Zm92.038-579.94c76.703 29.846 118.04 96.533 118.032 190.417-.008 169.189-182.758 284.908-335.53 212.455-78.956-37.446-117.358-126.202-98.219-227.002 26.494-139.598 183.78-227.203 315.717-175.87Z"></path></svg></a></div>`
                + `<div><a title="Edytuj" onclick="RXklobeYunXfiov(this)" id="tkHxbToRJDFsHnu" BOBxrOhlBwoCJjS="` + PXHhlPBPzXQFpVg[i].id + `"><svg viewBox="0 0 512 512" height="16" width="16"><path d="M494.56,55.774l-38.344-38.328c-23.253-23.262-60.965-23.253-84.226,0l-35.878,35.878l122.563,122.563l35.886-35.878C517.814,116.747,517.814,79.044,494.56,55.774z"></path><polygon points="0,389.435 0,511.998 122.571,511.998 425.246,209.314 302.691,86.751"></polygon></svg></a></div>`
                + `<div><a title="Usuń" onclick="RzQPFpODoklamqK(this)" id="dDqbkhfWeyiaoZu" naUqxVzzjmhDYeI="` + PXHhlPBPzXQFpVg[i].id + `"><svg viewBox="0 0 24 24" height="20" width="20"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></svg></a></div>`
                + `</div></div>`;


        }
    }

    $('#RHJIQRivZsUcFkm').fadeIn(200);
};

function NWEuFXskeXpBGBa(t) { 
    $('#RHJIQRivZsUcFkm').fadeOut(200);
};

function FFkdMqNnTDbWkXb()
{
    document.getElementById('oUfnFiNPmXnNjzu').innerHTML = '';

    let aFoQOFiXPQobjPX = document.getElementById('aFoQOFiXPQobjPX');
    let departmentID_ = aFoQOFiXPQobjPX.options[aFoQOFiXPQobjPX.selectedIndex].value;

    for (let i = 0; i < model_w.length; i++) {
        if (model_w[i].DepartmentID == departmentID_) {
            document.getElementById('oUfnFiNPmXnNjzu').innerHTML += `<option value="` + model_w[i].Id + `" id="` + model_w[i].DepartmentID + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
        }
    }
    //document.getElementById('oUfnFiNPmXnNjzu').innerHTML += `<option value="everyone">Wszyscy z działu</option>`;
    
    //generateCalendar();
    generateNewTable();


    //sessionStorage.setItem('lIglBkqRjlDZnab', t.value)
};
FFkdMqNnTDbWkXb();

$('#aFoQOFiXPQobjPX').on('change', function ()
{
    //document.getElementById('aFoQOFiXPQobjPX').innerHTML = '';
    document.getElementById('oUfnFiNPmXnNjzu').innerHTML = '';

    let aFoQOFiXPQobjPX = document.getElementById('aFoQOFiXPQobjPX');
    let departmentID_ = aFoQOFiXPQobjPX.options[aFoQOFiXPQobjPX.selectedIndex].value;

    for (let i = 0; i < model_w.length; i++) {
        if (model_w[i].DepartmentID == departmentID_) {
            document.getElementById('oUfnFiNPmXnNjzu').innerHTML += `<option value="` + model_w[i].Id + `" id="` + model_w[i].DepartmentID + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
        }
    }
    //document.getElementById('oUfnFiNPmXnNjzu').innerHTML += `<option value="everyone">Wszyscy z działu</option>`;

    //generateCalendar();
    generateNewTable();


    //let department = this.options[this.selectedIndex].value;
    //sessionStorage.setItem('lIglBkqRjlDZnab', department);

    //let workerSelect = document.getElementById('oUfnFiNPmXnNjzu');
    //let worker = workerSelect.options[workerSelect.selectedIndex].value;
    //sessionStorage.setItem('qSAmVfvuBMTlcKB', worker);
});
//$('#aFoQOFiXPQobjPX').trigger('change');





$('#IZdWjCoFNPZaIaP').on('change', function ()
{
    //generateCalendar();
    generateNewTable();

    let month = this.options[this.selectedIndex].value;
    sessionStorage.setItem('wSGVyznxxQsFpjg', month)

});


function dWVTVhqEBjJCURf(t)
{
    //$('#xBuYErAxrbdvwoP').children().show();
    //generateCalendar();

    //let worker = t.options[t.selectedIndex].value;
    //sessionStorage.setItem('qSAmVfvuBMTlcKB', worker);

    MEPHaojoIWKCapY();

    //generateNewTable();
};


$('#ttGSoqUHUjOErnf').on('click', function ()
{
    $('#KYZGriDIsqNJRxr').fadeOut(200);
    $('#CvFHVhLHjFBzNAz').removeClass('fdjtgOVkxlRqfDM');
});

$('#KhUYdWBbOzZAJwi').on('click', function ()
{
    let e = document.getElementById('TrbvupCIcixxNsx');
    //let e_ = document.getElementById('aFoQOFiXPQobjPX');
    let department = $('#dOryXMJCOpmMFDw_').attr('dep');
    if (sessionStorage.getItem('gaukHwbLvIchVtA') != null) 
    {
        department = sessionStorage.getItem('gaukHwbLvIchVtA');
    }
    //let e2 = e_.options[e_.selectedIndex].value;
    //e.value = e2;
    e.value = department;


    let worker = $('#nrKYNmWitBwDNUj_').attr('worker');
    if (sessionStorage.getItem('ZDCmGEJAljtfCfz') != null) 
    {
        worker = sessionStorage.getItem('ZDCmGEJAljtfCfz');
    }


    let id = e.options[e.selectedIndex].value;
    document.getElementById('CvFHVhLHjFBzNAz').innerHTML = '';

    model_w.sort((a, b) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0)); //sortuj według nazwiska
    for (let i = 0; i < model_w.length; i++) 
    {
        if (model_w[i].DepartmentID == id) 
        {
            //document.getElementById('CvFHVhLHjFBzNAz').innerHTML += `<option value="` + model_w[i].Id + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
            if (model_w[i].Id == worker)
            {
                document.getElementById('CvFHVhLHjFBzNAz').innerHTML += `<option selected value="` + model_w[i].Id + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
            }
            else 
            {
                document.getElementById('CvFHVhLHjFBzNAz').innerHTML += `<option value="` + model_w[i].Id + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
            }
        }
    }

    $('#KYZGriDIsqNJRxr').fadeIn(200);
});

$('#TrbvupCIcixxNsx').on('change', function ()
{
    let e = document.getElementById('TrbvupCIcixxNsx');
    let id = e.options[e.selectedIndex].value;
    document.getElementById('CvFHVhLHjFBzNAz').innerHTML = '';

    /**/
    if (id == 'wszyscy')
    {
        $('#CvFHVhLHjFBzNAz').addClass('fdjtgOVkxlRqfDM');
    }
    else
    {
        $('#CvFHVhLHjFBzNAz').removeClass('fdjtgOVkxlRqfDM');
    }
    /**/

    for (let i = 0; i < model_w.length; i++) 
    {
        if (model_w[i].DepartmentID == id) 
        {
            document.getElementById('CvFHVhLHjFBzNAz').innerHTML += `<option value="` + model_w[i].Id + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
        }
    }
});

function compare(a, b)
{
    if (a.last_nom < b.last_nom)
    {
        return -1;
    }
    if (a.last_nom > b.last_nom)
    {
        return 1;
    }
    return 0;
}

$('#HvZxXypLRxeRXCo').on('change', function ()
{
    document.getElementById('dFiioMzmTCjjcWp').innerHTML = ``;

    for (let i = 0; i < model_l.length; i++)
    {
        if (model_l[i].Name == this.options[this.selectedIndex].text)
        {
            if (model_l[i].Description != null)
            {
                $('#dFiioMzmTCjjcWp').removeClass('fdjtgOVkxlRqfDM');
                document.getElementById('dFiioMzmTCjjcWp').innerHTML += `<option value="` + model_l[i].Id + `">` + model_l[i].Description + `</option>`;
            }
            else
            {
                $('#dFiioMzmTCjjcWp').addClass('fdjtgOVkxlRqfDM');
                document.getElementById('dFiioMzmTCjjcWp').innerHTML += `<option value="` + model_l[i].Id + `">-</option>`;
            }
        }
    }

    //sortSelect(document.getElementById('dFiioMzmTCjjcWp'));
});

$('#HvZxXypLRxeRXCo').trigger('change');

$('#OYRMUMzpHRsooyI').on('change', function ()
{
    if (this.value != '') {
        $(this).removeAttr('style')
        $(this).parent().children().eq(0).children().eq(1).hide();
    }
});

$('#tyONXYuOELdPoLh').on('change', function ()
{
    if (this.value != '')
    {
        $(this).removeAttr('style');
        $(this).parent().children().eq(0).children().eq(1).hide();
    }
});

$('#JTgCvImoJEyzGux').on('click', function ()
{
    var seconds = 0;

    //let e = document.getElementById('TrbvupCIcixxNsx');
    //let id = e.options[e.selectedIndex].value;
    let e = document.getElementById('TrbvupCIcixxNsx');
    let department_chosen = e.options[e.selectedIndex].value;



    var days = [];
    var toRemove = [];

    let oUfnFiNPmXnNjzu = document.getElementById('CvFHVhLHjFBzNAz');
    //let workerID_ = oUfnFiNPmXnNjzu.options[oUfnFiNPmXnNjzu.selectedIndex].value;
    let workerID_ = oUfnFiNPmXnNjzu.value;
    let enter_ = null;
    let exit_ = null;
    let dFiioMzmTCjjcWp = document.getElementById('dFiioMzmTCjjcWp');
    let leaveID_ = dFiioMzmTCjjcWp.options[dFiioMzmTCjjcWp.selectedIndex].value;

    let od_ = document.getElementById('OYRMUMzpHRsooyI').value;
    let do_ = document.getElementById('tyONXYuOELdPoLh').value;

    if (od_ != '' && do_ != '') 
    {
        days = getDatesInRange(new Date(od_), new Date(do_));
        for (let i = 0; i < days.length; i++) 
        {
            let day = new Date(days[i]);

            for (let j = 0; j < model_l.length; j++) 
            {
                if (model_l[j].Id == leaveID_)
                {

                    if (!model_l[j].IfWeekends)
                    {
                        if (isWeekend(day)) 
                        {
                            toRemove.push(day);
                        }
                    }

                    if (!model_l[j].IfHolidays)
                    {
                        for (let k = 0; k < model_h.length; k++) 
                        {
                            if (new Date(days[i]).toISOString().split('T')[0] == model_h[k].Date.split('T')[0]) 
                            {
                                toRemove.push(day);
                            }
                        }
                    }
                }
            }
        }
    }
    else if (od_ == '' && do_ == '')
    {
        $('#WgfvjRVuUuqTHIz').show();
        $('#OYRMUMzpHRsooyI').css({ 'border-color': '#ff471a' });

        $('#xTeRKCqteTzkFTO').show();
        $('#tyONXYuOELdPoLh').css({ 'border-color': '#ff471a' });
    }



    var leaveDays = days.filter(function (e, index)
    {
        return (!toRemove.some(d => +d === +e));
    });



    var arrayOfDays = [];
    var toRemove2 = [];
    //var ifUrlopIstnieje = [];
    for (let i = 0; i < leaveDays.length; i++)
    {
        let date = leaveDays[i].toISOString().split('T')[0];
        arrayOfDays.push(date);

        //for (let j = 0; j < model_t.length; j++) 
        //{
        //    if (model_t[j].LeaveDate.split('T')[0] == date && workerID_ == model_t[j].WorkerID)
        //    {
        //        toRemove2.push(date);
        //        //Uncaught TypeError: model_t[j].LeaveDate is null
        //    }
        //    //toRemove2.push(date);
        //}

        //for (let j = 0; j < model_t.length; j++) {
        //    if (workerID_ == model_t[j].WorkerID && model_t[j].LeaveDate.split('T')[0] == date && model_t[j].Enter == null && model_t[j].Exit == null && model_t[j].LeaveDate != null) {
        //        toRemove2.push(date);
        //    }
        //}

        for (let j = 0; j < model_t.length; j++) {
            //toRemove2.push(date);
            if (workerID_ == model_t[j].WorkerID) {
                //toRemove2.push(date);

                //czy urlopy
                if (model_t[j].LeaveDate != null && model_t[j].Enter == null && model_t[j].LeaveDate.split('T')[0] == date) {
                    toRemove2.push(date);
                }
                //czy czas pracy
                if (model_t[j].LeaveDate == null && model_t[j].Enter != null && model_t[j].Enter.split('T')[0] == date) {
                    toRemove2.push(date);
                    //ifUrlopIstnieje.push(date);
                }
            }
        }

    }

    
    var toRemove2_new = [...new Set(toRemove2)];
    toRemove2_new.sort();
    
    arrayOfDays = arrayOfDays.filter((el) => !toRemove2_new.includes(el)); //usun wszystkie powtarzajace sie daty




    if (department_chosen != 'wszyscy')
    {
        if (arrayOfDays.length > 0) 
        {
            for (let i = 0; i < arrayOfDays.length; i++) 
            {
                if (workerID_ != 0 || workerID_ != '0' || workerID_ != null || leaveID_ != 0 || leaveID_ != '0' || leaveID_ != null)
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/AddLeave',
                        data: {
                            workerID: workerID_,
                            enter: null,
                            exit: null,
                            leaveID: leaveID_,
                            leaveDate: arrayOfDays[i]
                        },
                        success: function (response)
                        {
                            //location.reload();
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding column value:', error);
                        }
                    });

                    seconds++;
                }
            }

            //
            $('#cYgceuOTNRyhtgw').hide();

            let htmlLoader = `<div class="pGKcZvErUB">` +
                `<form class="form_3">` +
                `<div class="loader_div BkvylzxsLMTrGpQ">` +
                `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>` +
                `</div>` +
                `<div class="form-group bKQpZIoPOmwNvbh">` +
                `<span class="vfxLVmwjkBogmPm" id="dTfLGgGbUYkYoyw"></span>` +
                `</div>` +
                `</form>` +
                `</div>`;

            $('body').append(htmlLoader);

            let f = 0;
            $('#dTfLGgGbUYkYoyw').html(`Dodawanie... ` + `(` + f + `/` + seconds + `)`);
            var interval = setInterval(function ()
            {
                $('#dTfLGgGbUYkYoyw').html(`Dodawanie... ` + `(` + f++ + `/` + seconds + `)`);

                if (f - 1 == seconds)
                {
                    clearInterval(interval);

                    setTimeout(function ()
                    {
                        location.reload();
                    }, 100);
                }
            }, 50);
            //

        }
    }
    else if (department_chosen == 'wszyscy') {

        let allWorkersIDs = [];
        for (let i = 0; i < model_w.length; i++) {
            allWorkersIDs.push(model_w[i].Id);
        }
        
        let leaves = [];
        for (let i = 0; i < model_t.length; i++) {
            if (model_t[i].LeaveDate != null) {
                leaves.push({ workerid: model_t[i].WorkerID, leavedate: model_t[i].LeaveDate.split('T')[0] });
            }
        }
        
        let what = [];
        for (let i = 0; i < allWorkersIDs.length; i++) {
            for (let j = 0; j < leaves.length; j++) {
                if (allWorkersIDs[i] == leaves[j].workerid) {
                    for (let k = 0; k < arrayOfDays.length; k++) {
                        if (leaves[j].leavedate == arrayOfDays[k]) {
                            what.push({ workerid: allWorkersIDs[i], leavedate: leaves[j].leavedate });
                        }
                    }
                }
            }
        }

        // filter
        let leaves_filtered = leaves.filter(function (objFromA)
        {
            return !what.find(function (objFromB)
            {
                return objFromA.workerid === objFromB.workerid;
            });
        })
        //

        let ids = [];
        for (let i = 0; i < what.length; i++) {
            ids.push(what[i].workerid);
        }

        allWorkersIDs = allWorkersIDs.filter((el) => !ids.includes(el));

        if (arrayOfDays.length > 0) {
            for (let i = 0; i < allWorkersIDs.length; i++) {
                for (let j = 0; j < arrayOfDays.length; j++) {
                    if (allWorkersIDs[i] != 0 || allWorkersIDs[i] != '0' || allWorkersIDs[i] != null || leaveID_ != 0 || leaveID_ != '0' || leaveID_ != null) {
                        $.ajax({
                            type: 'POST',
                            url: '/Times/AddLeave',
                            data: {
                                workerID: allWorkersIDs[i],
                                enter: null,
                                exit: null,
                                leaveID: leaveID_,
                                leaveDate: arrayOfDays[j]
                            },
                            success: function (response)
                            {
                                //location.reload();
                            },
                            error: function (xhr, status, error)
                            {
                                console.log('Error adding column value:', error);
                            }
                        });

                        seconds++;
                    }
                }
            }

            //
            $('#cYgceuOTNRyhtgw').hide();

            let htmlLoader = `<div class="pGKcZvErUB">` +
                `<form class="form_3">` +
                `<div class="loader_div BkvylzxsLMTrGpQ">` +
                `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>` +
                `</div>` +
                `<div class="form-group bKQpZIoPOmwNvbh">` +
                `<span class="vfxLVmwjkBogmPm" id="dTfLGgGbUYkYoyw"></span>` +
                `</div>` +
                `</form>` +
                `</div>`;

            $('body').append(htmlLoader);

            let f = 0;
            $('#dTfLGgGbUYkYoyw').html(`Dodawanie... ` + `(` + f + `/` + seconds + `)`);
            var interval = setInterval(function ()
            {
                $('#dTfLGgGbUYkYoyw').html(`Dodawanie... ` + `(` + f++ + `/` + seconds + `)`);

                if (f - 1 == seconds)
                {
                    clearInterval(interval);

                    setTimeout(function ()
                    {
                        location.reload();
                    }, 100);
                }
            }, 50);
            //

        }
    }
});

$('#iHCBwRzOLpgGYQG').on('change', function ()
{
    //generateCalendar();
    generateNewTable();

    let year = this.options[this.selectedIndex].value;
    sessionStorage.setItem('MnqHzqBiryXOWYP', year)
});

$('#XWRZMxZMLxBIsSg').on('click', function ()
{
    let e = document.getElementById('TEimYJFgtJHkEYN');
    let e_ = document.getElementById('aFoQOFiXPQobjPX');
    let e2 = e_.options[e_.selectedIndex].value;
    e.value = e2;


    let id = e.options[e.selectedIndex].value;
    document.getElementById('ILEsYMjvtNNaevj').innerHTML = '';

    for (let i = 0; i < model_w.length; i++) 
    {
        if (model_w[i].DepartmentID == id) 
        {
            document.getElementById('ILEsYMjvtNNaevj').innerHTML += `<option value="` + model_w[i].Id + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
        }
    }

    //let f = document.getElementById('ILEsYMjvtNNaevj');
    //let f_ = document.getElementById('oUfnFiNPmXnNjzu');
    //let f2 = f_.options[f_.selectedIndex].value;
    //f.value = f2;


    $('#HkNBOhMkAyDsQyq').fadeIn(200);
});



$('#UxjkajUgJngZOkw').on('click', function ()
{
    let e = document.getElementById('NJFYeORUIiKTXrz');
    //let e_ = document.getElementById('aFoQOFiXPQobjPX');
    let department = $('#dOryXMJCOpmMFDw_').attr('dep');
    if (sessionStorage.getItem('gaukHwbLvIchVtA') != null) 
    {
        department = sessionStorage.getItem('gaukHwbLvIchVtA');
    }
    //let e2 = e_.options[e_.selectedIndex].value;
    //e.value = e2;
    e.value = department;


    let worker = $('#nrKYNmWitBwDNUj_').attr('worker');
    if (sessionStorage.getItem('ZDCmGEJAljtfCfz') != null) 
    {
        worker = sessionStorage.getItem('ZDCmGEJAljtfCfz');
    }


    let id = e.options[e.selectedIndex].value;
    document.getElementById('AEHzpmyFkSNvUdo').innerHTML = '';

    model_w.sort((a, b) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0)); //sortuj według nazwiska
    for (let i = 0; i < model_w.length; i++) 
    {
        if (model_w[i].DepartmentID == id) 
        {
            //document.getElementById('AEHzpmyFkSNvUdo').innerHTML += `<option value="` + model_w[i].Id + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
            if (model_w[i].Id == worker) 
            {
                document.getElementById('AEHzpmyFkSNvUdo').innerHTML += `<option selected value="` + model_w[i].Id + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
            }
            else 
            {
                document.getElementById('AEHzpmyFkSNvUdo').innerHTML += `<option value="` + model_w[i].Id + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
            }
        }
    }


    $('#cYgceuOTNRyhtgw').fadeIn(200);
});

$('#VXiKGpgSvpKOZKT').on('change', function ()
{
    document.getElementById('EBenMhrJHjRYloI').innerHTML = ``;

    for (let i = 0; i < model_l.length; i++)
    {
        if (model_l[i].Name == this.options[this.selectedIndex].text)
        {
            if (model_l[i].Description != null)
            {
                $('#EBenMhrJHjRYloI').removeClass('fdjtgOVkxlRqfDM');
                document.getElementById('EBenMhrJHjRYloI').innerHTML += `<option value="` + model_l[i].Id + `">` + model_l[i].Description + `</option>`;
            }
            else
            {
                $('#EBenMhrJHjRYloI').addClass('fdjtgOVkxlRqfDM');
                document.getElementById('EBenMhrJHjRYloI').innerHTML += `<option value="` + model_l[i].Id + `">-</option>`;
            }
        }
    }

    sortSelect(document.getElementById('EBenMhrJHjRYloI'));
});

$('#VXiKGpgSvpKOZKT').trigger('change');

$('#OiWbwAUjZnyKUtE').on('click', function ()
{
    $('#HkNBOhMkAyDsQyq').fadeOut(200);
});

$('#cMMVwSiiAWqslkZ').on('click', function ()
{
    $('#cYgceuOTNRyhtgw').fadeOut(200);
});

$('#jAHsTUaWMwBubwN').on('click', function ()
{
    var days = [];
    var toRemove = [];

    let oUfnFiNPmXnNjzu = document.getElementById('ILEsYMjvtNNaevj');
    let workerID_ = oUfnFiNPmXnNjzu.options[oUfnFiNPmXnNjzu.selectedIndex].value;
    let enter_ = null;
    let exit_ = null;
    let dFiioMzmTCjjcWp = document.getElementById('EBenMhrJHjRYloI');
    let leaveID_ = dFiioMzmTCjjcWp.options[dFiioMzmTCjjcWp.selectedIndex].value;

    let od_ = document.getElementById('UaoNzsYOeLSszDN').value;
    let do_ = document.getElementById('kHKjBWOtRRZfmIH').value;

    if (od_ != '' && do_ != '') 
    {
        days = getDatesInRange(new Date(od_), new Date(do_));
        for (let i = 0; i < days.length; i++) 
        {
            let day = new Date(days[i]);

            for (let j = 0; j < model_l.length; j++) 
            {
                if (model_l[j].Id == leaveID_)
                {

                    if (!model_l[j].IfWeekends)
                    {
                        if (isWeekend(day)) 
                        {
                            toRemove.push(day);
                        }
                    }

                    if (!model_l[j].IfHolidays)
                    {
                        for (let k = 0; k < model_h.length; k++) 
                        {
                            if (new Date(days[i]).toISOString().split('T')[0] == model_h[k].Date.split('T')[0]) 
                            {
                                toRemove.push(day);
                            }
                        }
                    }
                }
            }
        }
    }


    var leaveDays = days.filter(function (e, index)
    {
        return (!toRemove.some(d => +d === +e));
    });



    var arrayOfDays = [];
    var toRemove2 = [];
    for (let i = 0; i < leaveDays.length; i++)
    {
        let date = leaveDays[i].toISOString().split('T')[0];
        arrayOfDays.push(date);

        for (let j = 0; j < model_t.length; j++) 
        {
            if (workerID_ == model_t[j].WorkerID && model_t[j].LeaveDate.split('T')[0] != date && model_t[j].LeaveDate != null && model_t[j].Enter == null && model_t[j].Exit == null) 
            {
                toRemove2.push(model_t[j].LeaveDate.split('T')[0]);
            }
        }
    }

    var toRemove2_new = [...new Set(toRemove2)];
    toRemove2_new.sort();

    arrayOfDays = arrayOfDays.filter((el) => !toRemove2_new.includes(el)); //usun wszystkie powtarzajace sie daty

    if (arrayOfDays != null) 
    {
        for (let i = 0; i < arrayOfDays.length; i++) 
        {
            for (let j = 0; j < model_t.length; j++) 
            {
                if (model_t[j].Enter == null && model_t[j].Exit == null && model_t[j].WorkerID == workerID_) 
                {
                    if (model_t[j].LeaveDate.split('T')[0] == arrayOfDays[i]) 
                    {
                        if (workerID_ != 0 || workerID_ != '0' || workerID_ != null) {
                            $.ajax({
                                type: 'POST',
                                url: '/Times/EditLeave',
                                data: {
                                    id: model_t[j].Id,
                                    workerID: workerID_,
                                    enter: null,
                                    exit: null,
                                    leaveID: leaveID_,
                                    leaveDate: arrayOfDays[i]
                                },
                                success: function (response)
                                {
                                    location.reload();
                                },
                                error: function (xhr, status, error)
                                {
                                    console.log('Error updating column value:', error);
                                }
                            });
                        }
                    }
                }
            }
        }
    }

    //if (od_ != '' && do_ != '') 
    //{
    //    days = getDatesInRange(new Date(od_), new Date(do_));
    //}

    //if (days != null) 
    //{
    //    for (let i = 0; i < days.length; i++)
    //    {
    //        for (let j = 0; j < model_t.length; j++) 
    //        {
    //            if (model_t[j].Enter == null && model_t[j].Exit == null && model_t[j].WorkerID == workerID_) 
    //            {
    //                if (model_t[j].LeaveDate.split('T')[0] == days[i].toISOString().split('T')[0]) 
    //                {
    //                    $.ajax({
    //                        type: 'POST',
    //                        url: '/Times/EditLeave',
    //                        data: {
    //                            id: model_t[j].Id,
    //                            workerID: workerID_,
    //                            enter: null,
    //                            exit: null,
    //                            leaveID: leaveID_,
    //                            leaveDate: days[i].toISOString().split('T')[0]
    //                        },
    //                        success: function (response)
    //                        {
    //                            location.reload();
    //                        },
    //                        error: function (xhr, status, error)
    //                        {
    //                            console.log('Error updating column value:', error);
    //                        }
    //                    });
    //                }
    //            }
    //        }
    //    }
    //}
    

});

$('#jJoxUyzeqPSCQvB').on('click', function (e)
{
    var seconds = 0;

    var days = [];

    let oUfnFiNPmXnNjzu = document.getElementById('AEHzpmyFkSNvUdo');
    let workerID_ = oUfnFiNPmXnNjzu.options[oUfnFiNPmXnNjzu.selectedIndex].value;
    let enter_ = null;
    let exit_ = null;
    //let dFiioMzmTCjjcWp = document.getElementById('NJFYeORUIiKTXrz');
    //let leaveID_ = dFiioMzmTCjjcWp.options[dFiioMzmTCjjcWp.selectedIndex].value;

    let od_ = document.getElementById('rwQHcmGHZiDEGBz').value;
    let do_ = document.getElementById('KMUlzAJgswlgYYq').value;

    if (od_ != '' && do_ != '')
    {
        days = getDatesInRange(new Date(od_), new Date(do_));
    }

    if (days.length > 0)
    {
        for (let i = 0; i < days.length; i++)
        {
            //for (let j = 0; j < model_t.length; j++)
            //{
            //    if (model_t[j].Enter == null && model_t[j].Exit == null && model_t[j].WorkerID == workerID_)
            //    {
            //        if (model_t[j].LeaveDate.split('T')[0] == days[i].toISOString().split('T')[0])
            //        {
            //            $.ajax({
            //                type: 'POST',
            //                url: '/Times/RemoveLeave',
            //                data: {
            //                    id: model_t[j].Id,
            //                },
            //                success: function (response)
            //                {
            //                    //location.reload();
            //                },
            //                error: function (xhr, status, error)
            //                {
            //                    console.log('Error removing column value:', error);
            //                }
            //            });

            //            seconds++;
            //        }
            //    }
            //}

            let day = new Date(days[i]).toLocaleDateString();

            let IpLJVyLZIbPJsat = document.querySelectorAll('.IpLJVyLZIbPJsat');
            for (let j = 0; j < IpLJVyLZIbPJsat.length; j++)
            {
                //let id_ = IpLJVyLZIbPJsat[j].id;
                let id_ = $(IpLJVyLZIbPJsat[j]).parent().attr('id_');
                let date_ = new Date($(IpLJVyLZIbPJsat[j]).parent().attr('id')).toLocaleDateString();

                if (day == date_) 
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/RemoveLeave',
                        data: {
                            id: id_,
                        },
                        success: function (response)
                        {
                            //location.reload();
                            //console.log(j);
                        },
                        error: function (xhr, status, error) 
                        {
                            console.log('Error removing column value:', error);
                        }
                    });

                    seconds++;
                }
            }


        }

        //
        $('#cYgceuOTNRyhtgw').hide();

        let htmlLoader = `<div class="pGKcZvErUB">` +
            `<form class="form_3">` +
            `<div class="loader_div BkvylzxsLMTrGpQ">` +
            `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>` +
            `</div>` +
            `<div class="form-group bKQpZIoPOmwNvbh">` +
            `<span class="vfxLVmwjkBogmPm" id="dTfLGgGbUYkYoyw"></span>` +
            `</div>` +
            `</form>` +
            `</div>`;

        $('body').append(htmlLoader);
        
        let f = 0;
        $('#dTfLGgGbUYkYoyw').html(`Usuwanie... ` + `(` + f + `/` + seconds + `)`);
        var interval = setInterval(function ()
        {
            $('#dTfLGgGbUYkYoyw').html(`Usuwanie... ` + `(` + f++ + `/` + seconds + `)`);

            if (f - 1 == seconds) {
                clearInterval(interval);

                setTimeout(function ()
                {
                    location.reload();
                }, 100);
            }
        }, 50);
        //

    }
});

function RXklobeYunXfiov(t) {
    document.getElementById('RgqSDmbppdlqlIR').innerHTML = ``;

    let id = t.getAttribute('BOBxrOhlBwoCJjS');
    for (let i = 0; i < model_t.length; i++) 
    {
        if (model_t[i].Id == id)
        {
            sessionStorage.setItem('REYaxMuUFkKkLnM', id);
        }
    }



    //
    document.getElementById('RgqSDmbppdlqlIR').innerHTML = ``;

    for (let i = 0; i < model_l.length; i++)
    {
        if (model_l[i].Name == $(t).parent().parent().parent().children().eq(0).children().eq(1).html())
        {
            document.getElementById('uVPVZwEWSbHTwor').value = $(t).parent().parent().parent().children().eq(0).children().eq(1).html();
            if (model_l[i].Description != null)
            {
                $('#RgqSDmbppdlqlIR').removeClass('fdjtgOVkxlRqfDM');
                document.getElementById('RgqSDmbppdlqlIR').innerHTML += `<option value="` + model_l[i].Id + `">` + model_l[i].Description + `</option>`;
            }
            else
            {
                $('#RgqSDmbppdlqlIR').addClass('fdjtgOVkxlRqfDM');
                document.getElementById('RgqSDmbppdlqlIR').innerHTML += `<option value="` + model_l[i].Id + `">-</option>`;
            }
        }
    }

    sortSelect(document.getElementById('RgqSDmbppdlqlIR'));

    document.getElementById('RgqSDmbppdlqlIR').value = $(t).parent().parent().parent().children().eq(0).children().eq(1).attr('id');
    //



    $('.svTlrqbGxnTrkkq').fadeOut(200);
    $('#SVFZxwVqgTyxitg').fadeIn(200);
};

function RzQPFpODoklamqK(t) {

    let id = t.getAttribute('naUqxVzzjmhDYeI');
    for (let i = 0; i < model_t.length; i++) 
    {
        if (model_t[i].Id == id)
        {
            sessionStorage.setItem('AmXvxdSukpqGMPk', id);
            document.getElementById('uzHitJizLiMWCdm').innerHTML = `<span>` + model_t[i].LeaveDate.split('T')[0] + `</span>`;
            for (let j = 0; j < model_w.length; j++) {
                if (model_t[i].WorkerID == model_w[j].Id) {
                    document.getElementById('uzHitJizLiMWCdm').innerHTML += `<span>` + model_w[j].Surname + ` ` + model_w[j].Name + `</span>`;
                }
            }
            for (let j = 0; j < model_l.length; j++)
            {
                if (model_t[i].LeaveID == model_l[j].Id)
                {
                    document.getElementById('uzHitJizLiMWCdm').innerHTML += `<span>` + model_l[j].Name + `</span>`;
                }
            }
        }
    }

    $('.svTlrqbGxnTrkkq').fadeOut(200);
    $('#egNhcgnTYPYVrEX').fadeIn(200);
};

$('#uVPVZwEWSbHTwor').on('change', function ()
{
    document.getElementById('RgqSDmbppdlqlIR').innerHTML = ``;

    for (let i = 0; i < model_l.length; i++)
    {
        if (model_l[i].Name == this.options[this.selectedIndex].text)
        {
            if (model_l[i].Description != null)
            {
                $('#RgqSDmbppdlqlIR').removeClass('fdjtgOVkxlRqfDM');
                document.getElementById('RgqSDmbppdlqlIR').innerHTML += `<option value="` + model_l[i].Id + `">` + model_l[i].Description + `</option>`;
            }
            else
            {
                $('#RgqSDmbppdlqlIR').addClass('fdjtgOVkxlRqfDM');
                document.getElementById('RgqSDmbppdlqlIR').innerHTML += `<option value="` + model_l[i].Id + `">-</option>`;
            }
        }
    }

    //sortSelect(document.getElementById('RgqSDmbppdlqlIR'));
});
$('#uVPVZwEWSbHTwor').trigger('change');

$('#uVPVZwEWSbHTwor_').on('change', function ()
{
    document.getElementById('RgqSDmbppdlqlIR_').innerHTML = ``;

    for (let i = 0; i < model_l.length; i++)
    {
        if (model_l[i].Name == this.options[this.selectedIndex].text)
        {
            if (model_l[i].Description != null)
            {
                $('#RgqSDmbppdlqlIR_').removeClass('fdjtgOVkxlRqfDM');
                document.getElementById('RgqSDmbppdlqlIR_').innerHTML += `<option value="` + model_l[i].Id + `">` + model_l[i].Description + `</option>`;
            }
            else
            {
                $('#RgqSDmbppdlqlIR_').addClass('fdjtgOVkxlRqfDM');
                document.getElementById('RgqSDmbppdlqlIR_').innerHTML += `<option value="` + model_l[i].Id + `">-</option>`;
            }
        }
    }

    //sortSelect(document.getElementById('RgqSDmbppdlqlIR'));
});
$('#uVPVZwEWSbHTwor_').trigger('change');




$('#UCOopmnzJXcuVwf').on('click', function ()
{
    $('.svTlrqbGxnTrkkq').fadeIn(200);
    $('#SVFZxwVqgTyxitg').fadeOut(200);
});

$('#lDzaMzkdXbSjCRo').on('click', function ()
{
    $('.svTlrqbGxnTrkkq').fadeIn(200);
    $('#egNhcgnTYPYVrEX').fadeOut(200);
});

$('#HPqWdpQsVNkqFnE').on('click', function ()
{
    let id = sessionStorage.getItem('REYaxMuUFkKkLnM');
    for (let i = 0; i < model_t.length; i++) {
        if (model_t[i].Id == id) {
            
            let RgqSDmbppdlqlIR = document.getElementById('RgqSDmbppdlqlIR');
            let leaveID_ = RgqSDmbppdlqlIR.options[RgqSDmbppdlqlIR.selectedIndex].value;

            $.ajax({
                type: 'POST',
                url: '/Times/EditLeave',
                data: {
                    id: id,
                    workerID: model_t[i].WorkerID,
                    enter: null,
                    exit: null,
                    leaveID: leaveID_,
                    leaveDate: model_t[i].LeaveDate
                },
                success: function (response)
                {
                    location.reload();
                },
                error: function (xhr, status, error)
                {
                    console.log('Error updating column value:', error);
                }
            });
        }
    }
});

$('#TDsKypeMijSzhDc').on('click', function ()
{
    let id = sessionStorage.getItem('AmXvxdSukpqGMPk');

    $.ajax({
        type: 'POST',
        url: '/Times/RemoveLeave',
        data: {
            id: id,
        },
        success: function (response)
        {
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error removing column value:', error);
        }
    });
});

function MxLHxritEhBvupe_() 
{
    let t = document.getElementById('MxLHxritEhBvupe');
    let TDs = document.querySelectorAll('#xhXEyORRmmYlQgG tbody tr td:not(:first-child)');

    for (let i = 0; i < TDs.length; i++) 
    {
        if (!$(TDs[i]).hasClass('disabled')) 
        {
            let date = new Date(TDs[i].id);

            if (t.checked)
            {
                for (let j = 0; j < model_h.length; j++) 
                {
                    let dateString = new Date(TDs[i].id).toLocaleDateString();
                    let model_h_Date = new Date(model_h[j].Date).toLocaleDateString();

                    if (dateString == model_h_Date) 
                    {
                        $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>` + model_h[j].Name + `</span></div>`);
                        $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                    }
                }

                if ($(TDs[i]).find('.PGvvQnRjsnaGvPW').length == 0) 
                {
                    if (date.getDay() === 6)
                    {
                        $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>Sobota</span></div>`);
                        $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                    }

                    if (date.getDay() === 0)
                    {
                        $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>Niedziela</span></div>`);
                        $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                    }
                }


                if ($(TDs[i]).find('.IpLJVyLZIbPJsat').length != 0) 
                {
                    $(TDs[i]).children('.PGvvQnRjsnaGvPW').remove();
                }

                $(t).parent().children('span').html(`Ukryj dni wolne od pracy`);

                $(t).parent().addClass('rVbmBkiLFEBlabZ');

                sessionStorage.setItem('XLsdAGmRfSDLmVh', 'true');
            }
            else 
            {
                $('.PGvvQnRjsnaGvPW').remove();
                $(TDs[i]).children().removeClass('UjOQjNzjdVJpBtu');
                $(t).parent().children('span').html(`Pokaż dni wolne od pracy`);
                $(t).parent().removeClass('rVbmBkiLFEBlabZ');

                sessionStorage.removeItem('XLsdAGmRfSDLmVh');
            }
        }
    }
};

function MxLHxritEhBvupe__show() 
{
    let TDs = document.querySelectorAll('#xhXEyORRmmYlQgG tbody tr td:not(:first-child)');
    for (let i = 0; i < TDs.length; i++) 
    {
        if (!$(TDs[i]).hasClass('disabled')) 
        {
            let date = new Date(TDs[i].id);

            for (let j = 0; j < model_h.length; j++) 
            {
                let dateString = new Date(TDs[i].id).toLocaleDateString();
                let model_h_Date = new Date(model_h[j].Date).toLocaleDateString();

                if (dateString == model_h_Date) 
                {
                    $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>` + model_h[j].Name + `</span></div>`);
                    $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                    $(TDs[i]).attr('title', model_h[j].Name + ' (' + model_h_Date + ')');

                    if (new Date(model_h[j].Date).getDay() === 6) 
                    {
                        //Święto w Sobotę
                        $(TDs[i]).css({ 'box-shadow': 'inset 0px 0px 0px 1px orangered' });
                        $(TDs[i]).attr('title', 'Święto w Sobotę! ' + model_h[j].Name + ' (' + model_h_Date + ')');
                    }
                }
            }

            if ($(TDs[i]).find('.PGvvQnRjsnaGvPW').length == 0) 
            {
                //let worker = $('#nrKYNmWitBwDNUj_').attr('worker');
                //if (sessionStorage.getItem('ZDCmGEJAljtfCfz') != null) 
                //{
                //    worker = sessionStorage.getItem('ZDCmGEJAljtfCfz');
                //}

                for (let x = 0; x < model_ts.length; x++) 
                {
                    if (model_ts[x].WorkerId == null) // jedyna opcja
                    {
                        if (model_ts[x].CzyPoniedzialekWolny) 
                        {
                            if (date.getDay() === 1) 
                            {
                                $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>Poniedziałek</span></div>`);
                                $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                            }
                        }
                        if (model_ts[x].CzyWtorekWolny) 
                        {
                            if (date.getDay() === 2) 
                            {
                                $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>Wtorek</span></div>`);
                                $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                            }
                        }
                        if (model_ts[x].CzySrodaWolny)
                        {
                            if (date.getDay() === 3)
                            {
                                $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>Środa</span></div>`);
                                $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                            }
                        }
                        if (model_ts[x].CzyCzwartekWolny)
                        {
                            if (date.getDay() === 4)
                            {
                                $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>Czwartek</span></div>`);
                                $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                            }
                        }
                        if (model_ts[x].CzyPiatekWolny)
                        {
                            if (date.getDay() === 5)
                            {
                                $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>Piątek</span></div>`);
                                $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                            }
                        }
                        if (model_ts[x].CzySobotaWolny)
                        {
                            if (date.getDay() === 6)
                            {
                                $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>Sobota</span></div>`);
                                $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                            }
                        }
                        if (model_ts[x].CzyNiedzielaWolny)
                        {
                            if (date.getDay() === 0)
                            {
                                $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>Niedziela</span></div>`);
                                $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                            }
                        }
                    }
                }

                //if (date.getDay() === 6)
                //{
                //    $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>Sobota</span></div>`);
                //    $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                //}

                //if (date.getDay() === 0)
                //{
                //    $(TDs[i]).append(`<div class="PGvvQnRjsnaGvPW"><span>Niedziela</span></div>`);
                //    $(TDs[i]).children().addClass('UjOQjNzjdVJpBtu');
                //}
            }


            if ($(TDs[i]).find('.IpLJVyLZIbPJsat').length != 0) 
            {
                $(TDs[i]).children('.PGvvQnRjsnaGvPW').remove();
            }
        }
    }
};

function MxLHxritEhBvupe__hide() 
{
    $('.PGvvQnRjsnaGvPW').remove();

    let TDs = document.querySelectorAll('#xhXEyORRmmYlQgG tbody tr td:not(:first-child)');
    for (let i = 0; i < TDs.length; i++) 
    {
        if (!$(TDs[i]).hasClass('disabled')) 
        {
            $(TDs[i]).children().removeClass('UjOQjNzjdVJpBtu');
        }
    }
};

function pokazDniWolneOdPracy_change() 
{
    if (!$('#LXNBHVBFXwnnkkP').hasClass('pAPTryUdWHeiZZa_'))
    {       
        MxLHxritEhBvupe__show();
        $('#LXNBHVBFXwnnkkP').children('.settings_a_select').children('span').eq(0).html('Ukryj');
        $('#LXNBHVBFXwnnkkP').children('ion-icon').attr('name', 'eye-outline');
        sessionStorage.setItem('XtFaCWfKCtlUMUt', 'true');

        //console.log('1');
        $('#LXNBHVBFXwnnkkP').addClass('pAPTryUdWHeiZZa_');
    }
    else 
    {
        
        MxLHxritEhBvupe__hide();
        $('#LXNBHVBFXwnnkkP').children('.settings_a_select').children('span').eq(0).html('Pokaż');
        $('#LXNBHVBFXwnnkkP').children('ion-icon').attr('name', 'eye-off-outline');
        sessionStorage.removeItem('XtFaCWfKCtlUMUt');

        //console.log('2');
        $('#LXNBHVBFXwnnkkP').removeClass('pAPTryUdWHeiZZa_');  
    }
};

function AxniBufKgDcaYFA(t) 
{ 
    sessionStorage.setItem('mcctFxsWDAvvPfs', t.scrollTop)
};

$(document).ready(function ()
{
    //year select
    if (sessionStorage.getItem('MnqHzqBiryXOWYP') != null) 
    {
        let yearSelect = document.getElementById('iHCBwRzOLpgGYQG');
        //yearSelect.value = sessionStorage.getItem('MnqHzqBiryXOWYP');
    }
    //

    // month select
    if (sessionStorage.getItem('wSGVyznxxQsFpjg') != null) 
    {
        let monthSelect = document.getElementById('IZdWjCoFNPZaIaP');
        //monthSelect.value = sessionStorage.getItem('wSGVyznxxQsFpjg');
    }
    //

    // department select
    if (sessionStorage.getItem('lIglBkqRjlDZnab') != null)
    {
        let departmentSelect = document.getElementById('aFoQOFiXPQobjPX');
        //departmentSelect.value = sessionStorage.getItem('lIglBkqRjlDZnab');

        //FFkdMqNnTDbWkXb();
    }
    //

    // worker select
    if (sessionStorage.getItem('qSAmVfvuBMTlcKB') != null) 
    {
        let workerSelect = document.getElementById('oUfnFiNPmXnNjzu');
        //workerSelect.value = sessionStorage.getItem('qSAmVfvuBMTlcKB');
    }
    //

    //generateCalendar();
    generateNewTable();

    //scroll - po załadowaniu generateCalendar
    if (sessionStorage.getItem('mcctFxsWDAvvPfs') != null)
    {
        let rightNav = document.querySelector('.right-nav');
        rightNav.scrollTop = sessionStorage.getItem('mcctFxsWDAvvPfs');
    }
    //
    
});

function changeFirstWorkerBasedOnDepartment(depID) 
{
    model_w.sort((a, b) => (a.Surname < b.Surname) ? 1 : ((b.Surname < a.Surname) ? -1 : 0)); //sortuj według nazwiska
    for (let i = 0; i < model_w.length; i++) 
    {
        if (depID == model_w[i].DepartmentID) 
        {
            let name = model_w[i].Surname + ' ' + model_w[i].Name;
            $('#nrKYNmWitBwDNUj_').children('.settings_a_select').children('span').eq(1).html(name);

            sessionStorage.setItem('ZDCmGEJAljtfCfz', model_w[i].Id);
            $('#nrKYNmWitBwDNUj_').attr('worker', model_w[i].Id);
        }

        //break;
    }
};

function lhkKNaastOkkmMh(t)
{
    $(t).children('.settings_a_select').children('ion-icon').attr('name', 'chevron-up-outline');
};

function qQgDgqyovQyICUL() 
{
    if (!$('#qQgDgqyovQyICUL_').hasClass('pAPTryUdWHeiZZa')) 
    {
        let html = '';
        let date = new Date();
        let prevYears = date.getFullYear() - 2;
        for (prevYears; prevYears <= date.getFullYear(); prevYears++) 
        {
            html += `<div onclick="CanjEZFvPetVidb(this)" class="settings_a ugiECcrnKwaoVsb" id="qQgDgqyovQyICUL__">` +
                `<div class="settings_a_select">` +
                `<span></span><span style="opacity: 1; margin-right: 20px;">` + prevYears + `</span>` +
                `</div>` +
                `</div>`;
        }
        $('#qQgDgqyovQyICUL_').after(html);



        let qQgDgqyovQyICUL__ = document.querySelectorAll('#qQgDgqyovQyICUL__');
        for (let i = 0; i < qQgDgqyovQyICUL__.length; i++) 
        {
            if (sessionStorage.getItem('wSIspPdnliPlpLI') != null) 
            {
                if ($(qQgDgqyovQyICUL__[i]).children('.settings_a_select').children('span').eq(1).html() == sessionStorage.getItem('wSIspPdnliPlpLI')) 
                {
                    $(qQgDgqyovQyICUL__[i]).addClass('QbNQbKEvEMUpWaH');
                }
            }
            else 
            {
                if ($(qQgDgqyovQyICUL__[i]).children('.settings_a_select').children('span').eq(1).html() == date.getFullYear()) 
                {
                    $(qQgDgqyovQyICUL__[i]).addClass('QbNQbKEvEMUpWaH');
                }
            }
        }

        $('#qQgDgqyovQyICUL_').addClass('pAPTryUdWHeiZZa');
    }
    else 
    {
        let qQgDgqyovQyICUL__ = document.querySelectorAll('#qQgDgqyovQyICUL__');
        for (let i = 0; i < qQgDgqyovQyICUL__.length; i++)
        {
            $(qQgDgqyovQyICUL__[i]).remove();
        }

        $('#qQgDgqyovQyICUL_').children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');

        $('#qQgDgqyovQyICUL_').removeClass('pAPTryUdWHeiZZa');
    }
};

function CanjEZFvPetVidb(t) 
{
    let year = $(t).children('.settings_a_select').children('span').eq(1).html();
    $('#qQgDgqyovQyICUL_').children('.settings_a_select').children('span').eq(1).html(year);

    let qQgDgqyovQyICUL__ = document.querySelectorAll('#qQgDgqyovQyICUL__');
    for (let i = 0; i < qQgDgqyovQyICUL__.length; i++)
    {
        $(qQgDgqyovQyICUL__[i]).removeClass('QbNQbKEvEMUpWaH');
    }
    $(t).addClass('QbNQbKEvEMUpWaH');

    sessionStorage.setItem('wSIspPdnliPlpLI', $('#qQgDgqyovQyICUL_').children('.settings_a_select').children('span').eq(1).html());

    generateNewTable();
};

function dOryXMJCOpmMFDw() 
{
    if (!$('#dOryXMJCOpmMFDw_').hasClass('pAPTryUdWHeiZZa')) 
    {
        let html = '';
        model_d.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
        for (let i = 0; i < model_d.length; i++) 
        {
            html += `<div onclick="HMdMMtqNwVAguDt(this)" class="settings_a ugiECcrnKwaoVsb" id="dOryXMJCOpmMFDw__" dep="` + model_d[i].Id + `">` +
                `<div class="settings_a_select">` +
                `<span></span><span style="opacity: 1; margin-right: 20px;">` + model_d[i].Name + `</span>` +
                `</div>` +
                `</div>`;
        }
        $('#dOryXMJCOpmMFDw_').after(html);

        let dOryXMJCOpmMFDw__ = document.querySelectorAll('#dOryXMJCOpmMFDw__');
        for (let i = 0; i < dOryXMJCOpmMFDw__.length; i++) 
        {
            if (sessionStorage.getItem('gaukHwbLvIchVtA') != null)
            {
                if ($(dOryXMJCOpmMFDw__[i]).attr('dep') == sessionStorage.getItem('gaukHwbLvIchVtA')) 
                {
                    $(dOryXMJCOpmMFDw__[i]).addClass('QbNQbKEvEMUpWaH');
                }
            }
            else 
            {
                $(dOryXMJCOpmMFDw__[0]).addClass('QbNQbKEvEMUpWaH');
            }
        }

        $('#dOryXMJCOpmMFDw_').addClass('pAPTryUdWHeiZZa');
    }
    else 
    {
        let dOryXMJCOpmMFDw__ = document.querySelectorAll('#dOryXMJCOpmMFDw__');
        for (let i = 0; i < dOryXMJCOpmMFDw__.length; i++)
        {
            $(dOryXMJCOpmMFDw__[i]).remove();
        }

        $('#dOryXMJCOpmMFDw_').children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');

        $('#dOryXMJCOpmMFDw_').removeClass('pAPTryUdWHeiZZa');
    }
};

function HMdMMtqNwVAguDt(t) 
{
    let dzial = $(t).children('.settings_a_select').children('span').eq(1).html();
    $('#dOryXMJCOpmMFDw_').children('.settings_a_select').children('span').eq(1).html(dzial);
    $('#dOryXMJCOpmMFDw_').attr('dep', t.getAttribute('dep'));

    let dOryXMJCOpmMFDw__ = document.querySelectorAll('#dOryXMJCOpmMFDw__');
    for (let i = 0; i < dOryXMJCOpmMFDw__.length; i++)
    {
        $(dOryXMJCOpmMFDw__[i]).removeClass('QbNQbKEvEMUpWaH');
    }
    $(t).addClass('QbNQbKEvEMUpWaH');

    sessionStorage.setItem('gaukHwbLvIchVtA', t.getAttribute('dep'));


    changeFirstWorkerBasedOnDepartment(t.getAttribute('dep'));
    generateNewTable();


    //clear names
    let nrKYNmWitBwDNUj__ = document.querySelectorAll('#nrKYNmWitBwDNUj__');
    for (let i = 0; i < nrKYNmWitBwDNUj__.length; i++)
    {
        $(nrKYNmWitBwDNUj__[i]).remove();
    }
    $('#nrKYNmWitBwDNUj_').children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');
    $('#nrKYNmWitBwDNUj_').removeClass('pAPTryUdWHeiZZa');
};

function nrKYNmWitBwDNUj() 
{
    if (!$('#nrKYNmWitBwDNUj_').hasClass('pAPTryUdWHeiZZa'))
    {
        let department = $('#dOryXMJCOpmMFDw_').attr('dep');
        if (sessionStorage.getItem('gaukHwbLvIchVtA') != null) 
        {
            department = sessionStorage.getItem('gaukHwbLvIchVtA');
        }

        let html = '';
        model_w.sort((a, b) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0)); //sortuj według nazwiska
        for (let i = 0; i < model_w.length; i++) 
        {
            if (model_w[i].DepartmentID == department) 
            {
                html += `<div onclick="GPgiCvhaVxDeAlN(this)" class="settings_a ugiECcrnKwaoVsb" id="nrKYNmWitBwDNUj__" worker="` + model_w[i].Id + `">` +
                    `<div class="settings_a_select">` +
                    `<span></span><span style="opacity: 1; margin-right: 20px;">` + model_w[i].Surname + ' ' + model_w[i].Name + `</span>` +
                    `</div>` +
                    `</div>`;
            }
        }
        $('#nrKYNmWitBwDNUj_').after(html);

        let nrKYNmWitBwDNUj__ = document.querySelectorAll('#nrKYNmWitBwDNUj__');
        for (let i = 0; i < nrKYNmWitBwDNUj__.length; i++) 
        {
            if (sessionStorage.getItem('ZDCmGEJAljtfCfz') != null) 
            {
                if ($(nrKYNmWitBwDNUj__[i]).attr('worker') == sessionStorage.getItem('ZDCmGEJAljtfCfz')) 
                {
                    $(nrKYNmWitBwDNUj__[i]).addClass('QbNQbKEvEMUpWaH');
                }
            }
            else 
            {
                $(nrKYNmWitBwDNUj__[0]).addClass('QbNQbKEvEMUpWaH');
            }
        }

        $('#nrKYNmWitBwDNUj_').addClass('pAPTryUdWHeiZZa');
    }
    else
    {
        let nrKYNmWitBwDNUj__ = document.querySelectorAll('#nrKYNmWitBwDNUj__');
        for (let i = 0; i < nrKYNmWitBwDNUj__.length; i++) 
        {
            $(nrKYNmWitBwDNUj__[i]).remove();
        }

        $('#nrKYNmWitBwDNUj_').children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');

        $('#nrKYNmWitBwDNUj_').removeClass('pAPTryUdWHeiZZa');
    }
};

function GPgiCvhaVxDeAlN(t) 
{
    let worker = $(t).children('.settings_a_select').children('span').eq(1).html();
    $('#nrKYNmWitBwDNUj_').children('.settings_a_select').children('span').eq(1).html(worker);
    $('#nrKYNmWitBwDNUj_').attr('worker', t.getAttribute('worker'));

    let nrKYNmWitBwDNUj__ = document.querySelectorAll('#nrKYNmWitBwDNUj__');
    for (let i = 0; i < nrKYNmWitBwDNUj__.length; i++)
    {
        $(nrKYNmWitBwDNUj__[i]).removeClass('QbNQbKEvEMUpWaH');
    }
    $(t).addClass('QbNQbKEvEMUpWaH');

    sessionStorage.setItem('ZDCmGEJAljtfCfz', t.getAttribute('worker'));

    generateNewTable();
};

