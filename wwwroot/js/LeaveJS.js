
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
generateCalendar();


function FFkdMqNnTDbWkXb()
{
    let e = document.getElementById('aFoQOFiXPQobjPX');
    let e2 = e.options[e.selectedIndex].value;

    ////sessionStorage.setItem('iJZfSckTVemIXEE', e.selectedIndex);
    //sessionStorage.setItem('iJZfSckTVemIXEE', e2);

    let select2 = $('#oUfnFiNPmXnNjzu').children();
    for (let i = 0; i < select2.length; i++)
    {
        //document.getElementById('oUfnFiNPmXnNjzu').selectedIndex = -1;
        if (e2 == select2[i].id)
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

    //$('#xBuYErAxrbdvwoP').children().hide();
};
FFkdMqNnTDbWkXb();

function YDTyNWHkvmuAiCQ()
{
    generateCalendar();
};

function dWVTVhqEBjJCURf()
{
    $('#xBuYErAxrbdvwoP').children().show();
};

//$(document).ready(function ()
//{
//    if (sessionStorage.getItem('iJZfSckTVemIXEE') != null)
//    {
//        //let e = document.getElementById('aFoQOFiXPQobjPX');
//        //let e2 = e.options[e.selectedIndex].value;
//        //document.getElementById('aFoQOFiXPQobjPX').selectedIndex = parseInt(sessionStorage.getItem('iJZfSckTVemIXEE'));
//        $('#aFoQOFiXPQobjPX option').each(function ()
//        {
//            //if ($(this).css('display') != 'none')
//            //{
//            //    $(this).prop("selected", true);
//            //    return false;
//            //}
//            if ($(this).val() == sessionStorage.getItem('iJZfSckTVemIXEE')) {
//                $(this).prop("selected", true);
//                return false;
//            }
//        })
//    }
//});