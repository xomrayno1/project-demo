  
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
            },
            dataIndex !== 'code' && { // field diff code length 4- 12
              transform : (value) => {
                return value.trim()
              },
              min: 4,
              max : 12,
              message: 'Character 4 - 12',
              whitespace : true,
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