import { SignUp } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-full max-w-md p-8 bg-black shadow-md rounded-lg">
        <h1 className="text-5xl font-semibold mb-6 text-center">Sign up</h1>
        
        <SignUp />
      </div>
    </div>
  )
}