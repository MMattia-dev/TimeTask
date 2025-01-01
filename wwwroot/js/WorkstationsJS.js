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
    $.ajax({
        type: 'POST',
        url: '/Workstations/AddNewWorkstation',
        data: {
            name: name_,
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