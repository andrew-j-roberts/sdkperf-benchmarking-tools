import React, { createContext, useContext, useState } from "react";

const CredentialsContext = createContext(null);

export function CredentialsProvider({ children }) {
  const [credentials, setCredentials] = useState({
    aws: {
      accessKey: "",
      secretKey: "",
      region: "us-east-1"
      // sshKeyName: ""
    }
  });
  return (
    <CredentialsContext.Provider
      value={{ credentials: credentials, setCredentials: setCredentials }}
    >
      {children}
    </CredentialsContext.Provider>
  );
}

export function useCredentials() {
  return useContext(CredentialsContext);
}
