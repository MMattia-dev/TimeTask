
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

        }
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

$(document).ready(function ()
{
    generateCalendar();
});