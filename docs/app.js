

function rial(num){

return Number(num)
.toLocaleString('fa-IR')
+
" ریال";

}



function average(){


let total =
Number(
document.getElementById("total").value
);


let days =
Number(
document.getElementById("days").value
);



if(days<=0){

alert("تعداد روز را وارد کنید");
return;

}



let result =
total / days;



document.getElementById("avgResult")
.innerHTML =
"معدل حساب: "
+
rial(result);


}




function loan(){


let avg =
Number(
document.getElementById("avg").value
);


let factor =
Number(
document.getElementById("factor").value
);


let months =
Number(
document.getElementById("months").value
);



let amount =
avg * factor;



let installment =
amount / months;



document.getElementById("loanResult")
.innerHTML =

"مبلغ تسهیلات: "
+
rial(amount)

+
"<br><br>"

+
"قسط ماهانه تقریبی: "
+
rial(installment);


}