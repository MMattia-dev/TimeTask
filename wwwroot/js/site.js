// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var main = document.querySelector('.parent');
var loader = document.createElement('div');
loader.className = 'loader';
var lds = document.createElement('div');
lds.className = 'lds-ring';
lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
loader.style.display = 'none';
loader.appendChild(lds);
main.appendChild(loader);


//var spanInfo = document.createElement('span');
//spanInfo.id = 'info';
//spanInfo.innerHTML = 'Aplikcja TimeTask nalepiej działa na przeglądarce Mozilla Firefox.';
//main.appendChild(spanInfo);




function sortArray(array) {
    array.sort(function (a, b)
    {
        if (a.Name < b.Name)
        {
            return -1;
        }
        if (a.Name > b.Name)
        {
            return 1;
        }
        return 0;
    });
};

function logOut() {
    $(loader).fadeIn();

    let a = document.querySelector('.IdRKPExyAQSewBL');
    let b = document.querySelector('.user');
    $(a).fadeOut();
    $(b).fadeOut();

    setTimeout(function ()
    {
        $('#logOutClick').trigger('click');
    }, 1200);
};

function logIn() {
    localStorage.setItem('logged', 'true');

    $(loader).fadeIn();

    //$('#info').fadeOut();

    setTimeout(function ()
    {
        $('#account').fadeOut(300);

        setTimeout(function ()
        {
            $('#logInClick').trigger('click');
        }, 300);

    }, 1000);
};

$(document).ready(function ()
{
    $(loader).fadeOut();

    $('#account').fadeIn(300);

    //if (window.performance)
    //{
    //    console.info("window.performance works fine on this browser");
    //}
    //https://stackoverflow.com/questions/5004978/check-if-page-gets-reloaded-or-refreshed-in-javascript

    localStorage.removeItem('logged');
    

});