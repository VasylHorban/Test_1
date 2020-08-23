const getId = id => document.getElementById(id);// get DOM element by ID

const out = getId('out')// main data output element 
const colors = [
    '#fdb3e3', '#fd9e9e', '#cba0cb', '#fff', '#c8c4ff', '#fff89a', '#4e4c4c', '#c4f8d4', '#81bf7f'
]

/******function*******/

//create BoxColor
function colorBox(context) {
    getId('color-box').innerHTML = '';
    colors.sort(() => Math.random() - 0.5);
    colors.forEach(color => {
        let div = document.createElement('div');
        div.classList.add('colors-item')
        div.setAttribute(`data-color-${context}`, color)
        div.style.background = color;
        getId('color-box').append(div)
    })
}
//return List element
function createList(data){
    console.log(data)
    let list = document.createElement('ul');
    for(let i = 1; i <= data.countLI; i++){
        let li = document.createElement('li');
        li.type = data.markType;
        li.textContent = `${i} item` 
        list.append(li)
    }
    return list
}
//return Table element
function createTable(data){
    let table = document.createElement('table');
    for(let i = 0 ; i < data.countTR ; i++){
        let tr = document.createElement('tr');
        for(let y = 0 ; y < data.countTD; y++){
            let td = document.createElement('td');
            td.style.width = data.width + 'px';
            td.style.height = data.height + 'px';
            td.textContent = 'TD';
            td.style.border = `${data.borderWidth}px ${data.borderType} ${data.borderColor}`;
            tr.append(td)
        }
        table.append(tr)
    }
    return table
}
//refresh Text area
function refreshTextArea(){
    getId('text-area').value = out.innerHTML
}
//checking data
function checkData(data){
    let bool = true;
    data.forEach(value =>{
        if(!isFinite(value) || value == '' || value == null){
            console.log('here')
            bool = false
        }
    })
    return bool
}
// clear element
function clear(elem){
    elem.textContent = ''
}
// show notification in elem
function showNotification(elem){
    let span = getId(`notification-${elem}`);
    span.textContent = '*invalide data';
    console.log(span)
    setTimeout( function(){
        span.textContent = ''
    }, 3000)
}

/*********Events********/

// show block Edit and hide block Style
getId('btn-edit').addEventListener('click', () => {
    refreshTextArea();
    getId('settings-block').style.display = 'block'
    getId('style').style.display = 'none'
    getId('edit').style.display = 'block'
})

// show block Style and hide block Edit
getId('btn-style').addEventListener('click', () => {
    getId('settings-block').style.display = 'block'
    getId('edit').style.display = 'none'
    getId('style').style.display = 'block'
})

// show data into Out from Textarea
getId('btn-save').addEventListener('click', () => {
    out.innerHTML = getId('text-area').value
})

// set font size for Out
getId('font-size').addEventListener('click', e => {
    if (e.target.classList.contains('font-size-input')) {
        out.style.fontSize = e.target.value
    }
})

// set font family for Out
getId('font-family').addEventListener('change', e => {
    out.style.fontFamily = e.target.value
})

// start colorBox fn for text
getId('btn-t-colors').addEventListener('click', () => {
    colorBox('text')
})

// start colorBox fn for background
getId('btn-bg-colors').addEventListener('click', () => {
    colorBox('bg')
})

// set color to text or background
getId('color-box').addEventListener('click', e => {
    if (e.target.getAttribute('data-color-bg')) out.style.background = e.target.getAttribute('data-color-bg')
    if (e.target.getAttribute('data-color-text')) out.style.color = e.target.getAttribute('data-color-text')
    getId('color-box').innerHTML = '';
})

// set font weight or font style
getId('font-weight').addEventListener('click', e => {
    if (e.target.classList.contains('font-weight')) {
        if (e.target.value == 'bold') {
            if (e.target.checked) {
                out.style.fontWeight = 'bold'
            } else {
                out.style.fontWeight = 'normal'
            }
        }else if(e.target.value == 'italic') {
            if (e.target.checked) {
                out.style.fontStyle = 'italic'
            } else {
                out.style.fontStyle = 'normal'
            }
        }
    }
})

// show Second window and hide First window
getId('btn-add').addEventListener('click', () => {
    getId('first-window').style.display = 'none'
    getId('second-window').style.display = 'block'
})

// show Table settings or List settings
getId('switch').addEventListener('click', e=>{
    if(e.target.value == 'table'){
        getId('list').style.display = 'none';
        getId('table').style.display = 'block';
    }else if(e.target.value == 'list'){
        getId('table').style.display = 'none';
        getId('list').style.display = 'block';
    }
})

// set and check Table
getId('btn-table').addEventListener('click', ()=>{
    let data = {
        countTR : getId('count-tr').value,
        countTD : getId('count-td').value,
        width : getId('width-td').value,
        height : getId('height-td').value,
        borderWidth : getId('width-border').value,
        borderType : getId('border-type').value,
        borderColor : getId('border-color').value
    }
    if(!checkData([data.countTD, data.countTR])){
        showNotification('table')
        return false
    }
    
    out.append(createTable(data));
    refreshTextArea();
    getId('first-window').style.display = 'block'
    getId('second-window').style.display = 'none'
})

// set and check List
getId('btn-list').addEventListener('click', ()=>{
    let data = {
        countLI : getId('count-li').value,
        markType : getId('mark-type').value
    }
    if(!checkData([data.countLI])){
        showNotification('list')
        return false
    }
    out.append(createList(data))
    refreshTextArea();
    getId('first-window').style.display = 'block'
    getId('second-window').style.display = 'none'
})