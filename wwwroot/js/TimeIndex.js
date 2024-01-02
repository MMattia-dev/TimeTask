function ileDniRoboczychWRoku(year)
{
    let a = new Date(year + '-01-01');
    let b = new Date(year + '-12-31');
    let rangeDates = getDatesInRange(a, b);
    let soboty = 0;
    let niedziele = 0;
    let swietoWSobote = 0;
    let swietoWNiedziele = 0;
    let swieta = 0;

    for (let i = 0; i < rangeDates.length; i++) 
    {
        if (rangeDates[i].getDay() == 6) 
        {
            soboty++;
        }
        if (rangeDates[i].getDay() == 0)
        {
            niedziele++;
        }
    }

    for (let i = 0; i < model_h.length; i++) 
    {
        if (new Date(model_h[i].Date).getDay() == 6 && new Date(model_h[i].Date).getFullYear() == year)
        {
            swietoWSobote++;
        }
        if (new Date(model_h[i].Date).getDay() == 0 && new Date(model_h[i].Date).getFullYear() == year)
        {
            swietoWNiedziele++;
        }
        if (new Date(model_h[i].Date).getFullYear() == year)
        {
            swieta++;
        }
    }

    let ileDniRoboczychWRoku = (rangeDates.length - soboty - niedziele - swietoWSobote) - (swieta - swietoWSobote - swietoWNiedziele);

    return ileDniRoboczychWRoku;
};

function zgEcbvlXdHwxDcW() {
    let currentYear = new Date().getFullYear();
    let dniRobocze = ileDniRoboczychWRoku(currentYear);
    let godzinyRobocze = dniRobocze * 8; //trzeba zmienic z bazy!!!!!!!
    document.getElementById('cJKKxespUKquUPA').innerHTML = godzinyRobocze;
};
zgEcbvlXdHwxDcW();


function YaohyXTjGdIPVHK(t)
{
    let okres = t.value;

    for (let i = 0; i < model_ts.length; i++)
    {
        //if (model_ts[i].WorkerId == null) {
        //    //console.log(model_ts[i].OkresRozliczeniowy);
        //    if (model_ts[i].OkresRozliczeniowy.length == 0)
        //    {
        //        console.log('asd');
        //    }
        //    else {

        //    }
        //}

        //if (!model_ts[i].WorkerId)
        //{
        //    console.log('asd');
        //}
        //else {
        //    console.log('asd');
        //}

    }

    if (model_ts.length == 0)
    {
        /*console.log('asd');*/

    }
    else
    {
        if (model_ts[i].WorkerId == null)
        {

        }
    }


    //if (t.value.length > 0) {
    //    let okres = t.value;
    //    $.ajax({
    //        type: 'POST',
    //        url: '/Times/AddOkres',
    //        data: {
    //            okresRozliczeniowy: okres
    //        },
    //        success: function (response)
    //        {
    //            location.reload();
    //        },
    //        Error: function (xhr, status, error)
    //        {
    //            console.log('Error adding data:', error);
    //        }
    //    });
    //}
};




