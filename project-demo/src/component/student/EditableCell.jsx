  
import React from 'react';
 
import {Input,Form} from 'antd'


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
   
  return (
    <td {...restProps}>
      {editing  ? (
        <Form.Item
 
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            { 
              required: true,
              message: `Please Input ${title}!`,
              whitespace : true
            },
            dataIndex !== 'code'  ?  { // field diff code length 4- 26
              min: 4,
              max : 26,
              message : `${title} must be between 4 and 26 characters`,
            } : { // field diff code length 6- 12
              min: 6,
              max : 12,
              message : `${title} must be between 6 and 12 characters`,
            } ,


          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;