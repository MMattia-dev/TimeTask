﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var ihJchOaMxWUD = document.querySelector('.left-nav');
var ZLD38GJQEtrB = document.querySelector('.IdRKPExyAQSewBL');
var ozozaNCrSaQI = document.querySelector('.user');
var ATKLsxSduWPahPh = document.querySelector('.ATKLsxSduWPahPh');

//if (performance.navigation.type == performance.navigation.TYPE_RELOAD)
//{
//    //console.info("This page is reloaded");
//} else
//{
//    //console.info("This page is not reloaded");
//    if (localStorage.getItem('logged') != null) {
//        if (ihJchOaMxWUD != null)
//        {
//            ihJchOaMxWUD.style.width = '0px';
//            ihJchOaMxWUD.style.maxWidth = '0px';
//            ihJchOaMxWUD.style.minWidth = '0px';
//        }
//        $(ZLD38GJQEtrB).hide();
//        $(ozozaNCrSaQI).hide();
//        $(ATKLsxSduWPahPh).hide();
        
//    }
//}

if (sessionStorage.getItem('DKE3PlNoUnmS') != null)
{
    let scoll = document.querySelector('.IdRKPExyAQSewBL');
    if (scoll != null) {
        scoll.scrollTop = sessionStorage.getItem('DKE3PlNoUnmS');
    }
}

if (sessionStorage.getItem('HzvDBbvTRQnGBub') != null) 
{
    let scoll = document.querySelector('.koblSjvDsfoQbAD');
    if (scoll != null) {
        scoll.scrollTop = sessionStorage.getItem('HzvDBbvTRQnGBub');
    }
}



/**/
var main = document.querySelector('.parent');
var loader = document.createElement('div');
loader.className = 'loader_div';
loader.id = '#loaderID';
var lds = document.createElement('div');
lds.className = 'lds-ring';
lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
loader.style.display = 'none';
loader.appendChild(lds);
main.appendChild(loader);
/**/



//wallpaper
var defaultWallpaper_ = localStorage.getItem('wallpaper');
if (defaultWallpaper_ != null)
{
    $('html').css({
        'background': 'url(' + defaultWallpaper_ + ')',
        'background-size': 'cover',
        'background-position': 'center'
    });
}
else {
    $('html').css({
        'background': 'url(/css/img/backgrounds/the-illustration-graphic-consists-of-abstract-background-with-a-blue-gradient-dynamic-shapes-composition-eps10-perfect-for-presentation-background-website-landing-page-wallpaper-vector.jpg) no-repeat fixed center',
        'background-size': 'cover',
        'background-position': 'center'
    });
    
}
//



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
    ////$('.right-nav').addClass('DCzdjhpRPQzOGHd');
    //ihJchOaMxWUD.style.transition = 'min-width 0.75s, max-width 0.75s, width 0.75s';
    ////$(loader).fadeIn();

    //let a = document.querySelector('.IdRKPExyAQSewBL');
    //let b = document.querySelector('.user');

    //$(a).fadeOut();
    //$(b).fadeOut();


    //let c = document.querySelector('.left-nav');
    //let inside_c = c.querySelectorAll('*');
    //for (let i = 0; i < inside_c.length; i++)
    //{
    //    $(inside_c[i]).fadeOut();
    //}
    //setTimeout(function ()
    //{
    //    c.style.width = '0px';
    //    c.style.maxWidth = '0px';
    //    c.style.minWidth = '0px';
    //}, 300);

    //let d = document.querySelector('.right-nav');
    ////d.style.borderTopLeftRadius = '10px'
    ////d.style.borderBottomLeftRadius = '10px'
    //let inside_d = d.querySelectorAll('*');
    //for (let i = 0; i < inside_d.length; i++) 
    //{
    //    $(inside_d[i]).fadeOut();
    //}

    //setTimeout(function ()
    //{
    //    $('#logOutClick').trigger('click');
    //}, 1200);

    $('.loader_div').fadeIn(200);
    setTimeout(function ()
    {
        $('#logOutClick').trigger('click');
    }, 1000);
};

function logIn() {
    localStorage.setItem('logged', 'true');
    $(loader).fadeIn();

    setTimeout(function ()
    {
        $('#logInClick').trigger('click');
    }, 1000);
    
};

//$(loader).show();

$(document).ready(function ()
{
    
    //$(loader).fadeOut();

    ////$('#account').fadeIn(300);
    let form = document.getElementsByTagName('form');
    $(form).fadeIn();

    ////if (window.performance)
    ////{
    ////    console.info("window.performance works fine on this browser");
    ////}
    ////https://stackoverflow.com/questions/5004978/check-if-page-gets-reloaded-or-refreshed-in-javascript

    //var rightNav = document.querySelector('.right-nav');

    //if (performance.navigation.type == performance.navigation.TYPE_RELOAD)
    //{
    //    //console.info("This page is reloaded");
    //} else
    //{
    //    //console.info("This page is not reloaded");
    //    if (localStorage.getItem('logged') != null) {
    //        if (ihJchOaMxWUD != null) {
    //            ihJchOaMxWUD.style.transition = 'min-width 0.75s, max-width 0.75s, width 0.75s';
    //            if (localStorage.getItem('IVsEIeXIRNQqrAG'))
    //            {
    //                //setTimeout(function ()
    //                //{
    //                //    ihJchOaMxWUD.style.width = '100px';
    //                //    ihJchOaMxWUD.style.maxWidth = '100px';
    //                //    ihJchOaMxWUD.style.minWidth = '100px';
    //                //}, 5000);
    //                ihJchOaMxWUD.style.width = '100px';
    //                ihJchOaMxWUD.style.maxWidth = '100px';
    //                ihJchOaMxWUD.style.minWidth = '100px';
    //            }
    //            else
    //            {
    //                //setTimeout(function ()
    //                //{
    //                //    ihJchOaMxWUD.style.width = '300px';
    //                //    ihJchOaMxWUD.style.maxWidth = '300px';
    //                //    ihJchOaMxWUD.style.minWidth = '300px';
    //                //}, 5000);
    //                    ihJchOaMxWUD.style.width = '300px';
    //                    ihJchOaMxWUD.style.maxWidth = '300px';
    //                    ihJchOaMxWUD.style.minWidth = '300px';
    //            }
    //        }
            
            
    //        setTimeout(function ()
    //        {
    //            $(ZLD38GJQEtrB).fadeIn();
    //            $(ozozaNCrSaQI).fadeIn();
    //            $(ATKLsxSduWPahPh).fadeIn();
    //            localStorage.removeItem('logged');
                
    //        }, 700); //5700
    //    }
        
    //}



    
    





    //var $round = $('.round'),
    //    roundRadius =
    //        $round.find('circle').attr('r'),
    //    roundPercent = $round.data('percent'),
    //    roundCircum = 2 * roundRadius * Math.PI,
    //    roundDraw = roundPercent * roundCircum / 100;
    //$round.css('stroke-dasharray', roundDraw + ' 999')




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

function kMCAxKgSATqh(id_, name_, surname_, dep_) {
    $.ajax({
        type: 'POST',
        url: '/Workers2/EditWorker',
        data: {
            id: id_,
            name: name_,
            surname: surname_,
            departmentID: dep_
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
            sessionStorage.removeItem('qbMvtjjezfxSFsv');
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
            sessionStorage.setItem('qbMvtjjezfxSFsv', response);
            //console.log(response);
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

function weekCount_Monday(year, month_number) //Weeks start on Monday
{

    // month_number is in the range 1..12

    var firstOfMonth = new Date(year, month_number - 1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + 6 + lastOfMonth.getDate();

    return Math.ceil(used / 7);
}

function weekCount_Sunday(year, month_number) //Weeks start on Sunday
{

    // month_number is in the range 1..12

    var firstOfMonth = new Date(year, month_number - 1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
}





function collapse() {
    $('.left-nav').addClass('THyXDYqsJcsKFtR');
    $('.settings_span').hide();
    $('.user').addClass('KoDNMyZmmmSkuFI');
    $('.userFirstA').addClass('settings_a');
    $('.userFirstA').addClass('sett_collapse');
    $('.logOut button').addClass('settings_a');
    $('.logOut button').addClass('sett_collapse');



    let settings_a = $('.settings_a');
    $(settings_a[0]).addClass('sett_first');
    for (let i = 0; i < settings_a.length; i++)
    {
        $(settings_a[i]).children().eq(1).hide();
        $(settings_a[i]).addClass('sett_collapse');

    }
};

function expand() {
    $('.left-nav').removeClass('THyXDYqsJcsKFtR');
    $('.settings_span').show();
    $('.user').removeClass('KoDNMyZmmmSkuFI');
    $('.userFirstA').removeClass('settings_a');
    $('.userFirstA').removeClass('sett_collapse');
    $('.logOut button').removeClass('settings_a');
    $('.logOut button').removeClass('sett_collapse');



    let settings_a = $('.settings_a');
    $(settings_a[0]).removeClass('sett_first');
    for (let i = 0; i < settings_a.length; i++)
    {
        $(settings_a[i]).children().eq(1).show();
        $(settings_a[i]).removeClass('sett_collapse');

    }
};

if (localStorage.getItem('IVsEIeXIRNQqrAG'))
{
    collapse();
    $($('#oKuDQuaWdDBDLIN_ input').parent()).addClass('aiOcyKSzNcNxolO');
    if (document.getElementById('oKuDQuaWdDBDLIN_input') != null) {
        document.getElementById('oKuDQuaWdDBDLIN_input').checked = true;
    }
}
else {
    expand();
    $($('#oKuDQuaWdDBDLIN_ input').parent()).removeClass('aiOcyKSzNcNxolO');
    if (document.getElementById('oKuDQuaWdDBDLIN_input') != null) {
        document.getElementById('oKuDQuaWdDBDLIN_input').checked = false;
    }
    
}

$('#oKuDQuaWdDBDLIN_ input').on('change', function (e)
{
    if (e.target.checked)
    {
        $($(e.target).parent()).addClass('aiOcyKSzNcNxolO');
        localStorage.setItem('IVsEIeXIRNQqrAG', '1');
        collapse();
    }
    else {
        $($(e.target).parent()).removeClass('aiOcyKSzNcNxolO');
        localStorage.removeItem('IVsEIeXIRNQqrAG');
        expand();
    }
});



function TBqDUdImvLXbXJU() 
{
    let settings_aS = document.querySelectorAll('.settings_a');
    for (let i = 0; i < settings_aS.length; i++) 
    {
        $(settings_aS[i]).children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');
    }
};

$('.left-nav').mouseenter(function ()
{
    $('.left-nav').css({ 'width': '265px', 'box-shadow': '12px 0px 16px -15px rgba(0, 0, 0, 1)',  });
    $('.settings_a span').css({ 'opacity': '1', 'margin-left': '20px', });
    $('.settings_a').css({ 'box-shadow': 'inset 0 -1px 0 rgba(255, 255, 255, 0.1)', });
    $('.IdRKPExyAQSewBL').css({ 'scrollbar-color': 'rgba(36, 110, 142, 0.7) transparent', 'scrollbar-width': 'thin' });
    
    $('.settings_a select').css({ 'opacity': '1', 'margin-left': '20px',  });
    
    setTimeout(function ()
    {
        $('.settings_a ion-icon').css({ 'opacity': '1', });
    }, 100);


    if (sessionStorage.getItem('LTRXohWjonyFAsg') != null) 
    {
        $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html(sessionStorage.getItem('LTRXohWjonyFAsg'));
    }
    if (sessionStorage.getItem('hQxHXfkxHkfALTJ') != null) 
    {
        $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html(sessionStorage.getItem('hQxHXfkxHkfALTJ'));
    }
    if (sessionStorage.getItem('JcvzYoovBpGECWh') != null) 
    {
        //$('#jxcqHOZgFmYHYkI_').children('.settings_a_select').children('span').eq(1).html(sessionStorage.getItem('JcvzYoovBpGECWh'));
        for (let i = 0; i < model_d.length; i++) {
            if (model_d[i].Id == sessionStorage.getItem('JcvzYoovBpGECWh')) {
                let depName = model_d[i].Name;
                $('#jxcqHOZgFmYHYkI_').children('.settings_a_select').children('span').eq(1).html(depName);
            }
        }
    }

});

$('.left-nav').mouseleave(function (e)
{
    //this.onmousedown = function () {
    //    e.preventDefault();
    //}
    $('.left-nav').removeAttr('style');
    $('.settings_a span').removeAttr('style');
    $('.settings_a').removeAttr('style');
    $('.IdRKPExyAQSewBL').removeAttr('style');

    $('.settings_a select').removeAttr('style');
    $('.settings_a ion-icon').removeAttr('style');

    TBqDUdImvLXbXJU();

    $('.ugiECcrnKwaoVsb').remove();
    $('.settings_a').removeClass('pAPTryUdWHeiZZa');
    //$('.YgYDRNgkzyxgztO:not(.pTBYGYxynGajyIy)').remove();
    //$('.YgYDRNgkzyxgztO').remove();
    $('.YgYDRNgkzyxgztO:not(.temp)').remove();

});







//let poi = `<video autoplay controls id="myVideo"><source src="" type="video/mp4"></video>`;
//$('.parent').append(poi);
//let poi2 = `<label style="position: absolute; top: 10px; left: 10px; z-index: 1;"><input type="checkbox" id="asdfgh" /></label>`;
//$('body').append(poi2);

//var video = document.getElementById("myVideo");
//video.currentTime = 500;

//video.pause();
//video.volume = 0.1;
//$(video).hide();

//$('#asdfgh').on('change', function ()
//{
//    if (this.checked)
//    {
//        video.play();
//        $('.right-nav').fadeOut();
//        $('.left-nav').fadeOut();

//        setTimeout(function ()
//        {
//            $('.parent').css({ 'position': 'relative', 'height': '80vh', 'width': '80vw', 'transition': 'width 0.2s, height 0.2s', });
//            $(video).fadeIn();
            
//        }, 400);
      
//    }
//    else {
//        $(video).fadeOut();

//        setTimeout(function ()
//        {
//            $('.parent').css({ 'position': '', 'height': '', 'width': '', 'transition': 'width 0.2s, height 0.2s', });
//            $('.right-nav').fadeIn();
//            $('.left-nav').fadeIn();
//            video.pause();
//        }, 400);
        

        
//    }
//});
