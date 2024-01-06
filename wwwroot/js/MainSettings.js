
function SWsLyZvwqDpSdQO_(t) {
    if (t.checked)
    {
        $(t).parent().parent().children().eq(2).removeClass('msdgExEZCpefgcL_disabled');
    }
    else {
        $(t).parent().parent().children().eq(2).addClass('msdgExEZCpefgcL_disabled');
    }
};

function nLzkASTGLjvGiSi_(t) {
    if (t.checked)
    {
        $(t).parent().parent().children().eq(2).removeClass('msdgExEZCpefgcL_disabled');
    }
    else
    {
        $(t).parent().parent().children().eq(2).addClass('msdgExEZCpefgcL_disabled');
    }
};

function hQJwclGLiNLiRrQ_(t) {
    if (t.checked)
    {
        localStorage.setItem('IVsEIeXIRNQqrAG', '1');
        collapse();
    }
    else {
        localStorage.removeItem('IVsEIeXIRNQqrAG');
        expand();
    }
};

function hQJwclGLiNLiRrQ__() {
    if (localStorage.getItem('IVsEIeXIRNQqrAG') != null)
    {
        document.getElementById('hQJwclGLiNLiRrQ').checked = true;
    }
    else {
        document.getElementById('hQJwclGLiNLiRrQ').checked = false;
    }
};
hQJwclGLiNLiRrQ__();

