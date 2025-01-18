let selected = document.getElementById('settings_openings_id');
selected.classList.add('settings_a_selected');

function XmVztKczNCaTbJt() 
{
    if (sessionStorage.getItem('NDuKGqQvpviZysu') != null) 
    {
        if (sessionStorage.getItem('NDuKGqQvpviZysu') == 'null') 
        {
            WAknWoEDCgnvjyY(null);
            $('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo()');
        }
        else 
        {
            WAknWoEDCgnvjyY(sessionStorage.getItem('NDuKGqQvpviZysu'));
            $('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo(' + sessionStorage.getItem('NDuKGqQvpviZysu') + ')');
        }
    }
    else
    {
        WAknWoEDCgnvjyY(null);
    }
};
XmVztKczNCaTbJt();

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
            $('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo(' + response.departmentId + ')');

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




