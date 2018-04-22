
export const  Utils ={

     isEmpty:(variable)=>{

        if(typeof variable == 'undefined' || variable == ''  || variable == null || Object.keys(variable).length == 0)
        {
            return true; 
        }
        else
        {
            return false; 
        }
    }
}; 