$(document).ready(function ()
{
    setTimeout(function ()
    {
        $('.koblSjvDsfoQbAD').css({ 'opacity': '1' });
        $('#OcoYTyiBrpZJStB').css({ 'opacity': '1' });
        $('.loader_div').fadeOut('fast');
    }, 500);
});

//function loadOnLoad()
//{
//    drmZhscxvPoxiya(sessionStorage.getItem('LTRXohWjonyFAsg'), sessionStorage.getItem('hQxHXfkxHkfALTJ'), sessionStorage.getItem('JcvzYoovBpGECWh'));
//};
//loadOnLoad();

function drmZhscxvPoxiya(year, week, department)
{
    $('.right-nav').append(createLoader()); //ładowanie

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

            $('.right-nav').html(response.table);
            
            //$('#kSSnezAexZyLwQZ').attr("onclick", "ZdzFYcenRSIqyJF(" + year + "," + week + "," + department + ")");

            if (response.week.toString().length == 2) {
                $('#OcoYTyiBrpZJStB').html(response.week).removeClass('OcoYTyiBrpZJStB_');
            }
            if (response.week.toString().length == 1) {
                $('#OcoYTyiBrpZJStB').html(response.week).addClass('OcoYTyiBrpZJStB_');
            }

            $('#loaderID_').remove(); //koniec ładowania
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function ThXhilqYhSiZDrl(year, month, department) 
{
    $('.right-nav').append(createLoader()); //ładowanie

    $.ajax({
        type: 'GET',
        url: '/Tasks/CreateTableForMonths',
        data: {
            savedYear: year,
            savedMonth: month,
            savedDepartment: department
        },
        success: function (response)
        {
            //howManyTasks(department);

            //$('.right-nav').html(response.table);

            //if (response.week.toString().length == 2)
            //{
            //    $('#OcoYTyiBrpZJStB').html(response.week).removeClass('OcoYTyiBrpZJStB_');
            //}
            //if (response.week.toString().length == 1)
            //{
            //    $('#OcoYTyiBrpZJStB').html(response.week).addClass('OcoYTyiBrpZJStB_');
            //}



            $('#loaderID_').remove(); //koniec ładowania
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

$('.right-nav.p-0.ttbOkNfvCKQgfoH').on('scroll', function (e)
{
    if (e.target.scrollTop > 0)
    {
        $('.task_table thead tr th').addClass('vjhHvFgopmFabVr');
    }
    else
    {
        $('.task_table thead tr th').removeClass('vjhHvFgopmFabVr');
    }

    if (e.target.scrollLeft > 0)
    {
        $('.task_table tbody tr td:first-child').addClass('sEmBPQCwNeEgole');
    }
    else
    {
        $('.task_table tbody tr td:first-child').removeClass('sEmBPQCwNeEgole');
    }
});

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

function eAtzZqRcgNRQSze(t) {
    $.ajax({
        type: 'GET',
        url: '/Tasks/MonthsInYear',
        data: {
            savedYear: sessionStorage.getItem('LTRXohWjonyFAsg'),
            savedMonth: sessionStorage.getItem('XmRbNRjSsnfRbUN'), //miesiąc
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

function vMuRKnlzsTqjFoH(t, year, month, department) 
{
    //$('#eAtzZqRcgNRQSze_').children('.settings_a_select').children('span').eq(1).html(month);
    let monthName = $(t).children().children('span').eq(1).html();
    $('#eAtzZqRcgNRQSze_').children('.settings_a_select').children('span').eq(1).html(monthName);

    let eAtzZqRcgNRQSze__ = document.querySelectorAll('#eAtzZqRcgNRQSze__');
    for (let i = 0; i < eAtzZqRcgNRQSze__.length; i++) 
    {
        $(eAtzZqRcgNRQSze__[i]).removeClass('QbNQbKEvEMUpWaH');
    }
    $(t).addClass('QbNQbKEvEMUpWaH');

    sessionStorage.setItem('XmRbNRjSsnfRbUN', month);

    ThXhilqYhSiZDrl(year, month, department);
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
            let element = document.querySelector('.right-nav.p-0.ttbOkNfvCKQgfoH');
            element.scrollTop = 0;

            $('#jxcqHOZgFmYHYkI_').children('.settings_a_select').children('span').eq(1).html(response.departmentName);

            let jxcqHOZgFmYHYkI__ = document.querySelectorAll('#jxcqHOZgFmYHYkI__');
            for (let i = 0; i < jxcqHOZgFmYHYkI__.length; i++) {
                $(jxcqHOZgFmYHYkI__[i]).removeClass('QbNQbKEvEMUpWaH');
            }
            $(t).addClass('QbNQbKEvEMUpWaH');

            sessionStorage.setItem('JcvzYoovBpGECWh', id);

            drmZhscxvPoxiya(response.year, response.week, id);
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
            let workerID = $(newItem).parent().parent().attr('worker'); //nie może być równe null
            let taskNameID = taskID; //może być równe null
            let date = $(newItem).parent().parent().parent().attr('date'); //nigdy nie będzie równe null
            let jobStart = $(newItem).parent().parent().children('.LwxRoYhfmyzTlGm').children('input').eq(0).val(); //może być równe null
            let jobEnd = $(newItem).parent().parent().children('.LwxRoYhfmyzTlGm').children('input').eq(1).val(); //może być równe null
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
    var workerID = $(t).parent().parent().attr('worker');
    var date = $(t).parent().parent().parent().attr('date');
    var ids = $(t).parent().parent().children('.AQzCKqmlrQJmxzn').children('.ZslufbFdcfCIeaW');

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
                $(element).parent().parent().children().addClass('disabled');
                $(element).parent().parent().append(createSmallLoader_center());
            }
            if (response.addButton == true) 
            {
                $(element).parent().append(response.contentResult.content);
            }

            setTimeout(function () {
                $(element).parent().children('input').removeClass('disabled');
                $(element).parent().parent().children().removeClass('disabled');
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
    var workerID = $(t).parent().parent().attr('worker');
    var date = $(t).parent().parent().parent().attr('date');
    var ids = $(t).parent().parent().children('.AQzCKqmlrQJmxzn').children('.ZslufbFdcfCIeaW');
    let jobStart = $(t).parent().children('input').eq(0).val();
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
    lds.style.cssText = 'position: absolute; top: calc(50% - 13px); left: calc(50% - 13px); z-index: 50;';
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
            $('#FMnrCopWCecUjag').remove();

            $('body').append(response);
            //$('#pwFBWqdAoChTxAb').fadeIn(200);
            $('#pwFBWqdAoChTxAb').show();
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
    $.ajax({
        type: 'GET',
        url: '/Tasks/DownloadTableForm',
        data: {
            savedYear: sessionStorage.getItem('LTRXohWjonyFAsg'),
            savedWeek: sessionStorage.getItem('hQxHXfkxHkfALTJ'),
            savedDepartment: sessionStorage.getItem('JcvzYoovBpGECWh')
        },
        success: function (response)
        {
            $('#FMnrCopWCecUjag').remove();

            $('body').append(response);
            //$('#FIfodjZXcJQcAEE').fadeIn(200);
            $('#FIfodjZXcJQcAEE').show();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function uWpiumqJEoBHQnr(year, week, department) 
{
    $.ajax({
        type: 'GET',
        url: '/Tasks/CreateTableToDownload',
        data: {
            year: year,
            week: week,
            department: department
        },
        success: function (response)
        {
            //if (response != false) {
            //    $('body').append(response.contentResult.content);

            //    var elements = document.querySelectorAll('#nolCEYewpEzatms');

            //    for (let j = 0; j < response.ids.length; j++) 
            //    {
            //        $.ajax({
            //            type: 'GET',
            //            url: '/Tasks/FillTasks',
            //            data: {
            //                id: response.ids[j]
            //            },
            //            success: function (response_)
            //            {
                            
            //            },
            //            error: function (xhr_, status_, error_)
            //            {
            //                console.log('Error:', error_);
            //            }
            //        });
            //    }
            //}
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });

    //tableToExcel('testTable', 'Arkusz1', 'Grafik.xls');
};

function OvdYNubWPJBjNuP() {

};

function WfIEscZTJsEAoiw(year, week, department) 
{
    //var doc = new jsPDF('landscape');
    //doc.autoTable({ html: '#testTable' });
    //doc.save('table.pdf');

    
};

function nDYntMlpKcjgONc() 
{
    MdQnLBuxjkWnziZ = [];
    for (let i = 1; i <= 7; i++) //usun session storage "days checkboxes"
    {
        sessionStorage.removeItem('grafik_' + i);
    }

    $.ajax({
        type: 'GET',
        url: '/Tasks/OtherSettingsForm',
        data: {
            savedYear: sessionStorage.getItem('LTRXohWjonyFAsg'),
            savedWeek: sessionStorage.getItem('hQxHXfkxHkfALTJ'),
            savedDepartment: sessionStorage.getItem('JcvzYoovBpGECWh')
        },
        success: function (response)
        {
            $('body').append(response);
            $('#FMnrCopWCecUjag').fadeIn(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function KknXAduygEtFJvn() 
{
    $.ajax({
        type: 'GET',
        url: '/Tasks/AssignHoursForAllForm',
        data: {
            savedYear: sessionStorage.getItem('LTRXohWjonyFAsg'),
            savedWeek: sessionStorage.getItem('hQxHXfkxHkfALTJ'),
            savedDepartment: sessionStorage.getItem('JcvzYoovBpGECWh')
        },
        success: function (response)
        {
            $('#FMnrCopWCecUjag').remove();
            $('body').append(response);

            MdQnLBuxjkWnziZ = [];
            for (let i = 1; i <= 7; i++) //usun session storage "days checkboxes"
            {
                sessionStorage.removeItem('grafik_' + i);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function NDBuqpieiEpridq(element, year, week, department) 
{
    if (sessionStorage.getItem('OIXejnXwFVXLtKT') == null) 
    {
        $.ajax({
            type: 'GET',
            url: '/Tasks/DaysDiv',
            data: {
                year: year,
                week: week
            },
            success: function (response)
            {
                $(element).parent().after(response);
                $('.iNzvwDsTQXDyPIR ion-icon').addClass('zwyAWlfnleMVUJu');

                sessionStorage.setItem('OIXejnXwFVXLtKT', 'true');

                if (MdQnLBuxjkWnziZ.length > 0) {
                    for (let i = 0; i < MdQnLBuxjkWnziZ.length; i++) {
                        $('.oJeaEVIeaFrjGFz.ijEfZAzszvHWwUi[id="' + MdQnLBuxjkWnziZ[i].Id + '"]').addClass('QqPxuRNTyfpMJwi');
                        $('.oJeaEVIeaFrjGFz.ijEfZAzszvHWwUi[id="' + MdQnLBuxjkWnziZ[i].Id + '"]').children('.JedpDSUGFTACLwa').children('svg').replaceWith('<svg viewBox="0 0 24 24" height="22" width="22"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"></path></svg>');
                    }
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
        PHXgTRqEbNEfYsk();
    }
};

function PHXgTRqEbNEfYsk() 
{
    $('#shwJrqmCKCOdpeV').remove();
    $('.iNzvwDsTQXDyPIR ion-icon').removeClass('zwyAWlfnleMVUJu');
    sessionStorage.removeItem('OIXejnXwFVXLtKT');
};

$(document).on('click', function (event)
{
    if (!$(event.target).closest('#shwJrqmCKCOdpeV').length)
    {
        PHXgTRqEbNEfYsk();
    }
});

var MdQnLBuxjkWnziZ = [];
function NFjIyzElkiTJLTK(e, t) 
{
    let dayOfWeek = $(t).attr('name');
    dayOfWeek = dayOfWeek.split('.')[0];

    $('#dUzUxfaNorqvNMm').hide();

    if (sessionStorage.getItem('grafik_' + t.id) == null) 
    {
        $('#' + t.id).addClass('QqPxuRNTyfpMJwi');
        $('#' + t.id).children('.JedpDSUGFTACLwa').children('svg').replaceWith('<svg viewBox="0 0 24 24" height="22" width="22"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"></path></svg>');
        sessionStorage.setItem('grafik_' + t.id, 'true');

        if (!MdQnLBuxjkWnziZ.find(e => e.Id === t.id)) 
        {
            MdQnLBuxjkWnziZ.push({ Id: t.id, dayName: dayOfWeek, date: t.getAttribute('date') });
        }
    }
    else 
    {
        $('#' + t.id).removeClass('QqPxuRNTyfpMJwi');
        $('#' + t.id).children('.JedpDSUGFTACLwa').children('svg').replaceWith('<svg viewBox="0 0 24 24" height="22" width="22"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm2"></path></svg>');
        sessionStorage.removeItem('grafik_' + t.id);

        MdQnLBuxjkWnziZ = MdQnLBuxjkWnziZ.filter(function (e) { return e.Id != t.id; }); 
    }

    sortArrayDefault(MdQnLBuxjkWnziZ);

    if (MdQnLBuxjkWnziZ.length > 0)
    {
        let string = "";
        for (let i = 0; i < MdQnLBuxjkWnziZ.length; i++) 
        {
            string += MdQnLBuxjkWnziZ[i].dayName + ', ';
        }
        $('#SBkLZHkCOnzAkgl').html('<span>' + string + '</span>');

        if (document.getElementById('eYpvywdCgUdMWFB') && document.getElementById('AsLyaHDkxjuuiPP')) 
        {
            if (document.getElementById('eYpvywdCgUdMWFB').value != '' && document.getElementById('AsLyaHDkxjuuiPP').value != '') 
            {
                $('#lcgkhBMDzScROMd').removeAttr('disabled');
            }
        }

        if (document.getElementById('DFOtUXAzDWlbzYQ')) 
        {
            if (document.getElementById('DFOtUXAzDWlbzYQ').selectedIndex > -1) 
            {
                $('#lcgkhBMDzScROMd').removeAttr('disabled');
            }
        }
    }
    else 
    {
        $('#lcgkhBMDzScROMd').attr('disabled', '');

        $('#SBkLZHkCOnzAkgl').html('');
        $('#dUzUxfaNorqvNMm').show();
    }

    e.stopPropagation();
};

function kBwJoRVnVZFOCVS(e) 
{
    let hour_input_1 = $('#eYpvywdCgUdMWFB').val();
    let hour_input_2 = $('#AsLyaHDkxjuuiPP').val();

    if (MdQnLBuxjkWnziZ.length > 0 && hour_input_1 != '' && hour_input_2 != '') 
    {
        $('#lcgkhBMDzScROMd').removeAttr('disabled');
    }
    if (MdQnLBuxjkWnziZ.length == 0 && hour_input_1 == '' && hour_input_2 == '') 
    {
        $('#lcgkhBMDzScROMd').attr('disabled', '');
    }
};

function ksDOTJUbXxnvIKA(department) 
{
    let hour_input_1 = $('#eYpvywdCgUdMWFB').val();
    let hour_input_2 = $('#AsLyaHDkxjuuiPP').val();

    let array = [];
    for (let i = 0; i < MdQnLBuxjkWnziZ.length; i++) {
        array.push(MdQnLBuxjkWnziZ[i].date);
    }

    if (MdQnLBuxjkWnziZ.length > 0 && hour_input_1 != '' && hour_input_2 != '')
    {
        $('#leJHkkOjgbGLkyn').remove();
        $('.parent').append(createLoader()); //ładowanie

        $.ajax({
            type: 'POST',
            url: '/Tasks/AssignHoursForAll',
            data: {
                department: department,
                dates: array,
                hourFrom: hour_input_1,
                hourTo: hour_input_2
            },
            success: function (response)
            {
                if (response != false) 
                {
                    location.reload();
                }
            },
            error: function (xhr, status, error)
            {
                console.log('Error:', error);
            }
        });
    }
};

function USnvJSnvkJlVGaA() 
{
    $.ajax({
        type: 'GET',
        url: '/Tasks/AssignTasksForAllForm',
        data: {
            savedYear: sessionStorage.getItem('LTRXohWjonyFAsg'),
            savedWeek: sessionStorage.getItem('hQxHXfkxHkfALTJ'),
            savedDepartment: sessionStorage.getItem('JcvzYoovBpGECWh')
        },
        success: function (response)
        {
            $('#FMnrCopWCecUjag').remove();
            $('body').append(response);

            MdQnLBuxjkWnziZ = [];
            for (let i = 1; i <= 7; i++) 
            {
                sessionStorage.removeItem('grafik_' + i);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function DfqpMwbIHeqYiyR(department) 
{
    let array = [];
    for (let i = 0; i < MdQnLBuxjkWnziZ.length; i++)
    {
        array.push(MdQnLBuxjkWnziZ[i].date);
    }

    let tnid = document.getElementById('DFOtUXAzDWlbzYQ').value;

    if (MdQnLBuxjkWnziZ.length > 0) 
    {
        $('#ziubgYIMDAkZxTP').remove();
        $('.parent').append(createLoader()); //ładowanie

        $.ajax({
            type: 'POST',
            url: '/Tasks/AssignTaskForAll',
            data: {
                department: department,
                dates: array,
                taskNameId: tnid
            },
            success: function (response) 
            {
                if (response != false) 
                {
                    location.reload();
                }
            },
            error: function (xhr, status, error) 
            {
                console.log('Error:', error);
            }
        });
    }
};



