// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var ihJchOaMxWUD = document.querySelector('.left-nav');
var ZLD38GJQEtrB = document.querySelector('.IdRKPExyAQSewBL');
var ozozaNCrSaQI = document.querySelector('.user');

if (performance.navigation.type == performance.navigation.TYPE_RELOAD)
{
    //console.info("This page is reloaded");
} else
{
    //console.info("This page is not reloaded");
    if (localStorage.getItem('logged') != null) {
        if (ihJchOaMxWUD != null)
        {
            ihJchOaMxWUD.style.width = '0px';
            ihJchOaMxWUD.style.maxWidth = '0px';
            ihJchOaMxWUD.style.minWidth = '0px';
        }
        $(ZLD38GJQEtrB).hide();
        $(ozozaNCrSaQI).hide();
        
    }
}

if (sessionStorage.getItem('DKE3PlNoUnmS') != null)
{
    let scoll = document.querySelector('.IdRKPExyAQSewBL');
    if (scoll != null) {
        scoll.scrollTop = sessionStorage.getItem('DKE3PlNoUnmS');
    }
}

if (sessionStorage.getItem('HzvDBbvTRQnGBub') != null) {
    let scoll = document.querySelector('.koblSjvDsfoQbAD');
    if (scoll != null) {
        scoll.scrollTop = sessionStorage.getItem('HzvDBbvTRQnGBub');
    }
}




/**/
var main = document.querySelector('.parent');
var loader = document.createElement('div');
loader.className = 'loader';
loader.id = '#loaderID';
var lds = document.createElement('div');
lds.className = 'lds-ring';
lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
loader.style.display = 'none';
loader.appendChild(lds);
main.appendChild(loader);
/**/


function sortArray(array) {
    array.sort(function (a, b)
    {
        if (a.Name < b.Name)
        {
            return -1;
        }
        if (a.Name > b.Name)
        {
            return 1;
        }
        return 0;
    });
};

function logOut() {
    ihJchOaMxWUD.style.transition = 'min-width 0.75s, max-width 0.75s, width 0.75s';
    //$(loader).fadeIn();

    let a = document.querySelector('.IdRKPExyAQSewBL');
    let b = document.querySelector('.user');
    $(a).fadeOut();
    $(b).fadeOut();


    let c = document.querySelector('.left-nav');
    let inside_c = c.querySelectorAll('*');
    for (let i = 0; i < inside_c.length; i++)
    {
        $(inside_c[i]).fadeOut();
    }
    setTimeout(function ()
    {
        c.style.width = '0px';
        c.style.maxWidth = '0px';
        c.style.minWidth = '0px';
    }, 300);

    let d = document.querySelector('.right-nav');
    d.style.borderTopLeftRadius = '10px'
    d.style.borderBottomLeftRadius = '10px'
    let inside_d = d.querySelectorAll('*');
    for (let i = 0; i < inside_d.length; i++) 
    {
        $(inside_d[i]).fadeOut();
    }

    setTimeout(function ()
    {
        $('#logOutClick').trigger('click');
    }, 1200);
};

function logIn() {
    localStorage.setItem('logged', 'true');
    $(loader).fadeIn();
    $('#logInClick').trigger('click');
};


$(document).ready(function ()
{
    //$(loader).fadeOut();

    //$('#account').fadeIn(300);
    let form = document.getElementsByTagName('form');
    $(form).fadeIn();

    //if (window.performance)
    //{
    //    console.info("window.performance works fine on this browser");
    //}
    //https://stackoverflow.com/questions/5004978/check-if-page-gets-reloaded-or-refreshed-in-javascript

    

    if (performance.navigation.type == performance.navigation.TYPE_RELOAD)
    {
        //console.info("This page is reloaded");
    } else
    {
        //console.info("This page is not reloaded");
        
        if (localStorage.getItem('logged') != null) {
            ihJchOaMxWUD.style.transition = 'min-width 0.75s, max-width 0.75s, width 0.75s';
            setTimeout(function ()
            {
                ihJchOaMxWUD.style.width = '300px';
                ihJchOaMxWUD.style.maxWidth = '300px';
                ihJchOaMxWUD.style.minWidth = '300px';
            }, 5000);
            setTimeout(function ()
            {
                $(ZLD38GJQEtrB).fadeIn();
                $(ozozaNCrSaQI).fadeIn();
                localStorage.removeItem('logged');
            }, 5700);
        }
        
    }



    


});

function DKE3PlNoUnmS(t) {
    sessionStorage.setItem('DKE3PlNoUnmS', t.scrollTop);
};

function HzvDBbvTRQnGBub(t) {
    sessionStorage.setItem('HzvDBbvTRQnGBub', t.scrollTop);
};

function filterWorkersInDepartment(a, b, c)
{
    for (let i = 0; i < a.length; i++)
    {
        let d2ID = a[i].getAttribute('d2ID');
        for (let j = 0; j < c.length; j++)
        {
            if (c[j].checked)
            {
                let id_ = c[j].id;
                if (d2ID == id_)
                {
                    let span = a[i].querySelectorAll('div span');

                    for (let k = 0; k < span.length; k++)
                    {
                        let txtValue = span[k].textContent || span[k].innerText;
                        if (txtValue.toUpperCase().indexOf(b) > -1)
                        {
                            a[i].style.display = 'flex';
                        }
                        else
                        {
                            a[i].style.display = 'none';

                        }
                    }
                }
            }
        }
    }
};

function blKTigJUXVdB(id_) {
    $.ajax({
        type: 'POST',
        url: '/Workers2/DeleteWorker',
        data: {
            id: id_
        },
        success: function (response)
        {
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error removing row:', error);
        }
    });
};

function kMCAxKgSATqh(id_, name_, surname_) {
    $.ajax({
        type: 'POST',
        url: '/Workers2/EditWorker',
        data: {
            id: id_,
            name: name_,
            surname: surname_
        },
        success: function (response)
        {
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function ertVmpwgdwWK(id_) {
    $.ajax({
        type: 'POST',
        url: '/Departments/RemoveDepartment',
        data: {
            id: id_
        },
        success: function (response)
        {
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error removing row:', error);
        }
    });
};

function VYhhVLCczCoE(id_, name_) {
    $.ajax({
        type: 'POST',
        url: '/Departments/EditDepartment',
        data: {
            id: id_,
            name: name_
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
};

function opvqVIGDmNiz(name_) {
    $.ajax({
        type: 'POST',
        url: '/Departments/AddNewDepartment',
        data: {
            name: name_,
        },
        success: function (response)
        {
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function KOxtvRcBmzeo(name_, surname_, dep_id_, employed_) {
    $.ajax({
        type: 'POST',
        url: '/Workers2/AddNewWorker',
        data: {
            name: name_,
            surname: surname_,
            departmentID: dep_id_,
            employed: employed_
        },
        success: function (response)
        {
            location.reload();
        },
        Error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function CiSEfkVgdGdf(worker_id, newDepartment) {
    $.ajax({
        type: 'POST',
        url: '/Workers2/ChangeWorkerDepartment',
        data: {
            id: worker_id,
            departmentID: newDepartment
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
};

if (typeof arKOctcZVJhWuhL === 'function')
{
    arKOctcZVJhWuhL();
    //setTimeout(function () { 
    //    arKOctcZVJhWuhL();
    //}, 1000)
}

//if (typeof drmZhscxvPoxiya === 'function')
//{
//    setTimeout(function ()
//    {
//        drmZhscxvPoxiya();
//    }, 1000);
    
//}

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
};

function padTo2Digits(num)
{
    return String(num).padStart(2, '0');
}

function sortSelect(selElem)
{
    var tmpAry = new Array();
    for (var i = 0; i < selElem.options.length; i++)
    {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0)
    {
        selElem.options[0] = null;
    }
    for (var i = 0; i < tmpAry.length; i++)
    {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    return;
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

function isWeekend(date = new Date())
{
    return date.getDay() === 6 || date.getDay() === 0;
}

function removeA(arr)
{
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length)
    {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1)
        {
            arr.splice(ax, 1);
        }
    }
    return arr;
}



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

    for (let i = 0; i < model_l.length; i++) {
        if (model_l[i].Name == this.options[this.selectedIndex].text) {
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
            else {
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
                if (model_l[j].Id == leaveID_) {

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