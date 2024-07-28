const Login = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-primary text-white p-8 rounded-3xl shadow-md items-center flex flex-col gap-4 w-96">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="mb-6">Enter your email and password to sign in</p>
        </div>
        <input
          type="email"
          name="email"
          id=""
          className="rounded-2xl text-black px-3 w-full focus:border-gray-400 focus:outline-none h-12 border-2 border-gray-300"
        />
        <input
          type="password"
          name="password"
          id=""
          className="rounded-2xl text-black px-3 w-full focus:border-gray-400 focus:outline-none h-12 border-2 border-gray-300"
        />
        <input
          type="submit"
          value="Login"
          className="bg-white text-black rounded-2xl h-12 focus:outline-gray-400 cursor-pointer hover:bg-opacity-90 mt-4 w-fit px-10"
        />
      </div>
    </div>
  );
};

export default Login;
