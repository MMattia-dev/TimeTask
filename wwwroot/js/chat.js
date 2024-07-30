function bubbleOutReceiver(t) {
    $(t).parent().children('.chatTimeStamp').hide();
};

function kTsAoyADkoTcMgH(t) {
    $(t).parent().parent().remove();
};

function scQisAIXdDGVbXF(t) {
    $(t).parent().remove();
};

$(document).on('click', function (event)
{
    if (!$(event.target).closest('.chatFilter').length)
    {
        $('.chatFilter').remove();
    }
});

$(document).on('mousedown', function (event)
{
    if (!$(event.target).closest('.bubbleSettings').length)
    {
        $('.bubbleSettings').remove();
        $('.chatTimeStamp').hide();
    }
});

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
        ZtMJSUFaxcMCRVo();
    }
    else {
        tqMrMyJEPoAgJSW();
    }
};
loadChat();

function ZtMJSUFaxcMCRVo() 
{
    if (!document.getElementById('chat')) {
        $.ajax({
            type: 'GET',
            url: '/Chats/ShowChat',
            data: {
                savedDepartment: sessionStorage.getItem('JOZPzFDGsWEEzIY')
            },
            success: function (response)
            {
                $('.ATKLsxSduWPahPh').append(response);
                $('.chatMinimized').remove();

                sessionStorage.setItem('XaWDHywDpyvadHP', 'true');

                if (sessionStorage.getItem('chatBoxTop') == null)
                {
                    document.getElementById('chat').style.top = "calc(50% - 240px)";
                }

                if (sessionStorage.getItem('chatBoxLeft') == null)
                {
                    document.getElementById('chat').style.left = "calc(50% - 185px)";
                }

                dragElement(document.getElementById("chat"));      
            },
            error: function (xhr, status, error)
            {
                console.log('Error:', error);
            }
        });
    }
};

function WkFMnZKWUdhpbzo() 
{
    $.ajax({
        type: 'GET',
        url: '/Chats/ReceiveUsers',
        data: {
            savedDepartment: sessionStorage.getItem('JOZPzFDGsWEEzIY')
        },
        success: function (response)
        {
            let elements = document.querySelectorAll('.chatUser');
            for (let i = 0; i < elements.length; i++) {
                $(elements[i]).remove();
            }

            $('.chatUsers').append(response.contentResult.content);

            $('.chatMessagesBubbles').html(response.div);

            $('.chatText').children().remove();

            $('.chatFilter').remove();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function tqMrMyJEPoAgJSW() 
{
    $.ajax({
        type: 'GET',
        url: '/Chats/ShowChatMinimized',
        success: function (response)
        {
            sessionStorage.removeItem('XaWDHywDpyvadHP');
            $('.ATKLsxSduWPahPh').append(response);
            $('#chat').remove();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function YElWMlpiHOvShrB(t)
{
    $.ajax({
        type: 'GET',
        url: '/Chats/FilterDiv',
        data: {
            savedDepartment: sessionStorage.getItem('JOZPzFDGsWEEzIY')
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

function zpUZfWoTJUsolOJ(t) 
{
    sessionStorage.setItem('JOZPzFDGsWEEzIY', t.value); //departmentId dla selecta w filtrze

    //dodaj użytkowników po lewej stronie
    WkFMnZKWUdhpbzo(sessionStorage.getItem('JOZPzFDGsWEEzIY'));
};

function ltmkkPVQpNisKCP(t, r) {
    $.ajax({
        type: 'GET',
        url: '/Chats/ShowChatMessages',
        data: {
            receiverUserId: r
        },
        success: function (response)
        {
            if (response != false) 
            {
                $('.chatMessagesBubbles').children().remove();
                $('.emptyConversation').remove();
                $('.receiverNotSelected').remove();
                $('.chatText').html(response.textDiv);

                let elements = document.querySelectorAll('.chatUser');
                for (let i = 0; i < elements.length; i++)
                {
                    $(elements[i]).removeClass('userSelected');
                }

                $(t).addClass('userSelected');

                if (response.arrayNotEmpty == false)
                {
                    $('.chatMessagesBubbles').append(response.div);
                }
                else
                {
                    $('.chatMessagesBubbles').append(response.messages);
                    let chatmessages = document.querySelector('.chatMessagesBubbles');
                    chatmessages.scrollTo(0, chatmessages.scrollHeight);
                }

                connect();
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

async function vKbmXcDAKBSEZqf(r) {
    //let messageText = document.getElementById('textAreaMessage').value;

    //if (messageText.length > 0)
    //{
    //    await $.ajax({
    //        type: 'POST',
    //        url: '/Chats/AddToChat',
    //        data: {
    //            receiver: r,
    //            message: messageText
    //        },
    //        success: function (response)
    //        {
    //            if (response != false)
    //            {
    //                if (response.firstConversation)
    //                {
    //                    $('.chatMessagesBubbles').html(response.messages);
    //                }
    //                else 
    //                {
    //                    if (response.dateCheck)
    //                    {
    //                        let div = $('#dateParent[date="' + response.today + '"]');
    //                        $(div).append(response.bubble);
    //                    }
    //                    else 
    //                    {
    //                        $('.chatMessagesBubbles').append(response.messages);
    //                    }
    //                }

    //                $('.chatMessagesBubbles').animate({ scrollTop: document.body.scrollHeight }, "fast");
    //                $('#textAreaMessage').val("");
    //            }
    //        },
    //        error: function (xhr, status, error)
    //        {
    //            console.log('Error:', error);
    //        }
    //    });
    //}

    
};

function sendMessageEnter(e) {
    if (e.key === "Enter")
    {
        //$('#sendMessage').trigger('click');
    }
};

function bubbleClickReceiver(t) {
    $(t).parent().children('.chatTimeStamp').show();
};

function bubbleClick(t, event, id) {
    $.ajax({
        type: 'GET',
        url: '/Chats/DeleteButton',
        data: {
            id: id
        },
        success: function (response)
        {
            $('.bubbleSettings').remove();
            $(response).insertBefore(t);
            $(t).parent().children('.chatTimeStamp').show();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

async function removeMessage(t, id)
{
    await $.ajax({
        type: 'POST',
        url: '/Chats/RemoveMessage',
        data: {
            id: id
        },
        success: function (response)
        {
            $(t).parent().html(response.messageRemovedDiv);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
}

async function sendMessage_(sender, receiver, message) //sender, 
{
    await $.ajax({
        type: 'POST',
        //url: '/Chats/AddToChat',
        url: '/Chats/AddToChat_',
        data: {
            sender: sender,
            receiver: receiver,
            message: message
        },
        success: function (response)
        {
            if (response != false) 
            {
                console.log(response);

            }


            //if (response != false)
            //{
            //    if (response.firstConversation)
            //    {
            //        $('.chatMessagesBubbles').html(response.messages);
            //    }
            //    else 
            //    {
            //        if (response.dateCheck)
            //        {
            //            let div = $('#dateParent[date="' + response.today + '"]');
            //            $(div).append(response.bubble);
            //        }
            //        else 
            //        {
            //            $('.chatMessagesBubbles').append(response.messages);
            //        }
            //    }

            //    $('.chatMessagesBubbles').animate({ scrollTop: document.body.scrollHeight }, "fast");
            //    $('#textAreaMessage').val("");
            //}
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};



var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

function disconnect_()
{
    connection.stop().catch(function () 
    { 
        return console.error(err.toString());
    });
};

function connect_() 
{
    connection.start().catch(function (err)
    {
        return console.error(err.toString());
    });
};
connect_();

//sprawdzaj połączenie co 1 sekunde
//function checkConnectionState() {
//    setInterval(function ()
//    {
//        //console.log(connection.state);
//        return connection.state;
//    }, 1000);
//};
//checkConnectionState();

var handlerRegistered = false;
function connect() 
{
    //var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    ////Disable the send button until connection is established.
    //document.getElementById("sendMessage").disabled = true;
    //$('.chatText').addClass('disabled');

    //connection.start().then(function ()
    //{
    //    document.getElementById("sendMessage").disabled = false;
    //}).catch(function (err)
    //{
    //    return console.error(err.toString());
    //});

    //connection.start().then(function ()
    //{
    //    //$('.chatText').removeClass('disabled');
    //}).catch(function (err)
    //{
    //    return console.error(err.toString());
    //});

    if (!handlerRegistered) {
        connection.on("ReceiveMessage", function (sender, receiver, message) //user, 
        {
            //var li = document.createElement("li");
            //document.getElementById("messagesList").appendChild(li);
            //// We can assign user-supplied strings to an element's textContent because it
            //// is not interpreted as markup. If you're assigning in any other way, you
            //// should be aware of possible script injection concerns.
            //li.textContent = `${user} says ${message}`;

            sendMessage_(sender, receiver, message);
            //console.log(sender, receiver, message);

            handlerRegistered = true;
        });
    }
    
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

    document.getElementById('sendMessage').addEventListener('click', function (event)
    {
        var receiver = this.getAttribute('r');
        var message = document.getElementById('textAreaMessage').value;

        if (message.length > 0)
        {
            connection.invoke("SendMessage", receiver, message).then(function () 
            {
                //console.log('wysłane signalR');
            }).catch(function (err)
            {
                return console.error(err.toString());
            });
        }
    });

    
};
/*connect();*/

