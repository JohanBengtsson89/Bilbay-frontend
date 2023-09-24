import React from 'react'

function LoginPage() {

    

    return (
      <>
        <div className="pt-28 h-[calc(100vh-theme(spacing.24))] bg-[#EFECEC] lg:pt-25">
          <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
            <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Login</h1>
  
              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="username"
                placeholder="Username *"
              />
  
              <input
                type="password"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="password"
                placeholder="Password"
              />
  
              
              <button
                type="submit"
                className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-2 mt-9">
                Login
              </button>

              <div className="text-grey-dark">
                Dont't have any account?
                <a
                  className="ml-1 no-underline border-b border-blue text-blue" href="../Signup/">
                   Sign up
                </a>
              </div>
              
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default LoginPage;