let selected = document.getElementById('settings_departs_workers_id');
selected.classList.add('settings_a_selected');


if (sessionStorage.getItem('qbMvtjjezfxSFsv') != null)
{
    $('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo(' + sessionStorage.getItem('qbMvtjjezfxSFsv') + ')');
    $('.kzQkCNWOiUhJxRl[id="' + sessionStorage.getItem('qbMvtjjezfxSFsv') + '"]').trigger('click');
}
else {
    $('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo(' + $('.kzQkCNWOiUhJxRl').first().attr('id') + ')');
    $('.kzQkCNWOiUhJxRl').first().trigger('click');
}

function bxDzoLwDZzickPI(t, id)
{
    $('#MyRfivjxPqfhHQr').attr('onclick', 'YENAVVQWwo(' + id + ')');
    sessionStorage.setItem('qbMvtjjezfxSFsv', id);

    $('.oZBtnmiLrunDFMC').parent().children('.oZBtnmiLrunDFMC').children('.OxwaVAXXNsMtYHu').hide();
    $('.oZBtnmiLrunDFMC').parent().children('.oZBtnmiLrunDFMC[for="' + id + '"]').children('.OxwaVAXXNsMtYHu').show();

    if (id != null) 
    {
        $.ajax({
            type: 'GET',
            url: '/Workers2/ChangeDepartment',
            data: {
                id: id
            },
            success: function (response)
            {
                $('.YUPrikbkYzkc').html(response);
                var tables = document.getElementsByTagName('table');
                for (var i = 0; i < tables.length; i++)
                {
                    resizableGrid(tables[i]);
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
        $.ajax({
            type: 'GET',
            url: '/Workers2/WorkersWithoutDepartment',
            success: function (response)
            {
                $('.YUPrikbkYzkc').html(response);
                var tables = document.getElementsByTagName('table');
                for (var i = 0; i < tables.length; i++)
                {
                    resizableGrid(tables[i]);
                }
            },
            error: function (xhr, status, error)
            {
                console.log('Error:', error);
            }
        });
    }
};

function sNYSYigDKYrjjtq(id)
{
    $.ajax({
        type: 'GET',
        url: '/Workers2/EditDepartmentForm',
        data: {
            id: id
        },
        success: function (response)
        {
            $('body').append(response);
            $('#uLTJNrstvNEQ').fadeIn(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function KOdkyXQcUVJW(id)
{
    if (document.getElementById('coVYuzZVCFxh').value != null)
    {
        $.ajax({
            type: 'POST',
            url: '/Departments/EditDepartment',
            data: {
                id: id,
                name: document.getElementById('coVYuzZVCFxh').value
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
};

function bdoycBpPxFPywju(id)
{
    $.ajax({
        type: 'GET',
        url: '/Workers2/DeleteDepartmentForm',
        data: {
            id: id
        },
        success: function (response)
        {
            $('body').append(response);
            $('#PNujBEeIildr').fadeIn(200);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function adqwBJykaCzQ(id)
{
    $.ajax({
        type: 'POST',
        url: '/Departments/RemoveDepartment',
        data: {
            id: id
        },
        success: function (response)
        {
            sessionStorage.removeItem('qbMvtjjezfxSFsv');
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error removing row:', error);
        }
    });
};

//var tables = document.getElementsByTagName('table');
//for (var i = 0; i < tables.length; i++)
//{
//    resizableGrid(tables[i]);
//}

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

function BqujyivUqK()
{
    //$('#XOrtKNkAwk').fadeIn(200);
    $.ajax({
        type: 'GET',
        url: '/Workers2/AddDepartmentForm',
        success: function (response) 
        {
            $('body').append(response);
            $('#XOrtKNkAwk').fadeIn(200);
        },
        error: function (xhr, status, error) 
        {
            console.log('Error:', error);
        }
    });
};

function GuDpHEcfHN()
{
    if (document.getElementById('svFbsOqCAR').value != '')
    {
        let DeViohCQjIFT = document.getElementById('svFbsOqCAR').value;

        opvqVIGDmNiz(DeViohCQjIFT);
    }
};

function opvqVIGDmNiz(name_)
{
    $.ajax({
        type: 'POST',
        url: '/Departments/AddNewDepartment',
        data: {
            name: name_,
        },
        success: function (response)
        {
            sessionStorage.setItem('qbMvtjjezfxSFsv', response);
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function bmIRCNZNky()
{
    $('#XOrtKNkAwk').fadeOut(200);
    setTimeout(function ()
    {
        document.getElementById('svFbsOqCAR').value = '';
    }, 200);
};

$('#svFbsOqCAR').on('keydown', function (e)
{
    if (e.keyCode == '13')
    {//enter
        e.preventDefault();
        GuDpHEcfHN();
    }
});

function YENAVVQWwo(id)
{
    $.ajax({
        type: 'GET',
        url: '/Workers2/AddNewWorkerForm',
        data: {
            id: id
        },
        success: function (response) 
        {
            $('body').append(response);
            $('#QmRrlOQPQW').fadeIn(200);
        },
        error: function (xhr, status, error) 
        {
            console.log('Error:', error);
        }
    });
};

function EYVOxDPdHV()
{
    $('#QmRrlOQPQW').fadeOut(200);
    setTimeout(function ()
    {
        document.getElementById('GVegODKbEh').value = '';
        document.getElementById('toPdQnPuvH').value = '';
    }, 200);
};

function TEqGSwRYnu()
{
    if (document.getElementById('GVegODKbEh').value != '' && document.getElementById('toPdQnPuvH').value != '')
    {
        let name_ = document.getElementById('GVegODKbEh').value;
        let surname_ = document.getElementById('toPdQnPuvH').value;
        //let dep_id_ = parseInt(sessionStorage.getItem('storage_AddWorker'));
        let e = document.getElementById('OyRfwpeqzbeyVEW');
        let dep_id_ = e.options[e.selectedIndex].value;
        let employed_ = true;

        KOxtvRcBmzeo(name_, surname_, dep_id_, employed_);
    }
};

$('#GVegODKbEh').on('keydown', function (e)
{
    if (e.keyCode == '13')
    {
        e.preventDefault();
        TEqGSwRYnu();
    }
});

$('#toPdQnPuvH').on('keydown', function (e)
{
    if (e.keyCode == '13')
    {
        e.preventDefault();
        TEqGSwRYnu();
    }
});

function IxsCvPIuWwZw(id)
{
    $.ajax({
        type: 'GET',
        url: '/Workers2/EditWorkerForm',
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

function vQaAzODstzsu()
{
    let jwOsncySQjwD = document.getElementById('jwOsncySQjwD');
    $(jwOsncySQjwD).fadeOut(200);
};

function KfdhlqmDXEsR(id)
{
    let id_ = id;
    let name_ = document.getElementById('qxZnTneGdrVW').value;
    let surname_ = document.getElementById('xEjLBIPqUXLK').value;
    let dep_ = document.getElementById('ZRfCdgttdnOCfXF').value;

    $.ajax({
        type: 'POST',
        url: '/Workers2/EditWorker',
        data: {
            id: id_,
            name: name_,
            surname: surname_,
            departmentID: dep_
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

function deleteWorker(id)
{
    $.ajax({
        type: 'GET',
        url: '/Workers2/DeleteWorkerForm',
        data: {
            id: id
        },
        success: function (response) 
        {
            $('body').append(response);
            $('#UwCmLRqIRSZM').fadeIn(200);
        },
        error: function (xhr, status, error) 
        {
            console.log('Error:', error);
        }
    });
};

function UOspQSjpbVdS()
{
    //location.reload();

};

//function fBTJyaaQRpDf(t)
//{
//    document.getElementById("zwQBaubcYWcJ").innerHTML = 'Czy na pewno chcesz usunąć pracownika?';

//    let a = document.getElementById("FamcDfiHIvhi");
//    a.style.display = '';
//    t.style.display = 'none';

//    /*timer*/
//    let count = 4;
//    document.getElementById("XSkMvvmEXCee").value = 'Tak' + ' ' + '(' + 5 + ')';
//    setInterval(function ()
//    {
//        if (count > 0)
//        {
//            document.getElementById("XSkMvvmEXCee").value = 'Tak' + ' ' + '(' + count + ')';
//            count--;
//        }
//        else
//        {
//            document.getElementById("XSkMvvmEXCee").value = 'Tak';
//        }
//    }, 1000);

//    document.getElementById("XSkMvvmEXCee").setAttribute('disabled', '');
//    setTimeout(function ()
//    {
//        document.getElementById("XSkMvvmEXCee").removeAttribute('disabled');
//    }, 5000);
//    /**/
//};

function dDlRcSCJZAuO(id)
{
    $.ajax({
        type: 'GET',
        url: '/Workers2/GetWorkerInfo',
        data: {
            id: id
        },
        success: function (response)
        {
            if (response.info > 1) 
            {
                let desc = 'Usunięcie "' + response.workerSurname + ' ' + response.workerName + '" wymaga usunięcia wszystkich danych związanych z tą osobą. Czy chcesz kontynuować?';

                let form = '<div id="caKIyQnNIHrYWJo" class="pGKcZvErUB">' +
                    '<form clas="jbiihcodqinw">' +
                    '<div class="IvBtEDulLESDYxK">' +
                    '<span>' + desc + '</span>' +
                    '</div>' +
                    '<div class="btn-danger-div">' +
                    '<input type="button" value="Tak" onclick="OSwIvXdvLIKyXFE(' + id + ')" />' +
                    '</div>' +
                    '<div class="BnDZmDEehCCybzG LPbaczkZTGFbIBk" onclick="$(\'#caKIyQnNIHrYWJo\').remove()">' +
                    '<svg viewBox="0 0 470 470" height="15" width="15"><path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path></svg>' +
                    '</div>' +
                    '</form>' +
                    '</div>';

                $('#UwCmLRqIRSZM').remove();
                $('body').append(form);
            }
            else {
                OSwIvXdvLIKyXFE_(id);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function OSwIvXdvLIKyXFE(id) 
{
    $.ajax({
        type: 'POST',
        url: '/Workers2/DeleteWorkerWithEverythingElse',
        data: {
            id: id
        },
        success: function (response)
        {
            //loading screen
            $('#caKIyQnNIHrYWJo').remove(); //usun #caKIyQnNIHrYWJo
            let htmlLoader = `<div class="pGKcZvErUB">` +
                `<form class="form_3">` +
                `<div class="loader_div BkvylzxsLMTrGpQ">` +
                `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>` +
                `</div>` +
                `<div class="form-group bKQpZIoPOmwNvbh">` +
                `<span class="vfxLVmwjkBogmPm" id="dTfLGgGbUYkYoyw"></span>` +
                `</div>` +
                `</form>` +
                `</div>`;

            $('body').append(htmlLoader);
            //
            
            //przeprowadz wszystkie operacje
            if (response.timeSettingsID != null)
            {
                removeWorkerExceptionWithWorker(response.timeSettingsID)
            }

            if (response.taskID.length > 0)
            {
                for (let i = 0; i < response.taskID.length; i++)
                {
                    if (response.taskID[i] != null)
                    {
                        removeWorkerAllTasks(response.taskID[i]);
                    }
                }
            }

            if (response.timesID.length > 0)
            {
                for (let i = 0; i < response.timesID.length; i++)
                {
                    if (response.timesID[i] != null) 
                    {
                        removeWorkerAllTimes(response.timesID[i]);
                    }
                }
            }
            //

            //loading screen cd.
            let f = 0;
            $('#dTfLGgGbUYkYoyw').html(`Usuwanie danych... ` + `(` + f + `/` + response.count + `)`);
            var interval = setInterval(function ()
            {
                $('#dTfLGgGbUYkYoyw').html(`Usuwanie danych... ` + `(` + f++ + `/` + response.count + `)`);

                if (f - 1 == response.count)
                {
                    clearInterval(interval);

                    //usun pracownika
                    $.ajax({
                        type: 'POST',
                        url: '/Workers2/DeleteWorker',
                        data: {
                            id: id
                        },
                        success: function (response)
                        {
                            setTimeout(function ()
                            {
                                location.reload();
                            }, 300);
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error:', error);
                        }
                    });
                    //
                }
            }, 1000);
            //
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function OSwIvXdvLIKyXFE_(id) 
{
    $.ajax({
        type: 'POST',
        url: '/Workers2/DeleteWorker',
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

function removeWorkerExceptionWithWorker(id) 
{
    $.ajax({
        type: 'POST',
        url: '/Times/RemoveWorkerException',
        data: {
            id: id
        },
        success: function (response)
        {
            //location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function removeWorkerAllTasks(id) 
{
    $.ajax({
        type: 'POST',
        url: '/Task2/RemoveTask',
        data: {
            id: id
        },
        success: function (response)
        {
            //location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function removeWorkerAllTimes(id) 
{
    $.ajax({
        type: 'POST',
        url: '/Times/RemoveTime',
        data: {
            id: id
        },
        success: function (response)
        {
            //location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};