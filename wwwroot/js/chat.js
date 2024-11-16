//const { signalR } = require("../lib/microsoft/signalr/dist/browser/signalr");
function kTsAoyADkoTcMgH(t) {
    $(t).parent().parent().remove();
};

function scQisAIXdDGVbXF(t) {
    $(t).parent().remove();
    $('.chatDepartment').removeClass('disabled');
    $('.chatMessagesBubbles').removeClass('disabled');
};

$(document).on('click', function (event)
{
    if (!$(event.target).closest('.chatFilter').length)
    {
        $('.chatFilter').remove();

        $('.chatDepartment').removeClass('disabled');
        $('.chatMessagesBubbles').removeClass('disabled');
    }

    //alwan__palette
    //alwan__marker

    const colorPickerElement = document.querySelector('.alwan');
    const paletteElement = document.querySelector('.alwan__palette');
    const containerElement = document.querySelector('.alwan__container');

    if (colorPickerElement) {
        //if (!colorPickerElement.contains(event.target)) //&& !paletteElement.contains(event.target) && !containerElement.contains(event.target)
        //{
        //    if (!$(event.target).is('body')) {
        //        console.log('asd');
        //    }
            
            

        //}
        //else {
        //    //$('.chatFilter').remove();

        //}

        //if ($(event.target).hasClass('alwan__palette') || $(event.target).hasClass('alwan__container'))
        //{
        //    console.log('1');
        //}
        //else {
        //    console.log('2');
        //}

    }
    

});

$(document).on('mousedown', function (event)
{
    if (!$(event.target).closest('.bubbleSettings').length)
    {
        $('.bubbleSettings').remove();
        $('.chatTimeStamp').hide();
        //$('#chatMessageOptionsId').remove();
    }

    if (!$(event.target).closest('#chatMessageOptionsId').length)
    {
        $('#chatMessageOptionsId').remove();
        //$('.blur').remove();
        $('.bubble.out').removeClass('out');
        $('.bubble').removeClass('blur');

    }  
});

function detectScrollEvent() {
    let chatMessagesBubbles = document.querySelector('.chatMessagesBubbles');

    chatMessagesBubbles.addEventListener('scroll', (event) =>
    {
        //console.log(event.target.scrollTop);
        $('#chatMessageOptionsId').remove();
        //$('.blur').remove();
        $('.bubble.out').removeClass('out');
        $('.bubble').removeClass('blur');
    });
}

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
        $('.statusText').html("");
        $('.status').removeClass('offline').removeClass('online');

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

                if (sessionStorage.getItem('userSelected') != null)
                {
                    let r = sessionStorage.getItem('userSelected');
                    ltmkkPVQpNisKCP(findDiv(r), r);
                }

                notifyReceiverChatIsOpen();

                checkLoggedInUsers();

                detectScrollEvent();
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

            sessionStorage.removeItem('userSelected');

            notifyReceiverChatIsOpen();

            checkLoggedInUsers();
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

            notifyReceiver();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

async function addOptionsForFilterDiv(savedDepartment, receiverId) 
{
    await $.ajax({
        type: 'GET',
        url: '/Chats/AddOptionsForFilterDiv',
        data: {
            savedDepartment: sessionStorage.getItem('JOZPzFDGsWEEzIY'),
            receiverId: receiverId
        },
        success: function (response)
        {
            $('.chatFilterDepartment').children('select').html(response);
            $('.chatFilterDepartment').children('select').removeAttr('disabled');
            $('.lds-ring-small').remove();
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

async function YElWMlpiHOvShrB(t)
{
    await $.ajax({
        type: 'GET',
        url: '/Chats/FilterDiv',
        success: function (response)
        {
            $('#chat').append(response.contentResult.content);
            $(t).addClass('disabled');

            $('.chatFilter').append(createSmallLoader_center());
            $('.chatFilterDepartment').children('select').attr('disabled', '');
            $('.chatMessagesBubbles').addClass('disabled');

            addOptionsForFilterDiv(sessionStorage.getItem('JOZPzFDGsWEEzIY'), response.receiverId);
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
    $('.chatDepartment').removeClass('disabled');
    $('.chatMessagesBubbles').removeClass('disabled');
    $('.statusText').html("");
    $('.status').removeClass('offline').removeClass('online');
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

                //
                $(t).addClass('userSelected');
                //

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

                sessionStorage.setItem('userSelected', r);

                //connect();

                chatMessagesBubblesScroll();

                updateChatStatus(t.getAttribute('onclick'));

                checkLoggedInUsers();
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function updateChatStatus(att) {
    var id = att.substring(
        att.indexOf(", ") + 1,
        att.lastIndexOf(")")
    );
    id = id.replace(/\s/g, '');
    id = id.slice(1, -1);

    $.ajax({
        type: 'GET',
        url: '/Chats/GetSender',
        data: {
            id: id
        },
        success: function (response)
        {
            if (response != false) 
            {
                if (response.logged)
                {
                    $('.status').removeClass('offline').addClass('online');
                    $('.statusText').html('Online' + ' - ' + response.name);

                    $('.userSelected').children('.chatUserStatus').removeClass('offline').addClass('online');
                }
                else 
                {
                    $('.status').removeClass('online').addClass('offline');
                    $('.statusText').html('Offline' + ' - ' + response.name);

                    $('.userSelected').children('.chatUserStatus').removeClass('online').addClass('offline');
                }
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
function refreshMessages(s, r)
{
    $.ajax({
        type: 'GET',
        url: '/Chats/ShowChatMessages_Refresh',
        data: {
            sender: s,
            receiver: r
        },
        success: function (response)
        {
            if (response != false) 
            {
                var id_ = "";
                if (document.getElementById('chat'))
                {
                    if (document.querySelector('.userSelected'))
                    {
                        let onclick = $('.userSelected').attr('onclick');
                        id = onclick.substring(
                            onclick.indexOf(", ") + 1,
                            onclick.lastIndexOf(")")
                        );
                        id = id.replace(/\s/g, '');
                        id = id.slice(1, -1);

                        id_ = id;
                    }
                }

                if (response.senderId == id || response.senderId == response.loggedUser)
                {
                    $('.chatMessagesBubbles').html(response.messages);
                }
                setTimeout(function ()
                {
                    notifySender();
                }, 2500);
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function changeChatBackground(user, color) {
    $.ajax({
        type: 'POST',
        url: '/Chats/ChangeChatBackground',
        data: {
            loggedUser: user,
            backgroundColor: color
        },
        success: function (response)
        {
            $('#chat').css('background-color', response.rgb);

            $('#resetChatBackground').remove();
            $('#chatBackgroundColorPicker').parent().parent().append(response.resetButton);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function resetChatBackground(t, loggedUser) {
    $.ajax({
        type: 'POST',
        url: '/Chats/RemoveChatBackground',
        data: {
            loggedUser: loggedUser
        },
        success: function (response)
        {
            $(t).remove();
            document.getElementById('chatBackgroundColorPicker').value = '#fdffff';
            $('#chat').css('background-color', '');
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function resetUserChatColor(t, loggedUser) {
    $.ajax({
        type: 'POST',
        url: '/Chats/RemoveUserChatColor',
        data: {
            loggedUser: loggedUser
        },
        success: function (response)
        {
            //$(t).remove();
            //document.getElementById('chatBackgroundColorPicker').value = '#fdffff';
            //$('#chat').css('background-color', '');

            $(t).remove();
            document.getElementById('userChatColor').value = response.userColor;
            $('.bubble.sender:not(".deleted")').css('background-color', response.userColor);
            $('.bubble.sender:not(".deleted") span').css('color', response.spanColor);
            $('.bubble.sender:not(".deleted") .tail').css('border-top-color', response.userColor);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function resetSenderChatColor(t, loggedUser)
{
    var id_ = null;

    if (document.querySelector('.userSelected'))
    {
        let onclick = $('.userSelected').attr('onclick');
        id = onclick.substring(
            onclick.indexOf(", ") + 1,
            onclick.lastIndexOf(")")
        );
        id = id.replace(/\s/g, '');
        id = id.slice(1, -1);

        id_ = id;
    }

    $.ajax({
        type: 'POST',
        url: '/Chats/RemoveSenderChatColor',
        data: {
            loggedUser: loggedUser,
            receiverId: id_
        },
        success: function (response)
        {
            $(t).remove();
            document.getElementById('senderChatColor').value = '#fdffff';

            if (document.querySelector('.userSelected')) {                
                $('.bubble.receiver:not(".deleted")').css('background-color', response.userColor);
                $('.bubble.receiver:not(".deleted") span').css('color', response.spanColor);
                $('.bubble.receiver:not(".deleted") .tail').css('border-top-color', response.userColor);
            }
            
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function chatBackground(t, loggedUser) 
{
    changeChatBackground(loggedUser, t.value);
};

function changeUserChatColor(user, color)
{
    $.ajax({
        type: 'POST',
        url: '/Chats/ChangeUserChatColor',
        data: {
            loggedUser: user,
            userChatColor: color
        },
        success: function (response)
        {
            //$('#chat').css('background-color', response.rgb);

            //$('#resetChatBackground').remove();
            //$('#chatBackgroundColorPicker').parent().parent().append(response.resetButton);

            $('.bubble.sender:not(".deleted")').css('background-color', response.rgb);
            $('.bubble.sender:not(".deleted") span').css('color', response.spanColor);
            $('.bubble.sender:not(".deleted") .tail').css('border-top-color', response.rgb);

            $('#resetUserChatColor').remove();
            $('#userChatColor').parent().parent().append(response.resetButton);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};
function userChatColor(t, loggedUser) 
{
    changeUserChatColor(loggedUser, t.value);
};

function changeSenderChatColor(user, color) 
{
    $.ajax({
        type: 'POST',
        url: '/Chats/ChangeSenderChatColor',
        data: {
            loggedUser: user,
            senderChatColor: color
        },
        success: function (response)
        {
            $('.bubble.receiver:not(".deleted")').css('background-color', response.rgb);
            $('.bubble.receiver:not(".deleted") span').css('color', response.spanColor);
            $('.bubble.receiver:not(".deleted") .tail').css('border-top-color', response.rgb);

            $('#resetSenderChatColor').remove();
            $('#senderChatColor').parent().parent().append(response.resetButton);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function senderChatColor(t, loggedUser) 
{
    changeSenderChatColor(loggedUser, t.value);
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
            $('#bubbleId_' + id).parent().html(response.messageRemovedDiv);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function openImage(message) {
    $.ajax({
        type: 'GET',
        url: '/Chats/OpenLink',
        data: {
            message: message
        },
        success: function (response)
        {
            $('#chatMessageOptionsId').remove();
            //$('.blur').remove();
            $('.bubble.out').removeClass('out');
            $('.bubble').removeClass('blur');

            if (response.length > 0) 
            {
                window.open(response, '_blank').focus();
            }
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function bubbleClickReceiver(e, date, hours)
{
    //$(t).parent().children('.chatTimeStamp').show();

    $.ajax({
        type: 'GET',
        url: '/Chats/Info',
        data: {
            date: date,
            hours: hours
        },
        success: function (response)
        {
            $('.bubbleSettingsParent').remove();
            $('body').append(response);

            let x = e.clientX;
            let y = e.clientY;

            //$('.chatMessagesBubbles').append('<div style="display: none;" class="blur"></div>'); $('.blur').fadeIn(100);
            $('.bubble').addClass('blur');

            $('#chatMessageOptionsId').fadeIn(100);
            document.getElementById("chatMessageOptionsId").style.left = x + "px";
            document.getElementById("chatMessageOptionsId").style.top = y + "px";

            $(e.target).addClass('out');
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function bubbleClick(e, id, sender, receiver) {
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
            $('.bubbleSettingsParent').remove();

            $('body').append(response);

            let x = e.clientX;
            let y = e.clientY;

            //$('.chatMessagesBubbles').append('<div style="display: none;" class="blur"></div>'); $('.blur').fadeIn(100);
            $('.bubble').addClass('blur');

            $('#chatMessageOptionsId').fadeIn(100);
            document.getElementById("chatMessageOptionsId").style.left = x + "px";
            document.getElementById("chatMessageOptionsId").style.top = y + "px";

            $(e.target).addClass('out');
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
            var id_ = "";
            if (document.getElementById('chat'))
            {
                if (document.querySelector('.userSelected')) {
                    let onclick = $('.userSelected').attr('onclick');
                    id = onclick.substring(
                        onclick.indexOf(", ") + 1,
                        onclick.lastIndexOf(")")
                    );
                    id = id.replace(/\s/g, '');
                    id = id.slice(1, -1);

                    id_ = id;
                }
                //notifyReceiverChatIsOpen();
            }
            
            if (response.anyDuplicates)
            {
                Rem(response.duplicates);
                
                if (response.senderId == id_ || response.senderId == response.loggedUser)
                {
                    $('.emptyConversation').remove();
                    $('.receiverNotSelected').remove();

                    if (response.firstConversation)
                    {
                        setTimeout(function () { 
                            $('.chatMessagesBubbles').html(response.messages);
                        }, 100);
                    }
                    else
                    {
                        if (response.dateCheck)
                        {
                            let div = $('#dateParent[date="' + response.today + '"]');

                            setTimeout(function ()
                            {
                                $(div).append(response.bubble);
                            }, 100);
                        }
                        else
                        {
                            setTimeout(function ()
                            {
                                $('.chatMessagesBubbles').append(response.messages);
                            }, 100);
                        }
                    }

                    refreshMessages(sender, receiver);

                    if (response.senderId == response.loggedUser)
                    {
                        $('#textAreaMessage').val("");
                    }
                    
                    $('.chatMessagesBubbles').animate({ scrollTop: document.querySelector('.chatMessagesBubbles').scrollHeight }, "fast");

                    disconnect_();
                    setTimeout(function ()
                    {
                        if (connection.state == signalR.HubConnectionState.Disconnected) {
                            connection.start().catch(function (err)
                            {
                                return console.error(err.toString());
                            });
                        }
                    }, 100);
                }
            }
            else 
            {
                if (response.senderId == id_ || response.senderId == response.loggedUser)
                {
                    $('.emptyConversation').remove();
                    $('.receiverNotSelected').remove();

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

                    setTimeout(function ()
                    {
                        refreshMessages(sender, receiver);
                    }, 150);

                    if (response.senderId == response.loggedUser)
                    {
                        $('#textAreaMessage').val("");
                    }

                    $('.chatMessagesBubbles').animate({ scrollTop: document.querySelector('.chatMessagesBubbles').scrollHeight }, "fast");
                }
            }

            GetCurrentlyLoggedUserId().then(response_ => {
                if (response_ == response.receiverId) 
                {
                    if (sessionStorage.getItem('XaWDHywDpyvadHP') != null)
                    {
                        notifyReceiverChatIsOpen();
                        playReceivedMessageSound();

                        chatMessagesBubblesScroll();
                    }
                    else 
                    {
                        notifyReceiver();
                        playReceivedMessageSound();
                    }
                }
                //if (response_ == response.senderId) 
                //{
                //    chatMessagesBubblesScroll();
                //}
            });
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function playReceivedMessageSound()
{
    var audio = new Audio("../../audio/new-positive-notice.mp3");
    audio.muted = false;
    audio.volume = 1.0;
    audio.play();
    //console.log('odebrano wiadomość');
};

function notifyReceiver() 
{
    GetCurrentlyLoggedUserId().then(response_ => {
        $.ajax({
            type: 'GET',
            url: '/Chats/NotifyReceiver',
            data: {
                receiverId: response_
            },
            success: function (response)
            {
                if (response != false)
                {
                    $('.chatMinimized').html(response.contentResult.content);
                }
            },
            error: function (xhr, status, error)
            {
                console.log('Error:', error);
            }
        });
    });
};

function notifyReceiverChatIsOpen()
{
    GetCurrentlyLoggedUserId().then(response_ => { 
        $.ajax({
            type: 'GET',
            url: '/Chats/NotifyReceiverWhenChatIsOpen',
            data: {
                receiverId: response_,
                savedDepartment: sessionStorage.getItem('JOZPzFDGsWEEzIY')
            },
            success: function (response)
            {
                if (response != false) 
                {
                    if (response.count > 0 && response.receiverId == response_)
                    {
                        $('.unreadMessagesFilterParent').html(response.filterUnreadMessagesCounter.content);
                    }
                    if (response.count == 0 && response.receiverId == response_)
                    {
                        $('.unreadMessagesFilterParent').html("");
                    }

                    if (document.querySelector('.chatUser'))
                    {
                        let elements = document.querySelectorAll('.chatUser');
                        for (let i = 0; i < elements.length; i++)
                        {
                            let onclick = $(elements[i]).attr('onclick');
                            id = onclick.substring(
                                onclick.indexOf(", ") + 1,
                                onclick.lastIndexOf(")")
                            );
                            id = id.replace(/\s/g, '');
                            id = id.slice(1, -1);

                            let chatUserId = id;

                            for (let j = 0; j < response.array.length; j++) 
                            {
                                if (response.array[j].item1 == chatUserId)
                                {
                                    $(elements[i]).children('.chatUserUnreadMessageCountParent').html(response.array[j].item2);
                                }
                                //refreshMessages();
                            }
                        }
                    }
                }
            },
            error: function (xhr, status, error)
            {
                console.log('Error:', error);
            }
        });
    });
};

function GetCurrentlyLoggedUserId() {
    return new Promise((resolve, reject) =>
    {
        $.ajax({
            type: 'GET',
            url: '/Chats/GetCurrentlyLoggedUserId',
            success: function (response)
            {
                resolve(response);
            },
            error: function (xhr, status, error)
            {
                reject(error);
            }
        });
    });
};

async function Rem(a) {
    if (a.length > 0) {
        await $.ajax({
            type: 'POST',
            url: '/Chats/Rem',
            data: {
                array: a
            },
            success: function (response)
            {
                //
            },
            error: function (xhr, status, error)
            {
                //
            }
        });
    }
};

let stareTimeout;

function getVisibleBubbles()
{
    const chatContainer = document.querySelector('.chatMessagesBubbles');
    if (!chatContainer) return [];

    const containerRect = chatContainer.getBoundingClientRect();
    const bubbles = chatContainer.querySelectorAll('.bubble.receiver');
    const visibleBubbles = [];

    for (let bubble of bubbles)
    {
        const bubbleRect = bubble.getBoundingClientRect();

        // Check if the bubble is within the visible area of the container
        if (bubbleRect.top >= containerRect.top - bubbleRect.height + 0 &&
            bubbleRect.bottom <= containerRect.bottom + bubbleRect.height - 0)
        {
            visibleBubbles.push(bubble.id.split('_')[1]);
        }
    }

    return visibleBubbles;
};

function handleScroll()
{
    clearTimeout(stareTimeout);

    stareTimeout = setTimeout(() =>
    {
        const staredBubbles = getVisibleBubbles();
        if (staredBubbles.length > 0)
        {
            updateIfMessageRead(staredBubbles);
        }
    }, 2000);
};

function chatMessagesBubblesScroll()
{
    let chatContainer = document.querySelector('.chatMessagesBubbles');
    
    if ($(chatContainer).find('.bubble.receiver.unread').length > 0) 
    {
        chatContainer.addEventListener('scroll', () =>
        {
            handleScroll();
        });
        handleScroll();
    }
};

async function updateIfMessageRead(messagesIdsArray) 
{
    await $.ajax({
        type: 'POST',
        url: '/Chats/UpdateIfMessageRead',
        data: {
            arrayOfMessageIds: messagesIdsArray
        },
        success: function (response)
        {
            updateIfMessageReadCounters(messagesIdsArray);
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function updateIfMessageReadCounters(array) 
{
    //zaktualizuj bubbles
    var receivedMessagesDivs = document.querySelectorAll('.bubble.receiver.unread');
    for (let i = 0; i < receivedMessagesDivs.length; i++) {
        let id = receivedMessagesDivs[i].id.split('_')[1];
        for (let j = 0; j < array.length; j++) {
            if (array[j] == id) {
                $(receivedMessagesDivs[i]).removeClass('unread');
            }
        }
    }

    //zaktualizuj Countery w .chatUser.userSelected
    var userSelected = document.querySelector('.chatUser.userSelected');
    var counterSpan = $(userSelected).children('.chatUserUnreadMessageCountParent').children('.chatUserUnreadMessageCount').children('span');
    var counter = $(counterSpan).html();
    var counterInt = parseInt(counter);

    var result = counterInt - array.length;
    if (!result.isNaN) 
    {
        if (result == 0 || result < 0)
        {
            $(userSelected).children('.chatUserUnreadMessageCountParent').remove();
        }
        else 
        {
            $(counterSpan).html(result);
        }
    }
};

const checkMessagesTimeout = setInterval(() =>
{
    notifySender();
}, 1000);

const checkLoggedUsers = setInterval(() =>
{
    checkLoggedInUsers();
}, 10000);

function notifySender()
{
    var sentMessagesDivs = document.querySelectorAll('.bubble.sender.unread');
    if (sentMessagesDivs.length > 0)
    {
        for (let i = 0; i < sentMessagesDivs.length; i++)
        {
            let id = sentMessagesDivs[i].id.split('_')[1];

            $.ajax({
                type: 'GET',
                url: '/Chats/CheckIfMessageWasRead',
                data: {
                    id: parseInt(id)
                },
                success: function (response)
                {
                    if (response != false)
                    {
                        $(sentMessagesDivs[i]).removeClass('unread');
                        $(sentMessagesDivs[i]).children('.messageReadStatusIcon').html("");
                    }
                },
                error: function (xhr, status, error)
                {
                    console.log('Error:', error);
                }
            });
        }
    }
};

function updateStatusForUsersInChat() 
{
    let elements = document.querySelectorAll('.chatUser');
    if (elements.length > 0) 
    {
        for (let i = 0; i < elements.length; i++) 
        {
            let onclick = $(elements[i]).attr('onclick');
            let id = onclick.substring(
                onclick.indexOf(", ") + 1,
                onclick.lastIndexOf(")")
            );
            id = id.replace(/\s/g, '');
            id = id.slice(1, -1);

            $.ajax({
                type: 'GET',
                url: '/Chats/GetSender',
                data: {
                    id: id
                },
                success: function (response)
                {
                    if (response != false) 
                    {
                        if (response.logged)
                        {
                            if ($(elements[i]).hasClass('userSelected')) {
                                $('.status').removeClass('offline').addClass('online');
                                $('.statusText').html('Online' + ' - ' + response.name);
                            }
                            
                            $(elements[i]).children('.chatUserStatus').removeClass('offline').addClass('online');
                        }
                        else 
                        {
                            if ($(elements[i]).hasClass('userSelected')) {
                                $('.status').removeClass('online').addClass('offline');
                                $('.statusText').html('Offline' + ' - ' + response.name);
                            }
                            
                            $(elements[i]).children('.chatUserStatus').removeClass('online').addClass('offline');
                        }
                    }
                },
                error: function (xhr, status, error)
                {
                    console.log('Error:', error);
                }
            });
        }
    }
};

function bubblesAccordion(t) 
{
    var acc = $(t).parent().children().not(t);

    for (let i = 0; i < acc.length; i++) 
    {
        $(acc[i]).toggleClass('hidden');
    }
};

function showChatSettings() 
{
    $.ajax({
        type: 'GET',
        url: '/Chats/SettingsDiv',
        success: function (response)
        {
            $('#chat').append(response.div);
            $('.chatMessagesBubbles').addClass('disabled');

            var chatBackgroundColorPicker = document.getElementById('chatBackgroundColorPicker');
            chatBackgroundColorPicker.addEventListener('input', (event) =>
            {
                const selectedColor = event.target.value;
                changeChatBackground(response.loggedUser, selectedColor);
            });

            var userChatColorColorPicker = document.getElementById('userChatColor');
            userChatColorColorPicker.addEventListener('input', (event) =>
            {
                const selectedColor = event.target.value;
                changeUserChatColor(response.loggedUser, selectedColor);
            });

            var senderChatColorColorPicker = document.getElementById('senderChatColor');
            senderChatColorColorPicker.addEventListener('input', (event) =>
            {
                const selectedColor = event.target.value;
                changeSenderChatColor(response.loggedUser, selectedColor);
            });
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function MiOzrGaouyRUWPc(receiver)
{
    $.ajax({
        type: 'GET',
        url: '/Chats/AttachForm',
        data: {
            receiver: receiver
        },
        success: function (response)
        {
            $('.chatParent').append(response);
            $('.chatAttach').fadeIn(200);
            $('.chatUsers').addClass('TYZimWgKPSymTgA');
        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

function fileAttach(e, sender, receiver) 
{
    $('#sendButtonAttach').remove();

    let file = e.target.files[0];

    if (!file.name.endsWith('svg')) 
    {
        var sizeInMB = (file.size / (1024 * 1024)).toFixed(2);

        if (sizeInMB <= 5)
        {
            const formData = new FormData();
            formData.append('file', file);

            //
            var additionalData = {
                senderId: sender,
                receiverId: receiver,
            };
            //

            $.ajax({
                type: 'POST',
                url: '/Chats/AttachSendButton',
                success: function (response)
                {
                    $('.chatAttachDropText ion-icon').replaceWith('<ion-icon name="document-attach-outline"></ion-icon>');
                    $('.chatAttachDropText span').html(file.name);
                    $('.chatAttach').append(response.button);

                    document.getElementById('sendAttach').addEventListener('click', function ()
                    {

                        //console.log(formData);



                        //addAttachmentToChat(sender, receiver, file.name);



                        connection.invoke("SendAttachment", receiver, file.name).then(function () //formData
                        {
                            
                            //sendAttachment(sender, receiver, file.name);
                            sendAttachment(sender, receiver, formData);

                            //$.ajax({
                            //    url: '/Chats/UploadFile',
                            //    type: 'POST',
                            //    data: formData,
                            //    processData: false,
                            //    contentType: false,
                            //    headers: {
                            //        'X-Additional-Data': JSON.stringify(additionalData)
                            //    },
                            //    success: function (result)
                            //    {

                            //        console.log(result);


                            //        //refreshMessages(sender, receiver);
                            //        //$('.chatAttach').fadeOut(200);
                            //        //setTimeout(() =>
                            //        //{
                            //        //    $('.chatAttach').remove();
                            //        //    $('.chatUsers').removeClass('TYZimWgKPSymTgA');

                            //        //    let chatmessages = document.querySelector('.chatMessagesBubbles');
                            //        //    chatmessages.scrollTo(0, chatmessages.scrollHeight);
                            //        //}, 200);
                            //    },
                            //    error: function (xhr, status, error)
                            //    {
                            //        console.log('Error:', error);
                            //    }
                            //});
                        }).catch(function (err)
                        {
                            return console.error(err.toString());
                        });



                        //$.ajax({
                        //    url: '/Chats/UploadFile',
                        //    type: 'POST',
                        //    data: formData,
                        //    processData: false,
                        //    contentType: false,
                        //    //xhr: function ()
                        //    //{
                        //    //    var xhr = new window.XMLHttpRequest();
                        //    //    xhr.upload.addEventListener("progress", function (evt)
                        //    //    {
                        //    //        if (evt.lengthComputable)
                        //    //        {
                        //    //            var percentComplete = (evt.loaded / evt.total) * 100;
                        //    //            $('#uploadStatus').text('Upload progress: ' + percentComplete.toFixed(2) + '%');
                        //    //        }
                        //    //    }, false);
                        //    //    return xhr;
                        //    //},
                        //    headers: {
                        //        'X-Additional-Data': JSON.stringify(additionalData)
                        //    },
                        //    success: function (result)
                        //    {
                        //        refreshMessages(sender, receiver);
                        //        $('.chatAttach').fadeOut(200);
                        //        setTimeout(() =>
                        //        {
                        //            $('.chatAttach').remove();
                        //            $('.chatUsers').removeClass('TYZimWgKPSymTgA');

                        //            let chatmessages = document.querySelector('.chatMessagesBubbles');
                        //            chatmessages.scrollTo(0, chatmessages.scrollHeight);
                        //        }, 200);

                        //        //console.log(result);

                        //    },
                        //    error: function (xhr, status, error)
                        //    {
                        //        console.log('Error:', error);
                        //    }
                        //});
                    });
                },
                error: function (xhr, status, error)
                {
                    console.log('Error:', error);
                }
            });
        }
        else 
        {
            $('.chatAttachDropText ion-icon').replaceWith('<ion-icon name="close-circle-outline"></ion-icon>');
            $('.chatAttachDropText span').html('Wybrany plik jest za duży!<br />(Wybierz nowy)');
        }
    }
    else {
        $('.chatAttachDropText ion-icon').replaceWith('<ion-icon name="close-circle-outline"></ion-icon>');
        $('.chatAttachDropText span').html('Nieobsługiwany typ pliku!<br />(Wybierz nowy)');
    }
    
};

function closeAttachForm() 
{
    $('.chatAttach').remove();
    $('.chatUsers').removeClass('TYZimWgKPSymTgA');
};

function changeUserColor() 
{

};

function changeReceiversColor() 
{

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
    connection.start().then(function () 
    { 
        checkLoggedInUsers();
    }).catch(function (err)
    {
        return console.error(err.toString());
    });
};
connect_();

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
    connection.invoke("RemoveMessage", id, sender, receiver).then(function () 
    { 
        $('#chatMessageOptionsId').remove();
        //$('.blur').remove();
        $('.bubble.out').removeClass('out');
        $('.bubble').removeClass('blur');
    }).catch(function (err)
    {
        return console.error(err.toString());
    });
};

async function checkLoggedInUsers() //execute after connection.start
{
    setTimeout(function ()
    {
        connection.invoke("CheckUsersLoggedIn").then(function () 
        {
            //
        }).catch(function (err)
        {
            return console.error(err.toString());
        });
    }, 100);   
};

async function sendAttachment(sender, receiver, file) //fileName
{
    //
    var additionalData = {
        senderId: sender,
        receiverId: receiver,
    };
    //

    await $.ajax({
        url: '/Chats/UploadFile',
        type: 'POST',
        data: file,
        processData: false,
        contentType: false,
        headers: {
            'X-Additional-Data': JSON.stringify(additionalData)
        },
        //data: {
        //    sender: sender,
        //    receiver: receiver,
        //    fileName_: fileName
        //},
        success: function (response)
        {
            if (response.success != false)
            {
                
            }

            console.log(response);


        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

async function addAttachmentToChat(sender, receiver, fileName) 
{
    await $.ajax({
        url: '/Chats/AddAttachmentToChat',
        type: 'POST',
        data: {
            sender: sender,
            receiver: receiver,
            fileName_: fileName
        },
        success: function (response)
        {
            //refreshMessages(sender, receiver);
            //$('.chatAttach').fadeOut(200);
            //setTimeout(() =>
            //{
            //    $('.chatAttach').remove();
            //    $('.chatUsers').removeClass('TYZimWgKPSymTgA');

            //    let chatmessages = document.querySelector('.chatMessagesBubbles');
            //    chatmessages.scrollTo(0, chatmessages.scrollHeight);
            //}, 200);



            var id_ = "";
            if (document.getElementById('chat')) 
            {
                if (document.querySelector('.userSelected')) 
                {
                    let onclick = $('.userSelected').attr('onclick');
                    id = onclick.substring(
                        onclick.indexOf(", ") + 1,
                        onclick.lastIndexOf(")")
                    );
                    id = id.replace(/\s/g, '');
                    id = id.slice(1, -1);

                    id_ = id;
                }
            }

            if (response.anyDuplicates) 
            {
                Rem(response.duplicates);

                if (response.senderId == id_ || response.senderId == response.loggedUser) 
                {
                    $('.emptyConversation').remove();
                    $('.receiverNotSelected').remove();

                    if (response.firstConversation)
                    {
                        setTimeout(function ()
                        {
                            $('.chatMessagesBubbles').html(response.messages);
                        }, 100);
                    }
                    else
                    {
                        if (response.dateCheck)
                        {
                            let div = $('#dateParent[date="' + response.today + '"]');

                            setTimeout(function ()
                            {
                                $(div).append(response.bubble);
                            }, 100);
                        }
                        else
                        {
                            setTimeout(function ()
                            {
                                $('.chatMessagesBubbles').append(response.messages);
                            }, 100);
                        }
                    }

                    refreshMessages(sender, receiver);

                    if (response.senderId == response.loggedUser)
                    {
                        $('#textAreaMessage').val("");
                    }

                    $('.chatMessagesBubbles').animate({ scrollTop: document.querySelector('.chatMessagesBubbles').scrollHeight }, "fast");

                    disconnect_();
                    setTimeout(function ()
                    {
                        if (connection.state == signalR.HubConnectionState.Disconnected)
                        {
                            connection.start().catch(function (err)
                            {
                                return console.error(err.toString());
                            });
                        }
                    }, 100);
                }
            }
            else 
            {
                if (response.senderId == id_ || response.senderId == response.loggedUser)
                {
                    $('.emptyConversation').remove();
                    $('.receiverNotSelected').remove();

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

                    setTimeout(function ()
                    {
                        refreshMessages(sender, receiver);
                    }, 150);

                    if (response.senderId == response.loggedUser)
                    {
                        $('#textAreaMessage').val("");
                    }

                    $('.chatMessagesBubbles').animate({ scrollTop: document.querySelector('.chatMessagesBubbles').scrollHeight }, "fast");
                }
            }

            GetCurrentlyLoggedUserId().then(response_ =>
            {
                if (response_ == response.receiverId) 
                {
                    if (sessionStorage.getItem('XaWDHywDpyvadHP') != null)
                    {
                        notifyReceiverChatIsOpen();
                        playReceivedMessageSound();

                        chatMessagesBubblesScroll();
                    }
                    else 
                    {
                        notifyReceiver();
                        playReceivedMessageSound();
                    }
                }
                //if (response_ == response.senderId) 
                //{
                //    chatMessagesBubblesScroll();
                //}
            });

            $('.chatAttach').fadeOut(200);
            setTimeout(() =>
            {
                $('.chatAttach').remove();
                $('.chatUsers').removeClass('TYZimWgKPSymTgA');
            }, 200);

        },
        error: function (xhr, status, error)
        {
            console.log('Error:', error);
        }
    });
};

var handlerRegistered = false;
function connect() 
{
    if (!handlerRegistered) {
        connection.on("ReceiveMessage", function (sender, receiver, message) //user, 
        {
            //for (let i = 0; i < 2; i++) {
            //    sendMessage_(sender, receiver, message);
            //}

            sendMessage_(sender, receiver, message);

            handlerRegistered = true;
        });

        connection.on("MessageRemoved", function (id, sender, receiver)
        {
            DeleteMessage_(id, sender, receiver);

            handlerRegistered = true;
        });

        connection.on("LoggedInUsers", function ()
        {
            updateStatusForUsersInChat();
        });

        connection.on("ReceiveAttachment", function (sender, receiver, fileName)
        {
            //sendAttachment(sender, receiver, fileName);

            addAttachmentToChat(sender, receiver, fileName);



        });
    }
};
connect();