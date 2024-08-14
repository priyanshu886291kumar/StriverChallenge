export const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="text-3xl font-bold">
            This website is to write code and share with others, they can see
            the code only if they login on the website.
          </div>
          <div className="text-3xl font-bold">
            This website currently does not uses properauthetication(like oAuth,
            or any OTP based authentiation), so please use only your email.
          </div>
        </div>
      </div>
    </div>
  );
};
