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
        $(e.target).parent().children('.chatTimeStamp').css({ 'opacity': '1' });
    }
});

$('.bubble').on('mouseout', function (e)
{
    if ($(e.target).hasClass('bubble'))
    {
        $(e.target).parent().children('.chatTimeStamp').css({ 'opacity': '0' });
    }
});

let chatmessages = document.querySelector('.chatMessagesBubbles');
chatmessages.scrollTo(0, chatmessages.scrollHeight);