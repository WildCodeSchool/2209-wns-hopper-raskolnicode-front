declare global {
    namespace NodeJS {
      interface ProcessEnv {
        REACT_APP_CLOUDNAME: string;     
      } 
    }
  }

  export {};
