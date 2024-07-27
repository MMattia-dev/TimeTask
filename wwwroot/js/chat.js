//var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

////Disable the send button until connection is established.
//document.getElementById("sendButton").disabled = true;

//connection.on("ReceiveMessage", function (user, message)
//{
//    var li = document.createElement("li");
//    document.getElementById("messagesList").appendChild(li);
//    // We can assign user-supplied strings to an element's textContent because it
//    // is not interpreted as markup. If you're assigning in any other way, you 
//    // should be aware of possible script injection concerns.
//    li.textContent = `${user} says ${message}`;
//});

//connection.start().then(function ()
//{
//    document.getElementById("sendButton").disabled = false;
//}).catch(function (err)
//{
//    return console.error(err.toString());
//});

//document.getElementById("sendButton").addEventListener("click", function (event)
//{
//    var user = document.getElementById("userInput").value;
//    var message = document.getElementById("messageInput").value;
//    connection.invoke("SendMessage", user, message).catch(function (err)
//    {
//        return console.error(err.toString());
//    });
//    event.preventDefault();
//});

function KIKgUMfKkWZJxaI(e, t) 
{
    let text = t.value;

    if (text.length > 0) 
    {
        //if (e.key === "Enter")
        //{
        //    //$('.btn-custom').trigger('click');
        //    alert(text);
        //}


    }
    
};

$('.bubble').on('mouseover', function (e)
{
    if ($(e.target).hasClass('bubble'))
    {
        $(e.target).parent().children('.chatTimeStamp').show();
    }
});

$('.bubble').on('mouseout', function (e)
{
    if ($(e.target).hasClass('bubble'))
    {
        $(e.target).parent().children('.chatTimeStamp').hide();
    }
});

let chatmessages = document.querySelector('.chatMessagesBubbles');
chatmessages.scrollTo(0, chatmessages.scrollHeight);

function kTsAoyADkoTcMgH(t) {
    $(t).parent().parent().remove();
};

function scQisAIXdDGVbXF(t) {
    $(t).parent().remove();
};

dragElement(document.getElementById("chat"));

function dragElement(elmnt)
{
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header"))
    {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    }
    else
    {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e)
    {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        document.getElementById(elmnt.id + "header").style.cursor = "grabbing";
    }

    function elementDrag(e)
    {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        sessionStorage.setItem('chatBoxTop', elmnt.style.top);
        sessionStorage.setItem('chatBoxLeft', elmnt.style.left);
    }

    function closeDragElement()
    {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        document.getElementById(elmnt.id + "header").style.cursor = "grab";
    }

    if (sessionStorage.getItem('chatBoxTop') != null) 
    {
        elmnt.style.top = sessionStorage.getItem('chatBoxTop');
    }

    if (sessionStorage.getItem('chatBoxLeft') != null) 
    {
        elmnt.style.left = sessionStorage.getItem('chatBoxLeft');
    }
}

function loadChat() {
    if (sessionStorage.getItem('XaWDHywDpyvadHP') != null) //czy chat nie jest zminimalizowany 
    {
        $('#chatMini').hide();
        $('#chat').show();

        if (sessionStorage.getItem('chatBoxTop') == null) 
        {
            document.getElementById('chat').style.top = "calc(50% - 240px)";
        }

        if (sessionStorage.getItem('chatBoxLeft') == null)
        {
            document.getElementById('chat').style.left = "calc(50% - 185px)";
        }
    }
    else {
        $('#chatMini').show();
        $('#chat').hide();
    }
};
loadChat();

//show chat
function ZtMJSUFaxcMCRVo() 
{
    let chat = document.getElementById('chat');
    let chatMini = document.getElementById('chatMini');

    sessionStorage.setItem('XaWDHywDpyvadHP', 'true');
    $('#chatMini').hide();
    $('#chat').show();


    if (sessionStorage.getItem('chatBoxTop') == null) 
    {
        document.getElementById('chat').style.top = "calc(50% - 240px)";
    }

    if (sessionStorage.getItem('chatBoxLeft') == null)
    {
        document.getElementById('chat').style.left = "calc(50% - 185px)";
    }
};

//minimize
function tqMrMyJEPoAgJSW() 
{
    sessionStorage.removeItem('XaWDHywDpyvadHP');
    $('#chatMini').show();
    $('#chat').hide();

};

function YElWMlpiHOvShrB(u) 
{
    $.ajax({
        type: 'GET',
        url: '/Chats/FilterDiv',
        data: {
            u: u
        },
        success: function (response)
        {
            $('#chat').append(response);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};