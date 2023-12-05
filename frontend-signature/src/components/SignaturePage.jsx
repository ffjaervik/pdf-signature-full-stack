/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SignaturePage() {
  const canvasRef = useRef(null);
  const { pdfUrl } = useParams();
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);

  const handleClear = () => {
      canvasRef.current.clear();
  };

  const handleSave = async () => {
    const signatureDataUrl = canvasRef.current.toDataURL();

    try {
        // Send the signature data to the backend
        const response = await axios.post('http://localhost:3001/save-signature', { signatureDataUrl });

        // Display the new PDF in the iframe
        const iframe = document.getElementById('pdf-viewer');
        iframe.src = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        
        // Clear the signature canvas
        canvasRef.current.clear();
        setIsSignatureEmpty(true);
    } catch (error) {
        console.error('Error saving signature:', error);
    }
};

  return (
      <div>
          <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="600px" style={{ border: 'none' }} />
          <button onClick={handleClear} disabled={isSignatureEmpty}>
              Clear
          </button>
          <button onClick={handleSave} disabled={isSignatureEmpty}>
              Save
          </button>

          <SignatureCanvas
              ref={canvasRef}
              penColor="blue"
              canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'sigCanvas'
              }}
              onBegin={() => setIsSignatureEmpty(false)}
              onEnd={() => setIsSignatureEmpty(canvasRef.current.isEmpty())}
          ></SignatureCanvas>
      </div>
  );
}

export default SignaturePage;