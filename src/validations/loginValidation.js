import * as yup from 'yup';

const SEVEN_CHAR = 7;

const validationLogin = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(SEVEN_CHAR).required(),
});

export default validationLogin;
