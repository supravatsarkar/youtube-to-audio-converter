import React, { useState } from 'react';

const Home = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e);

        if (input) {
            const inputId = input;
            console.log(input);
            fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${inputId}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
                    "x-rapidapi-key": "42d5636d4amsha98816696790f3fp1930e0jsn59502490e46b"
                }
            })
                .then(res => res.json()
                )
                .then(data => {
                    console.log(data);
                    setResult(data);
                    // if (data.link && data.msg === 'success') {
                    //     setResult(data);
                    // } else {
                    //     setResult({});
                    // }
                })
                .catch(err => {
                    console.error(err);
                });


        } else {
            console.log('Please Enter Video ID');
        }
    }
    const inputField = (e) => {
        const inputId = e.target.value;
        // console.log('inputId', inputId);
        setInput(inputId);
    }

    const handleDownload = (link) => {
        fetch(`${link}`);
    }
    return (
        <div>
            <div className='container shadow mx-auto m-4 p-4'>
                <span class="badge bg-danger fs-1 rounded-pill">Youtube To Audio Converter</span>

                <form onSubmit={handleSubmit} className="w-50">
                    <div className="input-group mb-3 m-4">
                        <input type="text" className="form-control" placeholder="Enter Video Id" aria-label="Enter Video Id" aria-describedby="button-addon2" onChange={inputField} />
                        <button className="btn btn-danger" type="submit" id="button-addon2">Submit</button>
                    </div>
                </form>

                {
                    result.msg && <>
                        {
                            result.msg !== "success" ? <div className="alert alert-danger" role="alert">
                                {result.msg}
                            </div> : <div className="alert alert-success" role="alert">
                                <p>
                                    Title: {result.title}
                                </p>
                                <p>
                                    Duration: {((result.duration - (result.duration % 60)) / 60).toFixed(0)} Mint, {Math.round(result.duration % 60)} Sec
                                </p>
                            </div>
                        }
                    </>
                }

                {
                    result?.link ? <a href={result.link} type="button" className="btn btn-success" >Download</a> : <></>
                }

            </div>
        </div>
    );
};

export default Home;