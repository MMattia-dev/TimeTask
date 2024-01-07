function generateStatistics(){
    //widok poziomy
    if ($('#relrPYFTLYqMaqt').prop('checked')) 
    {
        
    }

    //widok pionowy
    if ($('#qDXIOKGzpBOMvoB').prop('checked')) 
    {
        
    }
};
generateStatistics();

$('#OvLPfkiiNwdRYgn').on('change', function ()
{
    generateStatistics();
});

$('#VQnvdBYLMNSKvmR').on('change', function ()
{
    generateStatistics();
});

$('#ZaLlHWcvXQiYgTv').on('change', function ()
{
    document.getElementById('AOZzvXnLtNqUPwN').innerHTML = '';

    let aFoQOFiXPQobjPX = document.getElementById('ZaLlHWcvXQiYgTv');
    let departmentID_ = aFoQOFiXPQobjPX.options[aFoQOFiXPQobjPX.selectedIndex].value;

    for (let i = 0; i < model_w.length; i++)
    {
        if (model_w[i].DepartmentID == departmentID_)
        {
            document.getElementById('AOZzvXnLtNqUPwN').innerHTML += `<option value="` + model_w[i].Id + `" id="` + model_w[i].DepartmentID + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
        }
    }

    generateStatistics();
});
$('#ZaLlHWcvXQiYgTv').trigger('change');

function piQGwnkhyVDjpuD() {
    sessionStorage.setItem('piQGwnkhyVDjpuD', 'true');
    sessionStorage.removeItem('fZyjOJhrSKbOWIT');
    $('#relrPYFTLYqMaqt').prop('checked', true);

    $('#piQGwnkhyVDjpuD_').addClass('pEvsatYDpkDeDPp');
    $('#fZyjOJhrSKbOWIT_').removeClass('pEvsatYDpkDeDPp');

    generateStatistics();
};

function fZyjOJhrSKbOWIT() {
    sessionStorage.setItem('fZyjOJhrSKbOWIT', 'true');
    sessionStorage.removeItem('piQGwnkhyVDjpuD');
    $('#qDXIOKGzpBOMvoB').prop('checked', true);

    $('#piQGwnkhyVDjpuD_').removeClass('pEvsatYDpkDeDPp');
    $('#fZyjOJhrSKbOWIT_').addClass('pEvsatYDpkDeDPp');

    generateStatistics();
};

function jHMXFoMqHBqRHoJ() {
    if (sessionStorage.getItem('fZyjOJhrSKbOWIT') != null)
    {
        fZyjOJhrSKbOWIT();
    }
    else {
        piQGwnkhyVDjpuD();
    }
};
jHMXFoMqHBqRHoJ();

