import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';


const NotificationItem = React.memo(({ id, type, html, value, onMarkAsRead }) => {
  return (
    <div className={css(styles.data)}>
      {type && value ? (
        <li onClick={() => onMarkAsRead(id)} 
        data-notification-type={type}
        className={type === 'urgent' ? css(styles.urgent, styles.li) : css(styles.default, styles.li)}

     >
          {value}
        </li>
      ) : null}
      {html ? <li className={css(styles.li)} data-urgent dangerouslySetInnerHTML={{ __html: html }}></li> : null}
    </div>
  );
});

const styles = StyleSheet.create({
    default: {
      color: 'blue'
    },
    urgent: {
      color: 'red'
    },
    li : {
      "@media (max-width: 767px)" :{
        listStyle: "none",
        padding: "0 1rem",
        borderBottom: "1px solid black"
  
    }
  }
  })
  NotificationItem.propTypes = {
    html: PropTypes.shape({
      __html: PropTypes.string.isRequired
    }),
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onMarkAsRead: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  };
  
  NotificationItem.defaultProps = {
    type: 'default'
  };
  
  export default NotificationItem;
  