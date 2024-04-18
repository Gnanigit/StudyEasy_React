import React, { useState } from 'react';
import "../styles/addtopic.css"
const AddTopic = ({ courseTitle }) => {
  const [topicTitle, setTopicTitle] = useState('');
  const [link1, setLink1] = useState('');
  const [link2, setLink2] = useState('');
  const [link3, setLink3] = useState('');
  const [link4, setLink4] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      courseTitle,
      topicTitle,
      link1,
      link2,
      link3,
      link4,
    };

    fetch('/uploadTopic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Topic added successfully:', data);
        setTopicTitle('');
        setLink1('');
        setLink2('');
        setLink3('');
        setLink4('');
      })
      .catch((error) => {
        console.error('Error adding topic:', error);
      });
  };

  return (
    <section className="addtopicSectionCourse" aria-label="recent post">
      <div className="addtopicContainer">
        <div className="addtopicTitleWrapper">
          <h2 className="addtopicH2 SectionTitle">
            Add a <strong className="addtopicStrong" style={{ display: 'inline' }}>TOPIC {courseTitle}</strong>
          </h2>
        </div>
        <ul className="addtopicGridList">
          <form action="/uploadTopic" method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="courseTitle" value={courseTitle} />
            <input
              type="text"
              value={topicTitle}
              name="topicTitle"
              placeholder="Topic Title"
              onChange={(e) => setTopicTitle(e.target.value)}
            />
            <input
              type="text"
              name="link1"
              value={link1}
              placeholder="Geek For Geeks Link"
              onChange={(e) => setLink1(e.target.value)}
            />
            <input
              type="text"
              name="link2"
              value={link2}
              placeholder="Java Point Link"
              onChange={(e) => setLink2(e.target.value)}
            />
            <input
              type="text"
              name="link3"
              value={link3}
              placeholder="W3 Schools link"
              onChange={(e) => setLink3(e.target.value)}
            />
            <input
              type="text"
              name="link4"
              value={link4}
              placeholder="You Tube link"
              onChange={(e) => setLink4(e.target.value)}
            />
            <div className="addtopicCardContent">
              <input type="submit" value="ADD TOPIC" />
            </div>
          </form>
        </ul>
      </div>
    </section>
  );
};

export default AddTopic;
