import getUser from "../services/getUser.js";
//-----------------------Variables y constantes-----------------------------------
const formLogin = document.querySelector(".main__form");




//-------------------------Funciones  -------------------------------------------------------------
const validateForm = () => {
    const formData = [];
    let emptyField = "";
    const inputs = Array.from(document.querySelectorAll("input"));
    const labels = Array.from(document.querySelectorAll("label"));
    inputs.forEach(item => {
        if (item.id) {
            formData[item.id] = item.value;

        }
    });
    for (const key in formData) {
        if (!formData[key]) {
            const label = labels.find(item => item.getAttribute('for') === key);
            const labelInnerText = label.innerText.substring(0, label.innerText.length - 1);
            emptyField += `${labelInnerText}`;


        }
    }
    if (emptyField) {
        return {
            data: {},
            message: `Campos vacíos: ${emptyField} `
        }
    } else {
        return {
            data: formData,
            message: ""
        }
    }
}

const submitLogin = () => {
    const userLogin = validateForm();
    if (userLogin.message) {
        Swal.fire(
            'Oops!',
            userLogin.message,
            'error'
        )
    } else {
        const user = await getUser(userLogin.data.userName, userLogin.data.password);
        if (user.length) {
            Swal.fire(
                'Excelente!',
                `${user[0].name} has iniciado sesión`,
                'success'
            ).then(() => {
                sessionStorage.setItem("user", JSON.stringify(user[0]))
                window.location = "./panelAdmin.html"
            })
        }
    }else {
        Swal.fire(
            'Oops!',
            'datos incorrectos',
            'error'
        ).then(() => {
            formLogin.reset();
        })
    }
}

//-----------------------------Ejecución---------------------------------------------------------------
formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    submitLogin();
})