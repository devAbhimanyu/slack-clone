import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';
import { loginUser } from 'utility';
import { handleInputError } from 'validations';
import { FormSubmit, InputChangeEvent, LoginValues, RegError } from 'types';

export default function Login() {
  const [login, setLogin] = useState<LoginValues>({ email: '', password: '' });
  const [errors, setError] = useState<RegError[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  const changeHandler: InputChangeEvent = (e): void => {
    const { value } = e.target;
    const name = e.target.name as 'email' | 'password';
    const stateCopy = { ...login };
    stateCopy[name] = value;
    setLogin(stateCopy);
  };
  const isFormValid = ({ email, password }: LoginValues): boolean =>
    email && password ? true : false;
  const submitHandler: FormSubmit = async (e) => {
    e.preventDefault();
    const result = isFormValid(login);
    if (result === true) {
      setloading(false);
      setError([]);
      try {
        const user = await loginUser(login.email, login.password);
        console.log(user);
      } catch (error) {
        setloading(false);
        const err = [...errors, error];
        setError(err);
      }
    }
  };
  const displayErrors = (errors: RegError[]) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);
  return (
    <Grid textAlign='center' verticalAlign='middle' className='app'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header>
          <Icon name='code branch' color='violet' />
          Login to Slack-Clone
        </Header>
        <Form onSubmit={submitHandler} size='large'>
          <Segment>
            <Form.Input
              fluid
              name='email'
              icon='mail'
              iconPosition='left'
              placeholer='Email'
              className={handleInputError(errors, 'email')}
              onChange={changeHandler}
              type='email'
            />
            <Form.Input
              fluid
              name='password'
              icon='lock'
              iconPosition='left'
              placeholer='Password'
              className={handleInputError(errors, 'password')}
              onChange={changeHandler}
              type='password'
            />
            <Button
              disabled={loading}
              className={loading ? 'loading' : ''}
              color='orange'
              fluid
              size='large'
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}
        <Message>
          Already a user? <Link to='/login'>Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
