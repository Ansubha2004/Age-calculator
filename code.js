let inputs=document.querySelectorAll(".date input");
let button=document.querySelector("#button");
let displays=document.querySelectorAll("h1 span")
let dd="xx",mm="xx",yy="xxxx";
const input1=(val)=>{
    if(isNaN(val)==false)
    {
        if(val>=1 && val<=31)
        {
            errorfree(inputs[0]);
            dd=val;
            return true;
        }
        error(inputs[0]);
        return false;
    }
    error(inputs[0]);
    return false;
};
const input2=(val)=>{
    if(isNaN(val)==false)
    {
        if(val>=1 && val<=12)
        {
            errorfree(inputs[1]);
            mm=val;
            return true;
        }
        error(inputs[1]);
        return false;
    }
    error(inputs[1]);
    return false;
};
const input3=(val)=>{
    let l=val.length;
    if(isNaN(val)==false)
    {
        if(l==4 && val>=1950)
        {
            errorfree(inputs[2]);
            yy=val;
            return true;
        }
        error(inputs[2]);
        return false;
    }
    error(inputs[2]);
    return false;
}
const error=(input)=>{
    input.value="";
    input.previousElementSibling.setAttribute("style","color:red;");
    input.setAttribute("class","redborder");
    input.nextElementSibling.setAttribute("style","");
    for(let disp of displays)
        disp.innerText="--";
}
const errorfree=(input)=>{
    input.previousElementSibling.setAttribute("style","");
    input.setAttribute("class","");
    input.nextElementSibling.setAttribute("style","visibility:hidden");
}
let mdays=[31,28,31,30,31,30,31,31,30,31,30,31];
const compatibility=()=>{
    
    if(isNaN(dd)==false && isNaN(mm)==false)
    {
        if(dd<=mdays[mm-1])
        {
            errorfree(inputs[0]);
            errorfree(inputs[1]);
            return true;
        }
        error(inputs[0]);
        error(inputs[1]);
        return false;
    }
    error(inputs[0]);
    error(inputs[1]);
    return false;
}
const now=new Date();
let pday=now.getDate();
let pmonth=now.getMonth()+1;
let pyear=now.getFullYear();
const datevalidity=()=>{
    if(yy>pyear)
        return false;
    else if(yy<pyear)
        return true;
    else
    {
        if(mm>pmonth)
            return false;
        else if(mm<pmonth)
            return true;
        else
        {
            if(dd>=pday)
                return false;
            else
            return true;
        }
    }
}
const calculateage=()=>{
    let d,m,y;
    y=pyear-yy;
    if(mm<=pmonth)
        m=pmonth-mm;
    else
    {
        m=12-(mm-pmonth);
        y--;
    }
    if(dd<=pday)
        d=pday-dd;
    else
    {
        m--;
        d=30-(dd-pday);
    }
    display(y,m,d);
}
const display=(y,m,d)=>{
    displays[0].innerText=y;
    displays[1].innerText=m;
    displays[2].innerText=d;
}
button.addEventListener("click",()=>{
    let check=[input1(inputs[0].value),input2(inputs[1].value),compatibility(),input3(inputs[2].value)];
    let k=0;
    for(let c of check)
    {
        if(c!=true)
        {
            k=1;
            break;
        }
    }
    if(k==0)
    {
        if(datevalidity()==true)
        calculateage();
        else
        {
            setTimeout(()=>{
            let popup=confirm("The input date is beyond the current date!\n1.Press OK for refresh\n2.Press Cancel to exit");
            if(popup==true)
                location.href="http://127.0.0.1:5500/age-calculator/index.html";
            else
            location.href="https://www.google.co.in";},"500");
        }
    }

});