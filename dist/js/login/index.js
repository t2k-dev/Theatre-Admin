$(document).ready(function () {

})

function login() {
    getToken();
}

function getToken(){
    var data = {
        "phone" :"77775114002",
        "passCode":"3253"
    }

    $.ajax({
        url: BASE_URL + "user-service/api/v1/login",
        method: "POST",
        dataType: 'json',
        data: JSON.stringify(data),        
        success: function (response) {                        
            if (response.success === true) {
                alert('ok');
                localStorage.setItem("token", response.accessToken);
                window.location.href = "../index.html";
            }
        }
    })   
}