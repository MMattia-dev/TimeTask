let selected = document.getElementById('settings_openings_id');
selected.classList.add('settings_a_selected');

function XmVztKczNCaTbJt() 
{
    //if (sessionStorage.getItem('NDuKGqQvpviZysu') != null) 
    //{
    //    if (sessionStorage.getItem('NDuKGqQvpviZysu') == 'null') 
    //    {
    //        WAknWoEDCgnvjyY(null);
    //        $('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo()');
    //    }
    //    else 
    //    {
    //        WAknWoEDCgnvjyY(sessionStorage.getItem('NDuKGqQvpviZysu'));
    //        $('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo(' + sessionStorage.getItem('NDuKGqQvpviZysu') + ')');
    //    }
    //}
    //else
    //{
    //    WAknWoEDCgnvjyY(null);
    //}

    WAknWoEDCgnvjyY(null);
};
XmVztKczNCaTbJt();

function YENAVVQWwo() //id
{
    $.ajax({
        type: 'GET',
        url: '/Opening2/NewOpeningForm',
        //data: {
        //    id: id
        //},
        success: function (response) 
        {
            $('body').append(response);
            $('#QmRrlOQPQW_').fadeIn(200);
        },
        error: function (xhr, status, error) 
        {
            console.log('Error:', error);
        }
    });
};

function nGgUoVSOQmbYyoD() 
{
    $('.kxOMhDZFzkDb').append('<div class="IVnxgCORpPYL ijBuUPWrdXEngvb pKKeaPLlODAnOgN fetDyOODTumSTzB" id="shwJrqmCKCOdpeV_"><div class="lds-ring-small" style="position: absolute; top: calc(50% - 13px); left: calc(50% - 13px); z-index: 50;"><div></div><div></div><div></div><div></div></div></div>');

    $.ajax({
        type: 'GET',
        url: '/Opening2/CreateDepartmentSelect',
        success: function (response)
        {
            $('#shwJrqmCKCOdpeV_').remove();
            $('.kxOMhDZFzkDb').append(response);
            $('#rJsRgTkikJFkTVs').attr('onclick', 'PHXgTRqEbNEfYsk()');
            $('.iNzvwDsTQXDyPIR ion-icon').addClass('zwyAWlfnleMVUJu');

            if (sessionStorage.getItem('NDuKGqQvpviZysu') != null) 
            {
                $('.oJeaEVIeaFrjGFz[id="' + sessionStorage.getItem('NDuKGqQvpviZysu') + '"]').addClass('iFbPgrXjzGigaCA');
                $('.iFbPgrXjzGigaCA')[0].scrollIntoView();
            }
            else 
            {
                $('.oJeaEVIeaFrjGFz:first-child').addClass('iFbPgrXjzGigaCA');
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
        url: '/Opening2/ChangeDepartment',
        data: {
            id: id
        },
        success: function (response)
        {
            $('.YUPrikbkYzkc').html(response.contentResult.content);
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

            sessionStorage.setItem('NDuKGqQvpviZysu', response.departmentId);
            //$('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo(' + response.departmentId + ')');
            $('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo()');

            //$('#vTGalpVxnhKxENh').remove();
            //$('.ECTosDyufuTqvBV').append('<div id="vTGalpVxnhKxENh" class="MReEOONwmHpPyvX">' + response.editDeleteButton.content + '</div>');
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });

    //if (id != null && id != "null")
    //{
    //    $.ajax({
    //        type: 'GET',
    //        url: '/Workstations/ChangeDepartment',
    //        data: {
    //            id: id
    //        },
    //        success: function (response)
    //        {
    //            $('.YUPrikbkYzkc').html(response.contentResult.content);
    //            var tables = document.getElementsByTagName('table');
    //            for (var i = 0; i < tables.length; i++)
    //            {
    //                resizableGrid(tables[i]);
    //            }

    //            let THs = $('#tableId thead tr th:not(:last)');
    //            for (let i = 0; i < THs.length; i++)
    //            {
    //                $(THs[i]).attr('onclick', 'sortTable(' + i + ')');
    //            }

    //            $('.iNzvwDsTQXDyPIR span').html(response.departmentName).removeAttr('style');
    //            $('.iNzvwDsTQXDyPIR ion-icon').removeClass('zwyAWlfnleMVUJu');

    //            sessionStorage.setItem('NDuKGqQvpviZysu', id);
    //            $('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo(' + id + ')');

    //            //$('#vTGalpVxnhKxENh').remove();
    //            //$('.ECTosDyufuTqvBV').append('<div id="vTGalpVxnhKxENh" class="MReEOONwmHpPyvX">' + response.editDeleteButton.content + '</div>');
    //        },
    //        error: function (xhr, status, error)
    //        {
    //            console.log('Error:', error);
    //        }
    //    });
    //}
    //else {
    //    console.log('asd');
    //}
};

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


