import api from '../../config';

const loginUser = (paramData) =>{

    api
    .post("api/login", paramData, {
      "Content-Type": "text/plain",
    })

    .then((response) => {

      return response.data;
      
    }).catch((error) => {

      if (error) {
        return error

      }
    });
}

export default loginUser;