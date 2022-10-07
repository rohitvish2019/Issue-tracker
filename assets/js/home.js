//Listener for create project button
{
    document.addEventListener('click', function(event){
        if(event.target.id == 'create-new-project'){
            window.location.href = '/project/create'
        }
    })
}