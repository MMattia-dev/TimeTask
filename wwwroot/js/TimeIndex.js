
let selected = document.getElementById('settings_times_id');
selected.classList.add('settings_a_selected');

function gsWnPInTEluayCy_() 
{
    //
    let pora_nocna_start = document.getElementById('gsWnPInTEluayCy').value;
    let pora_nocna_koniec = document.getElementById('SiNSMVtTKxOjnem').value;
    //

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small2';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $('#SiNSMVtTKxOjnem').parent().append(lds);
    $(lds).hide();

    $.ajax({
        type: 'POST',
        url: '/Times/AddOrEditPoraNocna_Start_Koniec',
        data: {
            poraNocnaStart: pora_nocna_start,
            poraNocnaKoniec: pora_nocna_koniec
        },
        success: function (response)
        {
            if (response != false) 
            {
                $(lds).show();
                setTimeout(function ()
                {
                    location.reload();
                }, 300);
            }
        },        
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function MrQZggFcmaNphIg(t)
{
    let nazwaDnia = $(t).parent().children('span').html();
    let checkboxStatus = t.checked;

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small2';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().parent().parent().append(lds);
    $(lds).hide();

    $.ajax({
        type: 'POST',
        url: '/Times/AddOrEditDniWolneOdPracy',
        data: {
            dzien: nazwaDnia,
            check: checkboxStatus
        },
        success: function (response)
        {
            if (response != false) 
            {
                $(lds).show();
                setTimeout(function ()
                {
                    location.reload();
                }, 300);            
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function YaohyXTjGdIPVHK()
{
    //
    let okres = document.getElementById('IkruzJFAfehduep').value;
    let okres_options = document.getElementById('dOAFhxfwDtzoHav');
    //

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small2';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(okres_options).parent().append(lds);
    $(lds).hide();


    $.ajax({
        type: 'POST',
        url: '/Times/AddOrEditOkres',
        data: {
            okres: okres,
            selected: okres_options.value
        },
        success: function (response)
        {
            if (response != false) 
            {
                $(lds).show();
                setTimeout(function ()
                {
                    location.reload();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function IIjDrhHnsJwmqtN(t) 
{
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small2';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().append(lds);
    $(lds).hide();

    //
    let czas = t.value;
    //

    $.ajax({
        type: 'POST',
        url: '/Times/AddOrEditCzasPracy',
        data: {
            czasPracy: czas
        },
        success: function (response)
        {
            if (response != false) 
            {
                $(lds).show();
                setTimeout(function ()
                {
                    location.reload();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function jShPfjshHZwMBZw(t) 
{
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small2';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().append(lds);
    $(lds).hide();

    //
    let tydzien = t.value;
    //

    $.ajax({
        type: 'POST',
        url: '/Times/AddOrEditMaksymalnaLiczbaNadgodzinTydzien',
        data: {
            maxTydzien: tydzien
        },
        success: function (response)
        {
            if (response != false) 
            {
                $(lds).show();
                setTimeout(function ()
                {
                    location.reload();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function XzSwltkFnFZxgQl(t) 
{
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small2';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().append(lds);
    $(lds).hide();

    //
    let rok = t.value;
    //

    $.ajax({
        type: 'POST',
        url: '/Times/AddOrEditMaksymalnaLiczbaNadgodzinRok',
        data: {
            maxRok: rok
        },
        success: function (response)
        {
            if (response != false) 
            {
                $(lds).show();
                setTimeout(function ()
                {
                    location.reload();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function bnjRnAOHPyGsOAT(t) 
{
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small2';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().append(lds);
    $(lds).hide();

    //
    let odpoczynek = t.value;
    //

    $.ajax({
        type: 'POST',
        url: '/Times/AddOrEditNieprzerwanyOdpoczynek',
        data: {
            odpoczynek: odpoczynek
        },
        success: function (response)
        {
            if (response != false) 
            {
                $(lds).show();
                setTimeout(function ()
                {
                    location.reload();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function isNumberKey(event)
{
    var charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
        return false;
    }
    else
    {
        return true;
    }
}

var tables = document.getElementsByTagName('table');
for (var i = 0; i < tables.length; i++)
{
    resizableGrid(tables[i]);
}

function resizableGrid(table)
{
    var row = table.getElementsByTagName('tr')[0],
        cols = row ? row.children : undefined;
    if (!cols) return;

    table.style.overflow = 'hidden';

    var tableHeight = table.offsetHeight;

    for (var i = 0; i < cols.length - 2; i++)
    {
        var div = createDiv(tableHeight);
        cols[i].appendChild(div);
        cols[i].style.position = 'relative';
        setListeners(div);
    }

    function setListeners(div)
    {
        var pageX, curCol, nxtCol, curColWidth, nxtColWidth;

        div.addEventListener('mousedown', function (e)
        {
            curCol = e.target.parentElement;
            nxtCol = curCol.nextElementSibling;
            pageX = e.pageX;

            var padding = paddingDiff(curCol);

            curColWidth = curCol.offsetWidth - padding;
            if (nxtCol)
                nxtColWidth = nxtCol.offsetWidth - padding;
        });

        div.addEventListener('mouseover', function (e)
        {
            //e.target.style.borderRight = '4px double rgb(150, 150, 150)';
        });

        div.addEventListener('mouseout', function (e)
        {
            //e.target.style.borderRight = '4px double rgba(255, 255, 255, 0.2)';
        });

        document.addEventListener('mousemove', function (e)
        {
            if (curCol)
            {
                var diffX = e.pageX - pageX;

                if (nxtCol)
                    nxtCol.style.width = (nxtColWidth - (diffX)) + 'px';

                curCol.style.width = (curColWidth + diffX) + 'px';
            }
        });

        document.addEventListener('mouseup', function (e)
        {
            curCol = undefined;
            nxtCol = undefined;
            pageX = undefined;
            nxtColWidth = undefined;
            curColWidth = undefined;
        });
    }

    function createDiv(height)
    {
        var div = document.createElement('div');
        div.style.top = 0;
        div.style.right = 0;
        //div.style.width = '5px';
        div.style.width = '23px';
        //div.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
        div.style.zIndex = '1';
        div.style.position = 'absolute';
        div.style.cursor = 'col-resize';
        div.style.userSelect = 'none';
        div.style.height = '52px';
        //div.style.borderRight = '4px double rgba(255, 255, 255, 0.2)';

        //div.style.right = '-10px';

        div.style.transform = 'translatex(10px)';
        div.innerHTML += `<i class="arrow left"></i> <div class="lines line1"></div> <div class="lines line2"></div> <i class="arrow right"></i>`;//<div class="lines line1"></div> <div class="lines line2"></div>
        div.setAttribute('id', 'GRgYMQCkHWKDuyb');
        div.setAttribute('onmouseover', 'ZKHOrDgJBDHOpmW(this)');
        div.setAttribute('onmouseout', 'pNxCxvPIUtCbSHM(this)');
        div.setAttribute('onclick', 'kEDVBzpHnAzOqpp(this, event)');

        return div;
    }

    function paddingDiff(col)
    {

        if (getStyleVal(col, 'box-sizing') == 'border-box')
        {
            return 0;
        }

        var padLeft = getStyleVal(col, 'padding-left');
        var padRight = getStyleVal(col, 'padding-right');
        return (parseInt(padLeft) + parseInt(padRight));

    }

    function getStyleVal(elm, css)
    {
        return (window.getComputedStyle(elm, null).getPropertyValue(css));
    }
};

function kEDVBzpHnAzOqpp(t, e)
{
    e.stopPropagation();
};

function ZKHOrDgJBDHOpmW(t)
{
    if ($(t).attr('id') == 'GRgYMQCkHWKDuyb')
    {
        $(t).parent().addClass('qDIGovQQrGkMAIm');
    }
};

function pNxCxvPIUtCbSHM(t)
{
    if ($(t).attr('id') == 'GRgYMQCkHWKDuyb')
    {
        $(t).parent().removeClass('qDIGovQQrGkMAIm');
    }
}

function dQIPREqlxghevrV_() 
{
    $.ajax({
        type: 'GET',
        url: '/Times/ChangeWorkersBasedOnDepartment',
        data: {
            departmentID: $('#dQIPREqlxghevrV').val()
        },
        success: function (response)
        {
            $('#issyAJUIywIPgIQ').html(response);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function LRKPgUoIPlhVTMS_() {
    //$('#ftcuESUFJMUetmm').fadeIn(200);
    $.ajax({
        type: 'GET',
        url: '/Times/AddExceptionForWorkerForm',
        success: function (response) 
        {
            $('body').append(response);
            $('#ftcuESUFJMUetmm').fadeIn(200);
        },
        error: function (xhr, status, error) 
        {
            console.log('Error:', error);
        }
    });
};

function validate(t, evt)
{
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste')
    {
        key = event.clipboardData.getData('text/plain');
    } else
    {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key))
    {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
};

function yYNizTMVTEhbkFD_() {
    $.ajax({
        type: 'GET',
        url: '/Times/AddLeaveSettingForm',
        success: function (response)
        {
            $('body').append(response);
            $('#GpoavnFwAOos').fadeIn(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
}

function BmJPiKFdcncS()
{
    let name_ = document.getElementById('oVxJeHhcExMV').value;
    let description_ = document.getElementById('kwYypucEEAnX').value;
    let max_ = document.getElementById('IyWRFThVHhEX').value;
    let ifDays_ = document.getElementById('cb1').checked;
    let ifWeeks_ = document.getElementById('cb2').checked;
    let ifMonths_ = document.getElementById('cb3').checked;
    let ifYears_ = document.getElementById('cb4').checked;
    let ifWeekends_ = document.getElementById('cb5').checked;
    let ifHolidays_ = document.getElementById('cb6').checked;

    if (name_)
    {
        if (max_)
        {
            if (ifDays_ || ifWeeks_ || ifMonths_ || ifYears_)
            {
                $.ajax({
                    type: 'POST',
                    url: '/Leave4/AddLeave',
                    data: {
                        name: name_,
                        description: description_,
                        max: max_,
                        ifDays: ifDays_,
                        ifWeeks: ifWeeks_,
                        ifMonths: ifMonths_,
                        ifYears: ifYears_,
                        ifWeekends: ifWeekends_,
                        ifHolidays: ifHolidays_
                    },
                    success: function (response)
                    {
                        //let a = document.getElementById('GpoavnFwAOos');
                        //$(a).fadeOut(200);
                        location.reload();
                    },
                    error: function (xhr, status, error)
                    {
                        console.log('Error updating data:', error);
                    }
                });
            }
        }
        else if (ifDays_ || ifWeeks_ || ifMonths_ || ifYears_)
        {
            if (max_)
            {
                $.ajax({
                    type: 'POST',
                    url: '/Leave4/AddLeave',
                    data: {
                        name: name_,
                        description: description_,
                        max: max_,
                        ifDays: ifDays_,
                        ifWeeks: ifWeeks_,
                        ifMonths: ifMonths_,
                        ifYears: ifYears_,
                        ifWeekends: ifWeekends_,
                        ifHolidays: ifHolidays_
                    },
                    success: function (response)
                    {
                        //let a = document.getElementById('GpoavnFwAOos');
                        //$(a).fadeOut(200);
                        location.reload();
                    },
                    error: function (xhr, status, error)
                    {
                        console.log('Error updating data:', error);
                    }
                });
            }
        }
        else 
        {
            $.ajax({
                type: 'POST',
                url: '/Leave4/AddLeave',
                data: {
                    name: name_,
                    description: description_,
                    max: max_,
                    ifDays: ifDays_,
                    ifWeeks: ifWeeks_,
                    ifMonths: ifMonths_,
                    ifYears: ifYears_,
                    ifWeekends: ifWeekends_,
                    ifHolidays: ifHolidays_
                },
                success: function (response)
                {
                    //let a = document.getElementById('GpoavnFwAOos');
                    //$(a).fadeOut(200);
                    location.reload();
                },
                error: function (xhr, status, error)
                {
                    console.log('Error updating data:', error);
                }
            });
        }
    }
};

function GTUwirLRmPXoIuh(id)
{
    $.ajax({
        type: 'GET',
        url: '/Times/DeleteLeaveSettingForm',
        data: {
            id: id
        },
        success: function (response)
        {
            $('body').append(response);
            $('#YiAVCpnVzhDnOsL').fadeIn(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function dDlRcSCJZAuO(id)
{
    $.ajax({
        type: 'POST',
        url: '/Leave4/RemoveLeave',
        data: {
            id: id
        },
        success: function (response)
        {
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function klhLiQVRwGfWrSp(id)
{
    $.ajax({
        type: 'GET',
        url: '/Times/EditLeaveSettingForm',
        data: {
            id: id
        },
        success: function (response)
        {
            $('body').append(response);
            $('#nGWLQDZPlPSDQaC').fadeIn(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error deleting data:', error);
        }
    });
};

function LkHTSbDyYLLvJeC(id)
{
    let id_ = id;
    let name_ = document.getElementById('AazUHXhkXIbdKWH').value;
    let description_ = document.getElementById('TDGIADzVjJqefsV').value;
    let max_ = document.getElementById('VumSHUqECwbXZcK').value;
    let ifDays_ = document.getElementById('cb1_').checked;
    let ifWeeks_ = document.getElementById('cb2_').checked;
    let ifMonths_ = document.getElementById('cb3_').checked;
    let ifYears_ = document.getElementById('cb4_').checked;
    let ifWeekends_ = document.getElementById('cb5_').checked;
    let ifHolidays_ = document.getElementById('cb6_').checked;

    if (name_)
    {
        if (max_)
        {
            if (ifDays_ || ifWeeks_ || ifMonths_ || ifYears_)
            {
                $.ajax({
                    type: 'POST',
                    url: '/Leave4/EditLeave',
                    data: {
                        id: id_,
                        name: name_,
                        description: description_,
                        max: max_,
                        ifDays: ifDays_,
                        ifWeeks: ifWeeks_,
                        ifMonths: ifMonths_,
                        ifYears: ifYears_,
                        ifWeekends: ifWeekends_,
                        ifHolidays: ifHolidays_
                    },
                    success: function (response)
                    {
                        //let a = document.getElementById('GpoavnFwAOos');
                        //$(a).fadeOut(200);
                        location.reload();
                    },
                    error: function (xhr, status, error)
                    {
                        console.log('Error updating data:', error);
                    }
                });
            }
        }
        else if (ifDays_ || ifWeeks_ || ifMonths_ || ifYears_)
        {
            if (max_)
            {
                $.ajax({
                    type: 'POST',
                    url: '/Leave4/EditLeave',
                    data: {
                        id: id_,
                        name: name_,
                        description: description_,
                        max: max_,
                        ifDays: ifDays_,
                        ifWeeks: ifWeeks_,
                        ifMonths: ifMonths_,
                        ifYears: ifYears_,
                        ifWeekends: ifWeekends_,
                        ifHolidays: ifHolidays_
                    },
                    success: function (response)
                    {
                        //let a = document.getElementById('GpoavnFwAOos');
                        //$(a).fadeOut(200);
                        location.reload();
                    },
                    error: function (xhr, status, error)
                    {
                        console.log('Error updating data:', error);
                    }
                });
            }
        }
        else
        {
            $.ajax({
                type: 'POST',
                url: '/Leave4/EditLeave',
                data: {
                    id: id_,
                    name: name_,
                    description: description_,
                    max: max_,
                    ifDays: ifDays_,
                    ifWeeks: ifWeeks_,
                    ifMonths: ifMonths_,
                    ifYears: ifYears_,
                    ifWeekends: ifWeekends_,
                    ifHolidays: ifHolidays_
                },
                success: function (response)
                {
                    //let a = document.getElementById('GpoavnFwAOos');
                    //$(a).fadeOut(200);
                    location.reload();
                },
                error: function (xhr, status, error)
                {
                    console.log('Error updating data:', error);
                }
            });
        }
    }
};

function cDoWdsoylXsqbSk_()
{
    let wID = document.getElementById('issyAJUIywIPgIQ').value;
    let okres = document.getElementById('ehgSlSwjIFIEMWH').value;
    let okres_options = document.getElementById('kEYeEJKlcJcQFdL');
    let wymiar = document.getElementById('zVbJqIMfPhbOnum').value;
    let nadgodzin_tyg = document.getElementById('klyMbuAvknxCxgo').value;
    let nadgodzin_rok = document.getElementById('KZzKslyEOOrVYOF').value;
    let odpoczynek = document.getElementById('WdWDgtaDQwkuFxr').value;

    var okres_tydzien = null;
    var okres_miesiac = null;
    if (okres_options.selectedIndex == 1 && okres.length > 0) 
    {
        okres_tydzien = true;
        okres_miesiac = false;
    }
    if (okres_options.selectedIndex == 2 && okres.length > 0) 
    {
        okres_tydzien = false;
        okres_miesiac = true;
    }

    if (wymiar.length > 0 || okres.length > 0 || nadgodzin_tyg.length > 0 || nadgodzin_rok.length > 0 || odpoczynek.length > 0)
    {
        if (okres_tydzien == null && okres.length == 0 || okres_tydzien != null && okres.length > 0 || okres_miesiac == null && okres.length == 0 || okres_miesiac != null && okres.length > 0) 
        {
            $.ajax({
                type: 'POST',
                url: '/Times/AddWorkerException',
                data: {
                    workerID: wID,
                    okresRozliczeniowy: okres,
                    jezeliTydzien: okres_tydzien,
                    jezeliMiesiac: okres_miesiac,
                    czasPracy: wymiar,
                    maksymalnaLiczbaNadgodzin: nadgodzin_rok,
                    maksymalnaLiczbaNadgodzinTydzien: nadgodzin_tyg,
                    nieprzerwanyOdpoczynek: odpoczynek
                },
                success: function (response)
                {
                    if (response == false)
                    {
                        $('#ftcuESUFJMUetmm').remove();

                        let html = `<div id="luPdsIeDncpbPAe" class="pGKcZvErUB pGKcZvErUB_" style="background-color: rgba(0, 0, 0, 0.6); z-index: 999;">` +
                                `<form class="jbiihcodqinw">` +
                                    `<span style="color: white;">Pracownik już istnieje w bazie.</span>` +
                                    `<div class="BnDZmDEehCCybzG LPbaczkZTGFbIBk" onclick="xtKQetqkJXANhci(` + wID + `)">` + //$('#luPdsIeDncpbPAe').remove()
                                        `<svg viewBox="0 0 470 470" height="15" width="15"><path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path></svg>` +
                                    `</div>` +
                                `</form>` +
                            `</div>`;

                        $('body').append(html);
                    }
                    else 
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
    }
};

function xtKQetqkJXANhci(id) 
{
    $('#luPdsIeDncpbPAe').remove();
    $('#ftcuESUFJMUetmm').remove();
    $('.KJiwNsHiMAVNLKL[id="' + id + '"]')[0].scrollIntoView({ behavior: "smooth", block: "center" });
    $('.KJiwNsHiMAVNLKL[id="' + id + '"]').css({ 'animation': 'blink 3s linear 1' });

    setTimeout(function ()
    {
        $('.KJiwNsHiMAVNLKL[id="' + id + '"]').removeAttr('style');
    }, 3000);
};

function pEIhAaljnrXIAfq(id) 
{
    $.ajax({
        type: 'GET',
        url: '/Times/EditExceptionForWorkerForm',
        data: {
            id: id
        },
        success: function (response)
        {
            $('body').append(response);
            $('#bouHwUSUJAULmxy').fadeIn(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function THAxAvslRnLsHel_(id, workerID) 
{
    let id_ = id;
    let wID = workerID;
    let okres = document.getElementById('qSFTqMAjJYMmIrO').value;
    let okres_options = document.getElementById('QzUmEAmLsPWlpfK');
    let wymiar = document.getElementById('qeavlfguoZjzrJJ').value;
    let nadgodzin_tyg = document.getElementById('gATdSghHoiZijAN').value;
    let nadgodzin_rok = document.getElementById('SEcPtfWbLyUxlmL').value;
    let odpoczynek = document.getElementById('DrwWFscldmvtHOW').value;

    var okres_tydzien = null;
    var okres_miesiac = null;
    if (okres_options.selectedIndex == 1 && okres.length > 0) 
    {
        okres_tydzien = true;
        okres_miesiac = false;
    }
    if (okres_options.selectedIndex == 2 && okres.length > 0) 
    {
        okres_tydzien = false;
        okres_miesiac = true;
    }

    if (wymiar.length > 0 || okres.length > 0 || nadgodzin_tyg.length > 0 || nadgodzin_rok.length > 0 || odpoczynek.length > 0)
    {
        if (okres_tydzien == null && okres.length == 0 || okres_tydzien != null && okres.length > 0 || okres_miesiac == null && okres.length == 0 || okres_miesiac != null && okres.length > 0) 
        {
            $.ajax({
                type: 'POST',
                url: '/Times/EditWorkerException',
                data: {
                    id: id_,
                    workerID: wID,
                    okresRozliczeniowy: okres,
                    jezeliTydzien: okres_tydzien,
                    jezeliMiesiac: okres_miesiac,
                    czasPracy: wymiar,
                    maksymalnaLiczbaNadgodzin: nadgodzin_rok,
                    maksymalnaLiczbaNadgodzinTydzien: nadgodzin_tyg,
                    nieprzerwanyOdpoczynek: odpoczynek
                },
                success: function (response)
                {
                    location.reload();
                },
                error: function (xhr, status, error)
                {
                    console.log('Error:', error);
                }
            });
        }
    }
};

function BPrZxQsyhDUoPdi(id) 
{
    $.ajax({
        type: 'GET',
        url: '/Times/DeleteExceptionForWorkerForm',
        data: {
            id: id
        },
        success: function (response)
        {
            $('body').append(response);
            $('#aekPvskkEgnnMQf').fadeIn(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function TGdaSoYPTTTHTtr_(id) 
{
    $.ajax({
        type: 'POST',
        url: '/Times/RemoveWorkerException',
        data: {
            id: id
        },
        success: function (response)
        {
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};