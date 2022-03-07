import React, { useState } from 'react';

const Home = () => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e);

        if (input) {
            console.log(input);

        }
    }
    const inputField = (e) => {
        const inputId = e.target.value;
        // console.log('inputId', inputId);
        setInput(inputId);
    }
    return (
        <div>
            <div className='container'>
                <h2 className='text-danger'>Youtube To Audio Converter</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3 m-4">
                        <input type="text" className="form-control" placeholder="Enter Video Id" aria-label="Enter Video Id" aria-describedby="button-addon2" onChange={inputField} />
                        <button className="btn btn-danger" type="submit" id="button-addon2">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;