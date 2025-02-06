import React, {useState} from 'react'

const GrievanceForm = () => {
    const [statement, setStatement] = useState("");
    const [department, setDepartment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://0.0.0.0:8000/predict/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({statement}),
        });

        const data = await response.json();
        setDepartment(data.department);
    }
    
  return (
    <div>
      <div>
            <h2>Public Grievance Classifier</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    placeholder="Enter grievance statement"
                    required
                />
                <button type="submit">Classify</button>
            </form>
            {department && <h3>Predicted Department: {department}</h3>}
        </div>
    </div>
  )
}

export default GrievanceForm
