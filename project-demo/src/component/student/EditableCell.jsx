  
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
      {editing ? (
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
            { // field diff code length 4- 12
              min: 4,
              max : 26,
              message : `${title} must be between 4 and 26 characters`,
            }

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