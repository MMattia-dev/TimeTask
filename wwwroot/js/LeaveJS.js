
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

    let oUfnFiNPmXnNjzu = document.getElementById('oUfnFiNPmXnNjzu');
    let workerID_ = oUfnFiNPmXnNjzu.options[oUfnFiNPmXnNjzu.selectedIndex].value;


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
    //for (let i = 0; i < dykKoaHBFtTPjlK.length; i++) 
    //{
    //    let date = dykKoaHBFtTPjlK[i].id;
    //    for (let j = 0; j < model_t.length; j++) 
    //    {
    //        //urlopy
    //        if (model_t[j].Enter == null && model_t[j].Exit == null && workerID_ == model_t[j].WorkerID) {
    //            if (model_t[j].LeaveDate.split('T')[0] == date) {
    //                //console.log(model_t[j].LeaveID);
    //                for (let k = 0; k < model_l.length; k++) {
    //                    if (model_l[k].Id == model_t[j].LeaveID) {
    //                        let name = model_l[k].Name;
    //                        let description = model_l[k].Description;
    //                        dykKoaHBFtTPjlK.innerHTML += `<div class="PXHhlPBPzXQFpVg">`
    //                            + ``
    //                        + `</div>`;
                            
    //                        console.log(model_l[k].Id);

    //                    }
    //                }
    //            }
    //        }
    //    }
    //}

    for (let i = 0; i < dykKoaHBFtTPjlK.length; i++) {
        //workerID_
        let date = dykKoaHBFtTPjlK[i].id;
        for (let j = 0; j < model_t.length; j++) {
            if (model_t[j].WorkerID == workerID_ && model_t[j].Enter == null && model_t[j].Exit == null) {
                if (model_t[j].LeaveDate.split('T')[0] == date) {
                    //console.log(date);
                }
            }
        }
    }
    //console.log(workerID_);




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
    generateCalendar();
};


$('#ttGSoqUHUjOErnf').on('click', function ()
{
    $('#KYZGriDIsqNJRxr').fadeOut(200);
});

$('.pyyxmssXgPCWuUc').on('click', function ()
{
    $('#KYZGriDIsqNJRxr').fadeIn(200);
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
                        //console.log('bez weekendu');
                        if (isWeekend(day)) 
                        {
                            toRemove.push(day);
                        }
                    }

                    if (!model_l[j].IfHolidays)
                    {
                        //console.log('bez świąt');
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

    //console.log(days);
    //console.log(toRemove);

    var leaveDays = days.filter(function (e, index)
    {
        return (!toRemove.some(d => +d === +e));
    });

    //console.log(leaveDays);

    for (let i = 0; i < leaveDays.length; i++)
    {
        //let date = new Date(leaveDays[i]);
        //console.log(date);
        let date = leaveDays[i].toISOString().split('T')[0];

        $.ajax({
            type: 'POST',
            url: '/Times/AddLeave',
            async: false,
            data: {
                workerID: workerID_,
                enter: null,
                exit: null,
                leaveID: leaveID_,
                leaveDate: date
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


});

$('#iHCBwRzOLpgGYQG').on('change', function ()
{
    generateCalendar();
});

generateCalendar();