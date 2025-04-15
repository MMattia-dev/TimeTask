// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
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
loader.id = 'loaderID';
var lds = document.createElement('div');
lds.className = 'lds-ring';
lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
loader.style.display = 'none';
loader.appendChild(lds);
main.appendChild(loader);
/**/

function createLoader() 
{
    var loader = document.createElement('div');
    loader.className = 'loader_div ThGRLdncUmRCRpk';
    //loader.classList.add
    loader.id = 'loaderID_';
    var lds = document.createElement('div');
    lds.className = 'lds-ring';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    loader.appendChild(lds);

    return loader;
};

function createLoader2() 
{
    var loader = document.createElement('div');
    loader.className = 'loader_div chat';
    var lds = document.createElement('div');
    lds.className = 'lds-ring';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    loader.appendChild(lds);

    return loader;
}

function createSmallLoader2() 
{
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;

    return lds;
};

function createSmallLoader3() 
{
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small2';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;

    return lds;
};

function createSmallLoader_center() 
{
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.style.cssText = 'position: absolute; top: calc(50% - 13px); left: calc(50% - 13px); z-index: 50;';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;

    return lds;
};


//wallpaper
var defaultWallpaper_ = localStorage.getItem('wallpaper');
if (defaultWallpaper_ != null)
{
    //$('html').css({
    //    'background': 'url(' + defaultWallpaper_ + ')',
    //    'background-size': 'cover',
    //    'background-position': 'center'
    //});
    if (defaultWallpaper_.indexOf("jpg") >= 0 || defaultWallpaper_.indexOf("jpeg") >= 0 || defaultWallpaper_.indexOf("gif") >= 0 || defaultWallpaper_.indexOf("png") >= 0)
    {
        $('html').css({
            'background': 'url(' + defaultWallpaper_ + ')',
            'background-size': 'cover',
            'background-position': 'center'
        });
    }
    else 
    {
        $('body').append('<video autoplay loop muted id="myVideo"><source src="' + defaultWallpaper_ + '" type="video/mp4"></video>');
    }
}
else {
    $('html').css({
        'background': 'url(/css/img/backgrounds/the-illustration-graphic-consists-of-abstract-background-with-a-blue-gradient-dynamic-shapes-composition-eps10-perfect-for-presentation-background-website-landing-page-wallpaper-vector.jpg) no-repeat fixed center',
        'background-size': 'cover',
        'background-position': 'center'
    });
    
}
//

function sortArrayDefault(array)
{
    array.sort(function (a, b)
    {
        if (a.Id < b.Id)
        {
            return -1;
        }
        if (a.Id > b.Id)
        {
            return 1;
        }
        return 0;
    });
};

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

function sortArraySurname(array) {
    array.sort(function (a, b)
    {
        if (a.Surname < b.Surname)
        {
            return -1;
        }
        if (a.Surname > b.Surname)
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
function logIn() 
{
    if ($('#userid').val().length > 0 && $('#passid').val().length > 0)
    {
        //if text-danger is visible
        //change language of text-danger



        localStorage.setItem('logged', 'true');
        $(loader).fadeIn();

        setTimeout(function ()
        {
            $('#logInClick').trigger('click');
        }, 1000);
    }
    else 
    {
        $('#logInClick').trigger('click');

    }
};

//$(loader).show();

$(document).ready(function ()
{
    //let form = document.getElementsByTagName('form');
    //$(form).fadeIn();

    
    
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

//if (typeof arKOctcZVJhWuhL === 'function')
//{
//    arKOctcZVJhWuhL();
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
        $(settings_aS[i]).children('.settings_a_select:not(.DttiWwFOUZxPakg)').children('ion-icon').attr('name', 'chevron-down-outline');
    }
};

$('.left-nav').mouseenter(function ()
{
    $('.left-nav').css({ 'width': '265px', 'box-shadow': '12px 0px 16px -15px rgba(0, 0, 0, 1)',  });
    $('.settings_a span:not("#OcoYTyiBrpZJStB")').css({ 'opacity': '1', 'margin-left': '20px', });
    //$('.settings_a').css({ 'box-shadow': 'inset 0 -1px 0 rgba(255, 255, 255, 0.1)', });
    $('.settings_a').css({ 'box-shadow': '0 1px 0 rgba(255, 255, 255, 0.1)', });
    $('.IdRKPExyAQSewBL').css({ 'scrollbar-color': 'rgba(36, 110, 142, 0.7) transparent', 'scrollbar-width': 'thin' });
    
    $('.settings_a select').css({ 'opacity': '1', 'margin-left': '20px',  });
    
    setTimeout(function ()
    {
        $('.settings_a ion-icon:not(#duEuqxyMmcYupCe)').css({ 'opacity': '1', });
    }, 100);


    //task
    $.ajax({
        type: 'GET',
        url: '/Tasks/ClickOnDepartment',
        data: {
            //tydzien
            savedYear: sessionStorage.getItem('LTRXohWjonyFAsg'),
            savedWeek: sessionStorage.getItem('hQxHXfkxHkfALTJ'),
            departmentID: sessionStorage.getItem('JcvzYoovBpGECWh'),
            //miesiac
            savedMonth: sessionStorage.getItem('XmRbNRjSsnfRbUN') //miesiąc
        },
        success: function (response)
        {
            if (response.weekView == true)
            {
                //tydzień
                $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html(response.year);
                $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html(response.week);
                $('#jxcqHOZgFmYHYkI_').children('.settings_a_select').children('span').eq(1).html(response.departmentName);
            }
            else 
            {
                //miesiąc
                $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html(response.year);
                $('#eAtzZqRcgNRQSze_').children('.settings_a_select').children('span').eq(1).html(response.monthName);
                $('#jxcqHOZgFmYHYkI_').children('.settings_a_select').children('span').eq(1).html(response.departmentName);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });

    howManyTasks_(sessionStorage.getItem('JcvzYoovBpGECWh'));
    //

    //leave
    if (sessionStorage.getItem('wSIspPdnliPlpLI') != null) //year
    {
        $('#qQgDgqyovQyICUL_').children('.settings_a_select').children('span').eq(1).html(sessionStorage.getItem('wSIspPdnliPlpLI'));
    }
    if (sessionStorage.getItem('gaukHwbLvIchVtA') != null) //department
    {
        if (model_d.length > 0)
        {
            for (let i = 0; i < model_d.length; i++) 
            {
                if (model_d[i].Id == sessionStorage.getItem('gaukHwbLvIchVtA')) 
                {
                    let depName = model_d[i].Name;
                    $('#dOryXMJCOpmMFDw_').children('.settings_a_select').children('span').eq(1).html(depName);
                }
            }
        }
    }
    if (sessionStorage.getItem('ZDCmGEJAljtfCfz') != null) //worker
    {
        if (model_w.length > 0) 
        {
            for (let i = 0; i < model_w.length; i++) 
            {
                if (model_w[i].Id == sessionStorage.getItem('ZDCmGEJAljtfCfz')) 
                {
                    let name = model_w[i].Surname + ' ' + model_w[i].Name;
                    $('#nrKYNmWitBwDNUj_').children('.settings_a_select').children('span').eq(1).html(name);
                }
            }
        } 
    }
    //

    //czas pracy
    if (sessionStorage.getItem('ltIMHwozjAXPzgH') != null) //year
    {
        $('#EsxQyzwBUpoksbV_').children('.settings_a_select').children('span').eq(1).html(sessionStorage.getItem('ltIMHwozjAXPzgH'));
    }
    if (sessionStorage.getItem('KQZDntYVEGZzaMS') != null) //department
    {
        if (model_d.length > 0) 
        {
            for (let i = 0; i < model_d.length; i++) 
            {
                if (model_d[i].Id == sessionStorage.getItem('KQZDntYVEGZzaMS')) 
                {
                    let depName = model_d[i].Name;
                    $('#snPNNsTxyDALgPl_').children('.settings_a_select').children('span').eq(1).html(depName);
                }
            }
        }
    }
    if (sessionStorage.getItem('VtlTCzUbauSQVpL') != null) //worker
    {
        if (model_w.length > 0) 
        {
            for (let i = 0; i < model_w.length; i++) 
            {
                if (model_w[i].Id == sessionStorage.getItem('VtlTCzUbauSQVpL')) 
                {
                    let name = model_w[i].Surname + ' ' + model_w[i].Name;
                    $('#nsEscimCsIoAKPp_').children('.settings_a_select').children('span').eq(1).html(name);
                }
            }
        }
    }

    //

});

$('.left-nav').mouseleave(function (e)
{
    //this.onmousedown = function () {
    //    e.preventDefault();
    //}
    $('.left-nav').removeAttr('style');
    $('.settings_a span:not("#OcoYTyiBrpZJStB")').removeAttr('style');
    //$('.settings_a .EQCwcxEkFOGSEpo').removeAttr('style');
    //$('.lNhHgAvbrNdaAip').removeAttr('style');
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
    $('#KhUYdWBbOzZAJwi').remove();
    $('ion-icon').removeClass('nHCgJALAMsLYOCi');
});

$(document).on('keydown', function (e)
{
    if ($('body').find('.pGKcZvErUB').length > 0) 
    {
        if (e.key === "Escape")
        {
            $('.pGKcZvErUB').remove();
        }

        if (e.key === "Enter")
        {
            //$('.btn-custom').trigger('click');
            return false;
        }
    }

});

function howManyTasks_(departmentID) 
{
    $.ajax({
        type: 'GET',
        url: '/Tasks/HowManyTasks',
        data: {
            department: departmentID
        },
        success: function (response)
        {
            if (response == 0)
            {
                $('#ekzMacYlAMvOgoy_').children('.settings_a_select').children('span').eq(1).html('Brak zadań');
                $('#ekzMacYlAMvOgoy_').children('ion-icon').eq(0).attr('name', 'file-tray-outline');
                $('#ekzMacYlAMvOgoy_').addClass('HJfwfKTcBSSFmBp');
                $('#uMVdMfTVrITLlKW').hide();
            }
            else
            {
                $('#ekzMacYlAMvOgoy_').children('.settings_a_select').children('span').eq(1).html('Wybierz zadanie');
                $('#ekzMacYlAMvOgoy_').children('ion-icon').eq(0).attr('name', 'file-tray-full-outline');
                $('#ekzMacYlAMvOgoy_').removeClass('HJfwfKTcBSSFmBp');
                $('#uMVdMfTVrITLlKW').show();
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

//do usunięcia później
function lhkKNaastOkkmMh(t)
{
    if (!$(t).hasClass('pAPTryUdWHeiZZa')) 
    {
        $(t).children('div').children('ion-icon').addClass('nHCgJALAMsLYOCi');
    }
    else
    {
        $(t).children('div').children('ion-icon').removeClass('nHCgJALAMsLYOCi');
    }
};


//let source = "";
//let poi = `<video autoplay loop id="myVideo"><source src="` + source + `" type="video/mp4"></video>`;
////$('body').append(poi);
//$('.parent').append(poi);
////let poi2 = `<label style="position: absolute; top: 10px; left: 10px; z-index: 1;"><input type="checkbox" id="asdfgh" /></label>`;
////$('body').append(poi2);

//var video = document.getElementById("myVideo");
//$(window).on("beforeunload", function ()
//{
//    var vid = document.getElementById("myVideo");
//    var currentTime = vid.currentTime;
//    localStorage.setItem('video_', currentTime);
//    return;
//});
//if (localStorage.getItem('video_') != null)
//{
//    var vid = document.getElementById("myVideo");
//    vid.currentTime = localStorage.getItem('video_');
//}
//else {
//    video.currentTime = 1485;
//}

//video.playbackRate = 1.0;
//video.volume = 0.2;

////$('#asdfgh').on('change', function ()
////{
////    if (this.checked)
////    {
////        //$('.right-nav').fadeOut();
////        //$('.left-nav').fadeOut();

////        setTimeout(function ()
////        {
////            //$('.parent').css({ 'position': 'relative', 'height': '80vh', 'width': '80vw', 'transition': 'width 0.2s, height 0.2s', });
////            //$('.parent').fadeOut();
////            $(video).fadeIn();
////            video.play();
            
////        }, 400);
////    }
////    else {
////        $(video).fadeOut();

////        setTimeout(function ()
////        {
////            //$('.parent').css({ 'position': '', 'height': '', 'width': '', 'transition': 'width 0.2s, height 0.2s', });
////            //$('.parent').fadeIn();
////            //$('.right-nav').fadeIn();
////            //$('.left-nav').fadeIn();
////            video.pause();
////            //video.volume = 0;
////        }, 400);
////    }
////});

