// Register.jsx

// Importowanie komponentów stylowych oraz hooków useDispatch i useSelector z Redux
import { useDispatch, useSelector } from 'react-redux'; // Importowanie hooków useDispatch i useSelector z Redux
import { register } from '../../Redux/Authorization/operations'; // Importowanie operacji rejestracji z Redux
import {
  ContLabel,
  Container,
  FormReg,
  InputPassword,
  InputReg,
  Label,
  LinkToLog,
  RegMail,
  RegPassWord,
  RegUser,
  SubmitButton,
  TitleReg,
} from './Register.styled';

export default function Register() {
  const [form] = FormReg.useForm(); // Inicjalizacja formy
  const dispatch = useDispatch(); // Inicjalizacja dispatchera z Redux
  const { isLoading, error } = useSelector(state => state.auth); // Pobranie stanu ładowania i błędu z Redux

  // Obsługa zdarzenia onSubmit formy rejestracji
  const onFinish = values => {
    const { name, email, password, confirm } = values;

    // Sprawdzenie, czy hasła się zgadzają przed wysłaniem na serwer
    if (password === confirm) {
      dispatch(register({ name, email, password })); // Wysłanie danych rejestracji na serwer za pomocą operacji rejestracji
      !isLoading && !error && form.resetFields(); // Wyczyszczenie formularza po pomyślnym zarejestrowaniu użytkownika
    }
  };

  return (
    <section>
      <Container>
        {/* Formularz rejestracji */}
        <FormReg
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'], // początkowe wartości dla pola wyboru
            prefix: '86',
          }}
          scrollToFirstError
        >
          {/* Nagłówek formularza */}
          <TitleReg>Register new user</TitleReg>
          {/* Pole formularza dla wprowadzenia imienia */}
          <Label
            name="name"
            label="Name"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true,
              },
            ]}
          >
            <InputReg prefix={<RegUser />} />
          </Label>
          {/* Pole formularza dla wprowadzenia adresu e-mail */}
          <Label
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <InputReg prefix={<RegMail />} />
          </Label>
          {/* Pole formularza dla wprowadzenia hasła */}
          <Label
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <InputPassword
              prefix={<RegPassWord />}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 7 or more characters"
            />
          </Label>
          {/* Pole formularza dla wprowadzenia potwierdzenia hasła */}
          <Label
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },

              // Sprawdzenie, czy hasła się zgadzają przed wysłaniem na serwer
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <InputPassword prefix={<RegPassWord />} />
          </Label>

          {/* Przycisk do rejestracji oraz link do logowania */}
          <Label>
            <SubmitButton type="primary" htmlType="submit">
              Register
            </SubmitButton>
            <ContLabel>
              or <LinkToLog to="/login"> log in</LinkToLog>if you already have
              an account
            </ContLabel>
          </Label>
        </FormReg>
      </Container>
    </section>
  );
}
