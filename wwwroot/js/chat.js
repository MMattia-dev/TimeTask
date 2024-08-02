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

function ltmkkPVQpNisKCP(t, r) 
{
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

                //sessionStorage.setItem('userSelected', r);

                connect();
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function findDiv(targetUserId)
{
    // Get all div elements in the document
    const divElements = document.querySelectorAll('.chatUser');

    // Iterate over each div element
    for (let i = 0; i < divElements.length; i++)
    {
        const div = divElements[i];
        const onclick = div.onclick;

        // Check if the element has an onclick attribute and it's a function
        if (typeof onclick === 'function')
        {
            // Convert the function to a string and extract the parameters
            const functionString = onclick.toString();

            // Define a regular expression to match the (this, userId) pattern
            const pattern = /\(([^,]+),\s*'([^']+)'\)/;
            const match = pattern.exec(functionString);

            if (match && match[2])
            {
                // Remove any trailing spaces and comments from the extracted userId parameter
                const userId = match[2].trim().replace(/\/\/.*$/, '').replace(/\/\*.*\*\//, '');

                // Check if the extracted userId matches the target userId
                if (userId === targetUserId)
                {
                    return div; // Return the matching div element
                }
            }
        }
    }

    return null; // Return null if no matching div is found
};

//function refreshMessages()
//{
//    $.ajax({
//        type: 'GET',
//        url: '/Chats/ShowChatMessages',
//        data: {
//            receiverUserId: sessionStorage.getItem('userSelected')
//        },
//        success: function (response)
//        {
//            if (response != false) 
//            {
//                $('.chatMessagesBubbles').children().remove();
//                $('.emptyConversation').remove();
//                $('.receiverNotSelected').remove();
//                $('.chatText').html(response.textDiv);

//                let elements = document.querySelectorAll('.chatUser');
//                for (let i = 0; i < elements.length; i++)
//                {
//                    $(elements[i]).removeClass('userSelected');
//                }

//                //$(t).addClass('userSelected');

//                if (response.arrayNotEmpty == false)
//                {
//                    $('.chatMessagesBubbles').append(response.div);
//                }
//                else
//                {
//                    $('.chatMessagesBubbles').append(response.messages);
//                    let chatmessages = document.querySelector('.chatMessagesBubbles');
//                    chatmessages.scrollTo(0, chatmessages.scrollHeight);
//                }

//                //connect();
//                $(findDiv(sessionStorage.getItem('userSelected'))).addClass('userSelected');
//            }
//        },
//        error: function (xhr, status, error)
//        {
//            console.log('Error:', error);
//        }
//    });
//};
function refreshMessages(r)
{
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

                //$(t).addClass('userSelected');

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

                //connect();
                $(findDiv(r)).addClass('userSelected');
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

async function DeleteMessage_(id, sender, receiver) {
    await $.ajax({
        type: 'POST',
        url: '/Chats/RemoveMessage',
        data: {
            id: id,
            sender: sender,
            receiver: receiver
        },
        success: function (response)
        {
            //$(t).parent().html(response.messageRemovedDiv);
            //$('#bubbleSettingsId_' + id).parent().html(response.messageRemovedDiv);
            $('#bubbleId_' + id).parent().html(response.messageRemovedDiv);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function bubbleClickReceiver(t) {
    $(t).parent().children('.chatTimeStamp').show();
};

function bubbleClick(t, id, sender, receiver) {
    $.ajax({
        type: 'GET',
        url: '/Chats/DeleteButton',
        data: {
            id: id,
            sender: sender,
            receiver: receiver
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

async function sendMessage_(sender, receiver, message)
{
    await $.ajax({
        type: 'POST',
        url: '/Chats/AddToChat_',
        data: {
            sender: sender,
            receiver: receiver,
            message: message
        },
        success: function (response)
        {
            if (response.firstConversation)
            {
                $('.chatMessagesBubbles').html(response.messages);
            }
            else 
            {
                if (response.dateCheck)
                {
                    let div = $('#dateParent[date="' + response.today + '"]');
                    $(div).append(response.bubble);
                }
                else 
                {
                    $('.chatMessagesBubbles').append(response.messages);
                }
            }

            $('.chatMessagesBubbles').animate({ scrollTop: document.body.scrollHeight }, "fast");
            $('#textAreaMessage').val("");

            //setTimeout(function ()
            //{
            //    refreshMessages();
            //}, 150);
            //refreshMessages();
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

function sendMessageEnter(e)
{
    if (e.key === "Enter") 
    {
        $('#sendMessage').trigger('click');
    }
};

async function vKbmXcDAKBSEZqf(receiver) 
{
    var message = document.getElementById('textAreaMessage').value;

    if (message.length > 0)
    {
        connection.invoke("SendMessage", receiver, message).then(function () 
        {
            //
        }).catch(function (err)
        {
            return console.error(err.toString());
        });
    }
};

async function removeMessage(id, sender, receiver)
{
    connection.invoke("RemoveMessage", id, sender, receiver).catch(function (err)
    {
        return console.error(err.toString());
    });
};

var handlerRegistered = false;
function connect() 
{
    if (!handlerRegistered) {
        connection.on("ReceiveMessage", function (sender, receiver, message) //user, 
        {
            sendMessage_(sender, receiver, message);
            //refreshMessages(receiver);

            handlerRegistered = true;
        });

        connection.on("MessageRemoved", function (id, sender, receiver)
        {
            DeleteMessage_(id, sender, receiver);

            handlerRegistered = true;
        });
    }
};