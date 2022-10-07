//Event listener for create issue and show issues button
document.addEventListener('click', function(event){
    if(event.target.classList[0] == 'create-issue'){
        createIssue(event.target.id.slice(13));
    }
    else if(event.target.classList[0] == 'show-issue'){
        getAllIssues(event.target.id.slice(11));
    }

    else if(event.target.id == 'cross'){
        document.getElementById('project-container').style.display='block';
        document.getElementById('new-issue-form').style.display='none';
    }
});

//Event listener for search boxes
document.getElementById('searchbyname').addEventListener('keydown', function(key){
    console.log(key.key);
    let value = document.getElementById('searchbyname').value;
    showFilteredIssues(value);
});

document.getElementById('searchbylabel').addEventListener('keydown', function(key){
    console.log(key.key);
    let value = document.getElementById('searchbylabel').value;
    showFilteredIssueslabels(value);
});

//Open create issue form

function createIssue(id){
    console.log(id)
    document.getElementById('project-container').style.display='none';
    document.getElementById('new-issue-form').style.display='flex';
    document.getElementById('project-input').value = id;
}

//Always updated list with issues availabel on UI
let issuesList;

// XHR call to get all the issues for a specefic project
function getAllIssues(id){
    $.ajax({
        url:'/issue/getall/'+id,
        type:'GET',
        success: function(data){
            issuesList = data.data.issues;
            showIssue(data.data.issues);
            
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
}


//Show issues on DOM

function showIssue(issues){
    let con = document.getElementById('issues')
    con.innerHTML=``;
    document.getElementById('issue-container').style.display='block'
    console.log(issues);
    for(let i=0;i<issues.length;i++){
        let issue = document.createElement('div');   
        issue.classList.add('issue');
        issue.innerHTML=
        `
            <label class="head2" style="margin-bottom:1%; margin-left: 1.5%;">${issues[i].title}</label>
            <label class="text" style="margin-bottom:1%;margin-left: 1.5%;">${issues[i].description}</label>
            <label class="text" style="margin:1.5%;">${issues[i].author}</label>
            <label class='text' style="margin:1.5%;"><strong class='text' style='margin:0.3%;'>Labels : </strong>${issues[i].labels}</label>
        `
        document.getElementById('issues').append(issue);
    }
}


//Filter issues by title or description

function showFilteredIssues(key){
    let filteredIssues=[];
    for(let issue of issuesList){
        if(issue.title.toLowerCase().match(key.toLowerCase()) || issue.description.toLowerCase().match(key.toLowerCase())){
            filteredIssues.push(issue);
        }
    }
    showIssue(filteredIssues);
}

//Filter issues by one or more labels

function showFilteredIssueslabels(key){
    key = key.toLowerCase();
    let inputs = key.split(' ');
    let filteredIssues=[];
    for(let issue of issuesList){
        let labels = issue.labels.toString().toLowerCase();
        for(let j=0;j<inputs.length;j++){
            if(labels.match(inputs[j])){
                filteredIssues.push(issue);
                break;
            }
        }
    }
    showIssue(filteredIssues);
}


