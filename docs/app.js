/* =================================
   سپه‌یار - Application Engine
   Version 1.0
================================= */


/* تبدیل عدد به ریال فارسی */

function formatRial(value){

    if(!value || isNaN(value)){
        return "۰ ریال";
    }

    return Number(value)
    .toLocaleString('fa-IR')
    + " ریال";

}



/* ================================
   محاسبه تسهیلات
================================ */


function calculateLoan(){


    let average =
    Number(
        document.getElementById("average").value
    );


    let factor =
    Number(
        document.getElementById("factor").value
    );


    let months =
    Number(
        document.getElementById("months").value
    );


    let fee =
    Number(
        document.getElementById("fee").value
    );



    if(!average || !factor || !months){

        alert("لطفاً اطلاعات را کامل وارد کنید");

        return;

    }



    let loanAmount =
    average * factor;



    let feeAmount =
    loanAmount * (fee / 100);



    let totalAmount =
    loanAmount + feeAmount;



    let installment =
    totalAmount / months;



    let result =

    `
    مبلغ تسهیلات:
    <br>
    <b>${formatRial(loanAmount)}</b>

    <br><br>

    کارمزد:
    <br>
    <b>${formatRial(feeAmount)}</b>

    <br><br>

    مبلغ کل بازپرداخت:
    <br>
    <b>${formatRial(totalAmount)}</b>

    <br><br>

    قسط ماهانه:
    <br>
    <b>${formatRial(installment)}</b>

    `;



    document.getElementById("loanResult")
    .innerHTML=result;



    saveCalculation(loanAmount);



}




/* ================================
 ذخیره آخرین محاسبات
================================ */


function saveCalculation(amount){


    let count =
    Number(
        localStorage.calculateCount || 0
    );


    count++;


    localStorage.calculateCount=count;


    localStorage.lastLoan=amount;


}




/* ================================
 مشتریان
================================ */



function getCustomers(){


    return JSON.parse(

        localStorage.customers || "[]"

    );

}





function addCustomer(){


    let name =
    document.getElementById("customerName").value;


    let phone =
    document.getElementById("customerPhone").value;


    let average =
    document.getElementById("customerAverage").value;



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



    localStorage.customers =
    JSON.stringify(customers);



    alert("مشتری ثبت شد");



    document.getElementById("customerName").value="";

    document.getElementById("customerPhone").value="";

    document.getElementById("customerAverage").value="";



    showCustomers();


}




function showCustomers(){


    let box =
    document.getElementById("customerList");



    if(!box){

        return;

    }



    let customers=getCustomers();



    box.innerHTML="";



    if(customers.length===0){

        box.innerHTML=
        "<p>مشتری ثبت نشده است</p>";

        return;

    }



    customers.forEach(customer=>{


        box.innerHTML +=

        `

        <div class="card">

        <b>${customer.name}</b>

        <br>

        📞 ${customer.phone}

        <br>

        💰 ${formatRial(customer.average)}

        <br><br>

        <button onclick="deleteCustomer(${customer.id})">

        حذف

        </button>

        </div>

        `;



    });



}




function deleteCustomer(id){


    let customers=getCustomers();


    customers =
    customers.filter(

        c=>c.id!==id

    );



    localStorage.customers =
    JSON.stringify(customers);



    showCustomers();


}





function searchCustomers(){


    let text =

    document
    .getElementById("searchCustomer")
    .value;



    let customers=getCustomers();



    let result =
    customers.filter(c=>

        c.name.includes(text)

    );



    let box =
    document.getElementById("customerList");



    box.innerHTML="";



    result.forEach(c=>{


        box.innerHTML +=

        `

        <div class="card">

        <b>${c.name}</b>

        <br>

        📞 ${c.phone}

        </div>

        `;


    });


}




/* ================================
 تنظیمات
================================ */


function saveSettings(){


    localStorage.defaultFactor =

    document.getElementById("defaultFactor").value;



    localStorage.defaultMonths =

    document.getElementById("defaultMonths").value;



    localStorage.defaultFee =

    document.getElementById("defaultFee").value;



    document.getElementById("settingMessage")

    .innerHTML=

    "✅ تنظیمات ذخیره شد";


}




/*