/* =================================
   Sepehyar v1.0.2
   Application Engine
================================= */



// تبدیل عدد به فرمت بانکی

function formatNumber(value){

    if(value === "" || value === null){
        return "";
    }

    value = value.toString().replace(/,/g,'');

    if(isNaN(value)){
        return "";
    }

    return Number(value).toLocaleString('en-US');

}



// تبدیل به عدد واقعی

function cleanNumber(value){

    return Number(
        value.toString().replace(/,/g,'')
    ) || 0;

}



// نمایش ریال

function formatRial(value){

    return Number(value)
    .toLocaleString('fa-IR')
    + " ریال";

}





// فرمت خودکار هنگام تایپ

function enableNumberFormat(id){

    let input=document.getElementById(id);


    if(!input){
        return;
    }



    input.addEventListener("input",function(){


        let position=this.selectionStart;


        this.value=formatNumber(this.value);



        this.setSelectionRange(
            position,
            position
        );


    });


}





/* ===============================
   محاسبه تسهیلات
================================ */


function calculateLoan(){


    let average=

    cleanNumber(
        document.getElementById("average").value
    );



    let factor=

    Number(
        document.getElementById("factor").value
    );



    let months=

    Number(
        document.getElementById("months").value
    );



    let fee=

    Number(
        document.getElementById("fee").value
    );



    if(!average || !factor || !months){

        alert("لطفاً اطلاعات را کامل وارد کنید");

        return;

    }



    let loan=

    average * factor;



    let feeAmount=

    loan * fee /100;



    let total=

    loan + feeAmount;



    let installment=

    total / months;



    document.getElementById("loanResult").innerHTML=

    `
    مبلغ تسهیلات:
    <br>
    ${formatRial(loan)}

    <br><br>

    کارمزد:
    <br>
    ${formatRial(feeAmount)}

    <br><br>

    مبلغ کل بازپرداخت:
    <br>
    ${formatRial(total)}

    <br><br>

    قسط ماهانه:
    <br>
    ${formatRial(installment)}

    `;



    localStorage.lastLoan=loan;


    let count=

    Number(localStorage.calculateCount || 0)+1;


    localStorage.calculateCount=count;


}







/* ===============================
   مشتریان
================================ */



function getCustomers(){


    return JSON.parse(

        localStorage.customers || "[]"

    );


}




function addCustomer(){


    let name=

    document.getElementById("customerName").value;



    let phone=

    document.getElementById("customerPhone").value;



    let average=

    cleanNumber(

    document.getElementById("customerAverage").value

    );



    if(!name){

        alert("نام مشتری را وارد کنید");

        return;

    }



    let customers=getCustomers();



    customers.push({

        id:Date.now(),

        name:name,

        phone:phone,

        average:average

    });



    localStorage.customers=

    JSON.stringify(customers);



    alert("مشتری با موفقیت ثبت شد");



    document.getElementById("customerName").value="";

    document.getElementById("customerPhone").value="";

    document.getElementById("customerAverage").value="";



    showCustomers();


}







function showCustomers(){


    let box=

    document.getElementById("customerList");



    if(!box){
        return;
    }



    let customers=getCustomers();



    box.innerHTML="";



    if(customers.length===0){

        box.innerHTML=

        "<p class='empty'>مشتری ثبت نشده است</p>";

        return;

    }




    customers.forEach(c=>{


        box.innerHTML +=

        `

        <div class="customer-item">

        👤 <b>${c.name}</b>

        <br><br>

        📞 ${c.phone || "-"}

        <br>

        💰 ${formatRial(c.average)}

        <br><br>

        <button onclick="deleteCustomer(${c.id})">

        حذف مشتری

        </button>

        </div>

        `;


    });


}







function deleteCustomer(id){


    let customers=getCustomers();


    customers=

    customers.filter(c=>c.id!==id);



    localStorage.customers=

    JSON.stringify(customers);



    showCustomers();


}








function searchCustomers(){


    let text=

    document.getElementById("searchCustomer").value;



    let customers=getCustomers();



    let result=

    customers.filter(c=>

    c.name.includes(text)

    );



    let box=

    document.getElementById("customerList");



    if(!box){
        return;
    }



    box.innerHTML="";



    result.forEach(c=>{


        box.innerHTML +=

        `

        <div class="customer-item">

        👤 ${c.name}

        <br>

        📞 ${c.phone || "-"}

        </div>

        `;


    });


}






/* ===============================
   تنظیمات
================================ */


function saveSettings(){


localStorage.defaultFactor=

document.getElementById("defaultFactor").value;



localStorage.defaultMonths=

document.getElementById("defaultMonths").value;



localStorage.defaultFee=

document.getElementById("defaultFee").value;



document.getElementById("settingMessage").innerHTML=

"✅ تنظیمات ذخیره شد";



}








/* ===============================
   داشبورد
================================ */


function loadDashboard(){


let customers=getCustomers();



let customerCount=

document.getElementById("customerCount");



if(customerCount){

customerCount.innerHTML=

customers.length.toLocaleString('fa-IR');

}



let calculateCount=

document.getElementById("calculateCount");



if(calculateCount){

calculateCount.innerHTML=

Number(
localStorage.calculateCount || 0
)
.toLocaleString('fa-IR');

}



let lastLoan=

document.getElementById("lastLoan");



if(lastLoan){

lastLoan.innerHTML=

formatRial(
localStorage.lastLoan || 0
);

}



}







// اجرای اولیه


window.addEventListener("load",()=>{


enableNumberFormat("average");


enableNumberFormat("customerAverage");



showCustomers();



});