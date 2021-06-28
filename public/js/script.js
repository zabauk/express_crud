const update=document.querySelector('#update-button')
update.addEventListener('click', _ =>{
    fetch('/quote', {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            quote:'Drama movie',
            name:'Jcaker in the heart'
        })
    }).then(res=>{if(res.ok){
        return res.json()
    }}).then(window.location.reload(true))
})