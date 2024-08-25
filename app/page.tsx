import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/home'); // Adjust this path as needed if your folder structure requires a different route
  return null;
}
