import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f6f9fc;
`;

const LeftPane = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  color: #0f172a;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.25rem;
    color: #2563eb;
  }

  a {
    margin-top: 2rem;
    display: inline-block;
    color: white;
    background-color: #2563eb;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    width: fit-content;
  }
`;

const RightPane = styled.div`
  flex: 1;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const Terms = styled.p`
  font-size: 0.875rem;
  color: #6b7280;

  a {
    color: #2563eb;
    text-decoration: underline;
  }
`;

const RegisterPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegister();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form, {
      onSuccess: () => navigate("/login"),
      onError: () => alert("Registration failed"),
    });
  };

  return (
    <Container>
      <LeftPane>
        <h1>Create an account</h1>
        <p>Join and start your journey</p>
        <a href="/login">Already have an account? Login</a>
      </LeftPane>

      <RightPane>
        <FormCard>
          <h2>Signup</h2>
          <Form onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? "Registering..." : "Continue"}
            </Button>

            <Terms>
              By signing up you agree to our{" "}
              <a href="/terms" target="_blank">
                terms of service
              </a>{" "}
              &{" "}
              <a href="/privacy" target="_blank">
                privacy policy
              </a>
            </Terms>
          </Form>
        </FormCard>
      </RightPane>
    </Container>
  );
};

export default RegisterPage;
