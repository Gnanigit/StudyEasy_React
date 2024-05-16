import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/viewcourse.css";
import { updateTopicLinks } from '../helper/helper';
import { viewCourse } from '../helper/helper';
import img1 from "../assets/gfg.png"
import img2 from "../assets/jPoint.png"
import img3 from "../assets/w3Schools.png"
import img4 from "../assets/youtube.png"
import toast ,{ Toaster } from 'react-hot-toast';

function ViewCourse() {
  const navigate=useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get('courseId');
    console.log(courseId)
    const role = queryParams.get('role');
    const [courseData, setCourseData] = useState(null);
    const [updatedLinks, setUpdatedLinks] = useState({});
    const [updatingTopicId, setUpdatingTopicId] = useState(null);

    useEffect(() => {
        fetchCourseData(courseId);
    }, [courseId]);

    const fetchCourseData = async (Id) => {
        try {
            const response = await viewCourse({ Id });
            setCourseData(response);
        } catch (error) {
            console.error('Error fetching course data:', error);
        }
    };

    const handleLinkChange = (e, linkName, topicId) => {
      console.log(updatedLinks)
      const { value } = e.target;
      setUpdatedLinks(prevState => ({
          ...prevState,
          [topicId]: {
              ...prevState[topicId],
              [linkName]: value === "" ? null : value 
          }
      }));
  };
  

    const handleUpdateLinks = async (topicId)=> {
      try {
        const updatedData = updatedLinks[topicId];
        console.log(updatedData)
        if (updatedData) {
            const response = await updateTopicLinks({topicId, updatedData});
            if(response){
              toast.success("Topic Updated Successfully!");
              setUpdatingTopicId(null);
              navigate(`/viewcourse?courseId=${encodeURIComponent(courseId)}&role=1`);
            }
            else{
              toast.error("Topic Updation Failed!");
            } 
            console.log('Links updated successfully:', updatedData);
        } else {
          toast.error('No updated links found');
            setUpdatingTopicId(null);
            navigate(`/viewcourse?courseId=${encodeURIComponent(courseId)}&role=1`);
        }
    } catch (error) {
        console.error('Error updating links:', error);
    }
    
    };

    if (!courseData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="viewCoursecontainer">
           <Toaster position='top-center' reverseOrder={false}></Toaster>
            {courseData.length !== 0 ? (
                <>
                    <h1 className="viewCourse">{courseData[0].courseTitle}</h1>
                    <ul className='courseTopics'>
                        {courseData.map(topic => (
                            <li key={topic.id} className="topics">
                                <h2 className="topic">{topic.topicTitle}</h2>
                                <div className="links">
                                    {updatingTopicId === topic._id ? (
                                        <>
                                            <p className="link">
                                              <div className="icon-link">
                                                <span className="link-icon"><img src={img1} alt="GeeksForGeeks" /></span>
                                                <input
                                                    type="text"
                                                    defaultValue={updatedLinks[topic.id]?.link1 || topic.link1}
                                                    onChange={(e) => handleLinkChange(e, 'link1', topic._id)}
                                                />
                                                </div>
                                            </p>
                                            <p className="link">
                                              <div className="icon-link">
                                            <span className="link-icon"><img src={img2} alt="Java Point" /></span>
                                                <input
                                                    type="text"
                                                    defaultValue={updatedLinks[topic.id]?.link2 || topic.link2}
                                                    onChange={(e) => handleLinkChange(e, 'link2', topic._id)}
                                                />
                                                </div>
                                            </p>
                                            <p className="link">
                                              <div className="icon-link">
                                            <span className="link-icon"><img src={img3} alt="W3 Schools" /></span>
                                                <input
                                                    type="text"
                                                    defaultValue={updatedLinks[topic.id]?.link3 || topic.link3}
                                                    onChange={(e) => handleLinkChange(e, 'link3', topic._id)}
                                                />
                                                </div>
                                            </p>
                                            <p className="link">
                                              <div className="icon-link">
                                            <span className="link-icon"><img src={img4} alt="You Tube" /></span>
                                                <input
                                                    type="text"
                                                    defaultValue={updatedLinks[topic.id]?.link4|| topic.link4}
                                                    onChange={(e) => handleLinkChange(e, 'link4', topic._id)}
                                                />
                                                </div>
                                            </p>
                                        
                                            <button className="saveButton" onClick={() => handleUpdateLinks(topic._id)}>Save Links</button>
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
                                                <button className="updateButton" onClick={() => setUpdatingTopicId(topic._id)}>Update Topic</button>
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
