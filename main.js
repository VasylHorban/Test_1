const getId = id => document.getElementById(id);

const out = getId('out')
const colors = ['#fdb3e3', '#fd9e9e', '#cba0cb', '#fff', '#c8c4ff', '#fff89a', '#4e4c4c', '#c4f8d4', '#81bf7f']

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


/*********Events********/
getId('btn-edit').addEventListener('click', () => {
    getId('text-area').value = out.innerHTML;
    getId('settings-block').style.display = 'block'
    getId('style').style.display = 'none'
    getId('edit').style.display = 'block'
})

getId('btn-style').addEventListener('click', () => {
    getId('settings-block').style.display = 'block'
    getId('edit').style.display = 'none'
    getId('style').style.display = 'block'
})

getId('btn-save').addEventListener('click', () => {
    out.innerHTML = getId('text-area').value
})

getId('font-size').addEventListener('click', e => {
    if (e.target.classList.contains('font-size-input')) {
        out.style.fontSize = e.target.value
    }
})
getId('font-family').addEventListener('change', e => {
    out.style.fontFamily = e.target.value
})

getId('btn-t-colors').addEventListener('click', () => {
    colorBox('text')
})
getId('btn-bg-colors').addEventListener('click', () => {
    colorBox('bg')
})

getId('color-box').addEventListener('click', e => {
    if (e.target.getAttribute('data-color-bg')) out.style.background = e.target.getAttribute('data-color-bg')
    if (e.target.getAttribute('data-color-text')) out.style.color = e.target.getAttribute('data-color-text')
    getId('color-box').innerHTML = '';
})

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

getId('btn-add').addEventListener('click', () => {
    getId('first-window').style.display = 'none'
    getId('second-window').style.display = 'block'
})