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

let selected = document.getElementById('settings_holidays_id');
selected.classList.add('settings_a_selected');


//
let nQlwxouxuRYzbeT = document.querySelectorAll('.ECTosDyufuTqvBV input');
let dcxYcMhfumNSWHt = new Date().getFullYear();
for (let i = 0; i < nQlwxouxuRYzbeT.length; i++)
{
    if (nQlwxouxuRYzbeT[i].value == dcxYcMhfumNSWHt)
    {
        nQlwxouxuRYzbeT[i].checked = true;
    }
}

let fQOipKjlgeboVkZ = document.querySelectorAll('.fQOipKjlgeboVkZ');
for (let i = 0; i < fQOipKjlgeboVkZ.length; i++)
{
    if (fQOipKjlgeboVkZ[i].id == dcxYcMhfumNSWHt)
    {
        $(fQOipKjlgeboVkZ[i]).show();
    }
}
//

function bxDzoLwDZzickPI(t)
{
    t.checked = true;

    let fQOipKjlgeboVkZ = document.querySelectorAll('.fQOipKjlgeboVkZ');
    for (let i = 0; i < fQOipKjlgeboVkZ.length; i++)
    {
        if (fQOipKjlgeboVkZ[i].id == t.value)
        {
            $(fQOipKjlgeboVkZ[i]).show();
        }
        else
        {
            $(fQOipKjlgeboVkZ[i]).hide();
        }
    }
};

function EjaqSVIBTCAu()
{
    $('.pGKcZvErUB').fadeOut(200);

    setTimeout(function ()
    {
        $('.pGKcZvErUB').remove();
    }, 200);
};

function fwsxYepQKkCq()
{
    $.ajax({
        type: 'GET',
        url: '/Holidays/AddForm',
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
};

function EYwnRBQDFEHjzsN(t)
{
    $.ajax({
        type: 'GET',
        url: '/Holidays/EditForm',
        success: function (response)
        {
            $('body').append(response);
            $('#HnwuRhmRcJCZacg').fadeIn(200);

            sessionStorage.setItem('gFiXwoYVuxBrQrm', t.id);
            $('#WjuzdnDpZbVVtTO').val($(t).attr('name'));
            $('#osABhxQjWaMpiQP').val($(t).attr('date'));
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function hFUdwiFlMmxASVH(t)
{
    $.ajax({
        type: 'GET',
        url: '/Holidays/DeleteForm',
        success: function (response)
        {
            $('body').append(response);
            $('#YiAVCpnVzhDnOsL').fadeIn(200);

            sessionStorage.setItem('VBDsuugVdfnalOZ', t.id);
            $('#ewZOdyapfFtPtMi').html($(t).attr('name'));
            $('#nZDLxLTZwFzAFCY').html($(t).attr('date'));
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function BmJPiKFdcncS()
{
    $.ajax({
        type: 'POST',
        url: '/Holidays/AddHoliday',
        data: {
            name: $('#oVxJeHhcExMV').val(),
            date: $('#IyWRFThVHhEX').val()
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

function lwuUErBiOwfxbau()
{
    $.ajax({
        type: 'POST',
        url: '/Holidays/EditHoliday',
        data: {
            id: sessionStorage.getItem('gFiXwoYVuxBrQrm'),
            name: $('#WjuzdnDpZbVVtTO').val(),
            date: $('#osABhxQjWaMpiQP').val()
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

function dDlRcSCJZAuO()
{
    let id_ = sessionStorage.getItem('VBDsuugVdfnalOZ');

    $.ajax({
        type: 'POST',
        url: '/Holidays/RemoveHoliday',
        data: {
            id: id_
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