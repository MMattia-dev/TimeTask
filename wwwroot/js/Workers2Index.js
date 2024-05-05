let selected = document.getElementById('settings_departs_workers_id');
selected.classList.add('settings_a_selected');

if (model_d.length == 0)
{
    $('#tableId').hide();
    $('.IVnxgCORpPYL').hide();
}



let ECTosDyufuTqvBV = document.querySelector('.ECTosDyufuTqvBV');
ECTosDyufuTqvBV.innerHTML += `<input onclick="BqujyivUqK()" type="button" class="oZBtnmiLrunDFMC uyGcnHMadlagzhh" id="dWaFnMJPHpXnJhm" value="Nowy dział"/>`;
sortArray(model_d);
for (let i = 0; i < model_d.length; i++)
{
    ECTosDyufuTqvBV.innerHTML += `<input class="kzQkCNWOiUhJxRl" value="` + model_d[i].Name + `" type="radio" name="name" id="` + model_d[i].Id + `" onclick="bxDzoLwDZzickPI(this, event)" hidden />` +
        `<label class="oZBtnmiLrunDFMC" for="` + model_d[i].Id + `"><span>` + model_d[i].Name + `</span>` + // class + SqhCHzsNTMEsjQk
        `<i class="OxwaVAXXNsMtYHu JxeYECtwrfrUhgj" onclick="sNYSYigDKYrjjtq(this, event)" style="display: none;">` +
        `<svg viewBox="0 0 512 512" width="16" height="16">` +
        `<path d="M494.56,55.774l-38.344-38.328c-23.253-23.262-60.965-23.253-84.226,0l-35.878,35.878l122.563,122.563l35.886-35.878C517.814,116.747,517.814,79.044,494.56,55.774z"></path>` +
        `<polygon class="st0" points="0,389.435 0,511.998 122.571,511.998 425.246,209.314 302.691,86.751"/>` +
        `</svg>` +
        `</i>` +
        `<i class="OxwaVAXXNsMtYHu" onclick="bdoycBpPxFPywju(this, event)" style="display: none;">` +
        `<svg viewBox="0 0 469.404 469.404" width="16" height="16">` +
        `<path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path>` +
        `</svg>` +
        `</i>` +
        `</label>`;

}
//nieprzypisani
let depCheck = [];
var workersWithNoDepartment = [];
for (let i = 0; i < model_d.length; i++)
{
    depCheck.push(model_d[i].Id);
}
for (let i = 0; i < model_w.length; i++)
{
    if (!depCheck.includes(model_w[i].DepartmentID))
    {
        workersWithNoDepartment.push({ id: model_w[i].Id, name: model_w[i].Name, surname: model_w[i].Surname, department: model_w[i].DepartmentID, employed: model_w[i].Employed });
    }
}
for (let i = 0; i < model_w.length; i++)
{
    if (!depCheck.includes(model_w[i].DepartmentID))
    {
        ECTosDyufuTqvBV.innerHTML += `<input class="kzQkCNWOiUhJxRl" type="radio" name="name" id="no_department" onclick="bxDzoLwDZzickPI(this, event)" hidden />` +
            `<label class="oZBtnmiLrunDFMC lMliDWsRdSOjYmB" for="no_department"><span>Nieprzypisani pracownicy</span></label>`;
        break;
    }
}
//
//ECTosDyufuTqvBV.innerHTML += `<input onclick="BqujyivUqK()" type="button" class="oZBtnmiLrunDFMC uyGcnHMadlagzhh" id="dWaFnMJPHpXnJhm" value="Nowy dział"/>`;

let kzQkCNWOiUhJxRl_array = document.querySelectorAll('.kzQkCNWOiUhJxRl');
if (sessionStorage.getItem('qbMvtjjezfxSFsv') != null && sessionStorage.getItem('qbMvtjjezfxSFsv') != 'no_department')
{
    for (let i = 0; i < kzQkCNWOiUhJxRl_array.length; i++)
    {
        if (kzQkCNWOiUhJxRl_array[i].id == sessionStorage.getItem('qbMvtjjezfxSFsv'))
        {
            $(kzQkCNWOiUhJxRl_array[i]).trigger('click');
        }
    }
}
else if (sessionStorage.getItem('qbMvtjjezfxSFsv') == 'no_department')
{
    $(kzQkCNWOiUhJxRl_array[0]).trigger('click');
}
else
{
    $(kzQkCNWOiUhJxRl_array[0]).trigger('click');
}



function bxDzoLwDZzickPI(t, e)
{
    let arrayCheck = [];
    let id = t.id;
    let children = $(t).parent().children();
    let VUXahzbNUTWtiZa = document.querySelectorAll('.VUXahzbNUTWtiZa tbody tr');
    for (let i = 0; i < children.length; i++)
    {
        let for_ = $(children[i]).attr('for');
        if (id == for_ && children[i].tagName.toLowerCase() == 'label')
        {
            sessionStorage.setItem('qbMvtjjezfxSFsv', for_);

            let ECTosDyufuTqvBV = document.querySelector('.ECTosDyufuTqvBV');
            let element = children[i];
            element.scrollIntoView({
                behavior: 'smooth',
                //inline: 'start',
                block: 'nearest'
            });



            $(children[i]).children().eq(1).show();
            $(children[i]).children().eq(2).show();
            //$(children[i]).children().eq(3).show();
            $(children[i]).addClass('SqhCHzsNTMEsjQk');
        }
        else if (id != for_)
        {
            $(children[i]).children().eq(1).hide();
            $(children[i]).children().eq(2).hide();
            //$(children[i]).children().eq(3).hide();
            $(children[i]).removeClass('SqhCHzsNTMEsjQk');
        }
    }



    for (let j = 0; j < VUXahzbNUTWtiZa.length; j++)
    {
        let depID = VUXahzbNUTWtiZa[j].id;
        if (depID == id)
        {
            $(VUXahzbNUTWtiZa[j]).show();
            arrayCheck.push(depID);
        }
        else
        {
            $(VUXahzbNUTWtiZa[j]).hide();

            let id__ = $(VUXahzbNUTWtiZa[j]).children().eq(0).html();
            if (workersWithNoDepartment.length > 0)
            {
                for (let k = 0; k < workersWithNoDepartment.length; k++)
                {
                    let w_id = workersWithNoDepartment[k].id;
                    if (w_id == id__ && t.id == 'no_department')
                    {
                        $(VUXahzbNUTWtiZa[j]).show();
                    }
                }
            }
        }
    }

    if (arrayCheck.length > 0 || workersWithNoDepartment.length > 0 && t.id == 'no_department')
    {
        $('#tableId').show();
    }
    else
    {
        $('#tableId').hide();
    }

};

function sNYSYigDKYrjjtq(t, e)
{
    let uLTJNrstvNEQ = document.getElementById('uLTJNrstvNEQ');
    $(uLTJNrstvNEQ).fadeIn(200);

    sessionStorage.setItem('oKVpUNCSlKRZWqW', $(t).parent().attr('for'));

    document.getElementById('coVYuzZVCFxh').value = $(t).parent().children().eq(0).text();
};

function NlckkxcEbWXv()
{
    let uLTJNrstvNEQ = document.getElementById('uLTJNrstvNEQ');
    $(uLTJNrstvNEQ).fadeOut(200);
};

function KOdkyXQcUVJW()
{
    if (document.getElementById('coVYuzZVCFxh').value != null)
    {
        let XozBLvRgROAw = document.getElementById('coVYuzZVCFxh').value;

        let RNeDYmxNNzoe = sessionStorage.getItem('oKVpUNCSlKRZWqW');

        //id, name
        VYhhVLCczCoE(RNeDYmxNNzoe, XozBLvRgROAw);
    }
};

function bdoycBpPxFPywju(t, e)
{
    sessionStorage.setItem('NdheQmPNteYHXBD', $(t).parent().attr('for'));

    let b = document.getElementById("bAWzKvvkmVmE");
    b.style.display = 'none';
    let PNujBEeIildr = document.getElementById('PNujBEeIildr');
    $(PNujBEeIildr).fadeIn(200);
};

function adqwBJykaCzQ()
{
    let RNeDYmxNNzoe = sessionStorage.getItem('NdheQmPNteYHXBD');

    ertVmpwgdwWK(RNeDYmxNNzoe);
};

function IWantToDeleteDepartment(t)
{
    let check = false;
    let RNeDYmxNNzoe = sessionStorage.getItem('NdheQmPNteYHXBD');
    for (let i = 0; i < model_w.length; i++)
    {
        if (model_w[i].DepartmentID == RNeDYmxNNzoe)
        {
            if (model_w.length != 0)
            {
                check = true;
            }
        }
    }

    if (check)
    {
        document.getElementById("JsFfTXmLOVbI").innerHTML = 'Dział nie jest pusty!' + '<br>' + 'Czy na pewno chcesz usunąć dział?';
        let a = document.getElementById("bAWzKvvkmVmE");
        a.style.display = '';
        t.style.display = 'none';
    }

    /*timer*/
    if (check)
    {
        let count = 4;
        document.getElementById("nditIlzCWflU").value = 'Tak' + ' ' + '(' + 5 + ')';
        setInterval(function ()
        {
            if (count > 0)
            {
                document.getElementById("nditIlzCWflU").value = 'Tak' + ' ' + '(' + count + ')';
                count--;
            }
            else
            {
                document.getElementById("nditIlzCWflU").value = 'Tak';
            }
        }, 1000);

        document.getElementById("nditIlzCWflU").setAttribute('disabled', '');
        setTimeout(function ()
        {
            document.getElementById("nditIlzCWflU").removeAttribute('disabled');
        }, 5000);
    }
    else
    {
        ertVmpwgdwWK(RNeDYmxNNzoe);
    }
    /**/
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

function YENAVVQWwo()
{
    //let kzQkCNWOiUhJxRl = document.querySelectorAll('.kzQkCNWOiUhJxRl');
    //for (let i = 0; i < kzQkCNWOiUhJxRl.length; i++)
    //{
    //    if (kzQkCNWOiUhJxRl[i].checked)
    //    {
    //        document.getElementById('OyRfwpeqzbeyVEW').value = kzQkCNWOiUhJxRl[i].id;
    //    }
    //}

    //$('#QmRrlOQPQW').fadeIn(200);

    $.ajax({
        type: 'GET',
        url: '/Workers2/AddNewWorkerForm',
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
    location.reload();
};

function fBTJyaaQRpDf(t)
{
    document.getElementById("zwQBaubcYWcJ").innerHTML = 'Czy na pewno chcesz usunąć pracownika?';

    let a = document.getElementById("FamcDfiHIvhi");
    a.style.display = '';
    t.style.display = 'none';

    /*timer*/
    let count = 4;
    document.getElementById("XSkMvvmEXCee").value = 'Tak' + ' ' + '(' + 5 + ')';
    setInterval(function ()
    {
        if (count > 0)
        {
            document.getElementById("XSkMvvmEXCee").value = 'Tak' + ' ' + '(' + count + ')';
            count--;
        }
        else
        {
            document.getElementById("XSkMvvmEXCee").value = 'Tak';
        }
    }, 1000);

    document.getElementById("XSkMvvmEXCee").setAttribute('disabled', '');
    setTimeout(function ()
    {
        document.getElementById("XSkMvvmEXCee").removeAttribute('disabled');
    }, 5000);
    /**/
};

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
                let desc = 'W bazie danych znaleziono ' + response.info + ' rekordów dla "' + response.workerSurname + ' ' + response.workerName + '".' +
                    '\n' +
                    'Klikając na "Tak", potwierdzasz usunięcie wszytkich danych związanych z tą osobą!';

                let form = '<div id="caKIyQnNIHrYWJo" class="pGKcZvErUB">' +
                        '<form clas="jbiihcodqinw">' +
                            '<div class="IvBtEDulLESDYxK">' +
                                '<span>' + desc + '</span>' +
                            '</div>' +
                            '<div class="btn-danger-div">' +
                                '<input type="button" value="Tak" onclick="OSwIvXdvLIKyXFE(' + id + ')" />' +
                            '</div>' +
                            '<div class="BnDZmDEehCCybzG LPbaczkZTGFbIBk" onclick="$(\'#caKIyQnNIHrYWJo\').remove(); $(\'#UwCmLRqIRSZM\').show()">' +
                                '<svg viewBox="0 0 470 470" height="15" width="15"><path d="M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z"></path></svg>' +
                            '</div>' +
                        '</form>' +
                    '</div>';

                $('#UwCmLRqIRSZM').hide();
                $('body').append(form);
            }           
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });

    //$.ajax({
    //    type: 'POST',
    //    url: '/Workers2/DeleteWorker',
    //    data: {
    //        id: id
    //    },
    //    success: function (response)
    //    {
    //        //location.reload();
    //        if (response != false)
    //        {
    //            if (response.timeSettingsID != null)
    //            {
    //                //removeWorkerExceptionWithWorker(response.timeSettingsID)
    //                console.log(response.timeSettingsID);
    //            }
    //            if (response.taskID.length > 0) 
    //            {
    //                for (let i = 0; i < response.taskID.length; i++) 
    //                {

    //                }
    //                console.log(response.taskID);
    //            }
    //            if (response.timesID.length > 0) 
    //            {
    //                for (let i = 0; i < response.timesID.length; i++) 
    //                {

    //                }
    //                console.log(response.timesID);
    //            }
    //            if (response.timeSettingsID == null && response.taskID.length == 0 && response.timesID.length == 0) 
    //            {
    //                location.reload();
    //            }
    //        }
    //    },
    //    error: function (xhr, status, error)
    //    {
    //        console.log('Error:', error);
    //    }
    //});
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