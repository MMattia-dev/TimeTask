$(document).ready(function ()
{
    setTimeout(function ()
    {
        let koblSjvDsfoQbAD = document.querySelector('.koblSjvDsfoQbAD');
        $(koblSjvDsfoQbAD).css({ 'opacity': '1' });
        let grZWUijDhGWKyHd = document.querySelector('.grZWUijDhGWKyHd');
        $(grZWUijDhGWKyHd).css({ 'opacity': '1' });
        let loader_div = document.querySelector('.loader_div');
        $(loader_div).fadeOut('fast');
    }, 500);
});

function loadOnLoad()
{
    //$.ajax({
    //    type: 'GET',
    //    url: '/Tasks/WeeksInYear',
    //    data: {
    //        savedYear: sessionStorage.getItem('LTRXohWjonyFAsg')
    //    },
    //    success: function (response)
    //    {
    //        //$('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html(parseInt(response) + 1);
    //        $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html(parseInt(response.getCurrentWeek) + 1);
    //    },
    //    error: function (xhr, status, error)
    //    {
    //        console.log('Error:', error);
    //    }
    //});





    //let date = new Date();

    //let year_ = $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html();
    ////if (sessionStorage.getItem('LTRXohWjonyFAsg') != null)
    ////{
    ////    year_ = sessionStorage.getItem('LTRXohWjonyFAsg');
    ////}
    //let month_ = date.getMonth() + 1;
    //let day_ = date.getDate();

    //$.ajax({
    //    type: 'GET',
    //    url: '/Tasks/WeeksInYear',
    //    data: {
    //        savedYear: sessionStorage.getItem('LTRXohWjonyFAsg') != null,
    //        year: year_,
    //        month: month_,
    //        day: day_
    //    },
    //    success: function (response)
    //    {
    //        if (sessionStorage.getItem('hQxHXfkxHkfALTJ') != null) 
    //        {
    //            $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html(sessionStorage.getItem('hQxHXfkxHkfALTJ'));
    //        }
    //        else {
    //            $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html(parseInt(response.currentWeek) + 1);
    //        }
    //    },
    //    error: function (xhr, status, error)
    //    {
    //        console.log('Error:', error);
    //    }
    //}).then(function ()
    //{
    //    //drmZhscxvPoxiya();

    //});


    drmZhscxvPoxiya(sessionStorage.getItem('LTRXohWjonyFAsg'), sessionStorage.getItem('hQxHXfkxHkfALTJ'), sessionStorage.getItem('JcvzYoovBpGECWh'));


};
loadOnLoad();

function task_lock_headers()
{
    $('.fSJtEaXwJSHzoxW').addClass('fSJtEaXwJSHzoxW_');
    $('.oKvcDSylPNSLgqr').addClass('oKvcDSylPNSLgqr_');
    $('.LwxRoYhfmyzTlGm').addClass('LwxRoYhfmyzTlGm_');
    $('.SBVWNWOJZnTplXL').addClass('SBVWNWOJZnTplXL_');
    $('.AQzCKqmlrQJmxzn').addClass('AQzCKqmlrQJmxzn_');
    sessionStorage.setItem('task_lock_headers', 'true');

    $('#lock1').hide();
    $('#lock2').show();
    document.getElementById('task_lock_headers_input').checked = true;
};

function task_unlock_headers()
{
    $('.fSJtEaXwJSHzoxW').removeClass('fSJtEaXwJSHzoxW_');
    $('.oKvcDSylPNSLgqr').removeClass('oKvcDSylPNSLgqr_');
    $('.LwxRoYhfmyzTlGm').removeClass('LwxRoYhfmyzTlGm_');
    $('.SBVWNWOJZnTplXL').removeClass('SBVWNWOJZnTplXL_');
    $('.AQzCKqmlrQJmxzn').removeClass('AQzCKqmlrQJmxzn_');
    sessionStorage.removeItem('task_lock_headers');

    $('#lock1').show();
    $('#lock2').hide();
    document.getElementById('task_lock_headers_input').checked = false;
};

function task_lock_headers_onchange(t)
{
    if ($('#' + t.id + ' input').prop('checked'))
    {
        task_lock_headers();
    }
    else
    {
        task_unlock_headers();
    }
};

//function getDayName(dateStr, locale)
//{
//    var date = new Date(dateStr);
//    return date.toLocaleDateString(locale, { weekday: 'long' });
//};

function drmZhscxvPoxiya(year, week, department)
{
    //console.log(year, week, department);
    $.ajax({
        type: 'GET',
        url: '/Tasks/CreateTable',
        data: {
            savedYear: year,
            savedWeek: week,
            savedDepartment: department
        },
        success: function (response)
        {
            $('.fSJtEaXwJSHzoxW').html(response.dates.content);
            $('.wcHMgjWjXaRMPKy').html();

            console.log(response);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });






    //let LwxRoYhfmyzTlGm = document.querySelectorAll('.LwxRoYhfmyzTlGm');
    //for (let j = 0; j < LwxRoYhfmyzTlGm.length; j++)
    //{
    //    LwxRoYhfmyzTlGm[j].getElementsByTagName('input')[0].value = '';
    //    LwxRoYhfmyzTlGm[j].getElementsByTagName('input')[1].value = '';
    //}

    //let year_ = $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html();
    //if (sessionStorage.getItem('LTRXohWjonyFAsg') != null)
    //{
    //    year_ = sessionStorage.getItem('LTRXohWjonyFAsg');
    //}

    //let week_ = $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html();
    //if (sessionStorage.getItem('hQxHXfkxHkfALTJ') != null) 
    //{
    //    week_ = sessionStorage.getItem('hQxHXfkxHkfALTJ');
    //}

    //let array = [];
    $.ajax({
        //type: 'GET',
        //url: '/Tasks/DatesInChosenWeek',
        //data: {
        //    year: year_,
        //    weekOfYear: week_
        //},
        //success: function (response)
        //{
        //    $('.fSJtEaXwJSHzoxW').html(response.contentResult.content);
        //    array = response.dates;

        //    if (sessionStorage.getItem('task_lock_headers') != null)
        //    {
        //        task_lock_headers();
        //    }
        //    else {
        //        task_unlock_headers();
        //    }

        //    sessionStorage.setItem('hQxHXfkxHkfALTJ', week_);
        //},
        //error: function (xhr2, status2, error2)
        //{
        //    console.log('Error getting data:', error2);
        //}
    }).then(function ()
    {
        //let wcHMgjWjXaRMPKy = document.querySelectorAll('.wcHMgjWjXaRMPKy');
        //for (let i = 0; i < wcHMgjWjXaRMPKy.length; i++)
        //{
        //    let SBVWNWOJZnTplXL = wcHMgjWjXaRMPKy[i].querySelectorAll('.SBVWNWOJZnTplXL');
        //    for (let j = 0; j < SBVWNWOJZnTplXL.length; j++)
        //    {
        //        SBVWNWOJZnTplXL[j].setAttribute('date', array[j]);
        //    }

        //    let AQzCKqmlrQJmxzn = wcHMgjWjXaRMPKy[i].querySelectorAll('.AQzCKqmlrQJmxzn');
        //    for (let j = 0; j < AQzCKqmlrQJmxzn.length; j++)
        //    {
        //        AQzCKqmlrQJmxzn[j].setAttribute('date', array[j]);
        //    }

        //    let LwxRoYhfmyzTlGm = wcHMgjWjXaRMPKy[i].querySelectorAll('.LwxRoYhfmyzTlGm');
        //    for (let j = 0; j < LwxRoYhfmyzTlGm.length; j++)
        //    {
        //        LwxRoYhfmyzTlGm[j].setAttribute('date', array[j]);
        //    }

        //    let kqOeanWDDXEYTBz = wcHMgjWjXaRMPKy[i].querySelectorAll('.kqOeanWDDXEYTBz');
        //    for (let j = 0; j < kqOeanWDDXEYTBz.length; j++)
        //    {
        //        kqOeanWDDXEYTBz[j].setAttribute('date', array[j]);
        //    }

        //    let avnythFRVEkXnim = wcHMgjWjXaRMPKy[i].querySelectorAll('.avnythFRVEkXnim');
        //    for (let j = 0; j < avnythFRVEkXnim.length; j++)
        //    {
        //        avnythFRVEkXnim[j].setAttribute('date', array[j]);
        //    }

        //    let lzfFwBKdGEtuYUv = wcHMgjWjXaRMPKy[i].querySelectorAll('.lzfFwBKdGEtuYUv');
        //    for (let j = 0; j < lzfFwBKdGEtuYUv.length; j++)
        //    {
        //        lzfFwBKdGEtuYUv[j].setAttribute('date', array[j]);
        //    }
        //}
    }
    ).then(function ()
    {
        //let AQzCKqmlrQJmxzn = document.querySelectorAll('.AQzCKqmlrQJmxzn');
        //for (let i = 0; i < AQzCKqmlrQJmxzn.length; i++)
        //{
        //    let ZslufbFdcfCIeaW = AQzCKqmlrQJmxzn[i].querySelectorAll('.ZslufbFdcfCIeaW');
        //    for (let j = 0; j < ZslufbFdcfCIeaW.length; j++)
        //    {
        //        if (AQzCKqmlrQJmxzn[i].getAttribute('date') == ZslufbFdcfCIeaW[j].id)
        //        {
        //            $(ZslufbFdcfCIeaW[j]).show();
        //        }
        //        else
        //        {
        //            $(ZslufbFdcfCIeaW[j]).hide();
        //        }
        //    }
        //}
    }
    ).then(function ()
    {
        //let LwxRoYhfmyzTlGm = document.querySelectorAll('.LwxRoYhfmyzTlGm');
        //for (let i = 0; i < model_t.length; i++)
        //{
        //    for (let j = 0; j < LwxRoYhfmyzTlGm.length; j++)
        //    {

        //        let jobStart = LwxRoYhfmyzTlGm[j].getElementsByTagName('input')[0];
        //        let jobEnd = LwxRoYhfmyzTlGm[j].getElementsByTagName('input')[1];

        //        if (LwxRoYhfmyzTlGm[j].getAttribute('worker') == model_t[i].WorkerID && LwxRoYhfmyzTlGm[j].getAttribute('date') == model_t[i].Date.split('T')[0])
        //        {
        //            let model_start = new Date(model_t[i].JobStart);
        //            let model_end = new Date(model_t[i].JobEnd);

        //            if (model_t[i].JobStart != null && model_t[i].JobEnd != null)
        //            {
        //                jobStart.value = padTo2Digits(model_start.getHours()) + ':' + padTo2Digits(model_start.getMinutes());
        //                jobEnd.value = padTo2Digits(model_end.getHours()) + ':' + padTo2Digits(model_end.getMinutes());
        //            }
        //        }
        //    }
        //}
    }
    ).then(function ()
    {
        //let SBVWNWOJZnTplXL = document.querySelectorAll('.SBVWNWOJZnTplXL');
        //for (let i = 0; i < SBVWNWOJZnTplXL.length; i++) 
        //{
        //    let MNewKOhqZkqNDeJ = $(SBVWNWOJZnTplXL[i]).children('.LwxRoYhfmyzTlGm').children('.MNewKOhqZkqNDeJ');
        //    let a1 = $(SBVWNWOJZnTplXL[i]).children('.LwxRoYhfmyzTlGm').children('input').eq(0).val();
        //    let a2 = $(SBVWNWOJZnTplXL[i]).children('.LwxRoYhfmyzTlGm').children('input').eq(1).val();
        //    let b = $(SBVWNWOJZnTplXL[i]).children('.AQzCKqmlrQJmxzn').children('.ZslufbFdcfCIeaW:visible').length;
        //    if (a1 == '' && a2 == '' && b == 0) 
        //    {
        //        $(MNewKOhqZkqNDeJ).hide();
        //    }
        //    else 
        //    {
        //        $(MNewKOhqZkqNDeJ).show();
        //    }
        //}
    }
    ).then(function () 
    { 
        //sessionStorage.setItem('hQxHXfkxHkfALTJ', week_);
    });
};

function arKOctcZVJhWuhL(id)
{


    //let workerID_array = [];

    //let e2 = id;
    
    //sessionStorage.setItem('qweznPAaXCMlTFi', e2);

    //let array = document.querySelectorAll('.YgYDRNgkzyxgztO');
    //for (let i = 0; i < array.length; i++)
    //{
    //    if (array[i].id == e2 || array[i].id == 0)
    //    {
    //        $(array[i]).show();
    //    }
    //    else
    //    {
    //        $(array[i]).hide();
    //    }
    //}

    //let wcHMgjWjXaRMPKy = document.querySelectorAll('.wcHMgjWjXaRMPKy');
    //for (let i = 0; i < wcHMgjWjXaRMPKy.length; i++)
    //{
    //    if (wcHMgjWjXaRMPKy[i].id == e2)
    //    {
    //        $(wcHMgjWjXaRMPKy[i]).show();
    //        workerID_array.push(wcHMgjWjXaRMPKy[i].getAttribute('worker'));
    //    }
    //    else
    //    {
    //        $(wcHMgjWjXaRMPKy[i]).hide();
    //    }
    //}

    //// get workers hours
    //let workerModelArray = [];
    //let chosenYear = $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html();
    //for (let i = 0; i < workerID_array.length; i++)
    //{
    //    let workerID = workerID_array[i];
    //    for (let j = 0; j < model_t.length; j++)
    //    {
    //        let dateModel = new Date(model_t[j].Date);

    //        if (model_t[j].WorkerID == workerID && chosenYear == dateModel.getFullYear())
    //        {
    //            let date1 = new Date(model_t[j].JobStart);
    //            let date2 = new Date(model_t[j].JobEnd);

    //            let hours1 = null;
    //            let hours2 = null;
    //            if (model_t[j].JobStart != null && model_t[j].JobEnd != null) {
    //                hours1 = padTo2Digits(date1.getHours()) + ':' + padTo2Digits(date1.getMinutes());
    //                hours2 = padTo2Digits(date2.getHours()) + ':' + padTo2Digits(date2.getMinutes());
    //                workerModelArray.push(hours1 + ' - ' + hours2);
    //            }
    //        }
    //    }
    //}
    //if (workerID_array.length == 0)
    //{
    //    $('.fSJtEaXwJSHzoxW').hide();
    //}
    //else
    //{
    //    $('.fSJtEaXwJSHzoxW').show();
    //}



    //let workerModelArrayNew = [...new Set(workerModelArray)];
    //workerModelArrayNew.sort();
    //let avnythFRVEkXnim = document.querySelectorAll('.avnythFRVEkXnim');
    //if (workerModelArrayNew.length > 0)
    //{
    //    for (let i = 0; i < avnythFRVEkXnim.length; i++)
    //    {
    //        avnythFRVEkXnim[i].innerHTML = '';

    //        for (let j = 0; j < workerModelArrayNew.length; j++)
    //        {
    //            avnythFRVEkXnim[i].innerHTML += `<div onclick="MnoxFPIpMwcHhAv(this)" class="fuSYzGrTpqVVQXz">` + workerModelArrayNew[j] + `</div>`;
    //        }
    //    }

    //    let LwxRoYhfmyzTlGm = document.querySelectorAll('.LwxRoYhfmyzTlGm');
    //    for (let i = 0; i < LwxRoYhfmyzTlGm.length; i++)
    //    {
    //        let kqOeanWDDXEYTBz = LwxRoYhfmyzTlGm[i].querySelector('.kqOeanWDDXEYTBz');
    //        $(kqOeanWDDXEYTBz).show();
    //    }
    //}
    //else
    //{
    //    let LwxRoYhfmyzTlGm = document.querySelectorAll('.LwxRoYhfmyzTlGm');
    //    for (let i = 0; i < LwxRoYhfmyzTlGm.length; i++)
    //    {
    //        let kqOeanWDDXEYTBz = LwxRoYhfmyzTlGm[i].querySelector('.kqOeanWDDXEYTBz');
    //        $(kqOeanWDDXEYTBz).hide();
    //    }
    //}
};

//function testtt()
//{
//    let EpPTURkmdIzOSnq = document.querySelectorAll('.EpPTURkmdIzOSnq');
//    for (let i = 0; i < EpPTURkmdIzOSnq.length; i++)
//    {
//        let id_ = EpPTURkmdIzOSnq[i].getAttribute('id2');
//        EpPTURkmdIzOSnq[i].addEventListener('mousedown', function ()
//        {
//            let user = document.querySelector('.user');
//            let YgYDRNgkzyxgztO = document.querySelectorAll('.YgYDRNgkzyxgztO');

//            for (let j = 0; j < YgYDRNgkzyxgztO.length; j++)
//            {
//                let id__ = YgYDRNgkzyxgztO[j].getAttribute('id2');
//                if (id_ == id__)
//                {
                    
//                    EpPTURkmdIzOSnq[i].style.cursor = 'grabbing';

//                    $(YgYDRNgkzyxgztO[j]).draggable({
//                        handle: EpPTURkmdIzOSnq[i],
//                        snap: '.AQzCKqmlrQJmxzn',
//                        snapMode: 'inner',
//                        appendTo: 'body',
//                        //scroll: false,
//                        helper: 'clone',
//                        start: function (event, ui)
//                        {
//                            //$(ui.helper).css('width', `${$(event.target).width()}px`);
//                            $(ui.helper).css({ 'width': '260px', 'transform': 'translateX(0px)', 'background-color': 'rgba(34, 36, 48, 1)' });
//                            $($(ui.helper).children('div').find('a')[0]).css('display', 'none');
//                            $($(ui.helper).children('div').find('a')[1]).css('display', 'none');
//                            $('.AQzCKqmlrQJmxzn').css({ 'background-color': 'rgba(255, 255, 255, 0.05)' });

//                            //

//                            $('.left-nav').addClass('HFhDvVpHKOUBBMS');
//                        }
//                    });

//                    $('.AQzCKqmlrQJmxzn').droppable({
//                        drop: function (event, ui)
//                        {
//                            //$(this).append($(ui.helper).clone());
//                            var item = ui.draggable;
//                            var newItem = item.clone();
//                            newItem.appendTo($(this))
//                                .draggable({
//                                    handle: $(this).not(".ui-resizable-handle"),
//                                    containment: $(".droppable")
//                                });
//                            newItem.resizable({
//                                ghost: false
//                            });

//                            $($(newItem).children('div').find('a')).remove();
//                            for (let x = 0; x < 3; x++)
//                            {
//                                $($(newItem).children('div')[1]).remove();
//                            }

//                            $(newItem).children('svg').remove();
//                            $(newItem).addClass('pTBYGYxynGajyIy');
//                            $(newItem).css('border-left', '4px solid rgb(36, 110, 142)');
//                            $(newItem).append(`<a onclick="fuhYEhklpyusggn(this)" title="Usuń zadanie"><svg viewBox="0 0 469.404 469.404" height="12" width="12"><path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path></svg></a>`);


//                            //wyłącz zmianę tygodnia
//                            document.getElementById('uKdvKAhOhYwppOO').classList.add('hkyYYlXJPLaqBDt');
//                            document.getElementById('JFUPeUjXoygHiiK').classList.add('hkyYYlXJPLaqBDt');
                            
//                            if ($(newItem).parent().parent().children().eq(0).children().eq(0).val() && $(newItem).parent().parent().children().eq(0).children().eq(2).val())
//                            {
//                                //włącz 'Zapisz zmiany' button
//                                document.getElementById('PeAfgVTiQsbFhjt').classList.remove('fNPXdDDFqqbVOkt');
//                            }
//                        },
//                        drag: function ()
//                        {
//                            var offset = $(this).offset();
//                            var xPos = offset.left;
//                            var yPos = offset.top;
//                        },
//                    });
//                }
//            }

//            document.addEventListener('mouseup', function ()
//            {
//                for (let j = 0; j < YgYDRNgkzyxgztO.length; j++)
//                {
//                    EpPTURkmdIzOSnq[i].style.removeProperty('cursor');
//                }
//                $('.AQzCKqmlrQJmxzn').css('background-color', '');
//                //
//                $('.left-nav').removeClass('HFhDvVpHKOUBBMS');
//                //
//            });
//        });
//    }
//};

//function dpxpJkwLFcKTpet()
//{
//    let LwxRoYhfmyzTlGm = document.querySelectorAll('.LwxRoYhfmyzTlGm');
//    let changesArray = [];
//    for (let z = 0; z < LwxRoYhfmyzTlGm.length; z++)
//    {
//        let d_ = LwxRoYhfmyzTlGm[z].getAttribute('date');
//        let w_ = LwxRoYhfmyzTlGm[z].getAttribute('worker');
//        let jStart_ = LwxRoYhfmyzTlGm[z].querySelectorAll('input')[0].value;
//        let jEnd_ = LwxRoYhfmyzTlGm[z].querySelectorAll('input')[1].value;

//        if (jStart_ != '' && jEnd_ != '')
//        {
//            for (let y = 0; y < model_t.length; y++)
//            {
//                let id_Model = model_t[y].Id;
//                let workerID_Model = model_t[y].WorkerID;
//                let date_Model = model_t[y].Date.split('T')[0];
//                let jobStart_Model = new Date(model_t[y].JobStart);
//                let jobEnd_Model = new Date(model_t[y].JobEnd);

//                let jobStart_Modelnew = padTo2Digits(jobStart_Model.getHours()) + ':' + padTo2Digits(jobStart_Model.getMinutes());
//                let jobEnd_Modelnew = padTo2Digits(jobEnd_Model.getHours()) + ':' + padTo2Digits(jobEnd_Model.getMinutes());


//                if (w_ == workerID_Model && d_ == date_Model && jStart_ != jobStart_Modelnew && jEnd_ != jobEnd_Modelnew)
//                {
//                    changesArray.push({ id: id_Model, jobStart: date_Model + ' ' + jStart_, jobEnd: date_Model + ' ' + jEnd_ });
//                }
//                else if (w_ == workerID_Model && d_ == date_Model && jStart_ == jobStart_Modelnew && jEnd_ != jobEnd_Modelnew)
//                {
//                    changesArray.push({ id: id_Model, jobStart: date_Model + ' ' + jStart_, jobEnd: date_Model + ' ' + jEnd_ });
//                }
//                else if (w_ == workerID_Model && d_ == date_Model && jStart_ != jobStart_Modelnew && jEnd_ == jobEnd_Modelnew)
//                {
//                    changesArray.push({ id: id_Model, jobStart: date_Model + ' ' + jStart_, jobEnd: date_Model + ' ' + jEnd_ });
//                }
//            }
//        }
//    }

//    if (changesArray.length > 0)
//    {
//        for (let z = 0; z < changesArray.length; z++)
//        {
//            let id_ = changesArray[z].id;
//            let jobStart_ = changesArray[z].jobStart;
//            let jobEnd_ = changesArray[z].jobEnd;

//            $.ajax({
//                type: 'POST',
//                url: '/Tasks/EditTask',
//                data: {
//                    id: id_,
//                    jobStart: jobStart_,
//                    jobEnd: jobEnd_
//                },
//                success: function (response)
//                {

//                },
//                error: function (xhr, status, error)
//                {
//                    console.log('Error updating data:', error);
//                }
//            });

//        }
//    }
//};

//function MAQLaRkPpbPPjIH() 
//{
//    let wcHMgjWjXaRMPKy = document.querySelectorAll('.wcHMgjWjXaRMPKy');
//    for (let i = 0; i < wcHMgjWjXaRMPKy.length; i++)
//    {
//        let workerID_ = wcHMgjWjXaRMPKy[i].getAttribute('worker');//

//        let SBVWNWOJZnTplXL = wcHMgjWjXaRMPKy[i].querySelectorAll('.SBVWNWOJZnTplXL');
//        for (let j = 0; j < SBVWNWOJZnTplXL.length; j++)
//        {
//            let date_ = SBVWNWOJZnTplXL[j].getAttribute('date');//
//            let jobStart_ = SBVWNWOJZnTplXL[j].querySelectorAll('.LwxRoYhfmyzTlGm input')[0].value;//
//            let jobEnd_ = SBVWNWOJZnTplXL[j].querySelectorAll('.LwxRoYhfmyzTlGm input')[1].value;//
//            let YgYDRNgkzyxgztO = SBVWNWOJZnTplXL[j].querySelectorAll('.AQzCKqmlrQJmxzn .pTBYGYxynGajyIy');

//            if (jobStart_ != '' && jobEnd_ != '')
//            {
//                for (let k = 0; k < YgYDRNgkzyxgztO.length; k++)
//                {
//                    if (YgYDRNgkzyxgztO[k].hasAttribute('pGXQuswWwoZGMWg'))
//                    {
//                        let taskNameID_ = YgYDRNgkzyxgztO[k].getAttribute('pGXQuswWwoZGMWg');
//                        if (taskNameID_ != null)
//                        {
//                            let dateJobStart = date_ + ' ' + jobStart_;
//                            let dateJobEnd = date_ + ' ' + jobEnd_;

//                            $.ajax({
//                                type: 'POST',
//                                url: '/Tasks/AddTasks',
//                                data: {
//                                    workerID: workerID_,
//                                    taskNameID: taskNameID_,
//                                    date: date_,
//                                    jobStart: dateJobStart,
//                                    jobEnd: dateJobEnd
//                                },
//                                success: function (response)
//                                {

//                                },
//                                error: function (xhr, status, error)
//                                {
//                                    console.log('Error adding data:', error);
//                                }
//                            });
//                        }
//                    }
//                }
//            }
//        }
//    }
//};

//function kLqdFLvjJrKETlK(t)
//{
//    $(t).children(':first').html('Zapisywanie');
//    var dots = window.setInterval(function ()
//    {
//        var wait = document.getElementById("jSxkTLkOwolIQOG");
//        if (wait.innerHTML.length > 4)
//            wait.innerHTML = "";
//        else
//            wait.innerHTML += ".";
//    }, 200);


//    $('.loader_div').fadeIn(200);


//    MAQLaRkPpbPPjIH();
//    dpxpJkwLFcKTpet();


//    setTimeout(function ()
//    {
//        location.reload();
//    }, 250);
//};

//function fuhYEhklpyusggn(t)
//{
//    $(t).parent().remove();
//};

//function VSalvFSAeCOdsNG(t)
//{
//    let w = t.getAttribute('worker');
//    let d = t.getAttribute('date');
//    t.innerHTML = '<svg viewBox="0 0 10 6" width="10" height="6"><path d="M0 0h10L5 6z"></path></svg>';
//    t.style.removeProperty('background-color');

//    let avnythFRVEkXnim = document.querySelectorAll('.avnythFRVEkXnim');
//    for (let i = 0; i < avnythFRVEkXnim.length; i++)
//    {
//        let w2 = avnythFRVEkXnim[i].getAttribute('worker');
//        let d2 = avnythFRVEkXnim[i].getAttribute('date');

//        if (w == w2 && d == d2)
//        {
//            $(avnythFRVEkXnim[i]).hide();
//            t.setAttribute('onclick', 'SnVgWOTEsLEUbKu(this)');
//        }
//    }
//};

//function MnoxFPIpMwcHhAv(t)
//{
//    if ($(t).parent().parent().parent().children().eq(1).children(':visible').length > 0)
//    {

//        //wyłącz zmianę tygodnia
//        document.getElementById('uKdvKAhOhYwppOO').classList.add('hkyYYlXJPLaqBDt');
//        document.getElementById('JFUPeUjXoygHiiK').classList.add('hkyYYlXJPLaqBDt');
//        //

//        //włącz 'Zapisz zmiany' button
//        document.getElementById('PeAfgVTiQsbFhjt').classList.remove('fNPXdDDFqqbVOkt');
//        //
//    }

//    let input1_ = t.innerHTML.split(' - ')[0];
//    let input2_ = t.innerHTML.split(' - ')[1];

//    let parentWorker = $(t).parent().attr("worker");
//    let parentDate = $(t).parent().attr("date");

//    let LwxRoYhfmyzTlGm = document.querySelectorAll('.LwxRoYhfmyzTlGm');
//    for (let i = 0; i < LwxRoYhfmyzTlGm.length; i++)
//    {
//        if (LwxRoYhfmyzTlGm[i].getAttribute('worker') == parentWorker && LwxRoYhfmyzTlGm[i].getAttribute('date') == parentDate)
//        {
//            let input1 = LwxRoYhfmyzTlGm[i].querySelectorAll('input')[0];
//            let input2 = LwxRoYhfmyzTlGm[i].querySelectorAll('input')[1];

//            input1.value = input1_;
//            input2.value = input2_;
//        }
//    }

//    $(t).parent().hide();
//    let kqOeanWDDXEYTBz = document.querySelectorAll('.kqOeanWDDXEYTBz');
//    for (let j = 0; j < kqOeanWDDXEYTBz.length; j++)
//    {
//        kqOeanWDDXEYTBz[j].innerHTML = '<svg viewBox="0 0 10 6" width="10" height="6"><path d="M0 0h10L5 6z"></path></svg>';
//        kqOeanWDDXEYTBz[j].setAttribute('onclick', 'SnVgWOTEsLEUbKu(this)');
//        kqOeanWDDXEYTBz[j].style.removeProperty('background-color');
//    }
//};



function szWBomtrGKAViBb(t, e)
{
    let LwxRoYhfmyzTlGm = $(t).children().eq(0);
    let AQzCKqmlrQJmxzn = $(t).children().eq(1);

    let input1 = $(LwxRoYhfmyzTlGm).children().eq(0).val(); //godzina od
    let input2 = $(LwxRoYhfmyzTlGm).children().eq(2).val(); //godzina do
    let date_ = t.getAttribute('date'); //data
    let workerID = $(t).parent().attr('worker');


    if (input1 != '' && input2 != '')
    {
        let AQzCKqmlrQJmxzn_children = $(AQzCKqmlrQJmxzn).children();
        for (let i = 0; i < AQzCKqmlrQJmxzn_children.length; i++)
        {
            if ($(AQzCKqmlrQJmxzn_children[i]).hasClass('YgYDRNgkzyxgztO'))
            {
                let asd = $(t).parent().children(':even').not(':first');

                for (let j = 0; j < asd.length; j++)
                {
                    if (asd[j].getAttribute('date') == t.getAttribute('date'))
                    {
                        //
                    }
                }
            }
        }
    }
};

//function collapse_everything(exception)
//{
//    let children = $('.IdRKPExyAQSewBL').children();
//    for (let i = 0; i < children.length; i++) 
//    {
//        if ($(children[i]).attr('id') != exception) 
//        {
//            if ($(children[i]).hasClass('ugiECcrnKwaoVsb') || $(children[i]).hasClass('YgYDRNgkzyxgztO')) 
//            {
//                //$(children[i]).remove();

//                ////$(children[i]).css({ "height": "42px", "opacity": "1" });

//                ////setTimeout(function(){
//                ////    $(children[i]).remove();
//                ////},200)

//            }
//            else 
//            {
//                //$(children[i]).hide();
//                $(children[i]).removeClass('pAPTryUdWHeiZZa');
//                $(children[i]).children('.settings_a_select').children('ion-icon').removeClass('nHCgJALAMsLYOCi');
                
//            }
//        }
//        else 
//        {
//            if ($(children[i]).hasClass('ugiECcrnKwaoVsb') || $(children[i]).hasClass('YgYDRNgkzyxgztO')) 
//            {
                
//            }
//            else 
//            {
                
//            }
//        }
//    }
//};

//function collapse_everything_continue(exception) 
//{
//    let children = $('.IdRKPExyAQSewBL').children();
//    for (let i = 0; i < children.length; i++) 
//    {
//        if ($(children[i]).hasClass('ugiECcrnKwaoVsb') || $(children[i]).hasClass('YgYDRNgkzyxgztO')) 
//        {
//            //$(children[i])
//            //    .css({ "height": "0", "opacity": "0" })
//            //    .stop().animate({
//            //        height: 42,
//            //        opacity: 1
//            //    }, 200);

//        }

//        if ($(children[i]).attr('id') != exception)
//        {
//            if ($(children[i]).hasClass('ugiECcrnKwaoVsb') || $(children[i]).hasClass('YgYDRNgkzyxgztO'))
//            {

//            }
//        }
//        else 
//        {
//            if ($(children[i]).hasClass('ugiECcrnKwaoVsb') || $(children[i]).hasClass('YgYDRNgkzyxgztO'))
//            {
                
//            }
//        }
//    }
//}

//function uncollapse_everything(exception) 
//{
//    let children = $('.IdRKPExyAQSewBL').children();
//    for (let i = 0; i < children.length; i++) 
//    {
//        if ($(children[i]).attr('id') != exception) 
//        {
//            if ($(children[i]).hasClass('ugiECcrnKwaoVsb') || $(children[i]).hasClass('YgYDRNgkzyxgztO')) 
//            {
//                //$(children[i])
//                //    .stop().animate({
//                //        height: 0,
//                //        opacity: 0
//                //    }, 200);
//            }
//            else 
//            {

//            }
//        }
//        else 
//        {

//        }
//    }
//};

function show_options(element, content) 
{
    let trueIDs = element.id + '_';

    let children = $('.IdRKPExyAQSewBL').children();
    for (let i = 0; i < children.length; i++) //wszystkie dzieci
    {
        if ($(children[i]).attr('id') == element.id) //znajdz dziecko ktore klikam
        {        
            if ($(children[i]).hasClass('pAPTryUdWHeiZZa'))
            {
                $(children[i]).children('.settings_a_select').children('ion-icon').addClass('nHCgJALAMsLYOCi');
                $(children[i]).after(content); //dodaj opcje pod spodem
                $(children[i]+'[id="' + trueIDs + '"]') //animacja
                    .css({ "height": "0", "opacity": "0" })
                    .stop().animate({
                        height: 42,
                        opacity: 1
                    }, 200);
            }
            else 
            {
                $(children[i]).children('.settings_a_select').children('ion-icon').removeClass('nHCgJALAMsLYOCi');
                $(children[i] + '[id="' + trueIDs + '"]') //animacja
                    .stop().animate({
                        height: 0,
                        opacity: 0
                    }, 200);

                setTimeout(function () 
                { 
                    $(children[i] + '[id="' + trueIDs + '"]').remove();
                },200)
            }
        }
        else //wszystkie pozostale dzieci 
        {
            if ($(children[i]).attr('id') == trueIDs) //opcje pod klikanym elementem
            {
                //
            }
            else //wszystkie pozostale elementy
            {
                if (children[i].id.slice(-2) == "__") 
                {
                    $(children[i]) //animacja
                        .stop().animate({
                            height: 0,
                            opacity: 0
                        }, 200);

                    setTimeout(function ()
                    {
                        $(children[i]).remove();
                    }, 200)

                    $('#' + children[i].id.slice(0, -1)).children('.settings_a_select').children('ion-icon').removeClass('nHCgJALAMsLYOCi');
                    $('#' + children[i].id.slice(0, -1)).removeClass('pAPTryUdWHeiZZa');
                }
            }
        }
    }
};

function MkoKdHskxQLfcuP_test(t) 
{
    if (sessionStorage.getItem('hQxHXfkxHkfALTJ') == null)
    {
        $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html()
    }

    $.ajax({
        type: 'GET',
        url: '/Tasks/Years',
        data: {
            savedYear: sessionStorage.getItem('LTRXohWjonyFAsg'),
            savedWeek: sessionStorage.getItem('hQxHXfkxHkfALTJ'),
            savedDepartment: sessionStorage.getItem('JcvzYoovBpGECWh')
        },
        success: function (response)
        {
            $(t).toggleClass("pAPTryUdWHeiZZa");
            show_options(t, response);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

//function MkoKdHskxQLfcuP(t)
//{
//    if (!$('#MkoKdHskxQLfcuP_').hasClass('pAPTryUdWHeiZZa')) 
//    {
//        //let html = '';
//        //let date = new Date();
//        //let prevYears = date.getFullYear() - 2;
//        //for (prevYears; prevYears <= date.getFullYear(); prevYears++) 
//        //{
//        //    html += `<div onclick="CanjEZFvPetVidb(this)" class="settings_a ugiECcrnKwaoVsb" id="MkoKdHskxQLfcuP__">` +
//        //        `<div class="settings_a_select">` +
//        //        `<span></span><span style="opacity: 1; margin-right: 20px;">` + prevYears + `</span>` +
//        //        `</div>` +
//        //        `</div>`;
//        //}
//        //$('#MkoKdHskxQLfcuP_').after(html);



//        //let MkoKdHskxQLfcuP__ = document.querySelectorAll('#MkoKdHskxQLfcuP__');
//        //for (let i = 0; i < MkoKdHskxQLfcuP__.length; i++) 
//        //{
//        //    if (sessionStorage.getItem('LTRXohWjonyFAsg') != null)
//        //    {
//        //        if ($(MkoKdHskxQLfcuP__[i]).children('.settings_a_select').children('span').eq(1).html() == sessionStorage.getItem('LTRXohWjonyFAsg')) 
//        //        {
//        //            $(MkoKdHskxQLfcuP__[i]).addClass('QbNQbKEvEMUpWaH');
//        //        }
//        //    }
//        //    else 
//        //    {
//        //        if ($(MkoKdHskxQLfcuP__[i]).children('.settings_a_select').children('span').eq(1).html() == date.getFullYear()) 
//        //        {
//        //            $(MkoKdHskxQLfcuP__[i]).addClass('QbNQbKEvEMUpWaH');
//        //        }
//        //    }
//        //}

//        if (sessionStorage.getItem('hQxHXfkxHkfALTJ') == null)
//        {
//            $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html()
//        }

//        $.ajax({
//            type: 'GET',
//            url: '/Tasks/Years',
//            data: {
//                savedYear: sessionStorage.getItem('LTRXohWjonyFAsg'),
//                savedWeek: sessionStorage.getItem('hQxHXfkxHkfALTJ'),
//                savedDepartment: sessionStorage.getItem('JcvzYoovBpGECWh')
//            },
//            success: function (response)
//            {
//                //collapse_everything("MkoKdHskxQLfcuP_");

//                //$('#MkoKdHskxQLfcuP_').after(response).addClass('pAPTryUdWHeiZZa');

//                //collapse_everything_continue("MkoKdHskxQLfcuP_");
//            },
//            error: function (xhr, status, error)
//            {
//                console.log('Error:', error);
//            }
//        });
//    }
//    else 
//    {
//        //let MkoKdHskxQLfcuP__ = document.querySelectorAll('#MkoKdHskxQLfcuP__');
//        //for (let i = 0; i < MkoKdHskxQLfcuP__.length; i++) {
//        //    $(MkoKdHskxQLfcuP__[i]).remove();
//        //}

//        ////$('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');

//        $('#MkoKdHskxQLfcuP_').removeClass('pAPTryUdWHeiZZa');

//        uncollapse_everything("MkoKdHskxQLfcuP_");
//    }
//};

function CanjEZFvPetVidb(t, year, week, department) 
{
    //let year = $(t).children('.settings_a_select').children('span').eq(1).html();
    $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html(year);

    let MkoKdHskxQLfcuP__ = document.querySelectorAll('#MkoKdHskxQLfcuP__');
    for (let i = 0; i < MkoKdHskxQLfcuP__.length; i++) {
        $(MkoKdHskxQLfcuP__[i]).removeClass('QbNQbKEvEMUpWaH');
    }
    $(t).addClass('QbNQbKEvEMUpWaH');

    //sessionStorage.setItem('LTRXohWjonyFAsg', $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html());
    sessionStorage.setItem('LTRXohWjonyFAsg', year);

    drmZhscxvPoxiya(year, week, department);
};

function fssIiZoJOhPhaRO_test(t) 
{
    $.ajax({
        type: 'GET',
        url: '/Tasks/WeeksInYear',
        data: {
            savedYear: sessionStorage.getItem('LTRXohWjonyFAsg'),
            savedWeek: sessionStorage.getItem('hQxHXfkxHkfALTJ'),
            savedDepartment: sessionStorage.getItem('JcvzYoovBpGECWh')
        },
        success: function (response)
        {
            $(t).toggleClass("pAPTryUdWHeiZZa");
            show_options(t, response.contentResult.content);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

//function fssIiZoJOhPhaRO(t) 
//{
//    if (!$('#fssIiZoJOhPhaRO_').hasClass('pAPTryUdWHeiZZa'))
//    {
//        $.ajax({
//            type: 'GET',
//            url: '/Tasks/WeeksInYear',
//            data: {
//                savedYear: sessionStorage.getItem('LTRXohWjonyFAsg'),
//                savedWeek: sessionStorage.getItem('hQxHXfkxHkfALTJ'),
//                savedDepartment: sessionStorage.getItem('JcvzYoovBpGECWh')
//            },
//            success: function (response)
//            {
//                //collapse_everything("fssIiZoJOhPhaRO_");

//                //$('#fssIiZoJOhPhaRO_').after(response.contentResult.content);

//                //$('#fssIiZoJOhPhaRO_').addClass('pAPTryUdWHeiZZa');

//                //collapse_everything_continue("fssIiZoJOhPhaRO_");
//            },
//            error: function (xhr, status, error)
//            {
//                console.log('Error:', error);
//            }
//        });

        

//        //let html = '';
//        //let date = new Date();
//        //let year_ = $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html();
//        //if (sessionStorage.getItem('LTRXohWjonyFAsg') != null)
//        //{
//        //    year_ = sessionStorage.getItem('LTRXohWjonyFAsg');
//        //}
//        //let month_ = date.getMonth() + 1;
//        //let day_ = date.getDate();

//        //$.ajax({
//        //    type: 'GET',
//        //    url: '/Tasks/WeeksInYear',
//        //    data: {
//        //        year: year_,
//        //        month: month_,
//        //        day: day_
//        //    },
//        //    success: function (response) 
//        //    {
//        //        for (const [key, value] of Object.entries(response)) 
//        //        {
//        //            if (key == 'weeks') 
//        //            {
//        //                for (let i = 1; i <= value; i++)
//        //                {
//        //                    html += `<div onclick="XyLurmdtOTQYvZU(this)" class="settings_a ugiECcrnKwaoVsb" id="fssIiZoJOhPhaRO__">` +
//        //                        `<div class="settings_a_select">` +
//        //                        `<span></span><span style="opacity: 1; margin-right: 20px;">` + i + `</span>` +
//        //                        `</div>` +
//        //                        `</div>`;
//        //                }
//        //                $('#fssIiZoJOhPhaRO_').after(html);

//        //            }
//        //            if (key == 'currentWeek') 
//        //            {
//        //                //
//        //                let fssIiZoJOhPhaRO__ = document.querySelectorAll('#fssIiZoJOhPhaRO__');
//        //                for (let i = 0; i < fssIiZoJOhPhaRO__.length; i++) 
//        //                {
//        //                    let span = $(fssIiZoJOhPhaRO__[i]).children('.settings_a_select').children('span').eq(1).html();
//        //                    if (span == value + 1) 
//        //                    {
//        //                        if (sessionStorage.getItem('hQxHXfkxHkfALTJ') == null) 
//        //                        {
//        //                            $(fssIiZoJOhPhaRO__[i]).addClass('QbNQbKEvEMUpWaH');
//        //                        }

//        //                    }
//        //                }
//        //            }
//        //        }

//        //        let fssIiZoJOhPhaRO__ = document.querySelectorAll('#fssIiZoJOhPhaRO__');
//        //        for (let i = 0; i < fssIiZoJOhPhaRO__.length; i++) 
//        //        {
//        //            if (sessionStorage.getItem('hQxHXfkxHkfALTJ') != null)
//        //            {
//        //                if ($(fssIiZoJOhPhaRO__[i]).children('.settings_a_select').children('span').eq(1).html() == sessionStorage.getItem('hQxHXfkxHkfALTJ')) 
//        //                {
//        //                    $(fssIiZoJOhPhaRO__[i]).addClass('QbNQbKEvEMUpWaH');
//        //                }
//        //            }
//        //        }

//        //        $('#fssIiZoJOhPhaRO_').addClass('pAPTryUdWHeiZZa');
//        //    },
//        //    error: function (xhr, status, error)
//        //    {
//        //        console.log('Error getting data:', error);
//        //    }
//        //});
//    }
//    else 
//    {
//        //let fssIiZoJOhPhaRO__ = document.querySelectorAll('#fssIiZoJOhPhaRO__');
//        //for (let i = 0; i < fssIiZoJOhPhaRO__.length; i++)
//        //{
//        //    $(fssIiZoJOhPhaRO__[i]).remove();
//        //}

//        //$('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');

//        $('#fssIiZoJOhPhaRO_').removeClass('pAPTryUdWHeiZZa');

//        uncollapse_everything("fssIiZoJOhPhaRO_");
//    }
//};

function XyLurmdtOTQYvZU(t, year, week, department) 
{
    //let week = $(t).children('.settings_a_select').children('span').eq(1).html();
    $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html(week);

    let fssIiZoJOhPhaRO__ = document.querySelectorAll('#fssIiZoJOhPhaRO__');
    for (let i = 0; i < fssIiZoJOhPhaRO__.length; i++)
    {
        $(fssIiZoJOhPhaRO__[i]).removeClass('QbNQbKEvEMUpWaH');
    }
    $(t).addClass('QbNQbKEvEMUpWaH');

    //sessionStorage.setItem('hQxHXfkxHkfALTJ', $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html());
    sessionStorage.setItem('hQxHXfkxHkfALTJ', week);

    drmZhscxvPoxiya(year, week, department);
};

function jxcqHOZgFmYHYkI_test(t, firstDepartment) 
{
    $.ajax({
        type: 'GET',
        url: '/Tasks/GetDepartments',
        data: {
            firstDepartment: firstDepartment,
            savedDepartment: sessionStorage.getItem('JcvzYoovBpGECWh')
        },
        success: function (response)
        {
            $(t).toggleClass("pAPTryUdWHeiZZa");
            show_options(t, response);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

//function jxcqHOZgFmYHYkI(firstDepartment) 
//{
//    if (!$('#jxcqHOZgFmYHYkI_').hasClass('pAPTryUdWHeiZZa')) 
//    {
//        $.ajax({
//            type: 'GET',
//            url: '/Tasks/GetDepartments',
//            data: {
//                firstDepartment: firstDepartment,
//                savedDepartment: sessionStorage.getItem('JcvzYoovBpGECWh')
//            },
//            success: function (response)
//            {
//                collapse_everything("jxcqHOZgFmYHYkI_");

//                $('#jxcqHOZgFmYHYkI_').after(response).addClass('pAPTryUdWHeiZZa');

//                collapse_everything_continue("jxcqHOZgFmYHYkI_");
//            },
//            error: function (xhr, status, error)
//            {
//                console.log('Error:', error);
//            }
//        });
//    }
//    else 
//    {
//        //let jxcqHOZgFmYHYkI__ = document.querySelectorAll('#jxcqHOZgFmYHYkI__');
//        //for (let i = 0; i < jxcqHOZgFmYHYkI__.length; i++)
//        //{
//        //    $(jxcqHOZgFmYHYkI__[i]).remove();
//        //}

//        $('#jxcqHOZgFmYHYkI_').removeClass('pAPTryUdWHeiZZa');

//        uncollapse_everything("jxcqHOZgFmYHYkI_");
//    }
//};

function HMdMMtqNwVAguDt(t, id) 
{
    $.ajax({
        type: 'GET',
        url: '/Tasks/ClickOnDepartment',
        data: {
            savedYear: sessionStorage.getItem('LTRXohWjonyFAsg'),
            savedWeek: sessionStorage.getItem('hQxHXfkxHkfALTJ'),
            departmentID: id
        },
        success: function (response)
        {
            $('#jxcqHOZgFmYHYkI_').children('.settings_a_select').children('span').eq(1).html(response.departmentName);

            let jxcqHOZgFmYHYkI__ = document.querySelectorAll('#jxcqHOZgFmYHYkI__');
            for (let i = 0; i < jxcqHOZgFmYHYkI__.length; i++) {
                $(jxcqHOZgFmYHYkI__[i]).removeClass('QbNQbKEvEMUpWaH');
            }
            $(t).addClass('QbNQbKEvEMUpWaH');

            sessionStorage.setItem('JcvzYoovBpGECWh', id);
            //arKOctcZVJhWuhL(id);

            ////clear taskNames
            //let ekzMacYlAMvOgoy__ = document.querySelectorAll('#ekzMacYlAMvOgoy__');
            //for (let i = 0; i < ekzMacYlAMvOgoy__.length; i++) {
            //    $(ekzMacYlAMvOgoy__[i]).remove(); 
            //}
            //$('#ekzMacYlAMvOgoy_').removeClass('pAPTryUdWHeiZZa');
            //$('#ekzMacYlAMvOgoy_').children('.settings_a_select').children('ion-icon').removeClass('nHCgJALAMsLYOCi');



            drmZhscxvPoxiya(response.year, response.week, id);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function ekzMacYlAMvOgoy_test(t, firstDepartment) 
{
    $.ajax({
        type: 'GET',
        url: '/Tasks/GetTasks',
        data: {
            firstDepartment: firstDepartment,
            savedDepartment: sessionStorage.getItem('JcvzYoovBpGECWh')
        },
        success: function (response)
        {
            $(t).toggleClass("pAPTryUdWHeiZZa");
            show_options(t, response);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
}

//function ekzMacYlAMvOgoy(firstDepartment) 
//{
//    if (!$('#ekzMacYlAMvOgoy_').hasClass('pAPTryUdWHeiZZa'))
//    {
//        $.ajax({
//            type: 'GET',
//            url: '/Tasks/GetTasks',
//            data: {
//                firstDepartment: firstDepartment,
//                savedDepartment: sessionStorage.getItem('JcvzYoovBpGECWh')
//            },
//            success: function (response)
//            {
//                collapse_everything("ekzMacYlAMvOgoy_");

//                $('#ekzMacYlAMvOgoy_').after(response);

//                $('#ekzMacYlAMvOgoy_').addClass('pAPTryUdWHeiZZa');
//                $('#ekzMacYlAMvOgoy_').children('.settings_a_select').children('ion-icon').addClass('nHCgJALAMsLYOCi');

//                collapse_everything_continue("ekzMacYlAMvOgoy_");
//            },
//            error: function (xhr, status, error)
//            {
//                console.log('Error:', error);
//            }
//        });
//    }
//    else 
//    {
//        //let ekzMacYlAMvOgoy__ = document.querySelectorAll('.YgYDRNgkzyxgztO');
//        //for (let i = 0; i < ekzMacYlAMvOgoy__.length; i++)
//        //{
//        //    $(ekzMacYlAMvOgoy__[i]).remove();
//        //}

//        $('#ekzMacYlAMvOgoy_').removeClass('pAPTryUdWHeiZZa');

//        uncollapse_everything("ekzMacYlAMvOgoy_");
//    }
//};

function uXPtoAMyTPOkWCV(t) 
{
    t.style.cursor = 'grabbing';
    let YgYDRNgkzyxgztO = $(t).parent();

    $(YgYDRNgkzyxgztO).draggable({
        handle: t,
        snap: '.AQzCKqmlrQJmxzn',
        snapMode: 'inner',
        appendTo: '.right-nav',
        helper: 'clone',
        start: function (event, ui) 
        {
            $('.left-nav').addClass('HFhDvVpHKOUBBMS');
            $(ui.helper).css({ 'box-shadow': 'unset', 'background-color': 'rgba(34, 36, 48, 1)', 'overflow': 'hidden', 'width': '260px', 'transform': 'translateX(-23px) translateY(-28px)', 'height': '35px', 'border-radius': '3px', 'border': '1px solid rgba(255, 255, 255, 0.1)', 'z-index': '1000' });
            $(ui.helper).addClass('temp');

            $('.AQzCKqmlrQJmxzn').css({ 'background-color': 'rgba(255, 255, 255, 0.1)' });
        }
    });

    $('.AQzCKqmlrQJmxzn').droppable({
        drop: function (event, ui)
        {
            var item = ui.draggable;
            var newItem = item.clone();
            newItem.appendTo($(this))
                .draggable({
                    handle: $(this).not(".ui-resizable-handle"),
                    containment: $(".droppable")
                });
            newItem.resizable({
                ghost: false
            });
            
            $($(newItem).children('div').find('a')).remove();
            for (let x = 0; x < 3; x++)
            {
                $($(newItem).children('div')[1]).remove();
            }

            $(newItem).children('svg').remove();
            $(newItem).addClass('pTBYGYxynGajyIy');
            $(newItem).removeClass('YgYDRNgkzyxgztO').removeClass('ui-draggable').removeClass('ui-resizable');
            $(newItem).removeAttr('style');

            $('.AQzCKqmlrQJmxzn').css('background-color', '');
            $('.left-nav').removeClass('HFhDvVpHKOUBBMS');
            this.scrollTo(0, this.scrollHeight);

            //
            let workerID = $(newItem).parent().parent().parent('.wcHMgjWjXaRMPKy').attr('worker'); //nie może być równe null
            let taskNameID = $(newItem).attr('pGXQuswWwoZGMWg'); //nie będzie równe null
            let date = $(newItem).parent().parent('.SBVWNWOJZnTplXL').attr('date'); //nigdy nie będzie równe null
            let jobStart = $(newItem).parent().parent('.SBVWNWOJZnTplXL').children('.LwxRoYhfmyzTlGm').children('input').eq(0).val(); //może być równe null
            let jobEnd = $(newItem).parent().parent('.SBVWNWOJZnTplXL').children('.LwxRoYhfmyzTlGm').children('input').eq(1).val(); //może być równe null
            saveAfterDrop(newItem, workerID, taskNameID, date, jobStart, jobEnd);
        },
        drag: function ()
        {
            var offset = $(this).offset();
            var xPos = offset.left;
            var yPos = offset.top;
        },
    });
};

function vhKnmbRGiUsyfyh(t) 
{
    t.style.removeProperty('cursor');
    $('.AQzCKqmlrQJmxzn').css('background-color', '');
    $('.left-nav').removeClass('HFhDvVpHKOUBBMS');
};

function saveAfterDrop(element, workerID, taskNameID, date, jobStart, jobEnd) 
{
    let checkBool = false;
    for (let i = 0; i < model_t.length; i++) 
    {
        if (model_t[i].WorkerID == workerID && new Date(model_t[i].Date).toLocaleDateString() == new Date(date).toLocaleDateString()) 
        {
            if (jobStart == '' && jobEnd == '') 
            {
                if (model_t[i].TaskNameID != null)
                {
                    checkBool = true;

                    $(element).append(createSmallLoader2());
                    disable();
                    $.ajax({
                        type: 'POST',
                        url: '/Tasks/AddTasks',
                        data: {
                            workerID: workerID,
                            taskNameID: taskNameID,
                            date: date,
                            jobStart: null,
                            jobEnd: null
                        },
                        success: function (response)
                        {
                            model_t.push({ Id: response, WorkerID: workerID, TaskNameID: taskNameID, Date: date, JobStart: null, JobEnd: null });
                            
                            let span = $(element).children('div').children('span').html();
                            $(element).append(`<span>` + span + `</span>`);
                            $(element).children('div').remove();
                            $(element).removeClass('pTBYGYxynGajyIy').addClass('ZslufbFdcfCIeaW');
                            $(element).attr('phxkwraiqguiibo', response).attr('id', date);
                            

                            enable();
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding data:', error);
                        }
                    });
                    break;
                }
                //if (model_t[i].TaskNameID == null)
                //{
                //    //
                //}
            }
            else 
            {
                if (model_t[i].TaskNameID != null)
                {
                    checkBool = true;

                    $(element).append(createSmallLoader2());
                    disable();
                    let dateJobStart = date + ' ' + jobStart;
                    let dateJobEnd = date + ' ' + jobEnd;
                    $.ajax({
                        type: 'POST',
                        url: '/Tasks/AddTasks',
                        data: {
                            workerID: workerID,
                            taskNameID: taskNameID,
                            date: date,
                            jobStart: dateJobStart,
                            jobEnd: dateJobEnd
                        },
                        success: function (response)
                        {
                            model_t.push({ Id: response, WorkerID: workerID, TaskNameID: taskNameID, Date: date, JobStart: dateJobStart, JobEnd: dateJobEnd });

                            let span = $(element).children('div').children('span').html();
                            $(element).append(`<span>` + span + `</span>`);
                            $(element).children('div').remove();
                            $(element).removeClass('pTBYGYxynGajyIy').addClass('ZslufbFdcfCIeaW');
                            $(element).attr('phxkwraiqguiibo', response).attr('id', date);


                            enable();
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding data:', error);
                        }
                    });
                    break;
                }
                if (model_t[i].TaskNameID == null)
                {
                    checkBool = true;

                    $(element).append(createSmallLoader2());
                    disable();
                    let dateJobStart = date + ' ' + jobStart;
                    let dateJobEnd = date + ' ' + jobEnd;
                    $.ajax({
                        type: 'POST',
                        url: '/Tasks/EditTask',
                        data: {
                            id: model_t[i].Id,
                            taskNameID: taskNameID,
                            jobStart: dateJobStart,
                            jobEnd: dateJobEnd
                        },
                        success: function (response)
                        {
                            var indx = model_t.findIndex(obj => obj.Id == model_t[i].Id);
                            model_t[indx].TaskNameID = taskNameID;
                            model_t[indx].JobStart = dateJobStart;
                            model_t[indx].JobEnd = dateJobEnd;


                            let span = $(element).children('div').children('span').html();
                            $(element).append(`<span>` + span + `</span>`);
                            $(element).children('div').remove();
                            $(element).removeClass('pTBYGYxynGajyIy').addClass('ZslufbFdcfCIeaW');
                            $(element).attr('phxkwraiqguiibo', model_t[i].Id).attr('id', date);

                            enable();
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding data:', error);
                        }
                    });
                    break;
                }
            }          
        }
    }

    if (!checkBool) 
    {
        $(element).append(createSmallLoader2());
        disable();
        $.ajax({
            type: 'POST',
            url: '/Tasks/AddTasks',
            data: {
                workerID: workerID,
                taskNameID: taskNameID,
                date: date,
                jobStart: null,
                jobEnd: null
            },
            success: function (response)
            {
                model_t.push({ Id: response, WorkerID: workerID, TaskNameID: taskNameID, Date: date, JobStart: null, JobEnd: null });
                $(element).parent().parent().children('.LwxRoYhfmyzTlGm').children('.MNewKOhqZkqNDeJ').fadeIn(100);

                let span = $(element).children('div').children('span').html();
                $(element).append(`<span>` + span + `</span>`);
                $(element).children('div').remove();
                $(element).removeClass('pTBYGYxynGajyIy').addClass('ZslufbFdcfCIeaW');
                $(element).attr('phxkwraiqguiibo', response).attr('id', date);

                enable();
            },
            error: function (xhr, status, error)
            {
                console.log('Error adding data:', error);
            }
        });
    }
};

function wgddAsHIsXNWQkl(t) 
{
    let workerID = $(t).parent().parent().parent('.wcHMgjWjXaRMPKy').attr('worker');
    let jobStart = t.value;
    let jobEnd = $(t).parent().children('input').eq(1).val();
    let date = $(t).parent().attr('date');

    if (jobStart.length > 0 && jobEnd.length > 0) 
    {
        let dateJobStart = date + ' ' + jobStart;
        let dateJobEnd = date + ' ' + jobEnd;

        let array = [];//jezeli pusta to nie ma nic wpisane w bazie

        //sprawdz czy jest coś do zedytowania
        for (let i = 0; i < model_t.length; i++) 
        {
            if (model_t[i].WorkerID == workerID && new Date(model_t[i].Date).toLocaleDateString() == new Date(date).toLocaleDateString()) //=id
            {
                if (model_t[i].JobStart != null && model_t[i].JobEnd != null) 
                {
                    //jezeli sa godziny wpisane i taskId
                    if (model_t[i].TaskNameID != null) 
                    {
                        array.push({ id: model_t[i].Id, taskId: model_t[i].TaskNameID, start: dateJobStart, end: dateJobEnd });
                    }
                    //jezeli sa godziny wpisane ale nie ma taskId
                    if (model_t[i].TaskNameID == null) 
                    {
                        array.push({ id: model_t[i].Id, taskId: null, start: dateJobStart, end: dateJobEnd });
                    }
                }
                if (model_t[i].JobStart == null && model_t[i].JobEnd == null) 
                {
                    //jezeli nie ma godzin ale jest wpisany taskId
                    if (model_t[i].TaskNameID != null) 
                    {
                        array.push({ id: model_t[i].Id, taskId: model_t[i].TaskNameID, start: dateJobStart, end: dateJobEnd });
                    }
                    //jezeli nie ma niczego wpisanego
                    if (model_t[i].TaskNameID == null) 
                    {
                        //nic do zrobienia
                    }
                }
            }
        }

        if (array.length > 0)
        {
            //edytuj
            //sprawdz czy godziny istnieja juz bazie
            for (let i = 0; i < model_t.length; i++) 
            {
                for (let j = 0; j < array.length; j++) 
                {
                    if (model_t[i].Id == array[j].id) 
                    {
                        if (new Date(model_t[i].JobStart).toLocaleTimeString() != new Date(array[j].start).toLocaleTimeString() || new Date(model_t[i].JobEnd).toLocaleTimeString() != new Date(array[j].end).toLocaleTimeString()) 
                        {
                            $(t).parent().append(createSmallLoader());
                            disable();
                            $.ajax({
                                type: 'POST',
                                url: '/Tasks/EditTask',
                                data: {
                                    id: array[j].id,
                                    taskNameID: array[j].taskId,
                                    jobStart: array[j].start,
                                    jobEnd: array[j].end
                                },
                                success: function (response)
                                {
                                    //location.reload();

                                    var indx = model_t.findIndex(obj => obj.Id == array[j].id);
                                    model_t[indx].TaskNameID = array[j].taskId;
                                    model_t[indx].JobStart = array[j].start;
                                    model_t[indx].JobEnd = array[j].end;
                                    enable();
                                },
                                error: function (xhr, status, error)
                                {
                                    console.log('Error adding data:', error);
                                }
                            });
                        }
                    }
                }
            }
        }
        else 
        {
            //dodaj do bazy
            $(t).parent().append(createSmallLoader());
            disable();
            $.ajax({
                type: 'POST',
                url: '/Tasks/AddTasks',
                data: {
                    workerID: workerID,
                    taskNameID: null,
                    date: date,
                    jobStart: dateJobStart,
                    jobEnd: dateJobEnd
                },
                success: function (response)
                {
                    //location.reload();
                    model_t.push({ Id: response, WorkerID: workerID, TaskNameID: null, Date: date, JobStart: dateJobStart, JobEnd: dateJobEnd });
                    $(t).parent().children('.MNewKOhqZkqNDeJ').fadeIn(100);

                    enable();
                },
                error: function (xhr, status, error)
                {
                    console.log('Error adding data:', error);
                }
            });
        }
    }
};

function YNXxUwIhBTDduDG(t)
{
    let workerID = $(t).parent().parent().parent('.wcHMgjWjXaRMPKy').attr('worker');
    let jobStart = $(t).parent().children('input').eq(0).val();
    let jobEnd = t.value;
    let date = $(t).parent().attr('date');

    if (jobStart.length > 0 && jobEnd.length > 0) 
    {
        let dateJobStart = date + ' ' + jobStart;
        let dateJobEnd = date + ' ' + jobEnd;

        let array = [];//jezeli pusta to nie ma nic wpisane w bazie

        //sprawdz czy jest coś do zedytowania
        for (let i = 0; i < model_t.length; i++) 
        {
            if (model_t[i].WorkerID == workerID && new Date(model_t[i].Date).toLocaleDateString() == new Date(date).toLocaleDateString()) //=id
            {
                if (model_t[i].JobStart != null && model_t[i].JobEnd != null) 
                {
                    //jezeli sa godziny wpisane i taskId
                    if (model_t[i].TaskNameID != null) 
                    {
                        array.push({ id: model_t[i].Id, taskId: model_t[i].TaskNameID, start: dateJobStart, end: dateJobEnd });
                        //console.log('a1');
                    }
                    //jezeli sa godziny wpisane ale nie ma taskId
                    if (model_t[i].TaskNameID == null) 
                    {
                        array.push({ id: model_t[i].Id, taskId: null, start: dateJobStart, end: dateJobEnd });
                        //console.log('a2');
                    }
                }
                if (model_t[i].JobStart == null && model_t[i].JobEnd == null) 
                {
                    //jezeli nie ma godzin ale jest wpisany taskId
                    if (model_t[i].TaskNameID != null) 
                    {
                        array.push({ id: model_t[i].Id, taskId: model_t[i].TaskNameID, start: dateJobStart, end: dateJobEnd });
                        //console.log('a3');
                    }
                    //jezeli nie ma niczego wpisanego
                    if (model_t[i].TaskNameID == null) 
                    {
                        //nic do zrobienia
                        //console.log('a4');
                    }
                }
            }
        }

        if (array.length > 0)
        {
            //edytuj
            //sprawdz czy godziny istnieja juz bazie
            for (let i = 0; i < model_t.length; i++) 
            {
                for (let j = 0; j < array.length; j++) 
                {
                    if (model_t[i].Id == array[j].id) 
                    {
                        if (new Date(model_t[i].JobStart).toLocaleTimeString() != new Date(array[j].start).toLocaleTimeString() || new Date(model_t[i].JobEnd).toLocaleTimeString() != new Date(array[j].end).toLocaleTimeString()) 
                        {
                            $(t).parent().append(createSmallLoader());
                            disable();
                            $.ajax({
                                type: 'POST',
                                url: '/Tasks/EditTask',
                                data: {
                                    id: array[j].id,
                                    taskNameID: array[j].taskId,
                                    jobStart: array[j].start,
                                    jobEnd: array[j].end
                                },
                                success: function (response)
                                {
                                    //location.reload();
                                    
                                    var indx = model_t.findIndex(obj => obj.Id == array[j].id);
                                    model_t[indx].TaskNameID = array[j].taskId;
                                    model_t[indx].JobStart = array[j].start;
                                    model_t[indx].JobEnd = array[j].end;
                                    enable();
                                },
                                error: function (xhr, status, error)
                                {
                                    console.log('Error adding data:', error);
                                }
                            });
                        }
                    }
                }
            }
        }
        else 
        {
            //dodaj do bazy
            $(t).parent().append(createSmallLoader());
            disable();
            $.ajax({
                type: 'POST',
                url: '/Tasks/AddTasks',
                data: {
                    workerID: workerID,
                    taskNameID: null,
                    date: date,
                    jobStart: dateJobStart,
                    jobEnd: dateJobEnd
                },
                success: function (response)
                {
                    model_t.push({ Id: response, WorkerID: workerID, TaskNameID: null, Date: date, JobStart: dateJobStart, JobEnd: dateJobEnd });
                    $(t).parent().children('.MNewKOhqZkqNDeJ').fadeIn(100);

                    enable();
                },
                error: function (xhr, status, error)
                {
                    console.log('Error adding data:', error);
                }
            });
        }
    }
};

function createSmallLoader() 
{
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.style.cssText = 'position: absolute; top: 7px; left: 7px;';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    
    return lds;
};

function createSmallLoader2() 
{
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    
    return lds;
};

function disable() 
{
    $('.LwxRoYhfmyzTlGm').children('input').addClass('disabled');
    $('.LwxRoYhfmyzTlGm').children('.MNewKOhqZkqNDeJ').addClass('disabled');
    $('.AQzCKqmlrQJmxzn').addClass('disabled');
    $('.left-nav').addClass('HFhDvVpHKOUBBMS');
};

function enable() 
{
    $('.LwxRoYhfmyzTlGm').children('input').removeClass('disabled');
    $('.LwxRoYhfmyzTlGm').children('.MNewKOhqZkqNDeJ').removeClass('disabled');
    $('.AQzCKqmlrQJmxzn').removeClass('disabled');
    $('.left-nav').removeClass('HFhDvVpHKOUBBMS');

    $('.lds-ring-small').remove();
};

function jzOfWppePYfqVYf(t) //remove from database
{
    let workerID = $(t).parent().parent().parent().attr('worker');
    let date = $(t).parent().parent().attr('date');

    let a = $(t).parent().parent().children('.AQzCKqmlrQJmxzn').children('.ZslufbFdcfCIeaW:visible');
    
    if (a.length > 0) 
    {
        $(t).parent().append(createSmallLoader());
        disable();

        let index = 0;
        let interval = setInterval(() =>
        {
            if (index === a.length - 1) {
                clearInterval(interval);
                setTimeout(function ()
                {
                    $(t).parent().children('input').val('');
                    $(t).hide();
                    enable();
                }, 100);
            }

            let id_ = $(a[index]).attr('pHXkWraiQguiibO');
            
            $.ajax({
                type: 'POST',
                url: '/Tasks/RemoveTask',
                data: { id: id_ },
                success: function (response)
                {
                    var indx = model_t.indexOf(id_);
                    model_t.splice(indx, 1);


                    $(a[index]).remove();
                    index++;
                },
                error: function (response) 
                {
                    console.log('Error:', error);
                }
            });
        }, 100);
    }
    else 
    {
        $(t).parent().append(createSmallLoader());
        disable();

        for (let i = 0; i < model_t.length; i++) 
        {
            if (model_t[i].WorkerID == workerID && new Date(model_t[i].Date).toLocaleDateString() == new Date(date).toLocaleDateString()) 
            {
                $.ajax({
                    type: 'POST',
                    url: '/Tasks/RemoveTask',
                    data: {
                        id: model_t[i].Id,
                    },
                    success: function (response)
                    {
                        var indx = model_t.indexOf(model_t[i].Id);
                        model_t.splice(indx, 1);

                        $(t).parent().children('input').val('');
                        $(t).hide();
                        enable();
                    },
                    error: function (xhr, status, error)
                    {
                        console.log('Error:', error);
                    }
                });
            }
        }
    }
};