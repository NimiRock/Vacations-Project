import React from 'react';
import '../App.css';

export default function About() {
    return (
        //aboutTheProjectContainer d-flex align-items-center justify-content-center
        // className="aboutTheProject p-3 d-flex justify-content-between align-items-center flex-wrap rounded"
        // className="aboutTheProjectTitleAndContent d-flex flex-wrap"
        <div className="about-section aboutTheProjectContainer d-flex align-items-center justify-content-center">
            <div className="aboutTheProject p-3 d-flex justify-content-between align-items-center flex-wrap rounded">
                <div className="aboutTheProjectTitleAndContent d-flex flex-wrap">
                    <h3>Vacations Project</h3>
                    <p>My name is Nimrod Rokach, I've created this project as part of my studies in John Bryce College.</p>
                    <br/>
                    In this project I used jQuery and ajax to extract data from two APIs, and Bootstrap for design. In this project you can see the current value of coins, that were randomly selected from one API. The second API is used to show an updating data for selected coins in the "Reports" page, up to five coins can be selected. The APIs are not synced, therefore not all coins can be tracked, and in that case, the toggle will be changed to "Unable", and will be disabled. If you want a specific coin, you can add it by going to "Can't find your coin?" on the top right, and enter your coin ID.<br/>Hope you enjoyed the project!
                    <br/>
                    <br/>
                    <div className="aboutTheProjectImg d-flex justify-content-end w-100">
                            {/* eslint-disable-next-line*/}
                        <img className="rounded-circle myImgItself" src="/images/myself.jpg" alt="photo of me"/>
                    </div>
                </div>
            </div>
        </div>
    )
};