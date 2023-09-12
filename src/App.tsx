import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth } from './features/auth/Auth';
import { SignUp } from './features/auth/signup/SignUp';
import { SignIn } from './features/auth/signin/SignIn';
import { Template } from './template/Template';

function App() {
  return (
      <div className="min-h-screen">
          <Routes>
              <Route path="/" element={<Template/>}>
              </Route>

              <Route path="/auth" element={<Auth/>}>
                  <Route
                      path=""
                      element={<Navigate to="signup" />}
                  />
                  <Route path="signup" element={<SignUp/>}></Route>
                  <Route path="signin" element={<SignIn/>}></Route>
                  <Route
                      path="*"
                      element={<Navigate to="signup" />}
                  />
              </Route>
              <Route
                  path="*"
                  element={<Navigate to="/" />}
              ></Route>
          </Routes>
      </div>
  );
}

export default App;
