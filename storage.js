var first = document.getElementById('first'),
    second = document.getElementById('second'),
    power = document.getElementById('power');

function updateStorage()
{
    correctPower();
    if(typeof(Storage) !== 'undefined' && isGood)
    {
        if(localStorage.elementNumber)
            localStorage.elementNumber = (Number(localStorage.elementNumber) + 1) % 30;
        else
            localStorage.elementNumber = 0;
        
        var temp = 2;
        if(cykliczna)
            temp = 1;
        localStorage.setItem('item' + localStorage.elementNumber, operation + '|' + temp + '|' + first.value + '|' + second.value + '|' + power.value + '|' + tex)
        
        getItemsFromStorage();
    }
}

function getItemsFromStorage()
{
    if(typeof(Storage) !== 'undefined')
    {
        document.getElementById('history').innerHTML = '';
        for(i = 0; i < 30; i++)
        {
            var item = localStorage.getItem('item' + i);
            var text = '';
            /*if(item)
            {
                text += '<button onclick="setValues(\'' + item + '\'); performOperation(); document.getElementById(\'results\').style.opacity = 1;\">';
                item = item.split('|');
                switch(item[0])
                {
                    case 'ilo':
                        text += 'iloczyn';
                        break;
                    case 'pot':
                        text += 'potęga';
                        break;
                    case 'odw':
                        text += 'odwrotność';
                        break;
                }
                if(item[1] == '1')
                    text += ' cyk. [';
                else
                    text += ' tab. [';
                switch(item[0])
                {
                    case 'ilo':
                        text += item[2] + ']*[' + item[3] + ']</button>';
                        break;
                    case 'pot':
                        text += item[2] + ']^' + item[4] + '</button>';
                        break;
                    case 'odw':
                        text += item[2] + ']^(-1)</button>';
                        break;
                }
                document.getElementById('history').innerHTML += text;
            }*/
            
            if(item)
            {
                item = item.split('|');
                text += '<button onclick="setValues(\'' + item[0] + '|' + item[1] + '|' + item[2] + '|' + item[3] + '|' + item[4] + '\'); performOperation(); document.getElementById(\'results\').style.opacity = 1;\">';
                text += item[5] + '</button>';
                document.getElementById('history').innerHTML += text;
            }
        }
    }
    updateView();
    MathJax.typeset();
}

function setValues(values)
{
    values = values.split('|');
    operationSet(values[0]);
    cyk(values[1]);
    first.value = values[2];
    second.value = values[3];
    power.value = values[4];
    updateKeyboards();
    updateView();
    history();
}