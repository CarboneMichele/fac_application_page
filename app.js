const WINDOW_DIMENSION_LIMITS={

    width:950,
    height:610,
    checkIfBiggerThanLimits:function (){
               
        
        
        let width = window.innerWidth;
        let height= window.innerHeight;
        let widthLimit= this.width;
        let heightLimit=this.height;
            
        return height > heightLimit && width > widthLimit;
    
        
     
        
    }
  
}



const MODAL = {

    overlay: document.getElementsByClassName("modal-overlay")[0],

    closingIcon: document.getElementsByClassName("closing-icon")[0].children[0],

    hasBeenDisplayedOnce: false,

    defineModalDisplay: function (){
       
        WINDOW_DIMENSION_LIMITS.checkIfBiggerThanLimits() ? this.showModal() : this.hideModal();
    },

    hideModal: function(){

        if(!this.overlay.classList.contains("modal-off")){

            (document.querySelectorAll(".modal-box")[0].classList.toggle("slide-in"))

            let slideOut=setTimeout(function(){MODAL.overlay.classList.add("modal-off")
            
            if(MODAL.overlay.classList.contains("modal-on")){
                MODAL.overlay.classList.remove("modal-on")
            }},300)
            

            
          


        }



    },

    showModal: function(){
       
        
        if(!this.overlay.classList.contains("modal-on")){

                this.overlay.classList.add("modal-on")

                if(this.overlay.classList.contains("modal-off")){
                    this.overlay.classList.remove("modal-off")
                }

                
                let slideIn = setTimeout(function(){
                    (document.querySelectorAll(".modal-box")[0].classList.toggle("slide-in"))

                },50)


        }
        


    },

    modalDisplayOnResize: function (){

        if(!WINDOW_DIMENSION_LIMITS.checkIfBiggerThanLimits()){


            this.hideModal();


        }
    },

    hideModalOnScreenClick: function(event){
   
        if(event.target === document.getElementsByClassName("modal-overlay")[0]){
            
               

            if(this.overlay.classList.contains("modal-on")){
                this.hideModal();
            }

        
        }

    }
    

}

window.addEventListener("load",  MODAL.defineModalDisplay.bind(MODAL));
window.addEventListener("resize",  MODAL.modalDisplayOnResize.bind(MODAL));
window.addEventListener("click", MODAL.hideModalOnScreenClick.bind(MODAL));

MODAL.closingIcon.addEventListener("click",function(){
   MODAL.hideModal();
});


function showHideElements(event){


    if(!WINDOW_DIMENSION_LIMITS.checkIfBiggerThanLimits()){
        
        if(document.querySelectorAll(".tall").length >0){
            return;
        }

        if(document.querySelectorAll(".expanded-major").length >0){
            
            manipulateClass(removeClass,"expanded-major",".expanded-major")
          
            hideContent();

        }


        else{
            hideIcons();
            hideContent();
        }

        
    }

    else{

        if(document.querySelectorAll(".tall").length >0){
            
            manipulateClass(removeClass,"tall",".tall")
            manipulateClass(addClass,"invisible",".content");

        }
        else{
            showIcons();

        }

    


        


        
        
    
            

        

    }
}


window.addEventListener("resize",showHideElements)



let sections= document.querySelectorAll("section");


sections.forEach((section)=> { 
    
    if(section.classList.contains("intro") || section.classList.contains("contacts")){
        return;
    }
    else{
        
        section.addEventListener("click",expandSectionDesktop);
        section.addEventListener("click", expandSectionMobile)
    }
            
  
 });


    
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

    manipulateClass(addClass,"invisible",".content", "intro-content")

}

function showIcons(){

    manipulateClass(removeClass,"invisible",".icon")
}

function showContent(){

    manipulateClass(removeClass,"invisible",".content")
}



function setInvisibleClass(){


    if(!WINDOW_DIMENSION_LIMITS.checkIfBiggerThanLimits()){
        hideContent();
        hideIcons();
    }
    else{
        hideContent()
    }


}

document.addEventListener("DOMContentLoaded", setInvisibleClass);


function expandSectionMobile(){


    if(!WINDOW_DIMENSION_LIMITS.checkIfBiggerThanLimits()){
            

    let icon = event.target.getElementsByClassName("icon-wrapper")[0].getElementsByClassName("icon")[0];
    let content = event.target.getElementsByClassName("content")[0];


    icon.classList.toggle("invisible");
    content.classList.toggle("invisible");
    event.target.classList.toggle("tall");
    event.target.scrollIntoView({block:"start", behavior:"smooth"});
    }




}



function expandSectionDesktop(){

    if(WINDOW_DIMENSION_LIMITS.checkIfBiggerThanLimits()){
 
        let content = event.target.getElementsByClassName("content")[0];
        event.target.classList.toggle("expanded-major")
        content.classList.toggle("invisible");
    }

}


window.addEventListener("load", centerIntro);

function centerIntro(event){

    if(!WINDOW_DIMENSION_LIMITS.checkIfBiggerThanLimits()){

      

        document.getElementsByClassName("intro")[0].scrollIntoView({block:"center", behavior:"smooth"})
    }
}




function calcVH() {
    let vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    document.getElementsByClassName("intro")[0].setAttribute("style", "height:" + vH + "px;");
  }
  calcVH();
  
  window.addEventListener('onorientationchange', calcVH, true);
  window.addEventListener('load', calcVH, true);


