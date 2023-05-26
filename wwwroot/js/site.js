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
var lds = document.createElement('div');
lds.className = 'lds-ring';
lds.innerHTML += `<div></div><div></div><div></div><div></div>`;
loader.style.display = 'none';
loader.appendChild(lds);
main.appendChild(loader);


var rightNav = document.querySelector('.right-nav');
var spanInfo = document.createElement('div');
spanInfo.id = 'info';
spanInfo.innerHTML += '<svg viewBox="0 0 32 32" width="64" height="64"><path d="M26.562 5.309c-0.896-0.918-1.916-1.71-3.034-2.349l-0.067-0.035c-2.087-1.186-4.584-1.886-7.245-1.886-0.825 0-1.634 0.067-2.422 0.196l0.086-0.012c-0.999 0.16-1.89 0.404-2.739 0.731l0.092-0.031c-1.246 0.453-2.316 1.113-3.223 1.948l0.007-0.006c0.918-0.532 1.981-0.958 3.107-1.224l0.080-0.016c0.866-0.213 1.861-0.334 2.884-0.334 0.627 0 1.242 0.046 1.844 0.134l-0.068-0.008c2.677 0.375 5.028 1.556 6.854 3.286l-0.006-0.005c0.612 0.58 1.148 1.231 1.598 1.942l0.024 0.041c0.841 1.321 1.34 2.93 1.34 4.657 0 1.568-0.412 3.039-1.133 4.312l0.023-0.044c-1.209 1.8-3.179 3.007-5.439 3.16l-0.022 0.001c-1.030-0.038-1.992-0.295-2.852-0.725l0.040 0.018c-1.7-0.775-2.86-2.459-2.86-4.414 0-1.358 0.56-2.586 1.462-3.465l0.001-0.001c-0.101-0.011-0.219-0.017-0.337-0.017-1.264 0-2.368 0.685-2.961 1.704l-0.009 0.016c-0.456 0.819-0.725 1.797-0.725 2.838 0 0.791 0.155 1.546 0.437 2.235l-0.014-0.040c-0.345-0.687-0.603-1.483-0.732-2.323l-0.006-0.045c-0.065-0.421-0.103-0.907-0.103-1.401 0-1.223 0.228-2.393 0.645-3.469l-0.022 0.066c0.437-1.149 1.028-2.14 1.76-3.008l-0.013 0.015c0.892-1.11 2.051-1.97 3.382-2.487l0.055-0.019c-0.799-0.6-1.808-0.96-2.901-0.96-0.044 0-0.087 0.001-0.131 0.002l0.006-0c-0.038-0.001-0.082-0.001-0.127-0.001-2.37 0-4.543 0.842-6.237 2.242l0.016-0.013c-0.999 0.832-1.825 1.833-2.443 2.963l-0.027 0.053c-0.327 0.595-0.622 1.29-0.849 2.015l-0.022 0.082c0.225-1.885 0.777-3.599 1.598-5.146l-0.038 0.079c-1.345 0.939-2.384 2.233-2.992 3.745l-0.020 0.056c-0.69 1.699-1.090 3.669-1.090 5.733 0 0.844 0.067 1.671 0.196 2.479l-0.012-0.089c1.25 7.137 7.4 12.492 14.801 12.492 8.293 0 15.015-6.722 15.015-15.015 0-4.164-1.695-7.932-4.433-10.652l-0.001-0.001z"></path></svg>';
spanInfo.innerHTML += '<span>Aplikacja TIMETASK działa najlepiej na przeglądarce \'Mozilla Firefox\'.</span>';
spanInfo.style.display = 'none';
rightNav.appendChild(spanInfo);


var logoScreen = document.createElement('div');
logoScreen.id = 'logoid';
logoScreen.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="1000" height="625" viewBox="0 0 1000 625"><g transform="matrix(1,0,0,1,0,0)"><svg viewBox="0 0 512 320" data-background-color="#ffffff" preserveAspectRatio="xMidYMid meet" height="625" width="1000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="tight-bounds" transform="matrix(1,0,0,1,0,0)"><svg viewBox="0 0 512 320" height="320" width="512"><g><svg></svg></g><g><svg viewBox="0 0 512 320" height="320" width="512"><g><path xmlns="http://www.w3.org/2000/svg" d="M96 160c0-88.366 71.634-160 160-160 88.366 0 160 71.634 160 160 0 88.366-71.634 160-160 160-88.366 0-160-71.634-160-160zM256 313.678c84.874 0 153.678-68.804 153.678-153.678 0-84.874-68.804-153.678-153.678-153.678-84.874 0-153.678 68.804-153.678 153.678 0 84.874 68.804 153.678 153.678 153.678z" fill="#61777f" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal" data-fill-palette-color="tertiary"></path></g><g transform="matrix(1,0,0,1,128,142.47313061770893)"><svg viewBox="0 0 256 35.05373876458214" height="35.05373876458214" width="256"><g><svg viewBox="0 0 256 35.05373876458214" height="35.05373876458214" width="256"><g><svg viewBox="0 0 256 35.05373876458214" height="35.05373876458214" width="256"><g id="textblocktransform"><svg viewBox="0 0 256 35.05373876458214" height="35.05373876458214" width="256" id="textblock"><g><svg viewBox="0 0 256 35.05373876458214" height="35.05373876458214" width="256"><g transform="matrix(1,0,0,1,0,0)"><svg width="256" viewBox="0 -35.79999923706055 261.42999267578125 35.79999923706055" height="35.05373876458214" data-palette-color="#61777f"><path d="M18.05-2.15L30.2-2.15 30.2 0 0 0 0-2.15 12.15-2.15 12.15-29.55 1.55-29.55 1.55-34.95 28.65-34.95 28.65-29.55 18.05-29.55 18.05-2.15ZM30.2-2.15L35.05-2.15 35.05-34.95 40.95-34.95 40.95-2.15 45.8-2.15 45.8 0 30.2 0 30.2-2.15ZM90.09-2.15L94.95-2.15 94.95 0 84.2 0 84.2-27.3 72-3.05 68.7-3.05 56.55-27.3 56.55 0 45.8 0 45.8-2.15 50.65-2.15 50.65-34.95 59.84-34.95 70.4-13 80.94-34.95 90.09-34.95 90.09-2.15ZM94.94-2.15L99.79-2.15 99.79-34.95 124.34-34.95 124.34-29.4 105.69-29.4 105.69-20.15 122.44-20.15 122.44-14.9 105.69-14.9 105.69-5.55 124.94-5.55 124.94-2.15 129.79-2.15 129.79 0 94.94 0 94.94-2.15ZM145.69-2.15L157.84-2.15 157.84 0 127.64 0 127.64-2.15 139.79-2.15 139.79-29.55 129.19-29.55 129.19-34.95 156.29-34.95 156.29-29.55 145.69-29.55 145.69-2.15ZM191.24-2.15L197.04-2.15 197.04 0 185.89 0 182.39-7.95 164.89-7.95 161.39 0 150.24 0 150.24-2.15 156.04-2.15 170.49-34.95 176.79-34.95 191.24-2.15ZM167.29-13.4L179.99-13.4 173.64-27.8 167.29-13.4ZM217.44-2.15L223.69-2.15 223.69 0 192.19 0 192.19-2.15 198.59-2.15Q196.19-3.4 194.19-5.25L194.19-5.25 197.89-9.7Q203.19-5.1 208.89-5.1L208.89-5.1Q211.74-5.1 213.41-6.33 215.09-7.55 215.09-9.58 215.09-11.6 213.51-12.73 211.94-13.85 208.09-14.78 204.24-15.7 202.24-16.48 200.24-17.25 198.69-18.5L198.69-18.5Q195.59-20.85 195.59-25.7 195.59-30.55 199.11-33.18 202.64-35.8 207.84-35.8L207.84-35.8Q211.19-35.8 214.49-34.7 217.79-33.6 220.19-31.6L220.19-31.6 217.04-27.15Q215.49-28.55 212.84-29.45 210.19-30.35 207.61-30.35 205.04-30.35 203.39-29.3 201.74-28.25 201.74-26.13 201.74-24 203.39-22.88 205.04-21.75 210.41-20.45 215.79-19.15 218.51-16.8 221.24-14.45 221.24-10.2L221.24-10.2Q221.24-5.05 217.44-2.15L217.44-2.15ZM223.68-2.15L228.53-2.15 228.53-34.95 234.43-34.95 234.43-17.9 250.43-34.95 257.93-34.95 243.88-19.65 256.58-2.1 256.58-2.15 261.43-2.15 261.43 0 251.13 0 239.53-15.3 234.43-9.8 234.43 0 223.68 0 223.68-2.15Z" opacity="1" transform="matrix(1,0,0,1,0,0)" fill="#61777f" class="undefined-text-0" data-fill-palette-color="primary" id="text-0"></path></svg></g></svg></g></svg></g></svg></g><g></g></svg></g></svg></g></svg></g><defs></defs></svg><rect width="512" height="320" fill="none" stroke="none" visibility="hidden"></rect></g></svg></g></svg>';
logoScreen.style.display = 'none';
rightNav.appendChild(logoScreen);
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
    $(loader).fadeIn();

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
    //border - top - right - radius: 10px;
    //border - bottom - right - radius: 10px;


    setTimeout(function ()
    {
        $('#logOutClick').trigger('click');
    }, 1200);
};

function logIn() {
    localStorage.setItem('logged', 'true');

    $(loader).fadeIn();

    //setTimeout(function ()
    //{
    //    $('#account').fadeOut(300);

    //    setTimeout(function ()
    //    {
    //        $('#logoid').fadeIn();
    //    }, 300);

    //    setTimeout(function ()
    //    {
    //        $('#logoid').fadeOut();
    //    }, 2000);

    //    setTimeout(function ()
    //    {
    //        $(spanInfo).fadeIn();
    //    }, 2200);

    //    setTimeout(function ()
    //    {
    //        $(spanInfo).fadeOut();
    //    }, 4400);

    //    setTimeout(function ()
    //    {
    //        $('#logInClick').trigger('click');
    //    }, 4700);

    //}, 1000);

    

};

$(document).ready(function ()
{
    $(loader).fadeOut();

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
            }, 300);
            setTimeout(function ()
            {
                $(ZLD38GJQEtrB).fadeIn();
                $(ozozaNCrSaQI).fadeIn();
                localStorage.removeItem('logged');
            }, 1000);
        }
        
    }

    //setTimeout(function ()
    //{
    //    localStorage.removeItem('logged');
    //}, 3000);
    
    


});

function DKE3PlNoUnmS(t) {
    //console.log(t.scrollTop);
    localStorage.setItem('DKE3PlNoUnmS', t.scrollTop);
};