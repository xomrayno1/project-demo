import {notification} from 'antd'

export const defaultFilter = {
    page : 1,
    limit : 10,
    search : ''
}


export const openNotificationError = (title,description) => {
    notification.error({
      message: title,
      description: description,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };