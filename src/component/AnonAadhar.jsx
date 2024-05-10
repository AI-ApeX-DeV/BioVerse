import React from 'react'
import {
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    AnonAadhaarProof,
  } from "@anon-aadhaar/react";

const AnonAadhar = () => {
    const [anonAadhaar] = useAnonAadhaar();

  React.useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);
  return (
    <div className='z-[100]'>
      <LogInWithAnonAadhaar   nullifierSeed={1234} />
      <p>{anonAadhaar?.status}</p>
      <div >
      {anonAadhaar?.status === "logged-in" && (
        <>
          <p>✅ Proof is valid</p>
          {/* <AnonAadhaarProof code={JSON.stringify(anonAadhaar.anonAadhaarProofs, null, 2)}/> */}
        </>
        )}
    </div>

    </div>
  )
}

export default AnonAadhar
