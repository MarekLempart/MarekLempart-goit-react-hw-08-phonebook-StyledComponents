// Login.jsx

// Importowanie komponentów stylowych oraz hooka useDispatch z Redux
import { useDispatch } from 'react-redux'; // Importowanie hooka useDispatch z Redux
import { Link } from 'react-router-dom'; // Importowanie komponentu Link z react-router-dom
import { loginization } from '../../Redux/Authorization/operations'; // Importowanie operacji logowania z Redux
import {
  Container,
  FormWrap,
  InputForm,
  LogButton,
  PasswordIcon,
  RegLink,
  TitleReg,
  UserIcon,
} from './Login.styled';

export default function Login() {
  const [form] = FormWrap.useForm(); // Inicjalizacja formy
  const dispatch = useDispatch(); // Inicjalizacja dispatchera z Redux

  // Obsługa zdarzenia onSubmit formy logowania
  const onFinish = values => {
    dispatch(loginization(values)); // Wysłanie danych logowania do serwera za pomocą operacji logowania
    form.resetFields(); // Wyczyszczenie formularza po wysłaniu danych
  };

  return (
    <section>
      <Container>
        {/* Formularz logowania */}
        <FormWrap
          form={form}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {/* Tytuł formularza */}
          <TitleReg>Log in</TitleReg>
          {/* Pole formularza dla wprowadzenia adresu e-mail */}
          <FormWrap.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
                type: 'email',
              },
            ]}
          >
            <InputForm prefix={<UserIcon />} placeholder="Email" />
          </FormWrap.Item>
          {/* Pole formularza dla wprowadzenia hasła */}
          <FormWrap.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <InputForm
              prefix={<PasswordIcon />}
              type="password"
              placeholder="Password"
            />
          </FormWrap.Item>
          {/* Przycisk do zalogowania oraz link do rejestracji */}
          <FormWrap.Item>
            <LogButton type="primary" htmlType="submit">
              Log in
            </LogButton>
            <RegLink>
              Or <Link to="/register">register now</Link>
            </RegLink>
          </FormWrap.Item>
        </FormWrap>
      </Container>
    </section>
  );
}
