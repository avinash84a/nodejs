
export function isEmpty(variable)
{
    
    if(typeof variable == 'undefined' || variable == ''  || variable == null || Object.keys(variable).length == 0)
    {
        return true; 
    }
    else
    {
        return false; 
    }
}

export function dateFormatShow (date){

    return date.getYear + "-"+date.getMonth 
    
}