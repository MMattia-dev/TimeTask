
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

function generateCalendar()
{
    //const date = new Date();
    //date.setDate(1); //ustaw pierwszy dzień miesiąca
    //$('.loader_div').fadeOut(200);


    //department
    let aFoQOFiXPQobjPX = document.getElementById('aFoQOFiXPQobjPX');
    let departmentID_ = aFoQOFiXPQobjPX.options[aFoQOFiXPQobjPX.selectedIndex].value;
    //

    //worker
    let oUfnFiNPmXnNjzu = document.getElementById('oUfnFiNPmXnNjzu');
    let workerID_ = oUfnFiNPmXnNjzu.options[oUfnFiNPmXnNjzu.selectedIndex].value;
    //

    //let PgLKgYMAvonpLlF = sessionStorage.getItem('PgLKgYMAvonpLlF');
    //if (PgLKgYMAvonpLlF != null)
    //{
    //    oUfnFiNPmXnNjzu.value = PgLKgYMAvonpLlF;
    //}
    //else {
    //    oUfnFiNPmXnNjzu.value = -1;
    //}
    
    //let GSYLLXKlArEDwFF = sessionStorage.getItem('GSYLLXKlArEDwFF');
    //if (GSYLLXKlArEDwFF == null)
    //{
    //    sessionStorage.setItem('GSYLLXKlArEDwFF', aFoQOFiXPQobjPX.options[aFoQOFiXPQobjPX.selectedIndex].value);
    //}
    //else {
    //    console.log(sessionStorage.getItem('GSYLLXKlArEDwFF'));
    //}

    //let GSYLLXKlArEDwFF = sessionStorage.getItem('GSYLLXKlArEDwFF');
    //if (GSYLLXKlArEDwFF != null)
    //{
    //    aFoQOFiXPQobjPX.value = GSYLLXKlArEDwFF;
    //    //console.log(GSYLLXKlArEDwFF);
    //}


    if (oUfnFiNPmXnNjzu.value == 'everyone')
    {
        $('.pyyxmssXgPCWuUc').addClass('fNPXdDDFqqbVOkt'); //disable
    }
    else 
    {
        $('.pyyxmssXgPCWuUc').removeClass('fNPXdDDFqqbVOkt'); //enable
    }





    

    let yearSelect = document.getElementById('iHCBwRzOLpgGYQG');
    let year = yearSelect.options[yearSelect.selectedIndex].value;
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
        }
    }

    
    let dykKoaHBFtTPjlK = document.querySelectorAll('.dykKoaHBFtTPjlK');
    for (let i = 0; i < dykKoaHBFtTPjlK.length; i++) 
    {
        let date = dykKoaHBFtTPjlK[i].id;
        for (let j = 0; j < model_t.length; j++) 
        {
            if (model_t[j].WorkerID == workerID_ && model_t[j].Enter == null && model_t[j].Exit == null)
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
                            dykKoaHBFtTPjlK[i].innerHTML += `<div class="PXHhlPBPzXQFpVg" id="` + model_t[j].Id + `">`
                                + `<span>` + name + `</span>`
                                + `<span>(` + description + `)</span>`
                                + `</div>`;
                            //+ `<a><svg viewBox="0 0 512 512" height="30" width="30"><path d="M494.56,55.774l-38.344-38.328c-23.253-23.262-60.965-23.253-84.226,0l-35.878,35.878l122.563,122.563l35.886-35.878C517.814,116.747,517.814,79.044,494.56,55.774z" /><polygon class="st0" points="0,389.435 0,511.998 122.571,511.998 425.246,209.314 302.691,86.751 	"></path></svg></a>`;
                        }
                    }
                }
            }
            else if (workerID_ == 'everyone' && model_t[j].Enter == null && model_t[j].Exit == null) 
            {
                //$('.pyyxmssXgPCWuUc').addClass('fNPXdDDFqqbVOkt'); //enable

                if (model_t[j].LeaveDate.split('T')[0] == date) 
                {
                    for (let k = 0; k < model_l.length; k++)
                    {
                        if (model_l[k].Id == model_t[j].LeaveID)
                        {
                            let abc = $(oUfnFiNPmXnNjzu).children();
                            for (let m = 0; m < abc.length; m++)
                            {
                                if (abc[m].style.display != 'none')
                                {
                                    if (model_t[j].WorkerID == abc[m].getAttribute('value')) {
                                        let name = model_l[k].Name;
                                        let description = model_l[k].Description;
                                        dykKoaHBFtTPjlK[i].innerHTML += `<div class="PXHhlPBPzXQFpVg" id="` + model_t[j].Id + `">`
                                            + `<span>` + abc[m].innerHTML + `</span>`
                                            + `<span>` + name + `</span>`
                                            + `<span>(` + description + `)</span>`
                                            + `</div>`;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    for (let i = 0; i < dykKoaHBFtTPjlK.length; i++) {
        let children = $(dykKoaHBFtTPjlK[i]).children();
        if (children.hasClass('PXHhlPBPzXQFpVg') && children.length > 4) {
            
            let PXHhlPBPzXQFpVg = dykKoaHBFtTPjlK[i].querySelectorAll('.PXHhlPBPzXQFpVg');
            for (let j = 0; j < PXHhlPBPzXQFpVg.length; j++) {
                $(PXHhlPBPzXQFpVg[j]).hide();
            }

            dykKoaHBFtTPjlK[i].innerHTML += `<div class="TYIUWPkeSfoEFoi" onclick="yKZSDGYyOfLkUoB(this)">`
                + `<span>` + PXHhlPBPzXQFpVg.length + `</span>`
                + `<span>pracowników ma zapisany urlop w tym dniu.</span>`
                //+ `<span>(kliknij, aby zobaczyć szczegóły)</span>`
            + `</div>`;
        }
    }
    




    //let days = document.querySelector('.days_');

    //let divs = '';

    ////
    //const prevLastDay = new Date(
    //    year,
    //    month,
    //    0
    //).getDate();
    ////

    //const firstDayIndex = new Date(year, month, 1).getDay(); //pierwszy dzień miesiąca

    ////
    //const lastDayIndex = new Date(
    //    year,
    //    month + 1,
    //    0
    //).getDay();
    ////

    //const nextDays = 7 - lastDayIndex - 0;

    ////dodaj dni poprzedniego miesiąca
    //if (firstDayIndex == 0)
    //{
    //    for (let x = 7; x > 1; x--)
    //    {
    //        divs += `<div class="prev-date2">${prevLastDay - x + 2}</div>`;
    //    }
    //}
    //else
    //{
    //    for (let x = firstDayIndex; x > 1; x--)
    //    {
    //        divs += `<div class="prev-date2">${prevLastDay - x + 2}</div>`;
    //    }
    //}
    ////

    ////dodaj dni miesiąca
    //for (let k = 1; k <= daysLength; k++)
    //{
    //    let newMonth = month + 1;
    //    newMonth = padWithLeadingZeros(newMonth, 2);

    //    let newDay = k;
    //    newDay = padWithLeadingZeros(newDay, 2);

    //    divs += `<div id="` + year + `.` + newMonth + `.` + newDay + `"><span>${k}</span></div>`;
    //}
    ////

    ////dodaj dni następnego miesiąca
    //if (nextDays != 7)
    //{
    //    for (let x = 1; x <= nextDays; x++)
    //    {
    //        divs += `<div class="next-date2">${x}</div>`;
    //    }
    //}
    ////

    ////days.innerHTML = divs;
    //document.querySelector('.days_').innerHTML = divs;


};

function yKZSDGYyOfLkUoB(t) {
    document.querySelector('.efUljXvyQujgoTu').innerHTML = '';

    let PXHhlPBPzXQFpVg = $(t).parent().children();
    for (let i = 0; i < PXHhlPBPzXQFpVg.length; i++) 
    {
        if ($(PXHhlPBPzXQFpVg[i]).hasClass('PXHhlPBPzXQFpVg') && PXHhlPBPzXQFpVg[i].style.display == 'none') 
        {
            document.querySelector('.efUljXvyQujgoTu').innerHTML += `<div class="iLPhCPQLeZriLNQ"><div class="ctIBgsayAyonpQK">` + PXHhlPBPzXQFpVg[i].innerHTML + `</div><div class="jLWszVjseUnWpuM">`
                + `<div><a title="Szczegóły" id="LlkaLZEbAcWBnYK"><svg viewBox="0 0 1920 1920" height="18" width="18"><path d="M1229.93 594.767c36.644 37.975 50.015 91.328 43.72 142.909-9.128 74.877-30.737 144.983-56.093 215.657-27.129 75.623-54.66 151.09-82.332 226.512-44.263 120.685-88.874 241.237-132.65 362.1-10.877 30.018-18.635 62.072-21.732 93.784-3.376 34.532 21.462 51.526 52.648 36.203 24.977-12.278 49.288-28.992 68.845-48.768 31.952-32.31 63.766-64.776 94.805-97.98 15.515-16.605 30.86-33.397 45.912-50.438 11.993-13.583 24.318-34.02 40.779-42.28 31.17-15.642 55.226 22.846 49.582 49.794-5.39 25.773-23.135 48.383-39.462 68.957l-1.123 1.416a1559.53 1559.53 0 0 0-4.43 5.6c-54.87 69.795-115.043 137.088-183.307 193.977-67.103 55.77-141.607 103.216-223.428 133.98-26.65 10.016-53.957 18.253-81.713 24.563-53.585 12.192-112.798 11.283-167.56 3.333-40.151-5.828-76.246-31.44-93.264-68.707-29.544-64.698-8.98-144.595 6.295-210.45 18.712-80.625 46.8-157.388 75.493-234.619l2.18-5.867 1.092-2.934 2.182-5.87 2.182-5.873c33.254-89.517 67.436-178.676 101.727-267.797 31.294-81.296 62.72-162.537 93.69-243.95 2.364-6.216 5.004-12.389 7.669-18.558l1-2.313c6.835-15.806 13.631-31.617 16.176-48.092 6.109-39.537-22.406-74.738-61.985-51.947-68.42 39.4-119.656 97.992-170.437 156.944l-6.175 7.17c-15.78 18.323-31.582 36.607-47.908 54.286-16.089 17.43-35.243 39.04-62.907 19.07-29.521-21.308-20.765-48.637-3.987-71.785 93.18-128.58 205.056-248.86 350.86-316.783 60.932-28.386 146.113-57.285 225.882-58.233 59.802-.707 116.561 14.29 157.774 56.99Zm92.038-579.94c76.703 29.846 118.04 96.533 118.032 190.417-.008 169.189-182.758 284.908-335.53 212.455-78.956-37.446-117.358-126.202-98.219-227.002 26.494-139.598 183.78-227.203 315.717-175.87Z"></path></svg></a></div>`
                + `<div><a title="Edytuj" id="tkHxbToRJDFsHnu"><svg viewBox="0 0 512 512" height="14" width="14"><path d="M494.56,55.774l-38.344-38.328c-23.253-23.262-60.965-23.253-84.226,0l-35.878,35.878l122.563,122.563l35.886-35.878C517.814,116.747,517.814,79.044,494.56,55.774z"></path><polygon points="0,389.435 0,511.998 122.571,511.998 425.246,209.314 302.691,86.751"></polygon></svg></a></div>`
                + `<div><a title="Usuń" id="dDqbkhfWeyiaoZu"><svg viewBox="0 0 469.404 469.404" height="14" width="14"><path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path></svg></a></div>`
                +`</div></div>`;
        }
    }

    $('#RHJIQRivZsUcFkm').fadeIn(200);
};

function NWEuFXskeXpBGBa() { 
    $('#RHJIQRivZsUcFkm').fadeOut(200);
};

function FFkdMqNnTDbWkXb()
{
    let e = document.getElementById('aFoQOFiXPQobjPX');
    let e2 = e.options[e.selectedIndex].value;

    let select2 = $('#oUfnFiNPmXnNjzu').children();
    for (let i = 0; i < select2.length; i++)
    {
        if (e2 == select2[i].id || select2[i].value == 'everyone')
        {
            $(select2[i]).show();
        }
        else
        {
            $(select2[i]).hide();
        }
    }

    $('#oUfnFiNPmXnNjzu option').each(function ()
    {
        if ($(this).css('display') != 'none')
        {
            $(this).prop("selected", true);
            return false;
        }
    })

    //let GSYLLXKlArEDwFF = sessionStorage.getItem('GSYLLXKlArEDwFF');
    //if (GSYLLXKlArEDwFF == null)
    //{
    //    sessionStorage.setItem('GSYLLXKlArEDwFF', aFoQOFiXPQobjPX.options[aFoQOFiXPQobjPX.selectedIndex].value);
    //}
    //else
    //{
    //    console.log(sessionStorage.getItem('GSYLLXKlArEDwFF'));
    //}

    //sessionStorage.setItem('GSYLLXKlArEDwFF', e2);
    //let GSYLLXKlArEDwFF = sessionStorage.getItem('GSYLLXKlArEDwFF');
    //if (GSYLLXKlArEDwFF != null) {
    //    e.value = GSYLLXKlArEDwFF;
    //    console.log(GSYLLXKlArEDwFF);
    //}

    generateCalendar();
};
FFkdMqNnTDbWkXb();

function YDTyNWHkvmuAiCQ()
{
    generateCalendar();
};

function dWVTVhqEBjJCURf(t)
{
    sessionStorage.setItem('PgLKgYMAvonpLlF', t.value);
    
    $('#xBuYErAxrbdvwoP').children().show();
    generateCalendar();
};


$('#ttGSoqUHUjOErnf').on('click', function ()
{
    $('#KYZGriDIsqNJRxr').fadeOut(200);
});

$('#KhUYdWBbOzZAJwi').on('click', function ()
{
    $('#KYZGriDIsqNJRxr').fadeIn(200);
});

$('#UxjkajUgJngZOkw').on('click', function ()
{

});

$('#HvZxXypLRxeRXCo').on('change', function ()
{
    document.getElementById('dFiioMzmTCjjcWp').innerHTML = ``;

    for (let i = 0; i < model_l.length; i++)
    {
        if (model_l[i].Name == this.options[this.selectedIndex].text)
        {
            //if (model_l[i].Description != null)
            //{
            //    $('#dFiioMzmTCjjcWp').removeClass('fdjtgOVkxlRqfDM');
            //    document.getElementById('dFiioMzmTCjjcWp').innerHTML += `<option value="` + model_l[i].Id + `">` + model_l[i].Description + `</option>`;
            //}
            //else {
            //    $('#dFiioMzmTCjjcWp').addClass('fdjtgOVkxlRqfDM');
            //    //document.getElementById('dFiioMzmTCjjcWp').innerHTML = `<option></option>`;
            //}


            //document.getElementById('dFiioMzmTCjjcWp').innerHTML += `<option value="` + model_l[i].Id + `">` + model_l[i].Description + `</option>`;
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

    sortSelect(document.getElementById('dFiioMzmTCjjcWp'));

});

$('#HvZxXypLRxeRXCo').trigger('change');

$('#JTgCvImoJEyzGux').on('click', function ()
{
    var days = [];
    var toRemove = [];

    let oUfnFiNPmXnNjzu = document.getElementById('oUfnFiNPmXnNjzu');
    let workerID_ = oUfnFiNPmXnNjzu.options[oUfnFiNPmXnNjzu.selectedIndex].value;
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
                    location.reload();
                },
                error: function (xhr, status, error)
                {
                    console.log('Error adding column value:', error);
                }
            });
        }
    }
});

$('#iHCBwRzOLpgGYQG').on('change', function ()
{
    generateCalendar();
});


$(document).ready(function ()
{
    let PgLKgYMAvonpLlF = sessionStorage.getItem('PgLKgYMAvonpLlF');
    if (PgLKgYMAvonpLlF != null)
    {
        oUfnFiNPmXnNjzu.value = PgLKgYMAvonpLlF;
    }
    else
    {
        oUfnFiNPmXnNjzu.value = -1;
    }

    generateCalendar();

    
});

//window.onload = function () { 
//    generateCalendar();
//    //$('.loader_div').fadeOut(200);
//};
