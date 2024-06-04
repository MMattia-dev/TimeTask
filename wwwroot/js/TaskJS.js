$(document).ready(function ()
{
    setTimeout(function ()
    {
        $('.koblSjvDsfoQbAD').css({ 'opacity': '1' });
        $('.grZWUijDhGWKyHd').css({ 'opacity': '1' });
        $('#OcoYTyiBrpZJStB').css({ 'opacity': '1' });
        $('.loader_div').fadeOut('fast');
    }, 500);
});

function loadOnLoad()
{
    drmZhscxvPoxiya(sessionStorage.getItem('LTRXohWjonyFAsg'), sessionStorage.getItem('hQxHXfkxHkfALTJ'), sessionStorage.getItem('JcvzYoovBpGECWh'));
};
loadOnLoad();

function drmZhscxvPoxiya(year, week, department)
{
    $('.right-nav').append(createLoader());

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
            howManyTasks(department);

            let wcHMgjWjXaRMPKy = document.querySelectorAll('.wcHMgjWjXaRMPKy');
            for (let i = 0; i < wcHMgjWjXaRMPKy.length; i++)
            {
                $(wcHMgjWjXaRMPKy[i]).remove();
            }

            //$('.fSJtEaXwJSHzoxW').html(response.contentResult);
            //$('.fSJtEaXwJSHzoxW').after(response.html);



            //if (sessionStorage.getItem('task_lock_headers') != null)
            //{
            //    task_lock_headers();
            //}
            //else
            //{
            //    task_unlock_headers();
            //}
            lock_headers(sessionStorage.getItem('task_lock_headers'));


            $('#loaderID_').remove(); //koniec ładowania

            $('#kSSnezAexZyLwQZ').attr("onclick", "ZdzFYcenRSIqyJF(" + year + "," + week + "," + department + ")");

            if (response.week.toString().length == 2) {
                $('#OcoYTyiBrpZJStB').html(response.week).removeClass('OcoYTyiBrpZJStB_');
            }
            if (response.week.toString().length == 1) {
                $('#OcoYTyiBrpZJStB').html(response.week).addClass('OcoYTyiBrpZJStB_');
            }
            
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function howManyTasks(departmentID) 
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

function task_lock_headers()
{
    //$('#task_lock_headers_id').children('span').eq(0).html('Odblokuj');
    //$('.fSJtEaXwJSHzoxW').addClass('fSJtEaXwJSHzoxW_');
    //$('.oKvcDSylPNSLgqr').addClass('oKvcDSylPNSLgqr_');
    //sessionStorage.setItem('task_lock_headers', 'true');

    //$('#lock1').hide();
    //$('#lock2').show();
    //document.getElementById('task_lock_headers_input').checked = true;

    $('.GJakzZdfXNDmfZz').children('ion-icon').remove();
    $('.GJakzZdfXNDmfZz').prepend('<ion-icon name="lock-closed-outline"></ion-icon>');

};

function task_unlock_headers()
{
    //$('#task_lock_headers_id').children('span').eq(0).html('Zablokuj');
    //$('.fSJtEaXwJSHzoxW').removeClass('fSJtEaXwJSHzoxW_');
    //$('.oKvcDSylPNSLgqr').removeClass('oKvcDSylPNSLgqr_');
    //sessionStorage.removeItem('task_lock_headers');

    //$('#lock1').show();
    //$('#lock2').hide();
    //document.getElementById('task_lock_headers_input').checked = false;

    $('.GJakzZdfXNDmfZz').children('ion-icon').remove();
    $('.GJakzZdfXNDmfZz').prepend('<ion-icon name="lock-open-outline"></ion-icon>');

};

function GJakzZdfXNDmfZz_() 
{
    if (sessionStorage.getItem('task_lock_headers') == null) 
    {
        sessionStorage.setItem('task_lock_headers', 'true');
        lock_headers(sessionStorage.getItem('task_lock_headers'));
    }
    else 
    {
        sessionStorage.removeItem('task_lock_headers');
        lock_headers(sessionStorage.getItem('task_lock_headers'));
    }
};

function lock_headers(lock) 
{
    if (lock != null)
    {
        task_lock_headers();
    }
    else 
    {
        task_unlock_headers();
    }
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

function MkoKdHskxQLfcuP(t) 
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

function CanjEZFvPetVidb(t, year, week, department) 
{
    $('#MkoKdHskxQLfcuP_').children('.settings_a_select').children('span').eq(1).html(year);

    let MkoKdHskxQLfcuP__ = document.querySelectorAll('#MkoKdHskxQLfcuP__');
    for (let i = 0; i < MkoKdHskxQLfcuP__.length; i++) {
        $(MkoKdHskxQLfcuP__[i]).removeClass('QbNQbKEvEMUpWaH');
    }
    $(t).addClass('QbNQbKEvEMUpWaH');

    sessionStorage.setItem('LTRXohWjonyFAsg', year);

    drmZhscxvPoxiya(year, week, department);
};

function fssIiZoJOhPhaRO(t) 
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

function XyLurmdtOTQYvZU(t, year, week, department) 
{
    $('#fssIiZoJOhPhaRO_').children('.settings_a_select').children('span').eq(1).html(week);

    let fssIiZoJOhPhaRO__ = document.querySelectorAll('#fssIiZoJOhPhaRO__');
    for (let i = 0; i < fssIiZoJOhPhaRO__.length; i++)
    {
        $(fssIiZoJOhPhaRO__[i]).removeClass('QbNQbKEvEMUpWaH');
    }
    $(t).addClass('QbNQbKEvEMUpWaH');

    sessionStorage.setItem('hQxHXfkxHkfALTJ', week);

    drmZhscxvPoxiya(year, week, department);
};

function jxcqHOZgFmYHYkI(t, firstDepartment) 
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

function HMdMMtqNwVAguDt(t, id) 
{
    //$('.right-nav').append(createLoader());

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

            drmZhscxvPoxiya(response.year, response.week, id);

            //koniec ładowania -> drmZhscxvPoxiya
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function ekzMacYlAMvOgoy(t, firstDepartment) 
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
            if (response != false)
            {
                $(t).toggleClass("pAPTryUdWHeiZZa");
                show_options(t, response);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function vhKnmbRGiUsyfyh(t) 
{
    t.style.removeProperty('cursor');
    $('.AQzCKqmlrQJmxzn').removeAttr('style');
    $('.left-nav').removeClass('HFhDvVpHKOUBBMS');
};

function uXPtoAMyTPOkWCV(t, taskID) 
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
            let taskNameID = taskID; //może być równe null
            let date = $(newItem).parent().parent('.SBVWNWOJZnTplXL').attr('date'); //nigdy nie będzie równe null
            let jobStart = $(newItem).parent().parent('.SBVWNWOJZnTplXL').children('.LwxRoYhfmyzTlGm').children('input').eq(0).val(); //może być równe null
            let jobEnd = $(newItem).parent().parent('.SBVWNWOJZnTplXL').children('.LwxRoYhfmyzTlGm').children('input').eq(1).val(); //może być równe null
            let numberofelements = $(newItem).parent().children('.ZslufbFdcfCIeaW').length;
            
            saveAfterDrop(newItem, workerID, taskNameID, date, jobStart, jobEnd, numberofelements);
        },
        drag: function ()
        {
            var offset = $(this).offset();
            var xPos = offset.left;
            var yPos = offset.top;
        },
    });
};

function saveAfterDrop(element, workerID, taskNameID, date, jobStart, jobEnd, numberofelements) 
{
    disable();
    $(element).append(createSmallLoader2());

    $.ajax({
        type: 'POST',
        url: '/Tasks/AddTask_',
        data: {
            workerId: workerID,
            taskNameId: taskNameID,
            dateTime: date,
            jobStart: jobStart,
            jobEnd: jobEnd,
            numberOfElements: numberofelements
        },
        success: function (response)
        {
            $(element).removeClass('pTBYGYxynGajyIy').addClass('ZslufbFdcfCIeaW').removeAttr('id').html(`<span>` + response.taskName + `</span><a onclick="aTdCbXqRfUSGyXc(this, ` + response.id + `)" title="Usuń zadanie"><ion-icon name="close"></ion-icon></a>`);
            
            enable();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function czzROjFaPsDoZoT(t) 
{
    var workerID = $(t).parent('.LwxRoYhfmyzTlGm').parent('.SBVWNWOJZnTplXL').parent('.wcHMgjWjXaRMPKy').attr('worker');
    var date = $(t).parent('.LwxRoYhfmyzTlGm').parent('.SBVWNWOJZnTplXL').attr('date');
    var ids = $(t).parent('.LwxRoYhfmyzTlGm').parent('.SBVWNWOJZnTplXL').children('.AQzCKqmlrQJmxzn').children('.ZslufbFdcfCIeaW');

    let arrayOfIds = [];
    for (let i = 0; i < ids.length; i++) {
        let onclick = $(ids[i]).children('a').attr('onclick');
        
        var id = onclick.substring(
            onclick.indexOf(", ") + 1,
            onclick.lastIndexOf(")")
        );
        id = id.replace(/\s/g, '');

        arrayOfIds.push(id);
    }


    disable();
    $(t).parent().append(createSmallLoader());


    $.ajax({
        type: 'POST',
        url: '/Tasks/DeleteOrEditTask_Time',
        data: {
            workerID: workerID,
            date: date,
            arrayOfIds: arrayOfIds
        },
        success: function (response)
        {
            $(t).parent().children('input').val('');
            $(t).remove();
            enable();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function aTdCbXqRfUSGyXc(t, id) 
{
    var ZslufbFdcfCIeaW_elements = $(t).parent().parent().children('.ZslufbFdcfCIeaW');


    disable();
    $(t).hide();
    $(t).parent().append(createSmallLoader2());


    $.ajax({
        type: 'POST',
        url: '/Tasks/DeleteOrEditTask_Task',
        data: {
            id: id,
            numberOfElements: ZslufbFdcfCIeaW_elements.length
        },
        success: function (response)
        {
            $(t).parent().remove();
            enable();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
    
};

function AddOrEditTime(element, workerID, date, ids, jobStart, jobEnd) 
{
    let arrayOfIds = [];
    for (let i = 0; i < ids.length; i++)
    {
        let onclick = $(ids[i]).children('a').attr('onclick');

        var id = onclick.substring(
            onclick.indexOf(", ") + 1,
            onclick.lastIndexOf(")")
        );
        id = id.replace(/\s/g, '');

        arrayOfIds.push(id);
    }

    $.ajax({
        type: 'POST',
        url: '/Tasks/AddOrEditTime',
        data: {
            workerID: workerID,
            date: date,
            arrayOfIds: arrayOfIds,
            jobStart: jobStart,
            jobEnd: jobEnd
        },
        success: function (response)
        {
            if (response.success != false) {
                $(element).parent().children('input').addClass('disabled');
                $(element).parent().children('.MNewKOhqZkqNDeJ').addClass('disabled');
                $(element).parent().parent().children('.AQzCKqmlrQJmxzn').addClass('disabled');
                $(element).parent().parent().append(createSmallLoader_center());
            }
            if (response.addButton == true) 
            {
                $(element).parent().append(response.contentResult.content);
            }

            setTimeout(function () {
                $(element).parent().children('input').removeClass('disabled');
                $(element).parent().children('.MNewKOhqZkqNDeJ').removeClass('disabled');
                $(element).parent().parent().children('.AQzCKqmlrQJmxzn').removeClass('disabled');
                $('.lds-ring-small').remove();
            }, 200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function wgddAsHIsXNWQkl(t) 
{
    var workerID = $(t).parent('.LwxRoYhfmyzTlGm').parent('.SBVWNWOJZnTplXL').parent('.wcHMgjWjXaRMPKy').attr('worker');
    var date = $(t).parent('.LwxRoYhfmyzTlGm').parent('.SBVWNWOJZnTplXL').attr('date');
    var ids = $(t).parent('.LwxRoYhfmyzTlGm').parent('.SBVWNWOJZnTplXL').children('.AQzCKqmlrQJmxzn').children('.ZslufbFdcfCIeaW');
    //let jobStart = t.value;
    let jobStart = $(t).parent().children('input').eq(0).val();;
    let jobEnd = $(t).parent().children('input').eq(1).val();

    AddOrEditTime(t, workerID, date, ids, jobStart, jobEnd);
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

function createSmallLoader_center() 
{
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.style.cssText = 'position: absolute; top: calc(50% - 13px); left: calc(50% - 13px);';
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

function ZdzFYcenRSIqyJF(year, week, department) 
{
    $.ajax({
        type: 'GET',
        url: '/Tasks/CopyWorkScheduleForm',
        data: {
            savedYear: year,
            savedWeek: week,
            savedDepartment: department
        },
        success: function (response)
        {
            $('body').append(response);
            $('#pwFBWqdAoChTxAb').fadeIn(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function VHWnkLNgLFRzozC(department)
{
    if ($('#zDthMDvUyTtutDb').find(':selected').val() > 0) 
    {
        $('#loaderID').show();
        $('#pwFBWqdAoChTxAb').hide();

        $.ajax({
            type: 'POST',
            url: '/Tasks/CopyWorkSchedule',
            data: {
                copyYear: $('#ahTFhNgePFSjraf').find(':selected').val(),
                copyWeek: $('#KEYeauHuNLZPWCy').find(':selected').val(),
                destinyYear: $('#EGeBKVhjMnvAsVQ').find(':selected').val(),
                destinyWeek: $('#zDthMDvUyTtutDb').find(':selected').val(),
                department: department
            },
            success: function (response)
            {
                if (response.success != false) 
                {
                    sessionStorage.setItem('LTRXohWjonyFAsg', $('#EGeBKVhjMnvAsVQ').find(':selected').val());
                    sessionStorage.setItem('hQxHXfkxHkfALTJ', $('#zDthMDvUyTtutDb').find(':selected').val());
                    drmZhscxvPoxiya(sessionStorage.getItem('LTRXohWjonyFAsg'), sessionStorage.getItem('hQxHXfkxHkfALTJ'), sessionStorage.getItem('JcvzYoovBpGECWh'));

                    $('#pwFBWqdAoChTxAb').remove();
                    $('#loaderID').hide();

                    $('body').append(response.messageDiv.content);
                }
                else 
                {
                    setTimeout(function ()
                    {
                        $('#pwFBWqdAoChTxAb').remove();
                        $('#loaderID').hide();

                        $('body').append(response.messageDiv.content);
                    }, 500);
                }
            },
            error: function (xhr, status, error)
            {
                console.log('Error:', error);
            }
        });
    }
    else 
    {
        $('#zDthMDvUyTtutDb').addClass('SHnDWPzuoAGGIwU');
    }
};

function uOKeZlFghfhXJzQ(t) 
{
    if ($(t).find(':selected').val() > 0)
    {
        $(t).removeClass('SHnDWPzuoAGGIwU');
        $('.btn-custom').removeAttr('disabled');
    }
};

function BgMujOvGVhgxcrK() 
{
    //var divContents = $(".GlpaymKnQLOGAOs").html();
    //var printWindow = window.open('', '', 'height=400,width=800');
    //printWindow.document.write('<html><head><title>DIV Contents</title>');
    //printWindow.document.write('</head><body >');
    //printWindow.document.write(divContents);
    //printWindow.document.write('</body></html>');
    //printWindow.document.close();
    //printWindow.print();


};

function nDYntMlpKcjgONc() 
{

};