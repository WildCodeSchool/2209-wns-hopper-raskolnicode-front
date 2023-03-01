// import FormSign from "../../components/FormSign/FormSign";

// import React from 'react'



// export default function Logintest() {

//   const [email, setEmail] = useState("test@mail.com");
//   const [password, setPassword] = useState("test1234");


//   const [doSignInMutation, { data, loading, error }] = useMutation(LOGIN);

//   async function doSignIn(e: any) {
//     e.preventDefault()
//     try {
//       const result = await doSignInMutation({
//         variables: {
//           data: {
//             email,
//             password,
//           },
//         },
//       });
//       if (result.data) {
//         props.onTokenChange(result.data.login);
//         navigate("/");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }


//   return (
//         <>
//             <FormSign 
//             title="Login"  
//             alternativeOption="Vous avez oublié votre mot de passe ?" 
//             signAction="Se connecter"
//             onSign={() => {}}
//             onTokenChange={onTokenChange}
//              />
//         </>
//   )
// }
