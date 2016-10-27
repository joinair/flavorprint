
import React, { PropTypes } from 'react';

const styles = {
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  code: {
    marginBottom: '35px',
  },
  message: {
    fontFamily: '"Open Sans", "Helvetica Neue, Arial, Helvetica, sans-serif"',
    fontSize: '22px',
    lineHeight: '30px',
    color: '#454545',
  },
  link: {
    color: '#3aba5a',
  },
};

const BackendError = ({ message }) => {
  if (process.env.NODE_ENV === 'development' && message) {
    return <pre>{message}</pre>;
  }

  const contactUs = (
    <a href="mailto:support@whisk.com" style={styles.link}>
      contact us
    </a>
  );

  return (
    <div className="BackendError" style={styles.root}>
      <div className="BackendError-code" style={styles.code}>
        <img
          alt="500 Internal server error"
          src="/assets/images/static-images/500.png"
          srcSet="/assets/images/static-images/500@2x.png 2x"
          title="500 Internal server error"
        />
      </div>

      <div className="BackendError-message" style={styles.message}>
        Oops! Something has gone wrong.<br />
        Try again later or {contactUs}.
      </div>
    </div>
  );
};

BackendError.propTypes = {
  message: PropTypes.string,
};

export default BackendError;
