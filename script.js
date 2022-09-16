var first = document.getElementById('first'),
    second = document.getElementById('second'),
    power = document.getElementById('power'),
    buttons = document.getElementById('nav').getElementsByTagName('button'),
    isGood = false,
    cykliczna = true,
    tex = '';

var operation = 'ilo';

var keysCyk = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')'],
    keysTab = ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    keys = [...keysCyk];

window.addEventListener('keydown', (event) => {
    if(keys.includes(event.key) || event.key == 'Backspace')
        insertIntoSelected(event.key)
});

function changeActive(active)
{
    var dispDiv = document.getElementsByClassName('dispDiv');
    for(i = 0; i < dispDiv.length; i++)
        dispDiv[i].classList.remove('activeDisp');
    document.getElementById(active).classList.add('activeDisp');
    var keybs = document.getElementById('keyboards').getElementsByTagName('div');
    for(i = 0; i < keybs.length; i++)
        keybs[i].style.display = 'none';
    switch(active)
    {
        case 'firstDisp':
            document.getElementById('firstKeyboard').style.display = 'grid';
            break;
        case 'secondDisp':
            document.getElementById('secondKeyboard').style.display = 'grid';
            break;
        case 'powerDisp':
            document.getElementById('powerKeyboard').style.display = 'grid';
            break;
    }
    document.getElementById('keyboards').classList.add('keyboardShown');
    document.getElementById('results').style.opacity = 0;
}

function updateView()
{
    if(cykliczna)
    {
        if(first.value != '')
            document.getElementById('firstDisp').innerHTML = '$$' + first.value + '$$';
        else
            document.getElementById('firstDisp').innerHTML = 'Permutacja 1';
        if(second.value != '')
            document.getElementById('secondDisp').innerHTML = '$$' + second.value + '$$';
        else
            document.getElementById('secondDisp').innerHTML = 'Permutacja 2';
    }
    else
    {
        var tmp, tmpstr;
        
        if(first.value != '')
        {
            tmp = first.value.split(' ');
            tmp.pop();
            tmpstr = '$$\\begin{pmatrix}';
            for(i = 1; i < tmp.length + 1; i++)
            {
                tmpstr += i;
                if(i < tmp.length)
                    tmpstr += '&';
            }
            tmpstr += '\\\\';
            for(i = 0; i < tmp.length; i++)
            {
                tmpstr += tmp[i];
                if(i < tmp.length - 1)
                    tmpstr += '&';
            }
            tmpstr += '\\end{pmatrix}$$';
            document.getElementById('firstDisp').innerHTML = tmpstr;
        }
        else
            document.getElementById('firstDisp').innerHTML = 'Permutacja 1';
        
        if(second.value != '')
        {
            tmp = second.value.split(' ');
            tmp.pop();
            tmpstr = '$$\\begin{pmatrix}';
            for(i = 1; i < tmp.length + 1; i++)
            {
                tmpstr += i;
                if(i < tmp.length)
                    tmpstr += '&';
            }
            tmpstr += '\\\\';
            for(i = 0; i < tmp.length; i++)
            {
                tmpstr += tmp[i];
                if(i < tmp.length - 1)
                    tmpstr += '&';
            }
            tmpstr += '\\end{pmatrix}$$';
            document.getElementById('secondDisp').innerHTML = tmpstr;
        }
        else
            document.getElementById('secondDisp').innerHTML = 'Permutacja 2';
    }
    if(power.value != '')
        document.getElementById('powerDisp').innerHTML = '$$' + power.value + '$$';
    else
        document.getElementById('powerDisp').innerHTML = 'Potęga';
    MathJax.typeset();
}

var selectedField = first;

function insertIntoSelected(key)
{
    var tmpstr = selectedField.value;
    if(selectedField == power)
    {
        if(key == 'Backspace')
        {
            tmpstr = tmpstr.substr(0, tmpstr.length - 1);
        }
        else if(keysTab.includes(key) || key == 0)
        {
            tmpstr += key;
        }
    }
    else
    {
        if(selectedField == first)
            var selectedKeyboard = document.getElementById('firstKeyboard');
        else
            var selectedKeyboard = document.getElementById('secondKeyboard');
        
        if(key == 'Backspace')
        {
            tmpstr = tmpstr.substr(0, tmpstr.length - 2);
        }
        else
        {
            if(keysTab.includes(key))
            {
                var numKeys = selectedKeyboard.getElementsByClassName('numericButton');
                if(numKeys[parseInt(key) - 1].disabled == false)
                {
                    tmpstr += key + ' ';
                }
            }
            else if((key == '(' && selectedKeyboard.getElementsByClassName('bracketButton')[0].disabled == false) || (key == ')' && selectedKeyboard.getElementsByClassName('bracketButton')[1].disabled == false))
            {
                tmpstr += key + ' ';
            }
        }
    }
    selectedField.value = tmpstr;
    
    updateView();
    
    updateKeyboards();
}

function updateKeyboards()
{
    var firstKeyboard = document.getElementById('firstKeyboard');
    var secondKeyboard = document.getElementById('secondKeyboard');
    var powerKeyboard = document.getElementById('powerKeyboard');
    
    var firstVal = first.value.split(' ');
    firstVal.pop();
    var firstmax = 0;
    for(i = 0; i < firstVal.length; i++)
        if(parseInt(firstVal[i]) > firstmax)
            firstmax = parseInt(firstVal[i]);
    var secondVal = second.value.split(' ');
    secondVal.pop();
    var secondmax = 0;
    for(i = 0; i < firstVal.length; i++)
        if(parseInt(secondVal[i]) > secondmax)
            secondmax = parseInt(secondVal[i]);
    
    var firstBracketsButton = firstKeyboard.getElementsByClassName('bracketButton');
    var firstNumericButton = firstKeyboard.getElementsByClassName('numericButton');
    var secondBracketsButton = secondKeyboard.getElementsByClassName('bracketButton');
    var secondNumericButton = secondKeyboard.getElementsByClassName('numericButton');
    
    if(cykliczna)
    {
        for(i = 0; i < firstBracketsButton.length; i++)
            firstBracketsButton[i].disabled = false;
        for(i = 0; i < secondBracketsButton.length; i++)
            secondBracketsButton[i].disabled = false;
        for(i = 0; i < firstNumericButton.length; i++)
            firstNumericButton[i].disabled = false;
        for(i = 0; i < secondNumericButton.length; i++)
            secondNumericButton[i].disabled = false;
        
        if(firstVal.length == 0 || firstVal[firstVal.length - 1] == ')')
        {
            for(i = 0; i < firstNumericButton.length; i++)
                firstNumericButton[i].disabled = true;
            firstBracketsButton[1].disabled = true;
        }
        else
        {
            for(i = 0; i < firstNumericButton.length; i++)
                if(firstVal.includes((i + 1) + ''))
                    firstNumericButton[i].disabled = true;
                firstBracketsButton[0].disabled = true;
            if(firstVal[firstVal.length - 1] == '(')
                firstBracketsButton[1].disabled = true;
        }
        
        if(secondVal.length == 0 || secondVal[secondVal.length - 1] == ')')
        {
            for(i = 0; i < secondNumericButton.length; i++)
                secondNumericButton[i].disabled = true;
            secondBracketsButton[1].disabled = true;
        }
        else
        {
            for(i = 0; i < secondNumericButton.length; i++)
                if(secondVal.includes((i + 1) + ''))
                    secondNumericButton[i].disabled = true;
                secondBracketsButton[0].disabled = true;
            if(secondVal[secondVal.length - 1] == '(')
                secondBracketsButton[1].disabled = true;
        }
    }
    else
    {
        for(i = 0; i < firstBracketsButton.length; i++)
            firstBracketsButton[i].disabled = true;
        for(i = 0; i < secondBracketsButton.length; i++)
            secondBracketsButton[i].disabled = true;
        
        for(i = 0; i < firstNumericButton.length; i++)
        {
            if(firstVal.includes((i + 1) + ''))
                firstNumericButton[i].disabled = true;
            else
                firstNumericButton[i].disabled = false;
            
            if(secondVal.includes((i + 1) + ''))
                secondNumericButton[i].disabled = true;
            else
                secondNumericButton[i].disabled = false;
            
            if(firstmax > (i + 1) && firstNumericButton[i].disabled == false)
                firstNumericButton[i].classList.add('requiredNumber');
            else
                firstNumericButton[i].classList.remove('requiredNumber');
            
            if(secondmax > (i + 1) && secondNumericButton[i].disabled == false)
                secondNumericButton[i].classList.add('requiredNumber');
            else
                secondNumericButton[i].classList.remove('requiredNumber');
        }
    }
}

function cyk(yes)
{
    if(parseInt(yes) == 1)
    {
        document.getElementById('cykButton').classList.add('active');
        document.getElementById('tabButton').classList.remove('active');
        cykliczna = true;
        keys = [...keysCyk];
    }
    else
    {
        document.getElementById('tabButton').classList.add('active');
        document.getElementById('cykButton').classList.remove('active');
        cykliczna = false;
        keys = [...keysTab];
    }
    first.value = '';
    second.value = '';
    power.value = '';
    selectedField = first;
    changeActive('firstDisp');
    updateView();
    updateKeyboards();
}

function operationSet(op)
{
    operation = op;
    switch(operation)
    {
        case 'ilo':
            for(i = 0; i < buttons.length; i++)
                buttons[i].classList.remove('active');
            document.getElementById('iloButton').classList.add('active');
            document.getElementById('secondDisp').style.display = 'block';
            document.getElementById('powerDisp').style.display = 'none';
            break;
        case 'pot':
            for(i = 0; i < buttons.length; i++)
                buttons[i].classList.remove('active');
            document.getElementById('potButton').classList.add('active');
            document.getElementById('secondDisp').style.display = 'none';
            document.getElementById('powerDisp').style.display = 'block';
            break;
        case 'odw':
            for(i = 0; i < buttons.length; i++)
                buttons[i].classList.remove('active');
            document.getElementById('odwButton').classList.add('active');
            document.getElementById('secondDisp').style.display = 'none';
            document.getElementById('powerDisp').style.display = 'none';
            break;
    }
    first.value = '';
    second.value = '';
    power.value = '';
    selectedField = first;
    changeActive('firstDisp');
    updateView();
    updateKeyboards();
}

function changeToTab(perm)
{
    var validElements = [' ', '(', ')'],
        validNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    var opened = false;
    var j = 0, arr = [], array = [[]], helper;
    for(i = 0; i < perm.length; i++)
    {
        if(validElements.includes(perm[i]) || validNumbers.includes(perm[i]))
        {
            if(perm[i] == '(')
            {
                helper = 0;
                if(opened)
                {
                    isGood = false;
                    alert('Błędny format!');
                    return;
                }
                else
                {
                    opened = true;
                    arr = [];
                }
            }
            else if(opened)
            {
                if(perm[i] == ')')
                {
                    if(arr.length == 0 && helper == 0)
                    {
                        isGood = false;
                        alert('Błędny format!');
                        return;
                    }
                    else
                    {
                        if(helper > 0)
                            arr.push(helper);
                        if(array.length > 0)
                            array.push(new Array());
                        if(arr.length > 0)
                        {
                            array[j] = arr;
                            j++;
                        }
                        helper = 0;
                        opened = false;
                    }
                }
                else if(validNumbers.includes(perm[i]))
                {
                    if(helper == 0)
                        helper = parseInt(perm[i]);
                    else if(validNumbers.includes(perm[i - 1]))
                        helper = helper * 10 + parseInt(perm[i]);
                }
                else if(perm[i] == ' ')
                {
                    if(helper > 0)
                        arr.push(helper);
                    helper = 0;
                }
            }
            else if(!opened && perm[i] != ' ')
            {
                isGood = false;
                alert('Błędny format!');
                return;
            }
        }
        else
        {
            isGood = false;
            alert('Błędny format!');
            return;
        }
    }
    if(opened)
    {
        isGood = false;
        alert('Błędny format!');
        return;
    }
    array.pop();
    var max = 0;
    for(i = 0; i < array.length; i++)
        for(j = 0; j < array[i].length; j++)
            if(array[i][j] > max)
                max = array[i][j];
    var result = new Array(max), check = new Array();
    for(i = 0; i < array.length; i++)
    {
        for(j = 0; j < array[i].length; j++)
        {
            check.push(array[i][j]);
        }
    }
    var checkLen = check.length;
    for(i = 0; i < checkLen - 1; i++)
    {
        var x = check.pop();
        if(check.includes(x))
        {
            isGood = false;
            alert('Błędny format!');
            return;
        }
    }
    for(i = 0; i < result.length; i++)
        result[i] = i + 1;
    
    for(i = 0; i < array.length; i++)
    {
        for(j = 0; j < array[i].length - 1; j++)
        {
            result[array[i][j] - 1] = array[i][j + 1];
        }
        result[array[i][array[i].length - 1] - 1] = array[i][0];
    }
    
    return result;
}

function readTab(perm)
{
    var validNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    for(i = 0; i < perm.length; i++)
        if(!validNumbers.includes(perm[i]) && perm[i] != ' ')
        {
            isGood = false;
            alert('Błędny format!');
            return;
        }
    var res = perm.split(' '), result = [];
    for(i = 0; i < res.length; i++)
        if(!isNaN(parseInt(res[i])))
            result.push(parseInt(res[i]));
    var arr = [...result], x;
    for(i = 0; i < result.length; i++)
    {
        x = arr.pop();
        if(arr.includes(x))
        {
            isGood = false;
            alert('Błędny format!');
            return;
        }
    }
    var max = 0;
    for(i = 0; i < result.length; i++)
    {
        if(max < result[i])
            max = result[i];
    }
    if(max != result.length)
    {
        isGood = false;
        alert('Błędny format!');
        return;
    }
    
    return result;
}

// -----------------------------------------------------------------------------------------------

function tabToCycle(perm)
{
    var arr = [], result = [], test = [];
    for(i = 0; i < perm.length; i++)
        test.push('true');
    for(i = 0; i < perm.length; i++)
    {
        if(test[i] && parseInt(perm[i]) != i + 1)
        {
            arr = [];
            arr.push(perm[i]);
            j = parseInt(perm[i]) - 1;
            test[j] = false;
            while(perm[j] != arr[0])
            {
                arr.push(perm[j]);
                j = parseInt(perm[j]) - 1;
                test[j] = false;
            }
            result.push(arr);
        }
        test[i] = false;
    }
    
    return result;
}

function nwd(a, b)
{
    do
    {
        if(a > b)
            a = a - b;
        else
            b = b - a;
    }
    while(a != b);
    
    return a;
}

function nww(a, b)
{
    return (a * b) / nwd(a, b);
}

function permRow(permCycl)
{
    var result;
    if(permCycl.length == 0)
       result = 1;
    else if(permCycl.length == 1)
        result = permCycl[0].length;
    else
    {
        var rows = [];
        for(i = 0; i < permCycl.length; i++)
            rows.push(permCycl[i].length);
        
        var result = rows.pop();
        while(rows.length > 0)
            result = nww(result, rows.pop());
    }
    
    return result;
}

// -----------------------------------------------------------------------------------------------

function correctPower()
{
    var val = power.value;
    if(isNaN(val))
        power.value = 2;
    else
    {
        val = parseInt(val);
        if(val < 2)
            power.value = 2;
        else if(val > 1000)
            power.value = 1000;
    }
}

function iloczyn(p1, p2)
{
    var p1l = p1.length, p2l = p2.length, temp = [];
    if(p1l < p2l)
    {
        for(i = 1; i < p2l + 1; i++)
            temp.push(i);
        while(temp.length != (p2l - p1l))
            temp.shift();
        for(i = 0; i < temp.length; i++)
            p1.push(temp[i]);
    }
    else if(p1l > p2l)
    {
        for(i = 1; i < p1l + 1; i++)
            temp.push(i);
        while(temp.length != (p1l - p2l))
            temp.shift();
        for(i = 0; i < temp.length; i++)
            p2.push(temp[i]);
    }
    
    var result = new Array(p1.length);
    for(i = 0; i < result.length; i++)
        result[i] = p1[p2[i] - 1];
    return result;
}

function potega(p1, pot)
{
    var result = [...p1];
    for(k = 1; k < pot; k++)
    {
        res = [...result];
        result = iloczyn(res, p1);
    }
    return result;
}

function odwrotnosc(p1)
{
    var result = [];
    for(i = 1; i < p1.length + 1; i++)
        for(j = 0; j < p1.length; j++)
            if(i == p1[j])
                result.push(j + 1)
    return result;
}

function performOperation()
{
    correctPower();
    isGood = true;
    var firstPerm = first.value;
    var secondPerm = second.value;
    var p = parseInt(power.value);
    var p1 = [], p2 = [], p;
    if(cykliczna)
    {
        p1 = changeToTab(firstPerm);
        p2 = changeToTab(secondPerm);
    }
    else
    {
        p1 = readTab(firstPerm);
        p2 = readTab(secondPerm);
    }
    
    if(isGood)
    {
        var result, text = '';
        switch(operation)
        {
            case 'ilo':
                if(p1.length == 0 || p2.length == 0)
                {
                    alert('Brak danych!');
                    isGood = false;
                    return;
                }
                result = iloczyn(p1, p2);
                
                text += '$$\\begin{pmatrix}';
                for(i = 0; i < p1.length; i++)
                {
                    text += (i + 1);
                    if(i < p1.length - 1)
                        text += '&';
                }
                text += '\\\\';
                for(i = 0; i < p1.length; i++)
                {
                    text += p1[i];
                    if(i < p1.length - 1)
                        text += '&';
                }
                text += '\\\\\\end{pmatrix}$$ $$\\circ$$ $$\\begin{pmatrix}';
                for(i = 0; i < p2.length; i++)
                {
                    text += (i + 1);
                    if(i < p2.length - 1)
                        text += '&';
                }
                text += '\\\\';
                for(i = 0; i < p2.length; i++)
                {
                    text += p2[i];
                    if(i < p2.length - 1)
                        text += '&';
                }
                text += '\\\\\\end{pmatrix}$$ $$=$$ $$\\begin{pmatrix}';
                for(i = 0; i < result.length; i++)
                {
                    text += (i + 1);
                    if(i < result.length - 1)
                        text += '&';
                }
                text += '\\\\';
                for(i = 0; i < result.length; i++)
                {
                    text += result[i];
                    if(i < result.length - 1)
                        text += '&';
                }
                text += '\\\\\\end{pmatrix}$$';
                break;
            case 'pot':
                if(p1.length == 0 || p == '')
                {
                    alert('Brak danych!');
                    isGood = false;
                    return;
                }
                result = potega(p1, p);
                text += '$$\\begin{pmatrix}';
                for(i = 0; i < p1.length; i++)
                {
                    text += (i + 1);
                    if(i < p1.length - 1)
                        text += '&';
                }
                text += '\\\\';
                for(i = 0; i < p1.length; i++)
                {
                    text += p1[i];
                    if(i < p1.length - 1)
                        text += '&';
                }
                text += '\\\\\\end{pmatrix}^{' + p + '}$$ $$=$$ $$\\begin{pmatrix}';
                for(i = 0; i < result.length; i++)
                {
                    text += (i + 1);
                    if(i < result.length - 1)
                        text += '&';
                }
                text += '\\\\';
                for(i = 0; i < result.length; i++)
                {
                    text += result[i];
                    if(i < result.length - 1)
                        text += '&';
                }
                text += '\\\\\\end{pmatrix}$$';
                break;
            case 'odw':
                if(p1.length == 0)
                {
                    alert('Brak danych!');
                    isGood = false;
                    return;
                }
                result = odwrotnosc(p1);
                
                text += '$$\\begin{pmatrix}';
                for(i = 0; i < p1.length; i++)
                {
                    text += (i + 1);
                    if(i < p1.length - 1)
                        text += '&';
                }
                text += '\\\\';
                for(i = 0; i < p1.length; i++)
                {
                    text += p1[i];
                    if(i < p1.length - 1)
                        text += '&';
                }
                text += '\\\\\\end{pmatrix}^{-1}$$ $$=$$ $$\\begin{pmatrix}';
                for(i = 0; i < result.length; i++)
                {
                    text += (i + 1);
                    if(i < result.length - 1)
                        text += '&';
                }
                text += '\\\\';
                for(i = 0; i < result.length; i++)
                {
                    text += result[i];
                    if(i < result.length - 1)
                        text += '&';
                }
                text += '\\\\\\end{pmatrix}$$';
                break;
        }
        text += 'Rzad permutacji wynosi ' + permRow(tabToCycle(result)) + '.';
        
        document.getElementById('result').innerHTML = text;
        MathJax.typeset();
        tex = text;
        document.getElementById('keyboards').classList.remove('keyboardShown');
        if(tex != '')
        {
            document.getElementById('texBut').disabled = false;
            document.getElementById('texBut').classList.add('active');
        }
        else
        {
            document.getElementById('texBut').disabled = true;
            document.getElementById('texBut').classList.remove('active');
        }
    }
}

function history(open = false)
{
    if(open)
    {
        document.getElementById('history').style.width = '100vw';
        document.getElementById('close').style.top = '2vh';
    }
    else
    {
        document.getElementById('history').style.width = '0';
        document.getElementById('close').style.top = '-20vh';
    }
}

function help(open = false)
{
    if(open)
    {
        document.getElementById('help').style.width = '100vw';
        document.getElementById('close').style.top = '2vh';
    }
    else
    {
        document.getElementById('help').style.width = '0';
        document.getElementById('close').style.top = '-20vh';
    }
}

function download(filename)
{
    var element = document.createElement('a'),
        text = '\\documentclass{article} \\usepackage[utf8]{inputenc} \\usepackage{amsmath} \\begin{document} ' + tex + '\\end{document}';
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
