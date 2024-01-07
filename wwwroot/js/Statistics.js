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

function getDayName(dateStr, locale)
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
        let dayName = getDayName(wholeDate, getLang() + '-' + getLang().toUpperCase());

        divs += `<div><span>${k}</span><span>${dayName}</span></div>`;
        //slupki += `<div class="kmrOEZkQcUWqaEc" id=` + wholeDate + `><div class="XxmPCNwZkVSMeOm"></div></div>`;
        slupki += `<div class="kmrOEZkQcUWqaEc" id=` + wholeDate + `></div>`;
    }

    $('#KjseMRiNyEJWtCR_').html(divs);
    $('#yTKpwuaIyVAZjYk_').html(slupki);








    //widok poziomy
    if ($('#relrPYFTLYqMaqt').prop('checked')) 
    {
        
    }

    //widok pionowy
    if ($('#qDXIOKGzpBOMvoB').prop('checked')) 
    {
        
    }
};
generateStatistics();

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

