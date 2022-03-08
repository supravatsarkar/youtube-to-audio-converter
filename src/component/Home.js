import React, { useState } from 'react';

const Home = () => {
    const [inputUrl, setInput] = useState('');
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();
        // console.log(e);
        let videoId = '';
        if (inputUrl) {
            setIsLoading(true);
            console.log('inputUrl:- ', inputUrl);
            if (inputUrl.startsWith('https://www.youtu.be')) {
                const urlArray = inputUrl.split("www.youtu.be/");
                console.log('urlArray', urlArray)
                videoId = urlArray[1];
            } else {
                const urlArray = inputUrl.split("=");
                videoId = urlArray[1];
            }

            console.log('videoId:-', videoId);
            // console.log('host-', process.env.REACT_APP_RAPID_API_HOST)
            // console.log('key-', process.env.REACT_APP_API_KEY)
            if (!videoId) {
                setResult({
                    msg: 'Enter Valid Link'
                });
                setIsLoading(false);
                return;
            }

            fetch(`https://full-ten-boysenberry.glitch.me/getYoutubeToAudio`, {
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
                }).finally(() => {
                    setIsLoading(false);
                })


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
            <div className='container shadow rounded mx-auto m-4 p-4'>
                <span className="badge bg-danger fs-1 rounded-pill">Youtube To Audio Converter</span>

                <form onSubmit={handleSubmit} className="w-75 mx-auto">
                    <div className="input-group mb-3 m-4">
                        <input type="text" className="form-control border border-danger" placeholder="Paste Youtube Video Link Here" aria-label="Enter Youtube Video Link Here" aria-describedby="button-addon2" onChange={inputField} />
                        <button className="btn btn-danger" type="submit" id="button-addon2">Submit</button>
                    </div>
                </form>

                {
                    isLoading && <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }

                {
                    result.msg && <>
                        {
                            result.msg !== "success" ? <div className="alert alert-danger" role="alert">
                                {result.msg}
                            </div> : <div className='w-50 mx-auto'>
                                <span class="badge bg-success d-block m-2">
                                    Title: {result.title}
                                </span>
                                <span class="badge bg-success d-block m-2">
                                    Duration: {((result.duration - (result.duration % 60)) / 60).toFixed(0)} Mint, {Math.round(result.duration % 60)} Sec
                                </span>
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