let savebtnEl =document.querySelector("#saveinput-btn");
let inputFieldEl =document.querySelector("#input-field");
let listEl =document.querySelector("#items-list");
let savetabbtnEl =document.querySelector("#savetab-btn");
let deleteButtonEl =document.querySelector("#delete-btn");
let list=[];
let temp;

let localStorageDB=JSON.parse(localStorage.getItem("leadsDB"));

if(localStorageDB){
    console.log("truthy");
    list=localStorageDB;
    showValues(list);
}

function showValues(data){
    let listItems="";
    for(let i=0;i<data.length;i++){
        listItems +=`<li>
        <a target='_blank' href='${data[i]}'>${data[i]}</a>
        </li>`;
    }
    listEl.innerHTML=listItems;
}

savebtnEl.addEventListener("click", function(){
    list.push(inputFieldEl.value);
    localStorage.setItem("leadsDB",JSON.stringify(list));
    inputFieldEl.value="";
    showValues(list);
});

deleteButtonEl.addEventListener("dblclick", function(){
    localStorage.clear();
    list=[];
    showValues(list);
});

savetabbtnEl.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        temp=tabs[0].url;
        list.push(temp);
        localStorage.setItem("leadsDB",JSON.stringify(list));
        showValues(list);
    })
})