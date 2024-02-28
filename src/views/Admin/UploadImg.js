import React, {useState, useEffect} from 'react'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import {baseURL} from '../../config'

// function to convert image to base64 code
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
// before upload function
const beforeUpload = (file) => {
  // check image type: only jpg and png type accepted
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  // check image size
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export default function UploadImg( {form} ) {
  // upload status
  const [loading, setLoading] = useState(false);
  // image url
  const [imageUrl, setImageUrl] = useState();
  // handle change function
  const handleChange = (info) => {
    // in uploading
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    // uploaded successfully
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);  // close uplading
        setImageUrl(url); // update image url
        // update image url in the form
        form.setFieldValue('photo', info.file.response.filename)
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  useEffect(()=>{
    let photoUrl = form.getFieldValue('photo')
    if(photoUrl){
      setImageUrl(baseURL+'upload/admin/'+photoUrl)
    }
  },[form.getFieldValue('photo')])
  
  return(
    <>
      <Upload
        name="photo"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="baseURL+Admin/UploadImg"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  )
}