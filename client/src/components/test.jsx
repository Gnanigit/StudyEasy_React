import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../styles/viewcourse.css";

import { viewCourse } from '../helper/helper';
import img1 from "../assets/gfg.png"
import img2 from "../assets/jPoint.png"
import img3 from "../assets/w3Schools.png"
import img4 from "../assets/youtube.png"

function ViewCourse() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseTitle = queryParams.get('courseTitle');
    const role = queryParams.get('role');
    console.log(role)
    const [courseData, setCourseData] = useState(null);
    const [updatedLinks, setUpdatedLinks] = useState({});
    const [updatingTopicId, setUpdatingTopicId] = useState(null);

    useEffect(() => {
        // Fetch course data based on courseTitle
        fetchCourseData(courseTitle);
    }, [courseTitle]);

    const fetchCourseData = async (title) => {
        try {
            const response = await viewCourse({ title });
            setCourseData(response);
        } catch (error) {
            console.error('Error fetching course data:', error);
        }
    };

    const handleLinkChange = (e, linkName, topicId) => {
        const { value } = e.target;
        setUpdatedLinks(prevState => ({
            ...prevState,
            [topicId]: {
                ...prevState[topicId],
                [linkName]: value
            }
        }));
    };

    const handleUpdateLinks = (topicId) => {
        // Logic to update links for the topic with topicId
        console.log('Updated links:', updatedLinks[topicId]);
        // You can send the updated links to your backend API for updating
    };

    if (!courseData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="viewCoursecontainer">
            {courseData.length !== 0 ? (
                <>
                    <h1 className="viewCourse">{courseData[0].courseTitle}</h1>
                    <ul className='courseTopics'>
                        {courseData.map(topic => (
                            <li key={topic.id} className="topics">
                                <h2 className="topic">{topic.topicTitle}</h2>
                                <div className="links">
                                    {updatingTopicId === topic.id ? (
                                        <>
                                            <p className="link">
                                                <input
                                                    type="text"
                                                    value={updatedLinks[topic.id]?.link1 || topic.link1}
                                                    onChange={(e) => handleLinkChange(e, 'link1', topic.id)}
                                                />
                                            </p>
                                            <p className="link">
                                                <input
                                                    type="text"
                                                    value={updatedLinks[topic.id]?.link2 || topic.link2}
                                                    onChange={(e) => handleLinkChange(e, 'link2', topic.id)}
                                                />
                                            </p>
                                            <p className="link">
                                                <input
                                                    type="text"
                                                    value={updatedLinks[topic.id]?.link3 || topic.link3}
                                                    onChange={(e) => handleLinkChange(e, 'link3', topic.id)}
                                                />
                                            </p>
                                            <p className="link">
                                                <input
                                                    type="text"
                                                    value={updatedLinks[topic.id]?.link4 || topic.link4}
                                                    onChange={(e) => handleLinkChange(e, 'link4', topic.id)}
                                                />
                                            </p>
                                            <button onClick={() => handleUpdateLinks(topic.id)}>Save Links</button>
                                        </>
                                    ) : (
                                        <>
                                            <p className="link">
                                                <a className="icon-link" target="_blank" rel="noopener noreferrer" href={topic.link1}>
                                                    <span className="link-icon"><img src={img1} alt="GeeksForGeeks" /></span>
                                                    GeeksForGeeks
                                                </a>
                                            </p>
                                            <p className="link">
                                                <a className="icon-link" target="_blank" rel="noopener noreferrer" href={topic.link2}>
                                                    <span className="link-icon"><img src={img2} alt="Java Point" /></span>
                                                    <span>java Point</span>
                                                </a>
                                            </p>
                                            <p className="link">
                                                <a className="icon-link" target="_blank" rel="noopener noreferrer" href={topic.link3}>
                                                    <span className="link-icon"><img src={img3} alt="W3 Schools" /></span>
                                                    W3 Schools
                                                </a>
                                            </p>
                                            <p className="link">
                                                <a className="icon-link" target="_blank" rel="noopener noreferrer" href={topic.link4}>
                                                    <span className="link-icon"><img src={img4} alt="You Tube" /></span>
                                                    You Tube
                                                </a>
                                            </p>
                                            {role === '1' && (
                                                <button onClick={() => setUpdatingTopicId(topic.id)}>Update Topic</button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <h1 className='viewCourse'>No Data</h1>
            )}
        </div>
    );
}

export default ViewCourse;
