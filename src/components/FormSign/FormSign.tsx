// import { useMutation, useQuery } from "@apollo/client";
// import { useState } from "react";
// import styles from "./formSign.module.scss"
// import { LOGIN } from "../../graphql/mutations";
// // import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";



// import { ISign } from "../../interfaces";

  


// const FormSign = (props: ISign) : JSX.Element => {

//   const navigate = useNavigate();


//   const [email, setEmail] = useState("test@mail.com");
//   const [password, setPassword] = useState("test1234");



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

//   const [doSignupMutation, { data, loading, error }] = useMutation(CREATE_USER);

//   async function doSignup(e: any) {
//     try {
//       e.preventDefault()
//       await doSignupMutation({
//         variables: {
//           data: {
//             email,
//             password,
//           },
//         },
//       });
//       setEmail("");
//       setPassword("");
//     } catch {}
//   }




//   return (
//     <main className={styles.signMain}>

//       {/* {error && (
//         <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
//       )} */}
//       <div className={styles.form}>
//         <h3>{props.title}</h3>
//         {/* {
//           adminData?.hasSuperAdmin?
//             <>
//               <p className="text-center text-danger">{props.adminFirstMessage}</p>
//               <p className="text-center">{props.adminSecondMessage}</p>
//             </>
//             : */}
//             <>
//               <div className={styles.email}>
//                 <input
//                   disabled={loading}
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Votre email"
//                 />
//               </div>
//               <div className={styles.password}>
//                 <input
//                   disabled={loading}
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Votre mot de passe"
//                 />
//               </div>
//               <div className={styles.buttonBox}>
//                 <button disabled={loading} onClick={doSignIn}>
//                   {props.signAction}
//                 </button>
//               </div>
//               <div>
//                 <p>
//                   {props.alternativeOption}
//                 </p>
//               </div>
//             </>
//         {/* } */}
//       </div>
//     </main>
//   );
// }

// export default FormSign