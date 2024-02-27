var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks){
        tablink.classList.remove("active-link")
    }
    for (tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab")
    }
    event.currentTarget.classList.add("active-link")
    document.getElementById(tabname).classList.add("active-tab")
}
/*----------------------------------------------------making the website Responsive-------------------------------------------- */

function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display= 'flex'

}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display= 'none'

}
 
