/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GeneratePdfButton(data) {
    const navigate = useNavigate();
    // console.log(data)

    const handleGeneratePdf = () => {
        axios
            .get('http://localhost:3001/get-pdf', { responseType: 'blob' })
            .then((response) => {
              console.log("RESPONSE GET-PDF: ", response)
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                console.log(pdfUrl);
                navigate(`/sign-pdf/${encodeURIComponent(pdfUrl)}`);
            })
            .catch((error) => console.error('Error generating PDF:', error));
    };

    return (
        <div>
            <button onClick={() => handleGeneratePdf(data)}>Generate PDF</button>
        </div>
    );
}

export default GeneratePdfButton;
