// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var ihJchOaMxWUD = document.querySelector('.left-nav');
var ZLD38GJQEtrB = document.querySelector('.IdRKPExyAQSewBL');
var ozozaNCrSaQI = document.querySelector('.user');

if (performance.navigation.type == performance.navigation.TYPE_RELOAD)
{
    //console.info("This page is reloaded");
} else
{
    //console.info("This page is not reloaded");
    if (localStorage.getItem('logged') != null) {
        if (ihJchOaMxWUD != null)
        {
            ihJchOaMxWUD.style.width = '0px';
            ihJchOaMxWUD.style.maxWidth = '0px';
            ihJchOaMxWUD.style.minWidth = '0px';
        }
        $(ZLD38GJQEtrB).hide();
        $(ozozaNCrSaQI).hide();
    }
}

if (localStorage.getItem('DKE3PlNoUnmS') != null)
{
    let scoll = document.querySelector('.IdRKPExyAQSewBL');
    if (scoll != null) {
        scoll.scrollTop = localStorage.getItem('DKE3PlNoUnmS');
    }
}



/**/
var main = document.querySelector('.parent');
var loader = document.createElement('div');
loader.className = 'loader';
loader.id = '#loaderID';
var lds = document.createElement('div');
lds.className = 'lds-ring';
lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
loader.style.display = 'none';
loader.appendChild(lds);
main.appendChild(loader);
/**/


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
    ihJchOaMxWUD.style.transition = 'min-width 0.75s, max-width 0.75s, width 0.75s';
    //$(loader).fadeIn();

    let a = document.querySelector('.IdRKPExyAQSewBL');
    let b = document.querySelector('.user');
    $(a).fadeOut();
    $(b).fadeOut();


    let c = document.querySelector('.left-nav');
    setTimeout(function ()
    {
        c.style.width = '0px';
        c.style.maxWidth = '0px';
        c.style.minWidth = '0px';
    }, 300);

    let d = document.querySelector('.right-nav');
    d.style.borderTopLeftRadius = '10px'
    d.style.borderBottomLeftRadius = '10px'
    let inside_d = d.querySelectorAll('*');
    for (let i = 0; i < inside_d.length; i++) {
        $(inside_d[i]).fadeOut();
    }

    setTimeout(function ()
    {
        $('#logOutClick').trigger('click');
    }, 1200);
};

function logIn() {
    localStorage.setItem('logged', 'true');
    $(loader).fadeIn();
    $('#logInClick').trigger('click');
};


$(document).ready(function ()
{
    //$(loader).fadeOut();

    //$('#account').fadeIn(300);
    let form = document.getElementsByTagName('form');
    $(form).fadeIn();

    //if (window.performance)
    //{
    //    console.info("window.performance works fine on this browser");
    //}
    //https://stackoverflow.com/questions/5004978/check-if-page-gets-reloaded-or-refreshed-in-javascript

    

    if (performance.navigation.type == performance.navigation.TYPE_RELOAD)
    {
        //console.info("This page is reloaded");
    } else
    {
        //console.info("This page is not reloaded");
        
        if (localStorage.getItem('logged') != null) {
            ihJchOaMxWUD.style.transition = 'min-width 0.75s, max-width 0.75s, width 0.75s';
            setTimeout(function ()
            {
                ihJchOaMxWUD.style.width = '300px';
                ihJchOaMxWUD.style.maxWidth = '300px';
                ihJchOaMxWUD.style.minWidth = '300px';
            }, 5000);
            setTimeout(function ()
            {
                $(ZLD38GJQEtrB).fadeIn();
                $(ozozaNCrSaQI).fadeIn();
                localStorage.removeItem('logged');
            }, 5700);
        }
        
    }



    


});

function DKE3PlNoUnmS(t) {
    //console.log(t.scrollTop);
    localStorage.setItem('DKE3PlNoUnmS', t.scrollTop);
};