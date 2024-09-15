
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-full max-w-md p-8  shadow-md rounded-lg">
        <h1 className="text-5xl font-semibold mb-6 text-center">Sign In</h1>
        <p className="text-lg text-center">Demo credentials - </p>
        <p className="text-md  text-center">username - user1    </p>
        <p className="text-md  text-center">password - user12345    </p>
        <SignIn />
      </div>
    </div>
  )
}
