function RegisterPage() {
  return (
    <>
      <div className="pt-28 h-[calc(100vh-theme(spacing.24))] bg-[#EFECEC] lg:pt-5">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
          <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full ">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>

            <input
              type="text"
              className="inline-block border-2 border-[#575757] w-48 p-1 rounded-lg mb-4 mr-10 lg:w-full"
              name="fullname"
              placeholder="First Name *"
            />

            <input
              type="text"
              className="inline-block ml-10 border-2 border-[#575757] w-48 p-1 rounded-lg mb-4 lg:w-full lg:ml-0"
              name="lastname"
              placeholder="Last Name *"
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="email"
              placeholder="Email"
            />

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

            <input
              type="password"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="companyname"
              placeholder="Company Name"
            />

            <input
              type="password"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="orgnr"
              placeholder="Org-nr"
            />

            <select className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4">
              <option value="Private">Private</option>

              <option value="Company">Company</option>
            </select>

            <div className="text-[#434343] inset-x-16">
              Already have an account?
              <a
                className="no-underline border-b border-blue text-blue"
                href="../login/"
              >
                Sign in
              </a>
              .
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
