setTimeout(() => {
  console.log("Axios listening.")
}, 1000)

/* ------------------- Recursos Appointment --------------------- */

/* ---------- Post -----------*/
async function onClickButtonAppointment() {

  let select1 = document.getElementById("services");
  let option1 = select1.options[select1.selectedIndex];
  let service1 = option1.value;
  

  let serviceSelected = document.getElementById(service1);
  let serviceSelected2 = serviceSelected.options[serviceSelected.selectedIndex];
  let serviceSelected3 = serviceSelected2.value;
 // console.log(serviceSelected3); 

  service = service1 +" - "+ serviceSelected3;
 // console.log(service);

  let dni = document.getElementById("dni").value;
  //console.log(dni);
  let name = document.getElementById("name").value;
  //console.log(name);
  let phone = document.getElementById("phone").value;
 // console.log(phone);
  let date = document.getElementById("date").value;
  //console.log(date);
  let time = document.getElementById("time").value;
 // console.log(time);
  let email = document.getElementById("email").value;
 // console.log(email);


   const {data} = await axios.post('https://servimainper-back-production.up.railway.app/api/client/appointment', {
    "service": service,
    "dni": dni,
    "name": name,
    "phone": phone,
    "date": date,
    "time": time,
    "email": email
  });

  if(data.ok == false){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'A problem has occurred, please check the fields and try again!'
    })
  }
  else{
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'The message has been successfully sent!'
    })
  }
  //console.log(data); 

}




/* ---------- End Post -----------*/
/* ------------------- End Recursos Appointment --------------------- */






/* ------------------- Recursos Contact  --------------------- */

/* ---------- Post -----------*/

async function onClickButtonContact() {


  let name = document.getElementById("name").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let message= document.getElementById("message").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;


  const { data } = await axios.post('https://servimainper-back-production.up.railway.app/api/client/mail', {
    "name": name,
    "lastname": lastname,
    "message": message,
    "email": email,
    "phone": phone,
    "address": address
  });
  
  if(data.ok == false){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'A problem occurred, please try again!'
    })

    console.log(data);
  }
  else{
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'The message has been successfully sent!'
    })
  }
  console.log(data);

}



/* ------------------- End Recursos Contact  --------------------- */

/* ---------- End Post -----------*/ 







/* ------------------- Recursos Payment  --------------------- */

/* ---------- Post -----------*/
  
async function onClickButtonPayment() {

  let dni = document.getElementById("dni").value;
  //console.log(dni);
  let amount= document.getElementById("amount").value;
  //console.log(amount);
  let confirmationNumber = document.getElementById("confirmationNumber").value;
  //console.log(confirmationNumber);
  let File = document.getElementById("image").files;
  //console.log(File);

  try {
   
    /*disableButton();*/
    if (dni !== '' && amount !== '' && confirmationNumber !== '') {
        const userExist = await axios.get(`https://servimainper-back-production.up.railway.app/api/client/byDNI?dni=${dni}`);
        if (userExist.data.ok) {
            const filess = File;
            const data = new FormData();
            data.append("file", filess[0]);
            data.append("upload_preset", "servimainper");
            const res = await fetch("https://api.cloudinary.com/v1_1/dajbxn57j/upload", {
                method: "POST",
                body: data
            })
            if (res.ok) {
                const file = await res.json();
                //console.log(file.secure_url);
                amount = amount.replace(/\n/g, '<br />');
                axios.post('https://servimainper-back-production.up.railway.app/api/payment/create',
                    {
                        idClient: userExist.data.data.idClient,
                        amount,
                        billImage: file.secure_url,
                        confirmationNumber
                    }
                ).then(res => {
                    if (res.data.ok) {
                      const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'success',
                        title: 'The payment report was successfully completed!'
                      })
                    } else {
                      const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: 'An error has occurred, please check the fields and try again.'
                      })
                      //console.log('An error has occurred, please check the fields and try again.');
                    }
                }).catch(err => {
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 4000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: 'An error has occurred,  please try again later.'
                    })
                    //console.log(err);
                    //console.log('An error has occurred, please try again later.');
                })
            } else {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'info',
                title: 'An error occurred while trying to upload the image, please check the image and try again.'
              })
              //console.log('An error occurred while trying to upload the image, please check the image and try again.');
            }
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'info',
            title: 'You are not registered, please contact the service administrator.'
          })
          //console.log('You are not registered, please contact the service administrator.');
        }
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'info',
        title: 'Please fill in all fields.'
      })
      //console.log('Please fill in all fields.');
    }
    
} catch (e) {
    
  // console.log(e);
  // console.log('An error has occurred, please try again later.');
   const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'info',
    title: 'An error has occurred, please try again later.'
  })
   
}


}


/* ------------------- End Recursos Payment  --------------------- */

/* ---------- End Post -----------*/ 