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
import { isFormValid, handleInputError } from 'validations/register';
import { createUser } from 'utility';
import { RegisteValues, InputChangeEvent, FormSubmit, RegError } from 'types';

export default function Register() {
  const [register, setRegister] = useState<RegisteValues>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setError] = useState<RegError[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const changeHandler: InputChangeEvent = (e): void => {
    const { value } = e.target;
    const name = e.target.name as
      | 'email'
      | 'username'
      | 'password'
      | 'confirmPassword';
    const stateCopy = { ...register };
    stateCopy[name] = value;
    setRegister(stateCopy);
  };

  const submitHandler: FormSubmit = async (e) => {
    e.preventDefault();
    const result = isFormValid(register);
    if (result === true) {
      setloading(false);
      setError([]);
      try {
        await createUser(register.email, register.password, register.username);
        setloading(false);
      } catch (error) {
        setloading(false);
        const err = [...errors, error];
        setError(err);
      }
    } else setError(result);
  };

  const displayErrors = (errors: RegError[]) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  return (
    <Grid textAlign='center' verticalAlign='middle' className='app'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header>
          <Icon name='puzzle piece' color='orange' />
          Register For Slack-Clone
        </Header>
        <Form onSubmit={submitHandler} size='large'>
          <Segment>
            <Form.Input
              fluid
              name='username'
              icon='user'
              iconPosition='left'
              placeholer='Username'
              onChange={changeHandler}
              type='text'
            />
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
            <Form.Input
              fluid
              name='confirmPassword'
              icon='repeat'
              iconPosition='left'
              placeholer='Confirm Password'
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
