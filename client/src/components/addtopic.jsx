import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/addtopic.css"
import { useFormik } from 'formik';
import useFetch from '../hooks/fetch.hook';
import { addTopic } from '../helper/helper';
import toast ,{ Toaster } from 'react-hot-toast';

function AddTopic(){
  const navigate = useNavigate()
  const [{apiData}] = useFetch()
  const formik = useFormik({
    initialValues : {
      courseTitle:'',
      topicTitle:'',
      link1:'',
      link2 : '',
      link3:'',
      link4:''
    },

    onSubmit: async values => {
      try {
        let addTopicPromise = addTopic({courseTitle:values.courseTitle,topicTitle:values.topicTitle,link1:values.link1,link2 : values.link2,link3:values.link3,link4:values.link3 });
        toast.promise(
          addTopicPromise,
          {
            loading:"Updating....",
            success: (response) => {
              navigate('/addtopic');
              return "Topic added Successful!"; 
            },
            error: (error) => {
              return "Topic not added"; 
            }

          }
        );
      } catch (error) {
        toast.error("Invalid Input"); 
      }
    }
  })

  return (
    <section className="addtopicSectionCourse" aria-label="recent post">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="addtopicContainer">
        <div className="addtopicTitleWrapper">
          <h2 className="addtopicH2 SectionTitle">
            Add a <strong className="addtopicStrong" style={{ display: 'inline' }}>TOPIC</strong>
          </h2>
        </div>
        <ul className="addtopicGridList">
          <form onSubmit={formik.handleSubmit}>
            <input type="hidden" name="courseTitle"  />
            <input
            {...formik.getFieldProps('topicTitle')}
              type="text"
              className='addtopicInput'
              name="topicTitle"
              placeholder="Topic Title"
              
            />
            <input
            {...formik.getFieldProps('link1')}
              type="text"
              className='addtopicInput'
              name="link1"
              placeholder="Geek For Geeks Link"
  
            />
            <input
            {...formik.getFieldProps('link2')}
              type="text"
              className='addtopicInput'
              name="link2"
              placeholder="Java Point Link"
            />
            <input
            {...formik.getFieldProps('link3')}
              type="text"
              className='addtopicInput'
              name="link3"
              placeholder="W3 Schools link"
            />
            <input
            {...formik.getFieldProps('link4')}
              type="text"
              className='addtopicInput'
              name="link4"
              placeholder="You Tube link"
            />
            <div className="addtopicCardContent">
              <input className="addtopicCardbutton"type="submit" value="ADD TOPIC" />
            </div>
          </form>
        </ul>
      </div>
    </section>
  );
};

export default AddTopic;
