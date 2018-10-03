const WINDOW_DIMENSION_LIMITS={

    width:499,
    height:549,
    checkIfBiggerThanLimits:function (){
               
        
        
        let width = window.innerWidth;
        let height= window.innerHeight;
        let widthLimit= this.width;
        let heightLimit=this.height;
            
        return height > heightLimit && width > widthLimit;
    
        
     
        
    }
  
}

// const MODAL = {

//     overlay: document.getElementsByClassName("modal-overlay")[0],

//     defineModalDisplay: function (){
       
//         WINDOW_DIMENSION_LIMITS.checkIfBiggerThanLimits() ? this.showModal() : this.hideModal();
//     },

//     hideModal: () =>{

//         console.log("no");
//     },

//     showModal: () =>{
//         console.log("yes");
//     },

    
    

// }

// window.addEventListener("resize",  MODAL.defineModalDisplay.bind(MODAL));

function showHideElements(event){


    if(!WINDOW_DIMENSION_LIMITS.checkIfBiggerThanLimits()){
        
        if(document.querySelectorAll(".tall").length >0){
            return;
        }

        if(document.querySelectorAll(".expanded").length >0){
            
            manipulateClass(removeClass,"expanded",".expanded")
            manipulateClass(removeClass,"expanded-section",".expanded-section")
            manipulateClass(removeClass,"wrapper-expanded",".wrapper-expanded")
            hideContent();

        }


        else{
            hideIcons();
            hideContent();
        }

        
    }

    else{

        if(document.querySelectorAll(".tall").length >0){
            console.log("running");
            manipulateClass(removeClass,"tall",".tall")
        }

        
        if(document.querySelectorAll(".expanded").length>0){

            showContent();
            

            
        }
        else{
           
            hideContent()
            showIcons();
        }
    
            

        

    }
}

window.addEventListener("load", showHideElements)
window.addEventListener("resize",showHideElements)



let sections= document.querySelectorAll("section");


sections.forEach((section)=> { 
    
    if(section.classList.contains("intro")){
        return;
    }
    else{
        section.addEventListener("click", getSectionCoordinates);
        section.addEventListener("click",expandSection);
    }
            
  
 });



function getSectionCoordinates(event){

    let coordinates={
        top:event.target.getBoundingClientRect().top,
        left:event.target.getBoundingClientRect().left
    }

    return resizeSection(coordinates,event)
    
}


function resizeSection(coordinates,event){

    if(!WINDOW_DIMENSION_LIMITS.checkIfBiggerThanLimits()){
        return
    }
    else{

    let target= event.target;
    let top= coordinates.top;
    let left= coordinates.left;
    target.classList.toggle("expanded");

    showSectionContent(event);
    }

    
    
}


function showSectionContent(event){
    

    event.target.getElementsByClassName("icon")[0].classList.toggle("invisible");
    event.target.getElementsByClassName("icon-wrapper")[0].classList.toggle("wrapper-expanded");
    event.target.getElementsByClassName("content")[0].classList.toggle("invisible");
    event.target.classList.toggle("expanded-section");


    console.log(event.target);
    



}


function expandSection(event){

    if(!WINDOW_DIMENSION_LIMITS.checkIfBiggerThanLimits()){


    console.log(event.target);

    let icon = event.target.getElementsByClassName("icon-wrapper")[0].getElementsByClassName("icon")[0];
    let content = event.target.getElementsByClassName("content")[0];


    icon.classList.toggle("invisible");
    content.classList.toggle("invisible");
    event.target.classList.toggle("tall");
    event.target.scrollIntoView({block:"start", behavior:"smooth"});
    
        
    }
   
    
   }

    
function manipulateClass(addOrRemove,className,element,exception){


    let elementsArray= Array.from(document.querySelectorAll(element));

    elementsArray.forEach((element)=>{

        if(element.classList.contains(exception)){
            return
        }
        else{
            addOrRemove(className,element)
        }

    })


}




function addClass(className,element){
    if(!element.classList.contains(className)){
        element.classList.add(className);

    }else{
        return;
    }
}

function removeClass(className,element){
   
    if(element.classList.contains(className)){
        element.classList.remove(className);

    }else{
        return;
    }
}
    



function hideIcons(event){


    manipulateClass(addClass,"invisible",".icon","intro-icon")


}

function hideContent(){

    manipulateClass(addClass,"invisible",".content")

}

function showIcons(){

    manipulateClass(removeClass,"invisible",".icon")
}

function showContent(){

    manipulateClass(removeClass,"invisible",".content")
}




