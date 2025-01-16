import PropTypes from 'prop-types';

const Alert = ({ alert }) => {
  return (
    alert && (
      <div className="alert">
        <h3>{alert}</h3>
      </div>
    )
  );
}

Alert.propTypes = {
  alert: PropTypes.string.isRequired,
};

export default Alert;


