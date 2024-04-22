function hivknQXjTsiqtUI() {
    if (model_ts.length > 0) 
    {
        $('#LRKPgUoIPlhVTMS').show();

        for (let i = 0; i < model_ts.length; i++) 
        {
            //IkruzJFAfehduep - Okres rozliczeniowy
            //dOAFhxfwDtzoHav - Okres rozliczeniowy: tydzien albo miesiąc
            //mNLCvwMfyDsHDRo - czas pracy
            //rShbhZqNInnuIPw - max nadgodzin w tygodniu
            //qFciKrITNFzxtSL - max nadgodzin w roku
            //FqvhrnXefCjthHG - Nieprzerwany odpoczynek między dniami roboczymi
            //gsWnPInTEluayCy - Pora nocna - start
            //SiNSMVtTKxOjnem - Pora nocna - koniec
            if (model_ts[i].WorkerId == null) 
            {
                $('#IkruzJFAfehduep').val(model_ts[i].OkresRozliczeniowy);
                if (model_ts[i].jezeliTydzien)
                    $('#dOAFhxfwDtzoHav').prop('selectedIndex', 1);
                if (model_ts[i].jezeliMiesiac)
                    $('#dOAFhxfwDtzoHav').prop('selectedIndex', 2);
                $('#mNLCvwMfyDsHDRo').val(model_ts[i].CzasPracy);
                $('#rShbhZqNInnuIPw').val(model_ts[i].MaksymalnaLiczbaNadgodzinTydzien);
                $('#qFciKrITNFzxtSL').val(model_ts[i].MaksymalnaLiczbaNadgodzin);
                $('#FqvhrnXefCjthHG').val(model_ts[i].NieprzerwanyOdpoczynek);
                if (model_ts[i].PoraNocnaStart != null && model_ts[i].PoraNocnaKoniec != null) 
                {
                    $('#gsWnPInTEluayCy').val(new Date(model_ts[i].PoraNocnaStart).toLocaleTimeString());
                    $('#SiNSMVtTKxOjnem').val(new Date(model_ts[i].PoraNocnaKoniec).toLocaleTimeString());
                }
                document.getElementById('baAmFvRLsPdjFPK').checked = model_ts[i].CzyNiedzielaWolny;
                document.getElementById('QPebGULGyufDEHz').checked = model_ts[i].CzyPoniedzialekWolny;
                document.getElementById('kJGnDDkbrZWXYuR').checked = model_ts[i].CzyWtorekWolny;
                document.getElementById('CKMBUUZmdZmwRBI').checked = model_ts[i].CzySrodaWolny;
                document.getElementById('CYUzYwwDMVXUmke').checked = model_ts[i].CzyCzwartekWolny;
                document.getElementById('NtmebQZRHqjmpmB').checked = model_ts[i].CzyPiatekWolny;
                document.getElementById('RSUOGpjPUOmRtSA').checked = model_ts[i].CzySobotaWolny;
            }
        }
    }
    else 
    {
        $('#LRKPgUoIPlhVTMS').hide();
    }
};
hivknQXjTsiqtUI();

function jbhrPXeSiRSagdK() {
    if (sessionStorage.getItem('ZucUMOWKGdlqgYv') != null)
    {
        $('#urlop').attr('checked', true);
        $('#czas').attr('checked', false);
        $('#urlop').trigger('change');
    }
    else {
        $('#urlop').attr('checked', false);
        $('#czas').attr('checked', true);
        $('#czas').trigger('change');
    }
};
jbhrPXeSiRSagdK();

function OnvqHvCoOiDaFEV()
{
    document.body.scrollTop = 0;

    $('#tableId').addClass('None');
    $('#cJsHHcdodjVadhY').removeClass('None');
    $('#yYNizTMVTEhbkFD').addClass('None');
    $('#LRKPgUoIPlhVTMS').removeClass('None');

    sessionStorage.removeItem('ZucUMOWKGdlqgYv');
};
//OnvqHvCoOiDaFEV();

function ZucUMOWKGdlqgYv()
{
    document.body.scrollTop = 0;

    $('#tableId').removeClass('None');
    $('#cJsHHcdodjVadhY').addClass('None');
    $('#yYNizTMVTEhbkFD').removeClass('None');
    $('#LRKPgUoIPlhVTMS').addClass('None');

    sessionStorage.setItem('ZucUMOWKGdlqgYv', 'true');
};

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

//dodaj porę nocną
function gsWnPInTEluayCy_(t) 
{
    //
    let pora_nocna_start = t.value;
    let pora_nocna_koniec = document.getElementById('SiNSMVtTKxOjnem').value;
    //

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $('#SiNSMVtTKxOjnem').parent().append(lds);
    $(lds).hide();


    if (model_ts.length == 0) 
    {
        if (pora_nocna_start.length > 0 && pora_nocna_koniec.length > 0) 
        {
            $.ajax({
                type: 'POST',
                url: '/Times/AddPoraNocna',
                data: {
                    poraNocnaStart: '0001-01-01' + ' ' + pora_nocna_start,
                    poraNocnaKoniec: '0001-01-01' + ' ' + pora_nocna_koniec
                },
                success: function (response) 
                {
                    $(lds).show();
                    setTimeout(function ()
                    {
                        location.reload();
                    }, 300);
                },
                error: function (xhr, status, error) 
                {
                    console.log('Error:', error);
                }
            })
        }
    }
    else 
    {
        for (let i = 0; i < model_ts.length; i++) 
        {
            if (model_ts[i].WorkerId == null) 
            {
                let id_ = model_ts[i].Id;
                //

                if (model_ts[i].PoraNocnaStart != pora_nocna_start && pora_nocna_koniec.length != 0) 
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditPoraNocna',
                        data: {
                            id: id_,
                            poraNocnaStart: '0001-01-01' + ' ' + pora_nocna_start,
                            poraNocnaKoniec: '0001-01-01' + ' ' + pora_nocna_koniec
                        },
                        success: function (response) 
                        {
                            $(lds).show();
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
                }
                else if (model_ts[i].PoraNocnaStart != null && pora_nocna_koniec.length != 0) 
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditPoraNocna',
                        data: {
                            id: id_,
                            poraNocnaStart: '0001-01-01' + ' ' + pora_nocna_start,
                            poraNocnaKoniec: '0001-01-01' + ' ' + pora_nocna_koniec
                        },
                        success: function (response) 
                        {
                            $(lds).show();
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
                }
            }
        }
    }
};

function SiNSMVtTKxOjnem_(t) 
{
    //
    let pora_nocna_start = document.getElementById('gsWnPInTEluayCy').value;
    let pora_nocna_koniec = t.value;
    //

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $('#SiNSMVtTKxOjnem').parent().append(lds);
    $(lds).hide();


    if (model_ts.length == 0) 
    {
        if (pora_nocna_start.length > 0 && pora_nocna_koniec.length > 0) 
        {
            $.ajax({
                type: 'POST',
                url: '/Times/AddPoraNocna',
                data: {
                    poraNocnaStart: '0001-01-01' + ' ' + pora_nocna_start,
                    poraNocnaKoniec: '0001-01-01' + ' ' + pora_nocna_koniec
                },
                success: function (response) 
                {
                    $(lds).show();
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
        }
    }
    else 
    {
        for (let i = 0; i < model_ts.length; i++) 
        {
            if (model_ts[i].WorkerId == null) 
            {
                let id_ = model_ts[i].Id;
                //

                if (model_ts[i].PoraNocnaKoniec != pora_nocna_koniec && pora_nocna_start.length != 0) 
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditPoraNocna',
                        data: {
                            id: id_,
                            poraNocnaStart: '0001-01-01' + ' ' + pora_nocna_start,
                            poraNocnaKoniec: '0001-01-01' + ' ' + pora_nocna_koniec
                        },
                        success: function (response) 
                        {
                            $(lds).show();
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
                }
                else if (model_ts[i].PoraNocnaKoniec != null && pora_nocna_start.length != 0) 
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditPoraNocna',
                        data: {
                            id: id_,
                            poraNocnaStart: '0001-01-01' + ' ' + pora_nocna_start,
                            poraNocnaKoniec: '0001-01-01' + ' ' + pora_nocna_koniec
                        },
                        success: function (response) 
                        {
                            $(lds).show();
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
                }
            }
        }
    }
};

//zaznacz dni wolne od pracy - Niedziela
function baAmFvRLsPdjFPK_(t) 
{
    let checkboxStatus = t.checked;
    
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().parent().parent().append(lds);
    $(lds).hide();


    if (model_ts.length == 0) 
    {
        $.ajax({
            type: 'POST',
            url: '/Times/AddNiedziela',
            data: {
                czyNiedzielaWolny: checkboxStatus
            },
            success: function (response)
            {
                $(lds).show();
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
    }
    else 
    {
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //

                $.ajax({
                    type: 'POST',
                    url: '/Times/EditNiedziela',
                    data: {
                        id: id_,
                        czyNiedzielaWolny: checkboxStatus
                    },
                    success: function (response)
                    {
                        $(lds).show();
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
            }
        }
    }
};

function RSUOGpjPUOmRtSA_(t) 
{
    let checkboxStatus = t.checked;

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().parent().parent().append(lds);
    $(lds).hide();


    if (model_ts.length == 0) 
    {
        $.ajax({
            type: 'POST',
            url: '/Times/AddSobota',
            data: {
                czySobotaWolny: checkboxStatus
            },
            success: function (response)
            {
                $(lds).show();
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
    }
    else 
    {
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //

                $.ajax({
                    type: 'POST',
                    url: '/Times/EditSobota',
                    data: {
                        id: id_,
                        czySobotaWolny: checkboxStatus
                    },
                    success: function (response)
                    {
                        $(lds).show();
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
            }
        }
    }
};

function NtmebQZRHqjmpmB_(t) 
{
    let checkboxStatus = t.checked;

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().parent().parent().append(lds);
    $(lds).hide();


    if (model_ts.length == 0) 
    {
        $.ajax({
            type: 'POST',
            url: '/Times/AddPiatek',
            data: {
                czyPiatekWolny: checkboxStatus
            },
            success: function (response)
            {
                $(lds).show();
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
    }
    else 
    {
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //

                $.ajax({
                    type: 'POST',
                    url: '/Times/EditPiatek',
                    data: {
                        id: id_,
                        czyPiatekWolny: checkboxStatus
                    },
                    success: function (response)
                    {
                        $(lds).show();
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
            }
        }
    }
};

function CYUzYwwDMVXUmke_(t) 
{
    let checkboxStatus = t.checked;

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().parent().parent().append(lds);
    $(lds).hide();


    if (model_ts.length == 0) 
    {
        $.ajax({
            type: 'POST',
            url: '/Times/AddCzwartek',
            data: {
                czyCzwartekWolny: checkboxStatus
            },
            success: function (response)
            {
                $(lds).show();
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
    }
    else 
    {
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //

                $.ajax({
                    type: 'POST',
                    url: '/Times/EditCzwartek',
                    data: {
                        id: id_,
                        czyCzwartekWolny: checkboxStatus
                    },
                    success: function (response)
                    {
                        $(lds).show();
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
            }
        }
    }
};

function CKMBUUZmdZmwRBI_(t) 
{
    let checkboxStatus = t.checked;

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().parent().parent().append(lds);
    $(lds).hide();


    if (model_ts.length == 0) 
    {
        $.ajax({
            type: 'POST',
            url: '/Times/AddSroda',
            data: {
                czySrodaWolny: checkboxStatus
            },
            success: function (response)
            {
                $(lds).show();
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
    }
    else 
    {
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //

                $.ajax({
                    type: 'POST',
                    url: '/Times/EditSroda',
                    data: {
                        id: id_,
                        czySrodaWolny: checkboxStatus
                    },
                    success: function (response)
                    {
                        $(lds).show();
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
            }
        }
    }
};

function kJGnDDkbrZWXYuR_(t) 
{
    let checkboxStatus = t.checked;

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().parent().parent().append(lds);
    $(lds).hide();


    if (model_ts.length == 0) 
    {
        $.ajax({
            type: 'POST',
            url: '/Times/AddWtorek',
            data: {
                czyWtorekWolny: checkboxStatus
            },
            success: function (response)
            {
                $(lds).show();
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
    }
    else 
    {
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //

                $.ajax({
                    type: 'POST',
                    url: '/Times/EditWtorek',
                    data: {
                        id: id_,
                        czyWtorekWolny: checkboxStatus
                    },
                    success: function (response)
                    {
                        $(lds).show();
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
            }
        }
    }
};

function QPebGULGyufDEHz_(t) 
{
    let checkboxStatus = t.checked;

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().parent().parent().append(lds);
    $(lds).hide();


    if (model_ts.length == 0) 
    {
        $.ajax({
            type: 'POST',
            url: '/Times/AddPoniedzialek',
            data: {
                czyPoniedzialekWolny: checkboxStatus
            },
            success: function (response)
            {
                $(lds).show();
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
    }
    else 
    {
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //

                $.ajax({
                    type: 'POST',
                    url: '/Times/EditPoniedzialek',
                    data: {
                        id: id_,
                        czyPoniedzialekWolny: checkboxStatus
                    },
                    success: function (response)
                    {
                        $(lds).show();
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
            }
        }
    }
};



//dodaj okres rozliczeniowy
function YaohyXTjGdIPVHK(t)
{
    //
    let okres = t.value;
    let okres_options = document.getElementById('dOAFhxfwDtzoHav');
    //

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(okres_options).parent().append(lds);
    $(lds).hide();


    if (model_ts.length == 0)
    {
        if (okres.length > 0 && okres_options.selectedIndex > 0) 
        {
            let okres_tydzien = false;
            let okres_miesiac = false;
            if (okres_options.selectedIndex == 1)
                okres_tydzien = true;
            if (okres_options.selectedIndex == 2)
                okres_miesiac = true;

            $.ajax({
                type: 'POST',
                url: '/Times/AddOkres',
                data: {
                    okresRozliczeniowy: okres,
                    jezeliTydzien: okres_tydzien,
                    jezeliMiesiac: okres_miesiac
                },
                success: function (response)
                {
                    $(lds).show();
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
        }
    }
    else
    {
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //

                if (model_ts[i].OkresRozliczeniowy != okres && okres.length != 0 && okres != 0 && okres_options.selectedIndex > 0)
                {
                    let okres_tydzien = false;
                    let okres_miesiac = false;
                    if (okres_options.selectedIndex == 1)
                        okres_tydzien = true;
                    if (okres_options.selectedIndex == 2)
                        okres_miesiac = true;

                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditOkres',
                        data: {
                            id: id_,
                            okresRozliczeniowy: okres,
                            jezeliTydzien: okres_tydzien,
                            jezeliMiesiac: okres_miesiac
                        },
                        success: function (response)
                        {
                            $(lds).show();
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
                }
                else if (model_ts[i].OkresRozliczeniowy != null && okres.length == 0 && okres != 0 && okres_options.selectedIndex > 0) 
                {
                    let okres_tydzien = false;
                    let okres_miesiac = false;
                    if (okres_options.selectedIndex == 1)
                        okres_tydzien = true;
                    if (okres_options.selectedIndex == 2)
                        okres_miesiac = true;

                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditOkres',
                        data: {
                            id: id_,
                            okresRozliczeniowy: okres,
                            jezeliTydzien: okres_tydzien,
                            jezeliMiesiac: okres_miesiac
                        },
                        success: function (response)
                        {
                            $(lds).show();
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
                }
            }
        }
    }
};

function dOAFhxfwDtzoHav_(t) 
{
    //
    let okres = document.getElementById('IkruzJFAfehduep').value; 
    let okres_options = t;
    //

    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(okres_options).parent().append(lds);
    $(lds).hide();

    if (model_ts.length == 0) 
    {
        if (okres.length > 0 && okres_options.selectedIndex > 0) 
        {
            let okres_tydzien = false;
            let okres_miesiac = false;
            if (okres_options.selectedIndex == 1)
                okres_tydzien = true;
            if (okres_options.selectedIndex == 2)
                okres_miesiac = true;

            $.ajax({
                type: 'POST',
                url: '/Times/AddOkres',
                data: {
                    okresRozliczeniowy: okres,
                    jezeliTydzien: okres_tydzien,
                    jezeliMiesiac: okres_miesiac
                },
                success: function (response)
                {
                    $(lds).show();
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
        }
    }
    else
    {     
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //

                if (okres.length != 0 && okres != 0) 
                {
                    let okres_tydzien = false;
                    let okres_miesiac = false;
                    if (okres_options.selectedIndex == 1)
                        okres_tydzien = true;
                    if (okres_options.selectedIndex == 2)
                        okres_miesiac = true;

                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditOkres',
                        data: {
                            id: id_,
                            okresRozliczeniowy: okres,
                            jezeliTydzien: okres_tydzien,
                            jezeliMiesiac: okres_miesiac
                        },
                        success: function (response)
                        {
                            $(lds).show();
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
                }
            }
        }
    }
};

//dodaj czas pracy
function IIjDrhHnsJwmqtN(t) {
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().append(lds);
    $(lds).hide();

    //
    let okres = t.value;
    //

    if (model_ts.length == 0)
    {
        if (okres.length > 0)
        {
            $.ajax({
                type: 'POST',
                url: '/Times/AddCzasPracy',
                data: {
                    czasPracy: okres
                },
                success: function (response)
                {
                    $(lds).show();
                    setTimeout(function ()
                    {
                        location.reload();
                    }, 300);
                },
                error: function (xhr, status, error)
                {
                    console.log('Error adding data:', error);
                }
            });
        }
    }
    else
    {
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //
                if (model_ts[i].CzasPracy != okres && okres.length != 0)
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditCzasPracy',
                        data: {
                            id: id_,
                            czasPracy: okres
                        },
                        success: function (response)
                        {
                            $(lds).show();
                            setTimeout(function ()
                            {
                                location.reload();
                            }, 300);
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding data:', error);
                        }
                    });
                }
                else if (model_ts[i].CzasPracy != null && okres.length == 0) 
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditCzasPracy',
                        data: {
                            id: id_,
                            czasPracy: okres
                        },
                        success: function (response)
                        {
                            $(lds).show();
                            setTimeout(function ()
                            {
                                location.reload();
                            }, 300);
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding data:', error);
                        }
                    });
                }
            }
        }
    }
};

//dodaj max godzin w tygodniu
function jShPfjshHZwMBZw(t) {
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().append(lds);
    $(lds).hide();

    //
    let okres = t.value;
    //

    if (model_ts.length == 0)
    {
        if (okres.length > 0)
        {
            $.ajax({
                type: 'POST',
                url: '/Times/AddMaksymalnaLiczbaNadgodzinTydzien',
                data: {
                    maksymalnaLiczbaNadgodzinTydzien: okres
                },
                success: function (response)
                {
                    $(lds).show();
                    setTimeout(function ()
                    {
                        location.reload();
                    }, 300);
                },
                error: function (xhr, status, error)
                {
                    console.log('Error adding data:', error);
                }
            });
        }
    }
    else
    {
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //
                if (model_ts[i].MaksymalnaLiczbaNadgodzinTydzien != okres && okres.length != 0)
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditMaksymalnaLiczbaNadgodzinTydzien',
                        data: {
                            id: id_,
                            maksymalnaLiczbaNadgodzinTydzien: okres
                        },
                        success: function (response)
                        {
                            $(lds).show();
                            setTimeout(function ()
                            {
                                location.reload();
                            }, 300);
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding data:', error);
                        }
                    });
                }
                else if (model_ts[i].MaksymalnaLiczbaNadgodzinTydzien != null && okres.length == 0) 
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditMaksymalnaLiczbaNadgodzinTydzien',
                        data: {
                            id: id_,
                            maksymalnaLiczbaNadgodzinTydzien: okres
                        },
                        success: function (response)
                        {
                            $(lds).show();
                            setTimeout(function ()
                            {
                                location.reload();
                            }, 300);
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding data:', error);
                        }
                    });
                }
            }
        }
    }
};

//dodaj max godzin w roku
function XzSwltkFnFZxgQl(t) {
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().append(lds);
    $(lds).hide();

    //
    let okres = t.value;
    //

    if (model_ts.length == 0)
    {
        if (okres.length > 0)
        {
            $.ajax({
                type: 'POST',
                url: '/Times/AddMaksymalnaLiczbaNadgodzin',
                data: {
                    maksymalnaLiczbaNadgodzin: okres
                },
                success: function (response)
                {
                    $(lds).show();
                    setTimeout(function ()
                    {
                        location.reload();
                    }, 300);
                },
                error: function (xhr, status, error)
                {
                    console.log('Error adding data:', error);
                }
            });
        }
    }
    else
    {
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //
                if (model_ts[i].MaksymalnaLiczbaNadgodzin != okres && okres.length != 0)
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditMaksymalnaLiczbaNadgodzin',
                        data: {
                            id: id_,
                            maksymalnaLiczbaNadgodzin: okres
                        },
                        success: function (response)
                        {
                            $(lds).show();
                            setTimeout(function ()
                            {
                                location.reload();
                            }, 300);
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding data:', error);
                        }
                    });
                }
                else if (model_ts[i].MaksymalnaLiczbaNadgodzin != null && okres.length == 0) 
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditMaksymalnaLiczbaNadgodzin',
                        data: {
                            id: id_,
                            maksymalnaLiczbaNadgodzin: okres
                        },
                        success: function (response)
                        {
                            $(lds).show();
                            setTimeout(function ()
                            {
                                location.reload();
                            }, 300);
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding data:', error);
                        }
                    });
                }
            }
        }
    }
};

//dodaj Nieprzerwany odpoczynek między dniami roboczymi
function bnjRnAOHPyGsOAT(t) {
    var lds = document.createElement('div');
    lds.className = 'lds-ring-small';
    lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
    $(t).parent().append(lds);
    $(lds).hide();

    //
    let okres = t.value;
    //

    if (model_ts.length == 0)
    {
        if (okres.length > 0)
        {
            $.ajax({
                type: 'POST',
                url: '/Times/AddNieprzerwanyOdpoczynek',
                data: {
                    nieprzerwanyOdpoczynek: okres
                },
                success: function (response)
                {
                    $(lds).show();
                    setTimeout(function ()
                    {
                        location.reload();
                    }, 300);
                },
                error: function (xhr, status, error)
                {
                    console.log('Error adding data:', error);
                }
            });
        }
    }
    else
    {
        for (let i = 0; i < model_ts.length; i++)
        {
            if (model_ts[i].WorkerId == null)
            {
                let id_ = model_ts[i].Id;
                //
                if (model_ts[i].NieprzerwanyOdpoczynek != okres && okres.length != 0)
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditNieprzerwanyOdpoczynek',
                        data: {
                            id: id_,
                            nieprzerwanyOdpoczynek: okres
                        },
                        success: function (response)
                        {
                            $(lds).show();
                            setTimeout(function ()
                            {
                                location.reload();
                            }, 300);
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding data:', error);
                        }
                    });
                }
                else if (model_ts[i].NieprzerwanyOdpoczynek != null && okres.length == 0) 
                {
                    $.ajax({
                        type: 'POST',
                        url: '/Times/EditNieprzerwanyOdpoczynek',
                        data: {
                            id: id_,
                            nieprzerwanyOdpoczynek: okres
                        },
                        success: function (response)
                        {
                            $(lds).show();
                            setTimeout(function ()
                            {
                                location.reload();
                            }, 300);
                        },
                        error: function (xhr, status, error)
                        {
                            console.log('Error adding data:', error);
                        }
                    });
                }
            }
        }
    }
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



let selected = document.getElementById('settings_times_id');
selected.classList.add('settings_a_selected');



$('#yYNizTMVTEhbkFD').on('click', function ()
{
    $('#GpoavnFwAOos').fadeIn(200);
});

$('#eNILXHlgCbgJCln').on('click', function ()
{
    $('#ftcuESUFJMUetmm').fadeOut(200);
});

$('#dQIPREqlxghevrV').on('change', function (e)
{
    document.getElementById('issyAJUIywIPgIQ').innerHTML = '';
    for (let i = 0; i < model_w.length; i++) {
        if (e.target.value == model_w[i].DepartmentID) {
            document.getElementById('issyAJUIywIPgIQ').innerHTML += '<option value=' + model_w[i].Id + '>' + model_w[i].Surname + ' ' + model_w[i].Name + '</option>';
        }
    }
});
$('#dQIPREqlxghevrV').trigger('change');



$('#LRKPgUoIPlhVTMS').on('click', function ()
{
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
});

function EjaqSVIBTCAu()
{
    let a = document.getElementById('GpoavnFwAOos');
    $(a).fadeOut(200);
};

function vscNmCABakSwTKc()
{
    let a = document.getElementById('nGWLQDZPlPSDQaC');
    $(a).fadeOut(200);
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

function UXOaovmCsnlURsn(t, evt)
{
    //if (t.value.length > -1)
    //{
    //    let children = $(t).parent().children().eq(1).children();
    //    for (let i = 0; i < children.length; i++)
    //    {
    //        $(children[i]).removeClass('flYuCaWkWLvKDYr');
    //        $(children[i]).children().removeAttr('disabled');
    //    }
    //}
    //else 
    //{
    //    let children = $(t).parent().children().eq(1).children();
    //    for (let i = 0; i < children.length; i++)
    //    {
    //        $(children[i]).addClass('flYuCaWkWLvKDYr');
    //        $(children[i]).children().attr('disabled');
    //    }
    //}

    //if (t.value.length > -1)
    //{
    //    let children = $(t).parent().children().eq(1).children();
    //    for (let i = 0; i < children.length; i++)
    //    {
    //        $(children[i]).removeClass('flYuCaWkWLvKDYr');
    //        $(children[i]).children().removeAttr('disabled');
    //    }
    //}
    //else 
    //{

    //}

    //var key = evt.keyCode || evt.charCode;
    //if (key == 8 || key == 46)
    //{            
    //        let children = $(t).parent().children().eq(1).children();
    //        for (let i = 0; i < children.length; i++)
    //        {
    //            $(children[i]).addClass('flYuCaWkWLvKDYr');
    //            $(children[i]).children().attr('disabled', '');
    //        }
    //}
};

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


function cbclick(e)
{
    e = e || event;
    var cb = e.srcElement || e.target;
    if (cb.type !== 'checkbox') { return true; }
    var cbxs = document.getElementById('radiocb').getElementsByTagName('input'), i = cbxs.length;
    while (i--)
    {
        if (cbxs[i].type && cbxs[i].type == 'checkbox' && cbxs[i].id !== cb.id)
        {
            cbxs[i].checked = false;
        }
    }
    // if the click should always result in a checked checkbox
    // unconmment this:
    // cb.checked = true;
}



function GTUwirLRmPXoIuh(t)
{
    sessionStorage.setItem('hCiEUYaJyBZCWTU', t.id);
    //document.getElementById('ewZOdyapfFtPtMi').innerHTML = t.getAttribute('name');
    document.getElementById('ewZOdyapfFtPtMi').innerHTML = $(t).parent().parent().children().eq(0).html();
    document.getElementById('nZDLxLTZwFzAFCY').innerHTML = $(t).parent().parent().children().eq(1).html();

    let a = document.getElementById('YiAVCpnVzhDnOsL');
    $(a).fadeIn(200);
};

function UOspQSjpbVdS()
{
    let a = document.getElementById('YiAVCpnVzhDnOsL');
    $(a).fadeOut(200);
};

function dDlRcSCJZAuO()
{
    let id_ = sessionStorage.getItem('hCiEUYaJyBZCWTU');

    $.ajax({
        type: 'POST',
        url: '/Leave4/RemoveLeave',
        data: {
            id: id_
        },
        success: function (response)
        {
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error deleting data:', error);
        }
    });
};

function klhLiQVRwGfWrSp(t)
{
    sessionStorage.setItem('MRZrhugkTpKvhtm', t.id);
    document.getElementById('AazUHXhkXIbdKWH').value = $(t).parent().parent().children().eq(0).html();
    document.getElementById('TDGIADzVjJqefsV').value = $(t).parent().parent().children().eq(1).html();
    document.getElementById('VumSHUqECwbXZcK').value = $(t).parent().parent().children().eq(2).html().split(' ')[0];
    document.getElementById('cb1_').checked = $(t).parent().parent().children().eq(2).attr('checked1');
    document.getElementById('cb2_').checked = $(t).parent().parent().children().eq(2).attr('checked2');
    document.getElementById('cb3_').checked = $(t).parent().parent().children().eq(2).attr('checked3');
    document.getElementById('cb4_').checked = $(t).parent().parent().children().eq(2).attr('checked4');
    document.getElementById('cb5_').checked = $(t).parent().parent().children().eq(3).children().eq(0).attr('checked');
    document.getElementById('cb6_').checked = $(t).parent().parent().children().eq(4).children().eq(0).attr('checked');



    let nGWLQDZPlPSDQaC = document.getElementById('nGWLQDZPlPSDQaC');
    $(nGWLQDZPlPSDQaC).fadeIn(200);
};

function LkHTSbDyYLLvJeC()
{
    let id_ = sessionStorage.getItem('MRZrhugkTpKvhtm');

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

$('#HamaCLjyVSpUlPh').on('click', function ()
{
    $('#bouHwUSUJAULmxy').fadeOut(200);
});

function pEIhAaljnrXIAfq(t) {
    let id_ = t.getAttribute('uHtqZrPMvAndRri');
    let workerID_ = t.getAttribute('CRxhxVVduqEVHZl');
    
    let name = $(t).parent().parent().children().eq(0).html();
    $('#mtjAVQlKEdZLfWP').val(name);

    for (let i = 0; i < model_ts.length; i++) {
        if (model_ts[i].Id == id_) {
            let workerID_ = model_ts[i].WorkerId;
            for (let j = 0; j < model_w.length; j++) {
                if (model_w[j].Id == workerID_) {
                    for (let k = 0; k < model_d.length; k++) {
                        if (model_w[j].DepartmentID == model_d[k].Id) {
                            $('#oGwNKChRERGiLSG').val(model_d[k].Name);
                        }
                    }
                }
            }

            //qeavlfguoZjzrJJ - Dobowy wymiar czasu pracy (godz.)
            //qSFTqMAjJYMmIrO - Okres rozliczeniowy (miesiące)
            //QzUmEAmLsPWlpfK - Okres rozliczeniowy: tydzien/miesiac
            //gATdSghHoiZijAN - Maks. nadgodzin w tygodniu (godz.)
            //SEcPtfWbLyUxlmL - Maks. nadgodzin w roku (godz.)
            //DrwWFscldmvtHOW - Nieprzerwany odpoczynek (godz.)
            $('#qeavlfguoZjzrJJ').val(model_ts[i].CzasPracy);
            $('#qSFTqMAjJYMmIrO').val(model_ts[i].OkresRozliczeniowy);
            if (model_ts[i].jezeliTydzien == true) 
            {
                document.getElementById('QzUmEAmLsPWlpfK').selectedIndex = 1;
            }
            if (model_ts[i].jezeliMiesiac == true) 
            {
                document.getElementById('QzUmEAmLsPWlpfK').selectedIndex = 2;
            }
            $('#gATdSghHoiZijAN').val(model_ts[i].MaksymalnaLiczbaNadgodzinTydzien);
            $('#SEcPtfWbLyUxlmL').val(model_ts[i].MaksymalnaLiczbaNadgodzin);
            $('#DrwWFscldmvtHOW').val(model_ts[i].NieprzerwanyOdpoczynek);
        }
    }

    sessionStorage.setItem('KiLsESLXdficmJJ', id_);
    sessionStorage.setItem('wWlSezYqPzZxuQZ', workerID_);
    $('#bouHwUSUJAULmxy').fadeIn(200);
};

$('#cDoWdsoylXsqbSk').on('click', function ()
{
    let wID = document.getElementById('issyAJUIywIPgIQ').value;
    let okres = document.getElementById('ehgSlSwjIFIEMWH').value;
    let okres_options = document.getElementById('kEYeEJKlcJcQFdL');
    let wymiar = document.getElementById('zVbJqIMfPhbOnum').value;
    let nadgodzin_tyg = document.getElementById('klyMbuAvknxCxgo').value;
    let nadgodzin_rok = document.getElementById('KZzKslyEOOrVYOF').value;
    let odpoczynek = document.getElementById('WdWDgtaDQwkuFxr').value;


    if (wymiar.length > 0 || okres.length > 0 && okres_options.selectedIndex > 0 || nadgodzin_tyg.length > 0 || nadgodzin_rok.length > 0 || odpoczynek.length > 0) 
    {
        var okres_tydzien = false;
        var okres_miesiac = false;
        if (okres_options.selectedIndex == 1) 
        {
            okres_tydzien = true;
        }
        else if (okres_options.selectedIndex == 2) 
        {
            okres_miesiac = true;
        }
        else 
        {
            okres_tydzien = null;
            okres_miesiac = null;
        }

        for (let i = 0; i < model_ts.length; i++) {
            if (model_ts[i].WorkerId == wID)
            {
                return false;
            }
            else 
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
                        location.reload();
                    },
                    error: function (xhr, status, error)
                    {
                        console.log('Error:', error);
                    }
                });

                break;
            }
        }
    }
});

$('#THAxAvslRnLsHel').on('click', function ()
{
    let id_ = sessionStorage.getItem('KiLsESLXdficmJJ');
    let wID = sessionStorage.getItem('wWlSezYqPzZxuQZ');
    let okres = document.getElementById('qSFTqMAjJYMmIrO').value;
    let okres_options = document.getElementById('QzUmEAmLsPWlpfK');
    let wymiar = document.getElementById('qeavlfguoZjzrJJ').value;
    let nadgodzin_tyg = document.getElementById('gATdSghHoiZijAN').value;
    let nadgodzin_rok = document.getElementById('SEcPtfWbLyUxlmL').value;
    let odpoczynek = document.getElementById('DrwWFscldmvtHOW').value;

    //if (wymiar.length > 0 || nadgodzin_tyg.length > 0 || nadgodzin_rok.length > 0 || odpoczynek.length > 0) 
    //{
        
    //}

    if (okres.length > 0 && okres_options.selectedIndex == 0) 
    {
        return false;
    }
    else if (okres.length == 0 && okres_options.selectedIndex > 0) 
    {
        return false;
    }
    else 
    {
        var okres_tydzien = false;
        var okres_miesiac = false;
        if (okres_options.selectedIndex == 1)
            okres_tydzien = true;
        if (okres_options.selectedIndex == 2)
            okres_miesiac = true;


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
});

function BPrZxQsyhDUoPdi(t) {
    let id_ = t.getAttribute('uHtqZrPMvAndRri');

    $('#YsefcRpBdJWtpIK').html($(t).parent().parent().children('span').html());

    sessionStorage.setItem('rfSHguaRDcUoDDt', id_);
    $('#aekPvskkEgnnMQf').fadeIn(200);
};

$('#wHZuCVkfasotfqq').on('click', function ()
{
    $('#aekPvskkEgnnMQf').fadeOut(200);
});

$('#TGdaSoYPTTTHTtr').on('click', function ()
{
    let id_ = sessionStorage.getItem('rfSHguaRDcUoDDt');

    $.ajax({
        type: 'POST',
        url: '/Times/RemoveWorkerException',
        data: {
            id: id_
        },
        success: function (response)
        {
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error removing data:', error);
        }
    });
});








