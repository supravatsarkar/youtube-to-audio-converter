import React, { useState } from 'react';

const Home = () => {
    const [inputUrl, setInput] = useState('');
    const [result, setResult] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e);

        if (inputUrl) {
            console.log('inputUrl:- ', inputUrl);
            const urlArray = inputUrl.split("=");
            const videoId = urlArray[1];
            console.log('videoId:-', videoId);
            // console.log('host-', process.env.REACT_APP_RAPID_API_HOST)
            // console.log('key-', process.env.REACT_APP_API_KEY)


            fetch(`http://localhost:5000/getYoutubeToAudio`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ videoId })
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
                <span className="badge bg-danger fs-1 rounded-pill">Youtube To Audio Converter</span>

                <form onSubmit={handleSubmit} className="w-75 mx-auto">
                    <div className="input-group mb-3 m-4">
                        <input type="text" className="form-control border border-danger" placeholder="Paste Youtube Video Link Here" aria-label="Enter Youtube Video Link Here" aria-describedby="button-addon2" onChange={inputField} />
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
                    result?.link ? <a href={result.link} type="button" className="btn btn-danger" >Download</a> : <></>
                }

            </div>
        </div>
    );
};

export default Home;