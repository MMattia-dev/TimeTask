//if (model_d.length == 0)
//{
//    $('#tableId').hide();
//}



//let ECTosDyufuTqvBV = document.querySelector('.ECTosDyufuTqvBV');
//sortArray(model_d);
//for (let i = 0; i < model_d.length; i++)
//{
//    ECTosDyufuTqvBV.innerHTML += `<input class="kzQkCNWOiUhJxRl" value="` + model_d[i].Name + `" type="radio" name="name" id="` + model_d[i].Id + `" onclick="bxDzoLwDZzickPI(this, event)" hidden />` +
//        `<label class="oZBtnmiLrunDFMC" for="` + model_d[i].Id + `"><span>` + model_d[i].Name + `</span>` + 
//        `</label>`;

//}
let selected = document.getElementById('settings_tasks_id');
selected.classList.add('settings_a_selected');


//let kzQkCNWOiUhJxRl_array = document.querySelectorAll('.kzQkCNWOiUhJxRl');
//if (sessionStorage.getItem('CRaeWRyIxKoOrgp') != null && sessionStorage.getItem('CRaeWRyIxKoOrgp') != 'no_department')
//{
//    for (let i = 0; i < kzQkCNWOiUhJxRl_array.length; i++)
//    {
//        if (kzQkCNWOiUhJxRl_array[i].id == sessionStorage.getItem('CRaeWRyIxKoOrgp'))
//        {
//            $(kzQkCNWOiUhJxRl_array[i]).trigger('click');
//        }
//    }
//}
//else if (sessionStorage.getItem('CRaeWRyIxKoOrgp') == 'no_department')
//{
//    $(kzQkCNWOiUhJxRl_array[0]).trigger('click');
//}
//else
//{
//    $(kzQkCNWOiUhJxRl_array[0]).trigger('click');
//}




//function bxDzoLwDZzickPI(t, e) 
//{
//    let arrayCheck = [];
//    let id = t.id;
//    let children = $(t).parent().children();
//    //let VUXahzbNUTWtiZa = document.querySelectorAll('.VUXahzbNUTWtiZa tbody tr');
//    for (let i = 0; i < children.length; i++)
//    {
//        let for_ = $(children[i]).attr('for');
//        if (id == for_ && children[i].tagName.toLowerCase() == 'label')
//        {
//            sessionStorage.setItem('CRaeWRyIxKoOrgp', for_);

//            let ECTosDyufuTqvBV = document.querySelector('.ECTosDyufuTqvBV');
//            let element = children[i];
//            element.scrollIntoView({
//                behavior: 'smooth',
//                //inline: 'start',
//                block: 'nearest'
//            });



//            //$(children[i]).children().eq(1).show();
//            //$(children[i]).children().eq(2).show();
//            //$(children[i]).addClass('SqhCHzsNTMEsjQk');
//        }
//        else if (id != for_)
//        {
//            //$(children[i]).children().eq(1).hide();
//            //$(children[i]).children().eq(2).hide();
//            //$(children[i]).removeClass('SqhCHzsNTMEsjQk');
//        }
//    }

//    let rows = document.querySelectorAll('#tableId tbody tr');
//    if (rows.length > 0)
//    {
//        for (let i = 0; i < rows.length; i++) 
//        {
//            if (rows[i].id == id) 
//            {
//                $(rows[i]).show();
//                arrayCheck.push(rows[i].id);
//            }
//            else
//            {
//                $(rows[i]).hide();
//            }
//        }
//    }

//    if (arrayCheck.length > 0)
//    {
//        $('#tableId').show();
//    }
//    else
//    {
//        $('#tableId').hide();
//    }

    

//};

function YENAVVQWwo() 
{
    document.getElementById('IluduaIgOUVOGRf').value = '';
    let e2 = $('.kzQkCNWOiUhJxRl:checked').attr('id');

    let f = document.getElementById('hdfoDuUOBPpvhSl');
    f.value = e2;

    let a = document.getElementById('hJQarhdVtvVBOnk');
    $(a).fadeIn(200);
};

function rURQfWmsrmzXwCV()
{ 
    let a = document.getElementById('hJQarhdVtvVBOnk');
    $(a).fadeOut(200);
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

function MUdkksPiwwBklvN(t) 
{
    let jwOsncySQjwD = document.getElementById('jwOsncySQjwD');


    let id_ = $(t).parent().parent().children().eq(0).html();
    let name_ = $(t).parent().parent().children().eq(1).html();
    let dep_ = $('.kzQkCNWOiUhJxRl:checked').attr('id');

    sessionStorage.setItem('bdZjeJaaDizFvUt', id_);

    document.getElementById('xEjLBIPqUXLK').value = name_;
    document.getElementById('ZRfCdgttdnOCfXF').value = dep_;

    $(jwOsncySQjwD).fadeIn(200);
};

function vQaAzODstzsu() 
{
    let jwOsncySQjwD = document.getElementById('jwOsncySQjwD');
    $(jwOsncySQjwD).fadeOut(200);
};

function KfdhlqmDXEsR() 
{
    let id_ = sessionStorage.getItem('bdZjeJaaDizFvUt');
    let name_ = document.getElementById('xEjLBIPqUXLK').value;
    let departmentID_ = document.getElementById('ZRfCdgttdnOCfXF').value;

    $.ajax({
        type: 'POST',
        url: '/TaskName2/EditTask',
        data: {
            id: id_,
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

function LXxUWyFdXJNnlvI(t) 
{
    let id_ = $(t).parent().parent().children().eq(0).html();
    $('#YUkuEpVsBmYTtjN').fadeIn(200);
    sessionStorage.setItem('rvnxtfceKCMlhUC', id_);
};

function spDekwIzyQklvGF() 
{
    $('#YUkuEpVsBmYTtjN').fadeOut(200);
};

function aDkOgungYCvMbHN() 
{
    let id_ = sessionStorage.getItem('rvnxtfceKCMlhUC');

    $.ajax({
        type: 'POST',
        url: '/TaskName2/RemoveTask',
        data: {
            id: id_
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

