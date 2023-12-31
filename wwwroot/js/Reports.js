
function generateReport1() {

};

function ohGskGVRJUeutBg() {
    document.getElementById('ozDFgASwhEsiUPZ').innerHTML = '';

    let IrtDSkGZAKrOlBd = document.getElementById('IrtDSkGZAKrOlBd');
    let departmentID_ = IrtDSkGZAKrOlBd.options[IrtDSkGZAKrOlBd.selectedIndex].value;

    for (let i = 0; i < model_w.length; i++) {
        if (model_w[i].DepartmentID == departmentID_) {
            document.getElementById('ozDFgASwhEsiUPZ').innerHTML += `<option value="` + model_w[i].Id + `" id="` + model_w[i].DepartmentID + `">` + model_w[i].Surname + ` ` + model_w[i].Name + `</option>`;
        }
    }

    generateReport1();
};
ohGskGVRJUeutBg();

function QGJieqVtcQkpMtw() {
    generateReport1();
};

$('#MCtUJSqMvcgGYCa').on('change', function ()
{
    generateReport1();
});

