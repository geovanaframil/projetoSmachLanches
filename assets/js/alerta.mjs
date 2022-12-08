
export function msg(active, err){
    if(active){
        let alert = document.querySelector('.alerta')
        alert.classList.remove('visibled');
        alert.innerHTML = `<p>${err}</p>` 
    }else{
        document.querySelector('.alerta').classList.add('visibled');
    }
}