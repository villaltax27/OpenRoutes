const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");


if(togglePassword){

    togglePassword.addEventListener("click",()=>{

        if(passwordInput.type === "password"){

            passwordInput.type = "text";

            togglePassword.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';

        }else{

            passwordInput.type = "password";

            togglePassword.innerHTML =
            '<i class="fa-solid fa-eye"></i>';

        }

    });

}



/*==========================
SHOW / HIDE CONFIRM PASSWORD
==========================*/


const toggleConfirmPassword = 
document.getElementById("toggleConfirmPassword");


const confirmPasswordInput =
document.getElementById("confirmPassword");



if(toggleConfirmPassword){

    toggleConfirmPassword.addEventListener("click",()=>{


        if(confirmPasswordInput.type === "password"){


            confirmPasswordInput.type="text";


            toggleConfirmPassword.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';


        }else{


            confirmPasswordInput.type="password";


            toggleConfirmPassword.innerHTML =
            '<i class="fa-solid fa-eye"></i>';


        }


    });

}





/*==========================
REGISTER FORM
==========================*/


const registerForm =
document.getElementById("registerForm");


const registerMessage =
document.getElementById("registerMessage");




registerForm.addEventListener("submit",(e)=>{


    e.preventDefault();



    const name =
    document.getElementById("name").value.trim();



    const email =
    document.getElementById("email").value.trim();



    const password =
    document.getElementById("password").value;



    const confirmPassword =
    document.getElementById("confirmPassword").value;



    const terms =
    document.getElementById("terms").checked;





    /*==========================
    VALIDATIONS
    ==========================*/


    if(name === ""){


        showMessage(
            "Please enter your full name.",
            "error"
        );

        return;

    }




    if(password.length < 8){


        showMessage(
            "Password must contain at least 8 characters.",
            "error"
        );

        return;

    }





    if(password !== confirmPassword){


        showMessage(
            "Passwords do not match.",
            "error"
        );

        return;

    }





    if(!terms){


        showMessage(
            "You must accept the Terms & Conditions.",
            "error"
        );

        return;

    }






    /*==========================
    SAVE USER
    ==========================*/


    localStorage.setItem(
        "userName",
        name
    );


    localStorage.setItem(
        "userEmail",
        email
    );


    localStorage.setItem(
        "isLogged",
        "true"
    );





    /*==========================
    SUCCESS
    ==========================*/


    showMessage(
        "Account created successfully!",
        "success"
    );



    registerForm.reset();





    /*==========================
    REDIRECT HOME
    ==========================*/


    setTimeout(()=>{


        window.location.href="index.html";


    },1500);



});







/*==========================
MESSAGE FUNCTION
==========================*/


function showMessage(message,type){


    registerMessage.textContent = message;


    registerMessage.className = type;



    setTimeout(()=>{


        registerMessage.textContent="";


        registerMessage.className="";


    },4000);


}
