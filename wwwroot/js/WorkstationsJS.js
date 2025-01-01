let selected = document.getElementById('settings_workstations_id');
selected.classList.add('settings_a_selected');

function xUSjAWmxFhkCiAD()
{
    $.ajax({
        type: 'GET',
        url: '/Workstations/NewWorkstationForm',
        success: function (response) 
        {
            $('body').append(response);
            $('#LHalxdaASJOOxrL').fadeIn(200);
        },
        error: function (xhr, status, error) 
        {
            console.log('Error:', error);
        }
    });
};

function GuDpHEcfHN()
{
    if (document.getElementById('toPdQnPuvH').value != '')
    {
        let DeViohCQjIFT = document.getElementById('toPdQnPuvH').value;

        OwCEPCelyFSecWQ(DeViohCQjIFT);
    }
};

$('#toPdQnPuvH').on('keydown', function (e)
{
    if (e.keyCode == '13')
    {//enter
        e.preventDefault();
        GuDpHEcfHN();
    }
});

function OwCEPCelyFSecWQ(name_) 
{
    let OyRfwpeqzbeyVEW = document.getElementById('OyRfwpeqzbeyVEW').value;

    $.ajax({
        type: 'POST',
        url: '/Workstations/AddNewWorkstation',
        data: {
            departmentId: OyRfwpeqzbeyVEW,
            name: name_
        },
        success: function (response)
        {
            //sessionStorage.setItem('qbMvtjjezfxSFsv', response);
            location.reload();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function nGgUoVSOQmbYyoD()
{
    $.ajax({
        type: 'GET',
        url: '/Workstations/CreateDepartmentSelect',
        success: function (response)
        {
            $('.kxOMhDZFzkDb').append(response);
            $('#rJsRgTkikJFkTVs').attr('onclick', 'PHXgTRqEbNEfYsk()');
            $('.iNzvwDsTQXDyPIR ion-icon').addClass('zwyAWlfnleMVUJu');

            if (sessionStorage.getItem('RTqrydCjXBjinzd') != null) 
            {
                $('.oJeaEVIeaFrjGFz[id="' + sessionStorage.getItem('RTqrydCjXBjinzd') + '"]').addClass('iFbPgrXjzGigaCA');
                $('.iFbPgrXjzGigaCA')[0].scrollIntoView();
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};