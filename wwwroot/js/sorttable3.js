function sortTable(n)
{
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("tableId_");
    switching = true;
    dir = "asc";

    while (switching)
    {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++)
        {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc")
            {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase())
                {
                    shouldSwitch = true;
                    break;
                }
            }
            else if (dir == "desc")
            {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())
                {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch)
        {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        }
        else
        {
            if (switchcount == 0 && dir == "asc")
            {
                dir = "desc";
                switching = true;
            }
        }
    }

    //sorting_arrows(dir, n);
};

function sorting_arrows(sortingDirection, whichTH) 
{
    let table_th = $('#tableId_ thead tr th:not(:last)');

    if ($(table_th).find('span[id="arrow"]').length > 0)
    {
        $(table_th).children('span[id="arrow"]').remove();
    }

    if (sortingDirection == "asc")
    {
        $(table_th[whichTH]).append('<span id="arrow">&nbsp;&#x25BE;</span>');
    }
    else 
    {
        $(table_th[whichTH]).append('<span id="arrow">&nbsp;&#x25B4;</span>');
    }
};