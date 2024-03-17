

function loadOnLoad()
{
    let date = new Date();

    //let uKdvKAhOhYwppOO = document.getElementById('uKdvKAhOhYwppOO');// rok

    let JFUPeUjXoygHiiK = document.getElementById('JFUPeUjXoygHiiK');// tydzien
    //let tydzien = $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html();
    //let year_ = date.getFullYear();
    let year_ = $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html();
    if (sessionStorage.getItem('LTRXohWjonyFAsg') != null)
    {
        year_ = sessionStorage.getItem('LTRXohWjonyFAsg');
    }
    let month_ = date.getMonth() + 1;
    let day_ = date.getDate();

    $.ajax({
        type: 'GET',
        url: '/Tasks/WeeksInYear',
        data: {
            year: year_,
            month: month_,
            day: day_
        },
        success: function (response)
        {
            for (const [key, value] of Object.entries(response))
            {
                if (key == 'weeks')
                {
                    for (let i = 1; i <= value; i++)
                    {
                        //JFUPeUjXoygHiiK.innerHTML += `<option value="` + i + `">` + i + ` tydzień</option>`;
                    }
                }
                if (key == 'currentWeek')
                {
                    if (sessionStorage.getItem('hQxHXfkxHkfALTJ') != null)
                    {
                        let hQxHXfkxHkfALTJ = sessionStorage.getItem('hQxHXfkxHkfALTJ');

                        //let e = document.getElementById('JFUPeUjXoygHiiK');
                        //e.value = hQxHXfkxHkfALTJ;

                        $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html(hQxHXfkxHkfALTJ);
                    }
                    else
                    {
                        let newValue = value + 1;
                        //JFUPeUjXoygHiiK.value = newValue;

                        $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html(newValue);
                        //console.log(newValue);
                    }
                }
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error getting data:', error);
        }
    }).then(function ()
    {
        drmZhscxvPoxiya();
        //getDepartments();
    });
};
loadOnLoad();

if (sessionStorage.getItem('qweznPAaXCMlTFi') != null)
{
    let qweznPAaXCMlTFi = sessionStorage.getItem('qweznPAaXCMlTFi');

    let e = document.getElementById('kRyEzzxRxADfSZj');
    e.value = qweznPAaXCMlTFi;
}

//function getDepartments() 
//{   
//    if (sessionStorage.getItem('vyfChtSgBWdGVvY') != null)
//    {

//    }
//    else
//    {
//        for (let i = 0; i < model_d.length; i++) 
//        {

//        }
//    }
//};

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

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
};

function drmZhscxvPoxiya()
{
    let LwxRoYhfmyzTlGm = document.querySelectorAll('.LwxRoYhfmyzTlGm');
    for (let j = 0; j < LwxRoYhfmyzTlGm.length; j++)
    {
        LwxRoYhfmyzTlGm[j].getElementsByTagName('input')[0].value = '';
        LwxRoYhfmyzTlGm[j].getElementsByTagName('input')[1].value = '';
    }

    //let uKdvKAhOhYwppOO = document.getElementById('uKdvKAhOhYwppOO');
    //let year_ = uKdvKAhOhYwppOO.options[uKdvKAhOhYwppOO.selectedIndex].value;
    let year_ = $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html();
    if (sessionStorage.getItem('LTRXohWjonyFAsg') != null)
    {
        year_ = sessionStorage.getItem('LTRXohWjonyFAsg');
    }

    //let e = document.getElementById('JFUPeUjXoygHiiK');
    //let week_ = e.options[e.selectedIndex].value;
    let week_ = $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html();
    if (sessionStorage.getItem('hQxHXfkxHkfALTJ') != null) 
    {
        week_ = sessionStorage.getItem('hQxHXfkxHkfALTJ');
    }

    let array = [];
    $.ajax({
        type: 'GET',
        url: '/Tasks/DatesInChosenWeek',
        data: {
            year: year_,
            weekOfYear: week_
        },
        success: function (response)
        {
            let fSJtEaXwJSHzoxW = document.querySelector('.fSJtEaXwJSHzoxW');
            fSJtEaXwJSHzoxW.innerHTML = `<div class="GJakzZdfXNDmfZz">` +
                `<label id="task_lock_headers_id" onchange="task_lock_headers_onchange(this)">` +
                `<input type="checkbox" id="task_lock_headers_input" />` +
                `<svg id="lock1" viewBox="-3.5 0 19 19" width="32" height="32"><path d="M11.182 8.927v6.912a.794.794 0 0 1-.792.792H1.61a.794.794 0 0 1-.792-.792V8.927a.794.794 0 0 1 .792-.792h.654L1.956 7.11a3.534 3.534 0 0 1 6.769-2.035.554.554 0 1 1-1.062.32A2.426 2.426 0 0 0 3.017 6.79l.404 1.345h6.97a.794.794 0 0 1 .79.792zM7.108 11.47a1.108 1.108 0 1 0-1.583 1.001v1.849a.475.475 0 1 0 .95 0v-1.849a1.108 1.108 0 0 0 .633-1.001z"></path></svg>` +
                `<svg id="lock2" viewBox="-3.5 0 19 19" width="32" height="32"><path d="M11.182 8.927v6.912a.794.794 0 0 1-.792.792H1.61a.794.794 0 0 1-.792-.792V8.927a.794.794 0 0 1 .792-.792h.856V6.367a3.534 3.534 0 1 1 7.068 0v1.768h.856a.794.794 0 0 1 .792.792zm-2.756-2.56a2.426 2.426 0 1 0-4.852 0v1.768h4.852zM7.108 11.47a1.108 1.108 0 1 0-1.583 1.001v1.849a.475.475 0 0 0 .95 0v-1.849a1.108 1.108 0 0 0 .633-1.001z"></path></svg>` +
                `<span>zablokuj</span>` +
                `<span>nagłówki</span>` +
                `</label>` +
                `</div>`;


            for (let i = 0; i < response.result.length; i++)
            {
                let date__ = response.result[i].split('T')[0];
                let dayName = getDayName(date__, 'pl-PL');
                fSJtEaXwJSHzoxW.innerHTML += `<div class="XJsRKtmIfTCptru"><span>` + date__ + `</span><span>` + dayName + `</span></div>`;

                array.push(date__);
            }

            
            let XJsRKtmIfTCptru = document.querySelectorAll('.XJsRKtmIfTCptru');
            for (let k = 0; k < XJsRKtmIfTCptru.length; k++) 
            {
                for (let l = 0; l < model_h.length; l++) {
                    if (new Date($(XJsRKtmIfTCptru[k]).children('span').eq(0).html()).toLocaleDateString() == new Date(model_h[l].Date).toLocaleDateString()) {
                        $(XJsRKtmIfTCptru[k]).children('span').eq(0).css({ 'color': 'red' });
                    }
                }
            }


            if (sessionStorage.getItem('task_lock_headers') != null)
            {
                task_lock_headers();
            }
            else {
                task_unlock_headers();
            }



        },
        error: function (xhr2, status2, error2)
        {
            console.log('Error getting data:', error2);
        }
    }).then(function ()
    {

        let wcHMgjWjXaRMPKy = document.querySelectorAll('.wcHMgjWjXaRMPKy ');
        for (let i = 0; i < wcHMgjWjXaRMPKy.length; i++)
        {
            let SBVWNWOJZnTplXL = wcHMgjWjXaRMPKy[i].querySelectorAll('.SBVWNWOJZnTplXL');
            for (let j = 0; j < SBVWNWOJZnTplXL.length; j++)
            {
                SBVWNWOJZnTplXL[j].setAttribute('date', array[j]);
            }

            let AQzCKqmlrQJmxzn = wcHMgjWjXaRMPKy[i].querySelectorAll('.AQzCKqmlrQJmxzn');
            for (let j = 0; j < AQzCKqmlrQJmxzn.length; j++)
            {
                AQzCKqmlrQJmxzn[j].setAttribute('date', array[j]);
            }

            let LwxRoYhfmyzTlGm = wcHMgjWjXaRMPKy[i].querySelectorAll('.LwxRoYhfmyzTlGm');
            for (let j = 0; j < LwxRoYhfmyzTlGm.length; j++)
            {
                LwxRoYhfmyzTlGm[j].setAttribute('date', array[j]);
            }

            let kqOeanWDDXEYTBz = wcHMgjWjXaRMPKy[i].querySelectorAll('.kqOeanWDDXEYTBz');
            for (let j = 0; j < kqOeanWDDXEYTBz.length; j++)
            {
                kqOeanWDDXEYTBz[j].setAttribute('date', array[j]);
            }

            let avnythFRVEkXnim = wcHMgjWjXaRMPKy[i].querySelectorAll('.avnythFRVEkXnim');
            for (let j = 0; j < avnythFRVEkXnim.length; j++)
            {
                avnythFRVEkXnim[j].setAttribute('date', array[j]);
            }

            let lzfFwBKdGEtuYUv = wcHMgjWjXaRMPKy[i].querySelectorAll('.lzfFwBKdGEtuYUv');
            for (let j = 0; j < lzfFwBKdGEtuYUv.length; j++)
            {
                lzfFwBKdGEtuYUv[j].setAttribute('date', array[j]);
            }
        }

    }).then(function ()
    {
        let AQzCKqmlrQJmxzn = document.querySelectorAll('.AQzCKqmlrQJmxzn');
        for (let i = 0; i < AQzCKqmlrQJmxzn.length; i++)
        {
            let ZslufbFdcfCIeaW = AQzCKqmlrQJmxzn[i].querySelectorAll('.ZslufbFdcfCIeaW');
            for (let j = 0; j < ZslufbFdcfCIeaW.length; j++)
            {
                if (AQzCKqmlrQJmxzn[i].getAttribute('date') == ZslufbFdcfCIeaW[j].id)
                {
                    $(ZslufbFdcfCIeaW[j]).show();
                }
                else
                {
                    //$(ZslufbFdcfCIeaW[j]).remove();
                    $(ZslufbFdcfCIeaW[j]).hide();
                }
            }
        }
    }).then(function ()
    {
        let LwxRoYhfmyzTlGm = document.querySelectorAll('.LwxRoYhfmyzTlGm');
        for (let i = 0; i < model_t.length; i++)
        {
            for (let j = 0; j < LwxRoYhfmyzTlGm.length; j++)
            {

                let jobStart = LwxRoYhfmyzTlGm[j].getElementsByTagName('input')[0];
                let jobEnd = LwxRoYhfmyzTlGm[j].getElementsByTagName('input')[1];

                if (LwxRoYhfmyzTlGm[j].getAttribute('worker') == model_t[i].WorkerID && LwxRoYhfmyzTlGm[j].getAttribute('date') == model_t[i].Date.split('T')[0])
                {
                    let model_start = new Date(model_t[i].JobStart);
                    let model_end = new Date(model_t[i].JobEnd);

                    jobStart.value = padTo2Digits(model_start.getHours()) + ':' + padTo2Digits(model_start.getMinutes());
                    jobEnd.value = padTo2Digits(model_end.getHours()) + ':' + padTo2Digits(model_end.getMinutes());
                }
            }
        }
    }).then(function ()
    {
        sessionStorage.setItem('hQxHXfkxHkfALTJ', week_);
    });
};


function arKOctcZVJhWuhL()
{
    let workerID_array = [];

    //let e = document.getElementById('kRyEzzxRxADfSZj');
    //let e2 = e.options[e.selectedIndex].value;
    let e2 = null;
    if (sessionStorage.getItem('JcvzYoovBpGECWh') != null)
    {
        e2 = sessionStorage.getItem('JcvzYoovBpGECWh');
    }
    else 
    {
        e2 = $('#jxcqHOZgFmYHYkI_').attr('dep');
    }
    
    sessionStorage.setItem('qweznPAaXCMlTFi', e2);

    let array = document.querySelectorAll('.YgYDRNgkzyxgztO');
    for (let i = 0; i < array.length; i++)
    {
        if (array[i].id == e2 || array[i].id == 0)
        {
            $(array[i]).show();
        }
        else
        {
            $(array[i]).hide();
        }
    }

    let wcHMgjWjXaRMPKy = document.querySelectorAll('.wcHMgjWjXaRMPKy');
    for (let i = 0; i < wcHMgjWjXaRMPKy.length; i++)
    {
        if (wcHMgjWjXaRMPKy[i].id == e2)
        {
            $(wcHMgjWjXaRMPKy[i]).show();
            workerID_array.push(wcHMgjWjXaRMPKy[i].getAttribute('worker'));
        }
        else
        {
            $(wcHMgjWjXaRMPKy[i]).hide();
        }
    }

    // get workers hours
    let workerModelArray = [];
    //let chosenYearInput = document.getElementById('uKdvKAhOhYwppOO');
    //let chosenYear = chosenYearInput.options[chosenYearInput.selectedIndex].value;
    let chosenYear = $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html();
    for (let i = 0; i < workerID_array.length; i++)
    {
        let workerID = workerID_array[i];
        for (let j = 0; j < model_t.length; j++)
        {
            let dateModel = new Date(model_t[j].Date);

            if (model_t[j].WorkerID == workerID && chosenYear == dateModel.getFullYear())
            {
                let date1 = new Date(model_t[j].JobStart);
                let date2 = new Date(model_t[j].JobEnd);
                let hours1 = padTo2Digits(date1.getHours()) + ':' + padTo2Digits(date1.getMinutes());
                let hours2 = padTo2Digits(date2.getHours()) + ':' + padTo2Digits(date2.getMinutes());

                workerModelArray.push(hours1 + ' - ' + hours2);
            }
        }
    }
    if (workerID_array.length == 0)
    {
        $('.fSJtEaXwJSHzoxW').hide();
    }
    else
    {
        $('.fSJtEaXwJSHzoxW').show();
    }



    let workerModelArrayNew = [...new Set(workerModelArray)];
    workerModelArrayNew.sort();
    let avnythFRVEkXnim = document.querySelectorAll('.avnythFRVEkXnim');
    if (workerModelArrayNew.length > 0)
    {
        for (let i = 0; i < avnythFRVEkXnim.length; i++)
        {
            avnythFRVEkXnim[i].innerHTML = '';

            for (let j = 0; j < workerModelArrayNew.length; j++)
            {
                avnythFRVEkXnim[i].innerHTML += `<div onclick="MnoxFPIpMwcHhAv(this)" class="fuSYzGrTpqVVQXz">` + workerModelArrayNew[j] + `</div>`;
            }
        }

        let LwxRoYhfmyzTlGm = document.querySelectorAll('.LwxRoYhfmyzTlGm');
        for (let i = 0; i < LwxRoYhfmyzTlGm.length; i++)
        {
            let kqOeanWDDXEYTBz = LwxRoYhfmyzTlGm[i].querySelector('.kqOeanWDDXEYTBz');
            $(kqOeanWDDXEYTBz).show();
        }
    }
    else
    {
        let LwxRoYhfmyzTlGm = document.querySelectorAll('.LwxRoYhfmyzTlGm');
        for (let i = 0; i < LwxRoYhfmyzTlGm.length; i++)
        {
            let kqOeanWDDXEYTBz = LwxRoYhfmyzTlGm[i].querySelector('.kqOeanWDDXEYTBz');
            $(kqOeanWDDXEYTBz).hide();
        }
    }
    //
};
//arKOctcZVJhWuhL();
//-script is running in site.js





function kJYIwPwacgrxdrX()
{
    document.getElementById('IluduaIgOUVOGRf').value = '';

    //let e = document.getElementById('kRyEzzxRxADfSZj');
    //let e2 = e.options[e.selectedIndex].value;
    let e2 = null;
    if (sessionStorage.getItem('JcvzYoovBpGECWh') != null)
    {
        e2 = sessionStorage.getItem('JcvzYoovBpGECWh');
    }
    else 
    {
        e2 = $('#jxcqHOZgFmYHYkI_').attr('dep');
    }

    let f = document.getElementById('hdfoDuUOBPpvhSl');
    f.value = e2;


    let a = document.getElementById('hJQarhdVtvVBOnk');
    $(a).fadeIn(200);
};

function ydcXSyYYSvQPggQ(t)
{
    let gwyIDEzPzXYjfLE = sessionStorage.setItem('gwyIDEzPzXYjfLE', t.getAttribute('gwyIDEzPzXYjfLE'));
    let ttt = $(t).parent().children(':first').html();
    //document.getElementById('gPLPpoufGitmRJK').value = t.getAttribute('kCKFvozEWxUVxxp');
    document.getElementById('gPLPpoufGitmRJK').value = ttt;


    let iuCJIrClUqpPWfy = t.getAttribute('iuCJIrClUqpPWfy');
    let rFaJKmZDlbnwiBP = document.getElementById('rFaJKmZDlbnwiBP');

    if (iuCJIrClUqpPWfy == 0)
    {
        rFaJKmZDlbnwiBP.value = 'Wszyscy';
    }
    else
    {
        rFaJKmZDlbnwiBP.value = iuCJIrClUqpPWfy;
    }


    let a = document.getElementById('HrjQZZqwQjnGRuC');
    $(a).fadeIn(200);
};






//$('.EpPTURkmdIzOSnq').mousedown(function (e) {
//    console.log(e);
//});

function testtt()
{
    let EpPTURkmdIzOSnq = document.querySelectorAll('.EpPTURkmdIzOSnq');
    for (let i = 0; i < EpPTURkmdIzOSnq.length; i++)
    {
        //console.log(i);
        let id_ = EpPTURkmdIzOSnq[i].getAttribute('id2');
        EpPTURkmdIzOSnq[i].addEventListener('mousedown', function ()
        {
            console.log('asd');
            let user = document.querySelector('.user');
            let YgYDRNgkzyxgztO = document.querySelectorAll('.YgYDRNgkzyxgztO');

            for (let j = 0; j < YgYDRNgkzyxgztO.length; j++)
            {
                let id__ = YgYDRNgkzyxgztO[j].getAttribute('id2');
                if (id_ == id__)
                {
                    EpPTURkmdIzOSnq[i].style.cursor = 'grabbing';

                    $(YgYDRNgkzyxgztO[j]).draggable({
                        handle: EpPTURkmdIzOSnq[i],
                        snap: '.AQzCKqmlrQJmxzn',
                        snapMode: 'inner',
                        appendTo: 'body',
                        //scroll: false,
                        helper: 'clone',
                        start: function (event, ui)
                        {
                            //$(ui.helper).css('width', `${$(event.target).width()}px`);
                            $(ui.helper).css({ 'width': '260px', 'transform': 'translateX(0px)', 'background-color': 'rgba(34, 36, 48, 1)' });
                            $($(ui.helper).children('div').find('a')[0]).css('display', 'none');
                            $($(ui.helper).children('div').find('a')[1]).css('display', 'none');
                            $('.AQzCKqmlrQJmxzn').css({ 'background-color': 'rgba(255, 255, 255, 0.05)' });
                        }
                    });

                    $('.AQzCKqmlrQJmxzn').droppable({
                        drop: function (event, ui)
                        {
                            //$(this).append($(ui.helper).clone());
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
                            $(newItem).css('border-left', '4px solid rgb(36, 110, 142)');
                            $(newItem).append(`<a onclick="fuhYEhklpyusggn(this)" title="Usuń zadanie"><svg viewBox="0 0 469.404 469.404" height="12" width="12"><path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path></svg></a>`);




                            //wyłącz zmianę tygodnia
                            document.getElementById('uKdvKAhOhYwppOO').classList.add('hkyYYlXJPLaqBDt');
                            document.getElementById('JFUPeUjXoygHiiK').classList.add('hkyYYlXJPLaqBDt');
                            //
                            if ($(newItem).parent().parent().children().eq(0).children().eq(0).val() && $(newItem).parent().parent().children().eq(0).children().eq(2).val())
                            {

                                //włącz 'Zapisz zmiany' button
                                document.getElementById('PeAfgVTiQsbFhjt').classList.remove('fNPXdDDFqqbVOkt');
                                //
                                //window.location.hash = '?';
                            }
                        },
                        drag: function ()
                        {
                            var offset = $(this).offset();
                            var xPos = offset.left;
                            var yPos = offset.top;
                        },
                    });
                }


            }

            document.addEventListener('mouseup', function ()
            {
                for (let j = 0; j < YgYDRNgkzyxgztO.length; j++)
                {
                    EpPTURkmdIzOSnq[i].style.removeProperty('cursor');
                }
                $('.AQzCKqmlrQJmxzn').css('background-color', '');
            });
        });
    }
};
testtt();






function dpxpJkwLFcKTpet()
{
    let LwxRoYhfmyzTlGm = document.querySelectorAll('.LwxRoYhfmyzTlGm');
    let changesArray = [];
    for (let z = 0; z < LwxRoYhfmyzTlGm.length; z++)
    {
        let d_ = LwxRoYhfmyzTlGm[z].getAttribute('date');
        let w_ = LwxRoYhfmyzTlGm[z].getAttribute('worker');
        let jStart_ = LwxRoYhfmyzTlGm[z].querySelectorAll('input')[0].value;
        let jEnd_ = LwxRoYhfmyzTlGm[z].querySelectorAll('input')[1].value;

        if (jStart_ != '' && jEnd_ != '')
        {
            for (let y = 0; y < model_t.length; y++)
            {
                let id_Model = model_t[y].Id;
                let workerID_Model = model_t[y].WorkerID;
                let date_Model = model_t[y].Date.split('T')[0];
                let jobStart_Model = new Date(model_t[y].JobStart);
                let jobEnd_Model = new Date(model_t[y].JobEnd);

                let jobStart_Modelnew = padTo2Digits(jobStart_Model.getHours()) + ':' + padTo2Digits(jobStart_Model.getMinutes());
                let jobEnd_Modelnew = padTo2Digits(jobEnd_Model.getHours()) + ':' + padTo2Digits(jobEnd_Model.getMinutes());


                if (w_ == workerID_Model && d_ == date_Model && jStart_ != jobStart_Modelnew && jEnd_ != jobEnd_Modelnew)
                {
                    changesArray.push({ id: id_Model, jobStart: date_Model + ' ' + jStart_, jobEnd: date_Model + ' ' + jEnd_ });
                }
                else if (w_ == workerID_Model && d_ == date_Model && jStart_ == jobStart_Modelnew && jEnd_ != jobEnd_Modelnew)
                {
                    changesArray.push({ id: id_Model, jobStart: date_Model + ' ' + jStart_, jobEnd: date_Model + ' ' + jEnd_ });
                }
                else if (w_ == workerID_Model && d_ == date_Model && jStart_ != jobStart_Modelnew && jEnd_ == jobEnd_Modelnew)
                {
                    changesArray.push({ id: id_Model, jobStart: date_Model + ' ' + jStart_, jobEnd: date_Model + ' ' + jEnd_ });
                }
            }
        }
    }

    if (changesArray.length > 0)
    {
        for (let z = 0; z < changesArray.length; z++)
        {
            let id_ = changesArray[z].id;
            let jobStart_ = changesArray[z].jobStart;
            let jobEnd_ = changesArray[z].jobEnd;

            $.ajax({
                type: 'POST',
                url: '/Tasks/EditTask',
                data: {
                    id: id_,
                    jobStart: jobStart_,
                    jobEnd: jobEnd_
                },
                success: function (response)
                {

                },
                error: function (xhr, status, error)
                {
                    console.log('Error updating data:', error);
                }
            });

        }
    }
};

function MAQLaRkPpbPPjIH() 
{
    let wcHMgjWjXaRMPKy = document.querySelectorAll('.wcHMgjWjXaRMPKy');
    for (let i = 0; i < wcHMgjWjXaRMPKy.length; i++)
    {
        let workerID_ = wcHMgjWjXaRMPKy[i].getAttribute('worker');//

        let SBVWNWOJZnTplXL = wcHMgjWjXaRMPKy[i].querySelectorAll('.SBVWNWOJZnTplXL');
        for (let j = 0; j < SBVWNWOJZnTplXL.length; j++)
        {
            let date_ = SBVWNWOJZnTplXL[j].getAttribute('date');//
            let jobStart_ = SBVWNWOJZnTplXL[j].querySelectorAll('.LwxRoYhfmyzTlGm input')[0].value;//
            let jobEnd_ = SBVWNWOJZnTplXL[j].querySelectorAll('.LwxRoYhfmyzTlGm input')[1].value;//
            let YgYDRNgkzyxgztO = SBVWNWOJZnTplXL[j].querySelectorAll('.AQzCKqmlrQJmxzn .YgYDRNgkzyxgztO');

            if (jobStart_ != '' && jobEnd_ != '')
            {
                for (let k = 0; k < YgYDRNgkzyxgztO.length; k++)
                {
                    if (YgYDRNgkzyxgztO[k].hasAttribute('id2'))
                    {
                        let taskNameID_ = YgYDRNgkzyxgztO[k].getAttribute('id2');
                        if (taskNameID_ != null)
                        {
                            let dateJobStart = date_ + ' ' + jobStart_;
                            let dateJobEnd = date_ + ' ' + jobEnd_;

                            $.ajax({
                                type: 'POST',
                                url: '/Tasks/AddTasks',
                                data: {
                                    workerID: workerID_,
                                    taskNameID: taskNameID_,
                                    date: date_,
                                    jobStart: dateJobStart,
                                    jobEnd: dateJobEnd
                                },
                                success: function (response)
                                {

                                },
                                error: function (xhr, status, error)
                                {
                                    console.log('Error adding data:', error);
                                }
                            });

                            //console.log(workerID_, taskNameID_, date_, dateJobStart, dateJobEnd);
                        }
                    }
                }
            }
        }
    }
};

function kLqdFLvjJrKETlK(t)
{
    $(t).children(':first').html('Zapisywanie');
    var dots = window.setInterval(function ()
    {
        var wait = document.getElementById("jSxkTLkOwolIQOG");
        if (wait.innerHTML.length > 4)
            wait.innerHTML = "";
        else
            wait.innerHTML += ".";
    }, 200);


    $('.loader_div').fadeIn(200);


    MAQLaRkPpbPPjIH();
    dpxpJkwLFcKTpet();


    setTimeout(function ()
    {
        location.reload();
    }, 250);
};





function fuhYEhklpyusggn(t)
{
    $(t).parent().remove();
};

function rURQfWmsrmzXwCV()
{
    let e = document.getElementById('hJQarhdVtvVBOnk');
    $(e).fadeOut(200);
};

function wNvCTiOzGLwtsaX()
{
    let e = document.getElementById('HrjQZZqwQjnGRuC');
    $(e).fadeOut(200);
};

function zGWGBXreWGtGNcS()
{
    let name_ = document.getElementById('IluduaIgOUVOGRf').value;
    let e = document.getElementById('hdfoDuUOBPpvhSl');
    let id_ = e.options[e.selectedIndex].value;

    $.ajax({
        type: 'POST',
        url: '/TaskName2/AddTask',
        data: {
            name: name_,
            departmentID: id_
        },
        success: function (response)
        {
            //location.reload();
            //nfLIRJNjWZmLKJe
            //YgYDRNgkzyxgztO

            document.querySelector('.nfLIRJNjWZmLKJe').innerHTML += `<div class="YgYDRNgkzyxgztO" id2="` + response.id + `" id="` + response.departmentID + `" >`
                + `<svg class="EpPTURkmdIzOSnq" id2="` + response.id + `" viewBox="0 0 20 20" height="20" width="20"><path d="M2.5 8C1.94772 8 1.5 7.55228 1.5 7C1.5 6.44772 1.94772 6 2.5 6H17.5C18.0523 6 18.5 6.44772 18.5 7C18.5 7.55228 18.0523 8 17.5 8H2.5Z" /><path d="M2.5 11.25C1.94772 11.25 1.5 10.8023 1.5 10.25C1.5 9.69772 1.94772 9.25 2.5 9.25H17.5C18.0523 9.25 18.5 9.69772 18.5 10.25C18.5 10.8023 18.0523 11.25 17.5 11.25H2.5Z" /><path d="M2.5 14.5C1.94772 14.5 1.5 14.0523 1.5 13.5C1.5 12.9477 1.94772 12.5 2.5 12.5H17.5C18.0523 12.5 18.5 12.9477 18.5 13.5C18.5 14.0523 18.0523 14.5 17.5 14.5H2.5Z" /></svg>`
                + `<div class="uESYaZNLlshNOzd">`
                + `<span>` + response.name + `</span>`
                + `<a onclick="ydcXSyYYSvQPggQ(this)" gwyIDEzPzXYjfLE="` + response.id + `" kCKFvozEWxUVxxp="` + response.name + `" iuCJIrClUqpPWfy="` + response.departmentID + `" title="Edytuj"><svg viewBox="0 0 512 512" height="12" width="12"><path class="st0" d="M494.56,55.774l-38.344-38.328c-23.253-23.262-60.965-23.253-84.226,0l-35.878,35.878l122.563,122.563l35.886-35.878C517.814,116.747,517.814,79.044,494.56,55.774z" /><polygon class="st0" points="0,389.435 0,511.998 122.571,511.998 425.246,209.314 302.691,86.751 	" /></svg></a>`
                + `<a onclick="pXwvhczxXMKKzWB(this)" WYxbaolkBNcDokP="` + response.id + `" title="Usuń"><svg viewBox="0 0 469.404 469.404" height="12" width="12"><path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path></svg></a>`
                + `</div>`
                + `</div>`;

            let a = document.getElementById('hJQarhdVtvVBOnk');
            $(a).fadeOut(200);
            testtt();
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function CaomIrxdWJchcOk()
{
    let id_ = sessionStorage.getItem('gwyIDEzPzXYjfLE');
    let name_ = document.getElementById('gPLPpoufGitmRJK').value;
    let department_ = document.getElementById('rFaJKmZDlbnwiBP');
    let department__ = department_.options[department_.selectedIndex].value;

    $.ajax({
        type: 'POST',
        url: '/TaskName2/EditTask',
        data: {
            id: id_,
            name: name_,
            departmentID: department__
        },
        success: function (response)
        {
            //location.reload();
            let YgYDRNgkzyxgztO = document.querySelectorAll('.YgYDRNgkzyxgztO');
            for (let i = 0; i < YgYDRNgkzyxgztO.length; i++)
            {
                if (YgYDRNgkzyxgztO[i].getAttribute('id2') == id_)
                {
                    let uESYaZNLlshNOzd = YgYDRNgkzyxgztO[i].querySelector('.uESYaZNLlshNOzd span');
                    uESYaZNLlshNOzd.innerHTML = response.name;
                }
            }


            let ZslufbFdcfCIeaW = document.querySelectorAll('.ZslufbFdcfCIeaW');
            for (let j = 0; j < ZslufbFdcfCIeaW.length; j++)
            {
                if (ZslufbFdcfCIeaW[j].getAttribute('id2') == id_)
                {
                    let span = ZslufbFdcfCIeaW[j].querySelector('span');
                    span.innerHTML = response.name;
                }
            }


            let e = document.getElementById('HrjQZZqwQjnGRuC');
            $(e).fadeOut(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error updating data:', error);
        }
    });
};

function pXwvhczxXMKKzWB(t)
{
    sessionStorage.setItem('RvZcwuWaUQIUZUS', t.getAttribute('WYxbaolkBNcDokP'));

    document.getElementById('cKSpcSCmKURLYSF').innerHTML = 'Czy na pewno chcesz usunąć ' + $(t).parent().children().eq(0).html() + '?';

    let YUkuEpVsBmYTtjN = document.getElementById('YUkuEpVsBmYTtjN');
    $(YUkuEpVsBmYTtjN).fadeIn(200);
};

function spDekwIzyQklvGF()
{
    let YUkuEpVsBmYTtjN = document.getElementById('YUkuEpVsBmYTtjN');
    $(YUkuEpVsBmYTtjN).fadeOut(200);
};

function aDkOgungYCvMbHN()
{
    let id_ = sessionStorage.getItem('RvZcwuWaUQIUZUS');

    $.ajax({
        type: 'POST',
        url: '/TaskName2/RemoveTask',
        data: {
            id: id_,
        },
        success: function (response)
        {
            let YgYDRNgkzyxgztO = document.querySelectorAll('.YgYDRNgkzyxgztO');
            for (let i = 0; i < YgYDRNgkzyxgztO.length; i++)
            {
                if (YgYDRNgkzyxgztO[i].getAttribute('id2') == id_)
                {
                    $(YgYDRNgkzyxgztO[i]).remove();
                }
            }


            let ZslufbFdcfCIeaW = document.querySelectorAll('.ZslufbFdcfCIeaW');
            for (let i = 0; i < ZslufbFdcfCIeaW.length; i++)
            {
                if (ZslufbFdcfCIeaW[i].getAttribute('id2') == id_)
                {
                    let wghrtajuyftswfc = $(ZslufbFdcfCIeaW[i]).children().eq(1).attr('wghrtajuyftswfc');

                    $.ajax({
                        type: 'POST',
                        url: '/Tasks/RemoveTask',
                        async: false,
                        data: {
                            id: wghrtajuyftswfc,
                        },
                        success: function (response)
                        {
                            $(ZslufbFdcfCIeaW[i]).remove();

                            let YUkuEpVsBmYTtjN = document.getElementById('YUkuEpVsBmYTtjN');
                            $(YUkuEpVsBmYTtjN).fadeOut(200);
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error removing data:', error);
                        }
                    });
                }
            }
        },
        error: function (xhr, status, error)
        {
            alert('Error removing data:', error);
        }
    });
};

function mhzWFFdkOFYMLsP(t)
{
    let id_ = t.getAttribute('WghrTajUyfTSWFc');

    $.ajax({
        type: 'POST',
        url: '/Tasks/RemoveTask',
        data: {
            id: id_,
        },
        success: function (response)
        {
            $(t).parent().remove();
        },
        error: function (xhr, status, error)
        {
            //console.log('Error removing data:', error);
            alert('Error removing data:', error);
        }
    });
};



function SnVgWOTEsLEUbKu(t)
{
    let w = t.getAttribute('worker');
    let d = t.getAttribute('date');
    let avnythFRVEkXnim = document.querySelectorAll('.avnythFRVEkXnim');
    let kqOeanWDDXEYTBz = document.querySelectorAll('.kqOeanWDDXEYTBz');



    for (let j = 0; j < kqOeanWDDXEYTBz.length; j++)
    {
        kqOeanWDDXEYTBz[j].innerHTML = '<svg viewBox="0 0 10 6" width="10" height="6"><path d="M0 0h10L5 6z"></path></svg>';
        kqOeanWDDXEYTBz[j].setAttribute('onclick', 'SnVgWOTEsLEUbKu(this)');
        kqOeanWDDXEYTBz[j].style.removeProperty('background-color');
    }



    for (let i = 0; i < avnythFRVEkXnim.length; i++)
    {
        let w2 = avnythFRVEkXnim[i].getAttribute('worker');
        let d2 = avnythFRVEkXnim[i].getAttribute('date');

        $(avnythFRVEkXnim[i]).hide();

        if (w == w2 && d == d2)
        {
            $(avnythFRVEkXnim[i]).show();
            t.innerHTML = '<svg viewBox="0 0 10 6" width="10" height="6"><path d="M0 6h10L5 0z"></path></svg>';
            t.setAttribute('onclick', 'VSalvFSAeCOdsNG(this)');
            t.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }
        else
        {
            $(avnythFRVEkXnim[i]).hide();
        }
    }
};

function VSalvFSAeCOdsNG(t)
{
    let w = t.getAttribute('worker');
    let d = t.getAttribute('date');
    t.innerHTML = '<svg viewBox="0 0 10 6" width="10" height="6"><path d="M0 0h10L5 6z"></path></svg>';
    t.style.removeProperty('background-color');

    let avnythFRVEkXnim = document.querySelectorAll('.avnythFRVEkXnim');
    for (let i = 0; i < avnythFRVEkXnim.length; i++)
    {
        let w2 = avnythFRVEkXnim[i].getAttribute('worker');
        let d2 = avnythFRVEkXnim[i].getAttribute('date');

        if (w == w2 && d == d2)
        {
            $(avnythFRVEkXnim[i]).hide();
            t.setAttribute('onclick', 'SnVgWOTEsLEUbKu(this)');
        }
    }
};

function MnoxFPIpMwcHhAv(t)
{

    if ($(t).parent().parent().parent().children().eq(1).children(':visible').length > 0)
    {

        //wyłącz zmianę tygodnia
        document.getElementById('uKdvKAhOhYwppOO').classList.add('hkyYYlXJPLaqBDt');
        document.getElementById('JFUPeUjXoygHiiK').classList.add('hkyYYlXJPLaqBDt');
        //

        //włącz 'Zapisz zmiany' button
        document.getElementById('PeAfgVTiQsbFhjt').classList.remove('fNPXdDDFqqbVOkt');
        //
        //window.location.hash = '?';
    }




    let input1_ = t.innerHTML.split(' - ')[0];
    let input2_ = t.innerHTML.split(' - ')[1];

    let parentWorker = $(t).parent().attr("worker");
    let parentDate = $(t).parent().attr("date");

    let LwxRoYhfmyzTlGm = document.querySelectorAll('.LwxRoYhfmyzTlGm');
    for (let i = 0; i < LwxRoYhfmyzTlGm.length; i++)
    {
        if (LwxRoYhfmyzTlGm[i].getAttribute('worker') == parentWorker && LwxRoYhfmyzTlGm[i].getAttribute('date') == parentDate)
        {
            let input1 = LwxRoYhfmyzTlGm[i].querySelectorAll('input')[0];
            let input2 = LwxRoYhfmyzTlGm[i].querySelectorAll('input')[1];

            input1.value = input1_;
            input2.value = input2_;
            //$(LwxRoYhfmyzTlGm[i]).css({ 'background-color': 'rgba(107, 197, 108, 0.2)' });
        }
    }

    $(t).parent().hide();
    let kqOeanWDDXEYTBz = document.querySelectorAll('.kqOeanWDDXEYTBz');
    for (let j = 0; j < kqOeanWDDXEYTBz.length; j++)
    {
        kqOeanWDDXEYTBz[j].innerHTML = '<svg viewBox="0 0 10 6" width="10" height="6"><path d="M0 0h10L5 6z"></path></svg>';
        kqOeanWDDXEYTBz[j].setAttribute('onclick', 'SnVgWOTEsLEUbKu(this)');
        kqOeanWDDXEYTBz[j].style.removeProperty('background-color');
    }
};



function szWBomtrGKAViBb(t, e)
{

    let LwxRoYhfmyzTlGm = $(t).children().eq(0);
    let AQzCKqmlrQJmxzn = $(t).children().eq(1);

    let input1 = $(LwxRoYhfmyzTlGm).children().eq(0).val(); //godzina od
    let input2 = $(LwxRoYhfmyzTlGm).children().eq(2).val(); //godzina do
    let date_ = t.getAttribute('date'); //data
    let workerID = $(t).parent().attr('worker');


    if (input1 != '' && input2 != '') //dla tych co juz istnieją w bazie i potrzebna jest aktualizacja
    {
        let AQzCKqmlrQJmxzn_children = $(AQzCKqmlrQJmxzn).children();
        for (let i = 0; i < AQzCKqmlrQJmxzn_children.length; i++)
        {
            if ($(AQzCKqmlrQJmxzn_children[i]).hasClass('YgYDRNgkzyxgztO'))
            {
                //$(t).children().eq(2).show();
                //setTimeout(function(){
                //    $(t).children().eq(2).hide();
                //},3000)


                //let first = $(t).children().eq(0);
                //let second = $(t).children().eq(1);
                //let third = $(t).children().eq(2);

                //$(t).children().eq(0).hide();
                //$(t).children().eq(1).hide();
                //$(t).children().eq(2).show();
                //


                //$(t).hide();

                let asd = $(t).parent().children(':even').not(':first');

                for (let j = 0; j < asd.length; j++)
                {
                    if (asd[j].getAttribute('date') == t.getAttribute('date'))
                    {
                        //$(t).hide();
                        //$(asd[j]).show();

                        ////console.log($(AQzCKqmlrQJmxzn_children[i]));

                        ////setTimeout(function(){
                        ////    $(t).hide();
                        ////    $(asd[j]).show();
                        ////    console.log($(AQzCKqmlrQJmxzn_children[i]));
                        ////}, 1500)
                        ////MAQLaRkPpbPPjIH();
                        ////dpxpJkwLFcKTpet();

                    }
                }
            }
        }
    }
};

function HSuokUFEKzccQCK(t)
{
    let value1 = t.value;
    let value2 = $(t).parent().children().eq(2).val();

    if (value2 != '')
    {
        if ($(t).parent().parent().children().eq(1).children(':visible').length > 0) //
        {

            //wyłącz zmianę tygodnia
            document.getElementById('uKdvKAhOhYwppOO').classList.add('hkyYYlXJPLaqBDt');
            document.getElementById('JFUPeUjXoygHiiK').classList.add('hkyYYlXJPLaqBDt');
            //

            //włącz 'Zapisz zmiany' button
            document.getElementById('PeAfgVTiQsbFhjt').classList.remove('fNPXdDDFqqbVOkt');
            //
            //window.location.hash = '?';
        }
    }

};

function UrLQumgARjxLfGF(t)
{
    let value1 = $(t).parent().children().eq(0).val(); //input1
    let value2 = t.value; //input2

    if (value1 != '')
    {
        if ($(t).parent().parent().children().eq(1).children(':visible').length > 0) //
        {


            //wyłącz zmianę tygodnia
            document.getElementById('uKdvKAhOhYwppOO').classList.add('hkyYYlXJPLaqBDt');
            document.getElementById('JFUPeUjXoygHiiK').classList.add('hkyYYlXJPLaqBDt');
            //

            //włącz 'Zapisz zmiany' button
            document.getElementById('PeAfgVTiQsbFhjt').classList.remove('fNPXdDDFqqbVOkt');
            //
            //window.location.hash = '?';
        }
    }




    let arrayEdit = [];
    let div = null;
    let loader = null;

    if (value2 != '') 
    {
        if (value1)
        {
            //console.log('OK');
            if ($(t).parent().parent().children().eq(1).children().length > 0)
            {

                let lzfFwBKdGEtuYUv = $(t).parent().parent().parent().children(':even').not(':first'); //lzfFwBKdGEtuYUv - loading div
                let date_ = $(t).parent().attr('date'); //LwxRoYhfmyzTlGm - date


                let abc = $(t).parent().parent().children().eq(1).children();
                for (let c = 0; c < abc.length; c++)
                {
                    if ($(abc[c]).hasClass('ZslufbFdcfCIeaW'))//dla tych co juz istnieją w bazie i potrzebna jest aktualizacja
                    {
                        for (let i = 0; i < lzfFwBKdGEtuYUv.length; i++)
                        {
                            if (date_ == $(lzfFwBKdGEtuYUv[i]).attr('date'))
                            {
                                div = $(t).parent().parent();
                                loader = $(lzfFwBKdGEtuYUv[i]);

                                //MAQLaRkPpbPPjIH();
                                //dpxpJkwLFcKTpet();

                                setTimeout(function ()
                                {
                                    let wghrtajuyftswfc = $(abc[c]).children().eq(1).attr('wghrtajuyftswfc'); //id
                                    let jS = date_ + ' ' + value1; //jobStart
                                    let jE = date_ + ' ' + value2; //jobEnd

                                    arrayEdit.push({ id_: wghrtajuyftswfc, jobStart_: jS, jobEnd: jE });
                                }, 1500);


                            }
                        }
                    }
                    else //nowe wpisy
                    {
                        for (let i = 0; i < lzfFwBKdGEtuYUv.length; i++)
                        {
                            if (date_ == $(lzfFwBKdGEtuYUv[i]).attr('date'))
                            {
                                //$.ajax({
                                //    type: 'POST',
                                //    url: '/Tasks/AddTasks',
                                //    data: {
                                //        workerID: workerID_,
                                //        taskNameID: taskNameID_,
                                //        date: date_,
                                //        jobStart: dateJobStart,
                                //        jobEnd: dateJobEnd
                                //    },
                                //    success: function (response)
                                //    {

                                //    },
                                //    error: function (xhr, status, error)
                                //    {
                                //        console.log('Error adding data:', error);
                                //    }
                                //});







                            }
                        }
                    }
                }



            }
        }
    }


    if (arrayEdit != null)
    {
        setTimeout(function ()
        {
            //$(div).hide();
            //$(loader).show();

            //console.log(arrayEdit);

            for (let i = 0; i < arrayEdit.length; i++)
            {


                //$.ajax({
                //    type: 'POST',
                //    url: '/Tasks/EditTask',
                //    data: {
                //        id: arrayEdit[i].id_,
                //        jobStart: arrayEdit[i].jobStart_,
                //        jobEnd: arrayEdit[i].jobEnd_
                //    },
                //    success: function (response)
                //    {
                //        $(div).show();
                //        $(loader).hide();
                //    },
                //    error: function (xhr, status, error)
                //    {
                //        //console.log('Error updating data:', error);
                //        alert('Error updating data:', error);
                //    }
                //});
            }
        }, 2000);
    }

};


$(document).ready(function ()
{
    //var uri = window.location.toString();
    //if (uri.indexOf("#") > 0)
    //{
    //    var clean_uri = uri.substring(0,
    //        uri.indexOf("#"));

    //    window.history.replaceState({},
    //        document.title, clean_uri);

    //    sessionStorage.removeItem('url');
    //}
    //else{
    //    sessionStorage.setItem('url' , uri);
    //}


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

//window.addEventListener('popstate', funkcja);

//function funkcja () {
//    if (sessionStorage.getItem('url') == window.location.toString())
//    {
//        //alert();
//        $('#LwwlygAZbajHYIb').show();
//    }
//};

//function iLamqpKjJfYwsCa() {
//    sessionStorage.removeItem('url');
//    $('#PeAfgVTiQsbFhjt').trigger('click');
//    $('#LwwlygAZbajHYIb').fadeOut(200);
//};

//function qaVyBCsukshoMvN() {
//    sessionStorage.removeItem('url');
//};

function BgMujOvGVhgxcrK()
{
    //document.body.innerHTML += '<a id="dlink" style="display:none;"></a>';
    //tableToExcel('table', 'Arkusz1', 'text.xls');
    alert('nie działa');
};

function FvEKesXHjbxXQEL()
{
    drmZhscxvPoxiya();
};
















function lhkKNaastOkkmMh(t)
{
    ////let index = $(t).index() + 1;
    ////let settings_aS = document.querySelectorAll('.settings_a');
    ////for (index; index < settings_aS.length; index++) 
    ////{
    ////    //$(settings_aS[index]).hide();
    ////}
    ////<ion-icon name="chevron-up-outline"></ion-icon>
    ////<ion-icon name="chevron-down-outline"></ion-icon>


    //let settings_a = document.querySelectorAll('.settings_a');
    //for (let i = 0; i < settings_a.length; i++) 
    //{
    //    $(settings_a[i]).children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');
    //    $(settings_a[i]).removeClass('pAPTryUdWHeiZZa');
    //}
    //let ugiECcrnKwaoVsb = document.querySelectorAll('.ugiECcrnKwaoVsb');
    //for (let i = 0; i < ugiECcrnKwaoVsb.length; i++) 
    //{
    //    $(ugiECcrnKwaoVsb[i]).remove();
    //}

    $(t).children('.settings_a_select').children('ion-icon').attr('name', 'chevron-up-outline');
};

function MkoKdHskxQLfcuP()
{
    if (!$('#MkoKdHskxQLfcuP_').hasClass('pAPTryUdWHeiZZa')) 
    {
        let html = '';
        let date = new Date();
        let prevYears = date.getFullYear() - 2;
        for (prevYears; prevYears <= date.getFullYear(); prevYears++) 
        {
            html += `<div onclick="CanjEZFvPetVidb(this)" class="settings_a ugiECcrnKwaoVsb" id="MkoKdHskxQLfcuP__">` +
                `<div class="settings_a_select">` +
                `<span></span><span style="opacity: 1; margin-right: 20px;">` + prevYears + `</span>` +
                `</div>` +
                `</div>`;
        }
        $('#MkoKdHskxQLfcuP_').after(html);



        let MkoKdHskxQLfcuP__ = document.querySelectorAll('#MkoKdHskxQLfcuP__');
        for (let i = 0; i < MkoKdHskxQLfcuP__.length; i++) 
        {
            if (sessionStorage.getItem('LTRXohWjonyFAsg') != null)
            {
                if ($(MkoKdHskxQLfcuP__[i]).children('.settings_a_select').children('span').eq(1).html() == sessionStorage.getItem('LTRXohWjonyFAsg')) 
                {
                    $(MkoKdHskxQLfcuP__[i]).addClass('QbNQbKEvEMUpWaH');
                }
            }
            else 
            {
                if ($(MkoKdHskxQLfcuP__[i]).children('.settings_a_select').children('span').eq(1).html() == date.getFullYear()) 
                {
                    $(MkoKdHskxQLfcuP__[i]).addClass('QbNQbKEvEMUpWaH');
                }
            }
        }

        $('#MkoKdHskxQLfcuP_').addClass('pAPTryUdWHeiZZa');
    }
    else 
    {
        let MkoKdHskxQLfcuP__ = document.querySelectorAll('#MkoKdHskxQLfcuP__');
        for (let i = 0; i < MkoKdHskxQLfcuP__.length; i++) {
            $(MkoKdHskxQLfcuP__[i]).remove();
        }

        $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');

        $('#MkoKdHskxQLfcuP_').removeClass('pAPTryUdWHeiZZa');
    }
};

function CanjEZFvPetVidb(t) 
{
    let year = $(t).children('.settings_a_select').children('span').eq(1).html();
    $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html(year);

    let MkoKdHskxQLfcuP__ = document.querySelectorAll('#MkoKdHskxQLfcuP__');
    for (let i = 0; i < MkoKdHskxQLfcuP__.length; i++) {
        $(MkoKdHskxQLfcuP__[i]).removeClass('QbNQbKEvEMUpWaH');
    }
    $(t).addClass('QbNQbKEvEMUpWaH');

    sessionStorage.setItem('LTRXohWjonyFAsg', $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html());

    drmZhscxvPoxiya();
};

function fssIiZoJOhPhaRO() 
{
    if (!$('#fssIiZoJOhPhaRO_').hasClass('pAPTryUdWHeiZZa'))
    {
        let html = '';
        let date = new Date();
        let year_ = $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html();
        if (sessionStorage.getItem('LTRXohWjonyFAsg') != null)
        {
            year_ = sessionStorage.getItem('LTRXohWjonyFAsg');
        }
        let month_ = date.getMonth() + 1;
        let day_ = date.getDate();

        $.ajax({
            type: 'GET',
            url: '/Tasks/WeeksInYear',
            data: {
                year: year_,
                month: month_,
                day: day_
            },
            success: function (response) 
            {
                for (const [key, value] of Object.entries(response)) 
                {
                    if (key == 'weeks') 
                    {
                        for (let i = 1; i <= value; i++)
                        {
                            html += `<div onclick="XyLurmdtOTQYvZU(this)" class="settings_a ugiECcrnKwaoVsb" id="fssIiZoJOhPhaRO__">` +
                                `<div class="settings_a_select">` +
                                `<span></span><span style="opacity: 1; margin-right: 20px;">` + i + `</span>` +
                                `</div>` +
                                `</div>`;
                        }
                        $('#fssIiZoJOhPhaRO_').after(html);

                    }
                    if (key == 'currentWeek') 
                    {
                        //
                        let fssIiZoJOhPhaRO__ = document.querySelectorAll('#fssIiZoJOhPhaRO__');
                        for (let i = 0; i < fssIiZoJOhPhaRO__.length; i++) 
                        {
                            let span = $(fssIiZoJOhPhaRO__[i]).children('.settings_a_select').children('span').eq(1).html();
                            if (span == value + 1) 
                            {
                                if (sessionStorage.getItem('hQxHXfkxHkfALTJ') == null) 
                                {
                                    $(fssIiZoJOhPhaRO__[i]).addClass('QbNQbKEvEMUpWaH');
                                }

                            }
                        }
                    }
                }

                let fssIiZoJOhPhaRO__ = document.querySelectorAll('#fssIiZoJOhPhaRO__');
                for (let i = 0; i < fssIiZoJOhPhaRO__.length; i++) 
                {
                    if (sessionStorage.getItem('hQxHXfkxHkfALTJ') != null)
                    {
                        if ($(fssIiZoJOhPhaRO__[i]).children('.settings_a_select').children('span').eq(1).html() == sessionStorage.getItem('hQxHXfkxHkfALTJ')) 
                        {
                            $(fssIiZoJOhPhaRO__[i]).addClass('QbNQbKEvEMUpWaH');
                        }
                    }
                    //else 
                    //{
                    //    if ($(fssIiZoJOhPhaRO__[i]).children('.settings_a_select').children('span').eq(1).html() == date.getFullYear()) 
                    //    {
                    //        $(fssIiZoJOhPhaRO__[i]).addClass('QbNQbKEvEMUpWaH');
                    //    }
                    //}
                }

                $('#fssIiZoJOhPhaRO_').addClass('pAPTryUdWHeiZZa');
            },
            error: function (xhr, status, error)
            {
                console.log('Error getting data:', error);
            }
        });
    }
    else 
    {
        let fssIiZoJOhPhaRO__ = document.querySelectorAll('#fssIiZoJOhPhaRO__');
        for (let i = 0; i < fssIiZoJOhPhaRO__.length; i++)
        {
            $(fssIiZoJOhPhaRO__[i]).remove();
        }

        $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');

        $('#fssIiZoJOhPhaRO_').removeClass('pAPTryUdWHeiZZa');
    }
};

function XyLurmdtOTQYvZU(t) 
{
    let week = $(t).children('.settings_a_select').children('span').eq(1).html();
    $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html(week);

    let fssIiZoJOhPhaRO__ = document.querySelectorAll('#fssIiZoJOhPhaRO__');
    for (let i = 0; i < fssIiZoJOhPhaRO__.length; i++)
    {
        $(fssIiZoJOhPhaRO__[i]).removeClass('QbNQbKEvEMUpWaH');
    }
    $(t).addClass('QbNQbKEvEMUpWaH');

    sessionStorage.setItem('hQxHXfkxHkfALTJ', $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html());

    drmZhscxvPoxiya();
};

function jxcqHOZgFmYHYkI() 
{
    if (!$('#jxcqHOZgFmYHYkI_').hasClass('pAPTryUdWHeiZZa')) 
    {
        let html = '';
        model_d.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
        for (let i = 0; i < model_d.length; i++) 
        {
            html += `<div onclick="HMdMMtqNwVAguDt(this)" class="settings_a ugiECcrnKwaoVsb" id="jxcqHOZgFmYHYkI__" dep="` + model_d[i].Id + `">` +
                `<div class="settings_a_select">` +
                `<span></span><span style="opacity: 1; margin-right: 20px;">` + model_d[i].Name + `</span>` +
                `</div>` +
                `</div>`;
        }
        $('#jxcqHOZgFmYHYkI_').after(html);

        let jxcqHOZgFmYHYkI__ = document.querySelectorAll('#jxcqHOZgFmYHYkI__');
        for (let i = 0; i < jxcqHOZgFmYHYkI__.length; i++) 
        {
            if (sessionStorage.getItem('JcvzYoovBpGECWh') != null)
            {
                if ($(jxcqHOZgFmYHYkI__[i]).attr('dep') == sessionStorage.getItem('JcvzYoovBpGECWh')) 
                {
                    $(jxcqHOZgFmYHYkI__[i]).addClass('QbNQbKEvEMUpWaH');
                }
            }
            else 
            {
                //if ($(fssIiZoJOhPhaRO__[i]).children('.settings_a_select').children('span').eq(1).html() == date.getFullYear()) 
                //{
                //    $(fssIiZoJOhPhaRO__[i]).addClass('QbNQbKEvEMUpWaH');
                //}
                $(jxcqHOZgFmYHYkI__[0]).addClass('QbNQbKEvEMUpWaH');
            }
        }

        $('#jxcqHOZgFmYHYkI_').addClass('pAPTryUdWHeiZZa');
    }
    else 
    {
        let jxcqHOZgFmYHYkI__ = document.querySelectorAll('#jxcqHOZgFmYHYkI__');
        for (let i = 0; i < jxcqHOZgFmYHYkI__.length; i++)
        {
            $(jxcqHOZgFmYHYkI__[i]).remove();
        }

        $('#jxcqHOZgFmYHYkI_').children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');

        $('#jxcqHOZgFmYHYkI_').removeClass('pAPTryUdWHeiZZa');
    }
};

function HMdMMtqNwVAguDt(t) 
{
    let dzial = $(t).children('.settings_a_select').children('span').eq(1).html();
    $('#jxcqHOZgFmYHYkI_').children('.settings_a_select').children('span').eq(1).html(dzial);
    $('#jxcqHOZgFmYHYkI_').attr('dep', t.getAttribute('dep'));

    let jxcqHOZgFmYHYkI__ = document.querySelectorAll('#jxcqHOZgFmYHYkI__');
    for (let i = 0; i < jxcqHOZgFmYHYkI__.length; i++)
    {
        $(jxcqHOZgFmYHYkI__[i]).removeClass('QbNQbKEvEMUpWaH');
    }
    $(t).addClass('QbNQbKEvEMUpWaH');

    //sessionStorage.setItem('JcvzYoovBpGECWh', $('#jxcqHOZgFmYHYkI_').children('.settings_a_select').children('span').eq(1).html());
    sessionStorage.setItem('JcvzYoovBpGECWh', t.getAttribute('dep'));

    //drmZhscxvPoxiya();
    arKOctcZVJhWuhL();



    //clear taskNames
    let ekzMacYlAMvOgoy__ = document.querySelectorAll('#ekzMacYlAMvOgoy__');
    for (let i = 0; i < ekzMacYlAMvOgoy__.length; i++)
    {
        $(ekzMacYlAMvOgoy__[i]).remove();
    }
    $('#ekzMacYlAMvOgoy_').children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');
    $('#ekzMacYlAMvOgoy_').removeClass('pAPTryUdWHeiZZa');
};

function ekzMacYlAMvOgoy() 
{
    if (!$('#ekzMacYlAMvOgoy_').hasClass('pAPTryUdWHeiZZa'))
    {
        let html = '';

        let depID = '';
        if (sessionStorage.getItem('JcvzYoovBpGECWh') != null) 
        {
            depID = sessionStorage.getItem('JcvzYoovBpGECWh');
        }
        else 
        {
            model_d.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
            depID = model_d[0].Id;
        }      

        for (let i = 0; i < model_task.length; i++) 
        {
            if (model_task[i].DepartmentID == depID) 
            {
                //html += `<div onclick="hhVLSDEhfKLgTaU(this)" class="settings_a ugiECcrnKwaoVsb" id="ekzMacYlAMvOgoy__">` +
                //    `<div class="settings_a_select">` +
                //    `<span></span><span style="opacity: 1; margin-right: 20px;">` + model_task[i].Name + `</span>` +
                //    `</div>` +
                //    `</div>`;

                /*
                <div class="YgYDRNgkzyxgztO" id2="@item.Id" id="@item.DepartmentID" style="display: none;">
                        <svg class="EpPTURkmdIzOSnq" id2="@item.Id" viewBox="0 0 20 20" height="20" width="20"><path d="M2.5 8C1.94772 8 1.5 7.55228 1.5 7C1.5 6.44772 1.94772 6 2.5 6H17.5C18.0523 6 18.5 6.44772 18.5 7C18.5 7.55228 18.0523 8 17.5 8H2.5Z" /><path d="M2.5 11.25C1.94772 11.25 1.5 10.8023 1.5 10.25C1.5 9.69772 1.94772 9.25 2.5 9.25H17.5C18.0523 9.25 18.5 9.69772 18.5 10.25C18.5 10.8023 18.0523 11.25 17.5 11.25H2.5Z" /><path d="M2.5 14.5C1.94772 14.5 1.5 14.0523 1.5 13.5C1.5 12.9477 1.94772 12.5 2.5 12.5H17.5C18.0523 12.5 18.5 12.9477 18.5 13.5C18.5 14.0523 18.0523 14.5 17.5 14.5H2.5Z" /></svg>
                        <div class="uESYaZNLlshNOzd">
                            <span>@item.Name</span>
                            <a onclick="ydcXSyYYSvQPggQ(this)" gwyIDEzPzXYjfLE="@item.Id" kCKFvozEWxUVxxp="@item.Name" iuCJIrClUqpPWfy="@item.DepartmentID" title="Edytuj"><svg viewBox="0 0 512 512" height="13" width="13"><path class="st0" d="M494.56,55.774l-38.344-38.328c-23.253-23.262-60.965-23.253-84.226,0l-35.878,35.878l122.563,122.563l35.886-35.878C517.814,116.747,517.814,79.044,494.56,55.774z" /><polygon class="st0" points="0,389.435 0,511.998 122.571,511.998 425.246,209.314 302.691,86.751 	" /></svg></a>
                            <a onclick="pXwvhczxXMKKzWB(this)" WYxbaolkBNcDokP="@item.Id" title="Usuń"><svg viewBox="0 0 469.404 469.404" height="13" width="13"><path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path></svg></a>
                        </div>
                    </div>
                */

                html += `<div class="YgYDRNgkzyxgztO" id2="` + model_task[i].Id + `" id="` + model_task[i].DepartmentID + `">` +
                            `<svg class="EpPTURkmdIzOSnq" id2="` + model_task[i].Id + `" viewBox="0 0 20 20" height="20" width="20"><path d="M2.5 8C1.94772 8 1.5 7.55228 1.5 7C1.5 6.44772 1.94772 6 2.5 6H17.5C18.0523 6 18.5 6.44772 18.5 7C18.5 7.55228 18.0523 8 17.5 8H2.5Z" /><path d="M2.5 11.25C1.94772 11.25 1.5 10.8023 1.5 10.25C1.5 9.69772 1.94772 9.25 2.5 9.25H17.5C18.0523 9.25 18.5 9.69772 18.5 10.25C18.5 10.8023 18.0523 11.25 17.5 11.25H2.5Z" /><path d="M2.5 14.5C1.94772 14.5 1.5 14.0523 1.5 13.5C1.5 12.9477 1.94772 12.5 2.5 12.5H17.5C18.0523 12.5 18.5 12.9477 18.5 13.5C18.5 14.0523 18.0523 14.5 17.5 14.5H2.5Z" /></svg>` +
                            `<div>` + //class="uESYaZNLlshNOzd"
                                `<span>` + model_task[i].Name + `</span>` +
                            `</div>` +
                        `</div>`;

                        //testtt
            }
        }
        $('#ekzMacYlAMvOgoy_').after(html);

        testtt();
        $('#ekzMacYlAMvOgoy_').addClass('pAPTryUdWHeiZZa');
    }
    else 
    {
        //let ekzMacYlAMvOgoy__ = document.querySelectorAll('#ekzMacYlAMvOgoy__');
        let ekzMacYlAMvOgoy__ = document.querySelectorAll('.YgYDRNgkzyxgztO');
        for (let i = 0; i < ekzMacYlAMvOgoy__.length; i++)
        {
            $(ekzMacYlAMvOgoy__[i]).remove();
        }

        $('#ekzMacYlAMvOgoy_').children('.settings_a_select').children('ion-icon').attr('name', 'chevron-down-outline');

        $('#ekzMacYlAMvOgoy_').removeClass('pAPTryUdWHeiZZa');
    }
};