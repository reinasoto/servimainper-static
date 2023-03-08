setTimeout(() => {
  console.log("Axios listening!")
}, 1000)

/* ------------------- Recursos Appointment --------------------- */

/* ---------- Post -----------*/
async function onClickButtonAppointment() {

  let select = document.getElementById("services");
  let option = select.options[select.selectedIndex];
  let optionV = option.value
  let dni = document.getElementById("dni").value;
  console.log(dni);
  let name = document.getElementById("name").value;
  console.log(name);
  let lastname = document.getElementById("lastname").value;
  console.log(lastname);
  let date = document.getElementById("date").value;
  console.log(date);
  let time = document.getElementById("time").value;
  console.log(time);
  let email = document.getElementById("email").value;
  console.log(email);


  const { data } = await axios.post('https://10.200.', document.getElementById('my-form'), {
    headers: {
      'Content-Type': 'application/json'
    }
  })

}




/* ---------- End Post -----------*/
/* ------------------- End Recursos Appointment --------------------- */






/* ------------------- Recursos Contact  --------------------- */

/* ---------- Post -----------*/

async function onClickButtonContact() {


  let name = document.getElementById("name").value;
  console.log(name);
  let message= document.getElementById("message").value;
  console.log(message);
  let email = document.getElementById("email").value;
  console.log(email);

  const { data } = await axios.post('http://10.200.38.137:5000/api/client/mail', {
    "name": name,
    "message": message,
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
      title: data.message
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
      title: data.message
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
  console.log(dni);
  let amount= document.getElementById("amount").value;
  console.log(amount);
  let confirmationNumber = document.getElementById("confirmationNumber").value;
  console.log(confirmationNumber);
  let File = document.getElementById("image").files;
  console.log(File);

  try {
   
    /*disableButton();*/
    if (dni !== '' && amount !== '' && confirmationNumber !== '') {
        const userExist = await axios.get(`http://10.200.38.137:5000/api/client/byDNI?dni=${dni}`);
        if (userExist.data.ok) {
            const filess = File;
            const data = new FormData();
            data.append("file", filess[0]);
            data.append("upload_preset", "equaldata");
            const res = await fetch("https://api.cloudinary.com/v1_1/dlvlxxe5t/upload", {
                method: "POST",
                body: data
            })
            if (res.ok) {
                const file = await res.json();
                console.log(file.secure_url);
                amount = amount.replace(/\n/g, '<br />');
                axios.post('http://10.200.38.137:5000/api//payment/create',
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
                      console.log('An error has occurred, please check the fields and try again.');
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
                    console.log(err);
                    console.log('An error has occurred, please try again later.');
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
              console.log('An error occurred while trying to upload the image, please check the image and try again.');
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
          console.log('You are not registered, please contact the service administrator.');
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
      console.log('Please fill in all fields.');
    }
    
} catch (e) {
    
   console.log(e);
   console.log('An error has occurred, please try again later.');
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