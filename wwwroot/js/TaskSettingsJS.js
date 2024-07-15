let selected = document.getElementById('settings_tasks_id');
selected.classList.add('settings_a_selected');

function XmVztKczNCaTbJt() 
{
    if (sessionStorage.getItem('dzARvcmubKKEzdq') != null) 
    {
        WAknWoEDCgnvjyY(sessionStorage.getItem('dzARvcmubKKEzdq'));
        $('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo(' + sessionStorage.getItem('dzARvcmubKKEzdq') + ')');
    }
};
XmVztKczNCaTbJt();

function nGgUoVSOQmbYyoD()
{
    $.ajax({
        type: 'GET',
        url: '/TaskName2/CreateDepartmentSelect',
        success: function (response)
        {
            $('.kxOMhDZFzkDb').append(response);
            $('#rJsRgTkikJFkTVs').attr('onclick', 'PHXgTRqEbNEfYsk()');
            $('.iNzvwDsTQXDyPIR ion-icon').addClass('zwyAWlfnleMVUJu');

            if (sessionStorage.getItem('dzARvcmubKKEzdq') != null) 
            {
                $('.oJeaEVIeaFrjGFz[id="' + sessionStorage.getItem('dzARvcmubKKEzdq') + '"]').addClass('iFbPgrXjzGigaCA');
                $('.iFbPgrXjzGigaCA')[0].scrollIntoView();
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function PHXgTRqEbNEfYsk() 
{
    $('#shwJrqmCKCOdpeV').remove();
    $('#rJsRgTkikJFkTVs').attr('onclick', 'nGgUoVSOQmbYyoD()');
    $('.iNzvwDsTQXDyPIR ion-icon').removeClass('zwyAWlfnleMVUJu');
};

$('body').on('click', function ()
{
    PHXgTRqEbNEfYsk();
});

function WAknWoEDCgnvjyY(id) 
{
    $.ajax({
        type: 'GET',
        url: '/TaskName2/ChangeDepartment',
        data: {
            id: id
        },
        success: function (response)
        {
            $('#YUPrikbkYzkc_').html(response.contentResult.content);
            var tables = document.getElementsByTagName('table');
            for (var i = 0; i < tables.length; i++)
            {
                resizableGrid(tables[i]);
            }

            let THs = $('#tableId thead tr th:not(:last)');
            for (let i = 0; i < THs.length; i++)
            {
                $(THs[i]).attr('onclick', 'sortTable(' + i + ')');
            }

            $('.iNzvwDsTQXDyPIR span').html(response.departmentName).removeAttr('style');
            $('.iNzvwDsTQXDyPIR ion-icon').removeClass('zwyAWlfnleMVUJu');

            sessionStorage.setItem('dzARvcmubKKEzdq', id);
            $('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo(' + id + ')');
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};
function YENAVVQWwo(id)
{
    $.ajax({
        type: 'GET',
        url: '/TaskName2/AddNewTaskForm',
        data: {
            id: id
        },
        success: function (response)
        {
            $('body').append(response);
            $('#hJQarhdVtvVBOnk').fadeIn(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function zGWGBXreWGtGNcS() 
{
    let name_ = document.getElementById('IluduaIgOUVOGRf').value;
    let e = document.getElementById('hdfoDuUOBPpvhSl');
    let id_ = e.options[e.selectedIndex].value;

    if (name_.length > 0) 
    {
        $.ajax({
            type: 'POST',
            url: '/TaskName2/AddTask',
            data: {
                name: name_,
                departmentID: id_
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
    }
    
};

function MUdkksPiwwBklvN(id) 
{
    $.ajax({
        type: 'GET',
        url: '/TaskName2/EditTaskForm',
        data: {
            id: id
        },
        success: function (response)
        {
            $('body').append(response);
            $('#jwOsncySQjwD').fadeIn(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function KfdhlqmDXEsR(id) 
{
    let name_ = document.getElementById('xEjLBIPqUXLK').value;
    let departmentID_ = document.getElementById('ZRfCdgttdnOCfXF').value;

    $.ajax({
        type: 'POST',
        url: '/TaskName2/EditTask',
        data: {
            id: id,
            name: name_,
            departmentID: departmentID_
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

function LXxUWyFdXJNnlvI(id) 
{
    $.ajax({
        type: 'GET',
        url: '/TaskName2/DeleteTaskForm',
        data: {
            id: id
        },
        success: function (response)
        {
            $('body').append(response);
            $('#YUkuEpVsBmYTtjN').fadeIn(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function aDkOgungYCvMbHN(id) 
{
    $.ajax({
        type: 'POST',
        url: '/TaskName2/RemoveTask',
        data: {
            id: id
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
        })

        div.addEventListener('mouseout', function (e)
        {
            //e.target.style.borderRight = '4px double rgba(255, 255, 255, 0.2)';
        })

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
            curColWidth = undefined
        });
    }

    function createDiv(height)
    {
        var div = document.createElement('div');
        div.style.top = 0;
        div.style.right = 0;
        div.style.width = '23px';
        div.style.zIndex = '1';
        div.style.position = 'absolute';
        div.style.cursor = 'col-resize';
        div.style.userSelect = 'none';
        div.style.height = '52px';

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
        return (window.getComputedStyle(elm, null).getPropertyValue(css))
    }
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

function kEDVBzpHnAzOqpp(t, e)
{
    e.stopPropagation();
};

function DGSWGCQnhgXKmAe(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('DGSWGCQnhgXKmAe_');
    let index = element.selectedIndex;
    
    $(element).parent().append(createSmallLoader3());

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/CWIKXSnlsspiXYE',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            workScheduleView: index,
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function () {
                    $('.lds-ring-small2').remove();
                }, 300);     
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function ynAnPsGicwfcWMt(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('ynAnPsGicwfcWMt_');
    let index = element.selectedIndex;

    $(element).parent().append(createSmallLoader3());

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/QnejSftKzHnXHGh',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            firstDayOfWeek: index,
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function uTwWyyqQLuKCRUq(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('uTwWyyqQLuKCRUq_');
    let value = element.value;

    $(element).parent().append(createSmallLoader3());

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/lviiRZwkMwhqaFz',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            dayTasksLimit: value
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function vHNhdTLtVqLZhGE(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('vHNhdTLtVqLZhGE_');
    let checkStatus = element.checked;

    $(element).parent().parent().append(createSmallLoader3());

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/aYDBWeCxsbWbRXT',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            showLeaves: checkStatus
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function xIHLFrzYfniOJtj(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('xIHLFrzYfniOJtj_');
    let checkStatus = element.checked;

    $(element).parent().parent().append(createSmallLoader3());

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/tTuvgjjIbKgMnAT',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            showHolidays: checkStatus
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function UbUzTtXGLKIHPnT(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('UbUzTtXGLKIHPnT_');
    let checkStatus = element.checked;

    $(element).parent().parent().append(createSmallLoader3());

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/eRLkNpeUUCgmaTG',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            lockAddingToHolidays: checkStatus
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function BJhwjaWvHWWTVEo(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('BJhwjaWvHWWTVEo_');
    let checkStatus = element.checked;

    $(element).parent().parent().append(createSmallLoader3());

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/pITtnYRlNsBToxu',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            showOnlyInitials: checkStatus
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function UnbUFgGDXRYLZYj(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('UnbUFgGDXRYLZYj_');
    let checkStatus = element.checked;

    $(element).parent().parent().append(createSmallLoader3());

    if (!checkStatus) {
        $('#NquudTpGloVzKoB').remove();
    }

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/nrnghIGnHUEBHwZ',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            enablePrivateSchedule: checkStatus
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();

                    if (checkStatus)
                    {
                        $(element).parent().parent().append(response.span.content);
                    }
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function eSXbJrbKMlYGIrp(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('eSXbJrbKMlYGIrp_');
    let checkStatus = element.checked;

    $(element).parent().parent().append(createSmallLoader3());

    if (!checkStatus) {
        $('#pCAkeIBbalSqCTB_').remove();
    }

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/ZwaEFuuPmrMYBqS',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            allowOthersToEdit: checkStatus
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();

                    if (checkStatus) {
                        $(element).parent().parent().append(response.span.content);
                    }
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function enKTbQYvxBzlFBO(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('enKTbQYvxBzlFBO_');
    let checkStatus = element.checked;

    if (checkStatus)
    {  
        $(element).parent().parent().append(createSmallLoader3());
    }
    else 
    {
        $(element).parent().parent().parent().append(createSmallLoader3());
        $('#qAIabAYRAJSWgqK_').remove();
    }   

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/TDDLDmIHYjVfcuh',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            lockScheduleEdit: checkStatus,
            lockTime: 0,
            GvwTTLESihOmLhQ: WpMXiAZVwrrkfTh
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();
                    if (checkStatus) {
                        $(element).parent().parent().parent().append(response.select.content);
                    }
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function qAIabAYRAJSWgqK(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('qAIabAYRAJSWgqK_');
    let index = element.selectedIndex;

    $(element).parent().append(createSmallLoader3());

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/juChQgTUCIkTtOm',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            lockTime: index
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function ZwiLZYVPGXOWYCD(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('ZwiLZYVPGXOWYCD_');
    let checkStatus = element.checked;

    $(element).parent().parent().append(createSmallLoader3());

    if (!checkStatus)
    {
        $('#ItYujZvGhAXoNJw').remove();
    }

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/jjuMOIhJgObMnkV',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            autoCopySchedule: checkStatus,
            GvwTTLESihOmLhQ: WpMXiAZVwrrkfTh
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();

                    if (checkStatus)
                    {
                        $(element).parent().parent().append(response.div.content);

                    }
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function oPEStVVIUxnydDp(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('oPEStVVIUxnydDp_');
    let date = element.value;

    $(element).parent().parent().append(createSmallLoader3());

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/diUskrbpMczAOwe',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            startCopyScheduleDate: date
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

$('#oPEStVVIUxnydDp_').on('keydown', function (e) { 
    e.preventDefault();
});

function gBTdQeDEXrAZpsu(WpMXiAZVwrrkfTh) {
    let element = document.getElementById('gBTdQeDEXrAZpsu_');
    let index = element.selectedIndex;

    $(element).parent().append(createSmallLoader3());

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/rbEQghxgwXxjXzA',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            repeatAutoCopySchedule: index
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function jXPbcuZxwEHflcw(WpMXiAZVwrrkfTh)
{
    let element = document.getElementById('jXPbcuZxwEHflcw_');
    let checkStatus = element.checked;

    $(element).parent().parent().append(createSmallLoader3());

    if (!checkStatus)
    {
        $('#pNstugmIpmEENyd').remove();
    }

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/ukDCUiaPPTbFNUr',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            autoShareSchedule: checkStatus,
            GvwTTLESihOmLhQ: WpMXiAZVwrrkfTh
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();

                    if (checkStatus)
                    {
                        $(element).parent().parent().append(response.div.content);

                    }
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function XcUHXPHttLovDJu(WpMXiAZVwrrkfTh)
{
    let element = document.getElementById('XcUHXPHttLovDJu_');
    let date = element.value;

    $(element).parent().parent().append(createSmallLoader3());

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/XJjyLULKstxMRZK',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            startShareScheduleDate: date
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

$('#XcUHXPHttLovDJu_').on('keydown', function (e)
{
    e.preventDefault();
});

function YcyAWdmiezAOUBV(WpMXiAZVwrrkfTh)
{
    let element = document.getElementById('YcyAWdmiezAOUBV_');
    let index = element.selectedIndex;

    $(element).parent().append(createSmallLoader3());

    $.ajax({
        type: 'POST',
        url: '/TasksSettings/jdEewtdRqcJGuIS',
        data: {
            WpMXiAZVwrrkfTh: WpMXiAZVwrrkfTh,
            repeatAutoShareSchedule: index
        },
        success: function (response)
        {
            if (response != false) 
            {
                setTimeout(function ()
                {
                    $('.lds-ring-small2').remove();
                }, 300);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error adding data:', error);
        }
    });
};

function blyVpYCtnXKDgCn(WpMXiAZVwrrkfTh) {

};



