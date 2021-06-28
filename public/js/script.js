const update=document.querySelector('#update-button')
update.addEventListener('click', _ =>{
    fetch('/quote', {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            quote:'One two three',
            name:'Jcaker in the heart'
        })
    })
})

//delete button
const delbtn=document.querySelector('#delete-button')
delbtn.addEventListener('click', _ =>{
    const name=document.getElementById('input-name').value;
    fetch('/quote', {
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            name:name
        })
    })
})