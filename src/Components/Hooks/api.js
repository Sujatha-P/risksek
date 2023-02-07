export function loadUser(setPostdata, setTempUsers) {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((data) => {
        setPostdata(data);
        setTempUsers(data);
       
       
      }).catch((error) =>{
        console.log("error Occured"+error)

      });
  }