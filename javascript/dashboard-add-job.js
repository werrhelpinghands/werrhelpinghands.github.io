function checkval(){
  let title = document.getElementById("title").value;//
  let category = document.getElementById("category").value;//
  let type = document.getElementById("type").value;//
  type = document.getElementById("type").options[type].text
  let tags = document.getElementById("tags").value;//
  let company = document.getElementById("company").value;//
  let website = document.getElementById("website").value;//
  let location = document.getElementById("location").value;//
  let closingDate = document.getElementById("closingDate").value;//
  let logo = document.getElementById("inputlogo").files[0];//
  let notification = document.getElementById("notification").files[0];//

if (title.trim() != ""){

if (category.trim() != ""){

  if(type.trim() != ""){

    if(tags.trim() != ""){

      if(company.trim() != ""){

        if(website.trim() != ""){

          if(location.trim() != ""){

            if(closingDate.trim() != ""){


                
              addJob()

                


              

            }else{
              
  alert("closing date cannot empty");
  document.getElementById("closingDate").style.border="2px solid red";
              return false;
            }

          }else{
            
  alert("location cannot empty");
  document.getElementById("location").style.border="2px solid red";
          return false;  
        }


        }else{

          alert("website cannot empty");
          document.getElementById("website").style.border="2px solid red";
          return false;

        }


      }else{
    
  alert("company cannot empty");
  document.getElementById("company").style.border="2px solid red";
        return false;


      }

    }else{
      
      alert("tags cannot empty");
      document.getElementById("tags").style.border="2px solid red";
      return false;
    }


  }else{
    
  alert("type cannot empty");
  document.getElementById("type").style.border="2px solid red";
    return false;
  }

}else{

  alert("category cannot be empty");
  document.getElementById("category").style.border="2px solid red";
  return false;
}

}else{
  
  alert("title is empty");
  document.getElementById("title").style.border="2px solid red";
  return false;
}


}






async function addJob() {

  document.getElementById('postBtn').innerHTML = `Loading...`
  document.getElementById('postBtn').disabled = true

  let title = document.getElementById("title").value;
  let category = document.getElementById("category").value;
  category = document.getElementById("category").options[category].text
  let type = document.getElementById("type").value;
  type = document.getElementById("type").options[type].text
  let tags = document.getElementById("tags").value;
  let company = document.getElementById("company").value;
  let website = document.getElementById("website").value;
  let about = document.getElementById("about").value;
  let roles = document.getElementById("roles").value;
  let skills = document.getElementById("skills").value;
  let location = document.getElementById("location").value;
  let available = document.getElementById("available").value;
  let duration = document.getElementById("duration").value;
  let closingDate = document.getElementById("closingDate").value;
  let pay = document.getElementById("pay").value;
  let url = document.getElementById("url").value;
  let portal = document.getElementById("portal").value;
  let logo = document.getElementById("inputlogo").files[0];
  let notification = document.getElementById("notification").files[0];

  const formBody = new FormData();

  formBody.set("title", title);
  formBody.set("category", category);
  formBody.set("type", type);
  formBody.set("tags", tags);
  formBody.set("company", company);
  formBody.set("website", website);
  formBody.set("about", about);
  formBody.set("roles", roles);
  formBody.set("skills", skills);
  formBody.set("location", location);
  formBody.set("available", available);
  formBody.set("duration", duration);
  formBody.set("expireAt", closingDate);
  formBody.set("pay", pay);
  formBody.set("url", url);
  formBody.set("portal", portal);
  formBody.append("file", logo);
  formBody.append("file", notification);

  await axios({
    url: "https://helpinghands-server.herokuapp.com/api/jobs/addJob",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${
        localStorage.getItem('token')
      }`,
    },
    data: formBody,
  }).then((res) => {
    title = "";
    category = "";
    type = "";
    tags = company = "";
    website = "";
    about = "";
    roles = "";
    skills = "";
    location = "";
    available = "";
    duration = "";
    closingDate = "";
    pay = "";
    url = "";
    portal = "";
    logo = "";
    notification = "";
    document.getElementById('postBtn').disabled = false
    window.location.assign(`/job-page.html?id=${res.data._id}`)
  });
}

function logout() {
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
  window.location.replace("/index_job_common.html");
}