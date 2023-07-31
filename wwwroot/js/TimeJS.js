
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
    let oUfnFiNPmXnNjzu = document.getElementById('QcLYVFuvuONgCrh');
    let workerID_ = oUfnFiNPmXnNjzu.options[oUfnFiNPmXnNjzu.selectedIndex].value;
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

        //<svg viewBox="0 0 24 24" height="22" width="22">
        //    <path fill="none" d="M0 0h24v24H0z"></path>
        //    <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"></path>
        //</svg>
        if (!$(spans[i]).hasClass('prev-date2') && !$(spans[i]).hasClass('next-date2')) 
        {
            spans[i].innerHTML += `<svg viewBox="0 0 24 24" height="22" width="22">`
                + `<path fill="none" d="M0 0h24v24H0z"></path>`
                + `<path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm2 "></path>`
                + `</svg>`;
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
    if ($(svg).hasClass('jxiQgKjvVwKXqik'))
    {
        $(svg).remove();
        t.innerHTML += '<svg viewBox="0 0 24 24" height="22" width="22"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm2 "></path></svg>';
        $(t).removeClass('fNFlwKQaZMgErcF');
    }
    else {
        $(svg).remove();
        t.innerHTML += '<svg class="jxiQgKjvVwKXqik" viewBox="0 0 24 24" height="22" width="22"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"></path></svg>';
        $(t).addClass('fNFlwKQaZMgErcF');
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
    //$('#GMyOrJWVImvTfZX').fadeIn(200);
});

$(document).ready(function ()
{
    generateCalendar();
});